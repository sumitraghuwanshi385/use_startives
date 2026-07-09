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
    
    // CENTER STARVERSE ACTION ITEM
    { name: "Starverse", icon: null, path: "/globe", type: "starverse" },

    { name: "Startalks", icon: BoltIcon, path: "/startalks", type: "custom" },
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" }
  ];

  return (
    <>
      {/* Precision Orbit Tracker Math Matrix & Content Looping Engines */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght=800&display=swap');
        
        @keyframes textSequence {
          0%, 28% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(1px); }
          5%, 23% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          33%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(1px); }
        }
        @keyframes textSequenceTwo {
          0%, 33% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(1px); }
          38%, 56% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          66%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(1px); }
        }
        @keyframes textSequenceThree {
          0%, 66% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(1px); }
          71%, 90% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(1px); }
        }
        
        /* Fixed tracking at exactly 28px radius coordinates for 56px button symmetry */
        @keyframes orbitAlpha {
          0% { transform: rotate(0deg) translateX(28px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(28px) rotate(-360deg); }
        }
        @keyframes orbitBeta {
          0% { transform: rotate(120deg) translateX(28px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(28px) rotate(-480deg); }
        }
        @keyframes orbitGamma {
          0% { transform: rotate(240deg) translateX(28px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(28px) rotate(-600deg); }
        }
        @keyframes spinEarth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .font-poppins { font-family: 'Poppins', sans-serif; font-weight: 800; }
        .animate-earth-spin { animation: spinEarth 45s linear infinite; }
        .animate-seq-1 { animation: textSequence 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-2 { animation: textSequenceTwo 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-3 { animation: textSequenceThree 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-people-1 { animation: orbitAlpha 14s linear infinite; }
        .animate-people-2 { animation: orbitBeta 14s linear infinite; }
        .animate-people-3 { animation: orbitGamma 14s linear infinite; }
      `}</style>

      {/* Main Base Layout Component Wrapper */}
      <div className="fixed bottom-0 left-0 w-full z-[999] select-none bg-transparent">

        {/* MAIN NAVIGATION BAR FRAME (Divider line intersects perfect horizontal globe grid axis) */}
        <div className="relative bg-[var(--component-background)] border-t border-[var(--border-primary)] px-2 py-2 flex justify-between items-end h-[66px] z-10 overflow-visible">
          
          {navItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);

            // 1. CENTER IMMERSIVE GLOBE (PROPORTIONALLY BALANCED & 100% COVERED)
            if (item.type === "starverse") {
              return (
                <div key={index} className="relative flex flex-col items-center justify-end flex-1 h-full pb-1 overflow-visible">
                  
                  {/* Anchor Box positioned dead-center relative to the navigation bar's top border horizon */}
                  <div className="absolute top-0 -translate-y-1/2 w-[64px] h-[64px] flex items-center justify-center overflow-visible z-20 bg-transparent">
                    
                    {/* Radial Atmosphere Glow Ring */}
                    <div className="absolute inset-1 rounded-full bg-indigo-500/10 blur-sm pointer-events-none" />
                    
                    {/* Rotating Tokens Track (50% Inside / 50% Outside Layout Alignment) */}
                    <div className="absolute animate-people-1 pointer-events-none z-40">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[0.5px] shadow-[0_0_4px_rgba(34,211,238,0.6)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-2 pointer-events-none z-40">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 p-[0.5px] shadow-[0_0_4px_rgba(168,85,247,0.6)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-3 pointer-events-none z-40">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[0.5px] shadow-[0_0_4px_rgba(52,211,153,0.6)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    {/* 🔥 MODIFIED: Increased size by exactly +7% up to precise w-[56px] h-[56px] */}
                    <button
                      onClick={() => navigate(item.path)}
                      className="relative flex items-center justify-center w-[56px] h-[56px] rounded-full bg-gradient-to-b from-cyan-400 via-indigo-600 to-slate-950 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_10px_rgba(0,0,0,0.35),inset_0_1.5px_3px_rgba(255,255,255,0.4),inset_0_-2px_4px_rgba(0,0,0,0.5)] border border-white/15 overflow-hidden"
                    >
                      {/* 🔥 FIXED BG GLITCH: Stretched background layers to 105% to eliminate empty black/blue space margins completely */}
                      <div className="absolute inset-[-1px] bg-gradient-to-b from-cyan-400 via-indigo-600 to-slate-900 pointer-events-none rounded-full" />

                      {/* Map Mesh Overlay Vector */}
                      <div className="absolute inset-0 opacity-40 dark:opacity-[0.18] mix-blend-screen pointer-events-none animate-earth-spin flex items-center justify-center">
                        <svg className="w-[92%] h-[92%] text-white fill-current scale-105" viewBox="0 0 100 100">
                          <path d="M15,45 Q25,32 38,40 T58,28 T74,45 T88,38 T78,68 T52,62 T28,72 Z" />
                          <path d="M38,12 Q48,18 54,8 T76,16 T64,26 Z" />
                          <path d="M12,72 Q22,82 42,78 T64,82 T82,72 Z" />
                        </svg>
                      </div>

                      {/* Top Spherical Highlight Glass Shard */}
                      <div className="absolute top-[0.5px] left-1/2 -translate-x-1/2 w-[85%] h-[35%] rounded-full bg-gradient-to-b from-white/45 to-transparent blur-[0.2px] pointer-events-none" />

                      {/* Loop Text Layers */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center font-poppins text-white tracking-tighter uppercase select-none">
                        <span className="animate-seq-1 absolute text-[10px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Find</span>
                        <span className="animate-seq-2 absolute text-[9px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Connect</span>
                        <span className="animate-seq-3 absolute text-[10px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Grow</span>
                      </div>
                    </button>
                  </div>

                  {/* Ground Baseline Row Navigation Labels */}
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

            // 2. STANDARD INLINE LINK SELECTIONS
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
