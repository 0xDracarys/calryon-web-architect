import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const BlogIndexPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section (Optional, but good for consistency) */}
      <section className="bg-gradient-to-br from-claryon-teal/5 via-white to-gray-100 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Stay updated with the latest news, insights, and articles from our team.
            </p>
          </div>
        </div>
      </section>

      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-sky-50 border-sky-200 text-sky-800">
            <Info className="h-5 w-5 text-sky-600" />
            <AlertTitle className="font-semibold">Coming Soon!</AlertTitle>
            <AlertDescription>
              Our blog is under active development and will be available shortly.
              This section will feature articles and insights once our Wagtail CMS is integrated.
              Thank you for your patience!
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogIndexPage;
