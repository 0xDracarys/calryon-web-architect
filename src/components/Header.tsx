import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    {
      name: 'Services',
      href: '/services',
      submenu: [
        { name: 'Legal Services', href: '/services/legal' },
        { name: 'HR Solutions', href: '/services/hr' },
        { name: 'Education Consulting', href: '/services/education-consulting' },
        { name: 'Business Consulting', href: '/services/business-consulting' },
      ]
    },
    { name: 'Blog', href: 'https://sites.google.com/claryongroup.com/testimonials/blogs', isExternal: true },
    { name: 'Testimonials', href: 'https://sites.google.com/claryongroup.com/testimonials/testimonials', isExternal: true },
    { name: 'Contact', href: '/contact' },
    // New link for Temporary Booking
    { name: 'Temp Booking', href: 'https://sites.google.com/claryongroup.com/testimonials/appointment', isExternal: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === href; // Exact match for Home
    return location.pathname.startsWith(href); // Prefix match for others like /services or /services/legal
  }

  // More specific active check for main "Services" link if on a sub-service page
   const isServicesActive = (href: string) => {
    if (href === '/services') return location.pathname === href || location.pathname.startsWith('/services/');
    return location.pathname === href;
  }


  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3" onClick={() => setIsOpen(false)}>
            <img 
              src="/new_logo.png"
              alt="Claryon Group Logo"
              className="h-12 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item: any) => (
              <div key={item.name} className="relative group">
                {item.isExternal ? (
                  <a
                    href={item.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-sm font-medium transition-colors duration-200 text-claryon-gray hover:text-claryon-teal`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    to={item.href!}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      // Use isServicesActive for the main "Services" link, otherwise use isActive
                      item.name === 'Services' ? (isServicesActive(item.href!) ? 'text-claryon-teal' : 'text-claryon-gray hover:text-claryon-teal')
                                               : (isActive(item.href!) ? 'text-claryon-teal' : 'text-claryon-gray hover:text-claryon-teal')
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                    <div className="py-2">
                      {item.submenu.map((subItem: any) => (
                        <Link
                          key={subItem.name}
                          to={subItem.href!}
                          className={`block px-4 py-3 text-sm transition-colors duration-200 ${
                            isActive(subItem.href!)
                            ? 'text-claryon-teal bg-claryon-teal/5'
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

          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              asChild
              className="bg-claryon-teal text-white px-6 py-2.5 rounded-lg font-medium"
            >
              <Link to="/book-appointment">Book Consultation</Link>
            </Button>
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-6 w-6 text-claryon-gray" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-6">
              <div className="flex flex-col space-y-6 mt-2">
                <Link to="/" className="mb-4" onClick={() => setIsOpen(false)}>
                  <img
                    src="/new_logo.png"
                    alt="Claryon Group Logo"
                    className="h-10 w-auto"
                  />
                </Link>
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item: any) => (
                    <div key={item.name}>
                      {item.isExternal ? (
                        <a
                          href={item.href!}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className={`block py-2 text-base font-medium transition-colors duration-200 rounded-md px-3 text-claryon-gray hover:text-claryon-teal hover:bg-gray-100`}
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.href!}
                          onClick={() => {
                            // Close sheet if it's not a parent of a submenu or if it is a submenu item itself
                            if (!item.submenu) setIsOpen(false);
                          }}
                          className={`block py-2 text-base font-medium transition-colors duration-200 rounded-md px-3 ${
                            item.name === 'Services' ? (isServicesActive(item.href!) ? 'text-claryon-teal bg-claryon-teal/10' : 'text-claryon-gray hover:text-claryon-teal hover:bg-gray-100')
                                                     : (isActive(item.href!) ? 'text-claryon-teal bg-claryon-teal/10' : 'text-claryon-gray hover:text-claryon-teal hover:bg-gray-100')
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                      {item.submenu && (
                        <div className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                          {item.submenu.map((subItem: any) => (
                            <Link
                              key={subItem.name}
                              to={subItem.href!}
                              onClick={() => setIsOpen(false)} // Submenu items always close sheet
                              className={`block py-2 text-sm transition-colors duration-200 rounded-md px-3 ${
                                isActive(subItem.href!)
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
                  size="lg"
                  className="bg-claryon-teal text-white w-full mt-4"
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
