import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(true);
  const lastScroll = useRef(0);
  const timeoutRef = useRef<any>(null);

  // 🔥 auto detect page
  const isAssetsPage = location.pathname.includes("asset");

  const label = isAssetsPage ? "Post Asset" : "Post Project";
  const route = isAssetsPage ? "/submit-asset" : "/post-idea";

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;

      // 👇 scrolling → collapse
      if (current > lastScroll.current) {
        setIsExpanded(false);
      }

      lastScroll.current = current;

      // 👇 stop → expand
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsExpanded(true);
      }, 180);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-5 z-[999]">

      <button
        onClick={() => navigate(route)}
        className={`
          flex items-center justify-center
          transition-all duration-300 ease-out
          rounded-full
          active:scale-95
          
          bg-gradient-to-r from-purple-600 to-indigo-600
          text-white

          shadow-[0_0_20px_rgba(139,92,246,0.35)]
          hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]

          ${isExpanded 
            ? "px-5 py-3 gap-2"
            : "w-12 h-12"}
        `}
      >

        {/* PLUS ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
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
            text-[10px] font-black uppercase tracking-widest whitespace-nowrap
            transition-all duration-300
            ${isExpanded ? "opacity-100 ml-1" : "opacity-0 w-0 overflow-hidden"}
          `}
        >
          {label}
        </span>

      </button>
    </div>
  );
};

export default FloatingActionMenu;