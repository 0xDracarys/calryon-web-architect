
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import ServiceCard from '@/components/ServiceCard';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Users, GraduationCap, TrendingUp, Quote } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials';

const Index = () => {
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  const services = [
    {
      title: "Legal Services",
      description: "Comprehensive legal guidance for immigration, criminal, and business law matters across Europe.",
      features: [
        "Immigration Law & Visa Assistance",
        "Criminal Law Defense",
        "Business Law & Compliance",
        "Contract Review & Drafting"
      ],
      href: "/services/legal",
      icon: <Scale className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "HR Services",
      description: "Strategic human resources solutions to optimize your workforce and ensure compliance.",
      features: [
        "Recruitment & Talent Acquisition",
        "Employee Relations",
        "HR Policy Development",
        "Performance Management"
      ],
      href: "/services/hr",
      icon: <Users className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "Education Consulting",
      description: "Expert guidance for educational institutions and international students navigating European systems.",
      features: [
        "University Application Support",
        "Academic Program Planning",
        "Student Visa Assistance",
        "Educational Institution Consulting"
      ],
      href: "/services/education",
      icon: <GraduationCap className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "Business Consulting",
      description: "Strategic business guidance and mentorship to accelerate growth and market entry.",
      features: [
        "Market Entry Strategy",
        "Business Development",
        "Operational Optimization",
        "Executive Mentorship"
      ],
      href: "/services/business",
      icon: <TrendingUp className="h-8 w-8 text-claryon-teal" />
    }
  ];

  // Fallback testimonials if no data from database
  const fallbackTestimonials = [
    {
      id: '1',
      client_name: "Maria S.",
      service_availed: "Legal Services",
      quote: "Claryon Group helped me navigate the complex immigration process with expertise and care. Their team made what seemed impossible, possible."
    },
    {
      id: '2',
      client_name: "James L.",
      service_availed: "Business Consulting",
      quote: "The strategic guidance from Claryon Group was instrumental in our successful European market expansion. Highly recommended."
    },
    {
      id: '3',
      client_name: "Anna K.",
      service_availed: "Education Consulting",
      quote: "Thanks to their support, I secured admission to my dream university in Germany. The process was smooth and stress-free."
    }
  ];

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials.slice(0, 3) : fallbackTestimonials;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-claryon-teal/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-claryon-gray mb-6 animate-fade-in">
              Professional Consulting Services
              <span className="block text-claryon-teal">Across Europe & Beyond</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Expert guidance in legal, HR, education, and business consulting. 
              We help individuals and organizations navigate complex challenges with confidence and clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton to="/book-appointment" size="lg">
                Book Your Consultation
              </CTAButton>
              <CTAButton to="/services" variant="outline" size="lg">
                Explore Our Services
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">
              Our Core Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive consulting solutions tailored to meet your unique needs across four specialized verticals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">
              Why Choose Claryon Group?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our commitment to excellence, transparency, and client success sets us apart in the consulting industry.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Expertise</h3>
              <p className="text-gray-600">Deep knowledge across legal, HR, education, and business domains.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Trust</h3>
              <p className="text-gray-600">Transparent communication and ethical practices in every engagement.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Results</h3>
              <p className="text-gray-600">Proven track record of successful outcomes for our clients.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">
              Client Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied clients who have achieved their goals with our expert guidance.
            </p>
          </div>
          {testimonialsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full border-0 shadow-lg animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-8 w-8 bg-gray-300 rounded mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/3"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-claryon-teal mb-4" />
                    <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                    <div className="border-t border-gray-100 pt-4">
                      <p className="font-semibold text-claryon-gray">{testimonial.client_name}</p>
                      <p className="text-sm text-claryon-teal">{testimonial.service_availed}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <CTAButton to="/testimonials" variant="outline">
              View All Testimonials
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-claryon-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Take the first step towards achieving your goals. Book a consultation with our expert team today.
          </p>
          <CTAButton to="/book-appointment" variant="secondary" size="lg">
            Schedule Your Consultation
          </CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
