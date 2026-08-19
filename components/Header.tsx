import React, {
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants';
import { useTheme } from '../contexts/ThemeContext';
import { NotificationDropdown } from './NotificationDropdown';

import {
  LogOut,
  Bell,
  Menu,
  Sun,
  Moon,
} from 'lucide-react';

const ThemeIconButton: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2
        rounded-full
        text-[var(--text-muted)]
        hover:text-[var(--text-primary)]
        hover:bg-[var(--component-background-hover)]
        transition-all
        duration-300
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-neutral-500/60
      "
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="w-5 h-5 text-sky-400" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-500" />
      )}
    </button>
  );
};

const Header: React.FC = () => {
  const {
    currentUser,
    logout,
    appNotifications,
    markAllNotificationsAsRead,
  } = useAppContext();

  const rawUnreadCount = Array.isArray(
    appNotifications
  )
    ? appNotifications.filter(
        (n: any) => !n.isRead
      ).length
    : 0;

  const unreadCount = rawUnreadCount;

  const navigate = useNavigate();
  const location = useLocation();

  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState(false);

  const profileDropdownRef =
    useRef<HTMLDivElement>(null);

  const bellRef =
    useRef<HTMLDivElement>(null);

  const [showNotifications, setShowNotifications] =
    useState(false);

  const [shake, setShake] =
    useState(false);

  const [isScrolled, setIsScrolled] =
    useState(false);

  const prevCountRef =
    useRef<number | null>(null);

  /* ================= SCROLL GLASS ================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);

  /* ================= NOTIFICATION SOUND ================= */

  useEffect(() => {
    if (prevCountRef.current === null) {
      prevCountRef.current =
        rawUnreadCount;
      return;
    }

    if (
      rawUnreadCount >
      prevCountRef.current
    ) {
      const audio =
        new Audio('/notification.mp3');

      audio.volume = 0.6;

      audio.play().catch(() => {});

      setShake(true);

      const timer = window.setTimeout(
        () => setShake(false),
        600
      );

      return () =>
        window.clearTimeout(timer);
    }

    prevCountRef.current =
      rawUnreadCount;
  }, [rawUnreadCount]);

  /* ================= PROFILE OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener(
      'click',
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        'click',
        handleClickOutside
      );
  }, []);

  /* ================= BELL OUTSIDE CLICK ================= */

  useEffect(() => {
    const handleClickOutsideBell = (
      event: MouseEvent
    ) => {
      if (
        bellRef.current &&
        !bellRef.current.contains(
          event.target as Node
        )
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutsideBell
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutsideBell
      );
  }, []);

  /* ================= ROUTE CHANGE ================= */

  useEffect(() => {
    setProfileDropdownOpen(false);
  }, [location.pathname]);

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    navigate('/login');
  };

  /* ================= MENU ================= */

  const handleMenuClick = () => {
    setShowNotifications(false);

    setProfileDropdownOpen(
      (prev) => !prev
    );
  };

  /* ================= NOTIFICATIONS ================= */

  const handleBellClick = async () => {
    const nextState =
      !showNotifications;

    setShowNotifications(nextState);

    if (nextState) {
      try {
        await fetch(
          '/api/notifications/read-all',
          {
            method: 'PATCH',
            headers: {
              Authorization: `Bearer ${localStorage.getItem(
                'authToken'
              )}`,
            },
          }
        );

        markAllNotificationsAsRead();
      } catch (err) {
        console.log(
          'Read-all failed'
        );
      }
    }
  };

  /* ================= DESKTOP NAV ================= */

  const navLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Marketplace',
      path: '/blueprint',
    },
    {
      name: 'Builder Stories',
      path: '/builders',
    },
    {
      name: 'Starverse',
      path: '/globe',
    },
  ];

  /* ================= MOBILE MENU ================= */

  const mobileMenuLinks = [
    {
      name: 'Dashboard',
      path: '/dashboard',
    },
    {
      name: 'Discover Projects',
      path: '/projects',
    },
    {
      name: 'Builders Stories',
      path: '/builders',
    },
    {
      name: 'Marketplace',
      path: '/blueprint',
    },
    {
      name: 'Startalks',
      path: '/startalks',
    },
    {
      name: 'Messenger',
      path: '/messages',
    },
    {
      name: 'Starverse',
      path: '/globe',
    },
  ];

  /* ================= INITIALS ================= */

  const getInitials = (
    name?: string
  ): string => {
    if (
      !name ||
      name.trim() === ''
    ) {
      return 'U';
    }

    const parts =
      name.match(/\b\w/g) || [];

    return (
      parts
        .map((part) =>
          part.toUpperCase()
        )
        .join('') || 'U'
    ).substring(0, 2);
  };

  const commonIconButtonClasses = `
    relative
    p-2
    rounded-full
    text-[var(--text-muted)]
    hover:text-[var(--text-primary)]
    hover:bg-[var(--component-background-hover)]
    transition-all
    duration-300
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-neutral-500/60
  `;

  return (
    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-40
        w-full
        transition-all
        duration-500
        ease-[cubic-bezier(0.16,1,0.3,1)]
        ${
          isScrolled
            ? `
              px-2
              sm:px-4
              pt-2
            `
            : `
              px-0
              pt-0
            `
        }
      `}
    >
      <div
        className={`
          w-full
          flex
          items-center
          justify-between
          px-2
          sm:px-4
          py-2
          transition-all
          duration-500
          ease-[cubic-bezier(0.16,1,0.3,1)]

          ${
            isScrolled
              ? `
                rounded-[20px]
                border
                border-black/[0.06]
                dark:border-white/[0.10]

                bg-white/[0.58]
                dark:bg-black/[0.52]

                backdrop-blur-[28px]
                backdrop-saturate-[180%]

                shadow-[0_8px_32px_rgba(20,30,60,0.08),inset_0_1px_0_rgba(255,255,255,0.75)]
                dark:shadow-[0_8px_32px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.08)]
              `
              : `
                bg-transparent
                border-transparent
                shadow-none
                backdrop-blur-0
              `
          }
        `}
      >
        {/* ================= LEFT ================= */}

        <div className="flex items-center space-x-8">

          <Link
            to={
              currentUser
                ? '/dashboard'
                : '/'
            }
            className="
              flex-shrink-0
              flex
              items-center
              space-x-2
              focus:outline-none
              ml-0
            "
          >
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
              alt="Startives Logo"
              className="
                h-9
                transition-transform
                duration-300
                hover:scale-[1.03]
              "
            />

            <span
              className="
                font-startives-brand
                tracking-tighter
                gradient-text
                bg-gradient-to-r
                from-red-500
                to-blue-500
                text-2xl
              "
            >
              {APP_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="
                  text-sm
                  font-bold
                  text-[var(--text-secondary)]
                  hover:text-[var(--text-primary)]
                  transition-colors
                  duration-300
                "
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* ================= RIGHT ================= */}

        <div className="flex items-center gap-1">

          {currentUser ? (
            <>
              {/* THEME */}

              <ThemeIconButton />

              {/* NOTIFICATIONS */}

              <div
                ref={bellRef}
                className="relative"
              >
                <button
                  onClick={
                    handleBellClick
                  }
                  aria-label="Notifications"
                  className="
                    relative
                    p-2
                    rounded-full
                    text-[var(--text-muted)]
                    hover:text-[var(--text-primary)]
                    hover:bg-[var(--component-background-hover)]
                    transition-all
                    duration-300
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-neutral-500/60
                  "
                >
                  <div
                    className={
                      shake
                        ? 'shake'
                        : ''
                    }
                  >
                    <Bell className="w-6 h-6" />
                  </div>

                  {unreadCount > 0 && (
                    <span
                      className="
                        absolute
                        -top-0.5
                        -right-0.5
                        bg-red-500
                        text-white
                        text-[9px]
                        font-semibold
                        min-w-[16px]
                        h-4
                        px-1
                        flex
                        items-center
                        justify-center
                        rounded-full
                        shadow-sm
                      "
                    >
                      {unreadCount}
                    </span>
                  )}
                </button>

                {showNotifications && (
                  <NotificationDropdown
                    onClose={() =>
                      setShowNotifications(
                        false
                      )
                    }
                  />
                )}
              </div>

              {/* PROFILE / MENU */}

              <div
                ref={profileDropdownRef}
                className="relative"
              >
                <button
                  onClick={
                    handleMenuClick
                  }
                  className={
                    commonIconButtonClasses
                  }
                  aria-label="Open menu"
                >
                  {currentUser?.profilePictureUrl ? (
                    <img
                      src={
                        currentUser.profilePictureUrl
                      }
                      alt={
                        currentUser.name
                      }
                      className="
                        w-8
                        h-8
                        rounded-full
                        object-cover
                        border
                        border-[var(--border-primary)]
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-gradient-to-r
                        from-red-500
                        to-blue-500
                        flex
                        items-center
                        justify-center
                        text-white
                        text-xs
                        font-bold
                      "
                    >
                      {getInitials(
                        currentUser.name
                      )}
                    </div>
                  )}
                </button>

                {/* DROPDOWN */}

                <div
                  className={`
                    origin-top-right
                    absolute
                    right-0
                    mt-3
                    w-64
                    rounded-[20px]

                    bg-white/[0.78]
                    dark:bg-black/[0.72]

                    backdrop-blur-[30px]
                    backdrop-saturate-[180%]

                    border
                    border-black/[0.06]
                    dark:border-white/[0.12]

                    shadow-[0_20px_60px_rgba(20,30,60,0.14),inset_0_1px_0_rgba(255,255,255,0.8)]
                    dark:shadow-[0_20px_60px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)]

                    transition-all
                    duration-200

                    ${
                      profileDropdownOpen
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
                    }
                  `}
                >
                  <div className="py-1">

                    {/* PROFILE */}

                    <Link
                      to="/profile"
                      className="
                        block
                        px-4
                        py-3
                        border-b
                        border-[var(--border-primary)]
                        hover:bg-black/[0.04]
                        dark:hover:bg-white/[0.05]
                        transition-colors
                      "
                    >
                      <div className="flex items-center space-x-3">

                        <div
                          className="
                            w-10
                            h-10
                            rounded-full
                            icon-bg-gradient
                            flex
                            items-center
                            justify-center
                            text-white
                            font-semibold
                            text-sm
                            ring-2
                            ring-white/20
                            overflow-hidden
                          "
                        >
                          {currentUser.profilePictureUrl ? (
                            <img
                              src={
                                currentUser.profilePictureUrl
                              }
                              alt={
                                currentUser.name
                              }
                              className="
                                w-full
                                h-full
                                object-cover
                                rounded-full
                              "
                            />
                          ) : (
                            getInitials(
                              currentUser.name
                            )
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

                    {/* MENU LINKS */}

                    {mobileMenuLinks.map(
                      (link) => (
                        <Link
                          key={
                            link.name
                          }
                          to={
                            link.path
                          }
                          className="
                            block
                            px-4
                            py-2.5
                            text-sm
                            text-[var(--text-secondary)]
                            hover:bg-black/[0.04]
                            dark:hover:bg-white/[0.05]
                            hover:text-[var(--text-primary)]
                            transition-colors
                          "
                        >
                          {link.name}
                        </Link>
                      )
                    )}

                    {/* LOGOUT */}

                    <div
                      className="
                        border-t
                        border-[var(--border-primary)]
                      "
                    >
                      <button
                        onClick={
                          handleLogout
                        }
                        className="
                          w-full
                          text-left
                          flex
                          items-center
                          space-x-2
                          px-4
                          py-3
                          text-sm
                          text-[var(--accent-danger-text)]
                          hover:bg-[var(--accent-danger-background)]
                          transition-colors
                        "
                      >
                        <LogOut className="w-5 h-5" />

                        <span>
                          Logout
                        </span>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">

              <ThemeIconButton />

              <button
                onClick={() =>
                  navigate('/signup')
                }
                className="
                  button-gradient
                  text-white
                  font-semibold
                  rounded-full
                  py-1.5
                  px-4
                  text-xs
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
  );
};

export default Header;