
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import CTAButton from '@/components/CTAButton';
import { Scale, Users, GraduationCap, TrendingUp } from 'lucide-react';

const Services = () => {
  const services = [
    {
      title: "Legal Services",
      description: "Comprehensive legal guidance for immigration, criminal, and business law matters across Europe.",
      features: [
        "Immigration Law & Visa Assistance",
        "Criminal Law Defense",
        "Business Law & Compliance",
        "Contract Review & Drafting",
        "Legal Documentation",
        "Court Representation"
      ],
      href: "/services/legal",
      icon: <Scale className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "HR Solutions",
      description: "Strategic HR support for both employers and job seekers—helping businesses build strong teams and individuals find meaningful careers in Europe.",
      features: [
        "Recruitment & Talent Acquisition",
        "Job Placement Across the EU",
        "Employee Relations & Support",
        "HR Policy & Compliance Consulting"
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
        "Educational Institution Consulting",
        "Scholarship Guidance",
        "Career Planning"
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
        "Executive Mentorship",
        "Financial Planning",
        "Risk Management"
      ],
      href: "/services/business",
      icon: <TrendingUp className="h-8 w-8 text-claryon-teal" />
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
              Our Professional Services
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Comprehensive consulting solutions across four specialized verticals, 
              designed to meet your unique needs and drive success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">
              Our Consulting Process
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A structured approach to delivering exceptional results for every client engagement.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Discovery</h3>
              <p className="text-gray-600">Understanding your unique challenges and objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Strategy</h3>
              <p className="text-gray-600">Developing tailored solutions and actionable plans</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Implementation</h3>
              <p className="text-gray-600">Executing strategies with expert guidance and support</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                4
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Success</h3>
              <p className="text-gray-600">Achieving your goals and measuring tangible results</p>
            </div>
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
            Choose the service that best fits your needs, or book a consultation to discuss a custom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/book-appointment" variant="secondary" size="lg">
              Book Consultation
            </CTAButton>
            <CTAButton to="/contact" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-claryon-teal">
              Contact Us
            </CTAButton>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
