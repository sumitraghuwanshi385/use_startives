import React from "react";
import { useNavigate } from "react-router-dom";
import { GlobeModernIcon } from "../constants";

const StarverseFloatingButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/starverse")}
      aria-label="Open Starverse"
      className="
        fixed
        right-5
        bottom-28
        z-[9999]
        group
        flex
        items-center
        justify-center
        w-16
        h-16
        rounded-full
        transition-all
        duration-500
        hover:scale-110
        active:scale-95
      "
    >
      {/* Big outer glow */}
      <div
        className="
          absolute
          inset-[-10px]
          rounded-full
          bg-gradient-to-r
          from-blue-500/20
          via-cyan-500/20
          to-purple-500/20
          blur-2xl
          animate-pulse
        "
      />

      {/* Orbit ring 1 */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-cyan-400/30
          animate-[spin_12s_linear_infinite]
        "
      />

      {/* Orbit ring 2 */}
      <div
        className="
          absolute
          inset-[5px]
          rounded-full
          border
          border-blue-500/25
          animate-[spin_8s_linear_infinite_reverse]
        "
      />

      {/* Orbit dot */}
      <div
        className="
          absolute
          w-2.5
          h-2.5
          rounded-full
          bg-cyan-400
          shadow-[0_0_20px_rgba(34,211,238,0.9)]
          animate-[spin_6s_linear_infinite]
        "
        style={{
          transformOrigin: "0px 30px",
        }}
      />

      {/* Earth */}
      <div
        className="
          relative
          w-14
          h-14
          rounded-full
          overflow-hidden
          backdrop-blur-2xl
          border
          border-white/15
          shadow-[0_0_35px_rgba(59,130,246,0.35)]
          bg-gradient-to-br
          from-slate-900
          via-blue-950
          to-cyan-950
          flex
          items-center
          justify-center
        "
      >
        {/* Inner glow */}
        <div
          className="
            absolute
            inset-0
            rounded-full
            bg-gradient-to-br
            from-cyan-500/15
            to-blue-500/15
          "
        />

        {/* Globe icon */}
        <GlobeModernIcon
          className="
            w-7
            h-7
            text-cyan-300
            relative
            z-10
            animate-pulse
            group-hover:text-white
            transition-colors
          "
        />

        {/* Shine */}
        <div
          className="
            absolute
            top-1
            left-2
            w-4
            h-4
            rounded-full
            bg-white/30
            blur-md
          "
        />
      </div>

      {/* Live badge */}
      <div
        className="
          absolute
          top-1
          right-1
          w-3
          h-3
          rounded-full
          bg-emerald-400
          border-2
          border-[var(--background-primary)]
          animate-pulse
        "
      />

      {/* Tooltip */}
      <div
        className="
          absolute
          right-[72px]
          whitespace-nowrap
          px-3
          py-1.5
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
          shadow-xl
        "
      >
        Explore Starverse 🌍
      </div>
    </button>
  );
};

export default StarverseFloatingButton;