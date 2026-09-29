import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'accent' | 'subtle';
  isInteractive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      variant = 'default',
      isInteractive = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: 'bg-white border-[#E2E8F0] shadow-2xs',
      accent: 'bg-gradient-to-r from-[#F0F9FD] via-[#E6F4FA] to-[#E2F3FB] border-[#BCE1F2] shadow-xs',
      subtle: 'bg-[#F8FAFC] border-[#E2E8F0]',
    }[variant];

    const interactiveStyles = isInteractive
      ? 'hover:border-[#1686BD] hover:shadow-md cursor-pointer transition-all duration-150'
      : '';

    return (
      <div
        ref={ref}
        className={`rounded-xl border font-maersk-text ${variantStyles} ${interactiveStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-4 sm:p-5 border-b border-[#F1F5F9] ${className}`} {...props}>
    {children}
  </div>
);

export const CardBody: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-4 sm:p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className = '',
  ...props
}) => (
  <div className={`p-3.5 sm:p-4 bg-[#F8FAFC] border-t border-[#F1F5F9] rounded-b-xl ${className}`} {...props}>
    {children}
  </div>
);
