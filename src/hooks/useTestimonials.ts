import { useQuery } from '@tanstack/react-query';
// import { supabase } from '@/integrations/supabase/client'; // Supabase query commented out

export interface Testimonial {
  id: string;
  client_name: string;
  quote: string;
  service_availed: string | null;
  rating: number | null;
  date_received: string | null; // Should be an ISO date string ideally
}

// ############################################################################
// MOCK DATA IMPLEMENTATION FOR TESTIMONIALS
// This hook currently returns a static list of mock testimonials.
// The original Supabase query has been commented out below.
//
// TODO: Replace this mock implementation with actual data fetching
// from the Wagtail API once it's available for testimonials.
// ############################################################################

const mockTestimonials: Testimonial[] = [
  {
    id: "1",
    client_name: "John Doe",
    quote: "Claryon Group provided outstanding legal advice for my immigration case. Highly recommended!",
    service_availed: "Legal Services - Immigration",
    rating: 5,
    date_received: "2023-10-15T00:00:00Z", // Example ISO date
  },
  {
    id: "2",
    client_name: "Jane Smith",
    quote: "The HR recruitment services were top-notch. They found us the perfect candidate in record time.",
    service_availed: "HR Services - Recruitment",
    rating: 5,
    date_received: "2023-11-01T00:00:00Z", // Example ISO date
  },
  {
    id: "3",
    client_name: "Alice Brown",
    quote: "Thanks to their education consulting, my son got into his dream university. The visa assistance was invaluable.",
    service_availed: "Education Consulting - Visa Assistance",
    rating: 4,
    date_received: "2023-09-20T00:00:00Z", // Example ISO date
  },
];

/**
 * Hook to fetch a list of testimonials.
 * Currently returns mock data.
 *
 * @returns {object} An object containing:
 *  - `data`: An array of Testimonial objects or undefined if loading or error.
 *  - `isLoading`: Boolean indicating if data is being fetched.
 *  - `error`: Error object if fetching failed.
 */
export const useTestimonials = () => {
  // Simulate react-query structure with mock data
  return useQuery<Testimonial[], Error>({
    queryKey: ['testimonials'], // React Query key for caching
    queryFn: async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log("useTestimonials: Returning MOCK testimonials.");
      return mockTestimonials;
      // TODO: Replace with actual API call to Wagtail for testimonials
      // Example:
      // const response = await fetch('/api/wagtail/pages/?type=testimonials.TestimonialPage&fields=*'); // Adjust type and fields
      // if (!response.ok) throw new Error('Failed to fetch testimonials');
      // const data = await response.json();
      // return data.items.map(item => ({...item, id: item.id.toString()})); // Adapt Wagtail data structure
    },
    // staleTime: Infinity, // Can be useful for mock data to prevent refetching
  });

  /*
  // ############################################################################
  // ORIGINAL SUPABASE QUERY (Commented out for Wagtail integration prep)
  // ############################################################################
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching testimonials from Supabase:', error);
        throw error;
      }

      return data as Testimonial[];
    },
  });
  */
};
