import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTestimonials } from '@/hooks/useTestimonials';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert'; // For error messages
import { Quote } from 'lucide-react';

const TestimonialsPage = () => {
  const { testimonials, isLoading, error } = useTestimonials();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-12 text-center">
            What Our Clients Say
          </h1>

          {isLoading && (
            <div className="text-center text-claryon-gray">
              <p className="text-xl">Loading testimonials...</p>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-8">
              <AlertDescription>{error || "Could not load testimonials."}</AlertDescription>
            </Alert>
          )}

          {!isLoading && !error && testimonials.length === 0 && (
            <div className="text-center text-claryon-gray">
              <p className="text-xl">No testimonials yet. Check back soon!</p>
            </div>
          )}

          {!isLoading && !error && testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="shadow-lg border-gray-200 hover:shadow-xl transition-shadow duration-300 ease-in-out">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl font-semibold text-claryon-gray">
                        {testimonial.client_name}
                      </CardTitle>
                      <Quote className="h-8 w-8 text-claryon-teal/50" />
                    </div>
                    {testimonial.service_availed && (
                      <CardDescription className="text-sm text-claryon-teal pt-1">
                        Service: {testimonial.service_availed}
                      </CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                    {testimonial.date_received && (
                      <p className="text-xs text-gray-500 mt-2 text-right">
                        Received: {formatDate(testimonial.date_received)}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
