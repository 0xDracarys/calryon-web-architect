'use client'; // Keep if any client-side interactions remain, though likely not needed for simple iframe.

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// Remove unused imports like useForm, zodResolver, z, Button, Input, Textarea, Label, toast, Loader2

export default function TemporaryBookingPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow flex flex-col">
        <section className="mb-12 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl font-playfair">
            Book Your Consultation
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 sm:mt-4 max-w-2xl mx-auto">
            Please use the calendar below to schedule your appointment directly.
          </p>
        </section>

        <section className="flex-grow w-full">
          <div
            className="w-full h-[calc(100vh-250px)] md:h-[calc(100vh-200px)] min-h-[600px] rounded-lg overflow-hidden shadow-xl border border-gray-200 dark:border-gray-700"
            // Adjust height (e.g., 250px for header/footer/padding, 200px for md screens) and min-height as needed
          >
            <iframe
              src="https://calendar.app.google/k68UA4Mf8yxGqcxg8"
              style={{ border: 0, width: '100%', height: '100%' }}
              frameBorder="0"
              scrolling="yes" // Allow scrolling for Google's booking UI
              title="Book Appointment Slot"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
