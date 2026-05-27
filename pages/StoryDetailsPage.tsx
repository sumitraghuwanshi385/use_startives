import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
      <section className="relative min-h-[720px] md:min-h-[860px] overflow-hidden">

        {/* BG IMAGE */}
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/75" />

        {/* GRADIENT */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/10
            via-black/60
            to-[var(--background-primary)]
          "
        />

        {/* GLOW */}
        <div
          className="
            absolute
            top-[-140px]
            left-1/2
            -translate-x-1/2
            w-[700px]
            h-[700px]
            rounded-full
            blur-3xl
            opacity-15
            bg-gradient-to-br
            from-red-500
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
            pt-12
            md:pt-16
            pb-4
          "
        >

          {/* BACK BUTTON */}
          <Link
            to="/builders"
            className="
              inline-flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              border
              border-white/15
              bg-white/10
              backdrop-blur-2xl
              text-white
              text-sm
              hover:bg-white/15
              transition-all
              mb-5
            "
          >
            <ArrowLeft size={16} />
            Back to Builder Stories
          </Link>

          {/* TITLE */}
          <h1
            className="
              text-[34px]
              sm:text-[56px]
              md:text-[76px]
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
              md:text-[21px]
              text-white/85
              max-w-3xl
              leading-[1.9]
            "
          >
            {story.summary}
          </p>

          {/* PILLS */}
          <div className="flex flex-wrap gap-2 mt-7">

            {/* CATEGORY */}
            <div
              className="
                px-3
                py-1.5
                rounded-full
                bg-white/15
                border
                border-white/15
                backdrop-blur-2xl
                text-[11px]
                md:text-[12px]
                font-bold
              "
            >
              <span
                className="
                  text-transparent
                  bg-clip-text
                  bg-gradient-to-r
                  from-red-300
                  via-red-400
                  to-blue-400
                "
              >
                {story.category}
              </span>
            </div>

            {/* STATS */}
            {story.stats.map((item: string, index: number) => (
              <div
                key={index}
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-white/15
                  border
                  border-white/15
                  backdrop-blur-2xl
                  text-[11px]
                  md:text-[12px]
                  font-bold
                "
              >
                <span
                  className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-red-300
                    via-red-400
                    to-blue-400
                  "
                >
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* MAIN */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pt-1 pb-10">

        {/* FOUNDER */}
        <div
          className="
            border
            border-[var(--border-primary)]
            bg-[var(--component-background)]
            rounded-[32px]
            p-5
            md:p-10
            max-w-5xl
            mx-auto
          "
        >

          <div
            className="
              flex
              flex-col
              md:flex-row
              md:items-start
              gap-5
            "
          >

            {/* DP */}
            <div
              className="
                w-16
                h-16
                md:w-24
                md:h-24
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
            <div className="flex-1">

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
                  rel="noreferrer"
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-[var(--border-primary)]
                    text-white
                    hover:border-red-500/40
                    transition-all
                  "
                >
                  Twitter/X
                </a>

                <a
                  href={story.founderLinkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-[var(--border-primary)]
                    text-white
                    hover:border-blue-500/40
                    transition-all
                  "
                >
                  LinkedIn
                </a>

                <a
                  href={story.founderWebsite}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    px-4
                    py-2
                    rounded-full
                    border
                    border-[var(--border-primary)]
                    text-white
                    hover:border-purple-500/40
                    transition-all
                  "
                >
                  Website
                </a>

              </div>

              {/* BUTTON */}
              <div className="mt-7">

                <a
                  href={story.website}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-7
                    py-3
                    rounded-full
                    bg-gradient-to-r
                    from-red-500
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

        </div>

        {/* QUICK STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-14">

          <div
            className="
              rounded-3xl
              border
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              p-5
            "
          >

            <p className="text-sm text-[var(--text-secondary)]">
              Revenue
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-red-500
                to-blue-500
              "
            >
              {story.revenue}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              PhotoAI monetized aggressively through recurring subscriptions,
              creator-focused AI tooling, and premium internet identity products.
            </p>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              p-5
            "
          >

            <p className="text-sm text-[var(--text-secondary)]">
              Growth
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-red-500
                to-blue-500
              "
            >
              {story.growth}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              The platform spread globally through creator communities,
              startup founders, influencers, and social media virality.
            </p>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              p-5
            "
          >

            <p className="text-sm text-[var(--text-secondary)]">
              Timeline
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-red-500
                to-blue-500
              "
            >
              {story.timeline}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              Danny launched quickly during the AI boom and captured
              global internet attention before competitors scaled.
            </p>

          </div>

          <div
            className="
              rounded-3xl
              border
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              p-5
            "
          >

            <p className="text-sm text-[var(--text-secondary)]">
              Founded
            </p>

            <h3
              className="
                mt-2
                text-2xl
                font-black
                text-transparent
                bg-clip-text
                bg-gradient-to-r
                from-red-500
                to-blue-500
              "
            >
              {story.foundedYear}
            </h3>

            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">
              The startup emerged during peak AI adoption
              when internet identity became increasingly important.
            </p>

          </div>

        </div>

        {/* STORY */}
        <div className="max-w-4xl">

          <div className="space-y-16">

            {story.sections?.map((section: any, index: number) => (

              <div key={index}>

                {/* HEADER */}
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