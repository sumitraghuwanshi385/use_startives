import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { APP_NAME } from '../constants';
import { ProjectCard } from '../pages/ProjectsListPage';
import {
  Users,
  Sparkles,
  Box,
  ArrowRight,
  Star,
  Github,
  Linkedin,
  Facebook,
  Twitter,
  Rocket,
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

const EcosystemStat: React.FC<{
  endValue: number;
  label: string;
  delay?: number;
}> = ({ endValue, label, delay = 0 }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const count = useCountUp(endValue, inView);

  return (
    <div
      ref={ref}
      className="reveal-item text-center"
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
      }}
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 tabular-nums font-poppins">
        {count}+
      </div>

      <div className="mt-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-neutral-500 font-poppins">
        {label}
      </div>
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
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787038743/Picsart_26-08-18_12-56-10-554_wbodvi.png',
      title: 'VALIDATE YOUR IDEA',
      description:
        'Get feedback on your startup concept from a diverse community of experts and peers.',
    },
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787038741/Picsart_26-08-18_12-56-57-760_w19zpa.png',
      title: 'FIND A CO-FOUNDER',
      description:
        'Connect with passionate individuals who share your vision and have the skills to help you succeed.',
    },
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787038734/Picsart_26-08-18_12-58-14-816_srheoi.png',
      title: 'BUILD YOUR MVP',
      description:
        'Assemble a talented team to bring your Minimum Viable Product to life and start testing the market.',
    },
    {
      image:
        'https://res.cloudinary.com/dp7avkarg/image/upload/v1787038746/IMG_20260818_125849_rh0bg4.png',
      title: 'SCALE YOUR VENTURE',
      description:
        'Access a global network of talent, mentors, and resources to grow your startup beyond its initial stages.',
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
      className="bg-white !bg-white text-[var(--text-primary)] overflow-x-hidden font-poppins"
      style={{ backgroundColor: '#ffffff' }}
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

      <div className="relative z-10">
        {/* Hero */}
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

        {/* Discover Projects */}
        <section className="py-12 sm:py-16 bg-[var(--background-primary)]">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins uppercase text-black">
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

        {/* An ecosystem in motion */}
        <section className="py-12 sm:py-16 bg-[var(--background-secondary)]">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-poppins uppercase">
                An ecosystem in motion
              </h2>

              <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                Witness the pulse of innovation. Our platform is a dynamic
                network where connections spark, ideas ignite, and ventures take
                flight every day.
              </p>
            </Reveal>

            <Reveal className="max-w-5xl mx-auto" delay={80}>
              <div className="ecosystem-liquid-card relative overflow-hidden rounded-[2.5rem] sm:rounded-[3rem] border border-white/80">
                <div className="absolute inset-0 bg-white/65 backdrop-blur-3xl" />

                <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.07] via-purple-500/[0.05] to-blue-500/[0.12] pointer-events-none" />

                <div className="absolute -top-32 -right-24 w-80 h-80 bg-blue-500/[0.12] rounded-full blur-[100px] pointer-events-none" />

                <div className="absolute -bottom-32 -left-24 w-80 h-80 bg-purple-500/[0.09] rounded-full blur-[100px] pointer-events-none" />

                <div className="absolute inset-[1px] rounded-[calc(2.5rem-1px)] sm:rounded-[calc(3rem-1px)] border border-white/60 pointer-events-none" />

                <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="ecosystem-image-shell relative w-full overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/70 bg-white/40 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-white/15 to-blue-500/[0.08] pointer-events-none" />

                    <img
                      src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787040411/Picsart_26-08-18_13-36-04-252_uihctg.jpg"
                      alt="Startives ecosystem"
                      className="relative z-10 block w-full h-auto max-h-[560px] object-contain object-center mx-auto"
                    />
                  </div>

                  <div className="mt-6 sm:mt-8 grid grid-cols-3 divide-x divide-neutral-300/60">
                    <EcosystemStat
                      endValue={50}
                      label="Projects Launched"
                    />

                    <EcosystemStat
                      endValue={200}
                      label="Founders Connected"
                      delay={100}
                    />

                    <EcosystemStat
                      endValue={500}
                      label="Innovators"
                      delay={200}
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Everything you need to start */}
        <section className="py-10 sm:py-12 bg-[var(--background-primary)]">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] mb-2 tracking-tight font-poppins uppercase">
                Everything you need to start
              </h2>

              <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                From idea to launch, {APP_NAME} provides the tools and community
                to support your journey.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {features.map((feature, index) => (
                <Reveal key={index} delay={index * 90}>
                  <div className="feature-liquid-card group relative overflow-hidden min-h-[320px] sm:min-h-[340px] p-5 sm:p-6 rounded-[1.75rem] border border-white/70 flex flex-col transition-all duration-500 hover:-translate-y-2">
                    <div className="absolute inset-0 bg-white/55 backdrop-blur-2xl" />

                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.08] via-purple-500/[0.06] to-blue-500/[0.13] pointer-events-none" />

                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-60 h-40 rounded-full bg-blue-500/[0.14] blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-blue-500/[0.22]" />

                    <div className="absolute -top-20 -right-16 w-40 h-40 rounded-full bg-red-500/[0.07] blur-[55px] pointer-events-none" />

                    <div className="absolute inset-[1px] rounded-[calc(1.75rem-1px)] border border-white/60 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Image - smaller + closer */}
                      <div className="flex items-center justify-center pt-1 pb-3 sm:pb-4">
                        <div className="relative w-full h-[140px] sm:h-[155px] flex items-center justify-center">
                          <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/20 blur-3xl" />

                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="relative z-10 w-[130px] h-[130px] sm:w-[145px] sm:h-[145px] object-contain drop-shadow-[0_12px_22px_rgba(20,50,140,0.15)] transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-0.5"
                          />
                        </div>
                      </div>

                      {/* Text */}
                      <div className="text-center mt-auto">
                        <h3 className="text-[15px] sm:text-base font-bold text-[var(--text-primary)] mb-1.5 tracking-tight font-poppins leading-snug">
                          {feature.title}
                        </h3>

                        <p className="text-[var(--text-secondary)] text-[11px] sm:text-xs font-medium leading-relaxed font-poppins max-w-[240px] mx-auto">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* The pulse of innovation */}
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

        {/* Why Startives exists */}
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

        {/* From our community */}
        <section className="py-12 sm:py-16 bg-[var(--background-secondary)]">
          <div className="container mx-auto px-4 max-w-7xl">
            <Reveal className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight font-poppins uppercase">
                From our community
              </h2>

              <p className="text-[var(--text-secondary)] mt-2 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed font-medium font-poppins">
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
                      <div className="p-6 bg-[var(--component-background)] rounded-2xl border border-[var(--border-primary)] flex flex-col space-y-4 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-purple-500/20 relative overflow-hidden font-poppins">
                        <img
                          src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
                          alt=""
                          aria-hidden="true"
                          className="absolute -top-4 -right-4 w-24 h-24 opacity-5"
                        />

                        <div className="flex justify-between items-center z-10">
                          <div className="flex space-x-0.5 text-yellow-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-current"
                              />
                            ))}
                          </div>
                        </div>

                        <p className="text-[var(--text-secondary)] text-sm sm:text-base italic flex-grow z-10 leading-relaxed font-medium">
                          "{testimonial.quote}"
                        </p>

                        <div className="pt-4 border-t border-[var(--border-primary)] z-10">
                          <p className="font-bold text-[var(--text-primary)] text-sm">
                            {testimonial.name}
                          </p>

                          <p className="text-xs text-[var(--text-muted)]">
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

        {/* Final CTA */}
        <section className="text-center pt-2 pb-0 sm:pt-3 sm:pb-0 px-4 bg-white">
          <Reveal className="container mx-auto max-w-5xl font-poppins">
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
                object-center
                block
              "
            />

            <div className="mt-4 sm:mt-5 flex justify-center">
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
                    w-[32.4px]
                    h-[32.4px]
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
                      w-[14.4px]
                      h-[14.4px]
                      sm:w-[16.2px]
                      sm:h-[16.2px]
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
        </section>

        <div
          className="w-full bg-white !bg-white h-8 sm:h-10"
          style={{ backgroundColor: '#ffffff' }}
        />
      </div>

      <style>{`
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

        .ecosystem-liquid-card {
          -webkit-backdrop-filter: blur(32px) saturate(185%);
          backdrop-filter: blur(32px) saturate(185%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.86),
              rgba(255, 255, 255, 0.52)
            );

          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.98),
            inset 0 -1px 1px rgba(90, 100, 150, 0.05),
            0 18px 55px rgba(30, 40, 100, 0.10);
        }

        .ecosystem-liquid-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.7),
              transparent 30%,
              transparent 65%,
              rgba(255, 255, 255, 0.3)
            );

          opacity: 0.8;
          pointer-events: none;
        }

        .ecosystem-liquid-card::after {
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
              rgba(255, 255, 255, 1),
              transparent
            );

          pointer-events: none;
        }

        .ecosystem-image-shell {
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.95),
            inset 0 -1px 2px rgba(80, 90, 130, 0.05),
            0 10px 35px rgba(30, 50, 110, 0.08);
        }

        .feature-liquid-card {
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          backdrop-filter: blur(28px) saturate(180%);

          background:
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.82),
              rgba(255, 255, 255, 0.55)
            );

          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 0.95),
            inset 0 -1px 1px rgba(90, 100, 150, 0.05),
            0 6px 22px rgba(30, 40, 90, 0.06);
        }

        .feature-liquid-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;

          background:
            linear-gradient(
              115deg,
              rgba(255, 255, 255, 0.72),
              transparent 28%,
              transparent 70%,
              rgba(255, 255, 255, 0.35)
            );

          opacity: 0.75;
          pointer-events: none;
        }

        .feature-liquid-card::after {
          content: '';
          position: absolute;
          left: 8%;
          right: 8%;
          top: 0;
          height: 1px;

          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.95),
            transparent
          );

          pointer-events: none;
        }

        .feature-liquid-card:hover {
          border-color: rgba(255, 255, 255, 0.95);
          box-shadow:
            inset 0 1px 2px rgba(255, 255, 255, 1),
            inset 0 -1px 1px rgba(80, 90, 140, 0.04),
            0 14px 40px rgba(30, 50, 120, 0.11);
        }

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

        @media (max-width: 639px) {
          .liquid-glass-cta {
            padding-top: 6.3px;
            padding-bottom: 6.3px;
            padding-left: 19.8px;
            padding-right: 6.3px;
            font-size: 12.6px;
          }

          .liquid-glass-cta span {
            -webkit-tap-highlight-color: transparent;
          }

          .feature-liquid-card {
            min-height: 310px;
          }

          .ecosystem-liquid-card {
            border-radius: 2rem;
          }

          .ecosystem-image-shell {
            border-radius: 1.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-item {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .animate-float-slow {
            animation: none !important;
          }

          .liquid-glass-cta {
            transition: none !important;
          }

          .feature-liquid-card {
            transition: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;