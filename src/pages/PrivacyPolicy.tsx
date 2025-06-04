import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * PrivacyPolicy Page Component
 *
 * This page will display the company's Privacy Policy.
 * The content for this page will be critical and should be carefully drafted
 * and eventually managed via Wagtail CMS for easy updates.
 *
 * Current version: Placeholder content.
 *
 * TODO:
 * - Populate with actual Privacy Policy content.
 * - Integrate with Wagtail API to fetch this content, likely from a "FlatPage"
 *   or a specific "LegalPage" type in Wagtail.
 */
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <article className="max-w-3xl mx-auto bg-white p-8 md:p-10 rounded-lg shadow-lg">
          <header className="text-center mb-10">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-500">Last Updated: [Date to be added]</p>
          </header>

          <section className="prose prose-lg max-w-none text-gray-700">
            <h2 className="font-playfair text-xl text-claryon-dark-gray">1. Introduction</h2>
            <p>
              Welcome to Claryon Group. We are committed to protecting your personal information and your right to privacy.
              If you have any questions or concerns about our policy, or our practices with regards to your personal information,
              please contact us at [Contact Email/Link].
            </p>
            <p>
              This privacy policy applies to all information collected through our website ([YourWebsiteURL.com]),
              and/or any related services, sales, marketing or events (we refer to them collectively in this privacy policy as the "Services").
            </p>
            <p className="font-semibold mt-4">
              Placeholder: The full, legally reviewed Privacy Policy content will be added here.
              This will include sections on:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Information We Collect (Personal Data, Usage Data, Cookies)</li>
              <li>How We Use Your Information</li>
              <li>Will Your Information Be Shared With Anyone?</li>
              <li>How We Keep Your Information Safe</li>
              <li>Your Privacy Rights (e.g., GDPR, CCPA if applicable)</li>
              <li>Data Retention</li>
              <li>Policy for Minors</li>
              <li>Updates to This Policy</li>
              <li>How to Contact Us</li>
            </ul>

            {/* Example of how a section might look eventually */}
            {/* <h2 className="font-playfair text-xl text-claryon-dark-gray mt-6">2. Information We Collect</h2>
            <p>
              We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our products and services,
              when participating in activities on the Services or otherwise contacting us.
            </p>
            <p>
              The personal information that we collect depends on the context of your interactions with us and the Services,
              the choices you make and the products and features you use. The personal information we collect can include the following: ...
            </p> */}

            <div className="mt-12 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm">
              <p className="font-medium text-blue-700">
                This is a placeholder page. The final Privacy Policy will be provided by Claryon Group's legal team
                and will be published here once available.
              </p>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
