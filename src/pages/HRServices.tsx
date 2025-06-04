import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * HRServices Page Component
 *
 * This page will outline the Human Resources consulting services provided by Claryon Group.
 * Content will be managed and fetched from a Wagtail CMS in the future.
 *
 * Current version: Placeholder content.
 *
 * TODO: Integrate with Wagtail API to display dynamic content for HR Services.
 *       This page should detail services like recruitment, employee relations, policy development, etc.
 */
const HRServices: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            Human Resources Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Strategic HR solutions to build, manage, and optimize your workforce effectively.
          </p>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="font-playfair text-2xl text-claryon-gray mb-6">Our HR Specializations:</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Recruitment & Talent Acquisition</h3>
              <p className="text-gray-700">
                Finding and attracting top talent to meet your organization's needs. We manage the full recruitment lifecycle,
                from job profiling to onboarding.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Employee Relations</h3>
              <p className="text-gray-700">
                Fostering a positive and productive work environment. We offer expertise in conflict resolution, performance management,
                and employee engagement strategies.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">HR Policy Development</h3>
              <p className="text-gray-700">
                Crafting and implementing HR policies that are compliant with local regulations and aligned with your business objectives.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-claryon-teal mb-2">Performance Management Systems</h3>
              <p className="text-gray-700">
                Designing and implementing effective performance appraisal and management systems to drive employee growth and productivity.
                {/* TODO: Add more detailed content from Wagtail here */}
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-xl text-claryon-gray">
              Learn more about how our HR expertise can benefit your organization.
            </p>
            <p className="mt-4 text-gray-600">
              For a personalized consultation, please <a href="/contact" className="text-claryon-teal hover:underline">get in touch</a>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HRServices;
