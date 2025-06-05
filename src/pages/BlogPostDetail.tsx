import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPost } from '@/hooks/useBlogPost';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CalendarDays, UserCircle, Tag } from 'lucide-react';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import remarkGfm from 'remark-gfm'; // Import remarkGfm for GitHub Flavored Markdown

/**
 * BlogPostDetail Page Component
 *
 * This page displays the full content of a single blog post fetched from Supabase.
 * The post slug is retrieved from the URL parameters.
 * It uses the `useBlogPost` hook.
 * It renders Markdown content using react-markdown.
 *
 * TODO:
 * - Ensure Tailwind Typography plugin (`@tailwindcss/typography`) is configured
 *   if `prose` class is intended for Markdown styling.
 * - Consider adding social sharing buttons.
 */
const BlogPostDetail: React.FC = () => {
  const { postId: postSlug } = useParams<{ postId: string }>();
  const { data: post, isLoading, error } = useBlogPost(postSlug);

  // Helper to render body content based on its type
  const renderBodyContent = () => {
    if (!post || !post.body_content) {
      return <p className="text-gray-500">No content available for this post.</p>;
    }

    // Assuming body_content is a string. If it's JSONB that needs parsing,
    // that should happen in the hook or before this point.
    const contentString = typeof post.body_content === 'string'
      ? post.body_content
      : JSON.stringify(post.body_content); // Fallback for non-string JSONB

    if (post.body_content_type === 'markdown') {
      return (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contentString}
        </ReactMarkdown>
      );
    } else if (post.body_content_type === 'html') {
      // Ensure content is sanitized if from untrusted source.
      // For admin-entered content, this might be acceptable.
      return <div dangerouslySetInnerHTML={{ __html: contentString }} />;
    } else {
      // Default to rendering as plain text in a <pre> tag for other types or if type is null/undefined
      return <pre className="whitespace-pre-wrap break-words">{contentString}</pre>;
    }
  };

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
                <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                  {post.publication_date && (
                    <div className="flex items-center">
                      <CalendarDays className="mr-1.5 h-4 w-4 text-claryon-teal" />
                      <span>Published on {new Date(post.publication_date).toLocaleDateString()}</span>
                    </div>
                  )}
                  {post.author_name && (
                    <div className="flex items-center">
                      <UserCircle className="mr-1.5 h-4 w-4 text-claryon-teal" />
                      <span>By {post.author_name}</span>
                    </div>
                  )}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <Tag className="h-4 w-4 text-claryon-teal mr-1" />
                    {post.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 bg-claryon-teal/10 text-claryon-teal text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </header>

              {post.hero_image_url && (
                <img
                  src={post.hero_image_url}
                  alt={`Cover image for ${post.title}`}
                  className="w-full h-auto object-cover rounded-lg mb-8 shadow-md max-h-[450px]"
                />
              )}

              {post.introduction && (
                <p className="text-lg italic text-gray-700 mb-6 border-l-4 border-claryon-teal pl-4 py-2 bg-gray-50 rounded-r-md">
                  {post.introduction}
                </p>
              )}

              {/* Main Content - Apply prose for Tailwind Typography styling */}
              <div
                className="prose prose-lg max-w-none text-gray-800 prose-headings:text-claryon-dark-gray prose-a:text-claryon-teal hover:prose-a:text-claryon-dark-teal"
              >
                {renderBodyContent()}
              </div>
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
