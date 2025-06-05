import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog'; // Assuming Post type is comprehensive enough
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch all blog posts for the admin view from Supabase.
 *
 * Fetches all posts regardless of their status or publication date.
 * Selects fields relevant for an admin list view.
 * Orders posts by 'updated_at' in descending order to show recently modified posts first.
 *
 * @returns {object} A TanStack Query object containing:
 *  - `data`: An array of Post objects if successful, otherwise undefined.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails.
 */
export const useAdminBlogPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['adminBlogPosts'], // Unique key for this admin-specific query
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          status,
          publication_date,
          author_name,
          updated_at,
          created_at
        `) // Added created_at for more info if needed
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching admin blog posts from Supabase:', error);
        throw new Error(error.message || 'Failed to fetch admin blog posts.');
      }

      // Ensure the data conforms to the Post type.
      // The Post type might have more fields than selected here (e.g., body_content),
      // but for the list view, these selected fields are sufficient.
      // Casting as Post[] assumes the selected fields are compatible subsets of Post.
      return data as Post[];
    },
    staleTime: 1000 * 60 * 1, // Cache for 1 minute for admin views, or less if frequent updates are expected
  });
};
