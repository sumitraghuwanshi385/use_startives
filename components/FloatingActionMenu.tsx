import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingActionMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState(true);
  const scrollTimeout = useRef<any>(null);

  // ✅ detect page properly
  const isAssetsPage = location.pathname.includes("asset");

  const label = isAssetsPage ? "Post Asset" : "Post Project";
  const route = isAssetsPage ? "/submit-asset" : "/post-idea";

  useEffect(() => {
    let isScrolling: any;

    const handleScroll = () => {
      // 🔥 ALWAYS collapse while scrolling
      setIsExpanded(false);

      // clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // 🔥 expand after scroll stops
      scrollTimeout.current = setTimeout(() => {
        setIsExpanded(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div
      className="
        fixed 
        bottom-20   /* 👈 NAVBAR SE UPAR */
        right-5 
        z-[999]
      "
    >
      <button
        onClick={() => navigate(route)}
        className={`
          flex items-center justify-center
          transition-all duration-300 ease-out
          rounded-full
          active:scale-95
          
          /* 🔥 YOUR BRAND GRADIENT */
          bg-gradient-to-r from-blue-500 to-red-500
          text-white

          shadow-[0_0_20px_rgba(59,130,246,0.35)]
          hover:shadow-[0_0_30px_rgba(239,68,68,0.45)]

          ${
            isExpanded
              ? "px-5 py-3 gap-2"
              : "w-12 h-12"
          }
        `}
      >

        {/* ICON */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 transition-transform duration-300 ${
            isExpanded ? "" : "scale-110"
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
            text-[10px] font-black uppercase tracking-widest whitespace-nowrap
            transition-all duration-300
            ${
              isExpanded
                ? "opacity-100 ml-1"
                : "opacity-0 w-0 overflow-hidden"
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