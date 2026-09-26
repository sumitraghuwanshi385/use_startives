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

  const commonClasses = `
    button-gradient magnetic-btn group relative inline-flex items-center justify-center
    overflow-hidden text-white font-semibold py-3 px-8 rounded-full text-base
    transition-transform duration-300 ease-out hover:scale-[1.03] active:scale-[0.98]
    focus:outline-none focus:ring-4 focus:ring-red-500/40
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

const useCountUp = (endValue: number, active: boolean, duration = 1800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(endValue * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [endValue, active, duration]);

  return count;
};

const EcosystemStat: React.FC<{
  endValue: number;
  label: string;
  description: string;
  delay?: number;
}> = ({ endValue, label, description, delay = 0 }) => {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const count = useCountUp(endValue, shouldAnimate, 1800);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setTimeout(() => setShouldAnimate(true), delay);
    return () => window.clearTimeout(timer);
  }, [inView, delay]);

  return (
    <div ref={ref} className="ecosystem-stat text-center">
      <div
        className={`ecosystem-stat-number button-gradient text-3xl sm:text-4xl md:text-[42px] font-black tracking-[-0.04em] tabular-nums font-poppins bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] transition-all duration-500 ${
          shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}
      >
        {count}+
      </div>
      <div
        className={`mt-0.5 text-[9px] sm:text-[10px] md:text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-700 dark:text-neutral-300 font-poppins transition-all duration-500 ${
          shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
        {label}
      </div>
      <p
        className={`mt-1.5 max-w-[210px] mx-auto text-[10px] sm:text-[10.5px] md:text-[11px] leading-[1.45] font-medium text-neutral-500 dark:text-neutral-400 font-poppins transition-all duration-500 ${
          shouldAnimate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
        }`}
      >
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
    {
      name: 'Jacob Jeilling',
      role: 'Founder & Builder',
      quote:
        'Startives makes it easier to find ambitious people who actually want to build instead of just talking about ideas.',
    },
    {
      name: 'Ankit Sharma',
      role: 'Product Builder',
      quote:
        'The community has a great mix of founders and builders. Finding people with complementary skills feels much easier here.',
    },
    {
      name: 'Joe Hamilton',
      role: 'Founder',
      quote:
        'I came looking for collaborators and ended up discovering an entire ecosystem of people building interesting things.',
    },
    {
      name: 'Mark Jobs',
      role: 'Entrepreneur',
      quote:
        'What stands out is the builder-first mindset. There is always someone working on something worth exploring.',
    },
  ];

  const [testimonialPaused, setTestimonialPaused] = useState(false);

  const whyChooseFeatures = [
    {
      title: 'Forge global alliances.',
      description:
        'Break geographical barriers. Connect with a diverse pool of innovators, mentors, and investors from every corner of the globe.',
      gradient: 'from-sky-400 to-cyan-300',
    },
    {
      title: 'Assemble your dream team.',
      description:
        'Find the missing piece to your puzzle. Our platform is the crucible where visionary founders meet brilliant developers and designers.',
      gradient: 'from-red-500 to-red-400',
    },
    {
      title: 'Launchpad for legends.',
      description:
        'Go from a spark of genius to a market-ready MVP. We provide the tools and community support to validate your vision.',
      gradient: 'from-orange-400 to-yellow-300',
    },
  ];

  return (
    <div
      ref={pageRef}
      className="min-h-full w-full overflow-x-hidden bg-white dark:bg-black text-black dark:text-white font-poppins"
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

      <div className="relative z-10 bg-white dark:bg-black">
        <HeroSection />

        <section className="py-12 sm:py-16 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins uppercase text-black dark:text-white">
                Discover Projects
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                Explore live startup ideas, apply to join teams, or submit your own
                and find co-founders.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {recentProjects.map((idea, index) => (
                <Reveal key={idea.id} delay={index * 80}>
                  <div
                    onClick={() => handleProtectedRoute(`/idea/${idea.id}`)}
                    className="cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  >
                    <ProjectCard idea={idea} />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="flex justify-center gap-4 mt-10" delay={160}>
              <button
                onClick={() => handleProtectedRoute('/discover')}
                className="button-gradient text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                Explore Projects
              </button>
              <button
                onClick={() => handleProtectedRoute('/submit-idea')}
                className="bg-white dark:bg-black border border-neutral-200 dark:border-white/15 text-black dark:text-white px-8 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-neutral-50 dark:hover:bg-white/[0.04]"
              >
                Submit Idea
              </button>
            </Reveal>
          </div>
        </section>

        <section className="py-8 sm:py-10 bg-white dark:bg-black relative overflow-hidden">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-2 sm:mb-3">
              <h2 className="text-2xl md:text-3xl font-extrabold text-black dark:text-white tracking-tight font-poppins uppercase">
                An ecosystem in motion
              </h2>
            </Reveal>

            <Reveal className="text-center mb-3 sm:mb-4" delay={50}>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-sm sm:text-base font-medium leading-relaxed font-poppins">
                Witness the pulse of innovation. Our platform is a dynamic network
                where connections spark, ideas ignite, and ventures take flight every
                day.
              </p>
            </Reveal>

            <Reveal className="w-full" delay={90}>
              <div className="ecosystem-image-wrap w-full flex justify-center">
                <img
                  src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787123288/file_000000005e3881fab327925e0e8d2e28_kbpxgq.png"
                  alt="Startives ecosystem"
                  className="block dark:hidden w-full max-w-[1100px] h-auto object-contain object-center"
                />
                <img
                  src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787122074/file_00000000b90081fab560a74114540bc4_vea15j.png"
                  alt="Startives ecosystem"
                  className="hidden dark:block w-full max-w-[1100px] h-auto object-contain object-center"
                />
              </div>
            </Reveal>

            <Reveal className="w-full mt-4 sm:mt-5" delay={130}>
              <div className="w-full max-w-4xl mx-auto">
                <div className="ecosystem-stats grid grid-cols-1 md:grid-cols-3">
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

        <section className="py-10 sm:py-12 bg-white dark:bg-black">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-8 sm:mb-9">
              <h2 className="text-[21px] sm:text-2xl md:text-3xl font-extrabold text-black dark:text-white mb-2 tracking-tight font-poppins uppercase">
                Everything you need to start
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-[12.5px] sm:text-[13.5px] font-medium font-poppins">
                From idea to launch, {APP_NAME} provides the tools and community to
                support your journey.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature, index) => (
                <Reveal key={index} delay={index * 90}>
                  <div className="feature-liquid-card group relative overflow-hidden min-h-[315px] sm:min-h-[335px] p-5 sm:p-5.5 rounded-[1.7rem] border border-neutral-200 dark:border-white/15 flex flex-col transition-all duration-500 hover:-translate-y-2">
                    <div className="feature-card-number">#{index + 1}</div>
                    <div className="absolute inset-0 bg-white/70 dark:bg-black/70 backdrop-blur-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/[0.08] via-purple-500/[0.06] to-blue-500/[0.13] pointer-events-none dark:opacity-40" />
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-60 h-36 rounded-full bg-blue-500/[0.15] blur-[60px] pointer-events-none transition-all duration-500 group-hover:bg-blue-500/[0.22]" />
                    <div className="absolute -top-20 -right-16 w-36 h-36 rounded-full bg-red-500/[0.08] blur-[55px] pointer-events-none" />
                    <div className="absolute inset-[1px] rounded-[calc(1.7rem-1px)] border border-white/70 dark:border-white/10 pointer-events-none" />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="relative w-full h-[165px] sm:h-[175px] flex items-center justify-center">
                          <div className="absolute w-36 h-36 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-red-500/10 via-purple-500/10 to-blue-500/20 blur-3xl" />
                          <img
                            src={feature.image}
                            alt={feature.title}
                            className="relative z-10 w-[162px] h-[162px] sm:w-[184px] sm:h-[184px] object-contain transition-transform duration-500 ease-out group-hover:scale-[1.06] group-hover:-translate-y-1"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-[15px] sm:text-[16px] font-bold text-black dark:text-white mb-1.5 tracking-tight font-poppins">
                          {feature.title}
                        </h3>
                        <p className="text-[10.5px] sm:text-[11px] font-medium leading-[1.5] font-poppins max-w-[245px] mx-auto text-neutral-600 dark:text-neutral-400">
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

        <StartalksSection Reveal={Reveal} />

        <StartivesEcosystemSection />

        <section className="py-12 sm:py-16 bg-white dark:bg-black overflow-hidden">
          <div className="container mx-auto px-4">
            <Reveal className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins uppercase text-black dark:text-white">
                What builders are saying
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-2xl mx-auto text-sm sm:text-base font-medium font-poppins">
                Real voices from founders, developers, and designers building on
                Startives.
              </p>
            </Reveal>

            <div
              className="relative w-full overflow-hidden"
              onMouseEnter={() => setTestimonialPaused(true)}
              onMouseLeave={() => setTestimonialPaused(false)}
            >
              <div
                className={`testimonials-marquee-track ${
                  testimonialPaused ? 'testimonial-marquee-paused' : ''
                }`}
              >
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                  <div key={index} className="testimonial-card-item">
                    <div className="testimonial-gradient-card relative rounded-[1.5rem] p-5 sm:p-6 flex flex-col cursor-pointer select-none font-poppins">
                      <img
                        src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
                        alt=""
                        aria-hidden="true"
                        className="absolute -top-4 -right-4 w-[87px] h-[87px] object-contain opacity-[0.15] dark:opacity-[0.17] pointer-events-none z-[1]"
                      />
                      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/[0.10] via-transparent to-white/[0.035] pointer-events-none z-[2]" />

                      <div className="relative z-10 flex items-center mb-3.5">
                        <div className="flex space-x-1 text-yellow-400">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <Star
                              key={starIndex}
                              className="w-[13px] h-[13px] fill-current"
                            />
                          ))}
                        </div>
                      </div>

                      <p className="relative z-10 text-neutral-800 dark:text-neutral-200 text-[10px] sm:text-[10.5px] italic flex-grow leading-[1.55] font-medium">
                        "{testimonial.quote}"
                      </p>

                      <div className="relative z-10 mt-3.5">
                        <p className="font-bold text-black dark:text-white text-[10.5px]">
                          {testimonial.name}
                        </p>
                        <p className="mt-0.5 text-[8.5px] text-neutral-600 dark:text-neutral-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="text-center pt-2 pb-0 sm:pt-3 sm:pb-0 px-4 bg-white dark:bg-black">
          <Reveal className="container mx-auto max-w-5xl font-poppins">
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787509112/Picsart_26-08-23_23-45-37-694_dwftvg.jpg"
              alt=""
              aria-hidden="true"
              className="mx-auto w-full max-w-4xl h-auto object-contain object-center block dark:hidden"
            />
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787509110/IMG_20260823_234748_rfqpc9.jpg"
              alt=""
              aria-hidden="true"
              className="mx-auto w-full max-w-4xl h-auto object-contain object-center hidden dark:block"
            />

            <div className="mt-4 sm:mt-5 flex justify-center">
              <Link
                to="/signup"
                className="button-gradient group relative inline-flex items-center justify-center gap-3.5 rounded-full px-[6.92px] py-[6.05px] pl-[18.68px] sm:pl-[21.80px] text-white font-bold text-[10.90px] sm:text-[11.68px] tracking-tight select-none overflow-hidden transition-all duration-300 hover:scale-[1.035] active:scale-[0.97] focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/40"
              >
                <span className="relative z-10 whitespace-nowrap">
                  Launch your vision
                </span>
                <span className="relative z-10 flex items-center justify-center w-[28.02px] h-[28.02px] sm:w-[31.14px] sm:h-[31.14px] rounded-full overflow-hidden border border-white/60 dark:border-white/12 bg-white/25 dark:bg-black/30 backdrop-blur-xl shadow-[inset_0_1px_2px_rgba(255,255,255,0.65)] transition-all duration-300">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/35 via-purple-400/20 to-blue-500/40 opacity-70 pointer-events-none" />
                  <span className="absolute inset-[1px] rounded-full bg-white/20 dark:bg-black/35 backdrop-blur-md" />
                  <ArrowRight className="relative z-10 w-[12.45px] h-[12.45px] sm:w-[14.02px] sm:h-[14.02px] text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </Reveal>
        </section>

        <div className="w-full bg-white dark:bg-black h-8 sm:h-10" />
      </div>

    </div>
  );
};

export default HomePage;