import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import { APP_NAME } from '../constants';
import { ProjectCard } from '../pages/ProjectsListPage';
import {
  Users,
  Sparkles,
  Box,
  Globe2,
  CheckCircle2,
  BarChart3,
  Zap,
  DollarSign,
  ArrowRight,
  Star,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Rocket,
  ShieldCheck,
} from 'lucide-react';

function useInView<T extends HTMLElement>(threshold = 0.2) {
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

  return { ref, inView };
}

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: 'div' | 'section';
}> = ({ children, delay = 0, className = '', as = 'div' }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const Tag = as as any;

  return (
    <Tag
      ref={ref}
      className={`reveal-item ${inView ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  );
};

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

  const handleMove = useCallback((e: React.MouseEvent) => {
    const el = btnRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();

    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }, []);

  const commonClasses = `button-gradient magnetic-btn group relative inline-flex items-center justify-center overflow-hidden text-white font-semibold py-3 px-8 rounded-full text-base transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-red-500/40 ${className}`;

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

const useCountUp = (
  endValue: number,
  active: boolean,
  duration = 1800
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const totalFrames = Math.round(duration / (1000 / 60));

    const counter = setInterval(() => {
      start++;

      const progress = start / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(endValue * eased));

      if (start >= totalFrames) {
        clearInterval(counter);
        setCount(endValue);
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [endValue, active, duration]);

  return count;
};

const EcosystemStatCard: React.FC<{
  endValue: number;
  label: string;
  description: string;
  icon: React.ReactNode;
  suffix?: string;
  gradient: string;
  delay?: number;
}> = ({
  endValue,
  label,
  description,
  icon,
  suffix,
  gradient,
  delay = 0,
}) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const count = useCountUp(endValue, inView);

  const textGradient =
    theme === 'dark'
      ? 'from-white to-neutral-400'
      : 'from-neutral-900 to-neutral-600';

  return (
    <div
      ref={ref}
      className={`reveal-item ${
        inView ? 'is-visible' : ''
      } stat-card bg-[var(--component-background)] p-6 rounded-2xl border border-[var(--border-primary)] transition-all duration-500 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-xl`}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
      }}
    >
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-gradient-to-br ${gradient} shadow-lg shadow-black/5`}
      >
        {icon}
      </div>

      <p
        className={`text-3xl font-bold bg-gradient-to-r ${textGradient} bg-clip-text text-transparent font-poppins tabular-nums`}
      >
        {count}
        {suffix}
      </p>

      <h3 className="text-base font-bold text-[var(--text-primary)] mt-3 font-poppins">
        {label}
      </h3>

      <p className="text-[var(--text-secondary)] mt-1 text-xs font-poppins">
        {description}
      </p>
    </div>
  );
};

const HomePage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { startupIdeas, currentUser } = useAppContext();

  const recentProjects = [...startupIdeas]
    .filter((idea) => !idea.askingPrice)
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.postedDate).getTime() -
        new Date(a.createdAt || a.postedDate).getTime()
    )
    .slice(0, 4);

  const handleProtectedRoute = (path: string) => {
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate(path);
    }
  };

  const features = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-white" />,
      title: 'Validate your idea',
      description:
        'Get feedback on your startup concept from a diverse community of experts and peers.',
      gradient: 'from-sky-400 to-cyan-300',
    },
    {
      icon: <Users className="w-5 h-5 text-white" />,
      title: 'Find a co-founder',
      description:
        'Connect with passionate individuals who share your vision and have the skills to help you succeed.',
      gradient: 'from-red-500 to-rose-400',
    },
    {
      icon: <Box className="w-5 h-5 text-white" />,
      title: 'Build your MVP',
      description:
        'Assemble a talented team to bring your Minimum Viable Product to life and start testing the market.',
      gradient: 'from-orange-400 to-yellow-300',
    },
    {
      icon: <Globe2 className="w-5 h-5 text-white" />,
      title: 'Scale your venture',
      description:
        'Access a global network of talent, mentors, and resources to grow your startup beyond its initial stages.',
      gradient: 'from-emerald-400 to-teal-300',
    },
  ];

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

  const companyLogos = [
    {
      component: <Linkedin />,
      alt: 'LinkedIn',
    },
    {
      component: <Github />,
      alt: 'GitHub',
    },
    {
      component: <Twitter />,
      alt: 'X',
    },
    {
      component: <Facebook />,
      alt: 'Facebook',
    },
  ];

  const whyChooseFeatures = [
    {
      align: 'left',
      title: 'Forge global alliances.',
      description:
        'Break geographical barriers. Connect with a diverse pool of innovators, mentors, and investors from every corner of the globe.',
      gradient: 'from-sky-400 to-cyan-300',
    },
    {
      align: 'right',
      title: 'Assemble your dream team.',
      description:
        'Find the missing piece to your puzzle. Our platform is the crucible where visionary founders meet brilliant developers and designers.',
      gradient: 'from-red-500 to-red-400',
    },
    {
      align: 'left',
      title: 'Launchpad for legends.',
      description:
        'Go from a spark of genius to a market-ready MVP. We provide the tools and community support to validate your vision.',
      gradient: 'from-orange-400 to-yellow-300',
    },
  ];

  return (
    <div
      ref={pageRef}
      className="bg-white text-[var(--text-primary)] overflow-x-hidden font-poppins min-h-full"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: APP_NAME,
            url: 'https://startives.com',
            sameAs: [
              'https://linkedin.com/company/startives',
              'https://github.com/startives',
              'https://twitter.com/startives',
            ],
          }),
        }}
      />

      <div className="relative z-10 bg-white">

        {/* HERO */}
        <section className="hero-animated-bg relative pt-24 pb-24 sm:pt-28 sm:pb-32 text-center px-4">
          <div className="absolute inset-0 z-0 dot-pattern-bg" />

          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none animate-float-slow" />

          <div
            className="absolute -top-10 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-[100px] pointer-events-none animate-float-slow"
            style={{ animationDelay: '1.5s' }}
          />

          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background-primary)] to-transparent z-10" />

          <div className="relative z-20 max-w-4xl mx-auto">

            <div
              className="reveal-item is-visible"
              style={{ transitionDelay: '0ms' }}
            >
              <img
                src="https://i.postimg.cc/pLTtqf3Q/Picsart-25-09-19-20-29-01-019.png"
                alt={`${APP_NAME} logo`}
                className="mx-auto mb-6 h-20 w-20 drop-shadow-lg"
              />
            </div>

            <div
              className="reveal-item is-visible"
              style={{ transitionDelay: '80ms' }}
            >
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--component-background)] text-xs font-semibold text-[var(--text-secondary)] font-poppins">
                <Rocket className="w-3.5 h-3.5 text-red-500" />
                Now onboarding builders worldwide
              </div>
            </div>

            <div
              className="reveal-item is-visible"
              style={{ transitionDelay: '160ms' }}
            >
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[var(--text-primary)] font-poppins">
                Where visionaries &
                <br />
                <span className="bg-gradient-to-r from-red-500 to-blue-500 gradient-text">
                  builders connect
                </span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto font-medium font-poppins">
                {APP_NAME} is your launchpad for turning visionary ideas into
                reality. Connect with co-founders, assemble your dream team,
                and build the future, together.
              </p>
            </div>

            <div
              className="mt-10 flex items-center justify-center gap-4 reveal-item is-visible"
              style={{ transitionDelay: '240ms' }}
            >
              <GradientButton
                to="/signup"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Join the future
              </GradientButton>
            </div>

            <div
              className="mt-10 flex items-center justify-center gap-x-6 gap-y-2 flex-wrap text-sm text-[var(--text-secondary)] reveal-item is-visible"
              style={{ transitionDelay: '320ms' }}
            >
              <span className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full icon-bg-gradient flex items-center justify-center">
                  <Users className="w-2.5 h-2.5 text-white" />
                </div>
                Find co-founders
              </span>

              <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                •
              </span>

              <span className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full icon-bg-gradient flex items-center justify-center">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </div>
                Validate ideas
              </span>

              <span className="hidden sm:inline text-neutral-400 dark:text-neutral-600">
                •
              </span>

              <span className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full icon-bg-gradient flex items-center justify-center">
                  <Box className="w-2.5 h-2.5 text-white" />
                </div>
                Assemble teams
              </span>
            </div>
          </div>
        </section>

        {/* DISCOVER PROJECTS */}
        <section className="py-12 sm:py-16 bg-[var(--background-primary)]">
          <div className="container mx-auto px-4">

            <Reveal className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins uppercase bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Discover Projects
              </h2>

              <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                Explore live startup ideas, apply to join teams, or submit your
                own and find co-founders.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentProjects.map((idea, i) => (
                <Reveal key={idea.id} delay={i * 80}>
                  <div
                    onClick={() =>
                      handleProtectedRoute(`/idea/${idea.id}`)
                    }
                    className="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  >
                    <ProjectCard idea={idea} />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              className="flex justify-center gap-4 mt-10"
              delay={160}
            >
              <button
                onClick={() => handleProtectedRoute('/discover')}
                className="button-gradient text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Explore Projects
              </button>

              <button
                onClick={() => handleProtectedRoute('/submit-idea')}
                className="bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-primary)] px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-[var(--component-background-hover)]"
              >
                Submit Idea
              </button>
            </Reveal>
          </div>
        </section>

        {/* ECOSYSTEM */}
        <section className="py-12 sm:py-16 bg-[var(--background-secondary)]">
          <div className="container mx-auto px-4">

            <Reveal className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-poppins">
                An ecosystem in motion
              </h2>

              <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                Witness the pulse of innovation. Our platform is a dynamic
                network where connections spark, ideas ignite, and ventures take
                flight every day.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <EcosystemStatCard
                endValue={50}
                suffix="+"
                label="Projects launched"
                description="From initial spark to successful launch, ventures are taking off."
                icon={<BarChart3 className="w-7 h-7 text-white" />}
                gradient="from-sky-500 to-cyan-400"
              />

              <EcosystemStatCard
                endValue={200}
                suffix="+"
                label="Founders connected"
                description="Building powerful partnerships and lasting co-founder relationships."
                icon={<Users className="w-7 h-7 text-white" />}
                gradient="from-red-500 to-red-600"
                delay={100}
              />

              <EcosystemStatCard
                endValue={500}
                suffix="+"
                label="Innovators"
                description="A growing community of developers, designers, and strategists."
                icon={<Zap className="w-7 h-7 text-white" />}
                gradient="from-orange-400 to-yellow-300"
                delay={200}
              />

            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-12 bg-[var(--background-primary)]">
          <div className="container mx-auto px-4">

            <Reveal className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight font-poppins">
                Everything you need to start
              </h2>

              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                From idea to launch, {APP_NAME} provides the tools and community
                to support your journey.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

              {features.map((feature, index) => (
                <Reveal key={index} delay={index * 90}>
                  <div className="feature-card-item bg-[var(--component-background)] p-6 rounded-2xl border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-2 hover:border-red-500/50 hover:shadow-lg text-center flex flex-col items-center h-full">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-gradient-to-br ${feature.gradient} transition-transform duration-300 group-hover:rotate-6`}
                    >
                      {feature.icon}
                    </div>

                    <h3 className="text-base font-bold text-[var(--text-primary)] mb-1.5 tracking-tight font-poppins">
                      {feature.title}
                    </h3>

                    <p className="text-[var(--text-secondary)] text-xs font-medium leading-relaxed font-poppins">
                      {feature.description}
                    </p>

                  </div>
                </Reveal>
              ))}

            </div>
          </div>
        </section>

        {/* ASSET EXCHANGE */}
        <section className="py-10 bg-[var(--background-secondary)] relative overflow-hidden">

          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />

          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">

            <Reveal className="max-w-3xl mx-auto text-center mb-6">
              <h2 className="text-xl md:text-2xl font-extrabold text-[var(--text-primary)] tracking-tight font-poppins">
                The asset exchange
              </h2>

              <div className="w-12 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 mx-auto my-3 rounded-full" />

              <p className="text-[var(--text-secondary)] text-xs sm:text-sm leading-relaxed font-medium opacity-90 font-poppins">
                A premium ecosystem where validated digital products find new
                growth. We facilitate direct introductions between high-level
                builders and strategic acquirers.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <Reveal>
                <div className="bg-[var(--component-background)] p-6 rounded-3xl border border-[var(--border-primary)] flex flex-col items-center text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
                    <DollarSign className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-black text-[var(--text-primary)] mb-2 tracking-tight font-poppins">
                    Vetted inventory
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium opacity-80 font-poppins">
                    Access startups with proven revenue, verified MRR, and clean
                    codebases. Every listing undergoes an internal audit process.
                  </p>

                </div>
              </Reveal>

              <Reveal delay={90}>
                <div className="bg-[var(--component-background)] p-6 rounded-3xl border border-[var(--border-primary)] flex flex-col items-center text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                  <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 mb-4">
                    <ShieldCheck className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-black text-[var(--text-primary)] mb-2 tracking-tight font-poppins">
                    Secured handover
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium opacity-80 font-poppins">
                    Gain access to standardized migration checklists for code,
                    domains, and documentation to ensure a predictable transfer.
                  </p>

                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="bg-[var(--component-background)] p-6 rounded-3xl border border-[var(--border-primary)] flex flex-col items-center text-center h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

                  <div className="w-12 h-12 rounded-2xl bg-sky-100 dark:bg-sky-500/10 flex items-center justify-center text-sky-600 mb-4">
                    <Users className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-black text-[var(--text-primary)] mb-2 tracking-tight font-poppins">
                    Founder access
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-medium opacity-80 font-poppins">
                    Skip the middleman. Chat directly with original builders for
                    due diligence. We provide the room, you finalize the transaction.
                  </p>

                </div>
              </Reveal>

            </div>

            <Reveal>
              <div className="p-6 sm:p-8 rounded-[2.5rem] bg-white dark:bg-black border border-gray-100 dark:border-neutral-900 relative overflow-hidden text-neutral-900 dark:text-white max-w-4xl mx-auto">

                <div className="absolute inset-0 dot-pattern-bg opacity-[0.03] pointer-events-none" />

                <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-60" />

                <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8">

                  <div className="text-center sm:text-left max-w-lg">
                    <h3 className="text-xl font-black tracking-tight mb-2 italic font-poppins">
                      Ready to cash out?
                    </h3>

                    <p className="text-neutral-500 dark:text-neutral-400 text-sm font-medium leading-relaxed font-poppins">
                      List your digital assets in front of thousands of potential
                      acquirers. High-intent, zero commissions, and founder-focused.
                    </p>
                  </div>

                  <Link
                    to="/submit-asset"
                    className="w-full sm:w-auto px-10 py-3 button-gradient text-white font-black uppercase text-[11px] tracking-widest rounded-full transition-transform duration-300 hover:scale-105 active:scale-95 text-center font-poppins"
                  >
                    Enroll your asset
                  </Link>

                </div>
              </div>
            </Reveal>

          </div>
        </section>

        {/* STARTALKS */}
        <section className="py-12 bg-[var(--background-primary)] relative overflow-hidden">

          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-40" />

          <div className="container mx-auto px-4 relative z-10">

            <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">

              <Reveal className="lg:w-1/2 space-y-6 text-center lg:text-left">

                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-[var(--text-primary)] font-poppins uppercase">
                  The pulse of innovation
                </h2>

                <p className="text-sm sm:text-base text-[var(--text-secondary)] font-medium leading-relaxed font-poppins">
                  Explore real-time thoughts, wins, and pivots from founders
                  building the next big things. Startalks is the social layer
                  where the community breathes.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">

                  <Link
                    to="/startalks"
                    className="button-gradient text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-transform duration-300 hover:scale-105 font-poppins"
                  >
                    Enter the feed
                  </Link>

                  <Link
                    to="/signup"
                    className="bg-[var(--background-tertiary)] text-[var(--text-primary)] border border-[var(--border-primary)] px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-[var(--component-background-hover)] transition-all font-poppins"
                  >
                    Join the talk
                  </Link>

                </div>
              </Reveal>

              <Reveal className="lg:w-1/2 relative" delay={120}>

                <div className="grid grid-cols-2 gap-4">

                  {[
                    {
                      name: 'Sarah J.',
                      content: 'Just secured beta testers!',
                      emoji: '🎉',
                    },
                    {
                      name: 'Mike R.',
                      content: 'Pivot was the best decision.',
                      emoji: '💡',
                    },
                    {
                      name: 'Elena W.',
                      content: 'Scaling to 10k MRR today.',
                      emoji: '📈',
                    },
                    {
                      name: 'Liam P.',
                      content:
                        'Building in public is hard but worth it.',
                      emoji: '🔨',
                    },
                  ].map((talk, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-[var(--border-primary)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg font-poppins"
                    >
                      <div className="flex items-center gap-2 mb-2">

                        <div className="w-6 h-6 rounded-full icon-bg-gradient flex items-center justify-center text-[10px] text-white font-bold">
                          {talk.name[0]}
                        </div>

                        <span className="text-[10px] font-bold text-[var(--text-primary)]">
                          {talk.name}
                        </span>

                      </div>

                      <p className="text-[11px] text-[var(--text-secondary)] font-medium italic">
                        "{talk.content}"
                      </p>

                      <div className="mt-2 text-right text-xs">
                        {talk.emoji}
                      </div>
                    </div>
                  ))}

                </div>

                <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500/10 rounded-full animate-orbit blur-xl" />

                <div
                  className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/10 rounded-full animate-orbit blur-xl"
                  style={{ animationDirection: 'reverse' }}
                />

              </Reveal>

            </div>
          </div>
        </section>

        {/* WHY STARTIVES */}
        <section className="py-12 sm:py-16 bg-[var(--background-primary)]">
          <div className="container mx-auto px-4">

            <Reveal className="text-center mb-10">

              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-poppins uppercase">
                Why Startives exists?
              </h2>

              <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium font-poppins">
                We're more than a platform; we're your strategic partner in innovation.
              </p>

            </Reveal>

            <div className="max-w-4xl mx-auto space-y-12">

              {whyChooseFeatures.map((feature, index) => (
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
                    className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} gradient-text mb-3 inline-block tracking-tight font-poppins`}
                  >
                    {feature.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-3xl font-medium font-poppins">
                    {feature.description}
                  </p>
                </Reveal>
              ))}

            </div>
          </div>
        </section>

        {/* FROM OUR COMMUNITY — PURE WHITE */}
        <section className="community-section relative py-12 sm:py-16 bg-white !bg-white overflow-hidden">

          <div className="container mx-auto px-4 max-w-7xl relative z-10">

            <Reveal className="text-center mb-10">

              <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight font-poppins uppercase">
                From our community
              </h2>

              <p className="text-neutral-500 mt-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium font-poppins">
                Innovators are building, connecting, and succeeding on {APP_NAME}.
              </p>

            </Reveal>

            <div className="relative w-full overflow-hidden mask-gradient">

              <div className="flex animate-marquee gap-8">

                {[...testimonials, ...testimonials].map(
                  (testimonial, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-[90vw] sm:w-[420px]"
                    >

                      {/* iOS 27 LIQUID GLASS TESTIMONIAL */}
                      <div className="testimonial-liquid-glass group p-6 rounded-[24px] flex flex-col space-y-4 h-full relative overflow-hidden font-poppins">

                        {/* Glass base */}
                        <div className="absolute inset-0 bg-white/55 pointer-events-none" />

                        {/* Red → purple → blue glass refraction */}
                        <div className="absolute -top-24 -right-20 w-52 h-52 rounded-full bg-gradient-to-br from-red-400/25 via-purple-400/15 to-blue-500/30 blur-3xl pointer-events-none" />

                        <div className="absolute -bottom-24 -left-20 w-52 h-52 rounded-full bg-gradient-to-tr from-blue-500/20 via-purple-400/10 to-red-400/15 blur-3xl pointer-events-none" />

                        {/* Top glass reflection */}
                        <div className="absolute top-0 left-[8%] right-[8%] h-px bg-white/95 rounded-full pointer-events-none" />

                        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/65 via-transparent to-white/20 pointer-events-none" />

                        {/* Brand watermark */}
                        <img
                          src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
                          alt=""
                          aria-hidden="true"
                          className="absolute -top-4 -right-4 w-24 h-24 opacity-[0.035] pointer-events-none"
                        />

                        <div className="flex justify-between items-center relative z-10">

                          <div className="flex space-x-0.5 text-yellow-400 drop-shadow-sm">

                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-current"
                              />
                            ))}

                          </div>

                        </div>

                        <p className="relative z-10 text-neutral-700 text-sm sm:text-base italic flex-grow leading-relaxed font-medium">
                          "{testimonial.quote}"
                        </p>

                        <div className="relative z-10 pt-4 border-t border-white/60">

                          <p className="font-bold text-neutral-900 text-sm">
                            {testimonial.name}
                          </p>

                          <p className="text-xs text-neutral-500">
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

        {/* FINAL CTA — FORCED WHITE */}
        <section className="final-cta-section relative text-center pt-2 pb-0 sm:pt-3 sm:pb-0 px-4 bg-white !bg-white overflow-hidden">

          <Reveal className="container mx-auto max-w-5xl font-poppins">

            {/* Image wrapper prevents unwanted dark/grey visual strip */}
            <div className="relative w-full overflow-hidden bg-white">

              <img
                src="https://res.cloudinary.com/dp7avkarg/image/upload/v1786972768/Picsart_26-08-17_18-49-01-966_munhwd.png"
                alt=""
                aria-hidden="true"
                className="
                  mx-auto
                  w-full
                  max-w-4xl
                  h-auto
                  object-contain
                  object-top
                  block
                "
              />

              {/* White bottom mask for any baked-in grey/black area */}
              <div
                className="
                  absolute
                  left-0
                  right-0
                  bottom-0
                  h-[8%]
                  min-h-[18px]
                  bg-white
                  pointer-events-none
                  z-10
                "
              />

            </div>

            {/* Launch your vision — ~15% smaller */}
            <div className="mt-3 sm:mt-4 flex justify-center relative z-20">

              <Link
                to="/signup"
                className="
                  liquid-glass-cta
                  group
                  relative
                  inline-flex
                  items-center
                  justify-center
                  gap-2.5
                  rounded-full
                  px-2
                  py-1.5
                  pl-5
                  sm:pl-6
                  text-neutral-900
                  font-bold
                  text-[13px]
                  sm:text-[13px]
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

                <span className="absolute inset-0 rounded-full bg-gradient-to-b from-white/90 via-white/55 to-white/35 pointer-events-none" />

                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/15 via-purple-400/10 to-blue-500/20 pointer-events-none" />

                <span className="absolute left-[10%] right-[10%] top-0 h-px bg-white/95 rounded-full pointer-events-none" />

                <span className="relative z-10 whitespace-nowrap">
                  Launch your vision
                </span>

                <span
                  className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-center
                    w-8
                    h-8
                    sm:w-9
                    sm:h-9
                    rounded-full
                    overflow-hidden
                    border
                    border-white/80
                    bg-white/35
                    backdrop-blur-xl
                    shadow-[inset_0_1px_2px_rgba(255,255,255,0.95),0_3px_12px_rgba(20,30,60,0.12)]
                    transition-all
                    duration-300
                    group-hover:bg-white/50
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

                  <span className="absolute inset-[1px] rounded-full bg-white/20 backdrop-blur-md" />

                  <ArrowRight
                    className="
                      relative
                      z-10
                      w-3.5
                      h-3.5
                      sm:w-4
                      sm:h-4
                      text-neutral-900
                      transition-transform
                      duration-300
                      group-hover:translate-x-0.5
                    "
                  />

                </span>

              </Link>

            </div>

          </Reveal>

          {/* Absolute white continuation to guarantee no dark gap */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-white pointer-events-none" />

        </section>

      </div>

      <style>{`

        /* =========================================
           REVEAL ANIMATION
        ========================================= */

        .reveal-item {
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: opacity, transform;
        }

        .reveal-item.is-visible {
          opacity: 1;
          transform: translateY(0);
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
              120px circle at var(--x, 50%) var(--y, 50%),
              rgba(255, 255, 255, 0.25),
              transparent 70%
            );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .magnetic-btn:hover::before {
          opacity: 1;
        }


        /* =========================================
           LIQUID GLASS CTA
        ========================================= */

        .liquid-glass-cta {
          -webkit-backdrop-filter: blur(24px) saturate(180%);
          backdrop-filter: blur(24px) saturate(180%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.78),
              rgba(255, 255, 255, 0.48)
            );

          border: 1px solid rgba(255, 255, 255, 0.9);

          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.95),
            inset 0 -1px 1px rgba(120, 130, 160, 0.08),
            0 8px 28px rgba(30, 40, 80, 0.13);
        }

        .liquid-glass-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.5),
              transparent 35%,
              transparent 65%,
              rgba(255, 255, 255, 0.25)
            );

          opacity: 0.7;
          pointer-events: none;
        }

        .liquid-glass-cta:hover {
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 -1px 1px rgba(100, 110, 150, 0.08),
            0 12px 34px rgba(30, 40, 80, 0.17);
        }


        /* =========================================
           iOS 27 LIQUID GLASS TESTIMONIAL CARDS
        ========================================= */

        .testimonial-liquid-glass {
          -webkit-backdrop-filter: blur(28px) saturate(185%);
          backdrop-filter: blur(28px) saturate(185%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.72),
              rgba(255, 255, 255, 0.42)
            );

          border: 1px solid rgba(255, 255, 255, 0.88);

          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.95),
            inset 0 -1px 1px rgba(120, 130, 160, 0.07),
            0 10px 35px rgba(35, 45, 80, 0.10);

          isolation: isolate;

          transition:
            transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .testimonial-liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background:
            linear-gradient(
              120deg,
              rgba(255, 255, 255, 0.62),
              transparent 28%,
              transparent 68%,
              rgba(255, 255, 255, 0.28)
            );

          opacity: 0.8;
          pointer-events: none;
          z-index: 1;
        }

        .testimonial-liquid-glass::after {
          content: '';
          position: absolute;
          left: 7%;
          right: 7%;
          top: 0;
          height: 1px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.7);
          pointer-events: none;
          z-index: 2;
        }

        .testimonial-liquid-glass:hover {
          transform: translateY(-5px) scale(1.01);

          border-color: rgba(255, 255, 255, 0.98);

          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 -1px 1px rgba(100, 110, 150, 0.07),
            0 18px 42px rgba(35, 45, 80, 0.14);
        }


        /* =========================================
           FINAL CTA WHITE SAFETY
        ========================================= */

        .final-cta-section,
        .community-section {
          background-color: #ffffff !important;
        }

        .final-cta-section {
          isolation: isolate;
        }


        /* =========================================
           FLOAT ANIMATION
        ========================================= */

        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0);
          }

          50% {
            transform: translate(12px, -18px);
          }
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }


        /* =========================================
           MOBILE
        ========================================= */

        @media (max-width: 639px) {

          .liquid-glass-cta {
            padding-top: 6px;
            padding-bottom: 6px;
            padding-left: 19px;
            padding-right: 6px;
            font-size: 13px;
          }

          .liquid-glass-cta span {
            -webkit-tap-highlight-color: transparent;
          }

          .testimonial-liquid-glass {
            border-radius: 22px;
            -webkit-backdrop-filter: blur(24px) saturate(180%);
            backdrop-filter: blur(24px) saturate(180%);
          }

        }


        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .reveal-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .animate-float-slow {
            animation: none !important;
          }

          .liquid-glass-cta,
          .testimonial-liquid-glass {
            transition: none !important;
          }

        }

      `}</style>
    </div>
  );
};

export default HomePage;