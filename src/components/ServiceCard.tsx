
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CTAButton from './CTAButton';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  href: string;
  icon?: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, features, href, icon }) => {
  return (
    <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border-0 shadow-lg">
      <CardHeader className="text-center pb-4">
        {icon && (
          <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-claryon-teal/10 rounded-full group-hover:bg-claryon-teal/20 transition-colors duration-300">
            {icon}
          </div>
        )}
        <CardTitle className="font-playfair text-xl text-claryon-gray group-hover:text-claryon-teal transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ul className="space-y-2 mb-6 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-2">
              <div className="w-2 h-2 bg-claryon-teal rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <CTAButton to={href} variant="outline" size="sm" className="w-full">
          Learn More
        </CTAButton>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
