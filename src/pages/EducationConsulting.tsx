import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * EducationConsulting Page Component
 *
 * This page will detail the education consulting services offered,
 * including university applications, visa assistance, and potentially partnerships with educational institutions.
 * Future content will be sourced from a Wagtail CMS.
 *
 * Current version: Placeholder content.
 *
 * TODO: Integrate with Wagtail API for dynamic content related to Education Consulting.
 */
const EducationConsulting: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            Education Consulting Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding students and institutions towards academic success in Europe and beyond.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-playfair text-2xl text-claryon-gray mb-6">Our Education Services:</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">University Applications</h3>
              <p className="text-gray-700">
                Comprehensive support for students applying to universities and higher education institutions.
                This includes program selection, application preparation, and personal statement guidance.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Student Visa Assistance</h3>
              <p className="text-gray-700">
                Expert assistance with student visa applications, ensuring all requirements are met for a smooth process.
                We provide guidance on documentation, interviews, and submission procedures.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Academic Program Planning</h3>
              <p className="text-gray-700">
                Personalized advice to help students choose the right academic path based on their career goals and interests.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Consulting for Educational Institutions</h3>
              <p className="text-gray-700">
                Strategic advice for educational institutions on internationalization, curriculum development, and student recruitment.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-claryon-gray">
              Unlock your educational potential with our expert guidance.
            </p>
            <p className="mt-4 text-gray-600">
              To discuss your specific needs, please <a href="/contact" className="text-claryon-teal hover:underline">contact our education consultants</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default EducationConsulting;
