
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button'; // Import ButtonProps
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTAButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | ButtonProps['variant']; // Allow Button's variants
  size?: 'sm' | 'md' | 'lg' | ButtonProps['size']; // Allow Button's sizes
  showArrow?: boolean;
  className?: string;
  target?: string;
  rel?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  to, 
  children, 
  variant = 'primary', 
  size = 'md',
  showArrow = true,
  className = '',
  target,
  rel
}) => {
  const baseClasses = 'font-medium';
  
  // Custom variants specific to CTAButton's original styling
  const ctaVariantClasses: Record<string, string> = {
    primary: 'bg-claryon-teal text-white shadow-lg hover:bg-claryon-teal/90', // Added hover
    secondary: 'bg-white text-claryon-teal border-2 border-claryon-teal hover:bg-gray-50', // Added hover
    outline: 'bg-transparent border-2 border-claryon-teal text-claryon-teal hover:bg-claryon-teal/10' // Adjusted hover
  };

  const ctaSizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Determine if the link is external
  const isExternal = to.startsWith('http://') || to.startsWith('https://');

  // Combine classes: base, variant-specific, size-specific, and any additional className
  // If variant is one of the custom ones, use ctaVariantClasses, otherwise, it's a standard Button variant
  const selectedVariantClass = ctaVariantClasses[variant as string] || '';
  const selectedSizeClass = ctaSizeClasses[size as string] || '';

  const combinedClassName = `${baseClasses} ${selectedVariantClass} ${selectedSizeClass} ${className}`.trim();

  if (isExternal) {
    return (
      <Button
        asChild
        variant={ctaVariantClasses[variant as string] ? undefined : variant as ButtonProps['variant']} // Pass variant to Button if not custom
        size={ctaSizeClasses[size as string] ? undefined : size as ButtonProps['size']} // Pass size to Button if not custom
        className={combinedClassName}
      >
        <a
          href={to}
          target={target || "_blank"}
          rel={rel || "noopener noreferrer"}
          className="flex items-center space-x-2" // Keep flex for arrow alignment
        >
          <span>{children}</span>
          {showArrow && <ArrowRight className="h-4 w-4" />}
        </a>
      </Button>
    );
  }

  return (
    <Button
      asChild
      variant={ctaVariantClasses[variant as string] ? undefined : variant as ButtonProps['variant']}
      size={ctaSizeClasses[size as string] ? undefined : size as ButtonProps['size']}
      className={combinedClassName}
    >
      <Link to={to} className="flex items-center space-x-2">
        <span>{children}</span>
        {showArrow && <ArrowRight className="h-4 w-4" />}
      </Link>
    </Button>
  );
};

export default CTAButton;
