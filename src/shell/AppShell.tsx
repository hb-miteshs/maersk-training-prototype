import React from 'react';
import { Sidebar, NavTab, UserProfile } from './Sidebar';
import { Header, HeaderNotification } from './Header';

export interface AppShellProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isSidebarCollapsed: boolean;
  onToggleSidebarCollapse: () => void;
  notifications: HeaderNotification[];
  onOpenNotification?: (notif: HeaderNotification) => void;
  onMarkAllAsRead?: () => void;
  user?: UserProfile;
  onLogout?: () => void;
  hideHeader?: boolean; // Useful for full-bleed presentation review mode
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  isSidebarCollapsed,
  onToggleSidebarCollapse,
  notifications,
  onOpenNotification,
  onMarkAllAsRead,
  user,
  onLogout,
  hideHeader = false,
  children,
}) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFC]">
      {/* Shared Collapsible Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={onToggleSidebarCollapse}
        user={user}
        onLogout={onLogout}
      />

      {/* Main Viewport Container */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Shared Global Header */}
        {!hideHeader && (
          <Header
            notifications={notifications}
            onOpenNotification={onOpenNotification}
            onMarkAllAsRead={onMarkAllAsRead}
          />
        )}

        {/* Dynamic Content Scroll Area */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
