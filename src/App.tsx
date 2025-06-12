import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"; // Import Outlet for a wrapper route

// Public Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import NotFound from "./pages/NotFound";
import LegalServices from "./pages/LegalServices";
import HRSolutions from "./pages/HRSolutions";
import EducationConsulting from "./pages/EducationConsulting";
import BusinessConsulting from "./pages/BusinessConsulting";
import BlogIndex from "./pages/BlogIndex";
import BlogPostDetail from "./pages/BlogPostDetail";
import TestimonialsPage from "./pages/TestimonialsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TemporaryBookingPage from "./pages/TemporaryBookingPage"; // Added import

// Admin Context and Components
import { AdminAuthProvider } from "./contexts/AdminAuthContext";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBlogList from "./pages/admin/AdminBlogList";
import AdminBlogNew from "./pages/admin/AdminBlogNew";
import AdminBlogEdit from "./pages/admin/AdminBlogEdit";
import AdminTestimonialsList from "./pages/admin/AdminTestimonialsList";
import AdminTestimonialsNew from "./pages/admin/AdminTestimonialsNew";
import AdminTestimonialsEdit from "./pages/admin/AdminTestimonialsEdit";

const queryClient = new QueryClient();

// Create a wrapper component for admin routes to be wrapped by AdminAuthProvider
const AdminRoutesWrapper = () => (
  <AdminAuthProvider>
    <Outlet />
    {/* Outlet will render either Login or ProtectedRoute based on path */}
  </AdminAuthProvider>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/temporary-booking" element={<TemporaryBookingPage />} /> {/* Added new route */}
          <Route path="/services/legal" element={<LegalServices />} />
          <Route path="/services/hr" element={<HRSolutions />} />
          <Route path="/services/education-consulting" element={<EducationConsulting />} />
          <Route path="/services/business-consulting" element={<BusinessConsulting />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:postId" element={<BlogPostDetail />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* Admin Routes: Wrapped with AdminAuthProvider */}
          <Route element={<AdminRoutesWrapper />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="blog" element={<AdminBlogList />} />
                <Route path="blog/new" element={<AdminBlogNew />} />
                <Route path="blog/edit/:postId" element={<AdminBlogEdit />} />
                <Route path="testimonials" element={<AdminTestimonialsList />} />
                <Route path="testimonials/new" element={<AdminTestimonialsNew />} />
                <Route path="testimonials/edit/:testimonialId" element={<AdminTestimonialsEdit />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
