
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CTAButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  className?: string;
}

const CTAButton: React.FC<CTAButtonProps> = ({ 
  to, 
  children, 
  variant = 'primary', 
  size = 'md',
  showArrow = true,
  className = '' 
}) => {
  const baseClasses = 'font-medium transition-all duration-200';
  
  const variantClasses = {
    primary: 'bg-claryon-teal text-white shadow-lg',
    secondary: 'bg-white text-claryon-teal border-2 border-claryon-teal',
    outline: 'border-2 border-claryon-teal text-claryon-teal'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <Button asChild className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      <Link to={to} className="flex items-center space-x-2">
        <span>{children}</span>
        {showArrow && <ArrowRight className="h-4 w-4" />}
      </Link>
    </Button>
  );
};

export default CTAButton;
