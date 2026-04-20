import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isScrolling, setIsScrolling] = useState(false);
  const timeoutRef = useRef<any>(null);

  const path = location.pathname;

  // ✅ EXACT match (no includes bug)
  const showOnProjects =
    path === "/projects" ||
    path === "/project" ||
    path === "/discover";

  const showOnAssets =
    path === "/assets" ||
    path === "/marketplace";

  const shouldShow = showOnProjects || showOnAssets;

  // ❌ IMPORTANT: hooks ke baad hi return karna
  if (!shouldShow) return null;

  const isAssetPage = showOnAssets;

  const label = isAssetPage ? "List Asset" : "Post Project";
  const route = isAssetPage ? "/submit-asset" : "/post-idea";

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

  return (
    <div className="fixed bottom-20 right-4 z-[999]">
      <button
        onClick={() => navigate(route)}
        className={`
          flex items-center justify-center
          rounded-full
          transition-all duration-300
          bg-gradient-to-r from-red-500 to-blue-500
          text-white
          active:scale-95

          ${isScrolling ? "w-11 h-11" : "px-4 py-2 gap-2"}
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