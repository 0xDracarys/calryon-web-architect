
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-claryon-gray text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="font-playfair text-2xl font-bold" style={{ color: '#1B6E7E' }}>
                Claryon Group
              </span>
            </Link>
            <p className="text-gray-300 text-sm">
              Professional consulting services across Europe and non-EU countries. 
              Expert guidance in legal, HR, education, and business matters.
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" 
                 className="text-gray-300 hover:text-claryon-teal transition-colors">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services/legal" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Legal Services
                </Link>
              </li>
              <li>
                <Link to="/services/hr" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  HR Solutions
                </Link>
              </li>
              <li>
                <Link to="/services/education" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Education Consulting
                </Link>
              </li>
              <li>
                <Link to="/services/business" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Business Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-claryon-teal transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-playfair font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 mt-1 text-claryon-teal flex-shrink-0" />
                <span className="text-gray-300">
                  K. Donelaičio g. 33<br />
                  Kaunas, 44240 Kauno m sav<br />
                  Lithuania
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-claryon-teal flex-shrink-0" />
                <span className="text-gray-300">+37062177470</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-claryon-teal flex-shrink-0" />
                <span className="text-gray-300">info@claryongroup.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © 2024 Claryon Group. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-300 hover:text-claryon-teal transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-300 hover:text-claryon-teal transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
