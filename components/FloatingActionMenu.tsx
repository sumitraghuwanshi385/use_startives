import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<any>(null);

  const path = location.pathname;

  // ✅ PAGE DETECTION
  const isProjectsPage = path === "/projects";
  const isAssetsPage = path === "/blueprint";

  const isPostPage =
    path === "/post-idea" || path === "/submit-asset";

  // ✅ SCROLL DETECTION (IMPROVED)
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        setIsScrolling(true);
        ticking = true;
      }

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
        ticking = false;
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ❌ CONDITIONS AFTER HOOK
  if (isPostPage) return null;
  if (!isProjectsPage && !isAssetsPage) return null;

  // ✅ dynamic
  const label = isAssetsPage ? "List Your Asset" : "Post Your Idea";
  const route = isAssetsPage ? "/submit-asset" : "/post-idea";

  return (
    <div className="fixed bottom-20 right-4 z-[999]">

      <button
        onClick={() => navigate(route)}
        className={`
          flex items-center justify-center
          rounded-full
          transition-all duration-300 ease-in-out
          active:scale-95

          bg-gradient-to-r from-red-500 to-blue-500
          text-white

          ${isScrolling
            ? "w-10 h-10"
            : "px-3 py-2 gap-2"}
        `}
      >

        {/* ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`transition-all duration-300 ${isScrolling ? "w-5 h-5" : "w-4 h-4"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>

        {/* TEXT */}
        <span
          className={`
            text-[10px] font-bold uppercase tracking-wide whitespace-nowrap
            transition-all duration-300
            ${isScrolling
              ? "opacity-0 w-0 overflow-hidden"
              : "opacity-100"}
          `}
        >
          {label}
        </span>

      </button>

    </div>
  );
};

export default FloatingActionMenu;