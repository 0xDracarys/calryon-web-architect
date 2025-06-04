export interface Post {
  id: string;
  slug: string; // For URL friendly identifiers
  title: string;
  summary: string;
  content: string; // Full content, could be Markdown or HTML
  publishedDate: string; // ISO date string
  author?: string; // Optional author name
  imageUrl?: string; // Optional URL for a cover image
  // category?: string; // Optional, could add later
}
