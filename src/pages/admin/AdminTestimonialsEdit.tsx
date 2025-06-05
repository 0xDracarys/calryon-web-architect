import React from 'react';
import { useParams } from 'react-router-dom';

const AdminTestimonialsEdit: React.FC = () => {
  const { testimonialId } = useParams<{ testimonialId: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Testimonial</h1>
      <p>Form for editing testimonial with ID: <strong>{testimonialId}</strong> will be here.</p>
      {/* TODO: Implement testimonial editing form, fetching data for testimonialId */}
    </div>
  );
};

export default AdminTestimonialsEdit;
