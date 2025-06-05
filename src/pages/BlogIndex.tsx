import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts'; // Now uses Supabase with updated Post type
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * BlogIndex Page Component
 *
 * This page displays a list of blog posts fetched from Supabase.
 * It uses the `useBlogPosts` hook.
 *
 * TODO:
 * - Consider adding pagination if the number of blog posts grows significantly.
 * - Potentially add filtering or categorization options by 'tags'.
 */
const BlogIndex: React.FC = () => {
  const { data: posts, isLoading, error } = useBlogPosts();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-12">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-4">
            Our Insights & News
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore articles on legal updates, HR best practices, education strategies, business growth, and more from the Claryon Group experts.
          </p>
        </section>

        {isLoading && (
          <div className="text-center py-10">
            <p className="text-lg text-claryon-gray">Loading blog posts...</p>
            {/* You could add a more sophisticated spinner or skeleton loader here */}
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-lg text-red-600">Error loading blog posts: {error.message}</p>
          </div>
        )}

        {!isLoading && !error && posts && posts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Card key={post.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
                {/* Use hero_image_url for the main image */}
                {post.hero_image_url && (
                  <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.hero_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                )}
                <CardHeader className="pb-4">
                  <CardTitle className="font-playfair text-xl text-claryon-gray hover:text-claryon-teal transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  {/* Use author_name */}
                  {post.author_name && <p className="text-sm text-gray-500 pt-1">By {post.author_name}</p>}
                  {/* Use publication_date and ensure it's not null before formatting */}
                  {post.publication_date && (
                    <p className="text-xs text-gray-400 pt-1">
                      Published: {new Date(post.publication_date).toLocaleDateString()}
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  {/* Use introduction for the summary */}
                  <p className="text-gray-700 text-sm line-clamp-3">{post.introduction}</p>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button asChild variant="link" className="text-claryon-teal hover:text-claryon-dark-teal p-0">
                    <Link to={`/blog/${post.slug}`}>Read More &rarr;</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {!isLoading && !error && (!posts || posts.length === 0) && (
          <div className="text-center py-10">
            <p className="text-lg text-claryon-gray">No blog posts available at the moment. Please check back soon!</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogIndex;
