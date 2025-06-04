/**
 * Supabase Edge Function: create-google-calendar-event
 *
 * Purpose:
 * This function handles requests to create a Google Calendar event based on appointment data.
 * It first obtains a Google API access token using a refresh token, then uses this token
 * to create an event in Google Calendar. Finally, it updates the corresponding appointment
 * record in the Supabase database with the ID of the created Google Calendar event.
 *
 * Expected Input (JSON body):
 * {
 *   "appointmentId": "uuid",      // ID of the appointment in Supabase
 *   "clientName": "string",       // Name of the client
 *   "clientEmail": "string",      // Email of the client
 *   "serviceName": "string",      // Name of the service booked
 *   "preferredDateTime": "ISO_string", // Preferred date and time for the appointment
 *   "notes": "string" (optional)  // Additional notes from the client
 * }
 *
 * Environment Variables Required:
 * - GOOGLE_CLIENT_ID: Google Cloud project client ID.
 * - GOOGLE_CLIENT_SECRET: Google Cloud project client secret.
 * - GOOGLE_REFRESH_TOKEN: Google OAuth refresh token for accessing the calendar.
 * - GOOGLE_CALENDAR_ID: The ID of the Google Calendar to create events in.
 * - SUPABASE_URL: URL of your Supabase project.
 * - SUPABASE_ANON_KEY: Anon key for your Supabase project.
 *   (Note: SUPABASE_SERVICE_ROLE_KEY might be needed if RLS restricts updates with ANON_KEY)
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";

// Required environment variables for Google API
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
const GOOGLE_REFRESH_TOKEN = Deno.env.get("GOOGLE_REFRESH_TOKEN");
const GOOGLE_CALENDAR_ID = Deno.env.get("GOOGLE_CALENDAR_ID");

// Required environment variables for Supabase
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
// const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"); // See comment below

// Startup checks for essential environment variables
if (!GOOGLE_CLIENT_ID) console.error("CRITICAL: Missing GOOGLE_CLIENT_ID at startup");
if (!GOOGLE_CLIENT_SECRET) console.error("CRITICAL: Missing GOOGLE_CLIENT_SECRET at startup");
if (!GOOGLE_REFRESH_TOKEN) console.error("CRITICAL: Missing GOOGLE_REFRESH_TOKEN at startup");
if (!GOOGLE_CALENDAR_ID) console.error("CRITICAL: Missing GOOGLE_CALENDAR_ID at startup");
if (!SUPABASE_URL) console.error("CRITICAL: Missing SUPABASE_URL at startup");
if (!SUPABASE_ANON_KEY) console.error("CRITICAL: Missing SUPABASE_ANON_KEY at startup");

// Initialize Supabase Client
let supabaseAdmin: SupabaseClient;
if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    // IMPORTANT: If Row Level Security (RLS) on the `appointments` table prevents updates
    // using the ANON_KEY, you MUST use the SERVICE_ROLE_KEY instead (see .env.example).
    // The SERVICE_ROLE_KEY has admin privileges and bypasses RLS.
    // Ensure it is kept EXTREMELY secure and only used in trusted server-side environments.
    // Example: supabaseAdmin = createClient(SUPABASE_URL, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
} else {
    // This will be caught by the main handler check, but good to log at init if possible
    console.error("CRITICAL: Supabase URL or Anon Key not provided. Supabase client not initialized at startup.");
}


/**
 * Fetches a new Google API access token using the refresh token.
 * This is necessary because access tokens are short-lived.
 * @returns {Promise<string>} The Google API access token.
 * @throws {Error} If fetching the token fails or credentials are not configured.
 */
async function getAccessToken(): Promise<string> {
  console.log("Attempting to fetch new Google API access token...");
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error("Google Cloud credentials (client ID, client secret, or refresh token) are not configured for token refresh.");
  }

  // Make a POST request to Google's OAuth 2.0 token endpoint
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      refresh_token: GOOGLE_REFRESH_TOKEN,
      grant_type: "refresh_token", // Specify that we are using a refresh token
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text(); // Get more details from Google's error response
    console.error("Google token API error response:", errorBody);
    throw new Error(`Failed to refresh Google access token: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const data = await response.json();
  if (!data.access_token) {
    throw new Error("No access_token found in Google's response.");
  }

  console.log("Successfully obtained new Google API access token.");
  return data.access_token;
}

/**
 * Creates a Google Calendar event using the provided access token and event data.
 * @param {string} accessToken - The Google API access token.
 * @param {Record<string, unknown>} eventData - The event data object for Google Calendar.
 * @returns {Promise<any>} The created event object from Google Calendar.
 * @throws {Error} If event creation fails or GOOGLE_CALENDAR_ID is not configured.
 */
async function createCalendarEvent(accessToken: string, eventData: Record<string, unknown>): Promise<any> {
  if (!GOOGLE_CALENDAR_ID) {
    // This should be caught by startup checks, but good for defense in depth
    throw new Error("GOOGLE_CALENDAR_ID is not configured.");
  }
  console.log(`Attempting to create event in calendar: ${GOOGLE_CALENDAR_ID}`);

  // Make a POST request to the Google Calendar API's events endpoint
  const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${GOOGLE_CALENDAR_ID}/events`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`, // Use the obtained access token
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData), // Event data needs to be a JSON string
  });

  if (!response.ok) {
    const errorBody = await response.text(); // Get more details from Google's error response
    console.error("Google Calendar API error response:", errorBody);
    throw new Error(`Failed to create Google Calendar event: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  const createdEvent = await response.json();
  console.log("Successfully created Google Calendar event with ID:", createdEvent.id);
  return createdEvent;
}

/**
 * Updates an appointment record in the Supabase 'appointments' table
 * with the ID of the Google Calendar event created.
 * @param {string} appointmentId - The ID of the appointment to update.
 * @param {string} calendarEventId - The ID of the Google Calendar event.
 * @throws {Error} If Supabase client is not initialized, appointmentId is missing, or DB update fails.
 */
async function updateAppointmentWithEventId(appointmentId: string, calendarEventId: string): Promise<void> {
  if (!supabaseAdmin) {
    // This should be caught by startup checks, but good for defense in depth
    throw new Error("Supabase client not initialized. Cannot update appointment.");
  }
  if (!appointmentId) {
    throw new Error("Appointment ID not provided for database update.");
  }
  console.log(`Attempting to update appointment ${appointmentId} with calendarEventId ${calendarEventId}`);

  // Perform the update operation on the 'appointments' table
  const { data, error } = await supabaseAdmin
    .from("appointments") // Target the 'appointments' table
    .update({ google_calendar_event_id: calendarEventId }) // Set the column
    .eq("id", appointmentId) // Where the 'id' matches appointmentId
    .select(); // Optionally .select() to get the updated row(s) back

  if (error) {
    console.error("Error updating appointment in Supabase:", error);
    throw new Error(`Failed to update appointment ${appointmentId} in Supabase: ${error.message}`);
  }

  // Check if data was returned (if .select() was used and RLS allows)
  if (!data || data.length === 0) {
    // This might indicate the appointment was not found or RLS prevented seeing the result.
    console.warn(`Appointment ${appointmentId} not found for update, or RLS prevented returning data. Ensure ID is correct and RLS allows select/update with the used key.`);
    // Depending on strictness, you might throw an error here.
  }

  console.log(`Successfully updated appointment ${appointmentId}. Supabase response data:`, data);
}

// Main request handler for the Deno server
serve(async (req: Request) => {
  // Handle CORS preflight requests (OPTIONS method)
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "POST", // Allow POST method
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", // Specify allowed headers
      },
    });
  }

  // Check for missing critical environment variables before proceeding
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GOOGLE_CALENDAR_ID || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Function Invocation Error: Missing one or more critical environment variables.");
    return new Response(
      JSON.stringify({ error: "Function not configured correctly due to missing environment variables." }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
   if (!supabaseAdmin) {
    console.error("Function Invocation Error: Supabase client not initialized.");
    return new Response(
      JSON.stringify({ error: "Function not configured correctly due to Supabase client initialization failure." }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }

  try {
    // Parse the JSON request body
    const body = await req.json();
    console.log("Received raw request body:", body);

    // Destructure and validate required fields from the body
    const { appointmentId, clientName, clientEmail, serviceName, preferredDateTime, notes } = body;
    if (!appointmentId || !clientName || !clientEmail || !serviceName || !preferredDateTime) {
        return new Response(
            JSON.stringify({ error: "Missing required fields in request body. Required: appointmentId, clientName, clientEmail, serviceName, preferredDateTime." }),
            { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
    }

    console.log("Parsed appointment details for processing:", { appointmentId, clientName, serviceName });

    // Step 1: Obtain Google API Access Token
    let accessToken;
    try {
      accessToken = await getAccessToken();
    } catch (tokenError) {
      console.error("Failed to obtain Google API access token:", tokenError.message);
      return new Response(
        JSON.stringify({ error: "Failed to obtain Google API access token.", details: tokenError.message }),
        { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Step 2: Prepare event data for Google Calendar
    const startTime = new Date(preferredDateTime);
    // Default event duration to 1 hour. Modify if services have different durations.
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    const eventData = {
      summary: `Appointment: ${serviceName} with ${clientName}`,
      description: `Client: ${clientName}\nEmail: ${clientEmail}\nService: ${serviceName}\nAppointment ID: ${appointmentId}\nNotes: ${notes || "No additional notes provided."}`,
      start: { dateTime: startTime.toISOString(), timeZone: "Europe/Vilnius" }, // Ensure timezone is appropriate
      end: { dateTime: endTime.toISOString(), timeZone: "Europe/Vilnius" },
      attendees: [{ email: clientEmail }], // Add client as an attendee
      // Optional: Add reminders, conference data, etc.
      // reminders: { useDefault: false, overrides: [{ method: 'email', minutes: 120 },{ method: 'popup', minutes: 30 }] },
    };

    console.log("Attempting to create Google Calendar event with data:", JSON.stringify(eventData, null, 2));

    // Step 3: Create Google Calendar Event
    let createdEvent;
    try {
      createdEvent = await createCalendarEvent(accessToken, eventData);
    } catch (eventError) {
      console.error("Failed to create Google Calendar event:", eventError.message);
      return new Response(
        JSON.stringify({ error: "Failed to create Google Calendar event.", details: eventError.message }),
        { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

    // Step 4: Update Supabase appointment record with the Google Calendar Event ID
    try {
      await updateAppointmentWithEventId(appointmentId, createdEvent.id);
      console.log(`Successfully updated appointment ${appointmentId} in Supabase.`);
      // Return success response if both calendar event and DB update were successful
      return new Response(
        JSON.stringify({
          success: true,
          message: "Successfully created Google Calendar event and updated appointment record.",
          appointmentId: appointmentId,
          calendarEventId: createdEvent.id,
        }),
        { status: 200, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    } catch (dbError) {
      console.error(`Failed to update appointment ${appointmentId} in Supabase:`, dbError.message);
      // Calendar event was created, but DB update failed. This is a partial success.
      // Consider how the client should handle this (e.g., manual follow-up may be needed).
      return new Response(
        JSON.stringify({
          success: false,
          message: "Google Calendar event created, but failed to update appointment record in database.",
          appointmentId: appointmentId,
          calendarEventId: createdEvent.id,
          databaseError: dbError.message,
        }),
        // HTTP 207 Multi-Status could be used for partial success.
        // Using 500 here to indicate a server-side issue that prevented full completion.
        { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
      );
    }

  } catch (error) {
    console.error("Overall error processing request:", error);
    // Differentiate known error types (like JSON parsing) from unexpected errors
    if (error instanceof SyntaxError) { // From req.json() if body is not valid JSON
        return new Response(
            JSON.stringify({ error: "Invalid JSON in request body.", details: error.message }),
            { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
        );
    }
    // Generic error for other unexpected issues
    return new Response(
      JSON.stringify({ error: "Failed to process request due to an unexpected error.", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
});

console.log("Supabase Edge Function 'create-google-calendar-event' initialized and awaiting requests.");
