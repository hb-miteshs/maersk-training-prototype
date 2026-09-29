import React from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    // Sizing (Compact Enterprise Heights 34px - 44px)
    const sizeClasses = {
      sm: 'h-[34px] px-3 text-xs gap-1.5 rounded-md',
      md: 'h-[40px] px-4 text-xs sm:text-sm font-semibold gap-2 rounded-lg',
      lg: 'h-[44px] px-5 text-sm font-semibold gap-2.5 rounded-lg',
    }[size];

    // Variants (Strict Maersk Brand Palette)
    const variantClasses = {
      primary:
        'bg-[#1686BD] hover:bg-[#003E61] text-white shadow-xs focus:ring-2 focus:ring-[#42B0D5] focus:ring-offset-1',
      secondary:
        'bg-white hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#94A3B8] text-[#003E61] shadow-2xs focus:ring-2 focus:ring-[#1686BD]',
      outline:
        'bg-transparent hover:bg-[#E2F3FB] border border-[#1686BD] text-[#1686BD] hover:text-[#003E61] focus:ring-2 focus:ring-[#1686BD]',
      ghost:
        'bg-transparent hover:bg-[#F1F5F9] text-[#475569] hover:text-[#003E61]',
      danger:
        'bg-white hover:bg-[#FEF2F2] border border-[#CBD5E1] hover:border-[#EA5D4B] text-[#EA5D4B] focus:ring-2 focus:ring-[#EA5D4B]',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`inline-flex items-center justify-center font-maersk-text transition-colors duration-150 select-none cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${sizeClasses} ${variantClasses} ${className}`}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin shrink-0 text-current" />
            <span>{children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
