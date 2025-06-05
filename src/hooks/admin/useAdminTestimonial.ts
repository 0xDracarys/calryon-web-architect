import { useQuery } from '@tanstack/react-query';
import type { Testimonial } from '@/types/testimonials';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch a single testimonial by its ID for the admin view from Supabase.
 *
 * Fetches a testimonial regardless of its 'is_published' status.
 * Selects all fields defined in the Testimonial interface.
 *
 * @param {string | null | undefined} testimonialId - The ID (UUID) of the testimonial to fetch.
 * @returns {object} A TanStack Query object containing:
 *  - `data`: A Testimonial object if found, null if not found, or undefined while loading.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails.
 */
export const useAdminTestimonial = (testimonialId: string | null | undefined) => {
  return useQuery<Testimonial | null, Error>({
    queryKey: ['adminTestimonial', testimonialId],
    queryFn: async () => {
      if (!testimonialId) {
        return null;
      }

      const { data, error } = await supabase
        .from('testimonials')
        .select(`
          id,
          created_at,
          client_name,
          quote,
          service_availed,
          date_received,
          is_published,
          rating
        `) // Select all fields from the Testimonial interface
        .eq('id', testimonialId)
        .maybeSingle();

      if (error) {
        console.error(`Error fetching admin testimonial with ID "${testimonialId}" from Supabase:`, error);
        throw new Error(error.message || `Failed to fetch admin testimonial with ID "${testimonialId}".`);
      }

      return data as Testimonial | null;
    },
    enabled: !!testimonialId, // Only run if testimonialId is provided
    staleTime: 1000 * 60 * 1, // Cache for 1 minute
  });
};
