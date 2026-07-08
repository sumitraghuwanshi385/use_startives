import React from "react";
import { useNavigate } from "react-router-dom";

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Premium Cinematic Cosmic Animations */}
      <style>{`
        @keyframes textSequence {
          0%, 20% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          3%, 17% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          23%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceTwo {
          0%, 20% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          23%, 43% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          26%, 40% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          46%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceThree {
          0%, 43% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          46%, 66% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
          49%, 63% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          66%, 100% { opacity: 0; transform: scale(0.85) translateY(1px); filter: blur(2px); }
        }
        @keyframes textSequenceFour {
          0%, 66% { opacity: 0; transform: scale(0.82) translateY(1px); filter: blur(2px); }
          69%, 89% { opacity: 0; transform: scale(0.82) translateY(1px); filter: blur(2px); }
          72%, 86% { opacity: 1; transform: scale(1) translateY(0px); filter: blur(0px); }
          89%, 100% { opacity: 0; transform: scale(0.82) translateY(1px); filter: blur(2px); }
        }
        @keyframes orbitNode {
          0% { transform: rotate(0deg) translateX(29px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(29px) rotate(-360deg); }
        }
        @keyframes superNovaPulse {
          0%, 100% { transform: scale(1); opacity: 0.85; filter: saturate(1.2) blur(16px); }
          50% { transform: scale(1.08); opacity: 1; filter: saturate(1.6) blur(20px); }
        }
        .animate-seq-1 { animation: textSequence 8s infinite cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-seq-2 { animation: textSequenceTwo 8s infinite cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-seq-3 { animation: textSequenceThree 8s infinite cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-seq-4 { animation: textSequenceFour 8s infinite cubic-bezier(0.25, 1, 0.5, 1); }
        .animate-orbit-node { animation: orbitNode 12s linear infinite; }
        .animate-cosmic-glow { animation: superNovaPulse 4s ease-in-out infinite; }
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
          duration-700
          hover:scale-110
          cursor-pointer
          select-none
          bg-transparent
          border-none
          outline-none
        "
      >
        {/* FIXED UNIFORM GLOW: High intensity deep cosmic corona aura that pierces through light mode backgrounds */}
        <div
          className="
            absolute
            inset-[-22px]
            rounded-full
            bg-gradient-to-tr
            from-cyan-400
            via-indigo-500
            to-purple-600
            opacity-95
            group-hover:opacity-100
            group-hover:scale-105
            transition-all
            duration-700
            mix-blend-initial
            shadow-[0_0_50px_rgba(34,211,238,0.55),0_0_100px_rgba(99,102,241,0.3)]
            pointer-events-none
            animate-cosmic-glow
          "
        />

        {/* Orbit Path Track 1 (Tilted Saturn Style Ring Component) */}
        <div
          className="
            absolute
            w-[74px]
            h-[30px]
            rounded-full
            border-t-2
            border-b
            border-cyan-400/40
            dark:border-cyan-300/30
            rotate-[-28deg]
            pointer-events-none
            transform
            scale-90
            group-hover:scale-105
            transition-all
            duration-700
          "
        />

        {/* Outer Solar Orbit Line (Main Ring) */}
        <div
          className="
            absolute
            inset-[-1px]
            rounded-full
            border
            border-white/40
            dark:border-cyan-400/20
            shadow-[0_0_15px_rgba(255,255,255,0.4),0_0_3px_rgba(34,211,238,0.3)]
            animate-[spin_25s_linear_infinite]
            pointer-events-none
          "
        />

        {/* Live Satellite/Planet Orbit Node */}
        <div 
          className="
            absolute
            w-2
            h-2
            rounded-full
            bg-gradient-to-r
            from-amber-300
            to-cyan-300
            shadow-[0_0_8px_#22d3ee,0_0_2px_#fff]
            animate-orbit-node
            pointer-events-none
            z-30
          "
        />

        {/* Deep Space Core Sphere (Glass finish with extreme inner galaxy shadows) */}
        <div
          className="
            relative
            w-[48px]
            h-[48px]
            rounded-full
            overflow-hidden
            border
            border-white/40
            bg-gradient-to-b
            from-slate-950
            via-indigo-950
            to-black
            flex
            items-center
            justify-center
            backdrop-blur-2xl
            transition-all
            duration-500
            shadow-[0_4px_20px_rgba(0,0,0,0.65),0_0_30px_rgba(34,211,238,0.45),inset_0_3px_8px_rgba(255,255,255,0.45),inset_0_-8px_12px_rgba(0,0,0,0.95),inset_0_0_12px_rgba(6,182,212,0.5)]
            group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.75),0_0_40px_rgba(147,51,234,0.6),inset_0_3px_10px_rgba(255,255,255,0.55),inset_0_-4px_12px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(168,85,247,0.6)]
            group-hover:border-white/60
          "
        >
          {/* Constellation Starfield Pattern Overlay */}
          <div
            className="
              absolute
              inset-0
              opacity-40
              bg-[radial-gradient(#fff_1px,transparent_1px),radial-gradient(#fff_1px,transparent_1px)]
              bg-[size:6px_6px]
              bg-[position:0_0,3px_3px]
              animate-[spin_60s_linear_infinite]
            "
          />

          {/* Magnetic Fields Nebular Flow */}
          <div
            className="
              absolute
              inset-[-5px]
              rounded-full
              bg-gradient-to-bl
              from-violet-600/25
              via-cyan-500/35
              to-emerald-500/15
              mix-blend-color-dodge
              animate-pulse
              duration-2000
            "
          />

          {/* 3D Glass Surface Convex Specular Arc (Real lens curvature) */}
          <div
            className="
              absolute
              top-0.5
              left-1/2
              -translate-x-1/2
              w-[90%]
              h-[45%]
              rounded-full
              bg-gradient-to-b
              from-white/50
              to-transparent
              filter
              blur-[0.5px]
              z-20
              pointer-events-none
            "
          />

          {/* Hyper-Elite Condensed Typography Track Matrix */}
          <div className="relative z-10 w-full h-full flex items-center justify-center font-sans font-[1000] tracking-tight select-none">
            {/* FIND */}
            <span className="animate-seq-1 absolute text-[8.5px] uppercase text-cyan-50 filter drop-shadow-[0_0_4px_rgba(34,211,238,0.7)]">
              Find
            </span>

            {/* CONNECT */}
            <span className="animate-seq-2 absolute text-[7.5px] uppercase text-indigo-50 filter drop-shadow-[0_0_4px_rgba(129,140,248,0.7)]">
              Connect
            </span>

            {/* GROW */}
            <span className="animate-seq-3 absolute text-[8.5px] uppercase text-purple-50 filter drop-shadow-[0_0_4px_rgba(192,132,252,0.7)]">
              Grow
            </span>

            {/* EXPLORE! */}
            <span className="animate-seq-4 absolute text-[7.8px] uppercase tracking-normal text-white filter drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">
              Explore!
            </span>
          </div>

          {/* Central Core Thermal Shimmer */}
          <div
            className="
              absolute
              w-4
              h-4
              rounded-full
              bg-white/20
              blur-sm
              z-0
            "
          />
        </div>

        {/* Glassmorphic Cyber Tooltip Menu */}
        <div
          className="
            absolute
            right-[74px]
            whitespace-nowrap
            px-4
            py-2
            rounded-xl
            text-[11px]
            font-bold
            tracking-wide
            uppercase
            opacity-0
            scale-95
            translate-x-3
            blur-sm
            group-hover:opacity-100
            group-hover:scale-100
            group-hover:translate-x-0
            group-hover:blur-0
            transition-all
            duration-500
            pointer-events-none
            bg-slate-950/90
            backdrop-blur-xl
            border
            border-white/20
            text-cyan-100
            shadow-[0_12px_30px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15),0_0_15px_rgba(34,211,238,0.25)]
            flex
            items-center
            gap-2
          "
        >
          <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
            Explore Starverse
          </span>
          <span className="text-xs filter drop-shadow-[0_0_4px_rgba(34,211,238,0.5)]">🌌</span>
        </div>
      </button>
    </>
  );
};

export default StarverseFloatingButton;
