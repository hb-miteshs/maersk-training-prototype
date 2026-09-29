import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  requiredIndicator?: boolean;
  optionalIndicator?: boolean;
  helperText?: string;
  errorMessage?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      requiredIndicator = false,
      optionalIndicator = false,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full font-maersk-text ${containerClassName}`}>
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={inputId}
              className="block text-xs font-bold uppercase tracking-wider text-[#003E61]"
            >
              {label}{' '}
              {requiredIndicator && <span className="text-[#EA5D4B]">*</span>}
              {optionalIndicator && (
                <span className="text-[#64748B] font-normal normal-case ml-1">(optional)</span>
              )}
            </label>
          </div>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-[#94A3B8] pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={`w-full h-[40px] px-3 bg-white text-[#003E61] border rounded-lg text-xs sm:text-sm placeholder-[#94A3B8] transition-all focus:outline-none ${
              leftIcon ? 'pl-9' : ''
            } ${rightIcon ? 'pr-9' : ''} ${
              errorMessage
                ? 'border-[#EA5D4B] focus:ring-2 focus:ring-[#EA5D4B]/30 focus:border-[#EA5D4B]'
                : 'border-[#CBD5E1] focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD]'
            } ${className}`}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {errorMessage ? (
          <p className="mt-1 text-[11px] text-[#EA5D4B] font-medium leading-none">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className="mt-1 text-[11px] text-[#64748B] leading-snug">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
