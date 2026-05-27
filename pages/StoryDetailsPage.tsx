import { useParams } from "react-router-dom";
import { stories } from "../data/stories";

export default function StoryDetailsPage() {
  const { id } = useParams();

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[var(--background-primary)]
          text-[var(--text-primary)]
        "
      >
        Story not found
      </div>
    );
  }

  return (
    <div
      className="
        bg-[var(--background-primary)]
        text-[var(--text-primary)]
        transition-colors
        duration-300
      "
    >

      {/* HERO */}
      <section
        className="
          relative
          h-auto
          min-h-[760px]
          md:min-h-[880px]
          overflow-hidden
        "
      >

        {/* BG IMAGE */}
        <img
          src={story.image}
          alt={story.title}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-black/65" />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/40
            via-black/55
            to-[var(--background-primary)]
          "
        />

        {/* RED BLUE GLOW */}
        <div
          className="
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            rounded-full
            blur-3xl
            opacity-20
            bg-gradient-to-br
            from-red-500
            via-purple-500
            to-blue-500
          "
        />

        {/* CONTENT */}
        <div
          className="
            relative
            z-10
            max-w-6xl
            mx-auto
            px-5
            md:px-8
            pt-28
            md:pt-36
            pb-20
          "
        >

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
              mb-6
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

            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.22em]
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
              text-[42px]
              sm:text-[54px]
              md:text-[78px]
              font-black
              leading-[0.92]
              tracking-[-0.06em]
              text-white
              max-w-5xl
            "
          >
            {story.title}
          </h1>

          {/* SUMMARY */}
          <p
            className="
              mt-6
              text-[17px]
              md:text-[22px]
              text-white/80
              max-w-3xl
              leading-[1.8]
            "
          >
            {story.summary}
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-3 mt-8">

            {story.stats.map((item: string, index: number) => (
              <div
                key={index}
                className="
                  px-5
                  py-2.5
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
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-14">

        {/* FOUNDER CARD */}
        <div
          className="
            border
            border-[var(--border-primary)]
            bg-[var(--component-background)]
            rounded-[32px]
            p-5
            md:p-7
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-start
              md:justify-between
              gap-8
            "
          >

            {/* LEFT */}
            <div className="flex gap-5">

              {/* DP */}
              <div
                className="
                  w-20
                  h-20
                  rounded-full
                  overflow-hidden
                  border
                  border-[var(--border-primary)]
                  shrink-0
                "
              >
                <img
                  src={story.image}
                  alt={story.founder}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* INFO */}
              <div>

                <p className="text-sm text-[var(--text-secondary)]">
                  Founder
                </p>

                <h2
                  className="
                    text-3xl
                    md:text-5xl
                    font-black
                    tracking-[-0.05em]
                    mt-1
                  "
                >
                  {story.founder}
                </h2>

                <p
                  className="
                    mt-4
                    text-[15px]
                    md:text-[17px]
                    leading-8
                    text-[var(--text-secondary)]
                    max-w-3xl
                  "
                >
                  {story.founderBio}
                </p>

                {/* SOCIALS */}
                <div className="flex flex-wrap gap-3 mt-6">

                  <a
                    href={story.founderTwitter}
                    target="_blank"
                    className="
                      px-5
                      py-2.5
                      rounded-full
                      border
                      border-[var(--border-primary)]
                      hover:border-red-500/40
                      hover:bg-red-500/5
                      transition-all
                    "
                  >
                    Twitter/X
                  </a>

                  <a
                    href={story.founderLinkedin}
                    target="_blank"
                    className="
                      px-5
                      py-2.5
                      rounded-full
                      border
                      border-[var(--border-primary)]
                      hover:border-blue-500/40
                      hover:bg-blue-500/5
                      transition-all
                    "
                  >
                    LinkedIn
                  </a>

                  <a
                    href={story.founderWebsite}
                    target="_blank"
                    className="
                      px-5
                      py-2.5
                      rounded-full
                      border
                      border-[var(--border-primary)]
                      hover:border-purple-500/40
                      hover:bg-purple-500/5
                      transition-all
                    "
                  >
                    Website
                  </a>

                </div>

              </div>

            </div>

            {/* BUTTON */}
            <div>

              <a
                href={story.website}
                target="_blank"
                className="
                  inline-flex
                  items-center
                  justify-center
                  px-7
                  py-3.5
                  rounded-full
                  bg-gradient-to-r
                  from-red-500
                  via-pink-500
                  to-blue-500
                  text-white
                  font-semibold
                  text-sm
                  hover:scale-[1.03]
                  transition-all
                  shadow-lg
                "
              >
                Visit Website
              </a>

            </div>

          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-14 flex items-center gap-4">

          <div
            className="
              w-16
              h-[3px]
              rounded-full
              bg-gradient-to-r
              from-red-500
              to-blue-500
            "
          />

          <div
            className="
              flex-1
              h-px
              bg-[var(--border-primary)]
            "
          />

        </div>

        {/* STORY */}
        <div className="max-w-4xl">

          <div className="space-y-16">

            {story.sections?.map((section: any, index: number) => (

              <div key={index}>

                {/* SECTION HEADER */}
                <div className="flex items-center gap-4 mb-6">

                  <div
                    className="
                      w-12
                      h-[3px]
                      rounded-full
                      bg-gradient-to-r
                      from-red-500
                      to-blue-500
                    "
                  />

                  <h2
                    className="
                      text-2xl
                      md:text-4xl
                      font-black
                      tracking-[-0.04em]
                    "
                  >
                    {section.title}
                  </h2>

                </div>

                {/* CONTENT */}
                <div
                  className="
                    text-[16px]
                    md:text-[18px]
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