import React from 'react';

interface MaerskTrainingLogoProps {
  className?: string;
  variant?: 'light' | 'dark'; // 'light' has deep blue text; 'dark' has white text
  symbolOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MaerskTrainingLogo: React.FC<MaerskTrainingLogoProps> = ({
  className = '',
  variant = 'light',
  symbolOnly = false,
  size = 'md',
}) => {
  // Dimension scales
  const symbolDimensions = {
    sm: 26,
    md: 34,
    lg: 42,
    xl: 52,
  }[size];

  const textColor = variant === 'dark' ? '#FFFFFF' : '#003E61';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Maersk 7-pointed star inside rounded square */}
      <svg
        width={symbolDimensions}
        height={symbolDimensions}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        {/* Maersk Sky Blue rounded container */}
        <rect width="100" height="100" rx="18" fill="#42B0D5" />
        
        {/* Authentic 7-pointed white star */}
        <path
          d="M 50 14.5
             L 57.8 33.2
             L 77.2 27.2
             L 69.3 45.4
             L 86.8 55.6
             L 67.2 61.2
             L 72.8 80.8
             L 55.4 71.3
             L 50 89.5
             L 44.6 71.3
             L 27.2 80.8
             L 32.8 61.2
             L 13.2 55.6
             L 30.7 45.4
             L 22.8 27.2
             L 42.2 33.2
             Z"
          fill="#FFFFFF"
        />
      </svg>

      {!symbolOnly && (
        <div className="flex flex-col justify-center leading-none">
          <span
            style={{ color: textColor }}
            className={`font-maersk-headline font-bold tracking-tight ${
              size === 'sm'
                ? 'text-sm'
                : size === 'md'
                ? 'text-[17px]'
                : size === 'lg'
                ? 'text-xl'
                : 'text-2xl'
            }`}
          >
            MAERSK
          </span>
          <span
            style={{ color: textColor }}
            className={`font-maersk-text font-normal tracking-[0.22em] ${
              size === 'sm'
                ? 'text-[8.5px]'
                : size === 'md'
                ? 'text-[10px]'
                : size === 'lg'
                ? 'text-[12px]'
                : 'text-[14px]'
            }`}
          >
            TRAINING
          </span>
        </div>
      )}
    </div>
  );
};
