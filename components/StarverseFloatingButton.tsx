import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  // 1. EXACT ROUTES TO HIDE COMPLETELY (In pages par bilkul nahi dikhega)
  const hideOnPages = [
    "/profile",               // My profile
    "/profile/edit",          // Profile edit
    "/my-projects",           // FIXED: Added exact path to hide on My Projects page completely
    "/post-idea",             // Post idea page
    "/submit-asset",          // Post asset page
    "/login",                 // Login page
    "/signup",                // Signup page
    "/forgot-password",       // Forgot password page
    "/new-password",          // New password page
    "/verify-email",          // Email verification
    "/messages",              // Messenger page
    "/connections",           // Connections page
    "/my-applications",       // Application list page
    "/saved-projects",        // Saved/Wishlist projects page
    "/about",                 // About us placeholder route
    "/privacy-policy",        // Privacy policy placeholder route
    "/sponsorship",           // Sponsorship placeholder route
    "/contact-us",            // Contact us form page
    "/globe"                  // Main globe canvas page itself
  ];

  // Dynamic route safety check (e.g., dynamic user profiles, idea details, asset details, team details)
  const isDynamicHiddenRoute = 
    currentPath.startsWith("/user/") || 
    currentPath.startsWith("/idea/") || 
    currentPath.startsWith("/asset/") || 
    currentPath.startsWith("/team/");

  if (hideOnPages.includes(currentPath) || isDynamicHiddenRoute) {
    return null; // Instantly destroys/hides the button on specified pages
  }

  // 2. DISCOVER PROJECTS AND MARKETPLACE POSITIONS (Best screenshot spot)
  const isPrimaryMarketplacePage = currentPath === "/projects" || currentPath === "/blueprint";

  // FIXED: Adjusted secondary position to bottom-[86px] so it safely floats above the bottom navigation bar without touching it
  const positionClass = isPrimaryMarketplacePage 
    ? "bottom-[106px] right-4" 
    : "bottom-[86px] right-4";  

  return (
    <>
      {/* Poppins Font Integration & Timed Orbit System loops */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght=800&display=swap');

        @keyframes textSequence {
          0%, 28% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          5%, 23% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          33%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceTwo {
          0%, 33% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          38%, 56% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          66%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceThree {
          0%, 66% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          71%, 90% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
        }
        @keyframes orbitAlpha {
          0% { transform: rotate(0deg) translateX(25px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(25px) rotate(-360deg); }
        }
        @keyframes orbitBeta {
          0% { transform: rotate(120deg) translateX(25px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(25px) rotate(-480deg); }
        }
        @keyframes orbitGamma {
          0% { transform: rotate(240deg) translateX(25px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(25px) rotate(-600deg); }
        }

        .font-poppins {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
          font-weight: 800;
        }
        .animate-seq-1 { animation: textSequence 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-2 { animation: textSequenceTwo 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-3 { animation: textSequenceThree 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-people-1 { animation: orbitAlpha 14s linear infinite; }
        .animate-people-2 { animation: orbitBeta 14s linear infinite; }
        .animate-people-3 { animation: orbitGamma 14s linear infinite; }
      `}</style>

      <button
        onClick={() => navigate("/globe")}
        aria-label="Open Starverse"
        className={`
          fixed
          z-[9999]
          group
          flex
          items-center
          justify-center
          w-[58px]
          h-[58px]
          rounded-full
          transition-all
          duration-500
          hover:scale-105
          cursor-pointer
          select-none
          bg-transparent
          border-none
          outline-none
          ${positionClass}
        `}
      >
        {/* Subtle Refined Ambient Underglow */}
        <div
          className="
            absolute
            inset-[-5px]
            rounded-full
            bg-gradient-to-tr
            from-cyan-300/30
            via-indigo-400/20
            to-purple-400/30
            blur-md
            opacity-70
            group-hover:opacity-90
            transition-all
            duration-500
            pointer-events-none
          "
        />

        {/* Clean Outer Celestial Orbit Line */}
        <div
          className="
            absolute
            inset-[-1px]
            rounded-full
            border
            border-cyan-400/30
            shadow-[0_0_8px_rgba(34,211,238,0.1)]
            pointer-events-none
          "
        />

        {/* 3 ROTATING PEOPLE / NETWORK NODES */}
        <div className="absolute animate-people-1 pointer-events-none z-30">
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1px] shadow-[0_0_5px_rgba(34,211,238,0.5)] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <div className="absolute animate-people-2 pointer-events-none z-30">
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 p-[1px] shadow-[0_0_5px_rgba(168,85,247,0.5)] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        <div className="absolute animate-people-3 pointer-events-none z-30">
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1px] shadow-[0_0_5px_rgba(52,211,153,0.5)] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* UNIFIED LUMINESCENT GLOBE LAYER */}
        <div
          className="
            relative
            w-[46px]
            h-[46px]
            rounded-full
            overflow-hidden
            border
            border-white/80
            bg-gradient-to-b
            from-cyan-400
            via-indigo-500
            to-slate-900
            flex
            items-center
            justify-center
            backdrop-blur-xl
            transition-all
            duration-500
            shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-4px_8px_rgba(0,0,0,0.4)]
            group-hover:border-white
          "
        >
          {/* Real organic Earth vector lines */}
          <div className="absolute inset-0 opacity-40 mix-blend-screen scale-110 pointer-events-none">
            <svg className="w-full h-full text-white fill-current animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
              <path d="M20,45 Q25,35 35,40 T55,30 T70,45 T85,40 T75,65 T50,60 T30,70 Z" />
              <path d="M40,15 Q50,20 55,10 T75,18 T65,28 Z" />
              <path d="M15,75 Q25,85 45,80 T65,85 T80,75 Z" />
            </svg>
          </div>

          {/* Curved shiny reflection mask */}
          <div
            className="
              absolute
              top-0.5
              left-1/2
              -translate-x-1/2
              w-[85%]
              h-[40%]
              rounded-full
              bg-gradient-to-b
              from-white/70
              to-transparent
              filter
              blur-[0.3px]
              z-20
              pointer-events-none
            "
          />

          {/* Poppins Scaled 7% Core Loop Without Explore */}
          <div className="relative z-10 w-full h-full flex items-center justify-center font-poppins tracking-tight uppercase select-none">
            <span className="animate-seq-1 absolute text-[8.8px] text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              Find
            </span>
            <span className="animate-seq-2 absolute text-[7.9px] text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              Connect
            </span>
            <span className="animate-seq-3 absolute text-[8.8px] text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              Grow
            </span>
          </div>
        </div>

        {/* Clean Glass Tooltip Popover */}
        <div
          className="
            absolute
            right-[72px]
            whitespace-nowrap
            px-3.5
            py-1.5
            rounded-xl
            text-[11px]
            font-bold
            tracking-wide
            uppercase
            opacity-0
            scale-90
            translate-x-3
            blur-sm
            group-hover:opacity-100
            group-hover:scale-100
            group-hover:translate-x-0
            group-hover:blur-0
            transition-all
            duration-400
            pointer-events-none
            bg-white/95
            dark:bg-slate-950/90
            backdrop-blur-xl
            border
            border-slate-200
            dark:border-white/10
            text-slate-800
            dark:text-cyan-100
            shadow-[0_8px_24px_rgba(0,0,0,0.08)]
            flex
            items-center
            gap-2
          "
        >
          <span className="font-poppins bg-gradient-to-r from-slate-900 to-slate-700 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Explore Starverse
          </span>
          <span className="text-xs">🌍</span>
        </div>
      </button>
    </>
  );
};

export default StarverseFloatingButton;
