
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services', submenu: [
      { name: 'Legal Services', href: '/services/legal' },
      { name: 'HR Services', href: '/services/hr' },
      { name: 'Education Consulting', href: '/services/education' },
      { name: 'Business Consulting', href: '/services/business' },
    ]},
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/00163a20-59c4-4a42-89b2-bb49df4a4061.png" 
              alt="Claryon Group" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-claryon-teal'
                      : 'text-claryon-gray hover:text-claryon-teal'
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className="block px-4 py-3 text-sm text-claryon-gray hover:text-claryon-teal hover:bg-gray-50 transition-colors duration-200"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild
              className="bg-claryon-teal hover:bg-claryon-teal/90 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200"
            >
              <Link to="/book-appointment">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-6 mt-6">
                <img 
                  src="/lovable-uploads/00163a20-59c4-4a42-89b2-bb49df4a4061.png" 
                  alt="Claryon Group" 
                  className="h-10 w-auto self-start"
                />
                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-base font-medium transition-colors duration-200 ${
                          isActive(item.href)
                            ? 'text-claryon-teal'
                            : 'text-claryon-gray hover:text-claryon-teal'
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-2 space-y-2">
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className="block text-sm text-gray-600 hover:text-claryon-teal transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <Button 
                  asChild
                  className="bg-claryon-teal hover:bg-claryon-teal/90 text-white w-full"
                >
                  <Link to="/book-appointment" onClick={() => setIsOpen(false)}>
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
