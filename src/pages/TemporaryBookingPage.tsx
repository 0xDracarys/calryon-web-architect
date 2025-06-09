'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TemporaryBookingPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8 md:py-12 flex-grow flex flex-col items-center justify-center">
        <section className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl md:text-5xl font-playfair">
            Temporary Booking
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 sm:mt-4 max-w-2xl mx-auto">
            This page is currently not in direct use for booking. Please use the link in the navigation menu.
          </p>
          {/* Optional: Add a direct link here as well if desired, though the header link is primary.
          <a
            href="https://sites.google.com/claryongroup.com/testimonials/appointment"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-claryon-teal hover:bg-claryon-dark-teal"
          >
            Go to Appointment Page
          </a>
          */}
        </section>
      </main>
      <Footer />
    </>
  );
}
