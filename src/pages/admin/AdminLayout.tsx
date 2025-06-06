import React from 'react';
import { Outlet, Link, useNavigate, NavLink } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import { Home, LayoutDashboard, FileText, MessageSquareText, LogOut, Loader2, UserCircle2 } from 'lucide-react'; // Icons

const AdminLayout: React.FC = () => {
  const { user, logout, isLoading } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      // After successful logout, user will be null, ProtectedRoute will redirect to /admin/login
      // Or, explicitly navigate if preferred:
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show a toast notification for logout error
    }
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-150 ease-in-out
     ${isActive
       ? 'bg-claryon-teal text-white'
       : 'text-gray-300 hover:bg-gray-700 hover:text-white'
     }`;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-slate-800 text-slate-100 p-4 flex flex-col shadow-lg">
        <div className="mb-6 p-2 text-center">
           <Link to="/admin/dashboard" className="flex flex-col items-center space-y-2">
            <img
                src="/lovable-uploads/00163a20-59c4-4a42-89b2-bb49df4a4061.png"
                alt="Claryon Group Logo"
                className="h-10 w-auto bg-white p-1 rounded-sm" // White background for dark sidebar
            />
            <span className="text-xl font-semibold tracking-tight">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li><NavLink to="/admin/dashboard" className={navLinkClass}><LayoutDashboard className="mr-3 h-5 w-5" />Dashboard</NavLink></li>
            <li><NavLink to="/admin/blog" className={navLinkClass}><FileText className="mr-3 h-5 w-5" />Blog Posts</NavLink></li>
            <li><NavLink to="/admin/testimonials" className={navLinkClass}><MessageSquareText className="mr-3 h-5 w-5" />Testimonials</NavLink></li>
            {/* Add more admin links here */}
          </ul>
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-700">
          {isLoading ? (
            <div className="flex items-center justify-center py-2">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : user ? (
            <div className="text-sm mb-4 text-center">
              <UserCircle2 className="h-6 w-6 mx-auto mb-1 text-slate-400" />
              <p className="truncate" title={user.email}>{user.email}</p>
            </div>
          ) : null}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-left text-slate-300 hover:bg-red-600 hover:text-white"
            disabled={isLoading}
          >
            <LogOut className="mr-3 h-5 w-5" />
            {isLoading ? 'Logging out...' : 'Logout'}
          </Button>
           <Button
            asChild
            variant="link"
            className="w-full justify-start text-left text-slate-400 hover:text-slate-200 mt-2 pl-3"
          >
            <Link to="/"><Home className="mr-3 h-5 w-5" />Back to Main Site</Link>
          </Button>
        </div>
      </aside>
      <main className="flex-grow p-6 md:p-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
