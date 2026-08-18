import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants'; 
import { useTheme } from '../contexts/ThemeContext';
import { NotificationDropdown } from "./NotificationDropdown";
import {
  LogOut,
  Bell,
  Sun,
  Moon,
  ArrowRight,
} from 'lucide-react';

// --- Icons ---
export const BellIcon: React.FC<{ className?: string }> = ({
  className = "w-6 h-6",
}) => (
  <Bell className={className} />
);

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
                <Moon className="w-5 h-5 text-sky-400" /> : 
                <Sun className="w-5 h-5 text-yellow-500" />
            }
        </button>
    );
};

const ThemeSwitch: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            type="button"
            aria-label="Toggle theme"
            className="theme-glass-switch"
        >
            <span className={`theme-switch-track ${isDark ? 'is-dark' : 'is-light'}`}>
                <span className="theme-switch-icon left">
                    <Sun
                        className={`w-3.5 h-3.5 ${
                            isDark ? 'opacity-35' : 'opacity-100'
                        }`}
                    />
                </span>

                <span className={`theme-switch-thumb ${isDark ? 'dark' : 'light'}`}>
                    {isDark ? (
                        <Moon className="w-3.5 h-3.5 text-sky-300" />
                    ) : (
                        <Sun className="w-3.5 h-3.5 text-yellow-500" />
                    )}
                </span>

                <span className="theme-switch-icon right">
                    <Moon
                        className={`w-3.5 h-3.5 ${
                            isDark ? 'opacity-100' : 'opacity-35'
                        }`}
                    />
                </span>
            </span>
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

  const [isScrolled, setIsScrolled] = useState(false);

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const bellRef = useRef<HTMLDivElement>(null);

  const [isMenuAnimating, setIsMenuAnimating] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [shake, setShake] = useState(false);

  const prevCountRef = useRef<number | null>(null);

  // -------------------------------------------------------
  // SCROLL STATE
  // Landing page = glass always
  // Logged in = transparent at top, glass after scrolling
  // -------------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  // Mobile Menu Links
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

    return (
      parts.map(part => part.toUpperCase()).join('') || 'U'
    ).substring(0, 2);
  };
  
  const commonIconButtonClasses =
    "relative p-2 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--component-background-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:ring-neutral-500/60";

  /*
   * IMPORTANT:
   *
   * Landing page:
   *   Always glass.
   *
   * Logged-in / other pages:
   *   Top = transparent.
   *   Scroll = glass.
   */
  const isLandingPage = location.pathname === '/' && !currentUser;

  const showGlassHeader = isLandingPage || isScrolled;

  return (
    <>
      <header
        className={`
          sticky
          top-0
          z-40
          w-full
          min-h-[57px]
          sm:min-h-[61px]
          overflow-visible
          border-0
          outline-none
          transition-all
          duration-500
          ease-out

          ${
            showGlassHeader
              ? `
                bg-white/72
                dark:bg-neutral-900/72
                backdrop-blur-[30px]
                backdrop-saturate-[200%]
                supports-[backdrop-filter]:bg-white/58
                dark:supports-[backdrop-filter]:bg-neutral-900/58
                shadow-[0_8px_30px_rgba(30,40,80,0.06)]
              `
              : `
                bg-transparent
                backdrop-blur-0
                backdrop-saturate-100
                shadow-none
              `
          }
        `}
      >

        {/* Glass Gradient */}
        <div
          className={`
            absolute
            inset-0
            pointer-events-none
            transition-opacity
            duration-500
            ease-out
            bg-gradient-to-b
            from-white/65
            via-white/25
            to-white/10
            dark:from-white/10
            dark:via-white/5
            dark:to-transparent

            ${
              showGlassHeader
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />

        {/* Top Glass Highlight */}
        <div
          className={`
            absolute
            left-[4%]
            right-[4%]
            top-0
            h-px
            pointer-events-none
            transition-opacity
            duration-500

            ${
              showGlassHeader
                ? "opacity-100 bg-white/80 dark:bg-white/15"
                : "opacity-0"
            }
          `}
        />

        <div className="relative z-10 w-full min-h-[57px] sm:min-h-[61px] flex items-center justify-between px-2 sm:px-4 py-2.5">

          {/* LEFT */}
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
              {navLinks.map(link => (
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

          {/* RIGHT */}
          <div className="flex items-center gap-1">

            {currentUser ? (
              <>
                {/* Notification */}
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

                {/* LOGGED-IN DIVIDER — RESTORED */}
                <div className="mx-1.5 h-6 w-px bg-neutral-300/70 dark:bg-neutral-700/70" />

                {/* PROFILE */}
                <div
                  ref={profileDropdownRef}
                  className="relative"
                >

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
                    className={`
                      origin-top-right
                      absolute
                      right-0
                      mt-3
                      w-64
                      rounded-xl
                      bg-[var(--component-background)]
                      border
                      border-[var(--border-primary)]
                      shadow-2xl
                      transition
                      duration-200

                      ${
                        profileDropdownOpen
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      }
                    `}
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

                      {/* Menu */}
                      {mobileMenuLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="block px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--component-background-hover)] hover:text-[var(--text-primary)]"
                        >
                          {link.name}
                        </Link>
                      ))}

                      {/* Theme */}
                      <div className="border-t border-[var(--border-primary)] px-4 py-2">

                        <div className="flex items-center justify-between">

                          <span className="text-sm text-[var(--text-secondary)]">
                            Appearance
                          </span>

                          <ThemeSwitch />

                        </div>

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

              /* LANDING / LOGGED OUT */
              <div className="flex items-center space-x-1.5">

                {location.pathname !== '/' && (
                  <ThemeIconButton />
                )}

                {/* NO DIVIDER ON LANDING PAGE */}

                <button
                  onClick={() => navigate('/signup')}
                  className="
                    liquid-glass-cta
                    group
                    relative
                    inline-flex
                    items-center
                    justify-center
                    gap-[1.62px]
                    rounded-full
                    px-[4.05px]
                    py-[3.24px]
                    pl-[9.72px]
                    sm:pl-[12.15px]
                    pr-[3.24px]
                    text-neutral-900
                    font-bold
                    text-[6.48px]
                    sm:text-[6.89px]
                    tracking-tight
                    select-none
                    overflow-hidden
                    transition-all
                    duration-300
                    hover:scale-[1.035]
                    active:scale-[0.97]
                    focus:outline-none
                    focus:ring-0
                    focus-visible:outline-none
                    focus-visible:ring-0
                  "
                >

                  <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 via-white/70 to-white/45 pointer-events-none" />

                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/20 via-purple-400/15 to-blue-500/25 pointer-events-none" />

                  <span className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-xl pointer-events-none" />

                  <span className="absolute left-[10%] right-[10%] top-0 h-px bg-white/95 rounded-full pointer-events-none" />

                  <span className="relative z-10 whitespace-nowrap">
                    Join Now
                  </span>

                  {/* Arrow Circle */}
                  <span
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      justify-center
                      w-[16.2px]
                      h-[16.2px]
                      sm:w-[17.82px]
                      sm:h-[17.82px]
                      rounded-full
                      overflow-hidden
                      border
                      border-white/85
                      bg-white/40
                      backdrop-blur-xl
                      shadow-[inset_0_1px_2px_rgba(255,255,255,0.98),0_3px_9px_rgba(20,30,60,0.12)]
                      transition-all
                      duration-300
                      group-hover:bg-white/55
                    "
                  >

                    <span
                      className="
                        absolute
                        inset-0
                        rounded-full
                        bg-gradient-to-br
                        from-red-500/55
                        via-purple-400/30
                        to-blue-500/60
                        opacity-80
                        blur-[0.5px]
                      "
                    />

                    <span className="absolute inset-[1px] rounded-full bg-white/20 backdrop-blur-md" />

                    <ArrowRight
                      className="
                        relative
                        z-10
                        w-[7.29px]
                        h-[7.29px]
                        sm:w-[8.1px]
                        sm:h-[8.1px]
                        text-neutral-900
                        transition-transform
                        duration-300
                        group-hover:translate-x-0.5
                      "
                    />

                  </span>

                </button>

              </div>
            )}

          </div>
        </div>
      </header>

      <style>{`

        /* =====================================================
           JOIN NOW — 10% SMALLER
        ===================================================== */

        .liquid-glass-cta {
          -webkit-backdrop-filter: blur(30px) saturate(200%);
          backdrop-filter: blur(30px) saturate(200%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.82),
              rgba(255, 255, 255, 0.58)
            );

          border: 1px solid rgba(255, 255, 255, 0.92);

          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.98),
            inset 0 -1px 1px rgba(120, 130, 160, 0.08),
            0 6px 20px rgba(30, 40, 80, 0.11);
        }

        .liquid-glass-cta::after {
          content: '';

          position: absolute;
          inset: 0;

          border-radius: inherit;

          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.58),
              transparent 35%,
              transparent 65%,
              rgba(255, 255, 255, 0.30)
            );

          opacity: 0.8;

          pointer-events: none;
        }

        .liquid-glass-cta:hover {
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 -1px 1px rgba(100, 110, 150, 0.08),
            0 9px 25px rgba(30, 40, 80, 0.15);
        }

        .liquid-glass-cta:focus,
        .liquid-glass-cta:focus-visible,
        .liquid-glass-cta:active {
          outline: none !important;
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.98),
            inset 0 -1px 1px rgba(120, 130, 160, 0.08),
            0 6px 20px rgba(30, 40, 80, 0.11);
        }

        /* =====================================================
           THEME SWITCH
        ===================================================== */

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
          width: 64px;
          height: 33px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 3.5px;
          border-radius: 999px;
          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.84),
              rgba(225,227,232,0.60)
            );

          border: 1px solid rgba(255,255,255,0.92);

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
              rgba(45,48,58,0.84),
              rgba(25,27,34,0.74)
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
          width: 26px;
          height: 26px;
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
          top: 3.5px;
          width: 26px;
          height: 26px;
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
            background 0.3s ease,
            transform 0.15s ease;
        }

        .theme-switch-thumb.light {
          left: 3.5px;
        }

        .theme-switch-thumb.dark {
          left: 34.5px;

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

          .liquid-glass-cta {
            padding-top: 3.24px;
            padding-bottom: 3.24px;
            padding-left: 9.72px;
            padding-right: 3.24px;
            font-size: 6.48px;
          }

          .liquid-glass-cta span {
            -webkit-tap-highlight-color: transparent;
          }

          .theme-switch-track {
            width: 62px;
            height: 32px;
          }

          .theme-switch-thumb {
            width: 25px;
            height: 25px;
          }

          .theme-switch-thumb.dark {
            left: 33px;
          }

          .theme-switch-icon {
            width: 25px;
            height: 25px;
          }
        }

      `}</style>
    </>
  );
};

export default Header;