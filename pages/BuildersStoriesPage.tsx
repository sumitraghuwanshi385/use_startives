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
          pt-8 md:pt-10
          pb-10 md:pb-14
          overflow-hidden
          border-b
          border-[var(--border-primary)]
        "
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">

          {/* MAIN RED BLUE GLOW */}
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
              opacity-[0.12]
              bg-gradient-to-br
              from-red-500
              to-blue-500
            "
          />

          {/* RED GLOW */}
          <div
            className="
              absolute
              bottom-[-80px]
              left-[-80px]
              w-[220px]
              h-[220px]
              rounded-full
              blur-3xl
              opacity-15
              bg-red-500
            "
          />

          {/* BLUE GLOW */}
          <div
            className="
              absolute
              top-20
              right-[-90px]
              w-[220px]
              h-[220px]
              rounded-full
              blur-3xl
              opacity-15
              bg-blue-500
            "
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

          {/* TEXT */}
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
                border-[var(--border-primary)]
                bg-[var(--component-background)]
                backdrop-blur-xl
                mb-4
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
                  to-blue-500
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
              revenue, acquisition strategies, failures,
              distribution, and how internet startups scaled.
            </p>

            {/* MINI STATS */}
            <div className="flex flex-wrap gap-2 mt-5">

              {/* CARD */}
              <div
                className="
                  px-3.5
                  py-2.5
                  rounded-xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  min-w-[110px]
                "
              >
                <p
                  className="
                    text-lg
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
                    text-[10px]
                    text-[var(--text-secondary)]
                    mt-0.5
                    font-medium
                  "
                >
                  Founder Stories
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  px-3.5
                  py-2.5
                  rounded-xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  min-w-[115px]
                "
              >
                <p
                  className="
                    text-lg
                    font-black
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  $1M+
                </p>

                <p
                  className="
                    text-[10px]
                    text-[var(--text-secondary)]
                    mt-0.5
                    font-medium
                  "
                >
                  Revenue Tracked
                </p>
              </div>

              {/* CARD */}
              <div
                className="
                  px-3.5
                  py-2.5
                  rounded-xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  min-w-[135px]
                "
              >
                <p
                  className="
                    text-lg
                    font-black
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Bootstrap
                </p>

                <p
                  className="
                    text-[10px]
                    text-[var(--text-secondary)]
                    mt-0.5
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