import React from 'react';
import { useNavigate } from 'react-router-dom';

interface DemoStartalk {
  id: string;
  name: string;
  username: string;
  bio: string;
  content: string;
  time: string;
  initials: string;
  reactions: number;
  comments: number;
}

const demoStartalks: DemoStartalk[] = [
  {
    id: 'demo-1',
    name: 'Aarav Mehta',
    username: '@aarav',
    bio: 'Founder · Building in public',
    content:
      'Spent the whole week talking to users instead of writing code. Best product decision I made this month.',
    time: '2h',
    initials: 'AM',
    reactions: 24,
    comments: 6,
  },
  {
    id: 'demo-2',
    name: 'Riya Sharma',
    username: '@riyasharma',
    bio: 'Builder · Product & Growth',
    content:
      'Your first version does not need to be perfect. It needs to exist, reach people, and teach you something.',
    time: '5h',
    initials: 'RS',
    reactions: 41,
    comments: 9,
  },
  {
    id: 'demo-3',
    name: 'Kabir Verma',
    username: '@kabir',
    bio: 'Indie Hacker · Developer',
    content:
      'One small feature shipped today. One more reason for someone to come back tomorrow. Momentum compounds.',
    time: '8h',
    initials: 'KV',
    reactions: 18,
    comments: 4,
  },
  {
    id: 'demo-4',
    name: 'Ananya Kapoor',
    username: '@ananya',
    bio: 'Founder · Community Builder',
    content:
      'The best startup conversations usually start with a simple question: what are you building right now?',
    time: '1d',
    initials: 'AK',
    reactions: 32,
    comments: 7,
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

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <section
      className="
        py-14
        sm:py-16
        bg-white
        dark:bg-black
        relative
        overflow-hidden
      "
    >

      {/* Background atmosphere */}

      <div
        className="
          absolute
          -top-32
          -left-32
          w-80
          h-80
          rounded-full
          bg-blue-500/[0.06]
          blur-[90px]
          pointer-events-none
        "
      />

      <div
        className="
          absolute
          -bottom-32
          -right-32
          w-80
          h-80
          rounded-full
          bg-purple-500/[0.06]
          blur-[90px]
          pointer-events-none
        "
      />

      <div className="container mx-auto px-4 relative z-10">

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

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3
                py-1.5
                rounded-full
                border
                border-neutral-200
                dark:border-white/10
                bg-white/60
                dark:bg-white/[0.03]
                backdrop-blur-xl
                text-[9px]
                font-black
                uppercase
                tracking-[0.16em]
                text-neutral-500
                dark:text-neutral-400
              "
            >
              <span
                className="
                  w-1.5
                  h-1.5
                  rounded-full
                  bg-green-500
                  animate-pulse
                "
              />

              Founder conversations
            </div>

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
                leading-tight
              "
            >
              The pulse of
              <br />
              innovation
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
                max-w-md
                mx-auto
                lg:mx-0
              "
            >
              Real thoughts, honest lessons,
              tiny wins and bold ideas from
              people building what's next.
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
              FOUR IOS 27 GLASS STARTALK CARDS
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

              {demoStartalks.map(
                (talk, index) => (

                  <button
                    key={talk.id}
                    type="button"
                    onClick={goToLogin}
                    className="
                      group
                      relative
                      text-left
                      w-full
                      min-h-[225px]
                      rounded-[1.65rem]
                      overflow-hidden
                      border
                      border-black/[0.08]
                      dark:border-white/[0.12]
                      bg-white/[0.72]
                      dark:bg-white/[0.035]
                      backdrop-blur-[28px]
                      backdrop-saturate-[180%]
                      p-5
                      transition-all
                      duration-500
                      hover:-translate-y-1.5
                      hover:border-black/[0.14]
                      dark:hover:border-white/[0.20]
                      active:scale-[0.985]
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-purple-500/40
                      font-poppins
                    "
                  >

                    {/* Glass highlight */}

                    <div
                      className="
                        absolute
                        inset-0
                        pointer-events-none
                        bg-gradient-to-br
                        from-white/[0.75]
                        via-transparent
                        to-blue-500/[0.035]
                        dark:from-white/[0.07]
                        dark:via-transparent
                        dark:to-purple-500/[0.04]
                      "
                    />

                    {/* Top glass reflection */}

                    <div
                      className="
                        absolute
                        left-[8%]
                        right-[8%]
                        top-0
                        h-px
                        bg-gradient-to-r
                        from-transparent
                        via-white
                        to-transparent
                        dark:via-white/20
                        pointer-events-none
                      "
                    />

                    {/* Ambient glow */}

                    <div
                      className={`
                        absolute
                        -bottom-16
                        -right-12
                        w-32
                        h-32
                        rounded-full
                        blur-[55px]
                        pointer-events-none
                        transition-all
                        duration-500
                        ${
                          index % 2 === 0
                            ? 'bg-blue-500/[0.12] group-hover:bg-blue-500/[0.18]'
                            : 'bg-purple-500/[0.10] group-hover:bg-purple-500/[0.17]'
                        }
                      `}
                    />

                    <div
                      className="
                        relative
                        z-10
                        h-full
                        flex
                        flex-col
                      "
                    >

                      {/* AUTHOR */}

                      <div
                        className="
                          flex
                          items-center
                          justify-between
                          gap-3
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-2.5
                          "
                        >

                          <div
                            className="
                              w-9
                              h-9
                              shrink-0
                              rounded-full
                              bg-gradient-to-br
                              from-red-500
                              via-purple-500
                              to-blue-500
                              flex
                              items-center
                              justify-center
                              text-white
                              text-[10px]
                              font-black
                              shadow-sm
                            "
                          >
                            {talk.initials}
                          </div>

                          <div className="min-w-0">

                            <div
                              className="
                                flex
                                items-center
                                gap-1.5
                              "
                            >

                              <p
                                className="
                                  text-[12px]
                                  font-bold
                                  text-black
                                  dark:text-white
                                  truncate
                                "
                              >
                                {talk.name}
                              </p>

                              <span
                                className="
                                  w-3.5
                                  h-3.5
                                  rounded-full
                                  bg-blue-500
                                  text-white
                                  flex
                                  items-center
                                  justify-center
                                  text-[7px]
                                  font-black
                                "
                              >
                                ✓
                              </span>

                            </div>

                            <p
                              className="
                                text-[9px]
                                text-neutral-500
                                dark:text-neutral-400
                                truncate
                              "
                            >
                              {talk.bio}
                            </p>

                          </div>

                        </div>

                        <span
                          className="
                            text-[9px]
                            font-medium
                            text-neutral-400
                            dark:text-neutral-500
                            shrink-0
                          "
                        >
                          {talk.time}
                        </span>

                      </div>


                      {/* CONTENT */}

                      <p
                        className="
                          mt-5
                          text-[12px]
                          sm:text-[12.5px]
                          leading-[1.65]
                          font-medium
                          text-neutral-700
                          dark:text-neutral-300
                          line-clamp-4
                        "
                      >
                        {talk.content}
                      </p>


                      {/* FOOTER */}

                      <div
                        className="
                          mt-auto
                          pt-4
                          flex
                          items-center
                          justify-between
                          border-t
                          border-black/[0.06]
                          dark:border-white/[0.08]
                        "
                      >

                        <div
                          className="
                            flex
                            items-center
                            gap-4
                          "
                        >

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-[9px]
                              font-bold
                              text-neutral-500
                              dark:text-neutral-400
                            "
                          >
                            <span className="text-[13px]">
                              ♡
                            </span>
                            {talk.reactions}
                          </span>

                          <span
                            className="
                              flex
                              items-center
                              gap-1.5
                              text-[9px]
                              font-bold
                              text-neutral-500
                              dark:text-neutral-400
                            "
                          >
                            <span className="text-[11px]">
                              ◌
                            </span>
                            {talk.comments}
                          </span>

                        </div>

                        <span
                          className="
                            text-[8px]
                            font-black
                            uppercase
                            tracking-[0.14em]
                            text-neutral-400
                            dark:text-neutral-500
                            opacity-0
                            translate-x-1
                            group-hover:opacity-100
                            group-hover:translate-x-0
                            transition-all
                            duration-300
                          "
                        >
                          View talk →
                        </span>

                      </div>

                    </div>

                  </button>

                )
              )}

            </div>


            {/* Floating decorations */}

            <div
              className="
                absolute
                -top-6
                -right-6
                w-12
                h-12
                rounded-full
                bg-purple-500/[0.10]
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
                rounded-full
                bg-blue-500/[0.10]
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