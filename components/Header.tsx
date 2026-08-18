import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants'; 
import { useTheme } from '../contexts/ThemeContext';
import { NotificationDropdown } from "./NotificationDropdown";

// --- Icons ---
const ArrowRightOnRectangleIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" /></svg>
);


export const BellIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0"
    />
  </svg>
);

const HamburgerIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);
const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
);
const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
);

const ThemeSwitch: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    
    return (
        <button
            onClick={toggleTheme}
            className="theme-glass-switch"
            aria-label="Toggle theme"
            type="button"
        >
            <span className={`theme-switch-track ${isDark ? 'is-dark' : 'is-light'}`}>
                <span className="theme-switch-icon left">
                    <SunIcon className={`w-3.5 h-3.5 ${isDark ? 'opacity-40' : 'opacity-100'}`} />
                </span>

                <span className={`theme-switch-thumb ${isDark ? 'dark' : 'light'}`}>
                    {isDark ? (
                        <MoonIcon className="w-3.5 h-3.5 text-sky-300" />
                    ) : (
                        <SunIcon className="w-3.5 h-3.5 text-yellow-500" />
                    )}
                </span>

                <span className="theme-switch-icon right">
                    <MoonIcon className={`w-3.5 h-3.5 ${isDark ? 'opacity-100' : 'opacity-35'}`} />
                </span>
            </span>
        </button>
    );
};

const ThemeIconButton: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';
    
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--component-background-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-neutral-500/60"
            aria-label="Toggle theme"
        >
            {isDark ? 
                <MoonIcon className="w-5 h-5 text-sky-400" /> : 
                <SunIcon className="w-5 h-5 text-yellow-500" />
            }
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

  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
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
  setIsMenuAnimating(true);
  setTimeout(() => setIsMenuAnimating(false), 300);

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

  // Desktop Nav Links
  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Marketplace', path: '/blueprint' },
    { name: 'Builder Stories', path: '/builders' },
{ name: 'Starverse', path: '/globe' },
  ];

  // Mobile Menu Links (Dropdown)
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
  
  const commonIconButtonClasses = "relative p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--component-background-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-neutral-500/60";

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-40
          w-full
          min-h-[54px]
          sm:min-h-[58px]
          overflow-visible
          backdrop-blur-[30px]
          backdrop-saturate-[190%]
          bg-white/72
          dark:bg-neutral-900/72
          border-0
          outline-none
          shadow-[0_5px_24px_rgba(30,40,80,0.055)]
        "
      >
        <div
          className="
            absolute
            inset-0
            pointer-events-none
            bg-gradient-to-b
            from-[#f3f3f5]/78
            via-white/58
            to-white/42
            dark:from-neutral-900/78
            dark:via-neutral-900/58
            dark:to-neutral-900/42
          "
        />

        <div
          className="
            absolute
            left-[5%]
            right-[5%]
            top-0
            h-px
            bg-white/85
            dark:bg-white/15
            pointer-events-none
          "
        />

        <div className="relative z-10 w-full flex items-center justify-between px-2 sm:px-4 py-[6.5px] sm:py-[7px]">
          <div className="flex items-center space-x-8">
            <Link to={currentUser ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center space-x-2 focus:outline-none ml-0">
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
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="text-sm font-bold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
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
            <BellIcon className="w-6 h-6" />
          </div>

          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[9px] font-semibold min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>

        {showNotifications && (
          <NotificationDropdown
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>

      {/* ☰ Hamburger Menu */}
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

            {/* Theme Switch */}
            <div className="border-t border-[var(--border-primary)] px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/45 dark:bg-white/10 backdrop-blur-xl border border-white/70 dark:border-white/15 flex items-center justify-center shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]">
                    <SunIcon className="w-4 h-4 text-yellow-500 dark:hidden" />
                    <MoonIcon className="w-4 h-4 text-sky-400 hidden dark:block" />
                  </div>

                  <span className="text-sm font-semibold text-[var(--text-secondary)]">
                    Appearance
                  </span>
                </div>

                <ThemeSwitch />
              </div>
            </div>

            {/* Logout */}
            <div className="border-t border-[var(--border-primary)]">
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center space-x-2 px-4 py-3 text-sm text-[var(--accent-danger-text)] hover:bg-[var(--accent-danger-background)]"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex items-center space-x-2">
      {location.pathname !== '/' && <ThemeIconButton />}

      <button
        onClick={() => navigate('/signup')}
        className="
          button-gradient
          text-white
          font-semibold
          rounded-full
          py-[4px]
          px-[10px]
          text-[8px]
          sm:text-[8.5px]
          transition-transform
          duration-300
          hover:scale-[1.03]
          active:scale-[0.97]
        "
      >
        Join Now
      </button>
    </div>
  )}
</div>
        </div>
      </header>

      <style>{`
        .theme-glass-switch {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .theme-switch-track {
          position: relative;
          width: 58px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3px;
          border-radius: 999px;
          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.82),
              rgba(225,227,232,0.58)
            );

          border: 1px solid rgba(255,255,255,0.9);

          -webkit-backdrop-filter: blur(22px) saturate(180%);
          backdrop-filter: blur(22px) saturate(180%);

          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.95),
            inset 0 -1px 1px rgba(80,90,110,0.08),
            0 3px 10px rgba(30,40,70,0.10);

          transition:
            background 0.3s ease,
            box-shadow 0.3s ease;
        }

        .theme-switch-track.is-dark {
          background:
            linear-gradient(
              135deg,
              rgba(45,48,58,0.82),
              rgba(25,27,34,0.72)
            );

          border-color: rgba(255,255,255,0.14);

          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.12),
            inset 0 -1px 1px rgba(0,0,0,0.2),
            0 3px 10px rgba(0,0,0,0.20);
        }

        .theme-switch-icon {
          position: relative;
          z-index: 2;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #737780;
          transition: opacity 0.25s ease;
        }

        .theme-switch-track.is-dark .theme-switch-icon {
          color: #aeb5c1;
        }

        .theme-switch-thumb {
          position: absolute;
          z-index: 3;
          top: 3px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.98),
              rgba(245,246,249,0.82)
            );

          border: 1px solid rgba(255,255,255,0.95);

          -webkit-backdrop-filter: blur(16px);
          backdrop-filter: blur(16px);

          box-shadow:
            inset 0 1px 2px rgba(255,255,255,1),
            0 2px 7px rgba(30,40,70,0.16);

          transition:
            left 0.32s cubic-bezier(0.4, 0, 0.2, 1),
            background 0.3s ease;
        }

        .theme-switch-thumb.light {
          left: 3px;
        }

        .theme-switch-thumb.dark {
          left: 31px;

          background:
            linear-gradient(
              135deg,
              rgba(75,80,94,0.96),
              rgba(42,45,55,0.90)
            );

          border-color: rgba(255,255,255,0.18);

          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.16),
            0 2px 7px rgba(0,0,0,0.28);
        }

        .theme-glass-switch:hover .theme-switch-track {
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,1),
            inset 0 -1px 1px rgba(80,90,110,0.08),
            0 4px 13px rgba(30,40,70,0.14);
        }

        .theme-glass-switch:active .theme-switch-thumb {
          transform: scale(0.94);
        }

        @media (max-width: 639px) {
          .theme-switch-track {
            width: 56px;
            height: 29px;
          }

          .theme-switch-thumb {
            width: 23px;
            height: 23px;
          }

          .theme-switch-thumb.dark {
            left: 30px;
          }

          .theme-switch-icon {
            width: 23px;
            height: 23px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;