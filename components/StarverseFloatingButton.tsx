import React from "react";
import { useNavigate } from "react-router-dom";

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Refined animations with premium serif transforms */}
      <style>{`
        @keyframes textSequence {
          0%, 20% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
          3%, 17% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          23%, 100% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceTwo {
          0%, 20% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
          23%, 43% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
          26%, 40% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          46%, 100% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceThree {
          0%, 43% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
          46%, 66% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
          49%, 63% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          66%, 100% { opacity: 0; transform: scale(0.88) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceFour {
          0%, 66% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          69%, 89% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          72%, 86% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          89%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
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
        .animate-seq-1 { animation: textSequence 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-2 { animation: textSequenceTwo 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-3 { animation: textSequenceThree 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-seq-4 { animation: textSequenceFour 8s infinite cubic-bezier(0.34, 1.56, 0.64, 1); }
        .animate-people-1 { animation: orbitAlpha 14s linear infinite; }
        .animate-people-2 { animation: orbitBeta 14s linear infinite; }
        .animate-people-3 { animation: orbitGamma 14s linear infinite; }
      `}</style>

      <button
        onClick={() => navigate("/globe")}
        aria-label="Open Starverse"
        className="
          fixed
          right-4
          bottom-[106px]
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
        "
      >
        {/* FIXED: Drastically reduced and controlled ambient shadow glow to remove white mode dimness */}
        <div
          className="
            absolute
            inset-[-6px]
            rounded-full
            bg-gradient-to-tr
            from-cyan-400/40
            via-indigo-500/20
            to-purple-500/40
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
            dark:border-cyan-400/20
            shadow-[0_0_8px_rgba(34,211,238,0.15)]
            pointer-events-none
          "
        />

        {/* 3 UNIQUE ROTATING PEOPLE / COMMUNITY VISUAL ICONS */}
        {/* Person Node 1 */}
        <div className="absolute animate-people-1 pointer-events-none z-30">
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 p-[1px] shadow-[0_0_6px_rgba(34,211,238,0.6)] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Person Node 2 */}
        <div className="absolute animate-people-2 pointer-events-none z-30">
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-pink-500 p-[1px] shadow-[0_0_6px_rgba(168,85,247,0.6)] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* Person Node 3 */}
        <div className="absolute animate-people-3 pointer-events-none z-30">
          <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-400 p-[1px] shadow-[0_0_6px_rgba(52,211,153,0.6)] flex items-center justify-center">
            <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16w-2v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        </div>

        {/* The Core Globe Glass Sphere - Clean Premium Cosmic Dark Space Base */}
        <div
          className="
            relative
            w-[46px]
            h-[46px]
            rounded-full
            overflow-hidden
            border
            border-white/25
            bg-gradient-to-b
            from-slate-950
            via-blue-950
            to-neutral-950
            flex
            items-center
            justify-center
            backdrop-blur-xl
            transition-all
            duration-500
            shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_1.5px_4px_rgba(255,255,255,0.35),inset_0_-4px_8px_rgba(0,0,0,0.9)]
            group-hover:border-white/40
          "
        >
          {/* FIXED: Removed Dotted Grid. Replaced with real organic Earth/Continental vector outlines */}
          <div className="absolute inset-0 opacity-35 mix-blend-screen scale-110 pointer-events-none">
            <svg className="w-full h-full text-cyan-400/60 fill-current animate-[spin_80s_linear_infinite]" viewBox="0 0 100 100">
              {/* Abstract continental mapping curves representing Earth 🌎 */}
              <path d="M20,45 Q25,35 35,40 T55,30 T70,45 T85,40 T75,65 T50,60 T30,70 Z" />
              <path d="M40,15 Q50,20 55,10 T75,18 T65,28 Z" />
              <path d="M15,75 Q25,85 45,80 T65,85 T80,75 Z" />
            </svg>
          </div>

          {/* Dynamic Inner Atmospheric Aurora Bloom */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-gradient-to-tr
              from-emerald-500/10
              via-cyan-500/20
              to-purple-600/25
              mix-blend-color-dodge
            "
          />

          {/* Real lens curvature specular shine */}
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
              from-white/40
              to-transparent
              filter
              blur-[0.5px]
              z-20
              pointer-events-none
            "
          />

          {/* FIXED: Premium Serif Typography Style with High Contrast Text */}
          <div className="relative z-10 w-full h-full flex items-center justify-center font-serif italic font-[900] tracking-tight select-none">
            {/* FIND */}
            <span className="animate-seq-1 absolute text-[9px] text-cyan-50 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.7)]">
              Find
            </span>

            {/* CONNECT */}
            <span className="animate-seq-2 absolute text-[8px] text-cyan-50 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.7)]">
              Connect
            </span>

            {/* GROW */}
            <span className="animate-seq-3 absolute text-[9px] text-cyan-50 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.7)]">
              Grow
            </span>

            {/* EXPLORE! */}
            <span className="animate-seq-4 absolute text-[8px] tracking-normal text-white filter drop-shadow-[0_0_5px_rgba(255,255,255,0.85)]">
              Explore!
            </span>
          </div>
        </div>

        {/* Clean Glassmorphic Tooltip */}
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
            shadow-[0_8px_24px_rgba(0,0,0,0.1)]
            flex
            items-center
            gap-2
          "
        >
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Explore Starverse
          </span>
          <span className="text-xs">🌍</span>
        </div>
      </button>
    </>
  );
};

export default StarverseFloatingButton;
