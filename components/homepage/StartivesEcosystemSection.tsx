import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Globe2,
  ShoppingBag,
  Trophy,
  Users,
  Sparkles,
  Rocket,
  Star,
  TrendingUp,
} from 'lucide-react';

interface EcosystemItem {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
  stats: {
    value: string;
    label: string;
  }[];
  tags: string[];
  to: string;
}

const ecosystemItems: EcosystemItem[] = [
  {
    id: 'startverse',
    number: '01',
    title: 'Startverse',
    eyebrow: 'THE BUILDER UNIVERSE',
    description:
      'A living space for founders, builders, ideas, conversations and opportunities — all connected in one universe.',
    icon: <Globe2 />,
    gradient: 'from-red-500 via-purple-500 to-blue-500',
    glow: 'rgba(168,85,247,0.25)',
    stats: [
      {
        value: '∞',
        label: 'Connections',
      },
      {
        value: '24/7',
        label: 'Building',
      },
    ],
    tags: [
      'Builders',
      'Founders',
      'Communities',
    ],
    to: '/startverse',
  },
  {
    id: 'marketplace',
    number: '02',
    title: 'Marketplace',
    eyebrow: 'BUILD • BUY • COLLABORATE',
    description:
      'Discover products, services, talent and opportunities created by the Startives community.',
    icon: <ShoppingBag />,
    gradient: 'from-blue-500 via-purple-500 to-red-500',
    glow: 'rgba(59,130,246,0.25)',
    stats: [
      {
        value: '100+',
        label: 'Listings',
      },
      {
        value: 'Global',
        label: 'Reach',
      },
    ],
    tags: [
      'Products',
      'Services',
      'Talent',
    ],
    to: '/marketplace',
  },
  {
    id: 'success-stories',
    number: '03',
    title: 'Success Stories',
    eyebrow: 'FROM IDEA TO IMPACT',
    description:
      'Real stories from people who started with an idea, found their people and turned momentum into progress.',
    icon: <Trophy />,
    gradient: 'from-orange-400 via-red-500 to-purple-500',
    glow: 'rgba(239,68,68,0.22)',
    stats: [
      {
        value: '50+',
        label: 'Stories',
      },
      {
        value: '∞',
        label: 'Possibility',
      },
    ],
    tags: [
      'Founders',
      'Milestones',
      'Wins',
    ],
    to: '/success-stories',
  },
];

const FloatingOrb: React.FC<{
  className?: string;
  delay?: number;
}> = ({
  className = '',
  delay = 0,
}) => {
  return (
    <div
      className={`
        absolute
        rounded-full
        pointer-events-none
        animate-ecosystem-float
        ${className}
      `}
      style={{
        animationDelay: `${delay}s`,
      }}
    />
  );
};

const StartivesEcosystemSection: React.FC = () => {
  const sectionRef =
    useRef<HTMLElement | null>(null);

  const [activeCard, setActiveCard] =
    useState<string | null>(null);

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    const node = sectionRef.current;

    if (!node) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          threshold: 0.12,
        }
      );

    observer.observe(node);

    return () =>
      observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        overflow-hidden
        bg-white
        dark:bg-black
        py-20
        sm:py-24
        lg:py-28
        font-poppins
      "
    >
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="absolute inset-0 pointer-events-none">

        <div
          className="
            absolute
            top-[12%]
            left-1/2
            -translate-x-1/2
            w-[500px]
            h-[300px]
            rounded-full
            bg-gradient-to-r
            from-red-500/[0.06]
            via-purple-500/[0.08]
            to-blue-500/[0.06]
            blur-[110px]
          "
        />

        <FloatingOrb
          delay={0}
          className="
            top-[18%]
            left-[8%]
            w-2
            h-2
            bg-red-500/50
            blur-[1px]
          "
        />

        <FloatingOrb
          delay={1.5}
          className="
            top-[35%]
            right-[10%]
            w-1.5
            h-1.5
            bg-blue-500/60
          "
        />

        <FloatingOrb
          delay={3}
          className="
            bottom-[18%]
            left-[18%]
            w-1.5
            h-1.5
            bg-purple-500/60
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            dark:opacity-[0.035]
            bg-[radial-gradient(circle_at_1px_1px,currentColor_1px,transparent_0)]
            [background-size:24px_24px]
          "
        />

      </div>

      <div
        className="
          relative
          z-10
          container
          mx-auto
          px-4
          sm:px-6
          lg:px-8
          max-w-7xl
        "
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <div
          className={`
            text-center
            max-w-3xl
            mx-auto
            mb-14
            sm:mb-16
            transition-all
            duration-1000
            ease-[cubic-bezier(0.16,1,0.3,1)]
            ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }
          `}
        >

          <div
            className="
              inline-flex
              items-center
              gap-2
              px-3.5
              py-1.5
              mb-5
              rounded-full
              border
              border-neutral-200
              dark:border-white/10
              bg-white/80
              dark:bg-white/[0.035]
              backdrop-blur-xl
              text-[10px]
              sm:text-[11px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-neutral-600
              dark:text-neutral-400
            "
          >
            <Sparkles
              className="
                w-3.5
                h-3.5
                text-red-500
              "
            />

            The Startives ecosystem
          </div>

          <h2
            className="
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-black
              tracking-[-0.055em]
              leading-[0.95]
              text-black
              dark:text-white
            "
          >
            More than a platform.
            <br />

            <span
              className="
                bg-gradient-to-r
                from-red-500
                via-purple-500
                to-blue-500
                bg-clip-text
                text-transparent
              "
            >
              A universe for builders.
            </span>
          </h2>

          <p
            className="
              mt-6
              text-sm
              sm:text-base
              lg:text-[17px]
              leading-relaxed
              font-medium
              text-neutral-600
              dark:text-neutral-400
              max-w-2xl
              mx-auto
            "
          >
            Explore the spaces where ideas meet people,
            products find their audience, and builders
            turn momentum into something real.
          </p>

        </div>

        {/* =========================================
            CONNECTION LINE
        ========================================= */}

        <div
          className="
            hidden
            lg:block
            absolute
            top-[360px]
            left-[18%]
            right-[18%]
            h-px
            pointer-events-none
          "
        >
          <div
            className="
              h-full
              bg-gradient-to-r
              from-transparent
              via-purple-500/20
              to-transparent
            "
          />

          <div
            className="
              absolute
              top-1/2
              left-[16.66%]
              -translate-y-1/2
              w-2
              h-2
              rounded-full
              bg-red-500
              shadow-[0_0_18px_rgba(239,68,68,0.7)]
            "
          />

          <div
            className="
              absolute
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              w-2
              h-2
              rounded-full
              bg-purple-500
              shadow-[0_0_18px_rgba(168,85,247,0.7)]
            "
          />

          <div
            className="
              absolute
              top-1/2
              right-[16.66%]
              -translate-y-1/2
              w-2
              h-2
              rounded-full
              bg-blue-500
              shadow-[0_0_18px_rgba(59,130,246,0.7)]
            "
          />
        </div>

        {/* =========================================
            THREE ECOSYSTEM CARDS
        ========================================= */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-5
            lg:gap-6
          "
        >

          {ecosystemItems.map(
            (item, index) => {
              const isActive =
                activeCard === item.id;

              return (
                <div
                  key={item.id}
                  className={`
                    group
                    relative
                    transition-all
                    duration-1000
                    ease-[cubic-bezier(0.16,1,0.3,1)]
                    ${
                      visible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-12'
                    }
                  `}
                  style={{
                    transitionDelay: visible
                      ? `${180 + index * 120}ms`
                      : '0ms',
                  }}
                  onMouseEnter={() =>
                    setActiveCard(item.id)
                  }
                  onMouseLeave={() =>
                    setActiveCard(null)
                  }
                >

                  {/* Glow */}

                  <div
                    className="
                      absolute
                      -inset-1
                      rounded-[2rem]
                      opacity-0
                      blur-2xl
                      transition-opacity
                      duration-500
                      group-hover:opacity-100
                    "
                    style={{
                      background:
                        item.glow,
                    }}
                  />

                  {/* Card */}

                  <div
                    className="
                      relative
                      h-full
                      min-h-[410px]
                      sm:min-h-[430px]
                      rounded-[1.8rem]
                      overflow-hidden
                      border
                      border-neutral-200
                      dark:border-white/[0.12]
                      bg-white/80
                      dark:bg-white/[0.035]
                      backdrop-blur-2xl
                      transition-all
                      duration-500
                      group-hover:-translate-y-2
                      group-hover:border-neutral-300
                      dark:group-hover:border-white/20
                      shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                      dark:shadow-none
                    "
                  >

                    {/* Gradient wash */}

                    <div
                      className={`
                        absolute
                        inset-0
                        bg-gradient-to-br
                        ${item.gradient}
                        opacity-[0.035]
                        group-hover:opacity-[0.075]
                        transition-opacity
                        duration-500
                      `}
                    />

                    {/* Top shine */}

                    <div
                      className="
                        absolute
                        top-0
                        left-[8%]
                        right-[8%]
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white
                        to-transparent
                        opacity-80
                      "
                    />

                    {/* Number */}

                    <div
                      className="
                        absolute
                        top-5
                        right-6
                        text-[11px]
                        font-black
                        tracking-[0.18em]
                        text-neutral-300
                        dark:text-white/15
                        transition-colors
                        duration-300
                        group-hover:text-neutral-400
                        dark:group-hover:text-white/25
                      "
                    >
                      {item.number}
                    </div>

                    <div className="relative z-10 p-6 sm:p-7 h-full flex flex-col">

                      {/* Icon */}

                      <div className="flex items-center justify-between">

                        <div
                          className={`
                            relative
                            w-14
                            h-14
                            rounded-2xl
                            bg-gradient-to-br
                            ${item.gradient}
                            p-[1px]
                            transition-transform
                            duration-500
                            group-hover:scale-105
                            group-hover:rotate-2
                          `}
                        >

                          <div
                            className="
                              absolute
                              inset-0
                              rounded-2xl
                              bg-white
                              dark:bg-neutral-950
                              opacity-90
                            "
                          />

                          <div
                            className="
                              relative
                              z-10
                              w-full
                              h-full
                              rounded-2xl
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <span
                              className={`
                                bg-gradient-to-br
                                ${item.gradient}
                                bg-clip-text
                                text-transparent
                              `}
                            >
                              {React.cloneElement(
                                item.icon as React.ReactElement,
                                {
                                  className:
                                    'w-6 h-6',
                                }
                              )}
                            </span>

                          </div>

                        </div>

                        <ArrowUpRight
                          className="
                            w-5
                            h-5
                            text-neutral-300
                            dark:text-neutral-600
                            transition-all
                            duration-300
                            group-hover:text-neutral-700
                            dark:group-hover:text-white
                            group-hover:translate-x-0.5
                            group-hover:-translate-y-0.5
                          "
                        />

                      </div>

                      {/* Text */}

                      <div className="mt-8">

                        <div
                          className={`
                            text-[9px]
                            sm:text-[10px]
                            font-black
                            tracking-[0.18em]
                            bg-gradient-to-r
                            ${item.gradient}
                            bg-clip-text
                            text-transparent
                          `}
                        >
                          {item.eyebrow}
                        </div>

                        <h3
                          className="
                            mt-2
                            text-2xl
                            sm:text-[27px]
                            font-black
                            tracking-tight
                            text-black
                            dark:text-white
                          "
                        >
                          {item.title}
                        </h3>

                        <p
                          className="
                            mt-3
                            text-[12px]
                            sm:text-[13px]
                            leading-[1.65]
                            font-medium
                            text-neutral-600
                            dark:text-neutral-400
                          "
                        >
                          {item.description}
                        </p>

                      </div>

                      {/* Tags */}

                      <div
                        className="
                          flex
                          flex-wrap
                          gap-2
                          mt-6
                        "
                      >
                        {item.tags.map(
                          (tag) => (
                            <span
                              key={tag}
                              className="
                                px-2.5
                                py-1
                                rounded-full
                                border
                                border-neutral-200
                                dark:border-white/10
                                bg-neutral-50
                                dark:bg-white/[0.035]
                                text-[9px]
                                font-bold
                                text-neutral-600
                                dark:text-neutral-400
                              "
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>

                      {/* Bottom */}

                      <div
                        className="
                          mt-auto
                          pt-6
                        "
                      >

                        <div
                          className="
                            flex
                            items-end
                            justify-between
                            border-t
                            border-neutral-200
                            dark:border-white/[0.08]
                            pt-5
                          "
                        >

                          <div className="flex gap-5">

                            {item.stats.map(
                              (stat) => (
                                <div
                                  key={
                                    stat.label
                                  }
                                >
                                  <div
                                    className="
                                      text-sm
                                      font-black
                                      text-black
                                      dark:text-white
                                    "
                                  >
                                    {
                                      stat.value
                                    }
                                  </div>

                                  <div
                                    className="
                                      mt-0.5
                                      text-[8px]
                                      font-bold
                                      uppercase
                                      tracking-wider
                                      text-neutral-400
                                    "
                                  >
                                    {
                                      stat.label
                                    }
                                  </div>
                                </div>
                              )
                            )}

                          </div>

                          <a
                            href={item.to}
                            className={`
                              flex
                              items-center
                              justify-center
                              w-9
                              h-9
                              rounded-full
                              bg-gradient-to-br
                              ${item.gradient}
                              text-white
                              transition-all
                              duration-300
                              ${
                                isActive
                                  ? 'scale-110'
                                  : ''
                              }
                            `}
                            aria-label={`Explore ${item.title}`}
                          >
                            <ArrowUpRight
                              className="
                                w-4
                                h-4
                              "
                            />
                          </a>

                        </div>

                      </div>

                    </div>

                    {/* Animated bottom glow */}

                    <div
                      className={`
                        absolute
                        bottom-[-50px]
                        left-1/2
                        -translate-x-1/2
                        w-48
                        h-24
                        rounded-full
                        bg-gradient-to-r
                        ${item.gradient}
                        blur-[50px]
                        opacity-10
                        group-hover:opacity-25
                        transition-opacity
                        duration-500
                      `}
                    />

                  </div>
                </div>
              );
            }
          )}

        </div>

        {/* =========================================
            BOTTOM STATEMENT
        ========================================= */}

        <div
          className={`
            mt-12
            sm:mt-14
            text-center
            transition-all
            duration-1000
            delay-[600ms]
            ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }
          `}
        >

          <div
            className="
              inline-flex
              items-center
              gap-3
              px-4
              py-2.5
              rounded-full
              border
              border-neutral-200
              dark:border-white/10
              bg-white/70
              dark:bg-white/[0.03]
              backdrop-blur-xl
            "
          >

            <div className="flex -space-x-1.5">

              <div
                className="
                  w-6
                  h-6
                  rounded-full
                  border-2
                  border-white
                  dark:border-black
                  bg-gradient-to-br
                  from-red-400
                  to-orange-400
                  flex
                  items-center
                  justify-center
                "
              >
                <Users className="w-3 h-3 text-white" />
              </div>

              <div
                className="
                  w-6
                  h-6
                  rounded-full
                  border-2
                  border-white
                  dark:border-black
                  bg-gradient-to-br
                  from-purple-400
                  to-blue-500
                  flex
                  items-center
                  justify-center
                "
              >
                <Rocket className="w-3 h-3 text-white" />
              </div>

              <div
                className="
                  w-6
                  h-6
                  rounded-full
                  border-2
                  border-white
                  dark:border-black
                  bg-gradient-to-br
                  from-blue-400
                  to-cyan-400
                  flex
                  items-center
                  justify-center
                "
              >
                <TrendingUp className="w-3 h-3 text-white" />
              </div>

            </div>

            <span
              className="
                text-[10px]
                sm:text-[11px]
                font-bold
                text-neutral-600
                dark:text-neutral-400
              "
            >
              One ecosystem.
              <span className="text-black dark:text-white">
                {' '}
                Infinite possibilities.
              </span>
            </span>

            <Star
              className="
                w-3.5
                h-3.5
                text-yellow-400
                fill-current
              "
            />

          </div>

        </div>

      </div>

      <style>{`

        @keyframes ecosystem-float {
          0%,
          100% {
            transform:
              translate3d(0, 0, 0);
          }

          50% {
            transform:
              translate3d(10px, -16px, 0);
          }
        }

        .animate-ecosystem-float {
          animation:
            ecosystem-float
            5s
            ease-in-out
            infinite;
        }

        @media (
          prefers-reduced-motion: reduce
        ) {
          .animate-ecosystem-float {
            animation: none !important;
          }
        }

      `}</style>
    </section>
  );
};

export default StartivesEcosystemSection;