import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Smile,
  MessageCircle,
  Share2,
} from 'lucide-react';

interface DemoStartalk {
  id: string;
  authorName: string;
  authorHeadline: string;
  content: string;
  time: string;
  reactions: [string, number][];
  comments: number;
}

/* =========================================================
   HOMEPAGE DEMO STARTALKS
   No API / No AppContext / No backend dependency
========================================================= */

const DEMO_STARTALKS: DemoStartalk[] = [
  {
    id: 'homepage-demo-1',
    authorName: 'Prince Gupta',
    authorHeadline: 'Founder · Building in public',
    content:
      'Spent the whole week talking to users instead of writing code. Best product decision I made this month.',
    time: '2h',
    reactions: [
      ['🚀', 18],
      ['❤️', 6],
    ],
    comments: 6,
  },

  {
    id: 'homepage-demo-2',
    authorName: 'Sumit Raghuwanshi',
    authorHeadline: 'Product · Growth · Builder',
    content:
      'Your first version does not need to be perfect. It needs to exist, reach people, and teach you something.',
    time: '5h',
    reactions: [
      ['💡', 22],
      ['🔥', 9],
    ],
    comments: 9,
  },

  {
    id: 'homepage-demo-3',
    authorName: 'Dushant Kumar',
    authorHeadline: 'Indie Hacker · Developer',
    content:
      'One small feature shipped today. One more reason for someone to come back tomorrow. Momentum compounds.',
    time: '8h',
    reactions: [
      ['🚀', 11],
      ['💯', 7],
    ],
    comments: 4,
  },

  {
    id: 'homepage-demo-4',
    authorName: 'Jacob Jeilling',
    authorHeadline: 'Founder · Community Builder',
    content:
      'The best startup conversations usually start with a simple question: what are you building right now?',
    time: '1d',
    reactions: [
      ['❤️', 19],
      ['🔥', 13],
    ],
    comments: 7,
  },
];

/* =========================================================
   HELPERS
========================================================= */

const getInitials = (name: string): string =>
  name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/* =========================================================
   STARTALK DEMO CARD
========================================================= */

const StartalkDemoCard: React.FC<{
  talk: DemoStartalk;
  onClick: () => void;
}> = ({ talk, onClick }) => {
  const initials = getInitials(
    talk.authorName
  );

  const totalReactions =
    talk.reactions.reduce(
      (sum, [, count]) =>
        sum + count,
      0
    );

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={event => {
        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {
          event.preventDefault();
          onClick();
        }
      }}
      aria-label="Login to interact with this Startalk"
      className="
        w-full
        relative
        bg-[var(--component-background)]
        rounded-2xl
        border
        border-[var(--border-primary)]
        p-4
        md:p-5
        transition-all
        duration-300
        hover:border-purple-500/30
        hover:-translate-y-1
        group
        flex
        flex-col
        gap-4
        select-none
        font-poppins
        cursor-pointer
        outline-none
        focus-visible:ring-2
        focus-visible:ring-purple-500/40
      "
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="flex items-start justify-between gap-3">

        <div className="flex items-center gap-3 min-w-0">

          {/* AVATAR */}

          <div
            className="
              w-10
              h-10
              md:w-11
              md:h-11
              rounded-full
              icon-bg-gradient
              flex
              items-center
              justify-center
              text-white
              font-bold
              text-[11px]
              shrink-0
              border
              border-[var(--border-primary)]
            "
          >
            {initials}
          </div>

          {/* USER INFO */}

          <div className="overflow-hidden min-w-0">

            <span
              className="
                font-semibold
                text-sm
                text-[var(--text-primary)]
                truncate
                block
                tracking-tight
              "
            >
              {talk.authorName}
            </span>

            <p
              className="
                text-[10px]
                text-purple-500
                truncate
                font-medium
              "
            >
              {talk.authorHeadline}
            </p>

          </div>
        </div>

        {/* TOTAL REACTIONS */}

        <div
          className="
            inline-flex
            items-center
            gap-1.5
            px-2.5
            py-1
            rounded-full
            bg-[var(--background-tertiary)]
            border
            border-[var(--border-primary)]
            text-[10px]
            font-black
            shrink-0
          "
        >
          <Smile
            className="
              w-3.5
              h-3.5
              text-purple-500
            "
            strokeWidth={1.6}
          />

          <span className="text-[var(--text-primary)]">
            {totalReactions}
          </span>
        </div>

      </div>

      {/* =================================================
          CONTENT
      ================================================= */}

      <div className="space-y-3 text-left">

        <p
          className="
            text-sm
            text-[var(--text-secondary)]
            leading-relaxed
            font-medium
          "
        >
          {talk.content}
        </p>

      </div>

      {/* =================================================
          REACTIONS
      ================================================= */}

      <div className="flex items-center gap-2 flex-wrap">

        {talk.reactions.map(
          ([emoji, count]) => (
            <div
              key={emoji}
              className="
                flex
                items-center
                gap-1
                px-2.5
                py-1
                rounded-full
                bg-[var(--background-tertiary)]
                border
                border-[var(--border-primary)]
              "
            >

              <span
                className="
                  text-[0.8rem]
                  leading-none
                "
              >
                {emoji}
              </span>

              <span
                className="
                  text-[11px]
                  font-bold
                  text-[var(--text-primary)]
                "
              >
                {count}
              </span>

            </div>
          )
        )}

      </div>

      {/* =================================================
          ACTION BAR
      ================================================= */}

      <div
        className="
          pt-2
          border-t
          border-[var(--border-primary)]
        "
      >

        <div
          className="
            flex
            items-center
            justify-between
            gap-2
          "
        >

          <div
            className="
              flex
              items-center
              gap-2
              min-w-0
            "
          >

            {/* ================= REACT ================= */}

            <div
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                w-[82px]
                h-8
                px-3
                rounded-full
                border
                border-[var(--border-primary)]
                bg-[var(--background-tertiary)]
                text-[var(--text-muted)]
                text-[9px]
                font-black
                uppercase
                shrink-0
              "
            >

              <Smile
                className="w-4 h-4"
                strokeWidth={1.6}
              />

              <span>
                React
              </span>

            </div>

            {/* ================= COMMENTS ================= */}

            <div
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                w-[65px]
                h-8
                px-2
                rounded-full
                border
                border-[var(--border-primary)]
                bg-[var(--background-tertiary)]
                text-[var(--text-muted)]
                text-[9px]
                font-black
                shrink-0
              "
            >

              <MessageCircle
                className="w-4 h-4"
                strokeWidth={1.6}
              />

              <span>
                {talk.comments}
              </span>

            </div>

            {/* ================= SHARE ================= */}

            <div
              className="
                inline-flex
                items-center
                justify-center
                w-8
                h-8
                rounded-full
                border
                border-[var(--border-primary)]
                bg-[var(--background-tertiary)]
                text-[var(--text-muted)]
                shrink-0
              "
            >

              <Share2
                className="w-4 h-4"
                strokeWidth={1.7}
              />

            </div>

          </div>

          {/* TIME */}

          <span
            className="
              text-[8px]
              text-[var(--text-muted)]
              font-bold
              uppercase
              tracking-widest
              shrink-0
            "
          >
            {talk.time}
          </span>

        </div>

      </div>

    </article>
  );
};

/* =========================================================
   STARTALKS SECTION
========================================================= */

const StartalksSection: React.FC<{
  Reveal: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
  }>;
}> = ({ Reveal }) => {

  const navigate =
    useNavigate();

  /* =======================================================
     LOGIN GATE
  ======================================================= */

  const goToLogin = () => {
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

      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

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

      {/* =================================================
          CONTAINER
      ================================================= */}

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
              Explore real-time thoughts,
              wins, and pivots from founders
              building the next big things.
              Startalks is the social layer
              where the community breathes.
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

              {/* ENTER FEED */}

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

              {/* JOIN TALK */}

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
              4 STARTALK CARDS
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
                  <Reveal
                    key={talk.id}
                    delay={index * 70}
                  >

                    <StartalkDemoCard
                      talk={talk}
                      onClick={goToLogin}
                    />

                  </Reveal>
                )
              )}

            </div>

            {/* =================================================
                DECORATIVE CIRCLES
            ================================================= */}

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