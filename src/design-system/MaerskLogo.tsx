import React from 'react';

export interface MaerskLogoProps {
  variant?: 'light' | 'dark'; // 'light' has Deep Blue text; 'dark' has White text
  size?: 'sm' | 'md' | 'lg';
  symbolOnly?: boolean;
  className?: string;
  onClick?: () => void;
}

export const MaerskLogo: React.FC<MaerskLogoProps> = ({
  variant = 'light',
  size = 'md',
  symbolOnly = false,
  className = '',
  onClick,
}) => {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#003E61';

  // Scales
  const symbolSize = {
    sm: 28,
    md: 34,
    lg: 44,
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
      role="banner"
      aria-label="Maersk Training"
    >
      {/* 7-Pointed Star within sky-blue rounded square */}
      <svg
        width={symbolSize}
        height={symbolSize}
        viewBox="0 0 76 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <rect width="76" height="76" rx="14" fill="#42B0D5" />
        <path
          d="M 38.0 10.5
             L 43.9 25.1
             L 58.7 20.3
             L 52.8 34.6
             L 66.5 42.6
             L 51.1 46.9
             L 55.4 62.1
             L 41.9 54.7
             L 38.0 68.8
             L 34.1 54.7
             L 20.6 62.1
             L 24.9 46.9
             L 9.5 42.6
             L 23.2 34.6
             L 17.3 20.3
             L 32.1 25.1
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
                ? 'text-[15px]'
                : size === 'md'
                ? 'text-[17px]'
                : 'text-[22px]'
            }`}
          >
            MAERSK
          </span>
          <span
            style={{ color: textColor }}
            className={`font-maersk-text font-medium tracking-[0.24em] ${
              size === 'sm'
                ? 'text-[8.5px]'
                : size === 'md'
                ? 'text-[9.5px]'
                : 'text-[12px]'
            }`}
          >
            TRAINING
          </span>
        </div>
      )}
    </div>
  );
};
