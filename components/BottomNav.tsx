import React from "react";
import { Home, Rocket } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  ChatBubbleLeftRightIcon,
  BoltIcon
} from "../constants";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isChatOpen = document.body.classList.contains("chat-open");

  const hideRoutes = [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
    "/new-password"
  ];

  if (hideRoutes.includes(location.pathname) || isChatOpen) {
    return null;
  }

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard", type: "lucide" },
    { name: "Projects", icon: Rocket, path: "/projects", type: "lucide" },
    
    // CENTER STARVERSE ITEM WITH FLOATING BUTTON UI STYLE
    { name: "Starverse", icon: null, path: "/globe", type: "starverse" },

    { name: "Startalks", icon: BoltIcon, path: "/startalks", type: "custom" },
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" }
  ];

  return (
    <>
      {/* Poppins Font Integration & Updated Orbit Keyframes */}
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
        
        /* Radiated translation updated to 28.5px for smooth 55px core button wrapping */
        @keyframes orbitAlpha {
          0% { transform: rotate(0deg) translateX(28.5px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(28.5px) rotate(-360deg); }
        }
        @keyframes orbitBeta {
          0% { transform: rotate(120deg) translateX(28.5px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(28.5px) rotate(-480deg); }
        }
        @keyframes orbitGamma {
          0% { transform: rotate(240deg) translateX(28.5px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(28.5px) rotate(-600deg); }
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

      {/* Main Base Wrapper */}
      <div className="fixed bottom-0 left-0 w-full z-[999] select-none bg-transparent">

        {/* MAIN NAVIGATION BAR FRAME */}
        <div className="relative bg-[var(--component-background)] border-t border-[var(--border-primary)] px-2 py-2 flex justify-between items-end h-[66px] z-10 overflow-visible">
          
          {navItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);

            // 1. STARVERSE GLOBE LOGIC WITH FLOATING BUTTON UI STYLE
            if (item.type === "starverse") {
              return (
                <div key={index} className="relative flex flex-col items-center justify-end flex-1 h-full pb-1 overflow-visible">
                  
                  {/* Absolute Center Anchor Box over Divider Line */}
                  <div className="absolute top-0 -translate-y-1/2 w-[62px] h-[62px] flex items-center justify-center overflow-visible z-20 bg-transparent group">
                    
                    {/* Premium Red-to-Blue Ambient Glow Engine Layer */}
                    <div
                      className="
                        absolute
                        inset-[-3px]
                        rounded-full
                        bg-gradient-to-tr
                        from-rose-500/45
                        via-purple-500/20
                        to-blue-600/45
                        blur-md
                        opacity-95
                        pointer-events-none
                      "
                    />

                    {/* 3 ROTATING PEOPLE / COMMUNITY NODES (Size boosted to w-3.5 h-3.5) */}
                    <div className="absolute animate-people-1 pointer-events-none z-30">
                      <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1px] shadow-[0_0_5px_rgba(34,211,238,0.6)] flex items-center justify-center">
                        <svg className="w-[80%] h-[80%] text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-2 pointer-events-none z-30">
                      <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 p-[1px] shadow-[0_0_5px_rgba(168,85,247,0.6)] flex items-center justify-center">
                        <svg className="w-[80%] h-[80%] text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-3 pointer-events-none z-30">
                      <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1px] shadow-[0_0_5px_rgba(52,211,153,0.6)] flex items-center justify-center">
                        <svg className="w-[80%] h-[80%] text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    {/* CORE GLOBE CANVASES WITH +5% INCREASED BASE SIZE (w-[55px] h-[55px]) */}
                    <button
                      onClick={() => navigate(item.path)}
                      className="
                        relative
                        w-[55px]
                        h-[55px]
                        rounded-full
                        overflow-hidden
                        bg-gradient-to-b
                        from-cyan-400
                        via-indigo-500
                        to-slate-900
                        flex
                        items-center
                        justify-center
                        backdrop-blur-xl
                        transition-all
                        duration-300
                        hover:scale-105
                        active:scale-95
                        border-none
                        outline-none
                        shadow-[0_4px_14px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.6),inset_0_-4px_8px_rgba(0,0,0,0.4)]
                      "
                    >
                      {/* Organic Earth Map Canvas (Seamless Fill) */}
                      <div className="absolute inset-0 opacity-40 dark:opacity-[0.16] mix-blend-screen scale-110 pointer-events-none transition-all duration-300">
                        <svg className="w-full h-full text-white fill-current animate-[spin_60s_linear_infinite]" viewBox="0 0 100 100">
                          <path d="M20,45 Q25,35 35,40 T55,30 T70,45 T85,40 T75,65 T50,60 T30,70 Z" />
                          <path d="M40,15 Q50,20 55,10 T75,18 T65,28 Z" />
                          <path d="M15,75 Q25,85 45,80 T65,85 T80,75 Z" />
                        </svg>
                      </div>

                      {/* Curved shiny reflection shell overlay */}
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

                      {/* Poppins Core Text Loop (Rescaled proportionally for 55px button) */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center font-poppins tracking-tight uppercase select-none">
                        <span className="animate-seq-1 absolute text-[10px] text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                          Find
                        </span>
                        <span className="animate-seq-2 absolute text-[9px] text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                          Connect
                        </span>
                        <span className="animate-seq-3 absolute text-[10px] text-white filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                          Grow
                        </span>
                      </div>
                    </button>
                  </div>

                  {/* Ground Baseline Navigation Title */}
                  <span
                    className={`text-[10px] font-semibold tracking-wide leading-none ${
                      isActive
                        ? "bg-gradient-to-r from-rose-500 to-blue-500 bg-clip-text text-transparent"
                        : "text-[var(--text-muted)]"
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              );
            }

            // 2. STANDARD INLINE SIDE BUTTON ACTIONS
            const IconComponent = item.icon!;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-end flex-1 h-full pb-1"
              >
                <IconComponent
                  className={`w-[22px] h-[22px] mb-[4px] transition-all duration-200 ${
                    isActive
                      ? "text-[var(--text-primary)] scale-110"
                      : "text-[var(--text-muted)]"
                  }`}
                />

                <span
                  className={`text-[10px] font-semibold leading-none ${
                    isActive
                      ? "bg-gradient-to-r from-rose-500 to-blue-500 bg-clip-text text-transparent"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </>
  );
};

export default BottomNav;
