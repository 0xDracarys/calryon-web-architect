import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch a list of published blog posts from Supabase.
 *
 * This hook queries the 'blog_posts' table for records that meet the following criteria:
 * - Their 'status' column is 'published'.
 * - Their 'published_date' is not in the future (i.e., less than or equal to the current time).
 * The results are ordered by 'published_date' in descending order, showing the most recent posts first.
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
      const todayISO = new Date().toISOString(); // Get current time in ISO format for comparison

      // Construct the Supabase query
      const { data, error } = await supabase
        .from('blog_posts') // Target the 'blog_posts' table
        .select(`
          id,
          title,
          slug,
          summary,
          published_date,
          author,        // Assumes 'author' column exists and matches Post.author type
          image_url,
          status
        `) // Select specified columns
        .eq('status', 'published') // Filter for posts with status 'published'
        .lte('published_date', todayISO) // Filter for posts with published_date up to or including today
        .order('published_date', { ascending: false }); // Order by most recent published_date

      if (error) {
        // Log the error and re-throw to be caught by React Query
        console.error('Error fetching blog posts from Supabase:', error);
        throw new Error(error.message || 'Failed to fetch blog posts from Supabase.');
      }

      // Data from Supabase should directly map to the Post[] type if:
      // 1. Selected column names match the Post interface fields (or are aliased in the select).
      // 2. Data types returned by Supabase are compatible with the Post interface field types.
      // The 'author' field is assumed to be a text column in Supabase matching Post.author.
      return data as Post[];
    },
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes to reduce redundant fetches
  });
};
