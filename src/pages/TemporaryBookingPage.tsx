'use client'; // Required for React Hook Form and event handlers

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Loader2 } from 'lucide-react';

/**
 * TemporaryBookingPage Component
 *
 * This page provides an isolated booking system that interacts with a specific Google Calendar
 * (trimurut000@gmail.com) via a dedicated Next.js API route. It allows users to view
 * an embedded calendar for availability and submit a booking request form.
 *
 * Features:
 * - Displays an embedded Google Calendar.
 * - Provides a form for users to input their booking details.
 * - Uses React Hook Form with Zod for client-side form validation.
 * - Submits form data to the `/api/create-temporary-calendar-event` API endpoint.
 * - Displays toast notifications for submission status (loading, success, error).
 */

// Zod Schema for validating form inputs.
// Ensures that required fields are provided and emails are correctly formatted.
// Date and time inputs are expected as strings and validated for presence.
const tempBookingFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(), // Optional phone number
  desiredDate: z.string().min(1, 'Please select a date from the calendar.'), // Expected YYYY-MM-DD format
  desiredTime: z.string().min(1, 'Please select a time from the calendar.'), // Expected HH:MM (24-hour) format
  service: z.string().optional(), // Optional service description
  notes: z.string().optional(), // Optional notes from the user
});

type TempBookingFormValues = z.infer<typeof tempBookingFormSchema>;

export default function TemporaryBookingPage() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<TempBookingFormValues>({
    resolver: zodResolver(tempBookingFormSchema),
    defaultValues: { // Default values for the form fields
      name: '',
      email: '',
      phone: '',
      desiredDate: '',
      desiredTime: '',
      service: '',
      notes: '',
    },
  });

  /**
   * Handles form submission.
   * Validates data, constructs the payload, calls the API endpoint,
   * and provides user feedback via toast notifications.
   */
  const onSubmit = async (data: TempBookingFormValues) => {
    setIsSubmitting(true);
    let toastId; // To manage the lifecycle of the toast notification

    try {
      // Combine user's local date and time input into a Date object.
      // This parsing assumes the user's local timezone.
      const localDateTime = new Date(`${data.desiredDate}T${data.desiredTime}:00`);
      if (isNaN(localDateTime.getTime())) {
        // This should ideally be caught by Zod if date/time inputs were more strictly typed,
        // but good as a fallback if input types allow invalid combinations.
        toast.error("Invalid date or time selected. Please check your input.", { duration: 5000 });
        setIsSubmitting(false);
        return;
      }
      // Convert the local date/time to an ISO 8601 string in UTC (e.g., "2023-12-25T14:30:00.000Z").
      // The backend API is designed to interpret this UTC string for Google Calendar event creation.
      const combinedDateTimeISO = localDateTime.toISOString();

      // Construct the payload for the API request.
      const payload = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        dateTime: combinedDateTimeISO, // The combined and UTC-converted ISO string
        service: data.service,
        notes: data.notes,
      };

      toastId = toast.loading('Submitting your booking request...'); // Initial loading toast

      // Make the API call to the backend endpoint.
      const response = await fetch('/api/create-temporary-calendar-event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // Send the payload as a JSON string
      });

      if (response.ok) {
        // If the API responds with a success status (e.g., 200 OK)
        const result = await response.json();
        toast.success(
          `Booking request submitted! ${result.message || ''}${result.meetLink ? ` Google Meet link: ${result.meetLink}` : ''}`,
          { id: toastId, duration: 10000 } // Update toast to success, show for 10s
        );
        form.reset(); // Reset form fields after successful submission
      } else {
        // If the API responds with an error status
        const errorResult = await response.json();
        console.error('API Error:', errorResult);
        let errorMessage = errorResult.error || 'Booking failed. Please try again.';
        // If Zod validation errors are returned from API, include them in the message.
        if (errorResult.details && typeof errorResult.details === 'object') {
          const details = Object.entries(errorResult.details)
            .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
            .join('; ');
          errorMessage += ` Details: ${details}`;
        }
        toast.error(errorMessage, { id: toastId, duration: 10000 }); // Update toast to error, show for 10s
      }
    } catch (error: any) {
      // Catch network errors or other unexpected issues during the fetch operation
      console.error('Network or unexpected error during form submission:', error);
      toast.error(`An error occurred: ${error.message || 'Please check your network connection and try again.'}`, { id: toastId, duration: 8000 });
    } finally {
      setIsSubmitting(false); // Re-enable the form in all cases
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl font-playfair">
            Book a Consultation Slot (Temp)
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 sm:mt-4 max-w-2xl mx-auto">
            Please check the calendar below for my availability (trimurut000@gmail.com). Then, use the form to request your preferred date and time.
          </p>
        </section>

        {/* Embedded Google Calendar Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">
            Availability Calendar for trimurut000@gmail.com
          </h2>
          <div
            className="aspect-[4/3] md:aspect-[16/9] max-w-4xl mx-auto rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
          >
            {/* The iframe embeds the public Google Calendar. `ctz=UTC` ensures times are relative to UTC. */}
            <iframe
              src="https://calendar.google.com/calendar/embed?src=trimurut000%40gmail.com&ctz=UTC"
              style={{ border: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              scrolling="no"
              title="Temporary Booking Calendar - trimurut000@gmail.com"
            ></iframe>
          </div>
        </section>

        {/* Booking Request Form Section */}
        <section className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900 dark:text-gray-100">Booking Request Form</h2>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Form Fields with Labels and Error Messages */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</Label>
              <Input id="name" {...form.register('name')} disabled={isSubmitting} className="mt-1 block w-full" />
              {form.formState.errors.name && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</Label>
              <Input id="email" type="email" {...form.register('email')} disabled={isSubmitting} className="mt-1 block w-full" />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number (Optional)</Label>
              <Input id="phone" type="tel" {...form.register('phone')} disabled={isSubmitting} className="mt-1 block w-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <Label htmlFor="desiredDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Desired Date</Label>
                <Input id="desiredDate" type="date" {...form.register('desiredDate')} disabled={isSubmitting} className="mt-1 block w-full" />
                {form.formState.errors.desiredDate && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.desiredDate.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="desiredTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Desired Time (24h format)</Label>
                <Input id="desiredTime" type="time" {...form.register('desiredTime')} disabled={isSubmitting} className="mt-1 block w-full" placeholder="e.g., 14:30" />
                {form.formState.errors.desiredTime && (
                  <p className="text-sm text-red-600 mt-1">{form.formState.errors.desiredTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="service" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Service of Interest (Optional)</Label>
              <Input id="service" {...form.register('service')} disabled={isSubmitting} className="mt-1 block w-full" />
            </div>

            <div>
              <Label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Notes (Optional)</Label>
              <Textarea id="notes" {...form.register('notes')} rows={4} disabled={isSubmitting} className="mt-1 block w-full" />
            </div>

            <div>
              <Button type="submit" className="w-full flex justify-center py-2 px-4" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                {isSubmitting ? 'Submitting Request...' : 'Submit Request'}
              </Button>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
