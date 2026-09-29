import React, { useState } from 'react';
import { MaerskLogo } from '../design-system/MaerskLogo';
import {
  ArrowRight,
  Loader2,
  X,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export interface LoginScreenProps {
  onLogin: () => void;
  onPreviewShell?: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onPreviewShell }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showAdminHelpModal, setShowAdminHelpModal] = useState(false);

  const handleSignIn = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onLogin();
    }, 700);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#F8FAFC] font-maersk-text select-none">
      {/* LEFT HERO / BRAND PANEL */}
      <div className="relative w-full lg:w-[58%] xl:w-[60%] min-h-[520px] lg:min-h-screen bg-[#003E61] text-white flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden">
        {/* Background Vessel & Wind Farm Imagery */}
        <img
          src="/src/assets/images/login_marine_vessel_1790488920644.jpg"
          alt="Maersk commercial vessel at dawn with offshore wind turbines"
          className="absolute inset-0 w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />

        {/* Brand Scrim Overlay: Deep Blue into Mid Blue gradient with atmospheric depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#003E61]/95 via-[#003E61]/82 to-[#1686BD]/45 backdrop-blur-[0.5px]" />

        {/* Subtle geometric angular accent line */}
        <div className="absolute top-0 right-0 w-[420px] h-[420px] border-r border-t border-[#42B0D5]/20 pointer-events-none transform -skew-x-12 translate-x-28 -translate-y-28" />

        {/* Top Header: Exact Maersk Training SVG Logo (Dark Variant) */}
        <div className="relative z-10">
          <MaerskLogo variant="dark" size="lg" />
        </div>

        {/* Value Proposition Message (Vertically centered) */}
        <div className="relative z-10 my-auto py-12 max-w-xl">
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-maersk-headline font-bold leading-[1.12] text-white tracking-tight">
            Create smarter, customer-ready presentations{' '}
            <span className="text-[#42B0D5]">with AI.</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[#E2F3FB]/90 leading-relaxed font-normal max-w-lg">
            Turn customer context into relevant, structured Maersk Training presentations.
          </p>
        </div>

        {/* Bottom anchor spacing */}
        <div className="relative z-10" />
      </div>

      {/* RIGHT SIGN-IN ACTION PANEL */}
      <div className="w-full lg:w-[42%] xl:w-[40%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#F8FAFC] via-[#F1F6FA] to-[#EBF3F8] relative overflow-hidden">
        {/* Decorative soft ambient background radial glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#1686BD]/4 rounded-full blur-3xl pointer-events-none" />

        {/* TOP STATUS BAR: Empty placeholder for balanced flex spacing */}
        <div className="relative z-10 h-6" />

        {/* CENTER CONTENT: Clean Enterprise Sign-In Module */}
        <div className="relative z-10 my-auto py-6 sm:py-8 w-full max-w-[420px] mx-auto">
          <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(0,62,97,0.07)] border border-[#E2E8F0] p-8 sm:p-10 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200">
            {/* Header: Centered title and subtitle */}
            <div className="text-center w-full">
              <h2 className="text-2xl font-bold font-maersk-headline text-[#003E61] tracking-tight">
                Sign in to your account
              </h2>
              <p className="mt-2.5 text-xs sm:text-sm text-[#64748B] font-normal leading-relaxed max-w-xs mx-auto">
                Use your Maersk Training credentials to prepare customer-ready presentations.
              </p>
            </div>

            {/* Microsoft Single Sign-On Button */}
            <div className="w-full mt-7">
              <button
                onClick={handleSignIn}
                disabled={isAuthenticating}
                className="w-full h-12 bg-[#1686BD] hover:bg-[#003E61] active:scale-[0.99] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-3 transition-all duration-200 shadow-xs hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#42B0D5] focus:ring-offset-2 disabled:opacity-75 cursor-pointer"
              >
                {isAuthenticating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white shrink-0" />
                    <span>Authenticating via Microsoft Entra...</span>
                  </>
                ) : (
                  <>
                    {/* Official Microsoft 4-square icon */}
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 21 21">
                      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                    </svg>
                    <span>Continue with Microsoft</span>
                    <ArrowRight className="w-4 h-4 ml-1 opacity-90" />
                  </>
                )}
              </button>
            </div>

            {/* Security Subtitle Pill */}
            <div className="mt-4 flex items-center justify-center w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] text-xs font-medium text-[#003E61]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1686BD]" />
                <span>Secure access via Microsoft Entra ID</span>
              </div>
            </div>

            {/* Administrator Contact Link */}
            <div className="mt-7 pt-4 border-t border-[#F1F5F9] text-xs text-[#64748B] w-full text-center">
              Having trouble signing in?{' '}
              <button
                onClick={() => setShowAdminHelpModal(true)}
                className="text-[#1686BD] hover:text-[#003E61] font-semibold underline underline-offset-2 cursor-pointer"
              >
                Contact your administrator.
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM FOOTER: Corporate Copyright and System Note */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#94A3B8] border-t border-[#E2E8F0]/80 pt-4">
          <span>&copy; {new Date().getFullYear()} A.P. Moller – Maersk</span>
          <div className="flex items-center gap-3">
            <span className="hover:text-[#64748B] cursor-pointer">Privacy Policy</span>
            <span>&middot;</span>
            <span className="hover:text-[#64748B] cursor-pointer">Terms of Service</span>
            <span>&middot;</span>
            <span className="hover:text-[#64748B] cursor-pointer">Security</span>
          </div>
        </div>
      </div>

      {/* Administrator Help Dialog */}
      {showAdminHelpModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowAdminHelpModal(false);
            }
          }}
          className="fixed inset-0 z-50 bg-[#003E61]/45 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
        >
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#CBD5E1] p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#E2F3FB] text-[#1686BD] flex items-center justify-center border border-[#BAE6FD]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold font-maersk-headline text-[#003E61]">
                    Contact Administrator
                  </h3>
                  <p className="text-[11px] text-[#64748B] mt-0.5">
                    Maersk Training Corporate IT Support
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminHelpModal(false)}
                className="text-[#94A3B8] hover:text-[#003E61] p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#475569] leading-relaxed">
              Access to Maersk Training AI-Assisted Presentation Creation is managed through corporate Microsoft Entra ID role assignments.
            </p>

            <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs space-y-2 text-[#003E61]">
              <p>
                <strong>IT Support Desk:</strong>{' '}
                <a
                  href="mailto:it-support@maersktraining.com"
                  className="text-[#1686BD] hover:underline"
                >
                  it-support@maersktraining.com
                </a>
              </p>
              <p>
                <strong>Phone Support:</strong> +45 70 26 33 11
              </p>
              <p className="text-[#64748B] text-[11px]">
                Monday &ndash; Friday: 08:00 &ndash; 17:00 CET
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAdminHelpModal(false)}
                className="h-9 px-4 bg-[#1686BD] hover:bg-[#003E61] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
