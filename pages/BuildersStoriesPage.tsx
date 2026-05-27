import StoryCard from "../components/StoryCard";
import { stories } from "../data/stories";

export default function BuildersStoriesPage() {
  return (
    <div
      className="
        min-h-screen
        bg-[var(--background-primary)]
        text-[var(--text-primary)]
        transition-colors duration-300
        font-['Poppins']
      "
    >
      {/* HERO */}
      <section
        className="
          relative
          pt-20 md:pt-24
          pb-12 md:pb-16
          overflow-hidden
          border-b border-[var(--border-primary)]
        "
      >
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="
              absolute
              top-[-220px]
              left-1/2
              -translate-x-1/2
              w-[750px]
              h-[750px]
              rounded-full
              blur-3xl
              opacity-20
              bg-gradient-to-br
              from-red-500
              via-fuchsia-500
              to-blue-500
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
                px-5
                py-2
                rounded-full
                border
                border-red-500/20
                bg-white/5
                backdrop-blur-xl
                shadow-[0_0_30px_rgba(239,68,68,0.12)]
                mb-3
              "
            >
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

              <p
                className="
                  uppercase
                  tracking-[0.24em]
                  text-red-400
                  text-[10px]
                  md:text-xs
                  font-bold
                "
              >
                Builders Stories
              </p>
            </div>

            {/* HEADER */}
            <h1
              className="
                text-4xl
                sm:text-5xl
                md:text-7xl
                font-black
                leading-[0.95]
                tracking-tight
              "
            >
              Real Founder Stories.
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-red-500
                  via-fuchsia-400
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
                md:mt-4
                text-sm
                md:text-lg
                text-[var(--text-secondary)]
                leading-relaxed
                max-w-2xl
                font-medium
              "
            >
              Deep startup case studies covering SaaS growth, revenue,
              acquisition, product strategy, failures, distribution,
              and how modern internet companies actually scaled.
            </p>

            {/* STATS */}
            <div className="flex flex-wrap gap-3 mt-7">

              <div
                className="
                  px-5 py-3
                  rounded-3xl
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  backdrop-blur-xl
                  shadow-lg
                "
              >
                <p className="text-2xl font-black">50+</p>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Founder Stories
                </p>
              </div>

              <div
                className="
                  px-5 py-3
                  rounded-3xl
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  backdrop-blur-xl
                  shadow-lg
                "
              >
                <p className="text-2xl font-black">$10M+</p>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Combined Revenue
                </p>
              </div>

              <div
                className="
                  px-5 py-3
                  rounded-3xl
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  backdrop-blur-xl
                  shadow-lg
                "
              >
                <p className="text-2xl font-black">Bootstrapped</p>

                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Real Internet Businesses
                </p>
              </div>

            </div>
          </div>

          {/* STORIES GRID */}
          <div className="grid lg:grid-cols-3 gap-7 mt-12 md:mt-14">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}