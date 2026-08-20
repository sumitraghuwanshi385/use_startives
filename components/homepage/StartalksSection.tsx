import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { StartalkCard } from './StartalkCard';

const StartalksSection: React.FC<{
  Reveal: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
  }>;
}> = ({ Reveal }) => {
  const { startalks } = useAppContext();

  const recentStartalks = [...(startalks || [])]
    .sort((a, b) => {
      const dateA = new Date(
        String(a.timestamp || '')
      ).getTime();

      const dateB = new Date(
        String(b.timestamp || '')
      ).getTime();

      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <section className="py-12 bg-white dark:bg-black relative overflow-hidden">

      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl opacity-40" />

      <div className="container mx-auto px-4 relative z-10">

        <div className="flex flex-col lg:flex-row items-center gap-10 max-w-6xl mx-auto">

          {/* LEFT */}

          <Reveal
            className="lg:w-[42%] space-y-6 text-center lg:text-left"
          >
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
                  px-8 py-2.5
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
                  bg-white dark:bg-black
                  text-black dark:text-white
                  border border-neutral-200
                  dark:border-white/15
                  px-8 py-2.5
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

          {/* REAL RECENT STARTALKS */}

          <Reveal
            className="lg:w-[58%] w-full relative"
            delay={120}
          >
            {recentStartalks.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {recentStartalks.map((talk) => (
                  <StartalkCard
                    key={String(talk.id)}
                    talk={talk}
                    className="!p-4 !rounded-2xl h-full"
                  />
                ))}

              </div>

            ) : (

              <div
                className="
                  w-full min-h-[220px]
                  flex items-center justify-center
                  rounded-2xl
                  border border-neutral-200
                  dark:border-white/15
                  bg-white dark:bg-black
                  text-center
                  font-poppins
                "
              >
                <div>

                  <p className="text-sm font-bold text-black dark:text-white">
                    No Startalks yet
                  </p>

                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Be the first to start the conversation.
                  </p>

                  <Link
                    to="/startalks"
                    className="
                      inline-block mt-4
                      text-[10px]
                      font-black
                      uppercase
                      tracking-widest
                      text-purple-600
                      dark:text-purple-400
                      hover:underline
                    "
                  >
                    Share a Startalk →
                  </Link>

                </div>
              </div>

            )}

            <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-500/10 rounded-full animate-orbit blur-xl pointer-events-none" />

            <div
              className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-500/10 rounded-full animate-orbit blur-xl pointer-events-none"
              style={{
                animationDirection: 'reverse',
              }}
            />

          </Reveal>

        </div>
      </div>

    </section>
  );
};

export default StartalksSection;