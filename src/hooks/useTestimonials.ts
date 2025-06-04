import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Testimonial {
  id: string;
  client_name: string;
  quote: string;
  service_availed: string | null;
  rating: number | null;
  date_received: string | null; // Should ideally be a full ISO timestamp if time is relevant for ordering
  status?: string;
}

/**
 * Hook to fetch a list of published testimonials from Supabase.
 *
 * This hook queries the 'testimonials' table for records that meet the following criteria:
 * - Their 'status' column is 'published'.
 * The results are ordered by 'date_received' in descending order, showing the most recent testimonials first.
 * If 'date_received' can be null, records with null dates are placed last.
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
          client_name,
          quote,
          service_availed,
          date_received,
          status,
          rating
        `) // Select specified columns
        .eq('status', 'published') // Filter for testimonials with status 'published'
        // Order by date_received, most recent first.
        // 'nullsFirst: false' places null dates at the end if ascending is false.
        .order('date_received', { ascending: false, nullsFirst: false });

      if (error) {
        // Log the error and re-throw to be handled by React Query
        console.error('Error fetching testimonials from Supabase:', error);
        throw new Error(error.message || 'Failed to fetch testimonials from Supabase.');
      }

      // Data from Supabase should directly map to the Testimonial[] type,
      // assuming table column names match the interface fields.
      return data as Testimonial[];
    },
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  });
};

// Previous mock data and Supabase v1 style comments have been removed.
// The hook is now directly using Supabase with TanStack Query v4/v5 patterns.
