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
} from 'lucide-react';

const FundverseSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
      {/* Soft ambient red-blue background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-red-500/8 via-purple-500/6 to-blue-500/8 rounded-full blur-[120px]" />
        <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-500/6 rounded-full blur-[100px]" />
        <div className="absolute -bottom-20 left-0 w-72 h-72 bg-red-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Centered Content */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-startives-brand tracking-tighter leading-[1.05] text-[var(--text-primary)]">
            Where ideas meet
            <span className="block text-[var(--text-primary)] mt-1">
              the right capital.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-medium font-poppins max-w-2xl mx-auto">
            Discover grants, government schemes, accelerators, investors and funding opportunities built for founders at every stage.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <Link
              to="/funding"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white text-xs font-black uppercase tracking-widest font-poppins transition-all duration-300 hover:scale-[1.03]"
            >
              Explore Fundverse
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              to="/funding"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--background-tertiary)]/80 backdrop-blur-sm border border-[var(--border-primary)] text-[var(--text-secondary)] text-xs font-black uppercase tracking-widest font-poppins hover:border-red-500/40 hover:text-[var(--text-primary)] transition-all duration-300"
            >
              Grab Funding
            </Link>
          </div>
        </div>

        {/* Premium Visual Stage */}
        <div className="relative min-h-[340px] sm:min-h-[400px] flex items-center justify-center">
          {/* Soft orbital rings */}
          <div className="absolute w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full border border-red-500/10 animate-[spin_30s_linear_infinite]" />
          <div className="absolute w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rounded-full border border-dashed border-blue-500/15 animate-[spin_22s_linear_infinite_reverse]" />
          <div className="absolute w-[160px] h-[160px] sm:w-[200px] sm:h-[200px] rounded-full bg-gradient-to-br from-red-500/10 via-purple-500/8 to-blue-500/10 blur-2xl" />

          {/* Floating pill - Top Left (Grants) */}
          <div className="absolute top-[6%] left-[4%] sm:left-[10%] animate-[float_6s_ease-in-out_infinite]">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--component-background)]/95 backdrop-blur-md border border-red-500/20 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/25 to-red-600/15 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider font-poppins">
                  Grants
                </p>
                <p className="text-[11px] font-bold text-[var(--text-primary)] font-poppins">
                  ₹ Government
                </p>
              </div>
            </div>
          </div>

          {/* Floating pill - Top Right (Investors) */}
          <div className="absolute top-[10%] right-[3%] sm:right-[9%] animate-[float_7s_ease-in-out_infinite_0.5s]">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--component-background)]/95 backdrop-blur-md border border-blue-500/20 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/25 to-blue-600/15 flex items-center justify-center">
                <CircleDollarSign className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider font-poppins">
                  Investors
                </p>
                <p className="text-[11px] font-bold text-[var(--text-primary)] font-poppins">
                  Smart Capital
                </p>
              </div>
            </div>
          </div>

          {/* Floating pill - Bottom Left (Accelerators) */}
          <div className="absolute bottom-[10%] left-[2%] sm:left-[8%] animate-[float_6.5s_ease-in-out_infinite_0.8s]">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--component-background)]/95 backdrop-blur-md border border-red-500/20 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500/25 to-purple-500/15 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-red-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider font-poppins">
                  Accelerators
                </p>
                <p className="text-[11px] font-bold text-[var(--text-primary)] font-poppins">
                  Growth Programs
                </p>
              </div>
            </div>
          </div>

          {/* Floating pill - Bottom Right (Funding) */}
          <div className="absolute bottom-[6%] right-[4%] sm:right-[10%] animate-[float_7.5s_ease-in-out_infinite_0.3s]">
            <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[var(--component-background)]/95 backdrop-blur-md border border-blue-500/20 shadow-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/25 to-blue-600/15 flex items-center justify-center">
                <HandCoins className="w-4 h-4 text-blue-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase tracking-wider font-poppins">
                  Funding
                </p>
                <p className="text-[11px] font-bold text-[var(--text-primary)] font-poppins">
                  Opportunities
                </p>
              </div>
            </div>
          </div>

          {/* Center Hero Image */}
          <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center overflow-hidden">
            {/* Soft gradient glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 opacity-20 blur-xl animate-pulse" />
            
            {/* Image container with gradient border */}
            <div className="relative w-full h-full rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-red-500 via-purple-500 to-blue-500 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
              <div className="w-full h-full rounded-full overflow-hidden bg-[var(--component-background)]">
                <img
                  src="https://res.cloudinary.com/dp7avkarg/image/upload/v1790447322/IMG_20260926_235804_bl3icg.png"
                  alt="Fundverse"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Connection lines - more refined */}
          <div className="absolute top-[48%] left-[18%] sm:left-[22%] w-[70px] h-px bg-gradient-to-r from-transparent via-red-400/40 to-transparent rotate-[22deg]" />
          <div className="absolute top-[46%] right-[17%] sm:right-[21%] w-[70px] h-px bg-gradient-to-l from-transparent via-blue-400/40 to-transparent rotate-[-22deg]" />
          <div className="absolute top-[68%] left-[24%] sm:left-[28%] w-[60px] h-px bg-gradient-to-r from-transparent via-red-400/30 to-transparent rotate-[-28deg]" />
          <div className="absolute top-[68%] right-[23%] sm:right-[27%] w-[60px] h-px bg-gradient-to-l from-transparent via-blue-400/30 to-transparent rotate-[28deg]" />
        </div>

        {/* Bottom tags - reduced size */}
        <div className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[6.5px] sm:text-[7px] font-black uppercase tracking-[0.14em] text-[var(--text-muted)] font-poppins">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3 h-3 text-red-500" />
            Government Schemes
          </span>
          <span className="w-1 h-1 rounded-full bg-gradient-to-r from-red-400 to-blue-400" />
          <span className="flex items-center gap-1.5">
            <Landmark className="w-3 h-3 text-red-500" />
            Grants
          </span>
          <span className="w-1 h-1 rounded-full bg-gradient-to-r from-red-400 to-blue-400" />
          <span className="flex items-center gap-1.5">
            <Rocket className="w-3 h-3 text-blue-500" />
            Accelerators
          </span>
          <span className="w-1 h-1 rounded-full bg-gradient-to-r from-red-400 to-blue-400" />
          <span className="flex items-center gap-1.5">
            <CircleDollarSign className="w-3 h-3 text-blue-500" />
            Investors
          </span>
          <span className="w-1 h-1 rounded-full bg-gradient-to-r from-red-400 to-blue-400" />
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3 h-3 text-red-500" />
            Startup Programs
          </span>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default FundverseSection;