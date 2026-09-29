import React, { useState } from 'react';
import { PresentationDeck } from '../data/mockData';
import { DeckCard } from './DeckCard';
import { Search, ArrowLeft, X, Layers, Filter } from 'lucide-react';

export interface AllDecksScreenProps {
  decks: PresentationDeck[];
  onOpenDeck: (deckId: string) => void;
  onViewProgress: (deckId: string) => void;
  onBackToDashboard: () => void;
}

export const AllDecksScreen: React.FC<AllDecksScreenProps> = ({
  decks,
  onOpenDeck,
  onViewProgress,
  onBackToDashboard,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Ready' | 'Preparing'>('All');

  // Filter strictly by searchTerm and only Preparing/Ready statuses
  const filteredDecks = decks.filter((d) => {
    const matchesSearch =
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.industry.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || d.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const preparingCount = decks.filter((d) => d.status === 'Preparing').length;
  const readyCount = decks.filter((d) => d.status === 'Ready').length;

  return (
    <div className="p-6 sm:p-8 max-w-[1360px] mx-auto space-y-6 animate-in fade-in duration-200 font-maersk-text select-none">
      {/* Top Navigation Back */}
      <button
        onClick={onBackToDashboard}
        className="text-xs font-semibold text-[#003E61] hover:text-[#1686BD] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
        <span>Back to Dashboard</span>
      </button>

      {/* Screen Title & Compact Controls Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-[28px] font-bold font-maersk-headline text-[#003E61] tracking-tight leading-tight">
              All Decks
            </h1>
            <span className="text-xs font-semibold text-[#1686BD] bg-[#E2F3FB] border border-[#BAE6FD] px-2.5 py-0.5 rounded-full font-mono">
              {filteredDecks.length}
            </span>
          </div>
          <p className="mt-0.5 text-xs sm:text-sm text-[#64748B]">
            Complete library of customer presentations and active proposals.
          </p>
        </div>

        {/* Compact Search and Strict Status Filters */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Compact Search Input (38px high) */}
          <div className="relative w-64 sm:w-72">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title or customer..."
              className="w-full h-[38px] pl-9 pr-8 bg-white border border-[#CBD5E1] rounded-lg text-xs sm:text-sm text-[#003E61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD] transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-2.5 text-[#94A3B8] hover:text-[#003E61] cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Segmented Filter (Strictly All / Ready / Preparing only) */}
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-lg border border-[#E2E8F0]">
            {(
              [
                { label: 'All', value: 'All', count: decks.length },
                { label: 'Ready', value: 'Ready', count: readyCount },
                { label: 'Preparing', value: 'Preparing', count: preparingCount },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                onClick={() => setStatusFilter(item.value)}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  statusFilter === item.value
                    ? 'bg-white text-[#003E61] shadow-2xs font-bold'
                    : 'text-[#64748B] hover:text-[#003E61]'
                }`}
              >
                <span>{item.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    statusFilter === item.value
                      ? 'bg-[#E2F3FB] text-[#003E61]'
                      : 'bg-slate-200/70 text-[#64748B]'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Shared DeckCards */}
      {filteredDecks.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-[#E2E8F0] space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#F0F9FD] text-[#1686BD] flex items-center justify-center mx-auto border border-[#BAE6FD]">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-sm sm:text-base font-bold font-maersk-headline text-[#003E61]">
            No presentations match "{searchTerm}"
          </h3>
          <p className="text-xs text-[#64748B] max-w-sm mx-auto">
            Try adjusting your search query or reset the status filter to view all presentations.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('All');
            }}
            className="text-xs font-semibold text-[#1686BD] hover:underline cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredDecks.map((deck) => (
            <DeckCard
              key={deck.id}
              deck={deck}
              onOpenDeck={onOpenDeck}
              onViewProgress={onViewProgress}
            />
          ))}
        </div>
      )}
    </div>
  );
};
