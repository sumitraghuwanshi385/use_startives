import StoryCard from "../components/StoryCard";
import { stories } from "../data/stories";

export default function BuildersStoriesPage() {
  const fakeMayooUrl =
    "https://fakemayoo.com/?utm_source=startives&utm_medium=partnership&utm_campaign=builders_stories";

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
        {/* BACKGROUND DECORATION */}

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* MAIN GLOW */}

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

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            md:px-8
            relative
            z-10
          "
        >
          {/* HERO CONTENT */}

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
              {/* STORIES */}

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

              {/* REVENUE */}

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

              {/* MODEL */}

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
                  Bootstrapped
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

            {/* =====================================================
                FAKEMAYOO PARTNERSHIP
            ===================================================== */}

            <a
              href={fakeMayooUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit FakeMayoo"
              className="
                group
                relative
                mt-7
                w-full
                max-w-2xl
                flex
                items-center
                justify-between
                gap-4
                overflow-hidden
                rounded-2xl
                border
                border-[var(--border-primary)]
                bg-[var(--component-background)]
                px-5
                py-4
                md:px-6
                md:py-5
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-purple-500/40
                hover:shadow-[0_15px_50px_rgba(124,58,237,0.10)]
                active:scale-[0.99]
                cursor-pointer
                no-underline
              "
            >
              {/* CARD GLOW */}

              <div
                className="
                  absolute
                  -top-16
                  -right-16
                  w-40
                  h-40
                  rounded-full
                  bg-purple-500/10
                  blur-3xl
                  pointer-events-none
                  transition-transform
                  duration-500
                  group-hover:scale-125
                "
              />

              {/* LEFT */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  min-w-0
                  relative
                  z-10
                "
              >
                {/* LOGO */}

                <div
                  className="
                    w-10
                    h-10
                    md:w-11
                    md:h-11
                    rounded-xl
                    shrink-0
                    flex
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-red-500
                    to-blue-500
                    text-white
                    font-black
                    text-sm
                    shadow-lg
                    shadow-purple-500/10
                  "
                >
                  F
                </div>

                {/* TEXT */}

                <div className="min-w-0">
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      flex-wrap
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        md:text-[10px]
                        uppercase
                        tracking-[0.18em]
                        font-bold
                        text-[var(--text-muted)]
                      "
                    >
                      In partnership with
                    </p>

                    <span
                      className="
                        w-1
                        h-1
                        rounded-full
                        bg-purple-500
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        md:text-[10px]
                        uppercase
                        tracking-[0.18em]
                        font-bold
                        text-purple-500
                      "
                    >
                      Builders Network
                    </span>
                  </div>

                  <h2
                    className="
                      mt-0.5
                      text-sm
                      md:text-base
                      font-black
                      text-[var(--text-primary)]
                      tracking-tight
                    "
                  >
                    FakeMayoo
                  </h2>

                  <p
                    className="
                      mt-0.5
                      text-[10px]
                      md:text-xs
                      text-[var(--text-secondary)]
                      font-medium
                    "
                  >
                    Discover what builders are creating next.
                  </p>
                </div>
              </div>

              {/* RIGHT CTA */}

              <div
                className="
                  relative
                  z-10
                  shrink-0
                  flex
                  items-center
                  gap-2
                  text-[10px]
                  md:text-xs
                  font-black
                  uppercase
                  tracking-widest
                  text-purple-500
                  transition-all
                  duration-300
                  group-hover:gap-3
                "
              >
                <span className="hidden sm:inline">
                  Explore
                </span>

                <span
                  className="
                    w-8
                    h-8
                    rounded-full
                    border
                    border-purple-500/20
                    bg-purple-500/[0.06]
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-300
                    group-hover:bg-purple-500
                    group-hover:text-white
                  "
                >
                  →
                </span>
              </div>
            </a>
          </div>

          {/* STORIES */}

          <div
            className="
              grid
              lg:grid-cols-3
              gap-7
              mt-10
              md:mt-12
            "
          >
            {stories.map(story => (
              <StoryCard
                key={story.id}
                story={story}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}