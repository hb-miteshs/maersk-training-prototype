import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, ExternalLink } from 'lucide-react';
import { AppNotification } from '../data/mockData';

interface GlobalHeaderProps {
  notifications: AppNotification[];
  onOpenDeck: (deckId: string) => void;
  onMarkAllAsRead: () => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  notifications,
  onOpenDeck,
  onMarkAllAsRead,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-16 border-b border-[#E2E8F0] bg-white px-6 sm:px-8 flex items-center justify-between shrink-0">
      {/* Left: Organization context marker */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
          Maersk Training Commercial Workspace
        </span>
      </div>

      {/* Right: Notification Bell & Profile quick trigger */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="View notifications"
          className="relative p-2 rounded-full text-[#003E61] hover:bg-[#F1F5F9] transition-colors focus:outline-none focus:ring-2 focus:ring-[#1686BD]"
        >
          <Bell className="w-5 h-5 text-[#003E61]" />

          {/* Unread Red Notification Badge (Coral #EA5D4B) */}
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-[#EA5D4B] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-sm animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Notifications Dropdown Panel */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-[#CBD5E1] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="p-3.5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#003E61]">
                  Notifications
                </h4>
                <p className="text-[11px] text-[#64748B]">
                  Presentation readiness alerts
                </p>
              </div>
              {unreadCount > 0 && (
                <button
                  onClick={onMarkAllAsRead}
                  className="text-[11px] font-medium text-[#1686BD] hover:text-[#003E61] flex items-center gap-1"
                >
                  <Check className="w-3 h-3" />
                  Mark all read
                </button>
              )}
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-[#F1F5F9]">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-xs text-[#94A3B8]">
                  No notifications
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    onClick={() => {
                      setIsOpen(false);
                      onOpenDeck(notif.deckId);
                    }}
                    className={`p-3.5 hover:bg-[#F8FAFC] transition-colors cursor-pointer flex items-start gap-3 ${
                      !notif.isRead ? 'bg-[#F0F9FF]/60' : ''
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        !notif.isRead ? 'bg-[#EA5D4B]' : 'bg-transparent'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-bold text-[#003E61] truncate">
                          {notif.title}
                        </p>
                        <span className="text-[10px] text-[#94A3B8] shrink-0 font-mono">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-[#475569] mt-0.5 leading-snug">
                        {notif.message}
                      </p>
                      <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-[#1686BD]">
                        <span>Open presentation</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
