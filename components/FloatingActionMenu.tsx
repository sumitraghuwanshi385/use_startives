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
  const isAssetsPage = path === "/blueprint"; // ⚠️ tera marketplace yahi hai

  const isPostPage =
    path === "/post-idea" || path === "/submit-asset";

  // ✅ ALWAYS RUN HOOK (TOP LEVEL ONLY)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ❌ AFTER hooks → conditions
  if (isPostPage) return null;
  if (!isProjectsPage && !isAssetsPage) return null;

  // ✅ dynamic text + route
  const label = isAssetsPage ? "List Your Asset" : "Post Idea";
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

          shadow-[0_8px_25px_rgba(239,68,68,0.35)]

          ${isScrolling
            ? "w-10 h-10"
            : "px-3 py-2 gap-2"}
        `}
      >

        {/* ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>

        {/* TEXT */}
        {!isScrolling && (
          <span className="text-[10px] font-bold uppercase tracking-wide">
            {label}
          </span>
        )}

      </button>

    </div>
  );
};

export default FloatingActionMenu;