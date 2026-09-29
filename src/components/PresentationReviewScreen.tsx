import React, { useState, useEffect } from 'react';
import { PresentationDeck, DeckSlide } from '../data/mockData';
import { SlideRenderer } from './SlideRenderer';
import { SlideThumbnailCard } from './SlideThumbnailCard';
import { exportDeckToPowerPoint } from '../utils/pptxExport';
import {
  ArrowLeft,
  Download,
  Sparkles,
  Trash2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../design-system/Button';

export interface PresentationReviewScreenProps {
  deck: PresentationDeck;
  onBackToDashboard: () => void;
  onUpdateDeckSlides: (updatedSlides: DeckSlide[]) => void;
}

export const PresentationReviewScreen: React.FC<PresentationReviewScreenProps> = ({
  deck,
  onBackToDashboard,
  onUpdateDeckSlides,
}) => {
  const [selectedSlideId, setSelectedSlideId] = useState<number>(deck.slides[0]?.id || 1);
  const [refinementPrompt, setRefinementPrompt] = useState(
    'Make this slide more focused on technician readiness and reduce leadership messaging.'
  );
  const [updatingSlideId, setUpdatingSlideId] = useState<number | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const selectedSlide =
    deck.slides.find((s) => s.id === selectedSlideId) || deck.slides[0] || {
      id: 1,
      slideNumber: 1,
      title: deck.title,
      subtitle: 'Presentation Overview',
    };

  const selectedIndex = deck.slides.findIndex((s) => s.id === selectedSlide.id);

  // Dynamic context-aware prompts based on selected slide
  useEffect(() => {
    if (selectedSlide.slideNumber === 1) {
      setRefinementPrompt(
        'Make this slide more focused on technician readiness and reduce leadership messaging.'
      );
    } else if (selectedSlide.slideNumber === 2) {
      setRefinementPrompt(
        'Add specific data on offshore wind turbine safety compliance and technician turnover.'
      );
    } else if (selectedSlide.slideNumber === 3) {
      setRefinementPrompt(
        'Emphasize tailored GWO accredited modular courses and simulated wave basin drills.'
      );
    } else if (selectedSlide.slideNumber === 4) {
      setRefinementPrompt(
        'Highlight emergency high-voltage rescue certification and blade technician survival training.'
      );
    } else {
      setRefinementPrompt(
        `Refine content for ${deck.customer} technical team priorities and operational safety consistency.`
      );
    }
  }, [selectedSlide.slideNumber, deck.customer]);

  // Keyboard navigation across slides (Arrow Up/Down or Left/Right)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in textarea or input
      if (['TEXTAREA', 'INPUT'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        if (selectedIndex < deck.slides.length - 1) {
          setSelectedSlideId(deck.slides[selectedIndex + 1].id);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        if (selectedIndex > 0) {
          setSelectedSlideId(deck.slides[selectedIndex - 1].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, deck.slides]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // 1. SELECT SLIDE HANDLER
  const handleSelectSlide = (slideId: number) => {
    setSelectedSlideId(slideId);
  };

  // 2. REGENERATE SLIDE (AI Refinement with Temporary Update State)
  const handleRegenerateSlide = () => {
    if (!refinementPrompt.trim() || updatingSlideId !== null) return;

    // Trigger temporary slide update state
    setUpdatingSlideId(selectedSlide.id);

    setTimeout(() => {
      // Intelligently transform the slide content to reflect user prompt
      const updatedSlides = deck.slides.map((s) => {
        if (s.id === selectedSlide.id) {
          if (s.slideNumber === 1) {
            return {
              ...s,
              subtitle: 'Technician Readiness & High-Voltage Field Competence',
              notes:
                'Tailored curriculum prioritizing technician qualifications, North Sea heavy weather CTV ingress, and zero-incident field execution for 2025.',
            };
          } else if (s.keyPoints) {
            return {
              ...s,
              keyPoints: s.keyPoints.map((kp) => ({
                ...kp,
                title: kp.title.replace(/leadership/i, 'Technician Readiness'),
                desc: `${kp.desc} Re-calibrated with direct technician safety drills, peer error trapping, and rapid GWO certification.`,
              })),
            };
          } else if (s.bullets) {
            return {
              ...s,
              bullets: [
                'GWO Basic Safety Training (BST) + Enhanced Technician Sea Survival',
                'Fast-Track Blade & Nacelle Mechanical Diagnostics',
                'Offshore Heavy Seas Crew Transfer Vessel (CTV) Ingress/Egress',
                'Technician High Voltage (HV) Isolation & Rescue Procedures',
                'Peer-to-Peer Safety Verification & Error Prevention',
                'Simulated High-Altitude Nacelle Evacuation Protocols',
              ],
            };
          } else if (s.metrics) {
            return {
              ...s,
              metrics: [
                { value: '100%', label: 'Technicians Qualified', sub: 'Before field deployment' },
                { value: '0', label: 'Safety Incidents', sub: 'Zero lost-time injuries' },
                { value: '45%', label: 'Faster Onboarding', sub: 'Streamlined GWO matrix' },
                { value: '98%', label: 'Readiness Rating', sub: 'Operational competency' },
              ],
            };
          }
        }
        return s;
      });

      onUpdateDeckSlides(updatedSlides);
      setUpdatingSlideId(null);
      showToast(`Slide ${selectedSlide.slideNumber} successfully refined with AI.`);
    }, 1800);
  };

  // 3. DELETE SLIDE
  const handleConfirmDeleteSlide = () => {
    if (deck.slides.length <= 1) {
      setIsDeleteModalOpen(false);
      showToast('A presentation must have at least one slide.');
      return;
    }

    const currentIdx = deck.slides.findIndex((s) => s.id === selectedSlide.id);
    const remaining = deck.slides
      .filter((s) => s.id !== selectedSlide.id)
      .map((s, idx) => ({ ...s, slideNumber: idx + 1 }));

    onUpdateDeckSlides(remaining);

    // Pick new selected slide
    const nextIdx = currentIdx < remaining.length ? currentIdx : remaining.length - 1;
    setSelectedSlideId(remaining[nextIdx].id);

    setIsDeleteModalOpen(false);
    showToast(`Slide deleted. ${remaining.length} slides remaining.`);
  };

  // 4. DOWNLOAD POWERPOINT ACTION
  const handleDownloadPowerPoint = async () => {
    try {
      setIsExporting(true);
      showToast('Generating editable PowerPoint presentation...');
      await exportDeckToPowerPoint(deck);
      showToast('PowerPoint downloaded successfully!');
    } catch (err) {
      console.error(err);
      showToast('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAFC] overflow-hidden select-none font-maersk-text animate-in fade-in duration-200">
      {/* Top Presentation Bar (Matches Screenshot 5_.png) */}
      <header className="h-16 px-6 bg-white border-b border-[#E2E8F0] flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-4 min-w-0">
          {/* Back link */}
          <button
            onClick={onBackToDashboard}
            className="text-xs font-semibold text-[#1686BD] hover:text-[#003E61] inline-flex items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>Back to Dashboard</span>
          </button>

          <div className="h-4 w-px bg-[#E2E8F0] shrink-0" />

          {/* Title, Ready status badge, and presentation metadata */}
          <div className="min-w-0">
            <div className="flex items-center gap-2.5 truncate">
              <h1 className="text-base sm:text-lg font-bold font-maersk-headline text-[#003E61] truncate">
                {deck.title}
              </h1>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#16A34A] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full shrink-0 border border-[#BBF7D0]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                Ready
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] truncate mt-0.5">
              {deck.slides.length} slides <span className="text-slate-300">•</span> Created {deck.createdDate} <span className="text-slate-300">•</span> Customer: {deck.customer}
            </p>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={handleDownloadPowerPoint}
            disabled={isExporting}
            isLoading={isExporting}
            leftIcon={<Download className="w-4 h-4" />}
          >
            {isExporting ? 'Generating PPTX...' : 'Download PowerPoint'}
          </Button>
        </div>
      </header>

      {/* 3-ZONE WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* ZONE 1 (LEFT): Slide Thumbnails Navigator */}
        <div className="w-52 sm:w-60 border-r border-[#E2E8F0] bg-white flex flex-col shrink-0 overflow-y-auto p-3 space-y-2">
          <div className="px-1 py-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B] flex items-center justify-between">
            <span>Slides ({deck.slides.length})</span>
            <span className="text-[10px] text-[#94A3B8] font-normal font-mono">Use ↑↓ keys</span>
          </div>

          {deck.slides.map((s) => {
            const isSelected = s.id === selectedSlide.id;
            const isUpdating = s.id === updatingSlideId;

            return (
              <div
                key={s.id}
                onClick={() => handleSelectSlide(s.id)}
                className={`group flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                  isSelected
                    ? 'border-[#1686BD] bg-[#E2F3FB]/50 shadow-xs ring-2 ring-[#1686BD]/20'
                    : 'border-transparent hover:border-[#CBD5E1] hover:bg-[#F8FAFC]'
                }`}
              >
                {/* Slide number on left */}
                <span
                  className={`text-xs font-mono mt-2 w-4 text-center shrink-0 ${
                    isSelected ? 'text-[#1686BD] font-bold' : 'text-[#94A3B8]'
                  }`}
                >
                  {s.slideNumber}
                </span>

                {/* Thumbnail card */}
                <div className="flex-1 min-w-0">
                  <SlideThumbnailCard
                    slide={s}
                    isSelected={isSelected}
                    isUpdating={isUpdating}
                  />

                  {/* Thumbnail title & tag */}
                  <div className="mt-1.5 flex items-center justify-between gap-1">
                    <p className={`text-[11px] font-medium truncate ${isSelected ? 'text-[#003E61] font-bold' : 'text-[#475569]'}`}>
                      {s.title}
                    </p>
                    {s.category && (
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-semibold shrink-0 ${
                          s.category === 'Customer-specific'
                            ? 'bg-[#E2F3FB] text-[#003E61] border border-[#BAE6FD]'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {s.category === 'Customer-specific' ? 'Custom' : 'Standard'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ZONE 2 (CENTER): Large Actual Slide Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-center bg-[#F1F5F9]/80 relative">
          <div className="w-full max-w-5xl mx-auto">
            {/* The Slide Canvas */}
            <SlideRenderer
              slide={selectedSlide}
              deckTitle={deck.title}
              isUpdating={updatingSlideId === selectedSlide.id}
            />

            {/* Quick Slide Pager Controls Underneath Canvas */}
            <div className="mt-3 flex items-center justify-between text-xs text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    if (selectedIndex > 0) {
                      handleSelectSlide(deck.slides[selectedIndex - 1].id);
                    }
                  }}
                  disabled={selectedIndex === 0}
                  className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed text-[#003E61] cursor-pointer"
                  title="Previous slide (←)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (selectedIndex < deck.slides.length - 1) {
                      handleSelectSlide(deck.slides[selectedIndex + 1].id);
                    }
                  }}
                  disabled={selectedIndex === deck.slides.length - 1}
                  className="p-1.5 rounded-lg border border-[#CBD5E1] bg-white hover:bg-[#F8FAFC] disabled:opacity-40 disabled:cursor-not-allowed text-[#003E61] cursor-pointer"
                  title="Next slide (→)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="ml-2 font-mono">
                  Slide {selectedSlide.slideNumber} of {deck.slides.length}
                </span>
              </div>

              <div className="text-[11px] text-[#94A3B8] italic">
                Review &amp; refine mode • Click Download to export editable PowerPoint
              </div>
            </div>
          </div>
        </div>

        {/* ZONE 3 (RIGHT): Compact Slide-Refinement Panel */}
        <div className="w-80 sm:w-88 border-l border-[#E2E8F0] bg-white flex flex-col justify-between shrink-0 overflow-y-auto p-4 space-y-4">
          <div className="space-y-4">
            {/* AI Assistant Header with toggle */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#1686BD]" />
                <h3 className="text-sm font-bold font-maersk-headline text-[#003E61]">
                  AI Assistant
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
                className="text-[#94A3B8] hover:text-[#003E61] p-1 cursor-pointer"
                aria-label="Toggle AI Assistant"
              >
                {isAiAssistantOpen ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>

            {isAiAssistantOpen && (
              <div className="space-y-3.5 animate-in fade-in duration-150">
                {/* Refine this slide subheader & slide count pill */}
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-[#003E61] uppercase tracking-wider">
                    Refine this slide
                  </h4>
                  <span className="text-[11px] font-mono font-medium text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full border border-[#E2E8F0]">
                    Slide {selectedSlide.slideNumber} of {deck.slides.length}
                  </span>
                </div>

                {/* Slide Name / Title Label */}
                <div>
                  <span className="block text-[11px] font-semibold text-[#64748B] mb-0.5">
                    Slide name
                  </span>
                  <h5 className="text-sm font-bold font-maersk-headline text-[#003E61] leading-snug">
                    {selectedSlide.title} {selectedSlide.subtitle ? `— ${selectedSlide.subtitle}` : ''}
                  </h5>
                </div>

                {/* Refinement Text Input */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#003E61]">
                      Describe what you’d like to change.
                    </label>
                    <span className="text-[10px] text-[#94A3B8] font-mono tabular-nums">
                      {refinementPrompt.length}/500
                    </span>
                  </div>
                  <textarea
                    rows={4}
                    value={refinementPrompt}
                    onChange={(e) => setRefinementPrompt(e.target.value.slice(0, 500))}
                    placeholder="e.g. Make this slide more focused on technician readiness and reduce leadership messaging."
                    className="w-full p-2.5 bg-white border border-[#CBD5E1] rounded-lg text-xs text-[#003E61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD] leading-relaxed resize-none"
                  />
                </div>

                {/* Actions: Regenerate Slide & Delete Slide */}
                <div className="space-y-2 pt-1">
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                    onClick={handleRegenerateSlide}
                    disabled={updatingSlideId !== null || !refinementPrompt.trim()}
                    isLoading={updatingSlideId === selectedSlide.id}
                    leftIcon={<Sparkles className="w-4 h-4" />}
                  >
                    <span>
                      {updatingSlideId === selectedSlide.id
                        ? 'Refining slide...'
                        : 'Regenerate Slide'}
                    </span>
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-[#475569] hover:text-[#EA5D4B] hover:border-[#EA5D4B]"
                    onClick={() => setIsDeleteModalOpen(true)}
                    disabled={updatingSlideId !== null}
                    leftIcon={<Trash2 className="w-3.5 h-3.5" />}
                  >
                    <span>Delete Slide</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#003E61]/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#CBD5E1] p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#EA5D4B] flex items-center justify-center border border-red-200">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-maersk-headline text-[#003E61]">
                    Delete Slide {selectedSlide.slideNumber}?
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    "{selectedSlide.title}" will be removed from this presentation.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#003E61] p-1 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              The remaining slides will be automatically renumbered sequentially. You can re-add or regenerate this content if needed.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2.5">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleConfirmDeleteSlide}
              >
                Delete Slide
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#003E61] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200 border border-[#1686BD]">
          <CheckCircle2 className="w-4 h-4 text-[#42B0D5]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
