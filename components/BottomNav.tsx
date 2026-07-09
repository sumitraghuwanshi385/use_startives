import React from "react";
import { Home, Rocket } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

// 🔥 Purani constants aur icons imports
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

  // 5-Item balanced layout setup (Index 2 par exact center me Starverse h)
  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard", type: "lucide" },
    { name: "Projects", icon: Rocket, path: "/projects", type: "lucide" },
    
    // CENTER SPECIAL ITEM: STARVERSE
    { name: "Starverse", icon: null, path: "/globe", type: "starverse" },

    { name: "Startalks", icon: BoltIcon, path: "/startalks", type: "custom" },
    { name: "Messages", icon: ChatBubbleLeftRightIcon, path: "/messages", type: "custom" }
  ];

  return (
    <>
      {/* Dynamic Font & Charging Glow Keyframes (Red to Blue Theme) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght=800&display=swap');
        
        @keyframes chargingGlow {
          0%, 100% { opacity: 0.6; filter: drop-shadow(0 0 3px rgba(244,63,94,0.3)) drop-shadow(0 0 10px rgba(37,99,235,0.2)); }
          50% { opacity: 1; filter: drop-shadow(0 0 8px rgba(244,63,94,0.6)) drop-shadow(0 0 18px rgba(37,99,235,0.5)); }
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
        @keyframes orbitAlpha {
          0% { transform: rotate(0deg) translateX(24px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(24px) rotate(-360deg); }
        }
        @keyframes orbitBeta {
          0% { transform: rotate(120deg) translateX(24px) rotate(-120deg); }
          100% { transform: rotate(480deg) translateX(24px) rotate(-480deg); }
        }
        @keyframes orbitGamma {
          0% { transform: rotate(240deg) translateX(24px) rotate(-240deg); }
          100% { transform: rotate(600deg) translateX(24px) rotate(-600deg); }
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

      <div className="fixed bottom-0 left-0 w-full z-[999] select-none">
        
        {/* 🔥 Top Horizontal Border Charging Glow Line (Red to Blue) */}
        <div className="absolute top-[-2px] left-0 w-full h-[2px] bg-gradient-to-r from-rose-500 via-purple-500 to-blue-600 animate-glow-line opacity-90" />
        
        {/* Curved Backdrop Dome behind the Globe */}
        <div className="absolute top-[-16px] left-1/2 -translate-x-1/2 w-[74px] h-[37px] bg-[var(--component-background)] border-t border-[var(--border-primary)] rounded-t-full z-0 pointer-events-none" />
        
        {/* Ambient background aura under the curve */}
        <div className="absolute top-[-18px] left-1/2 -translate-x-1/2 w-[76px] h-[38px] bg-gradient-to-t from-transparent to-purple-500/15 blur-sm rounded-t-full pointer-events-none" />

        {/* MAIN NAVIGATION CONTAINER FRAME */}
        <div className="relative bg-[var(--component-background)] border-t border-[var(--border-primary)] px-2 py-2 flex justify-between items-end h-[66px] z-10">
          
          {navItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.path);

            // 1. CENTER FLOATING STARVERSE GENERATOR
            if (item.type === "starverse") {
              return (
                <div key={index} className="relative flex flex-col items-center justify-center flex-1 h-full">
                  
                  {/* Floating Action Box */}
                  <div className="absolute top-[-38px] w-[52px] h-[52px] flex items-center justify-center">
                    
                    {/* Red to Blue Gradient Charging Outer Radial Ring Aura */}
                    <div className="absolute inset-[-3px] rounded-full bg-gradient-to-tr from-rose-500/40 via-purple-500/20 to-blue-600/40 blur-sm opacity-90 pointer-events-none" />
                    
                    {/* --- 3 ROTATING NETWORK NODES (Brought straight from original file) --- */}
                    <div className="absolute animate-people-1 pointer-events-none z-30">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[0.5px] shadow-[0_0_4px_rgba(34,211,238,0.5)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-2 pointer-events-none z-30">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 p-[0.5px] shadow-[0_0_4px_rgba(168,85,247,0.5)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    <div className="absolute animate-people-3 pointer-events-none z-30">
                      <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[0.5px] shadow-[0_0_4px_rgba(52,211,153,0.5)] flex items-center justify-center">
                        <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      </div>
                    </div>

                    {/* MAIN CORE GLOBE BUTTON */}
                    <button
                      onClick={() => navigate(item.path)}
                      className="relative flex items-center justify-center w-[44px] h-[44px] rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-slate-900 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_4px_12px_rgba(0,0,0,0.35),inset_0_1.5px_3px_rgba(255,255,255,0.5),inset_0_-3px_6px_rgba(0,0,0,0.4)] border border-white/10 overflow-hidden"
                    >
                      {/* Organic Vector Earth Layout (Dimmed 20% on Dark Mode structure natively) */}
                      <div className="absolute inset-0 opacity-35 dark:opacity-[0.16] mix-blend-screen scale-110 pointer-events-none animate-earth-spin">
                        <svg className="w-full h-full text-white fill-current" viewBox="0 0 100 100">
                          <path d="M20,45 Q25,35 35,40 T55,30 T70,45 T85,40 T75,65 T50,60 T30,70 Z" />
                          <path d="M40,15 Q50,20 55,10 T75,18 T65,28 Z" />
                          <path d="M15,75 Q25,85 45,80 T65,85 T80,75 Z" />
                        </svg>
                      </div>

                      {/* Glossy Upper Light Curve */}
                      <div className="absolute top-[0.5px] left-1/2 -translate-x-1/2 w-[85%] h-[35%] rounded-full bg-gradient-to-b from-white/60 to-transparent blur-[0.2px] pointer-events-none" />

                      {/* Dynamic Text Loop Mechanism (Find -> Connect -> Grow) */}
                      <div className="relative z-10 w-full h-full flex items-center justify-center font-poppins text-white tracking-tighter uppercase select-none">
                        <span className="animate-seq-1 absolute text-[8.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Find</span>
                        <span className="animate-seq-2 absolute text-[7.6px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Connect</span>
                        <span className="animate-seq-3 absolute text-[8.5px] drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Grow</span>
                      </div>
                    </button>
                  </div>

                  {/* Label Title below Globe */}
                  <span
                    className={`text-[10px] font-semibold tracking-wide mt-auto mb-[2px] ${
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

            // 2. STANDARD SIDE NAVIGATION BUTTONS
            const IconComponent = item.icon!;
            return (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center justify-center flex-1 h-full py-1"
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
