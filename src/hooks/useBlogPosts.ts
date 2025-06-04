import { useQuery } from '@tanstack/react-query';
import type { Post } from '@/types/blog';

// ############################################################################
// MOCK DATA IMPLEMENTATION
// This hook currently returns mock blog post data.
// TODO: Replace this with actual data fetching from the Wagtail API.
// ############################################################################

const mockBlogPosts: Post[] = [
  {
    id: "1",
    slug: "first-blog-post-on-immigration-trends",
    title: "Navigating the New Wave of Immigration Policies",
    summary: "A brief look into the recent changes in immigration law and what it means for applicants.",
    content: "<p>This is the full content of the first blog post. It would typically be longer and include several paragraphs, possibly images, and other rich text elements.</p><p>Key points include understanding new visa categories, changes in application processing times, and new requirements for documentation.</p><h2>Sub-heading Example</h2><p>More details under a sub-heading to structure the content effectively.</p>",
    publishedDate: "2023-12-01T10:00:00Z",
    author: "Dr. Anya Sharma",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop", // Placeholder image
  },
  {
    id: "2",
    slug: "effective-hr-strategies-for-remote-teams",
    title: "Effective HR Strategies for Managing Remote Teams",
    summary: "Discover best practices for HR professionals to support and manage a distributed workforce.",
    content: "<p>The shift to remote work presents unique challenges and opportunities for HR management. This post explores strategies for engagement, performance management, and maintaining company culture in a remote setting.</p><ul><li>Regular check-ins and communication</li><li>Utilizing technology for collaboration</li><li>Focusing on outcomes rather than hours</li></ul>",
    publishedDate: "2023-11-15T14:30:00Z",
    author: "Mr. Ben Carter",
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop", // Placeholder image
  },
  {
    id: "3",
    slug: "unlocking-global-education-scholarship-guide",
    title: "Unlocking Global Education: A Guide to Scholarships",
    summary: "A comprehensive guide to finding and applying for scholarships for international students.",
    content: "<p>Studying abroad can be a transformative experience, and scholarships can make it financially viable. This guide covers types of scholarships, where to find them, and tips for a successful application.</p><p>Remember to check eligibility criteria carefully and prepare your application well in advance of deadlines.</p>",
    publishedDate: "2023-10-25T09:00:00Z",
    // author: "The Claryon Edu Team", // Example of team author
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1740&auto=format&fit=crop", // Placeholder image
  },
];

/**
 * Hook to fetch a list of blog posts.
 * Currently uses mock data.
 *
 * @returns {object} An object containing:
 *  - `data`: An array of Post objects or undefined if loading or error.
 *  - `isLoading`: Boolean indicating if data is being fetched.
 *  - `error`: Error object if fetching failed.
 */
export const useBlogPosts = () => {
  return useQuery<Post[], Error>({
    queryKey: ['blogPosts'], // React Query key for caching
    queryFn: async () => {
      // Simulate API delay for mock data
      await new Promise(resolve => setTimeout(resolve, 700));
      console.log("useBlogPosts: Returning MOCK blog posts.");
      return mockBlogPosts;
      // TODO: Replace with actual API call to Wagtail
      // Example:
      // const response = await fetch('/api/wagtail/pages/?type=blog.BlogPostPage&fields=*');
      // if (!response.ok) throw new Error('Failed to fetch blog posts');
      // const data = await response.json();
      // return data.items; // Adjust based on Wagtail API response structure
    },
    // staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
  });
};

/**
 * Helper function to get all mock posts.
 * This is used by useBlogPost hook to find a specific post from the mock data.
 * This function will likely be removed when real API integration is in place.
 *
 * @returns {Post[]} Array of mock blog posts.
 */
export const getAllMockPosts = (): Post[] => mockBlogPosts;
