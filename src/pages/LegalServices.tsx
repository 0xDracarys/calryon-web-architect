import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * LegalServices Page Component
 *
 * This page will display detailed information about the legal services offered by Claryon Group.
 * Content for this page will eventually be fetched from a Wagtail CMS.
 *
 * Current version: Placeholder content.
 *
 * TODO: Integrate with Wagtail API to fetch and display actual content for Legal Services.
 *       This will likely involve creating a specific page type in Wagtail for "Service Detail Page"
 *       or similar, with fields for title, description, sub-services, case studies, etc.
 */
const LegalServices: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            Legal Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Expert legal counsel and representation in immigration, criminal, and business law.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-playfair text-2xl text-claryon-gray mb-6">Our Legal Expertise Includes:</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Immigration Law</h3>
              <p className="text-gray-700">
                Navigating complex immigration procedures, visa applications, residency permits, and citizenship processes across Europe.
                We provide support for individuals, families, and businesses.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Criminal Law</h3>
              <p className="text-gray-700">
                Robust defense and legal representation for a wide range of criminal matters.
                Our experienced lawyers are dedicated to protecting your rights.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Business Law</h3>
              <p className="text-gray-700">
                Comprehensive legal solutions for businesses, including company formation, contract law, compliance, mergers and acquisitions,
                and dispute resolution.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-claryon-gray">
              Detailed service descriptions, case studies, and FAQs will be available here soon.
            </p>
            <p className="mt-4 text-gray-600">
              For immediate inquiries, please <a href="/contact" className="text-claryon-teal hover:underline">contact us</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LegalServices;
