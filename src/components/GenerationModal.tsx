import React, { useEffect, useState, useRef } from 'react';
import { PresentationDeck } from '../data/mockData';
import { Loader2 } from 'lucide-react';

export interface GenerationModalProps {
  deck: PresentationDeck;
  isOpen: boolean;
  onClose: () => void;
  onRedirectToDashboard: () => void;
  onOpenDeck?: (deckId: string) => void;
  isInitialCreationFlow?: boolean;
}

const TOTAL_DURATION_MS = 5000;

export const GenerationModal: React.FC<GenerationModalProps> = ({
  deck,
  isOpen,
  onRedirectToDashboard,
}) => {
  const [elapsedMs, setElapsedMs] = useState(0);
  const redirectTriggeredRef = useRef(false);
  const onRedirectRef = useRef(onRedirectToDashboard);

  // Keep callback reference updated without triggering effect
  useEffect(() => {
    onRedirectRef.current = onRedirectToDashboard;
  }, [onRedirectToDashboard]);

  useEffect(() => {
    if (!isOpen) {
      setElapsedMs(0);
      redirectTriggeredRef.current = false;
      return;
    }

    setElapsedMs(0);
    redirectTriggeredRef.current = false;
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;

      if (elapsed >= TOTAL_DURATION_MS) {
        setElapsedMs(TOTAL_DURATION_MS);
        clearInterval(interval);
        if (!redirectTriggeredRef.current) {
          redirectTriggeredRef.current = true;
          onRedirectRef.current();
        }
      } else {
        setElapsedMs(elapsed);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round((elapsedMs / TOTAL_DURATION_MS) * 100));
  const secondsRemaining = Math.max(1, Math.ceil((TOTAL_DURATION_MS - elapsedMs) / 1000));

  const handleDismiss = () => {
    redirectTriggeredRef.current = true;
    onRedirectToDashboard();
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleDismiss();
        }
      }}
      className="fixed inset-0 z-50 bg-[#003E61]/50 backdrop-blur-xs flex items-center justify-center p-4 font-maersk-text select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#CBD5E1] p-6 relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-center">
        {/* Animated Status Icon */}
        <div className="w-12 h-12 mx-auto mb-3.5 rounded-2xl bg-[#E2F3FB] border border-[#BAE6FD] text-[#1686BD] flex items-center justify-center shadow-xs">
          <Loader2 className="w-6 h-6 animate-spin text-[#1686BD]" />
        </div>

        {/* Headline */}
        <h3 className="text-lg font-bold font-maersk-headline text-[#003E61] tracking-tight">
          Preparing Presentation
        </h3>

        {/* Concise Message with Customer and Notification info */}
        <p className="mt-2 text-xs sm:text-[13px] text-[#475569] leading-relaxed max-w-xs mx-auto">
          Generating pitch for <strong className="text-[#003E61]">{deck.customer || 'the client'}</strong>. It will take a few moments and you will be notified once it's ready.
        </p>

        {/* Clean Progress & Countdown */}
        <div className="mt-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[#64748B] font-medium">Redirecting to Dashboard...</span>
            <span className="font-mono text-[#1686BD] font-semibold text-xs">
              {secondsRemaining}s
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#1686BD] rounded-full transition-all duration-75 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

