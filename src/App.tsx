import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import BookAppointment from "./pages/BookAppointment";
import NotFound from "./pages/NotFound";

// Import new page components
import LegalServices from "./pages/LegalServices";
import HRServices from "./pages/HRServices";
import EducationConsulting from "./pages/EducationConsulting";
import BusinessConsulting from "./pages/BusinessConsulting";
import BlogIndex from "./pages/BlogIndex";
import BlogPostDetail from "./pages/BlogPostDetail";
import TestimonialsPage from "./pages/TestimonialsPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/book-appointment" element={<BookAppointment />} />

          {/* New Routes */}
          <Route path="/services/legal" element={<LegalServices />} />
          <Route path="/services/hr" element={<HRServices />} />
          <Route path="/services/education-consulting" element={<EducationConsulting />} />
          <Route path="/services/business-consulting" element={<BusinessConsulting />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:postId" element={<BlogPostDetail />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
