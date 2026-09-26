import React from 'react';
import { Link } from 'react-router-dom';
import {
  BadgeDollarSign,
  ArrowUpRight,
  Sparkles,
  Users,
  Landmark,
  Rocket,
  CircleDollarSign,
  HandCoins,
  ChevronRight,
} from 'lucide-react';

const FundverseSection: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden rounded-[2.5rem] border border-purple-500/15 bg-[var(--component-background)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-32 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 dot-pattern-bg opacity-[0.035] dark:opacity-[0.07]"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[18%] left-[8%] w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-[35%] right-[10%] w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[18%] w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-[30%] right-[22%] w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

        <div className="max-w-2xl">

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[10px] font-black uppercase tracking-[0.18em] font-poppins mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Introducing Fundverse
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.7rem] font-startives-brand tracking-tighter leading-[0.95] text-[var(--text-primary)]">
            Where ideas meet
            <span className="block bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              the right capital.
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base lg:text-lg leading-relaxed text-[var(--text-secondary)] font-medium font-poppins max-w-xl">
            Discover grants, government schemes, accelerators, investors and funding opportunities built for founders at every stage.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-7">

            <Link
              to="/funding"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-black uppercase tracking-widest font-poppins transition-all duration-300 shadow-lg shadow-purple-500/20 hover:scale-[1.03]"
            >
              Explore Fundverse
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-secondary)] text-xs font-bold font-poppins">
              <Users className="w-4 h-4 text-purple-500" />
              Built for Founders
            </div>

          </div>

          <div className="flex flex-wrap gap-5 mt-8 pt-6 border-t border-[var(--border-primary)]">

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] font-poppins">
                  Grants
                </p>
                <p className="text-xs font-bold text-[var(--text-primary)] font-poppins">
                  Government & Private
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-violet-500" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)] font-poppins">
                  Programs
                </p>
                <p className="text-xs font-bold text-[var(--text-primary)] font-poppins">
                  Accelerators & VCs
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="relative min-h-[390px] sm:min-h-[450px] flex items-center justify-center">

          <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-purple-500/10 animate-[spin_25s_linear_infinite]"></div>

          <div className="absolute w-[205px] h-[205px] sm:w-[255px] sm:h-[255px] rounded-full border border-dashed border-violet-500/15 animate-[spin_18s_linear_infinite_reverse]"></div>

          <div className="absolute w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] rounded-full bg-purple-500/10 blur-3xl"></div>

          <div className="absolute top-[8%] left-[8%] sm:left-[12%]">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[var(--component-background)] border border-[var(--border-primary)] shadow-xl animate-[bounce_4s_ease-in-out_infinite]">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Landmark className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase font-poppins">
                  Grants
                </p>
                <p className="text-[10px] font-bold text-[var(--text-primary)] font-poppins">
                  ₹ Funding
                </p>
              </div>
            </div>
          </div>

          <div className="absolute top-[12%] right-[4%] sm:right-[8%]">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[var(--component-background)] border border-[var(--border-primary)] shadow-xl animate-[bounce_5s_ease-in-out_infinite_0.5s]">
              <div className="w-8 h-8 rounded-xl bg-violet-500/10 flex items-center justify-center">
                <CircleDollarSign className="w-4 h-4 text-violet-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase font-poppins">
                  Investors
                </p>
                <p className="text-[10px] font-bold text-[var(--text-primary)] font-poppins">
                  Capital
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[13%] left-[2%] sm:left-[7%]">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[var(--component-background)] border border-[var(--border-primary)] shadow-xl animate-[bounce_4.5s_ease-in-out_infinite_0.8s]">
              <div className="w-8 h-8 rounded-xl bg-fuchsia-500/10 flex items-center justify-center">
                <Rocket className="w-4 h-4 text-fuchsia-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase font-poppins">
                  Accelerators
                </p>
                <p className="text-[10px] font-bold text-[var(--text-primary)] font-poppins">
                  Programs
                </p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-[9%] right-[4%] sm:right-[9%]">
            <div className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-[var(--component-background)] border border-[var(--border-primary)] shadow-xl animate-[bounce_5.5s_ease-in-out_infinite_0.3s]">
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <HandCoins className="w-4 h-4 text-purple-500" />
              </div>
              <div>
                <p className="text-[9px] font-black text-[var(--text-muted)] uppercase font-poppins">
                  Funding
                </p>
                <p className="text-[10px] font-bold text-[var(--text-primary)] font-poppins">
                  Opportunities
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center">

            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 opacity-20 blur-2xl animate-pulse"></div>

            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-500 p-[1px] shadow-[0_0_60px_rgba(139,92,246,0.35)]">
              <div className="w-full h-full rounded-full bg-[var(--component-background)] flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-purple-500/30">
                  <BadgeDollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>
            </div>

          </div>

          <div className="absolute z-30 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="absolute -inset-20 rounded-full border border-purple-500/5"></div>
          </div>

          <div className="absolute top-[47%] left-[16%] sm:left-[20%] w-[90px] h-px bg-gradient-to-r from-transparent via-purple-400/40 to-purple-400/10 rotate-[25deg]"></div>

          <div className="absolute top-[44%] right-[15%] sm:right-[19%] w-[90px] h-px bg-gradient-to-l from-transparent via-violet-400/40 to-violet-400/10 rotate-[-25deg]"></div>

          <div className="absolute top-[70%] left-[23%] sm:left-[27%] w-[80px] h-px bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent rotate-[-30deg]"></div>

          <div className="absolute top-[70%] right-[22%] sm:right-[26%] w-[80px] h-px bg-gradient-to-l from-transparent via-purple-400/30 to-transparent rotate-[30deg]"></div>

        </div>

      </div>

      <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[9px] font-black uppercase tracking-[0.16em] text-[var(--text-muted)] font-poppins">
        <span>Government Schemes</span>
        <span className="w-1 h-1 rounded-full bg-purple-400"></span>
        <span>Grants</span>
        <span className="w-1 h-1 rounded-full bg-purple-400"></span>
        <span>Accelerators</span>
        <span className="w-1 h-1 rounded-full bg-purple-400"></span>
        <span>Investors</span>
        <span className="w-1 h-1 rounded-full bg-purple-400"></span>
        <span>Startup Programs</span>
      </div>

    </section>
  );
};

export default FundverseSection;