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
      <section className="relative min-h-[760px] md:min-h-[900px] overflow-hidden">

        {/* BG IMAGE */}
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/70" />

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
            opacity-20
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
            md:pt-14
            pb-16
          "
        >

          {/* BACK BUTTON */}
          <Link
            to="/builderstories"
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
              border-white/20
              bg-white/15
              backdrop-blur-2xl
              shadow-[0_10px_40px_rgba(0,0,0,0.25)]
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
              text-[34px]
              sm:text-[54px]
              md:text-[72px]
              font-black
              leading-[0.92]
              tracking-[-0.06em]
              text-transparent
              bg-clip-text
              bg-gradient-to-r
              from-red-400
              via-white
              to-blue-400
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

          {/* MINI STATS */}
          <div className="flex flex-wrap gap-2 mt-8">

            {story.stats.map((item: string, index: number) => (

              <div
                key={index}
                className="
                  px-3
                  py-1.5
                  rounded-full
                  bg-white/15
                  border
                  border-white/20
                  backdrop-blur-2xl
                  text-[11px]
                  md:text-[12px]
                  font-bold
                  shadow-[0_8px_25px_rgba(0,0,0,0.25)]
                "
              >
                <span
                  className="
                    text-transparent
                    bg-clip-text
                    bg-gradient-to-r
                    from-red-500
                    via-pink-400
                    to-blue-500
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
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-10">

        {/* FOUNDER */}
        <div
          className="
            border
            border-[var(--border-primary)]
            bg-[var(--component-background)]
            rounded-[28px]
            p-5
            md:p-6
            max-w-4xl
            mt-2
          "
        >

          <div className="flex gap-4">

            {/* DP */}
            <div
              className="
                w-16
                h-16
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
                  md:text-4xl
                  font-black
                  tracking-[-0.05em]
                  mt-1
                "
              >
                {story.founder}
              </h2>

              <p
                className="
                  mt-3
                  text-[15px]
                  md:text-[16px]
                  leading-8
                  text-[var(--text-secondary)]
                  max-w-2xl
                "
              >
                {story.founderBio}
              </p>

              {/* SOCIALS */}
              <div className="flex flex-wrap gap-3 mt-5">

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
              <div className="mt-6">

                <a
                  href={story.website}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    inline-flex
                    items-center
                    justify-center
                    px-6
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 mb-12">

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