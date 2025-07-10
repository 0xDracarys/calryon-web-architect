'use client';

import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const BOOKING_REDIRECT_URL = "https://sites.google.com/claryongroup.com/testimonials/appointment";

export default function TemporaryBookingPage() { // Renaming component to match filename convention, though path is primary
  useEffect(() => {
    window.location.href = BOOKING_REDIRECT_URL;
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl font-bold text-claryon-gray mb-4">Redirecting to Booking Page...</h1>
        <p className="text-lg text-gray-600">
          Please wait while we redirect you to our appointment scheduling page.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          If you are not redirected automatically, please <a href={BOOKING_REDIRECT_URL} className="text-claryon-teal underline">click here</a>.
        </p>
      </main>
      <Footer />
    </div>
  );
}
