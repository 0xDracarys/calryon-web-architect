import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useAdminTestimonial } from '@/hooks/admin/useAdminTestimonial';
import type { Testimonial } from '@/types/testimonials';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox'; // For is_published
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, ArrowLeft, Save, Star } from 'lucide-react';

// Zod schema for form validation
const testimonialSchema = z.object({
  client_name: z.string().min(2, "Client name must be at least 2 characters"),
  quote: z.string().min(10, "Quote must be at least 10 characters"),
  service_availed: z.string().optional().nullable(),
  date_received: z.string().optional().nullable().refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Date must be in YYYY-MM-DD format or empty",
  }),
  is_published: z.boolean().default(false),
  rating: z.preprocess(
    (val) => (val === '' || val === undefined || val === null) ? null : Number(val),
    z.number().min(1).max(5).optional().nullable()
  ),
});

type TestimonialFormInputs = z.infer<typeof testimonialSchema>;

const AdminTestimonialForm: React.FC = () => {
  const { testimonialId } = useParams<{ testimonialId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEditMode = !!testimonialId;

  const { data: existingTestimonial, isLoading: isLoadingTestimonial, error: testimonialError } = useAdminTestimonial(testimonialId);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, register, handleSubmit, reset, watch, formState: { errors } } = useForm<TestimonialFormInputs>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: '',
      quote: '',
      service_availed: '',
      date_received: '',
      is_published: false,
      rating: null,
    },
  });

  useEffect(() => {
    if (isEditMode && existingTestimonial) {
      reset({
        client_name: existingTestimonial.client_name || '',
        quote: existingTestimonial.quote || '',
        service_availed: existingTestimonial.service_availed || '',
        date_received: existingTestimonial.date_received ? existingTestimonial.date_received.split('T')[0] : '',
        is_published: existingTestimonial.is_published || false,
        rating: existingTestimonial.rating || null,
      });
    }
  }, [isEditMode, existingTestimonial, reset]);

  const onSubmit: SubmitHandler<TestimonialFormInputs> = async (formData) => {
    setIsSubmitting(true);
    try {
      const dataToSubmit: Omit<Testimonial, 'id' | 'created_at'> = {
        client_name: formData.client_name,
        quote: formData.quote,
        service_availed: formData.service_availed || null,
        date_received: formData.date_received || null,
        is_published: formData.is_published,
        rating: formData.rating === undefined || formData.rating === null ? null : Number(formData.rating),
      };

      if (isEditMode && testimonialId) {
        const { error } = await supabase.from('testimonials').update(dataToSubmit).eq('id', testimonialId);
        if (error) throw error;
        toast.success(`Testimonial from "${dataToSubmit.client_name}" updated successfully.`);
        queryClient.invalidateQueries({ queryKey: ['adminTestimonial', testimonialId] });
      } else {
        const { error } = await supabase.from('testimonials').insert(dataToSubmit as Testimonial);
        if (error) throw error;
        toast.success(`Testimonial from "${dataToSubmit.client_name}" created successfully.`);
        navigate('/admin/testimonials');
      }
      queryClient.invalidateQueries({ queryKey: ['adminTestimonials'] });
    } catch (error: any) {
      console.error('Error submitting testimonial:', error);
      toast.error(`Failed to save testimonial: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentRating = watch("rating");

  if (isLoadingTestimonial) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="h-8 w-8 animate-spin" /> Loading testimonial data...</div>;
  }
  if (testimonialError && isEditMode) {
    return <div className="text-red-600 p-4">Error loading testimonial for editing: {testimonialError.message}</div>;
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Button variant="outline" size="sm" asChild className="mr-4">
          <Link to="/admin/testimonials"><ArrowLeft className="mr-2 h-4 w-4" /> Back to List</Link>
        </Button>
        <h1 className="text-2xl md:text-3xl font-playfair font-bold text-claryon-gray">
          {isEditMode ? `Edit Testimonial` : 'Create New Testimonial'}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <Label htmlFor="client_name">Client Name *</Label>
          <Input id="client_name" {...register("client_name")} disabled={isSubmitting} className={errors.client_name ? "border-red-500" : ""} />
          {errors.client_name && <p className="text-sm text-red-600 mt-1">{errors.client_name.message}</p>}
        </div>

        <div>
          <Label htmlFor="quote">Quote *</Label>
          <Textarea id="quote" {...register("quote")} disabled={isSubmitting} rows={5} className={errors.quote ? "border-red-500" : ""} />
          {errors.quote && <p className="text-sm text-red-600 mt-1">{errors.quote.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="service_availed">Service Availed</Label>
            <Input id="service_availed" {...register("service_availed")} disabled={isSubmitting} />
          </div>
          <div>
            <Label htmlFor="date_received">Date Received</Label>
            <Input id="date_received" type="date" {...register("date_received")} disabled={isSubmitting} className={errors.date_received ? "border-red-500" : ""} />
            {errors.date_received && <p className="text-sm text-red-600 mt-1">{errors.date_received.message}</p>}
          </div>
        </div>

        <div>
          <Label htmlFor="rating">Rating (1-5)</Label>
          <Controller
            name="rating"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-6 w-6 cursor-pointer transition-colors
                      ${(currentRating || 0) >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}
                    `}
                    onClick={() => field.onChange(star === currentRating ? null : star)} // Click to set, click again to clear
                  />
                ))}
                 {currentRating && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => field.onChange(null)} className="ml-2 text-xs">Clear</Button>
                  )}
              </div>
            )}
          />
          {errors.rating && <p className="text-sm text-red-600 mt-1">{errors.rating.message}</p>}
        </div>

        <div className="flex items-center space-x-2">
          <Controller
            name="is_published"
            control={control}
            render={({ field }) => (
              <Checkbox
                id="is_published"
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={isSubmitting}
              />
            )}
          />
          <Label htmlFor="is_published" className="font-medium">Publish this testimonial?</Label>
        </div>


        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/testimonials')} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" className="bg-claryon-teal hover:bg-claryon-dark-teal text-white" disabled={isSubmitting || isLoadingTestimonial}>
            {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {isEditMode ? 'Save Changes' : 'Create Testimonial'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AdminTestimonialForm;
