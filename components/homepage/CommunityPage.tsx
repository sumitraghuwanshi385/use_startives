import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { Star, Users, Sparkles } from 'lucide-react';
import { APP_NAME } from '../constants';

function useInView<T extends HTMLElement>(
  threshold = 0.15
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold }
      );

    observer.observe(node);

    return () => observer.disconnect();
  }, [threshold]);

  return {
    ref,
    inView,
  };
}

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({
  children,
  delay = 0,
  className = '',
}) => {
  const { ref, inView } =
    useInView<HTMLDivElement>(0.15);

  return (
    <div
      ref={ref}
      className={`
        reveal-item
        ${inView ? 'is-visible' : ''}
        ${className}
      `}
      style={{
        transitionDelay: inView
          ? `${delay}ms`
          : '0ms',
      }}
    >
      {children}
    </div>
  );
};

const testimonials = [
  {
    name: 'Prince',
    role: 'Founder, Apives',
    quote: `Within a week, I connected with two incredible developers on ${APP_NAME}. It's a game-changer for early-stage founders.`,
  },
  {
    name: 'Sumit',
    role: 'UX Designer',
    quote:
      'I was looking to join an exciting project and found the perfect fit here. The quality of ideas is amazing.',
  },
  {
    name: 'Sonali Jaiswal',
    role: 'Full-Stack Developer',
    quote:
      'As a developer, this platform is a goldmine. I get to work on innovative projects and build my portfolio.',
  },
];

const CommunityPage: React.FC = () => {
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
  ];

  return (
    <div
      className="
        min-h-screen
        w-full
        overflow-x-hidden
        bg-white
        dark:bg-black
        text-black
        dark:text-white
        font-poppins
      "
    >
      {/* =====================================================
          HERO / HEADER
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          py-14
          sm:py-18
          md:py-24
          bg-white
          dark:bg-black
        "
      >
        {/* BACKGROUND GLOWS */}

        <div
          className="
            absolute
            inset-0
            pointer-events-none
            overflow-hidden
          "
        >
          <div
            className="
              absolute
              -top-56
              left-1/2
              -translate-x-1/2
              w-[650px]
              h-[650px]
              rounded-full
              bg-gradient-to-br
              from-red-500
              via-purple-500
              to-blue-500
              opacity-[0.06]
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -left-32
              top-[45%]
              w-72
              h-72
              rounded-full
              bg-red-500/[0.035]
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -right-32
              top-[35%]
              w-72
              h-72
              rounded-full
              bg-blue-500/[0.035]
              blur-3xl
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
            max-w-7xl
          "
        >
          {/* TOP PILL */}

          <Reveal className="flex justify-center">
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-neutral-200
                dark:border-white/15
                bg-white/70
                dark:bg-black/70
                backdrop-blur-xl
              "
            >
              <span
                className="
                  flex
                  items-center
                  justify-center
                  w-5
                  h-5
                  rounded-full
                  bg-gradient-to-br
                  from-red-500
                  to-blue-500
                  text-white
                "
              >
                <Users
                  className="w-3 h-3"
                  strokeWidth={2.5}
                />
              </span>

              <span
                className="
                  text-[9px]
                  sm:text-[10px]
                  uppercase
                  tracking-[0.2em]
                  font-black
                  bg-gradient-to-r
                  from-red-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                Our Community
              </span>
            </div>
          </Reveal>

          {/* HEADING */}

          <Reveal
            className="text-center mt-6"
            delay={70}
          >
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-7xl
                font-black
                tracking-[-0.045em]
                leading-[0.95]
              "
            >
              From our{' '}
              <span
                className="
                  bg-gradient-to-r
                  from-red-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                community.
              </span>
            </h1>
          </Reveal>

          {/* DESCRIPTION */}

          <Reveal
            className="text-center mt-4"
            delay={120}
          >
            <p
              className="
                text-sm
                sm:text-base
                md:text-lg
                text-neutral-600
                dark:text-neutral-400
                max-w-2xl
                mx-auto
                leading-relaxed
                font-medium
              "
            >
              Innovators are building,
              connecting, and succeeding on{' '}
              {APP_NAME}.
            </p>
          </Reveal>

          {/* SMALL STATS */}

          <Reveal
            className="
              flex
              items-center
              justify-center
              gap-3
              flex-wrap
              mt-7
            "
            delay={170}
          >
            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-neutral-200
                dark:border-white/15
                bg-white
                dark:bg-black
              "
            >
              <Star
                className="
                  w-3.5
                  h-3.5
                  text-yellow-400
                  fill-current
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  text-neutral-600
                  dark:text-neutral-400
                "
              >
                Builder experiences
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-neutral-200
                dark:border-white/15
                bg-white
                dark:bg-black
              "
            >
              <Sparkles
                className="
                  w-3.5
                  h-3.5
                  text-purple-500
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  text-neutral-600
                  dark:text-neutral-400
                "
              >
                Real builders
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ====================================================== */}

      <section
        className="
          relative
          overflow-hidden
          pb-16
          sm:pb-20
          md:pb-24
          bg-white
          dark:bg-black
        "
      >
        <div
          className="
            container
            mx-auto
            px-4
            max-w-7xl
          "
        >
          <Reveal className="text-center mb-8">
            <h2
              className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-extrabold
                text-black
                dark:text-white
                tracking-tight
                font-poppins
                uppercase
              "
            >
              What builders say
            </h2>

            <p
              className="
                text-neutral-600
                dark:text-neutral-400
                mt-2
                max-w-2xl
                mx-auto
                text-xs
                sm:text-sm
                leading-relaxed
                font-medium
              "
            >
              Real experiences from founders,
              designers, developers, and builders
              inside the Startives ecosystem.
            </p>
          </Reveal>

          {/* MARQUEE */}

          <Reveal delay={100}>
            <div
              className="
                relative
                w-full
                overflow-hidden
                community-marquee
              "
            >
              {/* LEFT FADE */}

              <div
                className="
                  absolute
                  left-0
                  top-0
                  bottom-0
                  w-16
                  sm:w-28
                  z-20
                  pointer-events-none
                  bg-gradient-to-r
                  from-white
                  dark:from-black
                  to-transparent
                "
              />

              {/* RIGHT FADE */}

              <div
                className="
                  absolute
                  right-0
                  top-0
                  bottom-0
                  w-16
                  sm:w-28
                  z-20
                  pointer-events-none
                  bg-gradient-to-l
                  from-white
                  dark:from-black
                  to-transparent
                "
              />

              <div
                className="
                  flex
                  animate-community-marquee
                  gap-6
                  sm:gap-8
                  w-max
                "
              >
                {duplicatedTestimonials.map(
                  (
                    testimonial,
                    index
                  ) => (
                    <div
                      key={`${testimonial.name}-${index}`}
                      className="
                        flex-shrink-0
                        w-[82vw]
                        sm:w-[390px]
                        md:w-[420px]
                      "
                    >
                      <div
                        className="
                          p-5
                          sm:p-6
                          bg-white
                          dark:bg-black
                          rounded-2xl
                          border
                          border-neutral-200
                          dark:border-white/15
                          flex
                          flex-col
                          space-y-4
                          min-h-[230px]
                          transition-all
                          duration-300
                          hover:-translate-y-1
                          hover:border-purple-500/20
                          relative
                          overflow-hidden
                          font-poppins
                        "
                      >
                        {/* DECORATIVE IMAGE */}

                        <img
                          src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
                          alt=""
                          aria-hidden="true"
                          className="
                            absolute
                            -top-4
                            -right-4
                            w-24
                            h-24
                            opacity-5
                            pointer-events-none
                          "
                        />

                        {/* STARS */}

                        <div
                          className="
                            flex
                            justify-between
                            items-center
                            z-10
                          "
                        >
                          <div
                            className="
                              flex
                              space-x-0.5
                              text-yellow-400
                            "
                          >
                            {Array.from({
                              length: 5,
                            }).map(
                              (_, starIndex) => (
                                <Star
                                  key={
                                    starIndex
                                  }
                                  className="
                                    w-4
                                    h-4
                                    fill-current
                                  "
                                />
                              )
                            )}
                          </div>

                          <span
                            className="
                              text-[9px]
                              uppercase
                              tracking-widest
                              font-bold
                              text-neutral-400
                              dark:text-neutral-600
                            "
                          >
                            Verified builder
                          </span>
                        </div>

                        {/* QUOTE */}

                        <p
                          className="
                            text-neutral-600
                            dark:text-neutral-300
                            text-sm
                            sm:text-base
                            italic
                            flex-grow
                            z-10
                            leading-relaxed
                            font-medium
                          "
                        >
                          "{testimonial.quote}"
                        </p>

                        {/* AUTHOR */}

                        <div
                          className="
                            pt-4
                            border-t
                            border-neutral-200
                            dark:border-white/15
                            z-10
                          "
                        >
                          <p
                            className="
                              font-bold
                              text-black
                              dark:text-white
                              text-sm
                            "
                          >
                            {testimonial.name}
                          </p>

                          <p
                            className="
                              text-xs
                              text-neutral-500
                              dark:text-neutral-400
                              mt-0.5
                            "
                          >
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section
        className="
          px-4
          pb-16
          sm:pb-20
          bg-white
          dark:bg-black
        "
      >
        <Reveal
          className="
            max-w-4xl
            mx-auto
          "
          delay={150}
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-neutral-200
              dark:border-white/15
              bg-neutral-50
              dark:bg-white/[0.02]
              px-6
              py-8
              sm:px-10
              sm:py-10
              text-center
            "
          >
            <div
              className="
                absolute
                -top-24
                left-1/2
                -translate-x-1/2
                w-64
                h-64
                rounded-full
                bg-gradient-to-br
                from-red-500
                to-blue-500
                opacity-[0.06]
                blur-3xl
                pointer-events-none
              "
            />

            <div className="relative z-10">
              <h3
                className="
                  text-xl
                  sm:text-2xl
                  font-black
                  tracking-tight
                  text-black
                  dark:text-white
                "
              >
                Build something worth talking about.
              </h3>

              <p
                className="
                  mt-2
                  text-xs
                  sm:text-sm
                  text-neutral-500
                  dark:text-neutral-400
                  max-w-xl
                  mx-auto
                  leading-relaxed
                "
              >
                Join founders, developers,
                designers, and ambitious builders
                creating the next generation of
                products.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`
        .reveal-item {
          opacity: 0;
          transform: translateY(24px);

          transition:
            opacity 0.7s
              cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s
              cubic-bezier(0.16, 1, 0.3, 1);

          will-change:
            opacity,
            transform;
        }

        .reveal-item.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes community-marquee {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(
              calc(-50% - 12px)
            );
          }
        }

        .animate-community-marquee {
          animation:
            community-marquee
            30s
            linear
            infinite;
        }

        .community-marquee:hover
        .animate-community-marquee {
          animation-play-state: paused;
        }

        @media (min-width: 640px) {
          @keyframes community-marquee {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(
                calc(-50% - 16px)
              );
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .animate-community-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CommunityPage;