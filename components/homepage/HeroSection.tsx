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
        pt-6
        pb-24
        sm:pt-8
        sm:pb-32
        text-center
        px-4
      "
    >
      <div className="relative z-20 w-full">

        <div
          className="reveal-item is-visible"
          style={{
            transitionDelay: '0ms',
          }}
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              mb-4
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

        <div
          className="
            relative
            w-full
            flex
            justify-center
            items-center
            mt-0
            mb-2
            overflow-visible
            reveal-item
            is-visible
          "
          style={{
            transitionDelay: '60ms',
          }}
        >
          <div
            className="
              block
              dark:hidden
              w-full
              max-w-[1200px]
              overflow-visible
            "
          >
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787246334/Picsart_26-08-20_22-42-59-688_ysjeyl.jpg"
              alt={`${APP_NAME} builders community`}
              className="
                block
                w-full
                h-auto
                max-h-[306px]
                sm:max-h-[315px]
                md:max-h-[375px]
                object-contain
                object-center
                select-none
                origin-center
                scale-[0.85]
                sm:scale-[0.75]
              "
            />
          </div>

          <div
            className="
              hidden
              dark:block
              w-full
              max-w-[1200px]
              overflow-visible
            "
          >
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787246334/Picsart_26-08-20_22-48-26-542_ohsfkv.jpg"
              alt={`${APP_NAME} builders community`}
              className="
                block
                w-full
                h-auto
                max-h-[306px]
                sm:max-h-[315px]
                md:max-h-[375px]
                object-contain
                object-center
                select-none
                origin-center
                scale-[0.85]
                sm:scale-[0.75]
              "
            />
          </div>
        </div>

        <div
          className="reveal-item is-visible"
          style={{
            transitionDelay: '120ms',
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
            transitionDelay: '200ms',
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
            transitionDelay: '280ms',
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