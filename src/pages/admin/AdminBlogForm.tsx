import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAdminBlogPost } from '@/hooks/admin/useAdminBlogPost';
import type { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; // For introduction
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import MDEditor from '@uiw/react-md-editor'; // Markdown editor
import { Loader2, ArrowLeft, Save } from 'lucide-react';

// Zod schema for form validation
const blogPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  slug: z.string().min(3, "Slug must be at least 3 characters").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly (e.g., 'my-new-post')"),
  introduction: z.string().optional().nullable(),
  hero_image_url: z.string().url("Must be a valid URL").optional().nullable().or(z.literal('')),
  author_name: z.string().optional().nullable(),
  tags: z.string().optional(), // Comma-separated string from input
  publication_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"), // Validate date format
  status: z.enum(['draft', 'published', 'archived']),
  body_content: z.string().optional().nullable(), // Markdown string from editor
});

type BlogPostFormInputs = z.infer<typeof blogPostSchema>;

const AdminBlogForm: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!postId;

  const { data: existingPost, isLoading: isLoadingPost, error: postError } = useAdminBlogPost(postId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, register, handleSubmit, reset, watch, setValue, formState: { errors } } = useForm<BlogPostFormInputs>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: '',
      slug: '',
      introduction: '',
      hero_image_url: '',
      author_name: '',
      tags: '',
      publication_date: new Date().toISOString().split('T')[0], // Default to today
      status: 'draft',
      body_content: '',
    },
  });

  // Populate form with existing post data in edit mode
  useEffect(() => {
    if (isEditMode && existingPost) {
      const tagsString = Array.isArray(existingPost.tags) ? existingPost.tags.join(', ') : '';
      let markdownContent = '';
      if (existingPost.body_content) {
        if (typeof existingPost.body_content === 'string') {
          markdownContent = existingPost.body_content;
        } else if (typeof existingPost.body_content === 'object' && existingPost.body_content_type === 'markdown' && 'text' in (existingPost.body_content as any)) {
          markdownContent = (existingPost.body_content as any).text;
        }
      }

      reset({
        title: existingPost.title || '',
        slug: existingPost.slug || '',
        introduction: existingPost.introduction || '',
        hero_image_url: existingPost.hero_image_url || '',
        author_name: existingPost.author_name || '',
        tags: tagsString,
        publication_date: existingPost.publication_date ? existingPost.publication_date.split('T')[0] : new Date().toISOString().split('T')[0],
        status: existingPost.status as 'draft' | 'published' | 'archived' || 'draft',
        body_content: markdownContent,
      });
    }
  }, [isEditMode, existingPost, reset]);

  // Slug generation from title
  const titleValue = watch('title');
  const generateSlug = useCallback((title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-'); // Replace multiple - with single -
  }, []);

  useEffect(() => {
    if (titleValue && !isEditMode) { // Only auto-generate for new posts or if slug is empty in edit mode (optional)
      setValue('slug', generateSlug(titleValue), { shouldValidate: true });
    }
  }, [titleValue, generateSlug, setValue, isEditMode]);


  const onSubmit: SubmitHandler<BlogPostFormInputs> = async (formData) => {
    setIsSubmitting(true);
    try {
      const tagsArray = formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : null;

      const dataToSubmit: Partial<Post> = {
        title: formData.title,
        slug: formData.slug,
        introduction: formData.introduction,
        hero_image_url: formData.hero_image_url || null, // Ensure empty string becomes null
        author_name: formData.author_name,
        tags: tagsArray,
        publication_date: formData.publication_date, // Already YYYY-MM-DD string
        status: formData.status,
        body_content_type: 'markdown',
        // Store Markdown as JSONB: { type: "markdown", text: markdownString }
        body_content: formData.body_content ? { type: "markdown", text: formData.body_content } : null,
        updated_at: new Date().toISOString(), // Always update updated_at
      };

      if (isEditMode && postId) {
        const { error } = await supabase.from('blog_posts').update(dataToSubmit).eq('id', postId);
        if (error) throw error;
        toast.success(`Post "${dataToSubmit.title}" updated successfully.`);
        queryClient.invalidateQueries({ queryKey: ['adminBlogPost', postId] }); // Invalidate single post query
      } else {
        // For new posts, also set created_at (Supabase does this by default if column is timestamptz with default now())
        // dataToSubmit.created_at = new Date().toISOString(); // Not strictly needed if DB handles it
        const { error } = await supabase.from('blog_posts').insert(dataToSubmit as Omit<Post, 'id' | 'created_at' | 'updated_at'>); // Cast to avoid type issues with id/created_at/updated_at
        if (error) throw error;
        toast.success(`Post "${dataToSubmit.title}" created successfully.`);
        navigate('/admin/blog'); // Redirect to list after creation
      }
      queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] }); // Invalidate list query
    } catch (error: any) {
      console.error('Error submitting blog post:', error);
      toast.error(`Failed to save post: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingPost) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /> Loading post data...</div>;
  }
  if (postError && isEditMode) {
    return <div className="text-red-600 p-4">Error loading post for editing: {postError.message}</div>;
  }

  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link to="/admin/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to List</Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-claryon-gray">
          {isEditMode ? `Edit Post: ${existingPost?.title || ''}` : 'Create New Blog Post'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" {...register("title")} disabled={isSubmitting} className={errors.title ? "border-red-500" : ""} />
          {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <Label htmlFor="slug">Slug *</Label>
          <Input id="slug" {...register("slug")} disabled={isSubmitting} className={errors.slug ? "border-red-500" : ""} />
          {errors.slug && <p className="text-sm text-red-600 mt-1">{errors.slug.message}</p>}
        </div>

        <div>
          <Label htmlFor="introduction">Introduction / Summary</Label>
          <Textarea id="introduction" {...register("introduction")} disabled={isSubmitting} rows={3} />
        </div>

        <div>
          <Label htmlFor="body_content">Main Content (Markdown) *</Label>
          <Controller
            name="body_content"
            control={control}
            render={({ field }) => (
              <MDEditor
                value={field.value || ''}
                onChange={(val) => field.onChange(val)}
                height={400}
                previewOptions={{ remarkPlugins: [[remarkGfm]] }}
                className="mt-1"
              />
            )}
          />
           {errors.body_content && <p className="text-sm text-red-600 mt-1">{errors.body_content.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="publication_date">Publication Date *</Label>
            <Input id="publication_date" type="date" {...register("publication_date")} disabled={isSubmitting} className={errors.publication_date ? "border-red-500" : ""} />
            {errors.publication_date && <p className="text-sm text-red-600 mt-1">{errors.publication_date.message}</p>}
          </div>
          <div>
            <Label htmlFor="status">Status *</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                  <SelectTrigger className={errors.status ? "border-red-500" : ""}>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="author_name">Author Name</Label>
          <Input id="author_name" {...register("author_name")} disabled={isSubmitting} />
        </div>

        <div>
          <Label htmlFor="hero_image_url">Hero Image URL</Label>
          <Input id="hero_image_url" type="url" {...register("hero_image_url")} placeholder="https://example.com/image.jpg" disabled={isSubmitting} className={errors.hero_image_url ? "border-red-500" : ""} />
          {errors.hero_image_url && <p className="text-sm text-red-600 mt-1">{errors.hero_image_url.message}</p>}
        </div>

        <div>
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input id="tags" {...register("tags")} placeholder="e.g., tech, news, update" disabled={isSubmitting} />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/blog')} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" className="bg-claryon-teal hover:bg-claryon-dark-teal text-white" disabled={isSubmitting || isLoadingPost}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditMode ? 'Save Changes' : 'Create Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminBlogForm;
