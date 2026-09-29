/**
 * Maersk Training Typography System
 * Enforcing compact enterprise SaaS density:
 * - Page titles: 28–32px
 * - Section headings: 18–22px
 * - Normal body: 13–15px
 * - Helper/metadata text: 12–13px
 * - Headline font: "Maersk Headline"
 * - Text font: "Maersk Text"
 */

export const TYPOGRAPHY = {
  fonts: {
    headline: '"Maersk Headline", system-ui, -apple-system, sans-serif',
    text: '"Maersk Text", system-ui, -apple-system, sans-serif',
  },
  classes: {
    pageTitle: 'text-2xl sm:text-[28px] font-bold tracking-tight text-[#003E61] font-maersk-headline leading-tight',
    sectionTitle: 'text-lg sm:text-[20px] font-bold tracking-tight text-[#003E61] font-maersk-headline leading-snug',
    subheading: 'text-sm sm:text-base font-semibold text-[#003E61] font-maersk-headline',
    body: 'text-sm text-[#475569] font-maersk-text leading-normal',
    bodySmall: 'text-xs text-[#64748B] font-maersk-text leading-normal',
    meta: 'text-[11px] sm:text-xs text-[#94A3B8] font-maersk-text font-normal',
    label: 'text-xs font-bold uppercase tracking-wider text-[#003E61] font-maersk-text',
    kicker: 'text-[10px] font-bold tracking-widest text-[#1686BD] uppercase font-maersk-headline',
  },
} as const;
