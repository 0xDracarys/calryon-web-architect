import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';
import { getAllMockPosts } from './useBlogPosts'; // Import the helper to access mock data

// ############################################################################
// MOCK DATA IMPLEMENTATION
// This hook currently returns a single mock blog post by ID or slug.
// It relies on `getAllMockPosts` from `useBlogPosts.ts`.
// TODO: Replace this with actual data fetching for a single post from the Wagtail API.
// ############################################################################

/**
 * Hook to fetch a single blog post by its identifier (slug or ID).
 * Currently uses mock data.
 *
 * @param {string | null | undefined} identifier - The slug or ID of the blog post to fetch.
 * @returns {object} An object containing:
 *  - `data`: A Post object or null if not found, or undefined if loading or error.
 *  - `isLoading`: Boolean indicating if data is being fetched.
 *  - `error`: Error object if fetching failed.
 */
export const useBlogPost = (identifier: string | null | undefined) => {
  return useQuery<Post | null, Error>({
    queryKey: ['blogPost', identifier], // React Query key, includes identifier for unique caching
    queryFn: async () => {
      if (!identifier) {
        // If no identifier is provided, don't attempt to fetch.
        return null;
      }
      // Simulate API delay for mock data
      await new Promise(resolve => setTimeout(resolve, 300));

      const allPosts = getAllMockPosts(); // Get the list of all mock posts

      // Try finding by slug first, then by ID. This order is arbitrary but consistent.
      // For a real API, you'd likely have a specific endpoint for slugs or IDs.
      const post = allPosts.find(p => p.slug === identifier) || allPosts.find(p => p.id === identifier);

      if (post) {
        console.log(`useBlogPost: Found MOCK post for identifier "${identifier}".`);
      } else {
        console.warn(`useBlogPost: MOCK post NOT FOUND for identifier "${identifier}".`);
      }
      return post || null; // Return the found post or null if not found

      // TODO: Replace with actual API call to Wagtail for a single post
      // Example (fetching by slug):
      // const response = await fetch(`/api/wagtail/pages/?slug=${identifier}&type=blog.BlogPostPage&fields=*`);
      // if (!response.ok) throw new Error(`Failed to fetch post with slug ${identifier}`);
      // const data = await response.json();
      // return data.items[0] || null; // Adjust based on Wagtail API response structure
    },
    enabled: !!identifier, // Only run the query if an identifier is provided
    // staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};
