import React from 'react';
import { PresentationDeck } from '../data/mockData';
import { Button } from '../design-system/Button';
import { DeckCard } from './DeckCard';
import {
  ArrowRight,
  Plus,
  Loader2,
  ChevronRight,
} from 'lucide-react';

export interface DashboardScreenProps {
  decks: PresentationDeck[];
  onStartCreatePitch: () => void;
  onStartBlankPitch: () => void;
  onOpenDeck: (deckId: string) => void;
  onViewProgress: (deckId: string) => void;
  onViewAllDecks: () => void;
  onFastForward?: () => void;
  onSimulateNewPreparing?: () => void;
  onResetSimulation?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  decks,
  onStartCreatePitch,
  onStartBlankPitch,
  onOpenDeck,
  onViewProgress,
  onViewAllDecks,
  onFastForward,
  onSimulateNewPreparing,
  onResetSimulation,
}) => {
  const preparingDecks = decks.filter((d) => d.status === 'Preparing');

  return (
    <div className="p-6 sm:p-8 max-w-[1360px] mx-auto space-y-7 animate-in fade-in duration-200 font-maersk-text select-none">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold font-maersk-headline text-[#003E61] tracking-tight leading-tight">
            Dashboard
          </h1>
          <p className="mt-0.5 text-xs sm:text-sm text-[#64748B]">
            Create and manage customer presentations.
          </p>
        </div>
      </div>

      {/* Start A Presentation CTA Cards (Matches Reference 2_.png) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* CTA 1 — PRIMARY (Span 8 cols on desktop) */}
        <div className="lg:col-span-8 relative bg-gradient-to-r from-[#F0F9FD] via-[#E8F5FB] to-[#E2F3FB] border border-[#BCE1F2] rounded-2xl p-6 sm:p-7 overflow-hidden flex flex-col justify-between shadow-2xs group">
          {/* Authentic Marine / Vessel Graphic on right side */}
          <div className="absolute right-0 top-0 bottom-0 w-2/5 sm:w-1/2 pointer-events-none overflow-hidden hidden sm:block">
            <img
              src="/src/assets/images/wind_turbine_technician_1790488933366.jpg"
              alt="Maersk maritime operations"
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#E8F5FB]/75 to-[#E8F5FB]" />
          </div>

          <div className="relative z-10 max-w-sm sm:max-w-md">
            <h2 className="text-xl sm:text-[22px] font-bold font-maersk-headline text-[#003E61] tracking-tight">
              Create Customer Pitch
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#475569] leading-relaxed">
              Build a customer-specific presentation using CRM context, research and Maersk Training content.
            </p>
          </div>

          <div className="mt-6 relative z-10">
            <Button
              variant="primary"
              size="md"
              onClick={onStartCreatePitch}
              rightIcon={<ArrowRight className="w-4 h-4 ml-0.5" />}
            >
              Create Pitch
            </Button>
          </div>
        </div>

        {/* CTA 2 — SECONDARY (Span 4 cols on desktop) */}
        <div className="lg:col-span-4 relative bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-2xs overflow-hidden">
          {/* Blank Presentation Document Icon Accent on right */}
          <div className="absolute -right-3 -bottom-3 w-32 h-36 bg-[#F0F9FD] border border-[#BAE6FD] rounded-xl transform rotate-6 pointer-events-none flex items-center justify-center opacity-70">
            <div className="w-8 h-8 rounded-full bg-[#1686BD]/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-[#1686BD]" />
            </div>
          </div>

          <div className="relative z-10">
            <h2 className="text-lg sm:text-xl font-bold font-maersk-headline text-[#003E61] tracking-tight">
              Blank Presentation
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-xs">
              Start from scratch without predefined customer context.
            </p>
          </div>

          <div className="mt-6 relative z-10">
            <Button
              variant="secondary"
              size="md"
              onClick={onStartBlankPitch}
              rightIcon={<ArrowRight className="w-3.5 h-3.5 ml-0.5" />}
            >
              Create Blank Presentation
            </Button>
          </div>
        </div>
      </div>

      {/* RECENT PRESENTATIONS SECTION */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg sm:text-[20px] font-bold font-maersk-headline text-[#003E61]">
              Recent presentations
            </h2>
            {preparingDecks.length > 0 && (
              <span className="text-[11px] font-semibold text-[#1686BD] bg-[#E2F3FB] border border-[#BAE6FD] px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin text-[#1686BD]" />
                <span>{preparingDecks.length} generating in background</span>
              </span>
            )}
          </div>

          <button
            onClick={onViewAllDecks}
            className="text-xs font-semibold text-[#1686BD] hover:text-[#003E61] inline-flex items-center gap-1 group cursor-pointer"
          >
            <span>View all</span>
            <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Deck Cards Grid (Strict Identical Height: h-[285px] via Shared DeckCard) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {decks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onOpenDeck={onOpenDeck}
              onViewProgress={onViewProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
