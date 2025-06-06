import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch a list of published blog posts from Supabase.
 *
 * This hook queries the 'blog_posts' table for records that meet the following criteria:
 * - Their 'status' column is 'published'.
 * - Their 'publication_date' is not null and not in the future (i.e., less than or equal to the current time).
 * The results are ordered by 'publication_date' in descending order, showing the most recent posts first.
 *
 * @returns {object} A TanStack Query object containing:
 *  - `data`: An array of Post objects if successful, otherwise undefined.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails.
 */
export const useBlogPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['blogPosts'], // Unique key for this query for caching and refetching
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

      // Construct the Supabase query
      const { data, error } = await supabase
        .from('blog_posts') // Target the 'blog_posts' table
        .select(`
          id,
          created_at,
          updated_at,
          title,
          slug,
          publication_date,
          introduction,
          hero_image_url,
          author_name,
          tags,
          status
        `) // Select columns aligned with the Post interface for list view
           // Omitting body_content and body_content_type for list view brevity
        .eq('status', 'published')        // Filter for posts with status 'published'
        .not('publication_date', 'is', null) // Ensure publication_date is not null
        .lte('publication_date', today)   // Filter for posts with publication_date up to or including today
        .order('publication_date', { ascending: false }); // Order by most recent publication_date

      if (error) {
        // Log the error and re-throw to be caught by React Query
        console.error('Error fetching blog posts from Supabase:', error);
        throw new Error(error.message || 'Failed to fetch blog posts from Supabase.');
      }

      // Data from Supabase should directly map to the Post[] type.
      // The `Post` interface fields are named to match Supabase snake_case columns.
      return data as Post[];
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes to reduce redundant fetches
  });
};
