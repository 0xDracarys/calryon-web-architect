import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPost } from '@/hooks/useBlogPost'; // Now uses Supabase
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, UserCircle } from 'lucide-react';

/**
 * BlogPostDetail Page Component
 *
 * This page displays the full content of a single blog post fetched from Supabase.
 * The post slug is retrieved from the URL parameters.
 * It uses the `useBlogPost` hook.
 *
 * TODO:
 * - Ensure proper sanitization if `dangerouslySetInnerHTML` is used with real API data,
 *   or switch to a Markdown renderer if content is Markdown from Supabase.
 * - Consider adding social sharing buttons.
 */
const BlogPostDetail: React.FC = () => {
  const { postId: postSlug } = useParams<{ postId: string }>(); // postId from route is treated as slug
  const { data: post, isLoading, error } = useBlogPost(postSlug);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button asChild variant="outline" size="sm" className="bg-white hover:bg-gray-100">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Posts
              </Link>
            </Button>
          </div>

          {isLoading && (
            <div className="text-center py-20">
              <p className="text-lg text-claryon-gray">Loading post content...</p>
              {/* Consider a more engaging loader, e.g., skeleton content */}
            </div>
          )}

          {error && (
            <div className="text-center py-20 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Post</h2>
              <p className="text-gray-700">{error.message}</p>
              <p className="mt-4 text-sm text-gray-500">Please try again later or navigate back to the blog index.</p>
            </div>
          )}

          {!isLoading && !error && post && (
            <article className="bg-white p-6 md:p-10 rounded-lg shadow-xl">
              <header className="mb-6 border-b border-gray-200 pb-6">
                <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-claryon-gray mb-3 leading-tight">
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <CalendarDays className="mr-1.5 h-4 w-4 text-claryon-teal" />
                    <span>Published on {new Date(post.published_date).toLocaleDateString()}</span>
                  </div>
                  {/* Use post.author (updated from post.author_name) */}
                  {post.author && (
                    <div className="flex items-center">
                      <UserCircle className="mr-1.5 h-4 w-4 text-claryon-teal" />
                      <span>By {post.author}</span>
                    </div>
                  )}
                </div>
              </header>

              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={`Cover image for ${post.title}`}
                  className="w-full h-auto object-cover rounded-lg mb-8 shadow-md max-h-[450px]"
                />
              )}

              {/* Using "prose" class for Tailwind Typography plugin for nice article styling */}
              {/* Ensure Tailwind Typography plugin is installed and configured if you use this. */}
              {/* TODO: Ensure post.content is sanitized if it's HTML, or use a Markdown renderer */}
              <div
                className="prose prose-lg max-w-none text-gray-800 prose-headings:text-claryon-dark-gray prose-a:text-claryon-teal hover:prose-a:text-claryon-dark-teal"
                dangerouslySetInnerHTML={{ __html: post.content || "" }}
              />
            </article>
          )}

          {!isLoading && !error && !post && (
            <div className="text-center py-20 bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-3xl font-playfair font-semibold text-claryon-gray mb-4">Post Not Found</h2>
              <p className="text-gray-600 mb-8">
                Sorry, we couldn't find the blog post you're looking for.
                It might have been moved, deleted, or the link might be incorrect.
              </p>
              <Button asChild size="lg">
                <Link to="/blog">Go Back to Blog Index</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostDetail;
