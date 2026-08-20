import React from 'react';
import { Link } from 'react-router-dom';

const StartalksSection: React.FC<{
  Reveal: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
  }>;
}> = ({ Reveal }) => {
  return (
    <section className="py-12 bg-white dark:bg-black relative overflow-hidden">

      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 relative z-10">

        <div className="flex flex-col lg:flex-row items-center gap-10 max-w-5xl mx-auto">

          <Reveal className="lg:w-1/2 space-y-6 text-center lg:text-left">

            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter text-black dark:text-white font-poppins uppercase">
              The pulse of innovation
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed font-poppins">
              Explore real-time thoughts, wins,
              and pivots from founders building
              the next big things. Startalks is
              the social layer where the community
              breathes.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">

              <Link
                to="/startalks"
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
                  font-poppins
                "
              >
                Enter the feed
              </Link>

              <Link
                to="/signup"
                className="
                  bg-white
                  dark:bg-black
                  text-black
                  dark:text-white
                  border
                  border-neutral-200
                  dark:border-white/15
                  px-8
                  py-2.5
                  rounded-full
                  text-[11px]
                  font-black
                  uppercase
                  tracking-widest
                  hover:bg-neutral-50
                  dark:hover:bg-white/[0.04]
                  transition-all
                  font-poppins
                "
              >
                Join the talk
              </Link>

            </div>
          </Reveal>

          <Reveal
            className="lg:w-1/2 relative"
            delay={120}
          >

            <div className="grid grid-cols-2 gap-4">

              {[
                {
                  name: 'Sarah J.',
                  content:
                    'Just secured beta testers!',
                  emoji: '🎉',
                },
                {
                  name: 'Mike R.',
                  content:
                    'Pivot was the best decision.',
                  emoji: '💡',
                },
                {
                  name: 'Elena W.',
                  content:
                    'Scaling to 10k MRR today.',
                  emoji: '📈',
                },
                {
                  name: 'Liam P.',
                  content:
                    'Building in public is hard but worth it.',
                  emoji: '🔨',
                },
              ].map(
                (talk, index) => (
                  <div
                    key={index}
                    className="
                      bg-white
                      dark:bg-black
                      p-4
                      rounded-2xl
                      border
                      border-neutral-200
                      dark:border-white/15
                      transition-all
                      duration-300
                      hover:-translate-y-1
                      hover:shadow-lg
                      font-poppins
                    "
                  >

                    <div className="flex items-center gap-2 mb-2">

                      <div className="w-6 h-6 rounded-full icon-bg-gradient flex items-center justify-center text-[10px] text-white font-bold">
                        {talk.name[0]}
                      </div>

                      <span className="text-[10px] font-bold text-black dark:text-white">
                        {talk.name}
                      </span>

                    </div>

                    <p className="text-[11px] text-neutral-600 dark:text-neutral-400 font-medium italic">
                      "{talk.content}"
                    </p>

                    <div className="mt-2 text-right text-xs">
                      {talk.emoji}
                    </div>

                  </div>
                )
              )}

            </div>

            <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500/10 rounded-full animate-orbit blur-xl" />

            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/10 rounded-full animate-orbit blur-xl"
              style={{
                animationDirection:
                  'reverse',
              }}
            />

          </Reveal>

        </div>
      </div>
    </section>
  );
};

export default StartalksSection;