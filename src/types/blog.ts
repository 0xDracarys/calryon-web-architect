/**
 * Represents the structure of a Blog Post, aligning with the Supabase 'blog_posts' table schema.
 */
export interface Post {
  id: string; // UUID, primary key
  created_at: string; // ISO Timestamp string (e.g., "2023-01-15T10:30:00+00:00")
  updated_at: string; // ISO Timestamp string
  title: string;
  slug: string; // URL-friendly identifier
  publication_date: string | null; // Date string (YYYY-MM-DD) or null if not yet published
  introduction: string | null; // A short introduction or summary for the post
  hero_image_url: string | null; // URL for a hero/banner image
  body_content_type: 'markdown' | 'html' | string | null; // Specifies the type of content in body_content, e.g., 'markdown', 'html', or other custom types
  body_content: any | null; // Can be a string (e.g. Markdown text) or structured JSON (JSONB in Supabase).
                           // Using `any` for flexibility now; can be refined to a specific type
                           // (e.g., for parsed Markdown or a specific JSON structure) later.
  author_name: string | null; // Name of the author
  tags: string[] | null; // Array of text tags, e.g., ["tech", "news", "update"]
  status: 'draft' | 'published' | 'archived' | string; // Publication status
}
