import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminTestimonials } from '@/hooks/admin/useAdminTestimonials';
import type { Testimonial } from '@/types/testimonials';
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
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, PlusCircle, Edit, Trash2, Star, CheckCircle, XCircle } from 'lucide-react';

const AdminTestimonialsList: React.FC = () => {
  const { data: testimonials, isLoading, error, refetch } = useAdminTestimonials();
  const queryClient = useQueryClient();

  const handleDeleteTestimonial = async (testimonialId: string, clientName: string) => {
    if (window.confirm(`Are you sure you want to delete the testimonial from "${clientName}"? This action cannot be undone.`)) {
      try {
        const { error: deleteError } = await supabase
          .from('testimonials')
          .delete()
          .eq('id', testimonialId);

        if (deleteError) {
          throw deleteError;
        }

        toast.success(`Testimonial from "${clientName}" deleted successfully.`);
        queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
      } catch (err: any) {
        console.error('Error deleting testimonial:', err);
        toast.error(`Failed to delete testimonial: ${err.message}`);
      }
    }
  };

  const renderStars = (rating: number | null) => {
    if (rating === null || rating === undefined) return <span className="text-gray-400">N/A</span>;
    return (
      <div className="flex">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-300 text-gray-300'}`} />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-claryon-teal" />
        <span className="ml-2 text-lg">Loading testimonials...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-red-600">Error loading testimonials: {error.message}</p>
        <Button onClick={() => refetch()} className="mt-4">Try Again</Button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-claryon-gray">Manage Testimonials</h1>
        <Button asChild className="bg-claryon-teal hover:bg-claryon-dark-teal text-white">
          <Link to="/admin/testimonials/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Testimonial
          </Link>
        </Button>
      </div>

      {testimonials && testimonials.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client Name</TableHead>
              <TableHead className="hidden md:table-cell max-w-sm">Quote Snippet</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="hidden sm:table-cell">Date Received</TableHead>
              <TableHead className="hidden md:table-cell">Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial: Testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell className="font-medium">{testimonial.client_name}</TableCell>
                <TableCell className="hidden md:table-cell max-w-sm truncate" title={testimonial.quote}>
                  {testimonial.quote.substring(0, 50)}{testimonial.quote.length > 50 ? '...' : ''}
                </TableCell>
                <TableCell>
                  {testimonial.is_published ? (
                    <Badge variant="success" className="bg-green-100 text-green-700">
                      <CheckCircle className="mr-1 h-3.5 w-3.5" /> Yes
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      <XCircle className="mr-1 h-3.5 w-3.5" /> No
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {testimonial.date_received ? new Date(testimonial.date_received).toLocaleDateString() : 'N/A'}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {renderStars(testimonial.rating)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/admin/testimonials/edit/${testimonial.id}`}>
                        <Edit className="mr-1 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteTestimonial(testimonial.id, testimonial.client_name)}
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
          <p className="text-lg text-gray-500">No testimonials found.</p>
          <p className="text-sm text-gray-400">Get started by creating a new testimonial.</p>
        </div>
      )}
    </div>
  );
};

export default AdminTestimonialsList;
