import React from 'react';
import { Loader2 } from 'lucide-react';

export type DeckStatus = 'Preparing' | 'Ready';

export interface StatusBadgeProps {
  status: DeckStatus;
  progressPercent?: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  progressPercent,
  className = '',
  size = 'md',
}) => {
  if (status === 'Preparing') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-semibold text-[#1686BD] bg-[#E2F3FB] border border-[#BAE6FD] rounded-full select-none ${
          size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
        } ${className}`}
      >
        <Loader2 className="w-3 h-3 animate-spin text-[#1686BD] shrink-0" />
        <span>Preparing</span>
        {progressPercent !== undefined && (
          <span className="font-mono text-[#003E61] tabular-nums font-bold">
            {progressPercent}%
          </span>
        )}
      </span>
    );
  }

  // Ready Status
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium text-[#16A34A] bg-[#DCFCE7] border border-[#BBF7D0] rounded-full select-none ${
        size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] shrink-0" />
      <span>Ready</span>
    </span>
  );
};
