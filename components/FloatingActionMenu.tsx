import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<any>(null);

  // ✅ SHOW ONLY ON THESE PAGES
  const isProjectsPage = location.pathname.includes("project");
  const isAssetsPage = location.pathname.includes("asset");

  if (!isProjectsPage && !isAssetsPage) return null;

  // ✅ TEXT + ROUTE FIXED
  const label = isAssetsPage ? "List Asset" : "Post";
  const route = isAssetsPage ? "/submit-asset" : "/post-idea";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-[999]">

      <button
        onClick={() => navigate(route)}
        className={`
          flex items-center justify-center
          rounded-full
          transition-all duration-300 ease-out
          active:scale-95

          bg-gradient-to-r from-red-500 to-blue-500 text-white

          shadow-[0_0_12px_rgba(239,68,68,0.35)]
          hover:shadow-[0_0_20px_rgba(59,130,246,0.45)]

          ${
            isScrolling
              ? "w-10 h-10"          // 🔘 SCROLL → CIRCLE
              : "px-3 py-2 gap-1.5" // 💊 IDLE → SMALL PILL
          }
        `}
      >

        {/* ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform duration-300 ${
            isScrolling ? "rotate-90 scale-110" : ""
          }`}
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
            text-[9px] font-bold uppercase tracking-wide whitespace-nowrap
            transition-all duration-200
            ${
              isScrolling
                ? "opacity-0 w-0 overflow-hidden"
                : "opacity-100"
            }
          `}
        >
          {label}
        </span>

      </button>
    </div>
  );
};

export default FloatingActionMenu;