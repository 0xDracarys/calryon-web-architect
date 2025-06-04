import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react'; // Removed X as Sheet handles close icon
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    {
      name: 'Services',
      href: '/services', // Main services overview page
      submenu: [
        { name: 'Legal Services', href: '/services/legal' },
        { name: 'HR Services', href: '/services/hr' },
        // Corrected paths for submenu items:
        { name: 'Education Consulting', href: '/services/education-consulting' },
        { name: 'Business Consulting', href: '/services/business-consulting' },
      ]
    },
    { name: 'Blog', href: '/blog' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
    // Consider adding Privacy Policy to footer or a less prominent spot
    // { name: 'Privacy Policy', href: '/privacy-policy'}
  ];

  const isActive = (href: string) => location.pathname === href ||
                                   (href === '/services' && location.pathname.startsWith('/services/')); // Highlight "Services" if on a sub-service page

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <img 
              src="/lovable-uploads/00163a20-59c4-4a42-89b2-bb49df4a4061.png" 
              alt="Claryon Group Logo" // More descriptive alt text
              className="h-12 w-auto"
            />
            {/* Optional: Add site name text if logo is not self-explanatory enough, though this one is good.
            <span className="font-semibold text-xl text-claryon-gray">Claryon Group</span>
            */}
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
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"> {/* Added z-10 */}
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href}
                          className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                            isActive(subItem.href)
                            ? 'text-claryon-teal bg-claryon-teal/5' // Highlight active subitem
                            : 'text-claryon-gray hover:text-claryon-teal hover:bg-gray-50'
                          }`}
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

          {/* CTA Button Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild
              className="bg-claryon-teal hover:bg-claryon-dark-teal text-white px-6 py-2.5 rounded-lg font-medium transition-all duration-200" // Slightly adjusted padding
            >
              <Link to="/book-appointment">Book Consultation</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-claryon-gray" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-6"> {/* Responsive width */}
              <div className="flex flex-col space-y-6 mt-2"> {/* Reduced top margin */}
                <Link to="/" className="mb-4" onClick={() => setIsOpen(false)}>
                  <img
                    src="/lovable-uploads/00163a20-59c4-4a42-89b2-bb49df4a4061.png"
                    alt="Claryon Group Logo"
                    className="h-10 w-auto" // Slightly smaller for mobile sheet
                  />
                </Link>
                <nav className="flex flex-col space-y-2"> {/* Reduced spacing */}
                  {navItems.map((item) => (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        onClick={() => {
                          if (!item.submenu) setIsOpen(false); // Close only if not a submenu parent
                        }}
                        className={`block py-2 text-base font-medium transition-colors duration-200 rounded-md px-3 ${ // Added padding and rounded
                          isActive(item.href)
                            ? 'text-claryon-teal bg-claryon-teal/10'
                            : 'text-claryon-gray hover:text-claryon-teal hover:bg-gray-100'
                        }`}
                      >
                        {item.name}
                      </Link>
                      {item.submenu && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3"> {/* Indent and border for subitems */}
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href}
                              onClick={() => setIsOpen(false)}
                              className={`block py-2 text-sm transition-colors duration-200 rounded-md px-3 ${
                                isActive(subItem.href)
                                ? 'text-claryon-teal bg-claryon-teal/10'
                                : 'text-gray-600 hover:text-claryon-teal hover:bg-gray-100'
                              }`}
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
                  size="lg" // Larger tap target
                  className="bg-claryon-teal hover:bg-claryon-dark-teal text-white w-full mt-4" // Margin top
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
