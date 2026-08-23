import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants';
import { ProjectCard } from '../pages/ProjectsListPage';
import HeroSection from '../components/homepage/HeroSection';
import StartalksSection from '../components/homepage/StartalksSection';
import StartivesEcosystemSection from '../components/homepage/StartivesEcosystemSection';

import {
  Users,
  Sparkles,
  Box,
  ArrowRight,
  Star,
  Rocket,
} from 'lucide-react';


/* =========================================================
   IN VIEW
========================================================= */

function useInView<T extends HTMLElement>(
  threshold = 0.2
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;

    if (!node) return;

    const observer = new IntersectionObserver(
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


/* =========================================================
   REVEAL
========================================================= */

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section';
}> = ({
  children,
  delay = 0,
  className = '',
  as = 'div',
}) => {
  const { ref, inView } =
    useInView<HTMLDivElement>(0.15);

  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={`reveal-item ${
        inView ? 'is-visible' : ''
      } ${className}`}
      style={{
        transitionDelay: inView
          ? `${delay}ms`
          : '0ms',
      }}
    >
      {children}
    </Tag>
  );
};


/* =========================================================
   GRADIENT BUTTON
========================================================= */

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


/* =========================================================
   COUNT UP
========================================================= */

const useCountUp = (
  endValue: number,
  active: boolean,
  duration = 1800
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    let animationFrame: number;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed =
        currentTime - startTime;

      const progress = Math.min(
        elapsed / duration,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.round(endValue * eased)
      );

      if (progress < 1) {
        animationFrame =
          requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame =
      requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [
    endValue,
    active,
    duration,
  ]);

  return count;
};


/* =========================================================
   ECOSYSTEM STAT
========================================================= */

const EcosystemStat: React.FC<{
  endValue: number;
  label: string;
  description: string;
  delay?: number;
}> = ({
  endValue,
  label,
  description,
  delay = 0,
}) => {
  const { ref, inView } =
    useInView<HTMLDivElement>(0.15);

  const [shouldAnimate, setShouldAnimate] =
    useState(false);

  const count = useCountUp(
    endValue,
    shouldAnimate,
    1800
  );

  useEffect(() => {
    if (!inView) return;

    const timer = window.setTimeout(() => {
      setShouldAnimate(true);
    }, delay);

    return () =>
      window.clearTimeout(timer);
  }, [inView, delay]);

  return (
    <div
      ref={ref}
      className="ecosystem-stat text-center"
    >
      <div
        className={`
          ecosystem-stat-number
          button-gradient
          text-3xl
          sm:text-4xl
          md:text-[42px]
          font-black
          tracking-[-0.04em]
          tabular-nums
          font-poppins
          bg-clip-text
          text-transparent
          [-webkit-background-clip:text]
          [-webkit-text-fill-color:transparent]
          transition-all
          duration-500
          ${
            shouldAnimate
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-2'
          }
        `}
      >
        {count}+
      </div>

      <div
        className={`
          mt-0.5
          text-[9px]
          sm:text-[10px]
          md:text-[11px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-neutral-700
          dark:text-neutral-300
          font-poppins
          transition-all
          duration-500
          ${
            shouldAnimate
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1'
          }
        `}
      >
        {label}
      </div>

      <p
        className={`
          mt-1.5
          max-w-[210px]
          mx-auto
          text-[10px]
          sm:text-[10.5px]
          md:text-[11px]
          leading-[1.45]
          font-medium
          text-neutral-500
          dark:text-neutral-400
          font-poppins
          transition-all
          duration-500
          ${
            shouldAnimate
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-1'
          }
        `}
      >
        {description}
      </p>
    </div>
  );
};


/* =========================================================
   HOME PAGE
========================================================= */

const HomePage: React.FC = () => {
  const pageRef =
    useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const {
    startupIdeas,
    currentUser,
  } = useAppContext();

  /* =======================================================
     TESTIMONIAL PAUSE STATE
  ======================================================= */

  const [
    testimonialPaused,
    setTestimonialPaused,
  ] = useState(false);


  /* =======================================================
     RECENT PROJECTS
  ======================================================= */

  const recentProjects = [
    ...startupIdeas,
  ]
    .filter(
      (idea) => !idea.askingPrice
    )
    .sort(
      (a, b) =>
        new Date(
          b.createdAt || b.postedDate
        ).getTime() -
        new Date(
          a.createdAt || a.postedDate
        ).getTime()
    )
    .slice(0, 4);


  /* =======================================================
     PROTECTED ROUTE
  ======================================================= */

  const handleProtectedRoute = (
    path: string
  ) => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };


  /* =======================================================
     FEATURES
  ======================================================= */

  const features = [
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787158996/IMG_20260819_223103_x51spd.png',
      title: 'VALIDATE YOUR IDEA',
      description:
        'Get feedback on your startup concept from a diverse community of experts and peers.',
    },
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787158996/Picsart_26-08-19_22-32-32-425_auwqt9.png',
      title: 'FIND A CO-FOUNDER',
      description:
        'Connect with passionate individuals who share your vision and have the skills to help you succeed.',
    },
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787157294/IMG_20260819_214812_ggu5mx.png',
      title: 'BUILD YOUR MVP',
      description:
        'Assemble a talented team to bring your Minimum Viable Product to life and start testing the market.',
    },
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787157305/IMG_20260819_214853_ygg5xd.png',
      title: 'SCALE YOUR VENTURE',
      description:
        'Access a global network of talent, mentors, and resources to grow your startup beyond its initial stages.',
    },
  ];


  /* =======================================================
     TESTIMONIALS — 7 CARDS
  ======================================================= */

  const testimonials = [
    {
      name: 'Prince',
      role: 'Founder, Apives',
      quote:
        `Within a week, I connected with two incredible developers on ${APP_NAME}. It's a game-changer for early-stage founders.`,
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
    {
      name: 'Jacob Jeilling',
      role: 'Founder & Builder',
      quote:
        'Startives made it easier to find people who actually want to build. The community feels genuinely driven.',
    },
    {
      name: 'Ankit Sharma',
      role: 'Product Builder',
      quote:
        'I discovered great ideas, met talented builders, and found conversations that actually turned into action.',
    },
    {
      name: 'Joe Hamilton',
      role: 'Startup Founder',
      quote:
        'The best part is the people. Everyone here seems focused on creating something real instead of just talking about it.',
    },
    {
      name: 'Mark Jobs',
      role: 'Entrepreneur',
      quote:
        'Startives brings founders and builders into one place. It is exactly the kind of ecosystem early teams need.',
    },
  ];


  /* =======================================================
     WHY STARTIVES
  ======================================================= */

  const whyChooseFeatures = [
    {
      title: 'Forge global alliances.',
      description:
        'Break geographical barriers. Connect with a diverse pool of innovators, mentors, and investors from every corner of the globe.',
      gradient:
        'from-sky-400 to-cyan-300',
    },
    {
      title: 'Assemble your dream team.',
      description:
        'Find the missing piece to your puzzle. Our platform is the crucible where visionary founders meet brilliant developers and designers.',
      gradient:
        'from-red-500 to-red-400',
    },
    {
      title: 'Launchpad for legends.',
      description:
        'Go from a spark of genius to a market-ready MVP. We provide the tools and community support to validate your vision.',
      gradient:
        'from-orange-400 to-yellow-300',
    },
  ];


  return (
    <div
      ref={pageRef}
      className="
        min-h-full
        w-full
        overflow-x-hidden
        bg-white
        dark:bg-black
        text-black
        dark:text-white
        font-poppins
      "
    >

      {/* ===================================================
          SEO
      =================================================== */}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context':
              'https://schema.org',
            '@type':
              'Organization',
            name: APP_NAME,
            url:
              'https://startives.com',
            sameAs: [
              'https://linkedin.com/company/startives',
              'https://github.com/startives',
              'https://twitter.com/startives',
            ],
          }),
        }}
      />


      <div
        className="
          relative
          z-10
          bg-white
          dark:bg-black
        "
      >

        {/* =================================================
            HERO
        ================================================= */}

        <HeroSection />


        {/* =================================================
            DISCOVER PROJECTS
        ================================================= */}

        <section
          className="
            py-12
            sm:py-16
            bg-white
            dark:bg-black
          "
        >

          <div
            className="
              container
              mx-auto
              px-4
            "
          >

            <Reveal
              className="
                text-center
                mb-10
              "
            >

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-extrabold
                  tracking-tight
                  font-poppins
                  uppercase
                  text-black
                  dark:text-white
                "
              >
                Discover Projects
              </h2>

              <p
                className="
                  text-neutral-600
                  dark:text-neutral-400
                  mt-2
                  max-w-2xl
                  mx-auto
                  text-sm
                  sm:text-base
                  font-medium
                  font-poppins
                "
              >
                Explore live startup ideas, apply
                to join teams, or submit your own
                and find co-founders.
              </p>

            </Reveal>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-8
              "
            >

              {recentProjects.map(
                (idea, index) => (
                  <Reveal
                    key={idea.id}
                    delay={index * 80}
                  >

                    <div
                      onClick={() =>
                        handleProtectedRoute(
                          `/idea/${idea.id}`
                        )
                      }
                      className="
                        cursor-pointer
                        transition-transform
                        duration-300
                        hover:-translate-y-1
                      "
                    >

                      <ProjectCard
                        idea={idea}
                      />

                    </div>

                  </Reveal>
                )
              )}

            </div>


            <Reveal
              className="
                flex
                justify-center
                gap-4
                mt-10
              "
              delay={160}
            >

              <button
                onClick={() =>
                  handleProtectedRoute(
                    '/discover'
                  )
                }
                className="
                  button-gradient
                  text-white
                  px-8
                  py-2.5
                  rounded-full
                  text-[11px]
                  font-black
                  uppercase
                  tracking-widest
                  transition-transform
                  duration-300
                  hover:scale-105
                  active:scale-95
                "
              >
                Explore Projects
              </button>


              <button
                onClick={() =>
                  handleProtectedRoute(
                    '/submit-idea'
                  )
                }
                className="
                  bg-white
                  dark:bg-black
                  border
                  border-neutral-200
                  dark:border-white/15
                  text-black
                  dark:text-white
                  px-8
                  py-2.5
                  rounded-full
                  text-[11px]
                  font-black
                  uppercase
                  tracking-widest
                  transition-all
                  duration-300
                  hover:scale-105
                  active:scale-95
                  hover:bg-neutral-50
                  dark:hover:bg-white/[0.04]
                "
              >
                Submit Idea
              </button>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            ECOSYSTEM
        ================================================= */}

        <section
          className="
            py-8
            sm:py-10
            bg-white
            dark:bg-black
            relative
            overflow-hidden
          "
        >

          <div
            className="
              container
              mx-auto
              px-4
            "
          >

            <Reveal
              className="
                text-center
                mb-2
                sm:mb-3
              "
            >

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-extrabold
                  text-black
                  dark:text-white
                  tracking-tight
                  font-poppins
                  uppercase
                "
              >
                An ecosystem in motion
              </h2>

            </Reveal>


            <Reveal
              className="
                text-center
                mb-3
                sm:mb-4
              "
              delay={50}
            >

              <p
                className="
                  text-neutral-600
                  dark:text-neutral-400
                  max-w-2xl
                  mx-auto
                  text-sm
                  sm:text-base
                  font-medium
                  leading-relaxed
                  font-poppins
                "
              >
                Witness the pulse of innovation.
                Our platform is a dynamic network
                where connections spark, ideas ignite,
                and ventures take flight every day.
              </p>

            </Reveal>


            <Reveal
              className="w-full"
              delay={90}
            >

              <div
                className="
                  ecosystem-image-wrap
                  w-full
                  flex
                  justify-center
                "
              >

                <img
                  src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787123288/file_000000005e3881fab327925e0e8d2e28_kbpxgq.png"
                  alt="Startives ecosystem"
                  className="
                    block
                    dark:hidden
                    w-full
                    max-w-[1100px]
                    h-auto
                    object-contain
                    object-center
                  "
                />

                <img
                  src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787122074/file_00000000b90081fab560a74114540bc4_vea15j.png"
                  alt="Startives ecosystem"
                  className="
                    hidden
                    dark:block
                    w-full
                    max-w-[1100px]
                    h-auto
                    object-contain
                    object-center
                  "
                />

              </div>

            </Reveal>


            <Reveal
              className="
                w-full
                mt-4
                sm:mt-5
              "
              delay={130}
            >

              <div
                className="
                  w-full
                  max-w-4xl
                  mx-auto
                "
              >

                <div
                  className="
                    ecosystem-stats
                    grid
                    grid-cols-1
                    md:grid-cols-3
                  "
                >

                  <EcosystemStat
                    endValue={50}
                    label="Projects Launched"
                    description="Ideas turning into real products, teams, and ventures."
                    delay={0}
                  />

                  <EcosystemStat
                    endValue={200}
                    label="Founders Connected"
                    description="Builders finding the right people to bring their vision to life."
                    delay={120}
                  />

                  <EcosystemStat
                    endValue={500}
                    label="Innovators"
                    description="A growing community of creators, developers, and ambitious minds."
                    delay={240}
                  />

                </div>

              </div>

            </Reveal>

          </div>

        </section>


        {/* =================================================
            FEATURES
        ================================================= */}

        <section
          className="
            py-10
            sm:py-12
            bg-white
            dark:bg-black
          "
        >

          <div
            className="
              container
              mx-auto
              px-4
            "
          >

            <Reveal
              className="
                text-center
                mb-8
                sm:mb-9
              "
            >

              <h2
                className="
                  text-[21px]
                  sm:text-2xl
                  md:text-3xl
                  font-extrabold
                  text-black
                  dark:text-white
                  mb-2
                  tracking-tight
                  font-poppins
                  uppercase
                "
              >
                Everything you need to start
              </h2>

              <p
                className="
                  text-neutral-600
                  dark:text-neutral-400
                  max-w-2xl
                  mx-auto
                  text-[12.5px]
                  sm:text-[13.5px]
                  font-medium
                  font-poppins
                "
              >
                From idea to launch, {APP_NAME}
                provides the tools and community
                to support your journey.
              </p>

            </Reveal>


            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-4
                gap-5
              "
            >

              {features.map(
                (feature, index) => (
                  <Reveal
                    key={index}
                    delay={index * 90}
                  >

                    <div
                      className="
                        feature-liquid-card
                        group
                        relative
                        overflow-hidden
                        min-h-[315px]
                        sm:min-h-[335px]
                        p-5
                        sm:p-5.5
                        rounded-[1.7rem]
                        border
                        border-neutral-200
                        dark:border-white/15
                        flex
                        flex-col
                        transition-all
                        duration-500
                        hover:-translate-y-2
                      "
                    >

                      <div
                        className="
                          feature-card-number
                        "
                      >
                        #{index + 1}
                      </div>


                      <div
                        className="
                          absolute
                          inset-0
                          bg-white/70
                          dark:bg-black/70
                          backdrop-blur-2xl
                        "
                      />


                      <div
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-br
                          from-red-500/[0.08]
                          via-purple-500/[0.06]
                          to-blue-500/[0.13]
                          pointer-events-none
                          dark:opacity-40
                        "
                      />


                      <div
                        className="
                          absolute
                          -bottom-20
                          left-1/2
                          -translate-x-1/2
                          w-60
                          h-36
                          rounded-full
                          bg-blue-500/[0.15]
                          blur-[60px]
                          pointer-events-none
                          transition-all
                          duration-500
                          group-hover:bg-blue-500/[0.22]
                        "
                      />


                      <div
                        className="
                          absolute
                          -top-20
                          -right-16
                          w-36
                          h-36
                          rounded-full
                          bg-red-500/[0.08]
                          blur-[55px]
                          pointer-events-none
                        "
                      />


                      <div
                        className="
                          absolute
                          inset-[1px]
                          rounded-[calc(1.7rem-1px)]
                          border
                          border-white/70
                          dark:border-white/10
                          pointer-events-none
                        "
                      />


                      <div
                        className="
                          relative
                          z-10
                          flex
                          flex-col
                          h-full
                        "
                      >

                        <div
                          className="
                            flex-1
                            flex
                            items-center
                            justify-center
                          "
                        >

                          <div
                            className="
                              relative
                              w-full
                              h-[165px]
                              sm:h-[175px]
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <div
                              className="
                                absolute
                                w-36
                                h-36
                                sm:w-40
                                sm:h-40
                                rounded-full
                                bg-gradient-to-br
                                from-red-500/10
                                via-purple-500/10
                                to-blue-500/20
                                blur-3xl
                              "
                            />


                            <img
                              src={feature.image}
                              alt={feature.title}
                              className="
                                relative
                                z-10
                                w-[162px]
                                h-[162px]
                                sm:w-[184px]
                                sm:h-[184px]
                                object-contain
                                transition-transform
                                duration-500
                                ease-out
                                group-hover:scale-[1.06]
                                group-hover:-translate-y-1
                              "
                            />

                          </div>

                        </div>


                        <div
                          className="
                            text-center
                          "
                        >

                          <h3
                            className="
                              text-[15px]
                              sm:text-[16px]
                              font-bold
                              text-black
                              dark:text-white
                              mb-1.5
                              tracking-tight
                              font-poppins
                            "
                          >
                            {feature.title}
                          </h3>


                          <p
                            className="
                              text-[10.5px]
                              sm:text-[11px]
                              font-medium
                              leading-[1.5]
                              font-poppins
                              max-w-[245px]
                              mx-auto
                              text-neutral-600
                              dark:text-neutral-400
                            "
                          >
                            {feature.description}
                          </p>

                        </div>

                      </div>

                    </div>

                  </Reveal>
                )
              )}

            </div>

          </div>

        </section>


        {/* =================================================
            STARTALKS
        ================================================= */}

        <StartalksSection Reveal={Reveal} />


        {/* =================================================
            STARTIVES ECOSYSTEM
        ================================================= */}

        <StartivesEcosystemSection />


        {/* =================================================
            WHY STARTIVES
        ================================================= */}

        <section
          className="
            py-12
            sm:py-16
            bg-white
            dark:bg-black
          "
        >

          <div
            className="
              container
              mx-auto
              px-4
            "
          >

            <Reveal
              className="
                text-center
                mb-10
              "
            >

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-extrabold
                  text-black
                  dark:text-white
                  tracking-tight
                  font-poppins
                  uppercase
                "
              >
                Why Startives exists?
              </h2>


              <p
                className="
                  text-neutral-600
                  dark:text-neutral-400
                  mt-2
                  max-w-2xl
                  mx-auto
                  text-sm
                  sm:text-base
                  leading-relaxed
                  font-medium
                  font-poppins
                "
              >
                We're more than a platform; we're
                your strategic partner in innovation.
              </p>

            </Reveal>


            <div
              className="
                max-w-4xl
                mx-auto
                space-y-12
              "
            >

              {whyChooseFeatures.map(
                (feature, index) => (
                  <Reveal
                    key={index}
                    delay={index * 100}
                    className={`flex flex-col ${
                      index % 2 === 0
                        ? 'md:items-start text-center md:text-left'
                        : 'md:items-end text-center md:text-right'
                    }`}
                  >

                    <h3
                      className={`
                        text-2xl
                        font-bold
                        bg-gradient-to-r
                        ${feature.gradient}
                        gradient-text
                        mb-3
                        inline-block
                        tracking-tight
                        font-poppins
                      `}
                    >
                      {feature.title}
                    </h3>


                    <p
                      className="
                        text-neutral-600
                        dark:text-neutral-400
                        text-sm
                        sm:text-base
                        leading-relaxed
                        max-w-3xl
                        font-medium
                        font-poppins
                      "
                    >
                      {feature.description}
                    </p>

                  </Reveal>
                )
              )}

            </div>

          </div>

        </section>


        {/* =================================================
            TESTIMONIALS
        ================================================= */}

        <section
          className="
            py-12
            sm:py-16
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

            <Reveal
              className="
                text-center
                mb-10
              "
            >

              <h2
                className="
                  text-2xl
                  md:text-3xl
                  font-extrabold
                  text-black
                  dark:text-white
                  tracking-tight
                  font-poppins
                  uppercase
                "
              >
                From our community
              </h2>


              <p
                className="
                  text-neutral-600
                  dark:text-neutral-400
                  mt-2
                  max-w-2xl
                  mx-auto
                  text-sm
                  sm:text-base
                  leading-relaxed
                  font-medium
                  font-poppins
                "
              >
                Innovators are building,
                connecting, and succeeding on{' '}
                {APP_NAME}.
              </p>

            </Reveal>


            <div
              className="
                relative
                w-full
                overflow-hidden
                mask-gradient
              "
            >

              <div
                className={`
                  testimonials-marquee-track
                  flex
                  gap-8
                  ${
                    testimonialPaused
                      ? 'testimonial-marquee-paused'
                      : ''
                  }
                `}
              >

                {[
                  ...testimonials,
                  ...testimonials,
                ].map(
                  (
                    testimonial,
                    index
                  ) => (

                    <div
                      key={index}
                      className="
                        flex-shrink-0
                        w-[94vw]
                        sm:w-[450px]
                      "
                    >

                      {/* =================================================
                          TESTIMONIAL CARD
                          CLICK = PAUSE / RESUME
                      ================================================= */}

                      <div
                        onClick={() =>
                          setTestimonialPaused(
                            (prev) => !prev
                          )}
                        className="
                          testimonial-gradient-card
                          relative
                          overflow-hidden
                          p-7
                          sm:p-8
                          rounded-[2rem]
                          min-h-[285px]
                          sm:min-h-[300px]
                          flex
                          flex-col
                          cursor-pointer
                          select-none
                          font-poppins
                        "
                      >

                        {/* =============================================
                            STARTIVES LOGO
                            ONLY ONE LOGO INSIDE CARD
                        ============================================= */}

                        <img
                          src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
                          alt=""
                          aria-hidden="true"
                          className="
                            absolute
                            -top-7
                            -right-7
                            w-[145px]
                            h-[145px]
                            object-contain
                            opacity-[0.15]
                            dark:opacity-[0.17]
                            pointer-events-none
                            z-[1]
                          "
                        />


                        {/* =============================================
                            SUBTLE GRADIENT HIGHLIGHT
                        ============================================= */}

                        <div
                          className="
                            absolute
                            inset-0
                            rounded-[inherit]
                            bg-gradient-to-br
                            from-white/[0.12]
                            via-transparent
                            to-white/[0.04]
                            pointer-events-none
                            z-[2]
                          "
                        />


                        {/* =============================================
                            TOP SPECULAR LINE
                        ============================================= */}

                        <div
                          className="
                            absolute
                            top-0
                            left-[8%]
                            right-[8%]
                            h-px
                            bg-white/40
                            dark:bg-white/20
                            pointer-events-none
                            z-[3]
                          "
                        />


                        {/* =============================================
                            STARS
                        ============================================= */}

                        <div
                          className="
                            relative
                            z-10
                            flex
                            items-center
                            mb-7
                          "
                        >

                          <div
                            className="
                              flex
                              space-x-1
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
                                    w-[18px]
                                    h-[18px]
                                    fill-current
                                  "
                                />
                              )
                            )}

                          </div>

                        </div>


                        {/* =============================================
                            QUOTE
                        ============================================= */}

                        <p
                          className="
                            relative
                            z-10
                            text-neutral-800
                            dark:text-neutral-200
                            text-[15px]
                            sm:text-[16px]
                            italic
                            flex-grow
                            leading-[1.7]
                            font-medium
                            max-w-[390px]
                          "
                        >
                          "{testimonial.quote}"
                        </p>


                        {/* =============================================
                            AUTHOR
                            NO DIVIDER
                        ============================================= */}

                        <div
                          className="
                            relative
                            z-10
                            mt-7
                          "
                        >

                          <p
                            className="
                              font-bold
                              text-black
                              dark:text-white
                              text-[15px]
                            "
                          >
                            {testimonial.name}
                          </p>


                          <p
                            className="
                              mt-0.5
                              text-[12px]
                              text-neutral-600
                              dark:text-neutral-400
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

          </div>

        </section>


        {/* =================================================
            LAUNCH YOUR VISION
        ================================================= */}

        <section
          className="
            text-center
            pt-2
            pb-0
            sm:pt-3
            sm:pb-0
            px-4
            bg-white
            dark:bg-black
          "
        >

          <Reveal
            className="
              container
              mx-auto
              max-w-5xl
              font-poppins
            "
          >

            {/* LIGHT MODE */}

            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787157268/IMG_20260819_215632_awnsfq.png"
              alt=""
              aria-hidden="true"
              className="
                mx-auto
                w-full
                max-w-4xl
                h-auto
                object-contain
                object-center
                block
                dark:hidden
              "
            />


            {/* DARK MODE */}

            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787157287/IMG_20260819_215700_hjgsna.png"
              alt=""
              aria-hidden="true"
              className="
                mx-auto
                w-full
                max-w-4xl
                h-auto
                object-contain
                object-center
                hidden
                dark:block
              "
            />


            <div
              className="
                mt-4
                sm:mt-5
                flex
                justify-center
              "
            >

              <Link
                to="/signup"
                className="
                  liquid-glass-cta
                  group
                  relative
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  px-2
                  py-[7px]
                  pl-[21.6px]
                  sm:pl-[25.2px]
                  text-neutral-900
                  dark:text-white
                  font-bold
                  text-[12.6px]
                  sm:text-[13.5px]
                  tracking-tight
                  select-none
                  overflow-hidden
                  transition-all
                  duration-300
                  hover:scale-[1.035]
                  active:scale-[0.97]
                  focus:outline-none
                  focus-visible:ring-4
                  focus-visible:ring-blue-400/20
                "
              >

                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-gradient-to-b
                    from-white/90
                    via-white/55
                    to-white/35
                    dark:from-black
                    dark:via-black
                    dark:to-black
                    pointer-events-none
                  "
                />


                <span
                  className="
                    absolute
                    inset-0
                    rounded-full
                    bg-gradient-to-r
                    from-red-400/15
                    via-purple-400/10
                    to-blue-500/20
                    pointer-events-none
                  "
                />


                <span
                  className="
                    absolute
                    left-[10%]
                    right-[10%]
                    top-0
                    h-px
                    bg-white/95
                    dark:bg-white/15
                    rounded-full
                    pointer-events-none
                  "
                />


                <span
                  className="
                    relative
                    z-10
                    whitespace-nowrap
                  "
                >
                  Launch your vision
                </span>


                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    w-[32.4px]
                    h-[32.4px]
                    sm:w-9
                    sm:h-9
                    rounded-full
                    overflow-hidden
                    border
                    border-white/80
                    dark:border-white/15
                    bg-white/35
                    dark:bg-black
                    backdrop-blur-xl
                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_3px_12px_rgba(20,30,60,0.12)]
                    transition-all
                    duration-300
                    group-hover:bg-white/50
                    dark:group-hover:bg-white/[0.04]
                    group-hover:shadow-[inset_0_1px_2px_rgba(255,255,255,1),0_5px_16px_rgba(40,50,100,0.16)]
                  "
                >

                  <span
                    className="
                      absolute
                      inset-0
                      rounded-full
                      bg-gradient-to-br
                      from-red-500/55
                      via-purple-400/30
                      to-blue-500/60
                      opacity-80
                      blur-[0.5px]
                    "
                  />


                  <span
                    className="
                      absolute
                      inset-[1px]
                      rounded-full
                      bg-white/20
                      dark:bg-black
                      backdrop-blur-md
                    "
                  />


                  <ArrowRight
                    className="
                      relative
                      z-10
                      w-[14.4px]
                      h-[14.4px]
                      sm:w-[16.2px]
                      sm:h-[16.2px]
                      text-neutral-900
                      dark:text-white
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />

                </span>

              </Link>

            </div>

          </Reveal>

        </section>


        <div
          className="
            w-full
            bg-white
            dark:bg-black
            h-8
            sm:h-10
          "
        />

      </div>


      {/* =====================================================
          STYLES
      ===================================================== */}

      <style>{`

        /* =========================================
           REVEAL
        ========================================= */

        .reveal-item {
          opacity: 0;

          transform:
            translateY(24px);

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

          transform:
            translateY(0);
        }


        /* =========================================
           MAGNETIC BUTTON
        ========================================= */

        .magnetic-btn::before {
          content: '';

          position: absolute;

          inset: 0;

          background:
            radial-gradient(
              120px circle at
              var(--x, 50%)
              var(--y, 50%),
              rgba(255, 255, 255, 0.25),
              transparent 70%
            );

          opacity: 0;

          transition:
            opacity 0.3s ease;

          pointer-events: none;
        }

        .magnetic-btn:hover::before {
          opacity: 1;
        }


        /* =========================================
           ECOSYSTEM
        ========================================= */

        .ecosystem-image-wrap {
          width: 100%;

          margin-top: 0;
        }

        .ecosystem-stats {
          width: 100%;
        }

        .ecosystem-stat {
          min-width: 0;

          padding:
            0 18px;
        }

        .ecosystem-stat
        + .ecosystem-stat {
          border-left:
            1px solid
            rgba(0, 0, 0, 0.08);
        }

        .dark
        .ecosystem-stat
        + .ecosystem-stat {
          border-left-color:
            rgba(255, 255, 255, 0.10);
        }

        .ecosystem-stat-number {
          line-height: 1;

          background-clip:
            text !important;

          -webkit-background-clip:
            text !important;

          color:
            transparent !important;

          -webkit-text-fill-color:
            transparent !important;
        }


        /* =========================================
           FEATURE NUMBERS
        ========================================= */

        .feature-card-number {
          position: absolute;

          top: 13px;
          left: 18px;

          z-index: 30;

          font-family:
            Poppins,
            sans-serif;

          font-size:
            32.4px;

          line-height: 1;

          font-weight: 900;

          letter-spacing:
            -0.055em;

          color:
            rgba(72, 78, 88, 0.48);

          text-shadow:
            0 2px 0
              rgba(255, 255, 255, 0.85),
            0 5px 12px
              rgba(80, 85, 95, 0.20),
            0 10px 22px
              rgba(80, 85, 95, 0.12);

          pointer-events:
            none;

          user-select:
            none;

          transition:
            transform 0.4s
              cubic-bezier(0.16, 1, 0.3, 1),
            color 0.4s ease,
            text-shadow 0.4s ease;
        }

        .dark .feature-card-number {
          color:
            rgba(72, 78, 88, 0.48);

          text-shadow:
            0 2px 0
              rgba(255, 255, 255, 0.85),
            0 5px 12px
              rgba(80, 85, 95, 0.20),
            0 10px 22px
              rgba(80, 85, 95, 0.12);
        }

        .feature-liquid-card:hover
        .feature-card-number {
          transform:
            translateY(-2px)
            scale(1.05);

          color:
            rgba(58, 64, 74, 0.58);

          text-shadow:
            0 2px 0
              rgba(255, 255, 255, 0.9),
            0 6px 16px
              rgba(70, 75, 85, 0.24),
            0 12px 28px
              rgba(70, 75, 85, 0.15);
        }

        .dark
        .feature-liquid-card:hover
        .feature-card-number {
          color:
            rgba(58, 64, 74, 0.58);

          text-shadow:
            0 2px 0
              rgba(255, 255, 255, 0.9),
            0 6px 16px
              rgba(70, 75, 85, 0.24),
            0 12px 28px
              rgba(70, 75, 85, 0.15);
        }


        /* =========================================
           FEATURE CARDS
        ========================================= */

        .feature-liquid-card {
          -webkit-backdrop-filter:
            blur(26px)
            saturate(180%);

          backdrop-filter:
            blur(26px)
            saturate(180%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.82),
              rgba(255, 255, 255, 0.55)
            );

          box-shadow:
            none !important;
        }

        .dark .feature-liquid-card {
          background:
            #000000 !important;

          box-shadow:
            none !important;
        }

        .feature-liquid-card::before {
          content: '';

          position: absolute;

          inset: 0;

          border-radius:
            inherit;

          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.72),
              transparent 28%,
              transparent 70%,
              rgba(255, 255, 255, 0.35)
            );

          opacity:
            0.75;

          pointer-events:
            none;
        }

        .dark
        .feature-liquid-card::before {
          background:
            transparent;

          opacity:
            0;
        }

        .feature-liquid-card::after {
          content: '';

          position: absolute;

          left: 8%;
          right: 8%;
          top: 0;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.95),
              transparent
            );

          pointer-events:
            none;
        }

        .dark
        .feature-liquid-card::after {
          background:
            linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.12),
              transparent
            );
        }

        .feature-liquid-card:hover {
          border-color:
            rgba(255, 255, 255, 0.95);

          box-shadow:
            none !important;
        }

        .dark
        .feature-liquid-card:hover {
          border-color:
            rgba(255, 255, 255, 0.18);

          box-shadow:
            none !important;
        }


        /* =========================================
           TESTIMONIAL MARQUEE
           SLIGHTLY FASTER
        ========================================= */

        .testimonials-marquee-track {
          animation:
            testimonial-marquee
            25s
            linear
            infinite;

          will-change:
            transform;
        }

        .testimonials-marquee-track.testimonial-marquee-paused {
          animation-play-state:
            paused;
        }


        /* =========================================
           TESTIMONIAL GRADIENT CARD
           
           CLEAN
           NO GLASS BLUR
           NO GREY DIVIDER
           NO HOVER MOVEMENT
           NO HOVER SHADOW
        ========================================= */

        .testimonial-gradient-card {

          position:
            relative;

          isolation:
            isolate;

          background:
            linear-gradient(
              135deg,
              rgba(255, 68, 80, 0.18) 0%,
              rgba(190, 65, 175, 0.14) 48%,
              rgba(50, 125, 255, 0.19) 100%
            );

          border:
            1px solid
            rgba(255, 255, 255, 0.68);

          box-shadow:
            inset 0 1px 1px
              rgba(255, 255, 255, 0.55);

          /*
            Deliberately no backdrop-filter.
            Keeps the gradient sharp and clean.
          */

          transition:
            none !important;
        }


        /* =========================================
           DARK TESTIMONIAL CARD
           SHARP — NO MUDDY BLUR
        ========================================= */

        .dark .testimonial-gradient-card {

          background:
            linear-gradient(
              135deg,
              rgba(100, 20, 32, 0.38),
              rgba(48, 25, 55, 0.38) 48%,
              rgba(18, 55, 105, 0.42)
            );

          border-color:
            rgba(255, 255, 255, 0.13);

          box-shadow:
            inset 0 1px 1px
              rgba(255, 255, 255, 0.08);

        }


        /* =========================================
           TESTIMONIAL HOVER
           NOTHING CHANGES
        ========================================= */

        .testimonial-gradient-card:hover {

          transform:
            none !important;

          box-shadow:
            inset 0 1px 1px
              rgba(255, 255, 255, 0.55) !important;

          border-color:
            rgba(255, 255, 255, 0.68) !important;

        }

        .dark
        .testimonial-gradient-card:hover {

          transform:
            none !important;

          box-shadow:
            inset 0 1px 1px
              rgba(255, 255, 255, 0.08) !important;

          border-color:
            rgba(255, 255, 255, 0.13) !important;

        }


        /* =========================================
           TESTIMONIAL MARQUEE ANIMATION
        ========================================= */

        @keyframes testimonial-marquee {

          0% {
            transform:
              translateX(0);
          }

          100% {
            transform:
              translateX(
                calc(-50% - 1rem)
              );
          }

        }


        /* =========================================
           LIQUID CTA
        ========================================= */

        .liquid-glass-cta {

          -webkit-backdrop-filter:
            blur(24px)
            saturate(180%);

          backdrop-filter:
            blur(24px)
            saturate(180%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.78),
              rgba(255, 255, 255, 0.48)
            );

          border:
            1px solid
            rgba(255, 255, 255, 0.9);

          box-shadow:
            inset 0 1px 2px
              rgba(255, 255, 255, 0.95),
            inset 0 -1px 1px
              rgba(120, 130, 160, 0.08),
            0 8px 28px
              rgba(30, 40, 80, 0.13);
        }

        .dark .liquid-glass-cta {

          background:
            #000000 !important;

          border-color:
            rgba(255, 255, 255, 0.14);

          box-shadow:
            inset 0 1px 2px
              rgba(255, 255, 255, 0.10),
            inset 0 -1px 1px
              rgba(0, 0, 0, 0.25),
            0 8px 28px
              rgba(0, 0, 0, 0.30);
        }

        .liquid-glass-cta::after {

          content: '';

          position:
            absolute;

          inset: 0;

          border-radius:
            inherit;

          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.5),
              transparent 35%,
              transparent 65%,
              rgba(255, 255, 255, 0.25)
            );

          opacity:
            0.7;

          pointer-events:
            none;
        }

        .dark
        .liquid-glass-cta::after {

          background:
            transparent;

          opacity:
            0;
        }

        .liquid-glass-cta:hover {

          box-shadow:
            inset 0 1px 2px
              rgba(255, 255, 255, 1),
            inset 0 -1px 1px
              rgba(100, 110, 150, 0.08),
            0 12px 34px
              rgba(30, 40, 80, 0.17);
        }

        .dark
        .liquid-glass-cta:hover {

          box-shadow:
            inset 0 1px 2px
              rgba(255, 255, 255, 0.14),
            inset 0 -1px 1px
              rgba(0, 0, 0, 0.20),
            0 12px 34px
              rgba(0, 0, 0, 0.35);
        }


        /* =========================================
           FLOAT
        ========================================= */

        @keyframes float-slow {

          0%,
          100% {
            transform:
              translate(0, 0);
          }

          50% {
            transform:
              translate(12px, -18px);
          }

        }

        .animate-float-slow {
          animation:
            float-slow
            8s
            ease-in-out
            infinite;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 639px) {

          .liquid-glass-cta {

            padding-top:
              6.3px;

            padding-bottom:
              6.3px;

            padding-left:
              19.8px;

            padding-right:
              6.3px;

            font-size:
              12.6px;
          }

          .liquid-glass-cta span {

            -webkit-tap-highlight-color:
              transparent;
          }


          .ecosystem-stat-number.button-gradient {

            background-clip:
              text !important;

            -webkit-background-clip:
              text !important;

            color:
              transparent !important;

            -webkit-text-fill-color:
              transparent !important;
          }


          .ecosystem-stats {

            display:
              flex;

            flex-direction:
              column;

            align-items:
              center;

            gap:
              0;
          }


          .ecosystem-stat {

            width:
              100%;

            padding:
              9px 0;
          }


          .ecosystem-stat
          + .ecosystem-stat {

            border-left:
              0;

            border-top:
              1px solid
              rgba(0, 0, 0, 0.08);
          }


          .dark
          .ecosystem-stat
          + .ecosystem-stat {

            border-top-color:
              rgba(255, 255, 255, 0.10);
          }


          .ecosystem-image-wrap {

            margin-top:
              0;
          }


          .feature-liquid-card {

            min-height:
              315px;

            padding:
              20px;

            border-radius:
              1.7rem;
          }


          .feature-card-number {

            top:
              14px;

            left:
              17px;

            font-size:
              28.8px;

            letter-spacing:
              -0.055em;
          }


          .feature-liquid-card img {

            width:
              162px;

            height:
              162px;
          }


          /* TESTIMONIAL MOBILE */

          .testimonial-gradient-card {

            min-height:
              285px;

            padding:
              26px;

            border-radius:
              1.8rem;
          }


          .testimonial-gradient-card:hover {

            transform:
              none !important;
          }

        }


        /* =========================================
           DESKTOP
        ========================================= */

        @media (min-width: 640px) {

          .ecosystem-stats {

            grid-template-columns:
              repeat(
                3,
                minmax(0, 1fr)
              );
          }


          .feature-card-number {

            top:
              14px;

            left:
              18px;

            font-size:
              32.4px;
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .reveal-item {

            opacity:
              1 !important;

            transform:
              none !important;

            transition:
              none !important;
          }


          .animate-float-slow {

            animation:
              none !important;
          }


          .testimonials-marquee-track {

            animation:
              none !important;
          }


          .liquid-glass-cta {

            transition:
              none !important;
          }


          .feature-liquid-card {

            transition:
              none !important;
          }


          .feature-card-number {

            transition:
              none !important;
          }


          .testimonial-gradient-card {

            transition:
              none !important;
          }

        }

      `}</style>

    </div>
  );
};

export default HomePage;