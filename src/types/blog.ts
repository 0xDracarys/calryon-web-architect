export interface Post {
  id: string; // Corresponds to 'id' (usually uuid) in Supabase
  slug: string; // Corresponds to 'slug'
  title: string; // Corresponds to 'title'
  summary: string; // Corresponds to 'summary'
  content: string; // Corresponds to 'content' (rich text or markdown)
  published_date: string; // Corresponds to 'published_date' (timestamp with timezone)
  author: string | null; // Corresponds to 'author' (text field for author's name)
  image_url?: string; // Corresponds to 'image_url' (text field storing URL)
  status?: string; // Corresponds to 'status' (e.g., 'published', 'draft')
  // category?: string; // Optional, if you add a category text field or foreign key
}
