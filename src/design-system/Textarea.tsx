import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  requiredIndicator?: boolean;
  helperText?: string;
  errorMessage?: string;
  maxLength?: number;
  currentLength?: number;
  guidanceText?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      requiredIndicator = false,
      helperText,
      errorMessage,
      maxLength,
      currentLength,
      guidanceText,
      containerClassName = '',
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className={`w-full font-maersk-text ${containerClassName}`}>
        {label && (
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor={textareaId}
              className="block text-xs font-bold uppercase tracking-wider text-[#003E61]"
            >
              {label} {requiredIndicator && <span className="text-[#EA5D4B]">*</span>}
            </label>
            {maxLength !== undefined && currentLength !== undefined && (
              <span className="text-xs text-[#94A3B8] font-mono tabular-nums">
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}

        {guidanceText && (
          <div className="mb-2 p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#475569] leading-snug">
            {guidanceText}
          </div>
        )}

        <textarea
          id={textareaId}
          ref={ref}
          maxLength={maxLength}
          className={`w-full p-3 bg-white text-[#003E61] border rounded-lg text-xs sm:text-sm placeholder-[#94A3B8] leading-relaxed transition-all focus:outline-none ${
            errorMessage
              ? 'border-[#EA5D4B] focus:ring-2 focus:ring-[#EA5D4B]/30 focus:border-[#EA5D4B]'
              : 'border-[#CBD5E1] focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD]'
          } ${className}`}
          {...props}
        />

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

Textarea.displayName = 'Textarea';
