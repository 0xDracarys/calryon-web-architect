
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import { Card, CardContent } from '@/components/ui/card';
import { Target, Eye, Heart, Users } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Heart className="h-8 w-8 text-claryon-teal" />,
      title: "Trust",
      description: "We build lasting relationships based on transparency, integrity, and reliable service delivery."
    },
    {
      icon: <Target className="h-8 w-8 text-claryon-teal" />,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, ensuring exceptional outcomes for our clients."
    },
    {
      icon: <Users className="h-8 w-8 text-claryon-teal" />,
      title: "Empathy",
      description: "We understand the challenges our clients face and provide compassionate, personalized solutions."
    },
    {
      icon: <Eye className="h-8 w-8 text-claryon-teal" />,
      title: "Transparency",
      description: "Clear communication and honest guidance are the foundations of our client relationships."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-claryon-teal/5 via-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-6">
              About Claryon Group
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are a trusted consulting partner dedicated to providing expert guidance 
              across legal, HR, education, and business matters throughout Europe and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-playfair text-3xl font-bold text-claryon-gray mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To empower individuals and organizations by providing expert consulting services 
                that simplify complex challenges and create pathways to success. We believe 
                everyone deserves access to professional guidance that can transform their 
                personal and professional journey.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our comprehensive approach to legal, HR, education, and business 
                consulting, we bridge gaps, break down barriers, and build foundations 
                for sustainable growth and achievement.
              </p>
            </div>
            <div>
              <h2 className="font-playfair text-3xl font-bold text-claryon-gray mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                To be the leading consulting group in Europe, recognized for our expertise, 
                integrity, and commitment to client success. We envision a future where 
                geographical and regulatory complexities never stand in the way of 
                human potential and business growth.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                By 2030, we aim to have facilitated thousands of successful outcomes, 
                from immigration cases to business expansions, educational placements 
                to organizational transformations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide every decision we make and every service we provide, 
              ensuring consistent excellence in our client relationships.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-claryon-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Background */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-8 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-lg leading-relaxed mb-6">
                Founded with a vision to simplify complex regulatory and business landscapes, 
                Claryon Group emerged from the recognition that individuals and organizations 
                often struggle to navigate the intricate systems across different European 
                jurisdictions and markets.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Our founders, experienced professionals from legal, HR, education, and business 
                backgrounds, came together to create a comprehensive consulting platform that 
                addresses the interconnected challenges faced by our clients. Whether it's 
                an individual seeking to relocate for education or work, or a business looking 
                to expand into new markets, we understand that success often requires expertise 
                across multiple domains.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What sets us apart is our holistic approach. We don't just provide isolated 
                advice in one area – we consider how legal, HR, educational, and business 
                factors interact to create comprehensive solutions that work in the real world.
              </p>
              <p className="text-lg leading-relaxed">
                Today, Claryon Group serves clients across Europe and non-EU countries, 
                helping them achieve their goals through expert guidance, strategic planning, 
                and dedicated support throughout their journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">
              Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the professionals who make our mission possible. Our diverse team brings 
              together decades of experience across all our service verticals.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <Users className="h-16 w-16 text-claryon-teal mx-auto mb-6" />
            <h3 className="font-playfair text-2xl font-semibold text-claryon-gray mb-4">
              Team Profiles Coming Soon
            </h3>
            <p className="text-gray-600 mb-6">
              We're currently updating our team profiles to showcase the expertise 
              and experience of our consulting professionals.
            </p>
            <CTAButton to="/contact" variant="outline">
              Get in Touch
            </CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-claryon-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Discover how our expertise can help you achieve your goals. Let's start the conversation.
          </p>
          <CTAButton to="/book-appointment" variant="secondary" size="lg">
            Book Your FREE Consultation
          </CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
