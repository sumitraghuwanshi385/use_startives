import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ArrowUpRight,
  Globe2,
  ShoppingBag,
  Trophy,
  Users,
  Rocket,
  TrendingUp,
  Star,
} from 'lucide-react';

interface EcosystemItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  glow: string;
  image?: string;
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
    title: 'Startverse',
    description:
      'A living space for founders, builders, ideas, conversations and opportunities — all connected in one universe.',
    icon: <Globe2 />,
    gradient: 'from-red-500 to-blue-500',
    glow: 'rgba(239,68,68,0.18)',
    image: '',
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
    title: 'Marketplace',
    description:
      'Discover products, services, talent and opportunities created by the Startives community.',
    icon: <ShoppingBag />,
    gradient: 'from-red-500 to-blue-500',
    glow: 'rgba(59,130,246,0.18)',
    image: '',
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
    title: 'Success Stories',
    description:
      'Real stories from people who started with an idea, found their people and turned momentum into progress.',
    icon: <Trophy />,
    gradient: 'from-red-500 to-blue-500',
    glow: 'rgba(239,68,68,0.18)',
    image: '',
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

const StartivesEcosystemSection: React.FC =
  () => {
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

              observer.unobserve(
                entry.target
              );
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
              top-[10%]
              left-1/2
              -translate-x-1/2
              w-[560px]
              h-[320px]
              rounded-full
              bg-gradient-to-r
              from-red-500/[0.055]
              via-transparent
              to-blue-500/[0.065]
              blur-[120px]
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
              bg-red-500/50
            "
          />

          <div
            className="
              absolute
              inset-0
              opacity-[0.022]
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

              <span className="text-black dark:text-white">
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
              Explore the spaces where ideas meet
              people, products find their audience,
              and builders turn momentum into
              something real.
            </p>

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
                      transitionDelay:
                        visible
                          ? `${180 + index * 120}ms`
                          : '0ms',
                    }}
                    onMouseEnter={() =>
                      setActiveCard(
                        item.id
                      )
                    }
                    onMouseLeave={() =>
                      setActiveCard(null)
                    }
                  >

                    {/* =================================
                        CARD OUTER GLOW
                    ================================= */}

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

                    {/* =================================
                        CARD
                    ================================= */}

                    <div
                      className="
                        relative
                        h-full
                        min-h-[520px]
                        sm:min-h-[535px]
                        rounded-[1.8rem]
                        overflow-hidden
                        border
                        border-neutral-200
                        dark:border-white/[0.12]
                        bg-white
                        dark:bg-black
                        transition-all
                        duration-500
                        group-hover:-translate-y-2
                        group-hover:border-neutral-300
                        dark:group-hover:border-white/20
                        shadow-[0_10px_40px_rgba(0,0,0,0.045)]
                        dark:shadow-none
                      "
                    >

                      {/* Soft card gradient */}

                      <div
                        className={`
                          absolute
                          inset-0
                          bg-gradient-to-br
                          ${item.gradient}
                          opacity-[0.025]
                          group-hover:opacity-[0.055]
                          transition-opacity
                          duration-500
                          pointer-events-none
                        `}
                      />

                      {/* Top highlight */}

                      <div
                        className="
                          absolute
                          top-0
                          left-[8%]
                          right-[8%]
                          h-px
                          bg-gradient-to-r
                          from-transparent
                          via-neutral-300
                          to-transparent
                          dark:via-white/20
                        "
                      />

                      <div
                        className="
                          relative
                          z-10
                          p-5
                          sm:p-6
                          h-full
                          flex
                          flex-col
                        "
                      >

                        {/* =================================
                            IMAGE AREA
                        ================================= */}

                        <div
                          className="
                            relative
                            w-full
                            h-[170px]
                            sm:h-[185px]
                            rounded-[1.25rem]
                            overflow-hidden
                            border
                            border-neutral-200
                            dark:border-white/10
                            bg-neutral-50
                            dark:bg-white/[0.025]
                            group/image
                          "
                        >

                          {/* Image */}

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title}
                              className="
                                absolute
                                inset-0
                                w-full
                                h-full
                                object-cover
                                transition-transform
                                duration-700
                                ease-out
                                group-hover:scale-[1.04]
                              "
                            />
                          ) : (
                            <div
                              className={`
                                absolute
                                inset-0
                                bg-gradient-to-br
                                ${item.gradient}
                                opacity-[0.08]
                              `}
                            >
                              <div
                                className="
                                  absolute
                                  inset-0
                                  flex
                                  items-center
                                  justify-center
                                "
                              >

                                <div
                                  className="
                                    w-16
                                    h-16
                                    rounded-2xl
                                    bg-white
                                    dark:bg-black
                                    border
                                    border-neutral-200
                                    dark:border-white/10
                                    flex
                                    items-center
                                    justify-center
                                    shadow-sm
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
                                          'w-7 h-7',
                                      }
                                    )}
                                  </span>

                                </div>

                              </div>
                            </div>
                          )}

                          {/* Image overlay */}

                          <div
                            className="
                              absolute
                              inset-0
                              bg-gradient-to-t
                              from-black/20
                              via-transparent
                              to-white/10
                              pointer-events-none
                            "
                          />

                          {/* Small image accent */}

                          <div
                            className={`
                              absolute
                              bottom-3
                              left-3
                              w-8
                              h-8
                              rounded-xl
                              bg-gradient-to-br
                              ${item.gradient}
                              flex
                              items-center
                              justify-center
                              shadow-lg
                              transition-transform
                              duration-500
                              group-hover:scale-110
                              group-hover:rotate-3
                            `}
                          >

                            {React.cloneElement(
                              item.icon as React.ReactElement,
                              {
                                className:
                                  'w-4 h-4 text-white',
                              }
                            )}

                          </div>

                        </div>

                        {/* =================================
                            TITLE AREA
                        ================================= */}

                        <div className="mt-6">

                          <h3
                            className="
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

                        {/* =================================
                            TAGS
                        ================================= */}

                        <div
                          className="
                            flex
                            flex-wrap
                            gap-2
                            mt-5
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

                        {/* =================================
                            BOTTOM
                        ================================= */}

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

                            {/* Stats */}

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

                            {/* Red → Blue Link */}

                            <a
                              href={item.to}
                              className={`
                                relative
                                flex
                                items-center
                                justify-center
                                w-10
                                h-10
                                rounded-full
                                bg-gradient-to-r
                                from-red-500
                                to-blue-500
                                text-white
                                overflow-hidden
                                transition-all
                                duration-300
                                hover:scale-110
                                shadow-[0_6px_20px_rgba(239,68,68,0.18)]
                                ${
                                  isActive
                                    ? 'scale-110'
                                    : ''
                                }
                              `}
                              aria-label={`Explore ${item.title}`}
                            >

                              <span
                                className="
                                  absolute
                                  inset-0
                                  bg-gradient-to-r
                                  from-white/0
                                  via-white/30
                                  to-white/0
                                  -translate-x-full
                                  group-hover:translate-x-full
                                  transition-transform
                                  duration-700
                                "
                              />

                              <ArrowUpRight
                                className="
                                  relative
                                  z-10
                                  w-4
                                  h-4
                                "
                              />

                            </a>

                          </div>

                        </div>

                      </div>

                      {/* Bottom animated glow */}

                      <div
                        className={`
                          absolute
                          bottom-[-55px]
                          left-1/2
                          -translate-x-1/2
                          w-52
                          h-24
                          rounded-full
                          bg-gradient-to-r
                          from-red-500
                          to-blue-500
                          blur-[55px]
                          opacity-[0.07]
                          group-hover:opacity-20
                          transition-opacity
                          duration-500
                          pointer-events-none
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
                    from-red-500
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
              animation:
                none !important;
            }

          }

        `}</style>

      </section>
    );
  };

export default StartivesEcosystemSection;