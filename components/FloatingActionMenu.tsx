import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<any>(null);

  // ✅ show only on these pages
  const isProjectPage = location.pathname.includes("project");
  const isAssetPage = location.pathname.includes("asset");

  if (!isProjectPage && !isAssetPage) return null;

  // ✅ dynamic label + route
  const label = isAssetPage ? "List Asset" : "Post Project";
  const route = isAssetPage ? "/submit-asset" : "/post-idea";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 220); // smooth timing
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            ? "w-11 h-11"
            : "px-4 py-2.5 gap-2"}
        `}
      >

        {/* PLUS ICON */}
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
        <span
          className={`
            text-[10px] font-bold uppercase tracking-wider whitespace-nowrap
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