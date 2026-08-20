import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StartalkCard } from '../StartalkCard';
import { Startalk } from '../../types';

const DEMO_STARTALKS: Startalk[] = [
  {
    id: 'homepage-demo-1',
    authorId: 'homepage-user-1',
    authorName: 'Aarav Mehta',
    authorHeadline: 'Founder · Building in public',
    authorAvatar: '',
    content:
      'Spent the whole week talking to users instead of writing code. Best product decision I made this month.',
    timestamp: new Date(
      Date.now() - 2 * 60 * 60 * 1000
    ).toISOString(),
    reactions: {
      '🚀': 18,
      '❤️': 6,
    },
    userReactions: {},
    currentUserReaction: undefined,
    commentCount: 6,
  },

  {
    id: 'homepage-demo-2',
    authorId: 'homepage-user-2',
    authorName: 'Riya Sharma',
    authorHeadline: 'Product · Growth · Builder',
    authorAvatar: '',
    content:
      'Your first version does not need to be perfect. It needs to exist, reach people, and teach you something.',
    timestamp: new Date(
      Date.now() - 5 * 60 * 60 * 1000
    ).toISOString(),
    reactions: {
      '💡': 22,
      '🔥': 9,
    },
    userReactions: {},
    currentUserReaction: undefined,
    commentCount: 9,
  },

  {
    id: 'homepage-demo-3',
    authorId: 'homepage-user-3',
    authorName: 'Kabir Verma',
    authorHeadline: 'Indie Hacker · Developer',
    authorAvatar: '',
    content:
      'One small feature shipped today. One more reason for someone to come back tomorrow. Momentum compounds.',
    timestamp: new Date(
      Date.now() - 8 * 60 * 60 * 1000
    ).toISOString(),
    reactions: {
      '🚀': 11,
      '💯': 7,
    },
    userReactions: {},
    currentUserReaction: undefined,
    commentCount: 4,
  },

  {
    id: 'homepage-demo-4',
    authorId: 'homepage-user-4',
    authorName: 'Ananya Kapoor',
    authorHeadline: 'Founder · Community Builder',
    authorAvatar: '',
    content:
      'The best startup conversations usually start with a simple question: what are you building right now?',
    timestamp: new Date(
      Date.now() - 24 * 60 * 60 * 1000
    ).toISOString(),
    reactions: {
      '❤️': 19,
      '🔥': 13,
    },
    userReactions: {},
    currentUserReaction: undefined,
    commentCount: 7,
  },
];

const StartalksSection: React.FC<{
  Reveal: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
  }>;
}> = ({ Reveal }) => {
  const navigate = useNavigate();

  /*
   * Homepage Startalks are preview-only.
   *
   * No API.
   * No AppContext.
   * No real Startalk fetching.
   *
   * Every interaction opens login.
   */
  const goToLogin = () => {
    navigate('/login');
  };

  /*
   * StartalkCard itself contains real interaction handlers
   * such as React / Comments / Share / Profile links.
   *
   * We don't want those actions on the homepage demo cards.
   *
   * So the whole card is wrapped with a login gate.
   */
  const handleCardClick = (
    event: React.MouseEvent
  ) => {
    event.preventDefault();
    event.stopPropagation();

    navigate('/login');
  };

  return (
    <section
      className="
        py-12
        sm:py-16
        bg-white
        dark:bg-black
        relative
        overflow-hidden
      "
    >
      {/* Background decoration */}

      <div
        className="
          absolute
          -top-24
          -left-24
          w-64
          h-64
          bg-blue-500/5
          rounded-full
          blur-3xl
          opacity-40
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -right-24
          w-64
          h-64
          bg-purple-500/5
          rounded-full
          blur-3xl
          opacity-40
          pointer-events-none
        "
      />

      <div
        className="
          container
          mx-auto
          px-4
          relative
          z-10
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            items-center
            gap-10
            max-w-6xl
            mx-auto
          "
        >

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <Reveal
            className="
              lg:w-[42%]
              space-y-6
              text-center
              lg:text-left
            "
          >

            <h2
              className="
                text-3xl
                md:text-4xl
                font-extrabold
                tracking-tighter
                text-black
                dark:text-white
                font-poppins
                uppercase
              "
            >
              The pulse of innovation
            </h2>

            <p
              className="
                text-sm
                sm:text-base
                text-neutral-600
                dark:text-neutral-400
                font-medium
                leading-relaxed
                font-poppins
              "
            >
              Explore real-time thoughts, wins,
              and pivots from founders building
              the next big things. Startalks is
              the social layer where the community
              breathes.
            </p>

            <div
              className="
                flex
                flex-wrap
                justify-center
                lg:justify-start
                gap-4
                pt-2
              "
            >

              <button
                type="button"
                onClick={goToLogin}
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
                  font-poppins
                "
              >
                Enter the feed
              </button>

              <button
                type="button"
                onClick={goToLogin}
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
                  active:scale-95
                  font-poppins
                "
              >
                Join the talk
              </button>

            </div>

          </Reveal>


          {/* =================================================
              STARTALK CARDS
          ================================================= */}

          <Reveal
            className="
              lg:w-[58%]
              w-full
              relative
            "
            delay={120}
          >

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >

              {DEMO_STARTALKS.map(
                (talk, index) => (

                  <div
                    key={talk.id}
                    onClick={handleCardClick}
                    onMouseDown={handleCardClick}
                    className="
                      cursor-pointer
                      relative
                      transition-transform
                      duration-300
                      hover:-translate-y-1
                    "
                    role="button"
                    tabIndex={0}
                    onKeyDown={event => {
                      if (
                        event.key === 'Enter' ||
                        event.key === ' '
                      ) {
                        event.preventDefault();
                        navigate('/login');
                      }
                    }}
                    aria-label="Login to interact with this Startalk"
                  >

                    {/* 
                     * Existing StartalkCard.
                     *
                     * This means:
                     * SAME avatar
                     * SAME typography
                     * SAME reaction pills
                     * SAME action bar
                     * SAME comment button
                     * SAME share button
                     * SAME spacing
                     * SAME borders
                     * SAME dark mode
                     * SAME responsive UI
                     */}

                    <div
                      className="
                        pointer-events-none
                      "
                    >
                      <StartalkCard
                        talk={talk}
                        className="
                          !p-4
                          !rounded-2xl
                          h-full
                        "
                      />
                    </div>

                    {/* 
                     * Invisible interaction layer.
                     *
                     * It sits above the existing card so
                     * React / comments / share / profile
                     * cannot execute on homepage.
                     */}

                    <div
                      className="
                        absolute
                        inset-0
                        z-[50]
                        rounded-2xl
                      "
                      aria-hidden="true"
                    />

                  </div>

                )
              )}

            </div>

            {/* Decorative circles */}

            <div
              className="
                absolute
                -top-6
                -right-6
                w-12
                h-12
                bg-purple-500/10
                rounded-full
                blur-xl
                pointer-events-none
              "
            />

            <div
              className="
                absolute
                -bottom-6
                -left-6
                w-16
                h-16
                bg-blue-500/10
                rounded-full
                blur-xl
                pointer-events-none
              "
            />

          </Reveal>

        </div>

      </div>
    </section>
  );
};

export default StartalksSection;