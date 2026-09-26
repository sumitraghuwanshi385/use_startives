import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Landmark,
  Rocket,
  CircleDollarSign,
  HandCoins,
  Building2,
  Briefcase,
  TrendingUp,
} from 'lucide-react';

const FundverseSection: React.FC = () => {
  const pills = [
    { icon: Landmark, label: 'Grants', sub: '₹ Government' },
    { icon: CircleDollarSign, label: 'Investors', sub: 'Smart Capital' },
    { icon: Rocket, label: 'Accelerators', sub: 'Growth Programs' },
    { icon: HandCoins, label: 'Funding', sub: 'Opportunities' },
    { icon: Building2, label: 'Govt Schemes', sub: 'Official Support' },
    { icon: Briefcase, label: 'Startup Programs', sub: 'Early Stage' },
    { icon: TrendingUp, label: 'Venture Capital', sub: 'Scale Ready' },
  ];

  // Duplicate for seamless infinite scroll
  const slidingPills = [...pills, ...pills];

  return (
    <section className="relative w-full overflow-hidden px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      {/* Soft ambient red-blue background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-red-400/10 via-purple-400/8 to-blue-400/10 rounded-full blur-[120px]" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-400/8 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 left-0 w-72 h-72 bg-red-400/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Centered Content */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-startives-brand tracking-tighter leading-[1.05] text-[var(--text-primary)]">
            Where ideas meet
            <span className="block text-[var(--text-primary)] mt-1">
              the right capital.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-medium font-poppins max-w-2xl mx-auto">
            Discover grants, government schemes, accelerators, investors and funding opportunities built for founders at every stage.
          </p>

          {/* Buttons right below description */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-7">
            <Link
              to="/funding"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-500/90 to-blue-500/90 hover:from-red-600 hover:to-blue-600 text-white text-xs font-black uppercase tracking-widest font-poppins transition-all duration-300 hover:scale-[1.03]"
            >
              Explore Fundverse
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/funding"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--background-tertiary)]/80 backdrop-blur-sm border border-[var(--border-primary)] text-[var(--text-secondary)] text-xs font-black uppercase tracking-widest font-poppins hover:border-red-400/40 hover:text-[var(--text-primary)] transition-all duration-300"
            >
              Grab Funding
            </Link>
          </div>
        </div>

        {/* Center Image - Rectangle / Square */}
        <div className="flex justify-center mb-10">
          <div className="relative w-full max-w-2xl aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--component-background)] border border-[var(--border-primary)] shadow-xl">
            <img
              src="https://res.cloudinary.com/dp7avkarg/image/upload/v1790452191/file_00000000a4f081fa9fd542aeb3106314_tcfoyx.png"
              alt="Fundverse"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Horizontal Auto-Sliding Pills */}
        <div className="relative overflow-hidden">
          <div className="flex gap-4 animate-slide">
            {slidingPills.map((pill, index) => {
              const Icon = pill.icon;
              return (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--component-background)]/90 backdrop-blur-md border border-red-400/15 shadow-md"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400/20 to-blue-400/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider font-poppins whitespace-nowrap">
                      {pill.label}
                    </p>
                    <p className="text-[11px] font-bold text-[var(--text-primary)] font-poppins whitespace-nowrap">
                      {pill.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slide {
          animation: slide 28s linear infinite;
          width: max-content;
        }
        .animate-slide:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default FundverseSection;