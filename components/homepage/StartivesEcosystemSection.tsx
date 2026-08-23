import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

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
  eyebrow: string;
  description: string;

  icon: React.ReactNode;

  lightImage?: string;
  darkImage?: string;

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

    eyebrow: 'THE BUILDER NETWORK',

    description:
      'A living space for founders, builders, ideas, conversations and opportunities — all connected in one universe.',

    icon: <Globe2 />,

    lightImage:
      'https://res.cloudinary.com/dp7avkarg/image/upload/v1787500179/Picsart_26-08-23_21-17-30-836_puu54w.jpg',

    darkImage:
      'https://res.cloudinary.com/dp7avkarg/image/upload/v1787500238/Picsart_26-08-23_21-20-17-714_wgejty.jpg',

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

    to: '/signup',
  },

  {
    id: 'marketplace',

    title: 'Marketplace',

    eyebrow: 'BUY • SELL • EXPLORE',

    description:
      'Buy, sell, and explore SaaS products, digital products, services, talent, and opportunities built by the Startives community.',

    icon: <ShoppingBag />,

    lightImage:
      'https://res.cloudinary.com/dp7avkarg/image/upload/v1787505669/Picsart_26-08-23_22-43-41-657_loqlxz.jpg',

    darkImage:
      'https://res.cloudinary.com/dp7avkarg/image/upload/v1787505852/Picsart_26-08-23_22-53-53-209_kaiqk0.jpg',

    stats: [
      {
        value: '5+',
        label: 'Listings',
      },
      {
        value: 'Global',
        label: 'Reach',
      },
    ],

    tags: [
      'Buy',
      'Sell',
      'Explore',
    ],

    to: '/marketplace',
  },

  {
    id: 'success-stories',

    title: 'Success Stories',

    eyebrow: 'IN PARTNERSHIP WITH FAKEMAYO',

    description:
      'Real stories from people who started with an idea, found their people, and turned momentum into something real.',

    icon: <Trophy />,

    lightImage:
      'https://res.cloudinary.com/dp7avkarg/image/upload/v1787502383/Picsart_26-08-23_21-53-03-245_dwkjqj.jpg',

    darkImage:
      'https://res.cloudinary.com/dp7avkarg/image/upload/v1787502384/Picsart_26-08-23_21-55-14-929_qwkksq.jpg',

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

/* =========================================
   FLOATING BACKGROUND ORB
========================================= */

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

/* =========================================
   MAIN COMPONENT
========================================= */

const StartivesEcosystemSection: React.FC =
  () => {
    const sectionRef =
      useRef<HTMLElement | null>(null);

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
            SVG GRADIENT FOR LUCIDE ICONS
        ========================================= */}

        <svg
          width="0"
          height="0"
          className="absolute pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="ecosystem-icon-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#ef4444"
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
              />
            </linearGradient>
          </defs>
        </svg>

        {/* =========================================
            BACKGROUND
        ========================================= */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
          "
        >

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
              from-red-500/[0.05]
              via-transparent
              to-blue-500/[0.06]
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

        {/* =========================================
            CONTAINER
        ========================================= */}

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

              <span
                className="
                  text-black
                  dark:text-white
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
              Explore the spaces where ideas meet
              people, products find their audience,
              and builders turn momentum into
              something real.
            </p>

          </div>

          {/* =========================================
              THREE CARDS
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
              (item, index) => (
                <div
                  key={item.id}
                  className={`
                    ecosystem-card-wrap
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
                >

                  {/* =================================
                      SUBTLE RED → BLUE CARD SHADOW
                  ================================= */}

                  <div
                    className="
                      absolute
                      -inset-[5px]
                      rounded-[2rem]
                      bg-gradient-to-r
                      from-red-500
                      to-blue-500
                      opacity-0
                      blur-[18px]
                      transition-opacity
                      duration-500
                      group-hover:opacity-[0.13]
                      pointer-events-none
                    "
                  />

                  {/* =================================
                      CARD
                  ================================= */}

                  <div
                    className="
                      ecosystem-main-card
                      relative
                      h-full
                      min-h-0
                      rounded-[1.8rem]
                      overflow-hidden
                      border
                      border-neutral-200
                      dark:border-white/[0.12]
                      bg-white
                      dark:bg-black
                      shadow-[0_10px_40px_rgba(0,0,0,0.045)]
                      dark:shadow-none
                      transition-all
                      duration-500
                      ease-out
                      group-hover:-translate-y-[3px]
                    "
                  >

                    {/* Soft background */}

                    <div
                      className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-red-500/[0.025]
                        via-transparent
                        to-blue-500/[0.03]
                        pointer-events-none
                      "
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
                        flex
                        flex-col
                      "
                    >

                      {/* =================================
                          IMAGE PLACEHOLDER
                      ================================= */}

                      <div
                        className="
                          ecosystem-image
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
                          transition-transform
                          duration-500
                          ease-out
                          group-hover:scale-[1.012]
                        "
                      >

                        {/* LIGHT MODE IMAGE */}

                        {item.lightImage && (
                          <img
                            src={
                              item.lightImage
                            }
                            alt={
                              item.title
                            }
                            className="
                              absolute
                              inset-0
                              w-full
                              h-full
                              object-cover
                              object-center
                              block
                              dark:hidden
                            "
                          />
                        )}

                        {/* DARK MODE IMAGE */}

                        {item.darkImage && (
                          <img
                            src={
                              item.darkImage
                            }
                            alt={
                              item.title
                            }
                            className="
                              absolute
                              inset-0
                              w-full
                              h-full
                              object-cover
                              object-center
                              hidden
                              dark:block
                            "
                          />
                        )}

                        {/* Image overlay */}

                        <div
                          className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/20
                            via-transparent
                            to-white/5
                            pointer-events-none
                          "
                        />

                        {/* =================================
                            GLASS CIRCLE ICON
                            STATIC — NO HOVER
                        ================================= */}

                        <div
                          className="
                            absolute
                            bottom-3
                            left-3
                            w-11
                            h-11
                            rounded-full
                            border
                            border-white/70
                            dark:border-white/20
                            bg-white/45
                            dark:bg-black/35
                            backdrop-blur-2xl
                            backdrop-saturate-150
                            shadow-[inset_0_1px_1px_rgba(255,255,255,0.85),0_5px_18px_rgba(20,30,60,0.12)]
                            dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),0_5px_18px_rgba(0,0,0,0.28)]
                            flex
                            items-center
                            justify-center
                            z-20
                          "
                        >

                          <span
                            className="
                              flex
                              items-center
                              justify-center
                            "
                          >

                            {React.cloneElement(
                              item.icon as React.ReactElement,
                              {
                                className:
                                  'w-[19px] h-[19px]',
                                stroke:
                                  'url(#ecosystem-icon-gradient)',
                                fill:
                                  'none',
                              }
                            )}

                          </span>

                        </div>

                      </div>

                      {/* =================================
                          TITLE + EYEBROW
                      ================================= */}

                      <div className="mt-6">

                        <div
                          className="
                            text-[9px]
                            sm:text-[10px]
                            font-black
                            tracking-[0.16em]
                            text-neutral-400
                            dark:text-neutral-500
                          "
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

                      {/* =================================
                          TAG PILLS
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
                          STATS
                      ================================= */}

                      <div
                        className="
                          mt-3
                          pt-3
                          border-t
                          border-neutral-200
                          dark:border-white/[0.08]
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            justify-between
                          "
                        >

                          <div
                            className="
                              flex
                              gap-5
                            "
                          >

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
                                      leading-none
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
                                      mt-1
                                      text-[8px]
                                      font-bold
                                      uppercase
                                      tracking-wider
                                      leading-none
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

                          {/* CTA */}

                          <Link
                            to={item.to}
                            className="
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
                              transition-transform
                              duration-300
                              hover:scale-[1.03]
                            "
                            aria-label={`Explore ${item.title}`}
                          >

                            <ArrowUpRight
                              className="
                                w-4
                                h-4
                              "
                            />

                          </Link>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

          {/* =========================================
              BOTTOM STATEMENT
          ========================================= */}

          <div
            className="
              mt-12
              sm:mt-14
              text-center
            "
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

              <div
                className="
                  flex
                  -space-x-1.5
                "
              >

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
                  <Users
                    className="
                      w-3
                      h-3
                      text-white
                    "
                  />
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
                  <Rocket
                    className="
                      w-3
                      h-3
                      text-white
                    "
                  />
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
                  <TrendingUp
                    className="
                      w-3
                      h-3
                      text-white
                    "
                  />
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

                <span
                  className="
                    text-black
                    dark:text-white
                  "
                >
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

        {/* =========================================
            ANIMATION
        ========================================= */}

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

            .ecosystem-main-card,
            .ecosystem-image {
              transition:
                none !important;
            }

          }

        `}</style>

      </section>
    );
  };

export default StartivesEcosystemSection;