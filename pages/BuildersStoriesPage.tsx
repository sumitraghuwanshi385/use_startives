"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Handshake,
  Eye,
  EyeOff,
} from "lucide-react";

export default function BuildersStoriesPage() {
  const [showHero, setShowHero] = useState(true);

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
        <div
          className="
            absolute
            inset-0
            overflow-hidden
            pointer-events-none
          "
        >
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
          {showHero && (
            <div className="max-w-4xl">
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

              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                  mt-5
                "
              >
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
            </div>
          )}

          <a
            href={fakeMayoUrl}
            target="_self"
            rel="noopener noreferrer"
            aria-label="Open FakeMayo.com"
            className={`
              group
              relative
              w-full
              block
              overflow-hidden
              rounded-[22px]
              border
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:border-purple-500/40
              active:scale-[0.99]
              cursor-pointer
              no-underline
              ${showHero ? "mt-7" : "mt-0"}
            `}
          >
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
              <div
                className="
                  flex
                  items-center
                  gap-3
                  md:gap-4
                  min-w-0
                "
              >
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
                    Fakemayo
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

              <div
                className="
                  shrink-0
                  flex
                  items-center
                  gap-2
                  text-purple-500
                "
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowHero((prev) => !prev);
                  }}
                  aria-label={showHero ? "Hide hero section" : "Show hero section"}
                  className="
                    w-9
                    h-9
                    md:w-10
                    md:h-10
                    rounded-full
                    border
                    border-purple-500/20
                    bg-purple-500/[0.06]
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200
                    hover:bg-purple-500/10
                    active:scale-95
                  "
                >
                  {showHero ? (
                    <EyeOff className="w-[17px] h-[17px] md:w-[18px] md:h-[18px]" strokeWidth={2} />
                  ) : (
                    <Eye className="w-[17px] h-[17px] md:w-[18px] md:h-[18px]" strokeWidth={2} />
                  )}
                </button>

                <span
                  className="
                    w-9
                    h-9
                    md:w-10
                    md:h-10
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
                    className="w-[17px] h-[17px] md:w-[18px] md:h-[18px]"
                    strokeWidth={2}
                  />
                </span>
              </div>
            </div>
          </a>

          <div
            className="
              mt-4
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