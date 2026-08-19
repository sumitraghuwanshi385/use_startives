import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { NotificationDropdown } from "./NotificationDropdown";
import { Bell, LogOut, Sun, Moon } from 'lucide-react';


const LiquidGlassToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-[48px] h-[28px] rounded-full overflow-hidden
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent focus-visible:ring-neutral-400/50
        ${className}`}
      aria-label="Toggle theme"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(30,30,40,0.85) 0%, rgba(15,15,25,0.9) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(240,245,255,0.85) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        border: isDark
          ? '1px solid rgba(255,255,255,0.12)'
          : '1px solid rgba(255,255,255,0.6)',
        boxShadow: isDark
          ? 'inset 0 1px 1px rgba(255,255,255,0.08), 0 4px 12px rgba(0,0,0,0.35)'
          : 'inset 0 1px 1px rgba(255,255,255,0.9), 0 4px 14px rgba(0,0,0,0.08)',
      }}
    >
      {/* Liquid shine layer */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)'
            : 'linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
        }}
      />

      {/* Thumb */}
      <div
        className="absolute top-[3px] left-[3px] w-[22px] h-[22px] rounded-full
                   transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                   flex items-center justify-center"
        style={{
          transform: isDark ? 'translateX(20px)' : 'translateX(0)',
          background: isDark
            ? 'linear-gradient(145deg, #3b82f6, #1d4ed8)'
            : 'linear-gradient(145deg, #fbbf24, #f59e0b)',
          boxShadow: isDark
            ? '0 2px 8px rgba(59,130,246,0.55), inset 0 1px 1px rgba(255,255,255,0.35)'
            : '0 2px 8px rgba(251,191,36,0.5), inset 0 1px 1px rgba(255,255,255,0.7)',
        }}
      >
        {/* Subtle inner glass reflection */}
        <div
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(160deg, rgba(255,255,255,0.6) 0%, transparent 50%)',
          }}
        />

        {/* Icon */}
        {isDark ? (
          <Moon className="w-3 h-3 text-white relative z-10" strokeWidth={2.5} />
        ) : (
          <Sun className="w-3 h-3 text-white relative z-10" strokeWidth={2.5} />
        )}
      </div>
    </button>
  );
};


const Header: React.FC = () => {
  const { currentUser, logout, appNotifications, markAllNotificationsAsRead } = useAppContext();

  const rawUnreadCount = Array.isArray(appNotifications)
    ? appNotifications.filter((n: any) => !n.isRead).length
    : 0;
  const unreadCount = rawUnreadCount;

  const navigate = useNavigate();
  const location = useLocation();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const bellRef = useRef<HTMLDivElement>(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [shake, setShake] = useState(false);

  const prevCountRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current = rawUnreadCount;
      return;
    }

    if (rawUnreadCount > prevCountRef.current) {
      const audio = new Audio("/notification.mp3");
      audio.volume = 0.6;
      audio.play().catch(() => {});

      setShake(true);
      setTimeout(() => setShake(false), 600);
    }

    prevCountRef.current = rawUnreadCount;
  }, [rawUnreadCount]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutsideBell = (event: MouseEvent) => {
      if (
        bellRef.current &&
        !bellRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideBell);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideBell);
    };
  }, []);

  useEffect(() => {
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  const handleMenuClick = () => {
    setShowNotifications(false);
    setProfileDropdownOpen(prev => !prev);
  };

  const handleBellClick = async () => {
    const nextState = !showNotifications;
    setShowNotifications(nextState);

    if (nextState) {
      try {
        await fetch("/api/notifications/read-all", {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        markAllNotificationsAsRead();
      } catch (err) {
        console.log("Read-all failed");
      }
    }
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/blueprint' },
    { name: 'Builder Stories', path: '/builders' },
    { name: 'Starverse', path: '/globe' },
  ];

  const mobileMenuLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Discover Projects', path: '/projects' },
    { name: 'Builders Stories', path: '/builders' },
    { name: 'Marketplace', path: '/blueprint' },
    { name: 'Startalks', path: '/startalks' },
    { name: 'Messenger', path: '/messages' },
    { name: 'Starverse', path: '/globe' },
  ];

  const getInitials = (name?: string): string => {
    if (!name || name.trim() === '') return 'U';
    const parts = name.match(/\b\w/g) || [];
    return (parts.map(part => part.toUpperCase()).join('') || 'U').substring(0, 2);
  };

  const commonIconButtonClasses =
    "relative p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--component-background-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-neutral-500/60";

  return (
    <header
      className="sticky top-0 z-40 w-full transition-all duration-300
                 bg-[var(--background-primary)]/50 dark:bg-[var(--background-primary)]/40
                 backdrop-blur-2xl backdrop-saturate-150
                 shadow-[0_4px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="w-full flex items-center justify-between px-2 sm:px-4 py-2">
        <div className="flex items-center space-x-8">
          <Link
            to={currentUser ? "/dashboard" : "/"}
            className="flex-shrink-0 flex items-center space-x-2 focus:outline-none ml-0"
          >
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
              alt="Startives Logo"
              className="h-9"
            />
            <span className="font-startives-brand tracking-tighter gradient-text bg-gradient-to-r from-red-500 to-blue-500 text-2xl">
              {APP_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          {currentUser ? (
            <>
              {/* 🔔 Notification Bell */}
              <div ref={bellRef} className="relative">
                <button
                  onClick={handleBellClick}
                  className="relative p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--component-background-hover)] transition"
                >
                  <div className={shake ? "shake" : ""}>
                    <Bell className="w-6 h-6" />
                  </div>
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-semibold min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <NotificationDropdown onClose={() => setShowNotifications(false)} />
                )}
              </div>

              {/* Grey vertical divider */}
              <div className="w-px h-5 bg-neutral-400/40 dark:bg-neutral-500/40 mx-0.5" />

              {/* ☰ Profile / Menu */}
              <div ref={profileDropdownRef} className="relative">
                <button
                  onClick={handleMenuClick}
                  className={commonIconButtonClasses}
                  aria-label="Open menu"
                >
                  {currentUser?.profilePictureUrl ? (
                    <img
                      src={currentUser.profilePictureUrl}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover border border-[var(--border-primary)]"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-red-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                      {getInitials(currentUser.name)}
                    </div>
                  )}
                </button>

                {/* Dropdown */}
                <div
                  className={`origin-top-right absolute right-0 mt-3 w-64 rounded-xl bg-[var(--component-background)] border border-[var(--border-primary)] shadow-2xl transition duration-200 ${
                    profileDropdownOpen
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="py-1">
                    {/* Profile */}
                    <Link
                      to="/profile"
                      className="block px-4 py-3 border-b border-[var(--border-primary)] hover:bg-[var(--component-background-hover)]"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full icon-bg-gradient flex items-center justify-center text-white font-semibold text-sm ring-2 ring-white/20">
                          {currentUser.profilePictureUrl ? (
                            <img
                              src={currentUser.profilePictureUrl}
                              alt={currentUser.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          ) : (
                            getInitials(currentUser.name)
                          )}
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-semibold truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-xs text-[var(--text-muted)] truncate">
                            {currentUser.email}
                          </p>
                        </div>
                      </div>
                    </Link>

                    {/* Menu Links */}
                    {mobileMenuLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--component-background-hover)] hover:text-[var(--text-primary)]"
                      >
                        {link.name}
                      </Link>
                    ))}

                    {/* Appearance Toggle */}
                    <div className="border-t border-[var(--border-primary)] px-4 py-3 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm text-[var(--text-secondary)]">
                          Appearance
                        </p>
                        <p className="text-[10px] text-[var(--text-muted)] leading-tight mt-0.5">
                          Switch between light<br />
                          and dark mode
                        </p>
                      </div>
                      <LiquidGlassToggle />
                    </div>

                    {/* Logout */}
                    <div className="border-t border-[var(--border-primary)]">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center space-x-2 px-4 py-3 text-sm text-[var(--accent-danger-text)] hover:bg-[var(--accent-danger-background)]"
                      >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Landing / Guest header */
            <div className="flex items-center space-x-3">
              <LiquidGlassToggle />
              <button
                onClick={() => navigate('/signup')}
                className="button-gradient text-white font-semibold rounded-full py-1.5 px-4 text-xs"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;