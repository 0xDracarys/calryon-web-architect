import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * BusinessConsulting Page Component
 *
 * This page will showcase business consulting services such as market entry strategies,
 * business development, operational optimization, and executive mentorship.
 * Content will be dynamically loaded from a Wagtail CMS.
 *
 * Current version: Placeholder content.
 *
 * TODO: Integrate with Wagtail API to fetch and display content for Business Consulting.
 */
const BusinessConsulting: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            Business Consulting Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strategic insights and practical solutions to drive business growth and efficiency.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-playfair text-2xl text-claryon-gray mb-6">Our Business Advisory Areas:</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Market Entry Strategy</h3>
              <p className="text-gray-700">
                Developing and executing effective strategies for entering new European markets.
                We provide market research, competitive analysis, and regulatory guidance.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Business Development</h3>
              <p className="text-gray-700">
                Identifying growth opportunities, building strategic partnerships, and enhancing sales and marketing efforts
                to expand your business reach.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Operational Optimization</h3>
              <p className="text-gray-700">
                Improving business processes, reducing costs, and increasing efficiency through operational reviews and targeted interventions.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Executive Mentorship</h3>
              <p className="text-gray-700">
                Providing personalized coaching and mentorship for senior executives and business leaders to enhance their strategic capabilities.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-claryon-gray">
              Partner with us to navigate the complexities of the business landscape.
            </p>
            <p className="mt-4 text-gray-600">
              <a href="/contact" className="text-claryon-teal hover:underline">Contact us</a> to discuss your business challenges and goals.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BusinessConsulting;
