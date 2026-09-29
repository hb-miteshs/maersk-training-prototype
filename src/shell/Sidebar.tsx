import React, { useState } from 'react';
import { MaerskLogo } from '../design-system/MaerskLogo';
import {
  LayoutDashboard,
  Layers,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
  User,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'all-decks';

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  avatar?: string;
}

export interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  user?: UserProfile;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isCollapsed,
  onToggleCollapse,
  user = {
    name: 'Søren Larsen',
    role: 'Commercial Director',
    email: 'soren.larsen@maersk.com',
  },
  onLogout,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <aside
      className={`relative z-20 flex flex-col justify-between border-r border-[#E2E8F0] bg-white transition-all duration-200 ease-in-out shrink-0 select-none ${
        isCollapsed ? 'w-[68px]' : 'w-[210px]'
      }`}
      aria-label="Main Navigation"
    >
      {/* Top Header: Logo + Toggle */}
      <div>
        <div
          className={`h-16 flex items-center border-b border-[#F1F5F9] px-3.5 ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
        >
          {isCollapsed ? (
            <div
              title="Maersk Training"
              className="cursor-pointer"
              onClick={() => onSelectTab('dashboard')}
            >
              <MaerskLogo size="sm" symbolOnly />
            </div>
          ) : (
            <div
              className="cursor-pointer"
              onClick={() => onSelectTab('dashboard')}
            >
              <MaerskLogo size="sm" />
            </div>
          )}

          {/* Collapse Button (when expanded) */}
          {!isCollapsed && (
            <button
              onClick={onToggleCollapse}
              title="Collapse sidebar"
              className="p-1 rounded-md text-[#64748B] hover:text-[#003E61] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Collapsed Rail Expander Button */}
        {isCollapsed && (
          <div className="flex justify-center py-2 border-b border-[#F8FAFC]">
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="p-1.5 rounded-md text-[#64748B] hover:text-[#003E61] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Minimal Navigation: ONLY Dashboard and All Decks */}
        <nav className="p-2 space-y-1 mt-2">
          {/* Item 1: Dashboard */}
          <div className="relative group">
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-[#E2F3FB] text-[#003E61] font-semibold'
                  : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#003E61]'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <LayoutDashboard
                className={`w-4 h-4 shrink-0 transition-colors ${
                  currentTab === 'dashboard'
                    ? 'text-[#1686BD]'
                    : 'text-[#64748B] group-hover:text-[#003E61]'
                }`}
              />
              {!isCollapsed && <span>Dashboard</span>}
            </button>

            {/* Tooltip on Hover when Collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#003E61] text-white text-xs rounded-md shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap font-medium">
                Dashboard
              </div>
            )}
          </div>

          {/* Item 2: All Decks */}
          <div className="relative group">
            <button
              onClick={() => onSelectTab('all-decks')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                currentTab === 'all-decks'
                  ? 'bg-[#E2F3FB] text-[#003E61] font-semibold'
                  : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#003E61]'
              } ${isCollapsed ? 'justify-center px-0' : ''}`}
            >
              <Layers
                className={`w-4 h-4 shrink-0 transition-colors ${
                  currentTab === 'all-decks'
                    ? 'text-[#1686BD]'
                    : 'text-[#64748B] group-hover:text-[#003E61]'
                }`}
              />
              {!isCollapsed && <span>All Decks</span>}
            </button>

            {/* Tooltip on Hover when Collapsed */}
            {isCollapsed && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-[#003E61] text-white text-xs rounded-md shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap font-medium">
                All Decks
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Bottom Profile Section */}
      <div className="p-2 border-t border-[#F1F5F9] relative">
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className={`flex items-center gap-2.5 p-2 rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors ${
            isCollapsed ? 'justify-center' : 'justify-between'
          }`}
          title={isCollapsed ? `${user.name} (${user.email})` : undefined}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover shrink-0 border border-[#CBD5E1]"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#E2F3FB] text-[#003E61] flex items-center justify-center font-bold text-xs shrink-0 border border-[#BAE6FD]">
                {user.name.charAt(0)}
              </div>
            )}

            {!isCollapsed && (
              <div className="min-w-0 text-left">
                <p className="text-xs font-bold text-[#003E61] truncate leading-tight font-maersk-headline">
                  {user.name}
                </p>
                <p className="text-[11px] text-[#64748B] truncate leading-tight">
                  {user.email}
                </p>
              </div>
            )}
          </div>

          {!isCollapsed && (
            <ChevronDown className="w-3.5 h-3.5 text-[#94A3B8] shrink-0" />
          )}
        </div>

        {/* Profile Popover Menu */}
        {showProfileMenu && (
          <div
            className={`absolute bottom-full mb-2 bg-white rounded-lg shadow-lg border border-[#E2E8F0] p-1.5 z-50 ${
              isCollapsed ? 'left-14 w-48' : 'left-2 right-2'
            }`}
          >
            <div className="px-2.5 py-1.5 border-b border-[#F1F5F9] text-[11px] text-[#64748B]">
              <p className="font-semibold text-[#003E61]">{user.role}</p>
              <p className="text-[10px] text-[#94A3B8]">Microsoft Entra ID</p>
            </div>
            {onLogout && (
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full mt-1 flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#EA5D4B] hover:bg-[#FEF2F2] rounded transition-colors text-left font-medium cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign out</span>
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
