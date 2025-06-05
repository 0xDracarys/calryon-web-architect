import React from 'react';
// Link, useBlogPosts, Card components, Button are no longer needed for the iframe version.
import Header from '@/components/Header';
import Footer from '@/components/Footer';

/**
 * BlogIndex Page Component
 *
 * This page displays the company blog by embedding a Google Site.
 * It previously fetched posts from Supabase but has been updated to use an iframe.
 */
const BlogIndex: React.FC = () => {
  // Removed useBlogPosts hook and related state (posts, isLoading, error)

  // Calculate approximate height for the iframe to fill most of the viewport
  // Assuming header height is approx 80px (h-20) and footer is similar or less.
  // A common approach is 100vh - (header_height + footer_height + some_padding).
  // Let's use a simpler approach for now and make it mostly viewport height,
  // but allow scrolling within the iframe itself.
  // The container div will try to respect this height.
  const iframeContainerHeight = 'calc(100vh - 160px)'; // Adjust 160px based on actual header/footer/padding

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center"> {/* Centering content */}
        <section className="text-center mb-8 w-full"> {/* Reduced bottom margin */}
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            Our Insights & News
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore articles on legal updates, HR best practices, education strategies, business growth, and more from the Claryon Group experts.
          </p>
        </section>

        {/* Iframe section for embedding Google Site */}
        <section className="w-full flex-grow flex flex-col items-stretch">
          {/*
            The outer div helps in defining the area for the iframe.
            Using flex-grow on this section and its parent main allows it to take available vertical space.
            The height style on the div below is one way to control iframe height; another is aspect ratio.
            For a full-page feel iframe, ensuring parent elements can stretch is key.
            Here, min-height on the iframe itself ensures it's at least substantial.
          */}
          <div
            style={{
              width: '100%',
              height: iframeContainerHeight, // Use calculated height
              minHeight: '600px', // Ensure a minimum sensible height
              overflow: 'hidden', // Optional: hide scrollbars of this div if iframe handles its own
              border: '1px solid #e2e8f0', // Optional: subtle border around iframe
              borderRadius: '0.5rem', // Optional: rounded corners
            }}
            className="shadow-lg" // Optional: add some shadow
          >
            <iframe
              src="https://sites.google.com/claryongroup.com/testimonials/blogs"
              style={{ width: '100%', height: '100%', border: 'none' }}
              title="Claryon Group Blogs"
              // Consider adding sandbox attributes for security if applicable, though for Google Sites it's generally trusted.
              // sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            ></iframe>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndex;
