import React from 'react';
import { useAdminAuth } from '@/contexts/AdminAuthContext'; // Adjust path as necessary
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Example loader icon

const ProtectedRoute: React.FC = () => {
  const { user, isLoading, session } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    // Show a loading spinner or a blank screen while checking auth state
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-claryon-teal" />
        <p className="ml-4 text-lg">Loading authentication status...</p>
      </div>
    );
  }

  // After initial loading, if there's no user and no active session, redirect to login.
  // The session check is an additional guard, user object should be the primary indicator.
  if (!user && !session) {
    console.log('ProtectedRoute: No user or session, redirecting to login.');
    // Pass the current location to redirect back after successful login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // If user is authenticated, render the child routes
  // console.log('ProtectedRoute: User authenticated, rendering Outlet.', user);
  return <Outlet />;
};

export default ProtectedRoute;
