import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTestimonials } from '@/hooks/useTestimonials'; // Now uses Supabase
import type { Testimonial } from '@/types/testimonials'; // Import type for clarity
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Star, Quote as QuoteIcon } from 'lucide-react';

/**
 * TestimonialsPage Component
 *
 * This page is dedicated to showcasing client testimonials fetched from Supabase
 * using the `useTestimonials` hook.
 *
 * TODO:
 * - Consider adding filtering options (e.g., by service type, rating) if applicable.
 * - The design might be further enhanced to make testimonials more visually engaging.
 */
const TestimonialsPage: React.FC = () => {
  const { data: testimonials, isLoading, error } = useTestimonials();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            What Our Clients Say
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We take pride in the positive impact we make. Here's what some of our valued clients have to share about their experiences with Claryon Group.
          </p>
        </section>

        {isLoading && (
          <div className="text-center py-10">
            <p className="text-lg text-claryon-gray">Loading testimonials...</p>
            {/* You could add a more sophisticated loader, e.g., skeleton cards */}
          </div>
        )}

        {error && (
          <div className="text-center py-10 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Testimonials</h2>
            <p className="text-gray-700">{error.message}</p>
             <p className="mt-4 text-sm text-gray-500">Please try again later.</p>
          </div>
        )}

        {!isLoading && !error && testimonials && testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: Testimonial) => (
              <Card key={testimonial.id} className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                <CardHeader className="pb-4 bg-claryon-teal/5 p-6">
                  <CardTitle className="font-playfair text-xl text-claryon-gray">{testimonial.client_name}</CardTitle>
                  {testimonial.rating !== null && typeof testimonial.rating === 'number' && (
                    <div className="flex items-center mt-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                       <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <div className="flex items-start">
                    <QuoteIcon className="h-5 w-5 text-claryon-teal mr-3 flex-shrink-0 transform scale-x-[-1]" />
                    <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                  </div>
                </CardContent>
                {testimonial.service_availed && (
                  <CardFooter className="pt-4 pb-6 px-6 border-t bg-gray-50">
                    <p className="text-sm text-claryon-teal font-semibold">
                      Service Availed: {testimonial.service_availed}
                    </p>
                  </CardFooter>
                )}
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && (!testimonials || testimonials.length === 0) && (
          <div className="text-center py-20 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-claryon-gray mb-4">No Testimonials Yet</h2>
            <p className="text-gray-600">
              We are currently gathering testimonials from our valued clients.
              Please check back later to see what they have to say about our services.
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;
