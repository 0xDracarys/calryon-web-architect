import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch a single blog post by its ID for the admin view from Supabase.
 *
 * Fetches a post regardless of its status or publication date.
 * Selects all fields necessary for editing.
 *
 * @param {string | null | undefined} postId - The ID (UUID) of the blog post to fetch.
 * @returns {object} A TanStack Query object containing:
 *  - `data`: A Post object if found, null if not found, or undefined while loading.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails.
 */
export const useAdminBlogPost = (postId: string | null | undefined) => {
  return useQuery<Post | null, Error>({
    queryKey: ['adminBlogPost', postId],
    queryFn: async () => {
      if (!postId) {
        return null;
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select(`
          id,
          created_at,
          updated_at,
          title,
          slug,
          publication_date,
          introduction,
          hero_image_url,
          body_content_type,
          body_content,
          author_name,
          tags,
          status
        `)
        .eq('id', postId)
        .maybeSingle();

      if (error) {
        console.error(`Error fetching admin post with ID "${postId}" from Supabase:`, error);
        throw new Error(error.message || `Failed to fetch admin post with ID "${postId}".`);
      }

      // The 'tags' field from Supabase (TEXT[]) is already string[].
      // The 'body_content' (JSONB) will be fetched as an object or string by Supabase client.
      // If it's stored as { "type": "markdown", "text": "..." }, then data.body_content.text would be the markdown string.
      // For now, we assume data.body_content directly contains the markdown string or the object that the form will handle.
      return data as Post | null;
    },
    enabled: !!postId, // Only run if postId is provided
    staleTime: 1000 * 60 * 1, // Cache for 1 minute
  });
};
