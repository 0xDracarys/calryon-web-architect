import React from 'react';
import { useParams } from 'react-router-dom';

const AdminBlogEdit: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Edit Blog Post</h1>
      <p>Form for editing blog post with ID: <strong>{postId}</strong> will be here.</p>
      {/* TODO: Implement blog post editing form, fetching data for postId */}
    </div>
  );
};

export default AdminBlogEdit;
