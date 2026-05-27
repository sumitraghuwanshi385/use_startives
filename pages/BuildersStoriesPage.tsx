import StoryCard from "../components/StoryCard";
import { stories } from "../data/stories";

export default function BuildersStoriesPage() {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--background-primary)]
        text-[var(--text-primary)]
        transition-colors
        duration-300
        font-['Poppins']
      "
    >
      {/* HERO */}
      <section
        className="
          relative
          pt-10 md:pt-14
          pb-10 md:pb-14
          overflow-hidden
          border-b
          border-[var(--border-primary)]
        "
      >
        {/* BACKGROUND GLOW */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          <div
            className="
              absolute
              top-[-260px]
              left-1/2
              -translate-x-1/2
              w-[850px]
              h-[850px]
              rounded-full
              blur-3xl
              opacity-[0.14]
              bg-gradient-to-br
              from-red-600
              via-blue-500
              to-cyan-400
            "
          />

          <div
            className="
              absolute
              top-20
              right-[-120px]
              w-[280px]
              h-[280px]
              rounded-full
              blur-3xl
              opacity-20
              bg-blue-500
            "
          />

          <div
            className="
              absolute
              bottom-0
              left-[-100px]
              w-[240px]
              h-[240px]
              rounded-full
              blur-3xl
              opacity-20
              bg-red-500
            "
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

          {/* TOP TEXT */}
          <div className="max-w-4xl">

            {/* PILL */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border
                border-white/10
                bg-[var(--component-background)]
                backdrop-blur-xl
                shadow-[0_10px_40px_rgba(37,99,235,0.15)]
                mb-2
              "
            >
              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  bg-gradient-to-r
                  from-red-500
                  to-blue-500
                  animate-pulse
                "
              />

              <p
                className="
                  uppercase
                  tracking-[0.22em]
                  text-[10px]
                  md:text-xs
                  font-bold
                  bg-gradient-to-r
                  from-red-500
                  to-blue-500
                  bg-clip-text
                  text-transparent
                "
              >
                Builders Stories
              </p>
            </div>

            {/* HEADING */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-7xl
                font-black
                leading-[0.92]
                tracking-[-0.04em]
              "
            >
              Real Founder Stories.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-red-500
                  via-blue-500
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                Real Revenue.
              </span>
            </h1>

            {/* DESCRIPTION */}
            <p
              className="
                mt-4
                text-sm
                md:text-lg
                text-[var(--text-secondary)]
                leading-relaxed
                max-w-2xl
                font-medium
              "
            >
              Deep startup case studies covering SaaS growth,
              revenue, distribution, acquisition strategies,
              failures, and how internet startups actually scaled.
            </p>

            {/* MINI STATS */}
            <div className="flex flex-wrap gap-3 mt-6">

              {/* CARD */}
              <div
                className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  backdrop-blur-xl
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  min-w-[120px]
                "
              >
                <p
                  className="
                    text-xl
                    font-black
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  10+
                </p>

                <p
                  className="
                    text-[11px]
                    text-[var(--text-secondary)]
                    mt-1
                    font-medium
                  "
                >
                  Founder Stories
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  backdrop-blur-xl
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  min-w-[120px]
                "
              >
                <p
                  className="
                    text-xl
                    font-black
                    bg-gradient-to-r
                    from-blue-500
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  $1M+
                </p>

                <p
                  className="
                    text-[11px]
                    text-[var(--text-secondary)]
                    mt-1
                    font-medium
                  "
                >
                  Combined Revenue
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  px-4
                  py-3
                  rounded-2xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  backdrop-blur-xl
                  shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                  min-w-[150px]
                "
              >
                <p
                  className="
                    text-xl
                    font-black
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Bootstrapped
                </p>

                <p
                  className="
                    text-[11px]
                    text-[var(--text-secondary)]
                    mt-1
                    font-medium
                  "
                >
                  Internet Businesses
                </p>
              </div>

            </div>
          </div>

          {/* STORIES */}
          <div className="grid lg:grid-cols-3 gap-7 mt-10 md:mt-12">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}