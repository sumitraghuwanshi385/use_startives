import React from "react";
import { useNavigate } from "react-router-dom";
// Note: Changed to Network icon for a clean, premium "Connecting / People / Globe" concept. 
// Swap with your specific design library import path if needed.
import { Network } from "lucide-react"; 

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
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
        active:scale-95
        cursor-pointer
        select-none
      "
    >
      {/* Hyper-Premium Ambient Cosmic Glow */}
      <div
        className="
          absolute
          inset-[-19px]
          rounded-full
          bg-gradient-to-tr
          from-cyan-500/30
          via-indigo-500/25
          to-purple-500/35
          blur-xl
          opacity-80
          group-hover:opacity-100
          group-hover:scale-110
          transition-all
          duration-700
          mix-blend-screen
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
          border-cyan-400/30
          shadow-[0_0_12px_rgba(34,211,238,0.15)]
          animate-[spin_20s_linear_infinite]
          group-hover:border-cyan-400/50
          transition-colors
          duration-500
        "
      />

      {/* Outer Ring 2 (Counter-Rotating Ring) */}
      <div
        className="
          absolute
          inset-[4px]
          rounded-full
          border
          border-indigo-500/20
          animate-[spin_12s_linear_infinite_reverse]
          group-hover:border-indigo-400/40
          transition-colors
          duration-500
        "
      />

      {/* Outer Ring 3 (Deep Space Faint Orbit) */}
      <div
        className="
          absolute
          inset-[-5px]
          rounded-full
          border
          border-purple-500/10
          animate-[spin_32s_linear_infinite]
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
          border-white/20
          bg-gradient-to-b
          from-slate-900/90
          via-blue-950/95
          to-neutral-950
          flex
          items-center
          justify-center
          backdrop-blur-xl
          transition-all
          duration-500
          shadow-[0_0_24px_rgba(59,130,246,0.3),inset_0_2px_6px_rgba(255,255,255,0.3),inset_0_-6px_10px_rgba(0,0,0,0.9),inset_0_0_10px_rgba(34,211,238,0.4)]
          group-hover:shadow-[0_0_32px_rgba(34,211,238,0.5),inset_0_2px_8px_rgba(255,255,255,0.4),inset_0_-3px_10px_rgba(0,0,0,0.7),inset_0_0_16px_rgba(147,51,234,0.5)]
          group-hover:border-white/30
        "
      >
        {/* Deep Cyber Matrix/Grid Layer for luxury 3D texture effect */}
        <div
          className="
            absolute
            inset-0
            opacity-25
            bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]
            bg-[size:5px_5px]
            animate-[spin_45s_linear_infinite]
          "
        />

        {/* Dynamic Inner Atmospheric Aurora Bloom */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-gradient-to-tr
            from-emerald-500/10
            via-cyan-500/20
            to-purple-600/30
            mix-blend-color-dodge
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
            from-white/35
            to-transparent
            filter
            blur-[0.5px]
            z-20
            pointer-events-none
          "
        />

        {/* Central Connecting Icon Element with Fluid Micro-Interactions */}
        <div
          className="
            relative
            z-10
            transform
            transition-all
            duration-700
            ease-[cubic-bezier(0.25,1,0.5,1)]
            group-hover:scale-105
            group-hover:rotate-[360deg]
            filter
            drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]
          "
        >
          <Network
            className="
              w-[24px]
              h-[24px]
              text-cyan-100
              group-hover:text-white
              transition-colors
              duration-500
            "
          />
        </div>

        {/* Subtle Under-icon Shimmer */}
        <div
          className="
            absolute
            w-5
            h-5
            rounded-full
            bg-cyan-400/30
            blur-md
            z-0
            group-hover:scale-150
            transition-transform
            duration-700
          "
        />
      </div>

      {/* Cyberpunk Glassmorphic Tooltip */}
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
          bg-slate-950/80
          backdrop-blur-xl
          border
          border-white/10
          text-cyan-100
          shadow-[0_8px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1),0_0_12px_rgba(34,211,238,0.1)]
          flex
          items-center
          gap-2
        "
      >
        <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent">
          Explore Starverse
        </span>
        <span className="text-xs filter drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">🌍</span>
      </div>
    </button>
  );
};

export default StarverseFloatingButton;
