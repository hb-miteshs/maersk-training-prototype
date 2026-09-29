import React, { useState } from 'react';
import { MaerskTrainingLogo } from './MaerskTrainingLogo';
import { LayoutDashboard, Layers, ChevronLeft, ChevronRight, LogOut, ChevronDown } from 'lucide-react';
import { USER_PROFILE } from '../data/mockData';

export type NavTab = 'dashboard' | 'all-decks';

interface NavigationSidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onLogout: () => void;
}

export const NavigationSidebar: React.FC<NavigationSidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  onLogout,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <aside
      className={`relative z-20 flex flex-col justify-between border-r border-[#E2E8F0] bg-white transition-all duration-300 ease-in-out shrink-0 select-none ${
        isCollapsed ? 'w-[68px]' : 'w-[220px]'
      }`}
    >
      {/* Top Section: Logo & Toggle */}
      <div>
        <div
          className={`h-16 flex items-center border-b border-[#F1F5F9] px-4 ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {isCollapsed ? (
            <div title="Maersk Training" className="cursor-pointer" onClick={() => onSelectTab('dashboard')}>
              <MaerskTrainingLogo size="sm" symbolOnly />
            </div>
          ) : (
            <div className="cursor-pointer" onClick={() => onSelectTab('dashboard')}>
              <MaerskTrainingLogo size="sm" />
            </div>
          )}

          {/* Collapse/Expand Toggle Button */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="p-1 rounded text-[#64748B] hover:text-[#003E61] hover:bg-[#F1F5F9] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed rail expander button at top */}
        {isCollapsed && (
          <div className="flex justify-center py-2 border-b border-[#F8FAFC]">
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="p-1 rounded text-[#64748B] hover:text-[#003E61] hover:bg-[#F1F5F9] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-2 space-y-1.5 mt-2">
          {/* Dashboard */}
          <button
            onClick={() => onSelectTab('dashboard')}
            title={isCollapsed ? 'Dashboard' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${
              currentTab === 'dashboard'
                ? 'bg-[#E2F3FB] text-[#003E61] font-semibold'
                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#003E61]'
            }`}
          >
            <LayoutDashboard
              className={`w-4 h-4 shrink-0 transition-colors ${
                currentTab === 'dashboard' ? 'text-[#1686BD]' : 'text-[#64748B] group-hover:text-[#003E61]'
              }`}
            />
            {!isCollapsed && <span>Dashboard</span>}

            {/* Hover Tooltip when collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2.5 py-1 bg-[#003E61] text-white text-xs rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                Dashboard
              </div>
            )}
          </button>

          {/* All Decks */}
          <button
            onClick={() => onSelectTab('all-decks')}
            title={isCollapsed ? 'All Decks' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors group relative ${
              currentTab === 'all-decks'
                ? 'bg-[#E2F3FB] text-[#003E61] font-semibold'
                : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#003E61]'
            }`}
          >
            <Layers
              className={`w-4 h-4 shrink-0 transition-colors ${
                currentTab === 'all-decks' ? 'text-[#1686BD]' : 'text-[#64748B] group-hover:text-[#003E61]'
              }`}
            />
            {!isCollapsed && <span>All Decks</span>}

            {/* Hover Tooltip when collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 px-2.5 py-1 bg-[#003E61] text-white text-xs rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                All Decks
              </div>
            )}
          </button>
        </nav>
      </div>

      {/* Bottom Section: User Profile & Compact Menu */}
      <div className="p-2 border-t border-[#F1F5F9] relative">
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          title={isCollapsed ? `${USER_PROFILE.name} (${USER_PROFILE.email})` : undefined}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={USER_PROFILE.avatar}
              alt={USER_PROFILE.name}
              className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#CBD5E1]"
              referrerPolicy="no-referrer"
            />
            {!isCollapsed && (
              <div className="min-w-0 text-left">
                <p className="text-xs font-semibold text-[#003E61] truncate leading-tight">
                  {USER_PROFILE.name}
                </p>
                <p className="text-[11px] text-[#64748B] truncate leading-tight">
                  {USER_PROFILE.email}
                </p>
              </div>
            )}
          </div>
          {!isCollapsed && <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />}
        </div>

        {/* Profile Popover Menu */}
        {showProfileMenu && (
          <div
            className={`absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-[#E2E8F0] p-1.5 z-50 ${
              isCollapsed ? 'left-14 w-48' : 'left-2 right-2'
            }`}
          >
            <div className="px-2.5 py-1.5 border-b border-[#F1F5F9] text-[11px] text-[#64748B]">
              Signed in via Microsoft Entra
            </div>
            <button
              onClick={() => {
                setShowProfileMenu(false);
                onLogout();
              }}
              className="w-full mt-1 flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#DC2626] hover:bg-[#FEF2F2] rounded transition-colors text-left font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign out</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
