import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface RecentStartalk {
  id: string;
  content: string;
  timestamp: string;
  authorId?: string;
  authorName?: string;
  authorAvatar?: string;
  authorHeadline?: string;
  imageUrl?: string;
  reactions?: Record<string, number>;
  commentCount?: number;
}

const StartalksSection: React.FC<{
  Reveal: React.FC<{
    children: React.ReactNode;
    delay?: number;
    className?: string;
    as?: 'div' | 'section';
  }>;
}> = ({ Reveal }) => {
  const [startalks, setStartalks] = useState<RecentStartalk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchRecentStartalks = async () => {
      try {
        setLoading(true);

        /*
         * IMPORTANT:
         * No auth token required.
         * Homepage can fetch public Startalks.
         */
        const response = await axios.get('/api/startalks');

        if (
          response.data?.success &&
          Array.isArray(response.data.startalks)
        ) {
          const normalized = response.data.startalks
            .map((talk: any) => ({
              ...talk,

              id: String(
                talk._id ||
                talk.id ||
                ''
              ),

              content: String(
                talk.content ||
                ''
              ),

              timestamp:
                talk.timestamp ||
                talk.createdAt ||
                talk.updatedAt ||
                '',

              authorId:
                talk.authorId ||
                talk.author?._id ||
                talk.author?.id ||
                undefined,

              authorName:
                talk.authorName ||
                talk.author?.name ||
                talk.user?.name ||
                'Builder',

              authorAvatar:
                talk.authorAvatar ||
                talk.author?.profilePictureUrl ||
                talk.author?.avatar ||
                talk.user?.profilePictureUrl ||
                talk.user?.avatar ||
                undefined,

              authorHeadline:
                talk.authorHeadline ||
                talk.author?.headline ||
                talk.user?.headline ||
                'Builder',

              imageUrl:
                talk.imageUrl ||
                undefined,

              commentCount: Number(
                talk.commentCount ||
                talk.commentsCount ||
                0
              ),
            }))
            .filter(
              (talk: RecentStartalk) =>
                talk.id &&
                talk.content
            )
            .sort(
              (
                a: RecentStartalk,
                b: RecentStartalk
              ) =>
                new Date(
                  b.timestamp
                ).getTime() -
                new Date(
                  a.timestamp
                ).getTime()
            )
            .slice(0, 4);

          if (!cancelled) {
            setStartalks(normalized);
          }
        } else {
          if (!cancelled) {
            setStartalks([]);
          }
        }
      } catch (error) {
        console.error(
          'Homepage Startalk fetch failed:',
          error
        );

        if (!cancelled) {
          setStartalks([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchRecentStartalks();

    return () => {
      cancelled = true;
    };
  }, []);

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map(word => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  const getTimeAgo = (
    timestamp: string
  ) => {
    if (!timestamp) return '';

    const diff =
      Date.now() -
      new Date(timestamp).getTime();

    const minutes = Math.floor(
      diff / 60000
    );

    if (minutes < 1) return 'Just now';
    if (minutes < 60)
      return `${minutes}m ago`;

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24)
      return `${hours}h ago`;

    const days = Math.floor(
      hours / 24
    );

    if (days < 7)
      return `${days}d ago`;

    return new Date(
      timestamp
    ).toLocaleDateString();
  };

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

          {/* REAL STARTALKS */}

          <Reveal
            className="lg:w-[58%] w-full relative"
            delay={120}
          >

            {loading ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {[1, 2, 3, 4].map(
                  item => (
                    <div
                      key={item}
                      className="
                        h-[190px]
                        rounded-2xl
                        border
                        border-neutral-200
                        dark:border-white/10
                        bg-neutral-50
                        dark:bg-white/[0.02]
                        animate-pulse
                      "
                    />
                  )
                )}

              </div>

            ) : startalks.length > 0 ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {startalks.map(
                  talk => {

                    const name =
                      talk.authorName ||
                      'Builder';

                    const initials =
                      getInitials(
                        name
                      );

                    return (
                      <article
                        key={talk.id}
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
                          hover:border-purple-500/30
                          font-poppins
                        "
                      >

                        {/* USER */}

                        <div className="flex items-center justify-between gap-2 mb-3">

                          <div className="flex items-center gap-2 min-w-0">

                            {talk.authorAvatar ? (

                              <img
                                src={
                                  talk.authorAvatar
                                }
                                alt={name}
                                className="
                                  w-8 h-8
                                  rounded-full
                                  object-cover
                                  border
                                  border-neutral-200
                                  dark:border-white/10
                                  shrink-0
                                "
                              />

                            ) : (

                              <div
                                className="
                                  w-8 h-8
                                  rounded-full
                                  icon-bg-gradient
                                  flex items-center
                                  justify-center
                                  text-white
                                  text-[9px]
                                  font-bold
                                  shrink-0
                                "
                              >
                                {initials}
                              </div>

                            )}

                            <div className="min-w-0">

                              <p className="
                                text-[11px]
                                font-bold
                                text-black
                                dark:text-white
                                truncate
                              ">
                                {name}
                              </p>

                              <p className="
                                text-[8px]
                                text-purple-500
                                truncate
                                font-medium
                              ">
                                {talk.authorHeadline ||
                                  'Builder'}
                              </p>

                            </div>

                          </div>

                          <span className="
                            text-[8px]
                            text-neutral-400
                            font-bold
                            uppercase
                            tracking-wider
                            shrink-0
                          ">
                            {getTimeAgo(
                              talk.timestamp
                            )}
                          </span>

                        </div>

                        {/* CONTENT */}

                        <p className="
                          text-[11px]
                          leading-relaxed
                          text-neutral-600
                          dark:text-neutral-400
                          font-medium
                          line-clamp-4
                          break-words
                        ">
                          {talk.content}
                        </p>

                        {/* IMAGE */}

                        {talk.imageUrl && (
                          <div className="mt-3 rounded-xl overflow-hidden border border-neutral-200 dark:border-white/10">
                            <img
                              src={
                                talk.imageUrl
                              }
                              alt="Startalk"
                              className="
                                w-full
                                max-h-36
                                object-cover
                              "
                              loading="lazy"
                            />
                          </div>
                        )}

                        {/* FOOTER */}

                        <div className="
                          mt-3
                          pt-3
                          border-t
                          border-neutral-100
                          dark:border-white/10
                          flex
                          items-center
                          justify-between
                        ">

                          <span className="
                            text-[9px]
                            text-neutral-400
                            font-semibold
                          ">
                            {talk.commentCount || 0}
                            {' '}
                            comments
                          </span>

                          <Link
                            to="/startalks"
                            className="
                              text-[9px]
                              font-black
                              uppercase
                              tracking-widest
                              text-purple-600
                              dark:text-purple-400
                              hover:underline
                            "
                          >
                            View talk →
                          </Link>

                        </div>

                      </article>
                    );
                  }
                )}

              </div>

            ) : (

              <div
                className="
                  w-full
                  min-h-[220px]
                  flex
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-neutral-200
                  dark:border-white/15
                  bg-white
                  dark:bg-black
                  text-center
                  font-poppins
                "
              >
                <div>

                  <p className="
                    text-sm
                    font-bold
                    text-black
                    dark:text-white
                  ">
                    No Startalks yet
                  </p>

                  <p className="
                    text-xs
                    text-neutral-500
                    dark:text-neutral-400
                    mt-1
                  ">
                    Be the first to start the conversation.
                  </p>

                  <Link
                    to="/startalks"
                    className="
                      inline-block
                      mt-4
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

            {/* DECORATION */}

            <div className="
              absolute
              -top-6
              -right-6
              w-12
              h-12
              bg-purple-500/10
              rounded-full
              animate-orbit
              blur-xl
              pointer-events-none
            " />

            <div
              className="
                absolute
                -bottom-6
                -left-6
                w-16
                h-16
                bg-blue-500/10
                rounded-full
                animate-orbit
                blur-xl
                pointer-events-none
              "
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