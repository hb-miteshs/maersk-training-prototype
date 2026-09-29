import React, { useState, useRef, useEffect } from 'react';
import { CustomerAccount } from '../data/mockData';
import { MaerskLogo } from '../design-system/MaerskLogo';
import { Button } from '../design-system/Button';
import {
  Search,
  ChevronDown,
  Plus,
  X,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';

export interface CreatePitchScreenProps {
  customers: CustomerAccount[];
  onAddNewCustomer: (newCust: CustomerAccount) => void;
  onSubmitPitch: (data: { customer: CustomerAccount; audience?: string; pitchBrief: string }) => void;
  onCancel: () => void;
}

export const CreatePitchScreen: React.FC<CreatePitchScreenProps> = ({
  customers,
  onAddNewCustomer,
  onSubmitPitch,
  onCancel,
}) => {
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerAccount | null>(null);
  const [isAutocompleteOpen, setIsAutocompleteOpen] = useState(false);

  const [audience, setAudience] = useState('');
  const [pitchBrief, setPitchBrief] = useState('');

  // Add new customer modal state
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustDetails, setNewCustDetails] = useState('');
  const [addCustomerError, setAddCustomerError] = useState('');

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter customers based on search term
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.industry.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.region.toLowerCase().includes(customerSearch.toLowerCase())
  );

  // Close dropdown on click outside and escape key handling
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsAutocompleteOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAutocompleteOpen(false);
        if (isAddCustomerModalOpen) {
          setIsAddCustomerModalOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAddCustomerModalOpen]);

  // Select customer from dropdown
  const handleSelectCustomer = (cust: CustomerAccount) => {
    setSelectedCustomer(cust);
    setCustomerSearch(cust.name);
    setIsAutocompleteOpen(false);
  };

  // Clear selected customer
  const handleClearCustomer = () => {
    setSelectedCustomer(null);
    setCustomerSearch('');
    setIsAutocompleteOpen(false);
  };

  // Add new customer submission (Modal)
  const handleCreateCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      setAddCustomerError('Customer name is required');
      return;
    }

    const newCust: CustomerAccount = {
      id: `manual-${Date.now()}`,
      name: newCustName.trim(),
      industry: 'Custom / Energy',
      region: 'Global',
      type: 'Prospect',
      historyNotes: newCustDetails.trim() || 'Manually added customer context for pitch creation.',
      isManual: true,
    };

    onAddNewCustomer(newCust);
    setSelectedCustomer(newCust);
    setCustomerSearch(newCust.name);
    setIsAddCustomerModalOpen(false);
    setNewCustName('');
    setNewCustDetails('');
    setAddCustomerError('');
    setIsAutocompleteOpen(false);
  };

  // Helper for quick demonstration of golden scenario
  const handleLoadGoldenScenario = () => {
    const adamas = customers.find((c) => c.name === 'Adamas Wind') || customers[0];
    setSelectedCustomer(adamas);
    setCustomerSearch(adamas.name);
    setAudience('Head of Operations, Training Manager');
    setPitchBrief(
      'Adamas Wind is expanding offshore operations next year and wants to improve technician readiness and safety consistency. We want to explore relevant training options and position Maersk Training as a long-term competence partner.'
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) {
      setIsAutocompleteOpen(true);
      return;
    }
    if (!pitchBrief.trim()) {
      return;
    }

    onSubmitPitch({
      customer: selectedCustomer,
      audience: audience.trim() || undefined,
      pitchBrief: pitchBrief.trim(),
    });
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full bg-white overflow-hidden font-maersk-text select-none animate-in fade-in duration-200">
      {/* Background Graphic: Marine Vessel fading into white canvas on right (Matches 3_.png) */}
      <div className="absolute right-0 top-0 bottom-0 w-[46%] pointer-events-none hidden lg:block overflow-hidden">
        <img
          src="/src/assets/images/login_marine_vessel_1790488920644.jpg"
          alt="Maersk maritime vessel"
          className="w-full h-full object-cover object-left opacity-35"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-7 space-y-6">
        {/* Top Back Action (Matches 3_.png: "← Back") */}
        <button
          onClick={onCancel}
          className="text-xs font-semibold text-[#003E61] hover:text-[#1686BD] inline-flex items-center gap-1.5 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back</span>
        </button>

        {/* Screen Title Block (Matches 3_.png) */}
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold font-maersk-headline text-[#003E61] tracking-tight leading-tight">
            Create Customer Pitch
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#64748B] leading-relaxed max-w-2xl">
            Add the essential context. We’ll use available customer information and approved Maersk Training knowledge to prepare the pitch.
          </p>
        </div>

        {/* Form Body - Intentionally Minimal: Customer, Audience (opt), Pitch brief */}
        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          {/* Row 1: Customer (Req) & Audience (Opt) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* 1. Customer Autocomplete Input */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#003E61] mb-1.5">
                Customer <span className="text-[#EA5D4B]">*</span>
              </label>

              <div className="relative">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#94A3B8] pointer-events-none" />
                <input
                  type="text"
                  value={customerSearch}
                  onChange={(e) => {
                    setCustomerSearch(e.target.value);
                    if (selectedCustomer && e.target.value !== selectedCustomer.name) {
                      setSelectedCustomer(null);
                    }
                    setIsAutocompleteOpen(true);
                  }}
                  onFocus={() => setIsAutocompleteOpen(true)}
                  placeholder="Search for a customer by name..."
                  className={`w-full h-10 pl-10 pr-10 bg-white border text-xs sm:text-sm text-[#003E61] placeholder-[#94A3B8] rounded-lg transition-all focus:outline-none ${
                    isAutocompleteOpen
                      ? 'border-[#1686BD] ring-2 ring-[#1686BD]/20'
                      : selectedCustomer
                      ? 'border-[#1686BD] bg-white font-medium'
                      : 'border-[#CBD5E1] hover:border-[#94A3B8]'
                  }`}
                  required
                />

                {customerSearch ? (
                  <div className="absolute right-3 top-2.5 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handleClearCustomer}
                      className="text-[#94A3B8] hover:text-[#003E61] cursor-pointer p-0.5 rounded"
                      aria-label="Clear customer"
                      title="Clear customer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <ChevronDown
                      onClick={() => setIsAutocompleteOpen(!isAutocompleteOpen)}
                      className="w-4 h-4 text-[#94A3B8] cursor-pointer"
                    />
                  </div>
                ) : (
                  <ChevronDown
                    onClick={() => setIsAutocompleteOpen(!isAutocompleteOpen)}
                    className="absolute right-3 top-3 w-4 h-4 text-[#94A3B8] cursor-pointer"
                  />
                )}
              </div>

              {/* AUTOCOMPLETE OPEN STATE (Section 2 in 3_.png) */}
              {isAutocompleteOpen && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#CBD5E1] rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-[#F1F5F9] max-h-80 overflow-y-auto animate-in fade-in duration-150">
                  {filteredCustomers.map((cust) => (
                    <div
                      key={cust.id}
                      onClick={() => handleSelectCustomer(cust)}
                      className="p-3 hover:bg-[#F0F9FF] cursor-pointer flex items-center gap-3 transition-colors group"
                    >
                      {/* Maersk Star Icon inside sky-blue square */}
                      <MaerskLogo size="sm" symbolOnly />

                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-[#003E61] truncate font-maersk-headline group-hover:text-[#1686BD]">
                          {cust.name}
                        </h4>
                        <p className="text-[11px] text-[#64748B] mt-0.5 truncate">
                          {cust.industry}
                        </p>
                      </div>
                    </div>
                  ))}

                  {filteredCustomers.length === 0 && customerSearch.trim() && (
                    <div className="p-3.5 text-xs text-[#64748B] italic">
                      No matching CRM accounts found for "{customerSearch}".
                    </div>
                  )}

                  {/* LAST ITEM: + Add new customer (Section 2 in 3_.png) */}
                  <div
                    onClick={() => {
                      setIsAutocompleteOpen(false);
                      setIsAddCustomerModalOpen(true);
                    }}
                    className="p-3 bg-[#F8FAFC] hover:bg-[#E2F3FB] cursor-pointer transition-colors flex items-center gap-3"
                  >
                    <div className="w-7 h-7 rounded-full border border-[#1686BD] bg-white flex items-center justify-center shrink-0 shadow-2xs">
                      <Plus className="w-4 h-4 text-[#1686BD]" />
                    </div>
                    <div>
                      <span className="block text-xs sm:text-sm text-[#1686BD] font-bold">
                        Add new customer
                      </span>
                      <span className="block text-[11px] text-[#64748B] font-normal">
                        Can’t find the customer? Add manually
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* AUTOCOMPLETE CLOSED / SELECTED CONFIRMATION ROW UNDERNEATH */}
              {selectedCustomer && !isAutocompleteOpen && (
                <div className="mt-2 p-2.5 bg-[#F0F9FD] border border-[#BAE6FD] rounded-lg flex items-center justify-between text-xs text-[#003E61] animate-in fade-in duration-150 shadow-2xs">
                  <div className="flex items-center gap-2 truncate">
                    <CheckCircle2 className="w-4 h-4 text-[#1686BD] shrink-0" />
                    <span className="font-semibold truncate">{selectedCustomer.name}</span>
                    <span className="text-[#94A3B8]">·</span>
                    <span className="text-[#64748B]">{selectedCustomer.industry}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearCustomer}
                    className="text-[#64748B] hover:text-[#EA5D4B] text-[11px] font-semibold shrink-0 ml-2 cursor-pointer"
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            {/* 2. Audience Field (Optional Text Input) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#003E61] mb-1.5">
                Audience <span className="text-[#64748B] font-normal normal-case">(optional)</span>
              </label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Head of Operations, Training Manager"
                className="w-full h-10 px-3.5 bg-white border border-[#CBD5E1] rounded-lg text-xs sm:text-sm text-[#003E61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD] transition-all"
              />
            </div>
          </div>

          {/* Row 2: Pitch brief (Required Textarea with Info Callout) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#003E61]">
                  Pitch brief <span className="text-[#EA5D4B]">*</span>
                </label>
                <div className="group relative flex items-center">
                  <Info className="w-3.5 h-3.5 text-[#1686BD] cursor-pointer" />
                  <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block z-50 w-72 p-2.5 bg-[#003E61] text-white text-[11px] rounded-lg shadow-xl leading-relaxed pointer-events-none">
                    Provide context on the customer situation, known challenges, desired outcomes, and training solutions discussed to guide the AI in generating a tailored pitch.
                  </div>
                </div>
              </div>
            </div>

            {/* Persistent Info Message under label */}
            <p className="text-xs text-[#64748B] mb-2 leading-relaxed">
              Tell us what this pitch is about. Include any useful customer context, known need or challenge, what you want to achieve, and anything already discussed.
            </p>

            {/* Large compact textarea (Matches 3_.png) */}
            <textarea
              rows={6}
              value={pitchBrief}
              onChange={(e) => setPitchBrief(e.target.value.slice(0, 2000))}
              placeholder="Tell us what this pitch is about. Include any useful customer context, known need or challenge, what you want to achieve, and anything already discussed."
              className="w-full p-3.5 bg-white border border-[#CBD5E1] rounded-xl text-xs sm:text-sm text-[#003E61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD] transition-all resize-y leading-relaxed"
              required
            />

            {/* Bottom metadata row: character count on right */}
            <div className="mt-2 flex justify-end">
              <span className="text-xs text-[#64748B] font-mono tabular-nums text-right shrink-0">
                {pitchBrief.length}/2000
              </span>
            </div>
          </div>

          {/* Bottom Actions Row (Matches 3_.png: Cancel on left, Create Pitch on right) */}
          <div className="pt-4 flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={!customerSearch.trim() || !pitchBrief.trim()}
            >
              Create Pitch
            </Button>
          </div>
        </form>
      </div>

      {/* ADD NEW CUSTOMER MODAL (Section 3 in 3_.png) */}
      {isAddCustomerModalOpen && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsAddCustomerModalOpen(false);
            }
          }}
          className="fixed inset-0 z-50 bg-[#003E61]/45 backdrop-blur-xs flex items-center justify-center p-4 cursor-default animate-in fade-in duration-150"
        >
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#CBD5E1] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#F1F5F9] flex items-start justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold font-maersk-headline text-[#003E61] tracking-tight">
                  Add new customer
                </h3>
                <p className="text-xs text-[#64748B] mt-1 leading-normal">
                  Enter basic details for the customer. This will be used to prepare the pitch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddCustomerModalOpen(false)}
                className="text-[#94A3B8] hover:text-[#003E61] p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form: ONLY Customer name and Customer details */}
            <form onSubmit={handleCreateCustomerSubmit} className="p-6 space-y-4">
              {addCustomerError && (
                <div className="p-2.5 bg-red-50 text-red-700 text-xs rounded-lg border border-red-200">
                  {addCustomerError}
                </div>
              )}

              {/* 1. Customer Name (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#003E61] mb-1.5">
                  Customer name <span className="text-[#EA5D4B]">*</span>
                </label>
                <input
                  type="text"
                  autoFocus
                  value={newCustName}
                  onChange={(e) => setNewCustName(e.target.value)}
                  placeholder="e.g. Adamas Wind"
                  className="w-full h-10 px-3 bg-white border border-[#CBD5E1] rounded-lg text-xs sm:text-sm text-[#003E61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD]"
                  required
                />
              </div>

              {/* 2. Customer Details (Required) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#003E61] mb-1.5">
                  Customer details <span className="text-[#EA5D4B]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={newCustDetails}
                  onChange={(e) => setNewCustDetails(e.target.value.slice(0, 1000))}
                  placeholder="Add known company details such as industry, location, business context, website or any other relevant information."
                  className="w-full p-3 bg-white border border-[#CBD5E1] rounded-lg text-xs sm:text-sm text-[#003E61] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#1686BD] focus:border-[#1686BD] leading-relaxed resize-none"
                  required
                />
                <div className="mt-1 flex justify-end">
                  <span className="text-[11px] text-[#94A3B8] font-mono tabular-nums">
                    {newCustDetails.length}/1000
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsAddCustomerModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                >
                  Add customer
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
