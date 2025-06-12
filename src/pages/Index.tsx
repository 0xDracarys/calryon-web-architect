import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTAButton from '@/components/CTAButton';
import ServiceCard from '@/components/ServiceCard';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scale, Users, GraduationCap, TrendingUp, Quote, Newspaper } from 'lucide-react';
import { useTestimonials } from '@/hooks/useTestimonials'; // Now uses Supabase
import { useBlogPosts } from '@/hooks/useBlogPosts';     // Now uses Supabase

/**
 * Index Page Component (Homepage)
 *
 * This is the main landing page for the Claryon Group website.
 * It provides an overview of services, introduces the company,
 * and features previews of dynamic content like blog posts and testimonials.
 *
 * Blog posts and Testimonials are fetched from Supabase.
 *
 * TODO:
 * - The content for sections like "Why Choose Us?" might also be made dynamic via Wagtail or Supabase.
 */
const Index = () => {
  // Fetch testimonials (from Supabase)
  const { data: testimonials, isLoading: testimonialsLoading, error: testimonialsError } = useTestimonials();
  // Fetch blog posts (from Supabase)
  const { data: blogPosts, isLoading: blogPostsLoading, error: blogPostsError } = useBlogPosts();

  // Static data for core services - could be made dynamic from Wagtail if needed
  const services = [
    {
      title: "Legal Services",
      description: "Comprehensive legal guidance for immigration, criminal, and business law matters across Europe.",
      features: ["Immigration Law & Visa Assistance", "Criminal Law Defense", "Business Law & Compliance", "Contract Review & Drafting"],
      href: "/services/legal",
      icon: <Scale className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "HR Solutions",
      description: "Strategic HR support for both employers and job seekers-helping businesses build strong teams and individuals find meaningful careers in Europe.",
      features: [
          "Recruitment & Talent Acquisition",
          "Job Placement Across the EU",
          "Employee Relations & Support",
          "HR Policy & Compliance Consulting"
        ],
      href: "/services/hr",
      icon: <Users className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "Education Consulting",
      description: "Expert guidance for educational institutions and international students navigating European systems.",
      features: ["University Application Support", "Academic Program Planning", "Student Visa Assistance", "Educational Institution Consulting"],
      href: "/services/education-consulting",
      icon: <GraduationCap className="h-8 w-8 text-claryon-teal" />
    },
    {
      title: "Business Consulting",
      description: "Strategic business guidance and mentorship to accelerate growth and market entry.",
      features: ["Market Entry Strategy", "Business Development", "Operational Optimization", "Executive Mentorship"],
      href: "/services/business-consulting",
      icon: <TrendingUp className="h-8 w-8 text-claryon-teal" />
    }
  ];

  // Prepare preview data (slices the first 3 items, or empty array if data is not yet available)
  const previewTestimonials = testimonials ? testimonials.slice(0, 3) : [];
  const previewBlogPosts = blogPosts ? blogPosts.slice(0, 3) : [];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-claryon-teal/5 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-claryon-gray mb-6 animate-fade-in">
              Empowering
              <span className="block text-claryon-teal">YOU</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              With Clarity and Confidence when you need it the most. We support individuals and organizations with expert guidance in legal, HR, education, and business consulting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton to="/book-appointment" size="lg">Book Your FREE Consultation</CTAButton>
              <CTAButton to="/services" variant="outline" size="lg">Explore Our Services</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">Our Core Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive consulting solutions tailored to meet your unique needs across four specialized verticals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => ( <ServiceCard key={index} {...service} /> ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Section - Populated by Supabase data from useBlogPosts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">Latest Insights</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Stay updated with our latest articles and analyses on industry trends and best practices.
            </p>
          </div>
          {blogPostsLoading && <p className="text-center text-claryon-gray py-4">Loading latest posts...</p>}
          {blogPostsError && <p className="text-center text-red-600 py-4">Error loading posts: {blogPostsError.message}</p>}
          {!blogPostsLoading && !blogPostsError && previewBlogPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {previewBlogPosts.map((post) => (
                <Card key={post.id} className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
                   {post.hero_image_url && (
                    <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                      <img src={post.hero_image_url} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
                    </Link>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="font-playfair text-lg text-claryon-gray hover:text-claryon-teal transition-colors">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                     <p className="text-xs text-gray-500 pt-1">
                      {post.author_name && `By ${post.author_name} • `}
                      {post.publication_date && new Date(post.publication_date).toLocaleDateString()}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-grow text-sm">
                    <p className="text-gray-700 line-clamp-3">{post.introduction}</p>
                  </CardContent>
                  <CardFooter className="pt-3">
                    <Button asChild variant="link" className="text-claryon-teal hover:text-claryon-dark-teal p-0 text-sm">
                      <Link to={`/blog/${post.slug}`}>Read More &rarr;</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          {!blogPostsLoading && !blogPostsError && previewBlogPosts.length === 0 && (
            <p className="text-center text-claryon-gray py-4">No blog posts available yet. Check back soon!</p>
          )}
          <div className="text-center mt-12">
            <CTAButton to="/blog" variant="outline">View All Articles</CTAButton>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">Why Choose Claryon Group?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our dedication to clarity, collaboration, and client success makes us a trusted partner for individuals and businesses navigating legal, HR, education, and consulting challenges
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Expertise</h3>
              <p className="text-gray-600">Comprehensive knowledge in EU law, recruitment, global education, and business strategy-tailored for each client's unique journey.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Integrity & Trust</h3>
              <p className="text-gray-600">We lead with transparency and fairness ensuring every interaction is grounded in honesty, respect, and ethical practice.</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-claryon-teal rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-2">Real Results</h3>
              <p className="text-gray-600">A strong track record of helping companies grow, professionals thrive, and students succeed across Europe.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Populated by Supabase data from useTestimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-claryon-gray mb-4">Client Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from our satisfied clients who have achieved their goals with our expert guidance.
            </p>
          </div>
          {testimonialsLoading && (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-full border-0 shadow-lg animate-pulse bg-white p-6 rounded-lg">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-10 w-10 bg-gray-300 rounded-full mb-4"></div>
                    <div className="space-y-3 mb-4 w-full">
                      <div className="h-4 bg-gray-300 rounded w-full"></div>
                      <div className="h-4 bg-gray-300 rounded w-5/6 mx-auto"></div>
                      <div className="h-4 bg-gray-300 rounded w-4/5 mx-auto"></div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 w-full mt-auto">
                      <div className="h-5 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
          {testimonialsError && <p className="text-center text-red-600 py-4">Error loading testimonials: {testimonialsError.message}</p>}
          {!testimonialsLoading && !testimonialsError && previewTestimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {previewTestimonials.map((testimonial) => (
                <Card key={testimonial.id} className="h-full flex flex-col border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
                  <CardContent className="p-6 flex flex-col items-center text-center flex-grow">
                    <Quote className="h-8 w-8 text-claryon-teal mb-4 transform scale-x-[-1]" />
                    <p className="text-gray-700 mb-4 italic flex-grow">"{testimonial.quote}"</p>
                    <div className="border-t border-gray-100 pt-4 w-full mt-auto">
                      <p className="font-semibold text-claryon-gray">{testimonial.client_name}</p>
                      {testimonial.service_availed && <p className="text-sm text-claryon-teal">{testimonial.service_availed}</p>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
           {!testimonialsLoading && !testimonialsError && previewTestimonials.length === 0 && (
             <p className="text-center text-claryon-gray py-4">No testimonials available yet. Check back soon!</p>
           )}
          <div className="text-center mt-12">
            <CTAButton to="/testimonials" variant="outline">View All Testimonials</CTAButton>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-claryon-teal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">
            No matter where you are in your journey, we're ready to support you with expert advice and practical solutions.
          </p>
          <CTAButton to="/book-appointment" variant="secondary" size="lg">Book Your Free Consultation</CTAButton>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
