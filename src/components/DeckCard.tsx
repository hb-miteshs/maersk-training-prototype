import React from 'react';
import { PresentationDeck } from '../data/mockData';
import { Loader2, ArrowRight } from 'lucide-react';

export interface DeckCardProps {
  deck: PresentationDeck;
  onOpenDeck: (deckId: string) => void;
  onViewProgress: (deckId: string) => void;
  className?: string;
}

export const DeckCard: React.FC<DeckCardProps> = ({
  deck,
  onOpenDeck,
  onViewProgress,
  className = '',
}) => {
  const isPreparing = deck.status === 'Preparing';

  return (
    <div
      onClick={() => {
        if (!isPreparing) {
          onOpenDeck(deck.id);
        } else {
          onViewProgress(deck.id);
        }
      }}
      className={`group relative flex flex-col justify-between h-[225px] bg-white rounded-xl border transition-all duration-300 overflow-hidden font-maersk-text select-none ${
        isPreparing
          ? 'border-[#BAE6FD] bg-[#F8FAFC] shadow-xs cursor-pointer'
          : 'border-[#E2E8F0] hover:border-[#1686BD] hover:shadow-md cursor-pointer'
      } ${className}`}
    >
      {/* Underlying Card Content (softly blurred when card is preparing) */}
      <div
        className={`flex-1 flex flex-col justify-between h-full transition-all duration-300 ${
          isPreparing ? 'filter blur-[3px] opacity-50 pointer-events-none' : ''
        }`}
      >
        {/* Top: Card Thumbnail Preview */}
        <div className="relative h-24 w-full bg-[#E2F3FB] overflow-hidden shrink-0">
          <img
            src={deck.thumbnail}
            alt={deck.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />

          {/* PowerPoint Brand Icon Badge */}
          <div
            className="absolute top-2 left-2 w-5 h-5 rounded bg-[#D24726] text-white flex items-center justify-center shadow-xs text-[9px] font-bold font-mono tracking-tighter"
            title="PowerPoint Presentation"
          >
            P
          </div>
        </div>

        {/* Middle: Details */}
        <div className="p-3 flex-1 flex flex-col justify-between">
          <div>
            <h3
              className="text-xs font-bold text-[#003E61] line-clamp-2 leading-snug font-maersk-headline"
              title={deck.title}
            >
              {deck.title}
            </h3>
            <p className="mt-1 text-[11px] text-[#64748B]">
              {deck.createdDate}
            </p>
          </div>

          {/* Bottom: Ready status bar */}
          <div className="mt-2 pt-2 border-t border-[#F1F5F9] flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
              Ready
            </span>

            <span className="text-[11px] font-semibold text-[#1686BD] group-hover:text-[#003E61] inline-flex items-center gap-1">
              <span>Open</span>
              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* CENTER OF CARD: Centered Progress Bar Overlay with Blurred Background */}
      {isPreparing && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onViewProgress(deck.id);
          }}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-3 bg-white/60 backdrop-blur-[2px] transition-all cursor-pointer hover:bg-white/70"
        >
          <div className="w-[85%] max-w-[190px] bg-white/95 border border-[#BAE6FD] shadow-md rounded-xl p-3 flex flex-col items-center space-y-2 text-center animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#003E61] font-maersk-headline">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1686BD]" />
              <span>Preparing...</span>
            </div>

            {/* Centered Progress Bar (No percentage) */}
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1686BD] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${deck.progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-center gap-1 text-[10px] text-[#1686BD] font-semibold hover:underline">
              <span>View progress</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
