import React from 'react';
import { DeckSlide } from '../data/mockData';
import { MaerskLogo } from '../design-system/MaerskLogo';
import { CheckCircle2 } from 'lucide-react';

export interface SlideThumbnailCardProps {
  slide: DeckSlide;
  isSelected: boolean;
  isUpdating?: boolean;
}

export const SlideThumbnailCard: React.FC<SlideThumbnailCardProps> = ({
  slide,
  isSelected,
  isUpdating = false,
}) => {
  return (
    <div className="relative w-full aspect-[16/9] bg-white rounded-lg overflow-hidden select-none border border-[#CBD5E1] shadow-2xs">
      {/* Updating spinner overlay if updating */}
      {isUpdating && (
        <div className="absolute inset-0 bg-[#003E61]/30 backdrop-blur-xs flex items-center justify-center z-20">
          <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {slide.slideNumber === 1 ? (
        // SLIDE 1: Cover Slide Thumbnail (Matches 5_.png)
        <div className="relative w-full h-full bg-gradient-to-r from-white via-[#F8FBFE] to-transparent p-2 flex flex-col justify-between overflow-hidden">
          {/* Right Photographic Visual */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden">
            <img
              src={slide.imageSrc || '/src/assets/images/wind_turbine_technician_1790488933366.jpg'}
              alt="Turbine technician"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10 flex items-center gap-1">
            <MaerskLogo size="sm" symbolOnly />
            <span className="text-[6.5px] font-bold text-[#003E61] tracking-tight font-maersk-headline leading-none">
              MAERSK
            </span>
          </div>

          {/* Titles */}
          <div className="relative z-10 max-w-[65%] my-auto space-y-0.5">
            <p className="text-[8.5px] font-bold font-maersk-headline text-[#003E61] leading-tight truncate">
              {slide.title}
            </p>
            <p className="text-[6.5px] font-bold font-maersk-headline text-[#1686BD] leading-tight truncate">
              {slide.subtitle}
            </p>
            <div className="w-4 h-0.5 bg-[#42B0D5] rounded-full mt-1" />
          </div>

          {/* Footer note */}
          <div className="relative z-10 text-[5px] text-[#64748B]">
            <span>September 2024</span>
          </div>
        </div>
      ) : (
        // SLIDES 2 to 8: Interior Slides Thumbnail
        <div className="relative w-full h-full bg-white p-2 flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#F1F5F9] pb-0.5">
            <div className="flex items-center justify-between">
              <span className="text-[5.5px] font-bold tracking-wider text-[#1686BD] uppercase font-mono truncate max-w-[60%]">
                {slide.kicker || 'MAERSK TRAINING'}
              </span>
              {slide.category && (
                <span
                  className={`text-[5px] font-semibold px-1 py-0.2 rounded-full ${
                    slide.category === 'Customer-specific'
                      ? 'bg-[#E2F3FB] text-[#003E61]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {slide.category === 'Customer-specific' ? '● Custom' : '+ Standard'}
                </span>
              )}
            </div>
            <p className="text-[7.5px] font-bold font-maersk-headline text-[#003E61] truncate leading-tight mt-0.5">
              {slide.title}
            </p>
          </div>

          {/* Body Content Preview */}
          <div className="my-auto flex gap-1.5 items-center w-full">
            {/* Left Content Blocks */}
            <div className="flex-1 space-y-1 min-w-0">
              {slide.keyPoints ? (
                slide.keyPoints.slice(0, 3).map((kp, idx) => (
                  <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-0.5">
                    <p className="text-[5.5px] font-bold text-[#003E61] truncate leading-tight">
                      {kp.title}
                    </p>
                    <div className="w-full h-0.5 bg-[#E2E8F0] rounded mt-0.5" />
                  </div>
                ))
              ) : slide.bullets ? (
                slide.bullets.slice(0, 4).map((b, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#1686BD] shrink-0" />
                    <p className="text-[5.5px] text-[#475569] truncate leading-none">
                      {b}
                    </p>
                  </div>
                ))
              ) : slide.metrics ? (
                <div className="grid grid-cols-2 gap-1">
                  {slide.metrics.slice(0, 4).map((m, idx) => (
                    <div key={idx} className="bg-[#E2F3FB]/70 rounded p-0.5 text-center">
                      <span className="text-[6.5px] font-bold text-[#003E61] leading-none block">
                        {m.value}
                      </span>
                      <span className="text-[4.5px] text-[#1686BD] leading-none block truncate">
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="w-full h-1 bg-[#E2E8F0] rounded" />
                  <div className="w-3/4 h-1 bg-[#E2E8F0] rounded" />
                  <div className="w-1/2 h-1 bg-[#E2E8F0] rounded" />
                </div>
              )}
            </div>

            {/* Right Photo if present */}
            {slide.imageSrc && (
              <div className="w-[38%] h-12 rounded overflow-hidden border border-[#E2E8F0] shrink-0 relative">
                <img
                  src={slide.imageSrc}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between text-[4.5px] text-[#94A3B8] pt-0.5 border-t border-[#F8FAFC]">
            <span>MAERSK TRAINING</span>
            <span className="font-mono">SLIDE {slide.slideNumber}</span>
          </div>
        </div>
      )}
    </div>
  );
};
