import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminBlogPosts } from '@/hooks/admin/useAdminBlogPosts'; // Corrected path
import type { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner'; // Using sonner for toasts
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, PlusCircle, Edit, Trash2, ExternalLink } from 'lucide-react';

const AdminBlogList: React.FC = () => {
  const { data: posts, isLoading, error, refetch } = useAdminBlogPosts();
  const queryClient = useQueryClient();

  const handleDeletePost = async (postId: string, postTitle: string) => {
    if (window.confirm(`Are you sure you want to delete the post "${postTitle}"? This action cannot be undone.`)) {
      try {
        const { error: deleteError } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', postId);

        if (deleteError) {
          throw deleteError;
        }

        toast.success(`Post "${postTitle}" deleted successfully.`);
        // Invalidate the query to refetch the list
        queryClient.invalidateQueries({ queryKey: ['adminBlogPosts'] });
      } catch (err: any) {
        console.error('Error deleting post:', err);
        toast.error(`Failed to delete post: ${err.message}`);
      }
    }
  };

  const getStatusBadgeVariant = (status: string | undefined) => {
    switch (status) {
      case 'published':
        return 'success';
      case 'draft':
        return 'secondary';
      case 'archived':
        return 'outline';
      default:
        return 'default';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-claryon-teal" />
        <span className="ml-2 text-lg">Loading blog posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-600">Error loading blog posts: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-claryon-gray">Manage Blog Posts</h1>
        <Button asChild className="bg-claryon-teal hover:bg-claryon-dark-teal text-white">
          <Link to="/admin/blog/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Post
          </Link>
        </Button>
      </div>

      {posts && posts.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden sm:table-cell">Publication Date</TableHead>
              <TableHead className="hidden md:table-cell">Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post: Post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium max-w-xs truncate" title={post.title}>
                  {post.title}
                  <Link to={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-xs text-claryon-teal hover:underline">
                     <ExternalLink size={12} className="inline-block" />
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{post.author_name || 'N/A'}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(post.status)}>{post.status || 'Unknown'}</Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {post.publication_date ? new Date(post.publication_date).toLocaleDateString() : 'Not Set'}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(post.updated_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/admin/blog/edit/${post.id}`}>
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeletePost(post.id, post.title)}
                    >
                      <Trash2 className="mr-1 h-4 w-4" /> Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">No blog posts found.</p>
          <p className="text-sm text-gray-400">Get started by creating a new post.</p>
        </div>
      )}
    </div>
  );
};

export default AdminBlogList;
