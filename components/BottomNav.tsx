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
    
    // CENTER HERO: STARVERSE (Globe)
    { name: "Starverse", icon: null, path: "/globe", type: "starverse" },

    { name: "Startalks", icon: BoltIcon, path: "/startalks", type: "custom" },
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" }
  ];

  return (
    <>
      {/* Font & Perfect Orbit Positioning Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght=800&display=swap');
        
        @keyframes chargingGlow {
          0%, 100% { opacity: 0.4; filter: drop-shadow(0 0 2px rgba(244,63,94,0.25)) drop-shadow(0 0 8px rgba(37,99,235,0.15)); }
          50% { opacity: 0.8; filter: drop-shadow(0 0 6px rgba(244,63,94,0.45)) drop-shadow(0 0 14px rgba(37,99,235,0.35)); }
        }
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
        /* Increased translation matrix to 31px to comfortably clear the +5% size globe */
        @keyframes orbitAlpha {
          0% { transform: rotate(0deg) translateX(31px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(31px) rotate(-360deg); }
        }
        @keyframes orbitBeta {
          0% { transform: rotate(120deg) translateX(31px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(31px) rotate(-480deg); }
        }
        @keyframes orbitGamma {
          0% { transform: rotate(240deg) translateX(31px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(31px) rotate(-600deg); }
        }
        @keyframes spinEarth {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .font-poppins { font-family: 'Poppins', sans-serif; font-weight: 800; }
        .animate-glow-line { animation: chargingGlow 3s ease-in-out infinite; }
        .animate-earth-spin { animation: spinEarth 50s linear infinite; }
        .animate-seq-1 { animation: textSequence 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-2 { animation: textSequenceTwo 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-3 { animation: textSequenceThree 6s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-people-1 { animation: orbitAlpha 14s linear infinite; }
        .animate-people-2 { animation: orbitBeta 14s linear infinite; }
        .animate-people-3 { animation: orbitGamma 14s linear infinite; }
      `}</style>

      {/* Main context shifted slightly lower for proper balance spacing */}
      <div className="fixed bottom-0 left-0 w-full z-[999] select-none pt-2">
        
        {/* 🔥 FIXED: Glow intensity reduced by 40% (opacity-90 to opacity-[0.54]) */}
        <div className="absolute top-[6px] left-0 w-full h-[2px] bg-gradient-to-r from-rose-500 via-purple-500 to-blue-600 animate-glow-line opacity-[0.54]" />
        
        {/* NOTE: White curve backdrop elements removed completely from code architecture */}

        {/* MAIN NAVIGATION BAR FRAME (Divider line naturally at top edge) */}
        <div className="relative bg-[var(--component-background)] border-t border-[var(--border-primary)] px-2 py-2 flex justify-between items-end h-[66px] z-10">
          
          {navItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);

            // 1. CENTER STARVERSE GLOBE SYSTEM (HALF UP, HALF DOWN)
            if (item.type === "starverse") {
              return (
                <div key={index} className="relative flex flex-col items-center justify-end flex-1 h-full pb-1 overflow-visible">
                  
                  {/* Floating container box positioned precisely halfway through the divider line */}
                  <div className="absolute top-[-30px] w-[66px] h-[66px] flex items-center justify-center overflow-visible z-20">
                    
                    {/* Soft background aura behind the globe */}
                    <div className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-rose-500/25 via-purple-500/10 to-blue-600/25 blur-sm opacity-80 pointer-events-none" />
                    
                    {/* 3 Rotating Network Nodes (Bigger sizing applied) */}
                    <div className="absolute animate-people-1 pointer-events-none z-30">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[0.5px] shadow-[0_0_4px_rgba(34,211,238,0.5)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-2 pointer-events-none z-30">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 p-[0.5px] shadow-[0_0_4px_rgba(168,85,247,0.5)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-3 pointer-events-none z-30">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[0.5px] shadow-[0_0_4px_rgba(52,211,153,0.5)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    {/* FIXED: +5% Bigger Globe Size (w-[57px] h-[57px]) optimized rendering shell */}
                    <button
                      onClick={() => navigate(item.path)}
                      className="relative flex items-center justify-center w-[57px] h-[57px] rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-slate-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.35),inset_0_1.5px_3px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden"
                    >
                      {/* Earth Vectors Inside Grid */}
                      <div className="absolute inset-0 opacity-35 dark:opacity-[0.16] mix-blend-screen scale-110 pointer-events-none animate-earth-spin">
                        <svg className="w-full h-full text-white fill-current" viewBox="0 0 100 100">
                          <path d="M20,45 Q25,35 35,40 T55,30 T70,45 T85,40 T75,65 T50,60 T30,70 Z" />
                          <path d="M40,15 Q50,20 55,10 T75,18 T65,28 Z" />
                          <path d="M15,75 Q25,85 45,80 T65,85 T80,75 Z" />
                        </svg>
                      </div>

                      {/* Top Mirror Gloss Arc */}
                      <div className="absolute top-[0.5px] left-1/2 -translate-x-1/2 w-[85%] h-[35%] rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[0.2px] pointer-events-none" />

                      {/* Floating Text Rotation System */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center font-poppins text-white tracking-tighter uppercase select-none">
                        <span className="animate-seq-1 absolute text-[9.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Find</span>
                        <span className="animate-seq-2 absolute text-[8.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Connect</span>
                        <span className="animate-seq-3 absolute text-[9.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Grow</span>
                      </div>
                    </button>
                  </div>

                  {/* Label synchronized exactly horizontally with neighbor text nodes */}
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

            // 2. STANDARD APP ICONS RENDER FRAMEWORK
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
