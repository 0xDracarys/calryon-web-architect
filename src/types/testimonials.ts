/**
 * Represents the structure of a Testimonial, aligning with the Supabase 'testimonials' table schema.
 */
export interface Testimonial {
  id: string; // UUID, primary key
  created_at: string; // ISO Timestamp string (e.g., "2023-01-15T10:30:00+00:00")
  client_name: string;
  quote: string; // Text content of the testimonial
  service_availed: string | null; // Name of the service the client used
  date_received: string | null; // Date string (YYYY-MM-DD) when the testimonial was received
  is_published: boolean; // True if the testimonial is approved for display
  rating: number | null; // Numerical rating, e.g., 1-5 stars (smallint in DB)
}
