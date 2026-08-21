import {
  ArrowUpRight,
  ExternalLink,
  Handshake,
} from "lucide-react";

export default function BuildersStoriesPage() {
  const fakeMayoUrl =
    "https://fakemayo.com/?utm_source=startives&utm_medium=partnership&utm_campaign=builders_stories";

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
        {/* BACKGROUND */}

        <div
          className="
            absolute
            inset-0
            overflow-hidden
            pointer-events-none
          "
        >
          {/* MAIN RED → BLUE GLOW */}

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
          {/* HERO */}

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
                shadow-sm
                mb-4
              "
            >
              <span
                className="
                  relative
                  flex
                  items-center
                  justify-center
                  w-2
                  h-2
                "
              >
                <span
                  className="
                    absolute
                    w-2
                    h-2
                    rounded-full
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    animate-pulse
                  "
                />

                <span
                  className="
                    relative
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                  "
                />
              </span>

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

            {/* STATS */}

            <div
              className="
                flex
                flex-wrap
                gap-2
                mt-5
              "
            >
              {/* 30+ */}

              <div
                className="
                  px-3
                  py-2.5
                  rounded-xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  min-w-[99px]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-purple-500/30
                "
              >
                <p
                  className="
                    text-base
                    md:text-lg
                    font-black
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  30+
                </p>

                <p
                  className="
                    text-[9px]
                    text-[var(--text-secondary)]
                    mt-0.5
                    font-medium
                  "
                >
                  Founder Stories
                </p>
              </div>

              {/* $10M+ */}

              <div
                className="
                  px-3
                  py-2.5
                  rounded-xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  min-w-[103px]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-purple-500/30
                "
              >
                <p
                  className="
                    text-base
                    md:text-lg
                    font-black
                    bg-gradient-to-r
                    from-red-500
                    to-blue-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  $10M+
                </p>

                <p
                  className="
                    text-[9px]
                    text-[var(--text-secondary)]
                    mt-0.5
                    font-medium
                  "
                >
                  Revenue Tracked
                </p>
              </div>

              {/* BOOTSTRAPPED */}

              <div
                className="
                  px-3
                  py-2.5
                  rounded-xl
                  bg-[var(--component-background)]
                  border
                  border-[var(--border-primary)]
                  min-w-[122px]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:border-purple-500/30
                "
              >
                <p
                  className="
                    text-base
                    md:text-lg
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
                    text-[9px]
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
                FAKEMAYO PARTNERSHIP
            ====================================================== */}

            <a
              href={fakeMayoUrl}
              target="_self"
              rel="noopener noreferrer"
              aria-label="Open FakeMayo.com"
              className="
                group
                relative
                mt-7
                w-full
                max-w-2xl
                block
                overflow-hidden
                rounded-[22px]
                border
                border-[var(--border-primary)]
                bg-[var(--component-background)]
                shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                dark:shadow-[0_15px_50px_rgba(0,0,0,0.18)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-purple-500/40
                hover:shadow-[0_20px_60px_rgba(124,58,237,0.10)]
                active:scale-[0.99]
                cursor-pointer
                no-underline
              "
            >
              {/* TOP RED → BLUE LINE */}

              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-[2px]
                  bg-gradient-to-r
                  from-red-500
                  to-blue-500
                  opacity-80
                "
              />

              {/* SUBTLE GLOW */}

              <div
                className="
                  absolute
                  -top-20
                  -right-20
                  w-56
                  h-56
                  rounded-full
                  bg-blue-500/[0.06]
                  blur-3xl
                  pointer-events-none
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-20
                  w-48
                  h-48
                  rounded-full
                  bg-red-500/[0.05]
                  blur-3xl
                  pointer-events-none
                "
              />

              {/* CONTENT */}

              <div
                className="
                  relative
                  z-10
                  flex
                  items-center
                  justify-between
                  gap-4
                  px-4
                  py-4
                  md:px-5
                  md:py-5
                "
              >
                {/* LEFT */}

                <div
                  className="
                    flex
                    items-center
                    gap-3
                    md:gap-4
                    min-w-0
                  "
                >
                  {/* FAKEMAYO IMAGE */}

                  <div className="relative shrink-0">
                    <img
                      src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787287617/IMG_20260821_101542_vkuyku.jpg"
                      alt="FakeMayo"
                      className="
                        relative
                        w-11
                        h-11
                        md:w-14
                        md:h-14
                        rounded-2xl
                        object-cover
                        border
                        border-[var(--border-primary)]
                        shadow-sm
                      "
                    />

                    <span
                      className="
                        absolute
                        -right-1
                        -bottom-1
                        w-4
                        h-4
                        rounded-full
                        bg-[var(--component-background)]
                        border
                        border-[var(--border-primary)]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <span
                        className="
                          w-2
                          h-2
                          rounded-full
                          bg-gradient-to-r
                          from-red-500
                          to-blue-500
                        "
                      />
                    </span>
                  </div>

                  {/* TEXT */}

                  <div className="min-w-0">
                    <div
                      className="
                        flex
                        items-center
                        gap-1.5
                        mb-1
                      "
                    >
                      <Handshake
                        className="
                          w-3.5
                          h-3.5
                          text-purple-500
                          shrink-0
                        "
                        strokeWidth={2}
                      />

                      <span
                        className="
                          text-[9px]
                          md:text-[10px]
                          uppercase
                          tracking-[0.16em]
                          font-bold
                          text-[var(--text-muted)]
                        "
                      >
                        In partnership with
                      </span>
                    </div>

                    <h2
                      className="
                        text-sm
                        md:text-base
                        font-black
                        tracking-tight
                        text-[var(--text-primary)]
                        truncate
                      "
                    >
                      FakeMayo.com
                    </h2>

                    <p
                      className="
                        mt-0.5
                        text-[9px]
                        md:text-[11px]
                        text-[var(--text-secondary)]
                        font-medium
                        truncate
                        max-w-[240px]
                        md:max-w-[400px]
                      "
                    >
                      Discover what builders are creating next.
                    </p>
                  </div>
                </div>

                {/* RIGHT — STATIC ARROW */}

                <div
                  className="
                    shrink-0
                    flex
                    items-center
                    gap-2
                    text-purple-500
                  "
                >
                  <span
                    className="
                      hidden
                      sm:block
                      text-[9px]
                      md:text-[10px]
                      font-black
                      uppercase
                      tracking-[0.16em]
                    "
                  >
                    Explore
                  </span>

                  <span
                    className="
                      w-8
                      h-8
                      md:w-9
                      md:h-9
                      rounded-full
                      border
                      border-purple-500/20
                      bg-purple-500/[0.06]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <ArrowUpRight
                      className="w-4 h-4"
                      strokeWidth={2}
                    />
                  </span>
                </div>
              </div>

              {/* FOOTER */}

              <div
                className="
                  relative
                  z-10
                  px-4
                  md:px-5
                  pb-3
                  flex
                  items-center
                  gap-1.5
                  text-[8px]
                  text-[var(--text-muted)]
                  font-medium
                  opacity-70
                "
              >
                <ExternalLink
                  className="w-2.5 h-2.5"
                  strokeWidth={2}
                />

                <span>
                  Open FakeMayo.com inside Startives
                </span>
              </div>
            </a>
          </div>

          {/* =====================================================
              FAKE MAYO EMBED
          ====================================================== */}

          <div
            className="
              mt-8
              w-full
              overflow-hidden
              rounded-2xl
              border
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              shadow-sm
            "
          >
            <iframe
              src={fakeMayoUrl}
              title="FakeMayo.com"
              className="
                block
                w-full
                h-[calc(100vh-150px)]
                min-h-[600px]
                border-0
                bg-white
              "
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="clipboard-write"
            />
          </div>
        </div>
      </section>
    </div>
  );
}