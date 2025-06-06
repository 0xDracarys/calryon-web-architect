import { useQuery } from '@tanstack/react-query';
import type { Testimonial } from '@/types/testimonials';
import { supabase } from '@/integrations/supabase/client';

/**
 * Hook to fetch all testimonials for the admin view from Supabase.
 *
 * Fetches all testimonials regardless of their 'is_published' status.
 * Selects all fields defined in the Testimonial interface.
 * Orders testimonials by 'created_at' in descending order to show recently added/modified ones first.
 *
 * @returns {object} A TanStack Query object containing:
 *  - `data`: An array of Testimonial objects if successful, otherwise undefined.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails.
 */
export const useAdminTestimonials = () => {
  return useQuery<Testimonial[], Error>({
    queryKey: ['adminTestimonials'], // Unique key for this admin-specific query
    queryFn: async () => {
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
        .order('created_at', { ascending: false }); // Order by creation date by default for admin view

      if (error) {
        console.error('Error fetching admin testimonials from Supabase:', error);
        throw new Error(error.message || 'Failed to fetch admin testimonials.');
      }

      return data as Testimonial[];
    },
    staleTime: 1000 * 60 * 1, // Cache for 1 minute for admin views
  });
};
