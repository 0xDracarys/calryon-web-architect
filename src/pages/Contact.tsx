
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          service_of_interest: formData.service || null,
          message: formData.message
        });

      if (error) {
        console.error('Error submitting contact form:', error);
        toast({
          title: "Error",
          description: "There was an issue sending your message. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Message Sent!",
          description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-claryon-teal/5 via-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Ready to start your journey? Contact our expert team for personalized consulting solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-claryon-gray">
                    Send Us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="mt-1"
                          disabled={isSubmitting}
                        />
                      </div>
                      <div>
                        <Label htmlFor="service">Service of Interest</Label>
                        <Select 
                          value={formData.service} 
                          onValueChange={(value) => handleInputChange('service', value)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="legal">Legal Services</SelectItem>
                            <SelectItem value="hr">HR Services</SelectItem>
                            <SelectItem value="education">Education Consulting</SelectItem>
                            <SelectItem value="business">Business Consulting</SelectItem>
                            <SelectItem value="multiple">Multiple Services</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Please describe your needs and how we can help you..."
                        required
                        className="mt-1 min-h-[120px]"
                        disabled={isSubmitting}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-claryon-teal hover:bg-claryon-teal/90 text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="font-playfair text-2xl font-semibold text-claryon-gray mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-claryon-teal mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-claryon-gray">Office Address</h3>
                      <p className="text-gray-600">
                        123 Business Street<br />
                        Professional District<br />
                        City, Country 12345
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-claryon-teal mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-claryon-gray">Phone</h3>
                      <p className="text-gray-600">+1 (555) 123-4567</p>
                      <a 
                        href="https://wa.me/1234567890" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-claryon-teal hover:underline"
                      >
                        WhatsApp Available
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-claryon-teal mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-claryon-gray">Email</h3>
                      <p className="text-gray-600">info@claryongroup.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-claryon-teal mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-claryon-gray">Business Hours</h3>
                      <div className="text-gray-600">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-claryon-gray mb-4">
                    Our Location
                  </h3>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <MapPin className="h-12 w-12 mx-auto mb-2" />
                      <p>Interactive Map Coming Soon</p>
                      <p className="text-sm">Embedded Google Maps integration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
