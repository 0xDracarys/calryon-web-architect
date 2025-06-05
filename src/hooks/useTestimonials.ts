import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Testimonial } from '@/types/testimonials'; // Updated import path

// Old interface definition is removed from here.
// export interface Testimonial { ... } // This line is deleted.

/**
 * Hook to fetch a list of published testimonials from Supabase.
 *
 * This hook queries the 'testimonials' table for records that meet the following criteria:
 * - Their 'is_published' column is true.
 * The results are ordered by 'date_received' in descending order (if available),
 * then by 'created_at' as a fallback, showing the most recent testimonials first.
 *
 * @returns {object} A TanStack Query object containing:
 *  - `data`: An array of Testimonial objects if successful, otherwise undefined.
 *  - `isLoading`: Boolean, true while the data is being fetched.
 *  - `error`: Error object if the fetch operation fails.
 */
export const useTestimonials = () => {
  return useQuery<Testimonial[], Error>({
    queryKey: ['testimonials'], // Unique key for this query
    queryFn: async () => {
      // Construct the Supabase query
      const { data, error } = await supabase
        .from('testimonials') // Target the 'testimonials' table
        .select(`
          id,
          created_at,
          client_name,
          quote,
          service_availed,
          date_received,
          is_published,
          rating
        `) // Select columns matching the new Testimonial interface
        .eq('is_published', true) // Filter for testimonials where is_published is true
        // Order by date_received (most recent first), then by created_at as a secondary sort criterion.
        // Nulls in date_received are placed last.
        .order('date_received', { ascending: false, nullsFirst: false })
        .order('created_at', { ascending: false });

      if (error) {
        // Log the error and re-throw to be handled by React Query
        console.error('Error fetching testimonials from Supabase:', error);
        throw new Error(error.message || 'Failed to fetch testimonials from Supabase.');
      }

      // Data from Supabase should directly map to the Testimonial[] type
      return data as Testimonial[];
    },
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });
};
