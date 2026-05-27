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
              top-[-200px]
              left-1/2
              -translate-x-1/2
              w-[700px]
              h-[700px]
              rounded-full
              blur-3xl
              opacity-20
              bg-gradient-to-br
              from-green-500
              via-emerald-400
              to-cyan-500
            "
          />
        </div>

        <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
          
          {/* TEXT */}
          <div className="max-w-4xl">
            
            <div
              className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                border border-green-500/20
                bg-green-500/10
                backdrop-blur-md
                mb-5
              "
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />

              <p
                className="
                  uppercase
                  tracking-[0.28em]
                  text-green-400
                  text-[10px]
                  md:text-xs
                  font-bold
                "
              >
                Builders Stories
              </p>
            </div>

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
                  from-green-400
                  via-emerald-300
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                Real Revenue.
              </span>
            </h1>

            <p
              className="
                mt-4
                md:mt-5
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
                  rounded-2xl
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  backdrop-blur-md
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
                  rounded-2xl
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  backdrop-blur-md
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
                  rounded-2xl
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  backdrop-blur-md
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