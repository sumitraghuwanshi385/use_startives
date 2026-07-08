import React from "react";
import { useNavigate } from "react-router-dom";
import { GlobeModernIcon } from "../constants";

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/globe")}
      aria-label="Open Starverse"
      className="
        fixed
        right-5
        bottom-[140px]
        z-[9999]
        group
        flex
        items-center
        justify-center
        w-[72px]
        h-[72px]
        rounded-full
        transition-all
        duration-500
        hover:scale-110
        active:scale-95
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-[-18px]
          rounded-full
          bg-gradient-to-r
          from-cyan-500/25
          via-blue-500/20
          to-purple-500/25
          blur-3xl
          animate-pulse
        "
      />

      {/* Ring 1 */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-cyan-400/40
          animate-[spin_14s_linear_infinite]
        "
      />

      {/* Ring 2 */}
      <div
        className="
          absolute
          inset-[6px]
          rounded-full
          border
          border-blue-500/30
          animate-[spin_10s_linear_infinite_reverse]
        "
      />

      {/* Ring 3 */}
      <div
        className="
          absolute
          inset-[-6px]
          rounded-full
          border
          border-purple-500/20
          animate-[spin_20s_linear_infinite]
        "
      />

      {/* Orbit dot */}
      <div
        className="
          absolute
          top-0
          left-1/2
          w-3
          h-3
          rounded-full
          bg-cyan-400
          shadow-[0_0_20px_rgba(34,211,238,0.9)]
          animate-pulse
        "
      />

      {/* Earth */}
      <div
        className="
          relative
          w-[58px]
          h-[58px]
          rounded-full
          overflow-hidden
          border
          border-white/15
          shadow-[0_0_40px_rgba(59,130,246,0.45)]
          bg-gradient-to-br
          from-slate-900
          via-blue-950
          to-cyan-950
          flex
          items-center
          justify-center
          backdrop-blur-2xl
        "
      >
        {/* Animated ocean */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-gradient-to-br
            from-cyan-500/20
            via-blue-500/15
            to-purple-500/15
            animate-pulse
          "
        />

        {/* Glow */}
        <div
          className="
            absolute
            w-10
            h-10
            rounded-full
            bg-cyan-400/20
            blur-xl
          "
        />

        <GlobeModernIcon
          className="
            w-8
            h-8
            text-cyan-200
            relative
            z-10
            group-hover:rotate-12
            transition-all
            duration-500
          "
        />

        {/* Shine */}
        <div
          className="
            absolute
            top-1
            left-2
            w-5
            h-5
            rounded-full
            bg-white/30
            blur-md
          "
        />
      </div>

      {/* Live Badge */}
      <div
        className="
          absolute
          top-0
          right-0
          w-4
          h-4
          rounded-full
          bg-emerald-400
          border-2
          border-black
          animate-pulse
        "
      />

      {/* Tooltip */}
      <div
        className="
          absolute
          right-[88px]
          whitespace-nowrap
          px-3
          py-2
          rounded-full
          text-xs
          font-semibold
          opacity-0
          translate-x-2
          group-hover:opacity-100
          group-hover:translate-x-0
          transition-all
          duration-300
          pointer-events-none
          bg-[var(--component-background)]
          border
          border-[var(--border-primary)]
          text-[var(--text-primary)]
          shadow-2xl
        "
      >
        Explore Starverse 🌍
      </div>
    </button>
  );
};

export default StarverseFloatingButton;