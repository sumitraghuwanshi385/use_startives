Bhai issue tera StoryDetailsPage component me h, data me nahi.

Abhi tera page:

fixed dark background use kr raha h

heading ka font-size bahut bada h

content render hi ni ho raha niche

sections map ni ho rahe properly

white/light mode support ni h

modern layout ni h


Tu pura old StoryDetailsPage replace kr de.

Ye premium modern layout use kar 👇

import { useParams } from "react-router-dom";
import { stories } from "../data/stories";

export default function StoryDetailsPage() {
  const { id } = useParams();

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-primary)] text-[var(--text-primary)]">
        Story not found
      </div>
    );
  }

  return (
    <div className="bg-[var(--background-primary)] text-[var(--text-primary)] transition-colors duration-300">

      {/* HERO */}
      <section className="relative h-[520px] md:h-[680px] overflow-hidden">

        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-primary)] via-black/40 to-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-8 h-full flex flex-col justify-end pb-12">

          {/* CATEGORY */}
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
              bg-white/10
              backdrop-blur-xl
              w-fit
              mb-5
            "
          >
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-red-500 to-blue-500" />

            <span
              className="
                text-xs
                uppercase
                tracking-[0.2em]
                font-semibold
                text-white
              "
            >
              {story.category}
            </span>
          </div>

          {/* TITLE */}
          <h1
            className="
              text-4xl
              sm:text-5xl
              md:text-7xl
              font-black
              leading-[1]
              tracking-[-0.04em]
              text-white
              max-w-5xl
            "
          >
            {story.title}
          </h1>

          {/* SUMMARY */}
          <p
            className="
              mt-5
              text-base
              md:text-xl
              text-white/80
              max-w-3xl
              leading-relaxed
            "
          >
            {story.summary}
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-3 mt-7">
            {story.stats.map((item: string, index: number) => (
              <div
                key={index}
                className="
                  px-4
                  py-2
                  rounded-full
                  bg-white/10
                  border
                  border-white/10
                  backdrop-blur-xl
                  text-sm
                  text-white
                "
              >
                {item}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-12">

        {/* FOUNDER */}
        <div
          className="
            grid
            lg:grid-cols-[1fr_auto]
            gap-6
            items-center
            border
            border-[var(--border-primary)]
            bg-[var(--component-background)]
            rounded-3xl
            p-6
            md:p-8
          "
        >
          <div>
            <p className="text-sm text-[var(--text-secondary)] mb-2">
              Founder
            </p>

            <h2 className="text-3xl font-black">
              {story.founder}
            </h2>

            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              {story.founderBio}
            </p>

            {/* SOCIALS */}
            <div className="flex flex-wrap gap-3 mt-5">

              <a
                href={story.founderTwitter}
                target="_blank"
                className="
                  px-4 py-2 rounded-full
                  border border-[var(--border-primary)]
                  hover:border-red-500/40
                  transition-all
                "
              >
                Twitter/X
              </a>

              <a
                href={story.founderLinkedin}
                target="_blank"
                className="
                  px-4 py-2 rounded-full
                  border border-[var(--border-primary)]
                  hover:border-blue-500/40
                  transition-all
                "
              >
                LinkedIn
              </a>

              <a
                href={story.founderWebsite}
                target="_blank"
                className="
                  px-4 py-2 rounded-full
                  border border-[var(--border-primary)]
                  hover:border-purple-500/40
                  transition-all
                "
              >
                Website
              </a>

            </div>
          </div>

          {/* WEBSITE BTN */}
          <a
            href={story.website}
            target="_blank"
            className="
              h-fit
              px-7
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-red-500
              to-blue-500
              text-white
              font-bold
              text-lg
              hover:scale-[1.03]
              transition-all
            "
          >
            Visit Website
          </a>
        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-[var(--border-primary)] to-transparent" />

        {/* STORY */}
        <div className="max-w-4xl">

          <div className="space-y-12">

            {story.sections?.map((section: any, index: number) => (
              <div key={index}>

                <div className="flex items-center gap-4 mb-5">

                  <div
                    className="
                      w-10
                      h-[2px]
                      bg-gradient-to-r
                      from-red-500
                      to-blue-500
                    "
                  />

                  <h2
                    className="
                      text-2xl
                      md:text-3xl
                      font-black
                    "
                  >
                    {section.title}
                  </h2>
                </div>

                <div
                  className="
                    text-[15px]
                    md:text-[17px]
                    leading-[2]
                    text-[var(--text-secondary)]
                    whitespace-pre-line
                  "
                >
                  {section.content}
                </div>

              </div>
            ))}

          </div>

        </div>

      </section>
    </div>
  );
}