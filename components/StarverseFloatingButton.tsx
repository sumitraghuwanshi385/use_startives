import React from "react";
import { useNavigate } from "react-router-dom";

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Injecting custom keyframe loop for the text sequence right inside the file */}
      <style>{`
        @keyframes textSequence {
          0%, 20% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          3%, 17% { opacity: 1; transform: scale(1); filter: blur(0px); }
          23%, 43% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          46%, 66% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          69%, 89% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          92%, 100% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
        }
        @keyframes textSequenceTwo {
          0%, 20% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          23%, 43% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          26%, 40% { opacity: 1; transform: scale(1); filter: blur(0px); }
          46%, 66% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          69%, 89% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          92%, 100% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
        }
        @keyframes textSequenceThree {
          0%, 43% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
          49%, 63% { opacity: 1; transform: scale(1); filter: blur(0px); }
          66%, 100% { opacity: 0; transform: scale(0.85); filter: blur(4px); }
        }
        @keyframes textSequenceFour {
          0%, 66% { opacity: 0; transform: scale(0.82); filter: blur(4px); }
          72%, 93% { opacity: 1; transform: scale(1); filter: blur(0px); }
          96%, 100% { opacity: 0; transform: scale(0.82); filter: blur(4px); }
        }
        .animate-seq-1 { animation: textSequence 8s infinite ease-in-out; }
        .animate-seq-2 { animation: textSequenceTwo 8s infinite ease-in-out; }
        .animate-seq-3 { animation: textSequenceThree 8s infinite ease-in-out; }
        .animate-seq-4 { animation: textSequenceFour 8s infinite ease-in-out; }
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
          ease-[cubic-bezier(0.34,1.56,0.64,1)]
          hover:scale-110
          cursor-pointer
          select-none
          bg-transparent
          border-none
          outline-none
        "
      >
        {/* Hyper-Premium Ambient Cosmic Glow */}
        <div
          className="
            absolute
            inset-[-19px]
            rounded-full
            bg-gradient-to-tr
            from-cyan-500/20
            via-indigo-500/15
            to-purple-500/25
            dark:from-cyan-500/30
            dark:via-indigo-500/25
            dark:to-purple-500/35
            blur-xl
            opacity-80
            group-hover:opacity-100
            group-hover:scale-110
            transition-all
            duration-700
            mix-blend-multiply
            dark:mix-blend-screen
            pointer-events-none
          "
        />

        {/* Outer Ring 1 (Celestial Orbit) */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            border
            border-slate-300/40
            dark:border-cyan-400/30
            shadow-[0_0_12px_rgba(34,211,238,0.1)]
            group-hover:border-slate-400/60
            dark:group-hover:border-cyan-400/50
            transition-colors
            duration-500
          "
        />

        {/* Outer Ring 2 (Counter-Rotating Ring Decorative) */}
        <div
          className="
            absolute
            inset-[4px]
            rounded-full
            border
            border-slate-200/30
            dark:border-indigo-500/20
          "
        />

        {/* The Core Globe Glass Sphere */}
        <div
          className="
            relative
            w-[46px]
            h-[46px]
            rounded-full
            overflow-hidden
            border
            border-slate-300/50
            dark:border-white/20
            bg-gradient-to-b
            from-white
            via-slate-50
            to-slate-100
            dark:from-slate-900/90
            dark:dark:via-blue-950/95
            dark:to-neutral-950
            flex
            items-center
            justify-center
            backdrop-blur-xl
            transition-all
            duration-500
            shadow-[0_4px_12px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-4px_6px_rgba(0,0,0,0.05)]
            dark:shadow-[0_0_24px_rgba(59,130,246,0.3),inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-6px_10px_rgba(0,0,0,0.9),inset_0_0_10px_rgba(34,211,238,0.4)]
            group-hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]
            dark:group-hover:shadow-[0_0_32px_rgba(34,211,238,0.5),inset_0_2px_8px_rgba(255,255,255,0.4),inset_0_-3px_10px_rgba(0,0,0,0.7),inset_0_0_16px_rgba(147,51,234,0.5)]
            group-hover:border-slate-400/50
            dark:group-hover:border-white/30
          "
        >
          {/* Deep Cyber Matrix/Grid Layer for continuous rotating background texture */}
          <div
            className="
              absolute
              inset-0
              opacity-[0.15]
              dark:opacity-25
              bg-[linear-gradient(rgba(0,0,0,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.07)_1px,transparent_1px)]
              dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
              bg-[size:5px_5px]
              animate-[spin_30s_linear_infinite]
            "
          />

          {/* Dynamic Inner Atmospheric Aurora Bloom */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-gradient-to-tr
              from-emerald-500/5
              via-cyan-500/10
              to-purple-600/10
              dark:from-emerald-500/10
              dark:via-cyan-500/20
              dark:to-purple-600/30
              mix-blend-multiply
              dark:mix-blend-color-dodge
              animate-pulse
              duration-3000
            "
          />

          {/* 3D Curvature Top Specular Highlight (Glass Shine) */}
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
              dark:from-white/35
              to-transparent
              filter
              blur-[0.5px]
              z-20
              pointer-events-none
            "
          />

          {/* Rich Font Text Carousel Layer Container */}
          <div className="relative z-10 w-full h-full flex items-center justify-center font-sans tracking-tight select-none">
            {/* FIND */}
            <span className="animate-seq-1 absolute text-[10px] font-extrabold uppercase text-slate-700 dark:text-cyan-100">
              Find
            </span>

            {/* CONNECT */}
            <span className="animate-seq-2 absolute text-[9px] font-extrabold uppercase text-slate-700 dark:text-indigo-200">
              Connect
            </span>

            {/* GROW */}
            <span className="animate-seq-3 absolute text-[10px] font-extrabold uppercase text-slate-700 dark:text-purple-200">
              Grow
            </span>

            {/* STARVERSE */}
            <span className="animate-seq-4 absolute text-[7.5px] font-black uppercase tracking-wider bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]">
              Starverse
            </span>
          </div>

          {/* Subtle Under-icon Shimmer */}
          <div
            className="
              absolute
              w-5
              h-5
              rounded-full
              bg-cyan-400/10
              dark:bg-cyan-400/30
              blur-md
              z-0
            "
          />
        </div>

        {/* Adaptive Glassmorphic Tooltip */}
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
            duration-500
            ease-[cubic-bezier(0.34,1.56,0.64,1)]
            pointer-events-none
            bg-white/90
            dark:bg-slate-950/80
            backdrop-blur-xl
            border
            border-slate-200
            dark:border-white/10
            text-slate-800
            dark:text-cyan-100
            shadow-[0_8px_24px_rgba(0,0,0,0.08),0_0_12px_rgba(0,0,0,0.02)]
            dark:shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1),0_0_12px_rgba(34,211,238,0.1)]
            flex
            items-center
            gap-2
          "
        >
          <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-cyan-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Explore Starverse
          </span>
          <span className="text-xs filter drop-shadow-[0_0_2px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">🌍</span>
        </div>
      </button>
    </>
  );
};

export default StarverseFloatingButton;
