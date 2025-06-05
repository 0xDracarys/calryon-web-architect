import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch a single published blog post by its slug from Supabase.
 *
 * This hook queries the 'blog_posts' table for a single record that meets the following criteria:
 * - Its 'slug' column matches the provided slug.
 * - Its 'status' column is 'published'.
 * - Its 'publication_date' is not null and not in the future (i.e., less than or equal to the current time).
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
    queryKey: ['blogPost', slug],
    queryFn: async () => {
      if (!slug) {
        return null;
      }

      const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

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
        `) // Select all fields from the Post interface
        .eq('slug', slug)
        .eq('status', 'published')
        .not('publication_date', 'is', null) // Ensure publication_date is not null
        .lte('publication_date', today) // Filter for posts with publication_date up to or including today
        .maybeSingle();

      if (error) {
        console.error(`Error fetching post with slug "${slug}" from Supabase:`, error);
        throw new Error(error.message || `Failed to fetch post with slug "${slug}" from Supabase.`);
      }

      if (data) {
        console.log(`useBlogPost: Successfully fetched post for slug "${slug}".`);
      } else {
        console.warn(`useBlogPost: Post with slug "${slug}" not found, not published, or publication_date is in the future/null.`);
      }

      return data as Post | null;
    },
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};
