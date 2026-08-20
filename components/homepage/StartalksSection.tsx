import React from 'react';
import { useNavigate } from 'react-router-dom';

const DEMO_STARTALKS = [
  {
    id: 'homepage-demo-1',
    authorName: 'Aarav Mehta',
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
    authorName: 'Riya Sharma',
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
    authorName: 'Kabir Verma',
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
    authorName: 'Ananya Kapoor',
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

const getInitials = (name: string) =>
  name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

const SmileIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.18 15.18a4.5 4.5 0 0 1-6.36 0M21 12a9 9 0 1 1-18 0ZM9.75 9.75h.01M14.25 9.75h.01"
    />
  </svg>
);

const CommentIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 9.75h6.75m-6.75 3h4.125M12 21a9 9 0 1 0-8.25-5.4L3 21l5.4-.75A8.96 8.96 0 0 0 12 21Z"
    />
  </svg>
);

const ShareIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    className="w-4 h-4"
  >
    <circle cx="18" cy="5" r="2.2" />
    <circle cx="6" cy="12" r="2.2" />
    <circle cx="18" cy="19" r="2.2" />

    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8 11 7.8-4.6M8 13l7.8 4.6"
    />
  </svg>
);

const StartalkDemoCard: React.FC<{
  talk: (typeof DEMO_STARTALKS)[number];
  onClick: () => void;
}> = ({ talk, onClick }) => {
  const initials = getInitials(talk.authorName);

  const totalReactions = talk.reactions.reduce(
    (sum, [, count]) => sum + count,
    0
  );

  return (
    <article
      onClick={onClick}
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
      "
    >
      {/* HEADER */}

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
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
            "
          >
            {initials}
          </div>

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
          <SmileIcon />

          <span className="text-[var(--text-primary)]">
            {totalReactions}
          </span>
        </div>
      </div>

      {/* CONTENT */}

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

      {/* REACTIONS */}

      <div className="flex items-center gap-2 flex-wrap">
        {talk.reactions.map(([emoji, count]) => (
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
            <span className="text-[0.8rem] leading-none">
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
        ))}
      </div>

      {/* ACTION BAR */}

      <div
        className="
          pt-2
          border-t
          border-[var(--border-primary)]
        "
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
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
              "
            >
              <SmileIcon />
              React
            </div>

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
              "
            >
              <CommentIcon />
              {talk.comments}
            </div>

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
              "
            >
              <ShareIcon />
            </div>
          </div>

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

const StartalksSection: React.FC<{
  Reveal: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
  }>;
}> = ({ Reveal }) => {
  const navigate = useNavigate();

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
          {/* LEFT */}

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

          {/* 4 STARTALK CARDS */}

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