import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch a single published blog post by its slug from Supabase.
 *
 * This hook queries the 'blog_posts' table for a single record that meets the following criteria:
 * - Its 'slug' column matches the provided slug.
 * - Its 'status' column is 'published'.
 * - Its 'published_date' is not in the future (i.e., less than or equal to the current time).
 *
 * It uses `.maybeSingle()` which returns either a single record or null if no matching record is found,
 * without throwing an error for "zero rows". An error is only thrown for other database issues.
 *
 * @param {string | null | undefined} slug - The slug of the blog post to fetch. If null or undefined, the query is disabled.
 * @returns {object} A TanStack Query object containing:
 *  - `data`: A Post object if found and conditions met, null if not found, or undefined while loading.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails for reasons other than "not found".
 */
export const useBlogPost = (slug: string | null | undefined) => {
  return useQuery<Post | null, Error>({
    // Query key includes the slug to ensure unique caching per blog post
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      // If no slug is provided, the query is disabled by the 'enabled' option,
      // but this check provides an early return if it were somehow to run.
      if (!slug) {
        return null;
      }

      const todayISO = new Date().toISOString(); // Current time for 'published_date' comparison

      // Construct the Supabase query
      const { data, error } = await supabase
        .from('blog_posts') // Target the 'blog_posts' table
        .select(`
          id,
          title,
          slug,
          summary,
          content,       // Full content for the detail view
          published_date,
          author,        // Assumes 'author' column exists and matches Post.author type
          image_url,
          status
        `) // Select specified columns
        .eq('slug', slug) // Filter by the provided slug
        .eq('status', 'published') // Filter for posts with status 'published'
        .lte('published_date', todayISO) // Filter for posts published up to or including today
        .maybeSingle(); // Fetches a single row or null. Does not error if no row is found.

      if (error) {
        // This error would be for issues other than "not found", e.g., database connection problems.
        console.error(`Error fetching post with slug "${slug}" from Supabase:`, error);
        throw new Error(error.message || `Failed to fetch post with slug "${slug}" from Supabase.`);
      }

      if (data) {
        console.log(`useBlogPost: Successfully fetched post for slug "${slug}".`);
      } else {
        // This is not an error state for React Query, but indicates the post wasn't found or wasn't published.
        // The component using this hook should handle the 'null' data case (e.g., show a "Not Found" message).
        console.warn(`useBlogPost: Post with slug "${slug}" not found or not published.`);
      }

      // Data from Supabase should directly map to the Post type or null.
      return data as Post | null;
    },
    // The query will only run if 'slug' is a truthy value (not null, undefined, or empty string).
    enabled: !!slug,
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};
