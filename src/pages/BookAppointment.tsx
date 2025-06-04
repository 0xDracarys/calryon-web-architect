
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const BookAppointment = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    serviceName: '',
    preferredDate: '',
    preferredTime: '',
    notes: ''
  });

  const services = [
    'Legal Services - Immigration',
    'Legal Services - Criminal Law',
    'Legal Services - Business Law',
    'HR Services - Recruitment',
    'HR Services - Employee Relations',
    'Education Consulting - University Applications',
    'Education Consulting - Visa Assistance',
    'Business Consulting - Market Entry',
    'Business Consulting - Executive Mentorship',
    'General Consultation'
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Combine date and time into a single datetime
      const preferredDateTime = new Date(`${formData.preferredDate}T${formData.preferredTime}:00`);

      const { error } = await supabase
        .from('appointments')
        .insert({
          client_name: formData.clientName,
          client_email: formData.clientEmail,
          client_phone: formData.clientPhone || null,
          service_name: formData.serviceName,
          preferred_datetime: preferredDateTime.toISOString(),
          notes: formData.notes || null,
          status: 'pending_confirmation'
        });

      if (error) {
        console.error('Error booking appointment:', error);
        toast({
          title: "Error",
          description: "There was an issue booking your appointment. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Appointment Booked!",
          description: "Your appointment request has been submitted. We'll confirm your booking within 24 hours.",
        });
        
        // Reset form
        setFormData({
          clientName: '',
          clientEmail: '',
          clientPhone: '',
          serviceName: '',
          preferredDate: '',
          preferredTime: '',
          notes: ''
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

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-claryon-teal/5 via-white to-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-claryon-gray mb-6">
              Book Your Consultation
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Schedule a personalized consultation with our expert team. We're here to help you achieve your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="font-playfair text-2xl text-claryon-gray text-center">
                Schedule Your Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-claryon-gray">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="clientName">Full Name *</Label>
                      <Input
                        id="clientName"
                        type="text"
                        value={formData.clientName}
                        onChange={(e) => handleInputChange('clientName', e.target.value)}
                        required
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="clientEmail">Email Address *</Label>
                      <Input
                        id="clientEmail"
                        type="email"
                        value={formData.clientEmail}
                        onChange={(e) => handleInputChange('clientEmail', e.target.value)}
                        required
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="clientPhone">Phone Number</Label>
                    <Input
                      id="clientPhone"
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => handleInputChange('clientPhone', e.target.value)}
                      className="mt-1"
                      disabled={isSubmitting}
                      placeholder="Optional but recommended for confirmation"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-claryon-gray">Service Details</h3>
                  <div>
                    <Label htmlFor="serviceName">Service Required *</Label>
                    <Select 
                      value={formData.serviceName} 
                      onValueChange={(value) => handleInputChange('serviceName', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select the service you need" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service} value={service}>
                            {service}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-claryon-gray flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-claryon-teal" />
                    Preferred Date & Time
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date *</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        min={today}
                        required
                        className="mt-1"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time *</Label>
                      <Select 
                        value={formData.preferredTime} 
                        onValueChange={(value) => handleInputChange('preferredTime', value)}
                        disabled={isSubmitting}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Please provide any additional details about your consultation needs..."
                    className="mt-1 min-h-[100px]"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Important Notes:</p>
                      <ul className="space-y-1">
                        <li>• All appointments are subject to confirmation</li>
                        <li>• We'll contact you within 24 hours to confirm your booking</li>
                        <li>• Consultations can be conducted in-person, via video call, or phone</li>
                        <li>• Please arrive 5 minutes early for in-person appointments</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-claryon-teal hover:bg-claryon-teal/90 text-lg py-3"
                  disabled={isSubmitting || !formData.clientName || !formData.clientEmail || !formData.serviceName || !formData.preferredDate || !formData.preferredTime}
                >
                  {isSubmitting ? 'Booking Appointment...' : 'Book Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookAppointment;
