import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Sparkles,
  Box,
  ArrowRight,
  Rocket,
} from 'lucide-react';

import { APP_NAME } from '../../constants';

const GradientButton: React.FC<{
  to?: string;
  href?: string;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}> = ({
  to,
  href,
  children,
  className = '',
  icon,
  type = 'button',
  onClick,
}) => {
  const btnRef = useRef<HTMLElement | null>(null);

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = btnRef.current;

      if (!el) return;

      const rect = el.getBoundingClientRect();

      el.style.setProperty(
        '--x',
        `${e.clientX - rect.left}px`
      );

      el.style.setProperty(
        '--y',
        `${e.clientY - rect.top}px`
      );
    },
    []
  );

  const commonClasses = `
    button-gradient
    magnetic-btn
    group
    relative
    inline-flex
    items-center
    justify-center
    overflow-hidden
    text-white
    font-semibold
    py-3
    px-8
    rounded-full
    text-base
    transition-transform
    duration-300
    ease-out
    hover:scale-[1.03]
    active:scale-[0.98]
    focus:outline-none
    focus:ring-4
    focus:ring-red-500/40
    ${className}
  `;

  const content = (
    <span className="relative z-10 flex items-center gap-2">
      {children}

      {icon && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          {icon}
        </span>
      )}
    </span>
  );

  if (to) {
    return (
      <Link
        ref={btnRef as any}
        to={to}
        onMouseMove={handleMove}
        className={commonClasses}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={btnRef as any}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMove}
        className={commonClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={btnRef as any}
      type={type}
      onMouseMove={handleMove}
      className={commonClasses}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section
      className="
        hero-section
        relative
        overflow-hidden
        bg-white
        dark:bg-black
        pt-24
        pb-24
        sm:pt-28
        sm:pb-32
        text-center
        px-4
      "
    >

      {/* =========================================
          LIGHT MODE BACKGROUND
      ========================================= */}

      <img
        src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787246334/Picsart_26-08-20_22-42-59-688_ysjeyl.jpg"
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          block
          dark:hidden
          w-full
          h-full
          object-cover
          object-center
          pointer-events-none
          select-none
        "
      />

      {/* =========================================
          DARK MODE BACKGROUND
      ========================================= */}

      <img
        src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787246334/Picsart_26-08-20_22-48-26-542_ohsfkv.jpg"
        alt=""
        aria-hidden="true"
        className="
          absolute
          inset-0
          z-0
          hidden
          dark:block
          w-full
          h-full
          object-cover
          object-center
          pointer-events-none
          select-none
        "
      />

      {/* =========================================
          SUBTLE READABILITY OVERLAY
          
          No gradients / blobs / dot effects.
          Just a very light overlay so text
          remains readable over the image.
      ========================================= */}

      <div
        className="
          absolute
          inset-0
          z-10
          pointer-events-none
          bg-white/20
          dark:bg-black/20
        "
      />

      {/* =========================================
          HERO CONTENT
      ========================================= */}

      <div className="relative z-20 max-w-4xl mx-auto">

        {/* =========================================
            ONBOARDING PILL
            Moved ~10% lower
        ========================================= */}

        <div
          className="reveal-item is-visible"
          style={{
            transitionDelay: '80ms',
          }}
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              mb-8
              mt-[10%]
              px-4
              py-1.5
              rounded-full
              border
              border-neutral-200
              dark:border-white/15
              bg-white
              dark:bg-black
              text-xs
              font-semibold
              text-neutral-700
              dark:text-neutral-300
              font-poppins
              shadow-sm
            "
          >
            <Rocket className="w-3.5 h-3.5 text-red-500" />

            Now onboarding builders worldwide
          </div>
        </div>

        {/* =========================================
            HEADING + DESCRIPTION
        ========================================= */}

        <div
          className="reveal-item is-visible"
          style={{
            transitionDelay: '160ms',
          }}
        >
          <h1
            className="
              text-5xl
              md:text-7xl
              font-extrabold
              tracking-tighter
              text-black
              dark:text-white
              font-poppins
            "
          >
            Where visionaries &
            <br />

            <span className="bg-gradient-to-r from-red-500 to-blue-500 gradient-text">
              builders connect
            </span>
          </h1>

          <p
            className="
              mt-6
              text-lg
              md:text-xl
              text-neutral-600
              dark:text-neutral-400
              max-w-2xl
              mx-auto
              font-medium
              font-poppins
            "
          >
            {APP_NAME} is your launchpad
            for turning visionary ideas into
            reality. Connect with co-founders,
            assemble your dream team, and build
            the future, together.
          </p>
        </div>

        {/* =========================================
            CTA
        ========================================= */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-4
            reveal-item
            is-visible
          "
          style={{
            transitionDelay: '240ms',
          }}
        >
          <GradientButton
            to="/signup"
            icon={
              <ArrowRight className="w-4 h-4" />
            }
          >
            Join the future
          </GradientButton>
        </div>

        {/* =========================================
            BENEFITS
        ========================================= */}

        <div
          className="
            mt-10
            flex
            items-center
            justify-center
            gap-x-6
            gap-y-2
            flex-wrap
            text-sm
            text-neutral-600
            dark:text-neutral-400
            reveal-item
            is-visible
          "
          style={{
            transitionDelay: '320ms',
          }}
        >

          <span className="flex items-center gap-1.5">
            <div
              className="
                w-4
                h-4
                rounded-full
                icon-bg-gradient
                flex
                items-center
                justify-center
              "
            >
              <Users className="w-2.5 h-2.5 text-white" />
            </div>

            Find co-founders
          </span>

          <span
            className="
              hidden
              sm:inline
              text-neutral-400
              dark:text-neutral-600
            "
          >
            •
          </span>

          <span className="flex items-center gap-1.5">
            <div
              className="
                w-4
                h-4
                rounded-full
                icon-bg-gradient
                flex
                items-center
                justify-center
              "
            >
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>

            Validate ideas
          </span>

          <span
            className="
              hidden
              sm:inline
              text-neutral-400
              dark:text-neutral-600
            "
          >
            •
          </span>

          <span className="flex items-center gap-1.5">
            <div
              className="
                w-4
                h-4
                rounded-full
                icon-bg-gradient
                flex
                items-center
                justify-center
              "
            >
              <Box className="w-2.5 h-2.5 text-white" />
            </div>

            Assemble teams
          </span>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;