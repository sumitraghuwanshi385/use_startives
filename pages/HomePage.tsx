import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Box,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleDollarSign,
  Compass,
  Globe2,
  Handshake,
  Lightbulb,
  MessageCircle,
  Rocket,
  Search,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants';
import { ProjectCard } from '../pages/ProjectsListPage';

/* =========================================================
   BUTTON
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
  const commonClasses = `
    button-gradient
    inline-flex items-center justify-center
    gap-2
    text-white
    font-semibold
    py-3 px-7
    rounded-full
    text-sm
    transition-all duration-300
    hover:scale-[1.03]
    active:scale-[0.98]
    focus:outline-none
    focus:ring-4
    focus:ring-red-500/20
    ${className}
  `;

  const content = (
    <>
      {children}
      {icon && <span>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
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
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={commonClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
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
  duration: number = 1600
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.max(
      1,
      Math.round(duration / 16)
    );

    const timer = window.setInterval(() => {
      frame += 1;

      const progress = Math.min(
        frame / totalFrames,
        1
      );

      const eased =
        1 - Math.pow(1 - progress, 3);

      setCount(
        Math.round(endValue * eased)
      );

      if (progress >= 1) {
        window.clearInterval(timer);
        setCount(endValue);
      }
    }, 16);

    return () =>
      window.clearInterval(timer);
  }, [endValue, duration]);

  return count;
};

/* =========================================================
   STAT CARD
========================================================= */

const EcosystemStatCard: React.FC<{
  endValue: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
  gradient: string;
}> = ({
  endValue,
  label,
  description,
  icon,
  suffix = '',
  gradient,
}) => {
  const [isInView, setIsInView] =
    useState(false);

  const ref =
    useRef<HTMLDivElement>(null);

  const count = useCountUp(
    isInView ? endValue : 0
  );

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer =
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.25 }
      );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="
        group
        bg-[var(--component-background)]
        border border-[var(--border-primary)]
        rounded-2xl
        p-5
        transition-all duration-300
        hover:-translate-y-1
        hover:border-purple-500/30
      "
    >
      <div
        className={`
          w-10 h-10
          rounded-xl
          flex items-center justify-center
          mb-5
          bg-gradient-to-br
          ${gradient}
        `}
      >
        {icon}
      </div>

      <div className="flex items-baseline gap-1">
        <span className="
          text-3xl
          font-extrabold
          tracking-tight
          text-[var(--text-primary)]
        ">
          {count}
        </span>

        <span className="
          text-lg
          font-bold
          text-[var(--text-muted)]
        ">
          {suffix}
        </span>
      </div>

      <h3 className="
        mt-2
        text-sm
        font-bold
        text-[var(--text-primary)]
      ">
        {label}
      </h3>

      <p className="
        mt-1
        text-xs
        leading-relaxed
        text-[var(--text-secondary)]
      ">
        {description}
      </p>
    </div>
  );
};

/* =========================================================
   SMALL FEATURE
========================================================= */

const MiniFeature: React.FC<{
  icon: React.ReactNode;
  title: string;
  text: string;
}> = ({
  icon,
  title,
  text,
}) => (
  <div className="
    flex
    items-start
    gap-3
  ">
    <div className="
      w-9 h-9
      shrink-0
      rounded-xl
      bg-[var(--background-tertiary)]
      border border-[var(--border-primary)]
      flex items-center justify-center
      text-purple-500
    ">
      {icon}
    </div>

    <div>
      <h3 className="
        text-sm
        font-bold
        text-[var(--text-primary)]
      ">
        {title}
      </h3>

      <p className="
        mt-1
        text-xs
        leading-relaxed
        text-[var(--text-secondary)]
      ">
        {text}
      </p>
    </div>
  </div>
);

/* =========================================================
   HOME PAGE
========================================================= */

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const {
    startupIdeas,
    currentUser,
  } = useAppContext();

  /* =======================================================
     PROJECTS
  ======================================================= */

  const recentProjects = [
    ...(startupIdeas || []),
  ]
    .filter(
      idea => !idea.askingPrice
    )
    .sort(
      (a, b) =>
        new Date(
          b.createdAt ||
            b.postedDate
        ).getTime() -
        new Date(
          a.createdAt ||
            a.postedDate
        ).getTime()
    )
    .slice(0, 4);

  /* =======================================================
     ROUTING
  ======================================================= */

  const handleProtectedRoute = (
    path: string
  ) => {
    if (!currentUser) {
      navigate('/login');
      return;
    }

    navigate(path);
  };

  /* =======================================================
     FEATURES
  ======================================================= */

  const features = [
    {
      icon: (
        <BadgeCheck className="w-5 h-5" />
      ),
      title: 'Validate ideas',
      description:
        'Get feedback before you spend months building.',
    },
    {
      icon: (
        <Handshake className="w-5 h-5" />
      ),
      title: 'Find co-founders',
      description:
        'Meet builders who complement your skills and vision.',
    },
    {
      icon: (
        <Box className="w-5 h-5" />
      ),
      title: 'Build together',
      description:
        'Turn promising ideas into real products with a team.',
    },
    {
      icon: (
        <TrendingUp className="w-5 h-5" />
      ),
      title: 'Grow your startup',
      description:
        'Find people, opportunities and momentum in one place.',
    },
  ];

  /* =======================================================
     TESTIMONIALS
  ======================================================= */

  const testimonials = [
    {
      name: 'Prince',
      role: 'Founder, Apives',
      quote:
        'Within a week, I connected with two incredible developers on Startives.',
    },
    {
      name: 'Sumit',
      role: 'UX Designer',
      quote:
        'I was looking to join an exciting project and found the perfect fit here.',
    },
    {
      name: 'Sonali Jaiswal',
      role: 'Full-Stack Developer',
      quote:
        'As a developer, Startives gives me a place to discover interesting projects.',
    },
  ];

  return (
    <div
      className="
        min-h-screen
        bg-[var(--background-primary)]
        text-[var(--text-primary)]
        overflow-x-hidden
        font-poppins
      "
    >

      {/* ===================================================
          HERO
      =================================================== */}

      <section
        className="
          relative
          overflow-hidden
          pt-16
          pb-16
          sm:pt-20
          sm:pb-20
          px-4
        "
      >
        <div className="
          absolute
          inset-0
          dot-pattern-bg
          opacity-40
          pointer-events-none
        " />

        <div className="
          absolute
          top-[-180px]
          left-1/2
          -translate-x-1/2
          w-[520px]
          h-[520px]
          rounded-full
          bg-purple-500/[0.07]
          blur-[110px]
          pointer-events-none
        " />

        <div className="
          absolute
          top-[-80px]
          right-[-140px]
          w-[320px]
          h-[320px]
          rounded-full
          bg-blue-500/[0.06]
          blur-[100px]
          pointer-events-none
        " />

        <div className="
          relative
          z-10
          max-w-5xl
          mx-auto
          text-center
        ">

          {/* eyebrow */}

          <div className="
            inline-flex
            items-center
            gap-2
            px-3.5
            py-1.5
            rounded-full
            bg-[var(--background-tertiary)]
            border border-[var(--border-primary)]
            text-[10px]
            sm:text-xs
            font-bold
            text-[var(--text-secondary)]
            mb-6
          ">
            <span className="
              w-1.5 h-1.5
              rounded-full
              bg-green-500
              animate-pulse
            " />

            The builder network
          </div>

          {/* heading */}

          <h1 className="
            text-[2.7rem]
            leading-[1.02]
            sm:text-6xl
            md:text-7xl
            font-extrabold
            tracking-[-0.055em]
            text-[var(--text-primary)]
          ">
            Build something
            <br />

            <span className="
              bg-gradient-to-r
              from-red-500
              via-purple-500
              to-blue-500
              bg-clip-text
              text-transparent
            ">
              worth building.
            </span>
          </h1>

          <p className="
            mt-5
            max-w-xl
            mx-auto
            text-sm
            sm:text-base
            leading-relaxed
            text-[var(--text-secondary)]
            font-medium
          ">
            Find co-founders, discover projects,
            share ideas and meet people who
            actually build.
          </p>

          {/* actions */}

          <div className="
            mt-7
            flex
            flex-col
            sm:flex-row
            items-center
            justify-center
            gap-3
          ">
            <GradientButton
              to="/signup"
              icon={
                <ArrowRight className="w-4 h-4" />
              }
            >
              Start building
            </GradientButton>

            <button
              type="button"
              onClick={() =>
                handleProtectedRoute(
                  '/discover'
                )
              }
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-6
                py-3
                rounded-full
                border border-[var(--border-primary)]
                bg-[var(--background-tertiary)]
                text-[var(--text-primary)]
                text-sm
                font-semibold
                transition-all
                hover:border-purple-500/40
                hover:bg-[var(--component-background)]
              "
            >
              <Compass className="w-4 h-4" />
              Explore projects
            </button>
          </div>

          {/* quick points */}

          <div className="
            mt-8
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-2
            text-[10px]
            sm:text-xs
            text-[var(--text-muted)]
            font-medium
          ">
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-purple-500" />
              Find co-founders
            </span>

            <span className="
              hidden
              sm:block
              opacity-40
            ">
              •
            </span>

            <span className="flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
              Validate ideas
            </span>

            <span className="
              hidden
              sm:block
              opacity-40
            ">
              •
            </span>

            <span className="flex items-center gap-1.5">
              <Rocket className="w-3.5 h-3.5 text-blue-500" />
              Launch products
            </span>
          </div>
        </div>
      </section>

      {/* ===================================================
          DISCOVER PROJECTS
      =================================================== */}

      <section className="
        py-12
        sm:py-16
        bg-[var(--background-primary)]
      ">
        <div className="
          container
          mx-auto
          px-4
        ">

          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
            mb-7
          ">
            <div>
              <div className="
                flex
                items-center
                gap-2
                mb-2
              ">
                <span className="
                  w-7 h-7
                  rounded-lg
                  bg-purple-500/10
                  text-purple-500
                  flex items-center justify-center
                ">
                  <Search className="w-4 h-4" />
                </span>

                <span className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.16em]
                  text-purple-500
                ">
                  Discover
                </span>
              </div>

              <h2 className="
                text-2xl
                md:text-3xl
                font-extrabold
                tracking-tight
              ">
                What are people building?
              </h2>

              <p className="
                mt-1.5
                text-xs
                sm:text-sm
                text-[var(--text-secondary)]
              ">
                Explore projects looking for builders.
              </p>
            </div>

            <Link
              to="/discover"
              className="
                inline-flex
                items-center
                gap-1.5
                text-xs
                font-bold
                text-purple-600
                dark:text-purple-400
                hover:gap-2
                transition-all
              "
            >
              View all
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {recentProjects.length > 0 ? (
            <div className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            ">
              {recentProjects.map(
                idea => (
                  <div
                    key={idea.id}
                    onClick={() =>
                      handleProtectedRoute(
                        `/idea/${idea.id}`
                      )
                    }
                    className="
                      cursor-pointer
                      transition-transform
                      hover:-translate-y-0.5
                    "
                  >
                    <ProjectCard
                      idea={idea}
                    />
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="
              rounded-2xl
              border border-dashed
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              p-10
              text-center
            ">
              <Compass className="
                w-8 h-8
                mx-auto
                text-[var(--text-muted)]
              " />

              <p className="
                mt-3
                text-sm
                font-semibold
              ">
                Projects are coming in.
              </p>

              <p className="
                mt-1
                text-xs
                text-[var(--text-muted)]
              ">
                Be one of the first builders to
                publish an idea.
              </p>
            </div>
          )}

          <div className="
            mt-7
            flex
            flex-wrap
            justify-center
            gap-3
          ">
            <button
              type="button"
              onClick={() =>
                handleProtectedRoute(
                  '/discover'
                )
              }
              className="
                button-gradient
                text-white
                px-6
                py-2.5
                rounded-full
                text-[10px]
                font-black
                uppercase
                tracking-widest
              "
            >
              Explore projects
            </button>

            <button
              type="button"
              onClick={() =>
                handleProtectedRoute(
                  '/submit-idea'
                )
              }
              className="
                px-6
                py-2.5
                rounded-full
                text-[10px]
                font-black
                uppercase
                tracking-widest
                bg-[var(--background-tertiary)]
                border border-[var(--border-primary)]
                text-[var(--text-primary)]
                hover:border-purple-500/40
                transition-all
              "
            >
              Submit an idea
            </button>
          </div>
        </div>
      </section>

      {/* ===================================================
          STATS
      =================================================== */}

      <section className="
        py-12
        bg-[var(--background-secondary)]
        border-y border-[var(--border-primary)]
      ">
        <div className="
          container
          mx-auto
          px-4
        ">
          <div className="
            max-w-2xl
            mx-auto
            text-center
            mb-8
          ">
            <p className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-purple-500
            ">
              Growing together
            </p>

            <h2 className="
              mt-2
              text-2xl
              md:text-3xl
              font-extrabold
              tracking-tight
            ">
              An ecosystem in motion.
            </h2>

            <p className="
              mt-2
              text-xs
              sm:text-sm
              text-[var(--text-secondary)]
            ">
              Ideas become projects. Projects
              become teams. Teams build companies.
            </p>
          </div>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-3
            gap-4
            max-w-5xl
            mx-auto
          ">
            <EcosystemStatCard
              endValue={50}
              suffix="+"
              label="Projects"
              description="Ideas moving from concept to execution."
              icon={
                <BarChart3 className="
                  w-5 h-5
                  text-white
                " />
              }
              gradient="
                from-blue-500
                to-cyan-400
              "
            />

            <EcosystemStatCard
              endValue={200}
              suffix="+"
              label="Builders connected"
              description="Founders, developers, designers and creators."
              icon={
                <Users className="
                  w-5 h-5
                  text-white
                " />
              }
              gradient="
                from-purple-500
                to-pink-500
              "
            />

            <EcosystemStatCard
              endValue={500}
              suffix="+"
              label="Innovators"
              description="People looking for their next thing to build."
              icon={
                <Zap className="
                  w-5 h-5
                  text-white
                " />
              }
              gradient="
                from-orange-500
                to-yellow-400
              "
            />
          </div>
        </div>
      </section>

      {/* ===================================================
          WHAT YOU CAN DO
      =================================================== */}

      <section className="
        py-14
        sm:py-16
        bg-[var(--background-primary)]
      ">
        <div className="
          container
          mx-auto
          px-4
        ">

          <div className="
            max-w-2xl
            mx-auto
            text-center
            mb-9
          ">
            <p className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-purple-500
            ">
              One place to build
            </p>

            <h2 className="
              mt-2
              text-2xl
              md:text-3xl
              font-extrabold
              tracking-tight
            ">
              From idea to launch.
            </h2>

            <p className="
              mt-2
              text-xs
              sm:text-sm
              text-[var(--text-secondary)]
            ">
              Everything you need to move forward,
              without the noise.
            </p>
          </div>

          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            max-w-6xl
            mx-auto
          ">
            {features.map(
              (feature, index) => (
                <div
                  key={index}
                  className="
                    group
                    bg-[var(--component-background)]
                    border border-[var(--border-primary)]
                    rounded-2xl
                    p-5
                    transition-all duration-300
                    hover:-translate-y-1
                    hover:border-purple-500/30
                  "
                >
                  <div className="
                    w-10 h-10
                    rounded-xl
                    bg-purple-500/10
                    text-purple-500
                    flex
                    items-center
                    justify-center
                    mb-5
                  ">
                    {feature.icon}
                  </div>

                  <h3 className="
                    text-sm
                    font-bold
                    text-[var(--text-primary)]
                  ">
                    {feature.title}
                  </h3>

                  <p className="
                    mt-1.5
                    text-xs
                    leading-relaxed
                    text-[var(--text-secondary)]
                  ">
                    {feature.description}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          STARTALK
      =================================================== */}

      <section className="
        py-14
        bg-[var(--background-secondary)]
        border-y border-[var(--border-primary)]
        overflow-hidden
      ">
        <div className="
          container
          mx-auto
          px-4
        ">
          <div className="
            max-w-6xl
            mx-auto
            rounded-[2rem]
            border border-[var(--border-primary)]
            bg-[var(--component-background)]
            overflow-hidden
          ">
            <div className="
              grid
              lg:grid-cols-2
              gap-8
              p-6
              sm:p-8
              lg:p-10
            ">

              {/* left */}

              <div className="
                flex
                flex-col
                justify-center
              ">
                <div className="
                  w-10 h-10
                  rounded-xl
                  bg-purple-500/10
                  text-purple-500
                  flex items-center justify-center
                  mb-5
                ">
                  <MessageCircle className="w-5 h-5" />
                </div>

                <p className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-purple-500
                ">
                  Startalks
                </p>

                <h2 className="
                  mt-2
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  tracking-tight
                ">
                  See what builders
                  are thinking.
                </h2>

                <p className="
                  mt-3
                  max-w-md
                  text-xs
                  sm:text-sm
                  leading-relaxed
                  text-[var(--text-secondary)]
                ">
                  Share wins, ask questions,
                  talk through pivots and learn
                  from people building in public.
                </p>

                <div className="
                  mt-6
                  flex
                  flex-wrap
                  gap-3
                ">
                  <Link
                    to="/startalks"
                    className="
                      button-gradient
                      text-white
                      px-6
                      py-2.5
                      rounded-full
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      inline-flex
                      items-center
                      gap-2
                    "
                  >
                    Open Startalks
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/signup"
                    className="
                      px-6
                      py-2.5
                      rounded-full
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      bg-[var(--background-tertiary)]
                      border border-[var(--border-primary)]
                    "
                  >
                    Join the conversation
                  </Link>
                </div>
              </div>

              {/* right */}

              <div className="
                grid
                grid-cols-2
                gap-3
                self-center
              ">
                {[
                  {
                    name: 'Sarah',
                    text: 'Just secured my first beta users.',
                    icon: '🚀',
                  },
                  {
                    name: 'Mike',
                    text: 'The pivot finally started making sense.',
                    icon: '💡',
                  },
                  {
                    name: 'Elena',
                    text: 'Shipping the new version today.',
                    icon: '⚡',
                  },
                  {
                    name: 'Liam',
                    text: 'Building in public is worth it.',
                    icon: '🔨',
                  },
                ].map(
                  (talk, index) => (
                    <div
                      key={index}
                      className="
                        p-4
                        rounded-2xl
                        bg-[var(--background-tertiary)]
                        border border-[var(--border-primary)]
                        transition-all
                        hover:-translate-y-1
                      "
                    >
                      <div className="
                        flex
                        items-center
                        justify-between
                        gap-2
                      ">
                        <div className="
                          flex
                          items-center
                          gap-2
                        ">
                          <div className="
                            w-7 h-7
                            rounded-full
                            icon-bg-gradient
                            flex
                            items-center
                            justify-center
                            text-[10px]
                            text-white
                            font-bold
                          ">
                            {talk.name[0]}
                          </div>

                          <span className="
                            text-[10px]
                            font-bold
                          ">
                            {talk.name}
                          </span>
                        </div>

                        <span className="text-sm">
                          {talk.icon}
                        </span>
                      </div>

                      <p className="
                        mt-3
                        text-[11px]
                        leading-relaxed
                        text-[var(--text-secondary)]
                      ">
                        {talk.text}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          ASSET EXCHANGE
      =================================================== */}

      <section className="
        py-14
        sm:py-16
        bg-[var(--background-primary)]
      ">
        <div className="
          container
          mx-auto
          px-4
        ">
          <div className="
            max-w-6xl
            mx-auto
            rounded-[2rem]
            border border-[var(--border-primary)]
            bg-[var(--component-background)]
            p-6
            sm:p-8
            lg:p-10
            relative
            overflow-hidden
          ">

            <div className="
              absolute
              -top-28
              -right-28
              w-64
              h-64
              rounded-full
              bg-emerald-500/[0.07]
              blur-3xl
              pointer-events-none
            " />

            <div className="
              relative
              z-10
              flex
              flex-col
              lg:flex-row
              lg:items-end
              lg:justify-between
              gap-6
              mb-8
            ">
              <div>
                <div className="
                  flex
                  items-center
                  gap-2
                  mb-3
                ">
                  <div className="
                    w-9 h-9
                    rounded-xl
                    bg-emerald-500/10
                    text-emerald-500
                    flex items-center justify-center
                  ">
                    <CircleDollarSign className="w-5 h-5" />
                  </div>

                  <span className="
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.18em]
                    text-emerald-500
                  ">
                    Asset Exchange
                  </span>
                </div>

                <h2 className="
                  text-2xl
                  sm:text-3xl
                  font-extrabold
                  tracking-tight
                ">
                  Build. Grow. Exit.
                </h2>

                <p className="
                  mt-2
                  max-w-xl
                  text-xs
                  sm:text-sm
                  text-[var(--text-secondary)]
                  leading-relaxed
                ">
                  Discover digital products looking
                  for their next chapter — or put
                  yours in front of potential buyers.
                </p>
              </div>

              <Link
                to="/assets"
                className="
                  shrink-0
                  inline-flex
                  items-center
                  gap-1.5
                  text-xs
                  font-bold
                  text-emerald-600
                  dark:text-emerald-400
                "
              >
                Explore assets
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-4
            ">
              <MiniFeature
                icon={
                  <Search className="w-4 h-4" />
                }
                title="Discover"
                text="Find products, startups and digital assets worth exploring."
              />

              <MiniFeature
                icon={
                  <BadgeCheck className="w-4 h-4" />
                }
                title="Evaluate"
                text="Understand the product, traction and opportunity before reaching out."
              />

              <MiniFeature
                icon={
                  <Handshake className="w-4 h-4" />
                }
                title="Connect"
                text="Talk directly with founders and take the conversation forward."
              />
            </div>

            <div className="
              mt-7
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-5
              p-5
              rounded-2xl
              bg-[var(--background-tertiary)]
              border border-[var(--border-primary)]
            ">
              <div className="
                text-center
                sm:text-left
              ">
                <h3 className="
                  text-sm
                  font-bold
                ">
                  Have something worth building on?
                </h3>

                <p className="
                  mt-1
                  text-xs
                  text-[var(--text-secondary)]
                ">
                  List your digital asset on Startives.
                </p>
              </div>

              <Link
                to="/submit-asset"
                className="
                  button-gradient
                  text-white
                  px-6
                  py-2.5
                  rounded-full
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  whitespace-nowrap
                "
              >
                List your asset
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          WHY STARTIVES
      =================================================== */}

      <section className="
        py-14
        sm:py-16
        bg-[var(--background-secondary)]
      ">
        <div className="
          container
          mx-auto
          px-4
        ">
          <div className="
            max-w-2xl
            mx-auto
            text-center
            mb-10
          ">
            <p className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.18em]
              text-purple-500
            ">
              Why Startives
            </p>

            <h2 className="
              mt-2
              text-2xl
              md:text-3xl
              font-extrabold
              tracking-tight
            ">
              The right people change everything.
            </h2>
          </div>

          <div className="
            max-w-5xl
            mx-auto
            grid
            md:grid-cols-3
            gap-5
          ">

            <div className="
              bg-[var(--component-background)]
              border border-[var(--border-primary)]
              rounded-2xl
              p-6
            ">
              <div className="
                w-10 h-10
                rounded-xl
                bg-blue-500/10
                text-blue-500
                flex items-center justify-center
              ">
                <Globe2 className="w-5 h-5" />
              </div>

              <h3 className="
                mt-5
                text-base
                font-bold
              ">
                Meet beyond your circle.
              </h3>

              <p className="
                mt-2
                text-xs
                leading-relaxed
                text-[var(--text-secondary)]
              ">
                Discover builders from different
                backgrounds, skills and places.
              </p>
            </div>

            <div className="
              bg-[var(--component-background)]
              border border-[var(--border-primary)]
              rounded-2xl
              p-6
            ">
              <div className="
                w-10 h-10
                rounded-xl
                bg-purple-500/10
                text-purple-500
                flex items-center justify-center
              ">
                <Users className="w-5 h-5" />
              </div>

              <h3 className="
                mt-5
                text-base
                font-bold
              ">
                Find your missing piece.
              </h3>

              <p className="
                mt-2
                text-xs
                leading-relaxed
                text-[var(--text-secondary)]
              ">
                Find the developer, designer,
                marketer or co-founder your idea needs.
              </p>
            </div>

            <div className="
              bg-[var(--component-background)]
              border border-[var(--border-primary)]
              rounded-2xl
              p-6
            ">
              <div className="
                w-10 h-10
                rounded-xl
                bg-orange-500/10
                text-orange-500
                flex items-center justify-center
              ">
                <Rocket className="w-5 h-5" />
              </div>

              <h3 className="
                mt-5
                text-base
                font-bold
              ">
                Stop planning. Start shipping.
              </h3>

              <p className="
                mt-2
                text-xs
                leading-relaxed
                text-[var(--text-secondary)]
              ">
                Turn conversations into collaborations
                and ideas into products.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ===================================================
          COMMUNITY
      =================================================== */}

      <section className="
        py-14
        sm:py-16
        bg-[var(--background-primary)]
      ">
        <div className="
          container
          mx-auto
          px-4
        ">
          <div className="
            flex
            flex-col
            sm:flex-row
            sm:items-end
            sm:justify-between
            gap-4
            mb-8
          ">
            <div>
              <p className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.18em]
                text-purple-500
              ">
                Community
              </p>

              <h2 className="
                mt-2
                text-2xl
                md:text-3xl
                font-extrabold
                tracking-tight
              ">
                Built by builders.
              </h2>
            </div>

            <span className="
              text-xs
              text-[var(--text-muted)]
            ">
              Real people. Real projects.
            </span>
          </div>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-4
            max-w-6xl
            mx-auto
          ">
            {testimonials.map(
              (testimonial, index) => (
                <div
                  key={index}
                  className="
                    p-5
                    rounded-2xl
                    border border-[var(--border-primary)]
                    bg-[var(--component-background)]
                    transition-all
                    hover:-translate-y-1
                    hover:border-purple-500/20
                  "
                >
                  <div className="
                    flex
                    items-center
                    justify-between
                    mb-5
                  ">
                    <div className="
                      flex
                      items-center
                      gap-2
                    ">
                      <div className="
                        w-8 h-8
                        rounded-full
                        icon-bg-gradient
                        text-white
                        text-[10px]
                        font-bold
                        flex items-center justify-center
                      ">
                        {testimonial.name[0]}
                      </div>

                      <div>
                        <p className="
                          text-xs
                          font-bold
                        ">
                          {testimonial.name}
                        </p>

                        <p className="
                          text-[9px]
                          text-[var(--text-muted)]
                        ">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>

                    <div className="
                      flex
                      gap-0.5
                      text-yellow-400
                    ">
                      {[1, 2, 3, 4, 5].map(
                        star => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-current"
                          />
                        )
                      )}
                    </div>
                  </div>

                  <p className="
                    text-xs
                    sm:text-sm
                    leading-relaxed
                    text-[var(--text-secondary)]
                  ">
                    “{testimonial.quote}”
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ===================================================
          FINAL CTA
      =================================================== */}

      <section className="
        py-14
        sm:py-16
        px-4
        bg-[var(--background-secondary)]
        border-t border-[var(--border-primary)]
      ">
        <div className="
          max-w-3xl
          mx-auto
          text-center
        ">
          <div className="
            mx-auto
            w-11 h-11
            rounded-2xl
            icon-bg-gradient
            text-white
            flex items-center justify-center
            mb-5
          ">
            <Sparkles className="w-5 h-5" />
          </div>

          <h2 className="
            text-2xl
            sm:text-3xl
            md:text-4xl
            font-extrabold
            tracking-tight
          ">
            Your next build starts here.
          </h2>

          <p className="
            mt-3
            max-w-lg
            mx-auto
            text-xs
            sm:text-sm
            leading-relaxed
            text-[var(--text-secondary)]
          ">
            Find the people, ideas and opportunities
            that move you forward.
          </p>

          <div className="
            mt-6
            flex
            justify-center
          ">
            <GradientButton
              to="/signup"
              icon={
                <ArrowRight className="w-4 h-4" />
              }
            >
              Join Startives
            </GradientButton>
          </div>
        </div>
      </section>

      {/* ===================================================
          FOOTER
          PEERLIST-STYLE GHOST WORDMARK
      =================================================== */}

      <footer className="
        relative
        bg-[var(--background-secondary)]
        overflow-hidden
        pt-10
        pb-8
        border-t border-[var(--border-primary)]
      ">

        <div className="
          container
          mx-auto
          px-5
        ">

          {/* links */}

          <div className="
            grid
            grid-cols-2
            sm:grid-cols-4
            gap-x-8
            gap-y-8
            max-w-5xl
            mx-auto
          ">

            <div>
              <h3 className="
                text-xs
                font-bold
                text-[var(--text-primary)]
                mb-4
              ">
                Explore
              </h3>

              <div className="
                flex
                flex-col
                gap-2.5
              ">
                <Link
                  to="/discover"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Discover Projects
                </Link>

                <Link
                  to="/users"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Find Builders
                </Link>

                <Link
                  to="/startalks"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Startalks
                </Link>

                <Link
                  to="/assets"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Asset Exchange
                </Link>
              </div>
            </div>

            <div>
              <h3 className="
                text-xs
                font-bold
                text-[var(--text-primary)]
                mb-4
              ">
                Build
              </h3>

              <div className="
                flex
                flex-col
                gap-2.5
              ">
                <Link
                  to="/submit-idea"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Submit an Idea
                </Link>

                <Link
                  to="/submit-asset"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  List an Asset
                </Link>

                <Link
                  to="/signup"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Create Profile
                </Link>
              </div>
            </div>

            <div>
              <h3 className="
                text-xs
                font-bold
                text-[var(--text-primary)]
                mb-4
              ">
                Company
              </h3>

              <div className="
                flex
                flex-col
                gap-2.5
              ">
                <Link
                  to="/about"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  About
                </Link>

                <Link
                  to="/blog"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Blog
                </Link>

                <Link
                  to="/contact"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <h3 className="
                text-xs
                font-bold
                text-[var(--text-primary)]
                mb-4
              ">
                Legal
              </h3>

              <div className="
                flex
                flex-col
                gap-2.5
              ">
                <Link
                  to="/privacy"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Privacy
                </Link>

                <Link
                  to="/terms"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Terms
                </Link>

                <Link
                  to="/code-of-conduct"
                  className="
                    text-xs
                    text-[var(--text-secondary)]
                    hover:text-[var(--text-primary)]
                    transition-colors
                  "
                >
                  Code of Conduct
                </Link>
              </div>
            </div>
          </div>

          {/* small footer nav */}

          <div className="
            mt-10
            pt-5
            border-t border-[var(--border-primary)]
            flex
            flex-wrap
            justify-center
            items-center
            gap-x-5
            gap-y-2
            text-[10px]
            text-[var(--text-muted)]
          ">
            <Link
              to="/about"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Help
            </Link>

            <Link
              to="/privacy"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Privacy
            </Link>

            <Link
              to="/terms"
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Terms
            </Link>
          </div>

          {/* =================================================
              HUGE GHOST WORDMARK
          ================================================= */}

          <div
            className="
              relative
              mt-8
              h-[110px]
              sm:h-[150px]
              md:h-[175px]
              flex
              items-end
              justify-center
              overflow-hidden
              select-none
            "
            aria-hidden="true"
          >
            <div
              className="
                absolute
                left-1/2
                bottom-[-12px]
                -translate-x-1/2
                whitespace-nowrap
                text-[82px]
                sm:text-[120px]
                md:text-[155px]
                lg:text-[180px]
                leading-none
                font-black
                tracking-[-0.08em]
                text-[var(--text-primary)]
                opacity-[0.10]
                dark:opacity-[0.16]
              "
            >
              {APP_NAME}
            </div>

            {/* subtle shadow / blur layer */}

            <div
              className="
                absolute
                left-1/2
                bottom-[-22px]
                -translate-x-1/2
                whitespace-nowrap
                text-[82px]
                sm:text-[120px]
                md:text-[155px]
                lg:text-[180px]
                leading-none
                font-black
                tracking-[-0.08em]
                text-black
                dark:text-white
                opacity-[0.035]
                blur-[5px]
                scale-[1.01]
              "
            >
              {APP_NAME}
            </div>
          </div>

          {/* copyright */}

          <div className="
            relative
            z-10
            flex
            items-center
            justify-center
            gap-2
            text-[10px]
            sm:text-xs
            text-[var(--text-muted)]
            pb-1
          ">
            <span>
              © {new Date().getFullYear()}
            </span>

            <span className="
              w-5 h-5
              rounded-md
              icon-bg-gradient
              text-white
              flex
              items-center
              justify-center
              text-[9px]
              font-black
            ">
              S
            </span>

            <span className="font-medium">
              {APP_NAME}
            </span>
          </div>

        </div>
      </footer>
    </div>
  );
};

export default HomePage;