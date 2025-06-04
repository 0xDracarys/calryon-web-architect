import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

console.log("Create Google Calendar Event function initialized");

serve(async (req: Request) => {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { appointmentId } = await req.json();

    if (!appointmentId) {
      return new Response(JSON.stringify({ error: 'appointmentId is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Retrieve environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const googleClientId = Deno.env.get("GOOGLE_CLIENT_ID");
    const googleClientSecret = Deno.env.get("GOOGLE_CLIENT_SECRET");
    const googleRefreshToken = Deno.env.get("GOOGLE_REFRESH_TOKEN");
    const targetCalendarId = Deno.env.get("TARGET_CALENDAR_ID");

    if (!supabaseUrl || !supabaseServiceRoleKey || !googleClientId || !googleClientSecret || !googleRefreshToken || !targetCalendarId) {
      console.error("Missing environment variables");
      return new Response(JSON.stringify({ error: "Internal server error: Missing configuration" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Initialize Supabase client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

    // 1. Fetch Appointment Details
    const { data: appointment, error: appointmentError } = await supabaseAdmin
      .from('appointments')
      .select('client_name, client_email, client_phone, service_name, preferred_datetime, notes')
      .eq('id', appointmentId)
      .single();

    if (appointmentError) {
      console.error("Error fetching appointment:", appointmentError);
      return new Response(JSON.stringify({ error: `Failed to fetch appointment: ${appointmentError.message}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!appointment) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. OAuth 2.0 Token Exchange
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: googleClientId,
        client_secret: googleClientSecret,
        refresh_token: googleRefreshToken,
        grant_type: "refresh_token",
      }),
    });

    if (!tokenResponse.ok) {
      const tokenError = await tokenResponse.json();
      console.error("Error refreshing Google token:", tokenError);
      return new Response(JSON.stringify({ error: `Failed to refresh Google token: ${tokenError.error_description || tokenResponse.statusText}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const { access_token: googleAccessToken } = await tokenResponse.json();

    // 3. Google Calendar API Call (Create Event)
    const eventStartTime = new Date(appointment.preferred_datetime);
    const eventEndTime = new Date(eventStartTime.getTime() + 60 * 60 * 1000); // Add 1 hour

    const eventData = {
      summary: `Appointment: ${appointment.service_name} with ${appointment.client_name}`,
      description: `Client Details:\nName: ${appointment.client_name}\nEmail: ${appointment.client_email}\nPhone: ${appointment.client_phone || 'N/A'}\n\nNotes:\n${appointment.notes || 'N/A'}`,
      start: {
        dateTime: eventStartTime.toISOString(),
        timeZone: "Europe/Vilnius",
      },
      end: {
        dateTime: eventEndTime.toISOString(),
        timeZone: "Europe/Vilnius",
      },
      attendees: [
        { email: appointment.client_email },
        { email: targetCalendarId },
      ],
    };

    const calendarResponse = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${targetCalendarId}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${googleAccessToken}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!calendarResponse.ok) {
      const calendarError = await calendarResponse.json();
      console.error("Error creating Google Calendar event:", calendarError);
      return new Response(JSON.stringify({ error: `Failed to create Google Calendar event: ${calendarError.error?.message || calendarResponse.statusText}` }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const googleEvent = await calendarResponse.json();

    // 4. Update Supabase Appointment
    const { error: updateError } = await supabaseAdmin
      .from('appointments')
      .update({ google_calendar_event_id: googleEvent.id })
      .eq('id', appointmentId);

    if (updateError) {
      console.error("Error updating appointment with Google Calendar event ID:", updateError);
      // Log the error but don't fail the request if calendar event was created
      // Alternatively, could try to delete the created calendar event for consistency
    }

    return new Response(JSON.stringify({
      message: 'Google Calendar event created successfully',
      googleCalendarEventId: googleEvent.id
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Unhandled error:", error);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
