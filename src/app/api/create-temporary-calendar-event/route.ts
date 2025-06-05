import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import { z } from 'zod'; // For input validation

/**
 * API Route: /api/create-temporary-calendar-event
 *
 * Purpose:
 * This API route handles creating a new Google Calendar event for a temporary booking.
 * It uses a specific set of Google credentials (prefixed with TEMP_) intended for an
 * isolated booking system (e.g., for trimurut000@gmail.com's calendar).
 *
 * Request Method: POST
 * Expects a JSON body conforming to `appointmentSchema`.
 *
 * Environment Variables:
 * - TEMP_GOOGLE_CLIENT_ID: Client ID for the temporary Google project.
 * - TEMP_GOOGLE_CLIENT_SECRET: Client Secret for the temporary Google project.
 * - TEMP_TRIMURUT_GOOGLE_REFRESH_TOKEN: Refresh token for trimurut000@gmail.com.
 * - TEMP_TRIMURUT_GOOGLE_CALENDAR_ID: Calendar ID to book events on (e.g., "trimurut000@gmail.com").
 */

// Zod schema for validating the incoming request body.
// Ensures required fields are present and correctly formatted.
const appointmentSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(), // Optional phone number
  dateTime: z.string().datetime({ message: "Valid ISO datetime string is required" }), // Expected in ISO 8601 format (UTC)
  service: z.string().optional(), // Optional service description
  notes: z.string().optional(), // Optional notes
});

export async function POST(request: Request) {
  // --- Environment Variable Checks ---
  // These environment variables are specific to this temporary booking feature
  // and should be configured on the server (e.g., in Vercel environment variables).
  const {
    TEMP_GOOGLE_CLIENT_ID,
    TEMP_GOOGLE_CLIENT_SECRET,
    TEMP_TRIMURUT_GOOGLE_REFRESH_TOKEN,
    TEMP_TRIMURUT_GOOGLE_CALENDAR_ID,
  } = process.env;

  if (
    !TEMP_GOOGLE_CLIENT_ID ||
    !TEMP_GOOGLE_CLIENT_SECRET ||
    !TEMP_TRIMURUT_GOOGLE_REFRESH_TOKEN ||
    !TEMP_TRIMURUT_GOOGLE_CALENDAR_ID
  ) {
    console.error('CRITICAL: Missing Google Calendar API credentials for temporary booking feature.');
    return NextResponse.json(
      { error: 'API configuration error: Service unavailable due to missing credentials.' },
      { status: 500 }
    );
  }

  // --- Request Body Parsing and Validation ---
  let body;
  try {
    body = await request.json();
  } catch (error) {
    console.warn('Failed to parse request body as JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON input.' }, { status: 400 });
  }

  const validationResult = appointmentSchema.safeParse(body);
  if (!validationResult.success) {
    console.warn('Input validation failed:', validationResult.error.flatten().fieldErrors);
    return NextResponse.json(
      { error: 'Invalid input.', details: validationResult.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Destructure validated data
  const { name: clientName, email, dateTime, notes, phone, service } = validationResult.data;

  // --- Google OAuth Client Initialization ---
  // Initialize OAuth2 client with the specific temporary credentials.
  const oauth2Client = new google.auth.OAuth2(
    TEMP_GOOGLE_CLIENT_ID,
    TEMP_GOOGLE_CLIENT_SECRET
    // No redirect URI is needed here because we are using a refresh token directly,
    // which means the OAuth flow has already been completed once to obtain this token.
  );

  // Set the refresh token for the OAuth2 client. This allows the client to obtain new access tokens.
  oauth2Client.setCredentials({
    refresh_token: TEMP_TRIMURUT_GOOGLE_REFRESH_TOKEN,
  });

  // --- Google Calendar API Interaction ---
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // The `dateTime` from the client is expected to be an ISO 8601 string (UTC).
  const startTime = new Date(dateTime);
  // Calculate end time, assuming a 1-hour duration for the temporary booking.
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour later

  // Construct the Google Calendar event resource.
  const event = {
    summary: `Temporary Booking: ${clientName}`,
    description: `Client Email: ${email}${phone ? `
Client Phone: ${phone}` : ''}${notes ? `
Notes: ${notes}` : ''}${service ? `
Service: ${service}` : ''}`,
    start: {
      dateTime: startTime.toISOString(), // Ensure ISO format
      timeZone: 'UTC', // Explicitly set timezone to UTC as per API and calendar settings
    },
    end: {
      dateTime: endTime.toISOString(), // Ensure ISO format
      timeZone: 'UTC', // Explicitly set timezone to UTC
    },
    // Add attendees: the client and the calendar owner (trimurut000@gmail.com)
    attendees: [
      { email: email }, // Client's email
      { email: TEMP_TRIMURUT_GOOGLE_CALENDAR_ID }, // Calendar owner's email
    ],
    // Request Google Meet conference data for the event.
    conferenceData: {
      createRequest: {
        // A unique ID for the conference creation request.
        requestId: `temp-cal-meet-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' }, // Specify Google Meet as the solution
      },
    },
  };

  try {
    // Insert the event into the specified Google Calendar.
    // `conferenceDataVersion: 1` is required to ensure conference data (Google Meet link) is returned in the response.
    const createdEvent = await calendar.events.insert({
      calendarId: TEMP_TRIMURUT_GOOGLE_CALENDAR_ID,
      resource: event,
      conferenceDataVersion: 1,
    });

    console.log('Google Calendar event created successfully:', createdEvent.data.id);
    return NextResponse.json({
      message: 'Temporary appointment booked and Google Calendar event created successfully!',
      eventId: createdEvent.data.id,
      eventUrl: createdEvent.data.htmlLink,
      meetLink: createdEvent.data.hangoutLink, // Link to the Google Meet
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error creating Google Calendar event:', error.response ? JSON.stringify(error.response.data) : error.message);
    // Attempt to parse and return a more specific error message from Google API if available.
    let errorMessage = 'Failed to create Google Calendar event.';
    if (error.response && error.response.data && error.response.data.error) {
        errorMessage = `Google API Error: ${error.response.data.error.message || error.response.data.error}`;
    } else if (error.message) {
        errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage, details: error.response?.data?.error?.errors }, { status: 500 });
  }
}

/**
 * Basic GET handler for the endpoint.
 * Provides a simple message indicating the purpose of the endpoint.
 */
export async function GET() {
    return NextResponse.json({
        message: "This API endpoint is for creating temporary calendar events via POST request.",
        documentation_note: "Please ensure you are using the POST method with a valid JSON body."
    });
}
