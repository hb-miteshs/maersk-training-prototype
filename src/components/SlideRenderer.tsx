import React from 'react';
import { DeckSlide } from '../data/mockData';
import { MaerskLogo } from '../design-system/MaerskLogo';
import { CheckCircle2 } from 'lucide-react';

interface SlideRendererProps {
  slide: DeckSlide;
  deckTitle: string;
  isUpdating?: boolean;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({
  slide,
  deckTitle,
  isUpdating = false,
}) => {
  return (
    <div className="relative w-full aspect-[16/9] bg-white rounded-xl shadow-lg border border-[#CBD5E1] overflow-hidden select-none transition-all duration-300">
      {/* Refinement Shimmer / Updating Overlay */}
      {isUpdating && (
        <div className="absolute inset-0 z-30 bg-[#003E61]/25 backdrop-blur-[2px] flex items-center justify-center animate-in fade-in duration-200">
          <div className="bg-white/95 px-5 py-3 rounded-xl shadow-lg border border-[#BAE6FD] flex items-center gap-3">
            <div className="w-5 h-5 rounded-full border-2 border-[#1686BD] border-t-transparent animate-spin" />
            <span className="text-xs font-bold text-[#003E61]">
              Refining slide with AI...
            </span>
          </div>
        </div>
      )}

      {/* Render Slide based on slideNumber */}
      {slide.slideNumber === 1 ? (
        // SLIDE 1: Cover Slide (Matches Screenshot 5_.png)
        <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden bg-white">
          {/* Right Photographic Visual with Soft Geometric Mask */}
          <div className="absolute right-0 top-0 bottom-0 w-[55%] pointer-events-none overflow-hidden">
            <img
              src={slide.imageSrc || '/src/assets/images/wind_turbine_technician_1790488933366.jpg'}
              alt="Offshore wind installation and turbine technician"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Soft geometric and radial gradient mask blending smoothly into white */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
          </div>

          {/* Top Brand Header */}
          <div className="relative z-10">
            <MaerskLogo variant="light" size="md" />
            <div className="mt-4 flex items-center gap-2 text-[10px] sm:text-[11px] font-bold tracking-widest text-[#64748B] uppercase">
              <span>PEOPLE</span>
              <span className="text-[#42B0D5]">|</span>
              <span>SKILLS</span>
              <span className="text-[#42B0D5]">|</span>
              <span>A SAFER, CLEANER TOMORROW</span>
            </div>
          </div>

          {/* Center Titles (Matches 5_.png) */}
          <div className="relative z-10 max-w-lg my-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold font-maersk-headline text-[#003E61] tracking-tight leading-tight">
              {slide.title}
            </h1>
            <h2 className="mt-1 text-xl sm:text-2xl lg:text-[28px] font-bold font-maersk-headline text-[#1686BD] tracking-tight">
              {slide.subtitle}
            </h2>

            <p className="mt-4 text-xs sm:text-sm text-[#475569] leading-relaxed max-w-md">
              {slide.notes || 'Building the skilled workforce for a safer and more productive offshore wind future.'}
            </p>

            <div className="mt-5 w-12 h-1 bg-[#42B0D5] rounded-full" />
          </div>

          {/* Bottom Date / Prepared For */}
          <div className="relative z-10 flex items-center justify-between text-[11px] text-[#64748B]">
            <div>
              <p className="font-semibold text-[#003E61]">September 2024</p>
              <p>Prepared for Adamas Wind</p>
            </div>
          </div>
        </div>
      ) : (
        // INTERIOR SLIDES (2 to 8) - Matches PDF Templates & Master Spec
        <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-white">
          {/* Top Slide Header */}
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-widest text-[#1686BD] uppercase font-mono">
                {slide.kicker || 'MAERSK TRAINING'}
              </span>
              {slide.category && (
                <span
                  className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                    slide.category === 'Customer-specific'
                      ? 'bg-[#E2F3FB] text-[#003E61] border border-[#BAE6FD]'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {slide.category === 'Customer-specific' && '● '}
                  {slide.category}
                </span>
              )}
            </div>

            <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold font-maersk-headline text-[#003E61] tracking-tight">
              {slide.title}
            </h2>
            <p className="mt-0.5 text-xs sm:text-sm text-[#1686BD] font-medium">
              {slide.subtitle}
            </p>

            {/* Subtle Divider Line */}
            <div className="mt-3 w-full h-px bg-[#E2E8F0]" />
          </div>

          {/* Main Slide Body */}
          <div className="my-auto py-2">
            {/* Slide 2 & 3 & 6 & 7: Key Points Layout with optional photo */}
            {slide.keyPoints && (
              <div className={`grid gap-4 ${slide.imageSrc ? 'grid-cols-1 md:grid-cols-5' : 'grid-cols-1 md:grid-cols-2'}`}>
                <div className={`space-y-3 ${slide.imageSrc ? 'md:col-span-3' : 'md:col-span-2'}`}>
                  {slide.keyPoints.map((kp, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
                      <h4 className="text-xs sm:text-sm font-bold text-[#003E61]">
                        {kp.title}
                      </h4>
                      <p className="mt-0.5 text-[11px] sm:text-xs text-[#475569] leading-relaxed">
                        {kp.desc}
                      </p>
                    </div>
                  ))}
                </div>

                {slide.imageSrc && (
                  <div className="md:col-span-2 rounded-lg overflow-hidden border border-[#E2E8F0] h-full min-h-[140px] relative">
                    <img
                      src={slide.imageSrc}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Slide 4: Bullets / Product Portfolio Layout */}
            {slide.bullets && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  {slide.bullets.slice(0, Math.ceil(slide.bullets.length / 2)).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F0F9FD] border border-[#BAE6FD]">
                      <CheckCircle2 className="w-4 h-4 text-[#1686BD] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#003E61] font-medium leading-snug">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  {slide.bullets.slice(Math.ceil(slide.bullets.length / 2)).map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#F0F9FD] border border-[#BAE6FD]">
                      <CheckCircle2 className="w-4 h-4 text-[#1686BD] shrink-0 mt-0.5" />
                      <span className="text-xs text-[#003E61] font-medium leading-snug">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Slide 5: Metrics & Quote Layout */}
            {slide.metrics && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {slide.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 bg-[#E2F3FB]/70 border border-[#BAE6FD] rounded-lg text-center">
                      <p className="text-xl sm:text-2xl font-bold font-maersk-headline text-[#003E61] tracking-tight">
                        {m.value}
                      </p>
                      <p className="text-xs font-semibold text-[#1686BD] mt-0.5">
                        {m.label}
                      </p>
                      {m.sub && (
                        <p className="text-[10px] text-[#64748B] mt-0.5">
                          {m.sub}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {slide.quote && (
                  <div className="p-3.5 bg-[#F8FAFC] border-l-4 border-[#1686BD] rounded-r-lg">
                    <p className="text-xs text-[#334155] italic leading-relaxed">
                      "{slide.quote.text}"
                    </p>
                    <p className="text-[11px] font-bold text-[#003E61] mt-1.5">
                      — {slide.quote.author}, {slide.quote.role}
                    </p>
                  </div>
                )}
              </div>
            )}

            {slide.notes && !slide.keyPoints && !slide.bullets && !slide.metrics && (
              <p className="text-xs text-[#475569] leading-relaxed">
                {slide.notes}
              </p>
            )}
          </div>

          {/* Slide Footer */}
          <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[10px] text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#64748B]">MAERSK TRAINING</span>
              <span>|</span>
              <span>{deckTitle.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono">SLIDE {slide.slideNumber}</span>
              <MaerskLogo size="sm" symbolOnly />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
