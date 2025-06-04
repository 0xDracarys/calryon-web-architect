import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

const BlogPostDetailPage = () => {
  const { postId } = useParams<{ postId: string }>(); // Acknowledge postId, though not used yet

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Placeholder Hero - can be refined when actual content is available */}
      <section className="bg-gradient-to-br from-claryon-teal/5 via-white to-gray-100 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-6">
              Blog Post Details
            </h1>
            {postId && (
              <p className="text-md text-gray-500">
                (Attempting to load post: {postId})
              </p>
            )}
          </div>
        </div>
      </section>

      <main className="flex-grow py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="bg-sky-50 border-sky-200 text-sky-800">
            <Info className="h-5 w-5 text-sky-600" />
            <AlertTitle className="font-semibold">Content Coming Soon!</AlertTitle>
            <AlertDescription>
              The content for this blog post will be displayed here once our Wagtail CMS is integrated and the post is published.
              Currently, the system is not yet set up to fetch individual blog post details.
            </AlertDescription>
          </Alert>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostDetailPage;
