import React from 'react';
// Removed imports for useTestimonials, Testimonial type, Card, Star, QuoteIcon as they are no longer used for iframe version.
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * TestimonialsPage Component
 *
 * This page displays client testimonials by embedding a Google Site.
 * It previously fetched testimonials from Supabase but has been updated to use an iframe.
 */
const TestimonialsPage: React.FC = () => {
  // Removed useTestimonials hook and related state (testimonials, isLoading, error)

  // Calculate approximate height for the iframe
  const iframeContainerHeight = 'calc(100vh - 160px)'; // Adjust 160px based on actual header/footer/padding

  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Added bg-gray-50 for consistency if needed */}
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center"> {/* Centering content */}
        <section className="text-center mb-8 w-full"> {/* Reduced bottom margin */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We take pride in the positive impact we make. Here's what some of our valued clients have to share about their experiences with Claryon Group.
          </p>
        </section>

        {/* Iframe section for embedding Google Site Testimonials */}
        <section className="w-full flex-grow flex flex-col items-stretch">
          <div
            style={{
              width: '100%',
              height: iframeContainerHeight,
              minHeight: '600px', // Ensure a minimum sensible height
              overflow: 'hidden',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
            }}
            className="shadow-lg"
          >
            <iframe
              src="https://sites.google.com/claryongroup.com/testimonials/testimonials"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Claryon Group Testimonials"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
