import { Link } from "react-router-dom";
import { Globe } from "lucide-react";

interface Props {
  story: any;
}

export default function StoryCard({ story }: Props) {
  return (
    <Link
      to={`/builders/${story.id}`}
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[var(--border-primary)]
        bg-[var(--component-background)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-blue-500/40
      "
    >
      {/* TOP GRADIENT LINE */}
      <div
        className="
          absolute
          top-0
          left-0
          w-full
          h-[2px]
          bg-gradient-to-r
          from-red-500
          to-blue-500
          opacity-70
        "
      />

      {/* IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden">

        {/* IMAGE OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/50
            via-black/10
            to-transparent
            z-10
          "
        />

        <img
          src={story.image}
          alt={story.title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* READ TIME */}
        <div
          className="
            absolute
            top-4
            left-4
            z-20
            px-3
            py-1.5
            rounded-full
            bg-black/35
            backdrop-blur-xl
            border
            border-white/10
            text-white
            text-[10px]
            font-semibold
            tracking-wide
          "
        >
          {story.readingTime}
        </div>

        {/* WEBSITE ICON */}
        <a
          href={story.website}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="
            absolute
            top-4
            right-4
            z-20
            w-10
            h-10
            rounded-full
            bg-black/35
            backdrop-blur-xl
            border
            border-white/10
            flex
            items-center
            justify-center
            text-white
            hover:scale-110
            hover:border-blue-500/40
            transition-all
          "
        >
          <Globe size={18} />
        </a>

      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h2
          className="
            text-xl
            md:text-2xl
            font-black
            leading-tight
            tracking-[-0.03em]
            text-[var(--text-primary)]
            group-hover:bg-gradient-to-r
            group-hover:from-red-500
            group-hover:to-blue-500
            group-hover:bg-clip-text
            group-hover:text-transparent
            transition-all
          "
        >
          {story.title}
        </h2>

        {/* SUMMARY */}
        <p
          className="
            mt-3
            text-sm
            leading-relaxed
            text-[var(--text-secondary)]
            line-clamp-3
          "
        >
          {story.summary}
        </p>

        {/* STATS */}
        <div className="mt-5 flex flex-wrap gap-2">
          {story.stats.map((s: string, i: number) => (
            <span
              key={i}
              className="
                px-2.5
                py-1
                rounded-full
                text-[10px]
                font-medium
                border
                border-[var(--border-primary)]
                bg-[var(--background-secondary)]
                text-[var(--text-secondary)]
              "
            >
              {s}
            </span>
          ))}
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-6
            pt-4
            border-t
            border-[var(--border-primary)]
            flex
            items-center
            justify-between
            gap-4
          "
        >

          {/* FOUNDER */}
          <div className="flex items-center gap-3 min-w-0">

            {/* IMAGE */}
            <div
              className="
                w-11
                h-11
                rounded-full
                overflow-hidden
                border
                border-[var(--border-primary)]
                shrink-0
              "
            >
              <img
                src={story.founderImage || story.image}
                alt={story.founder}
                className="w-full h-full object-cover"
              />
            </div>

            {/* TEXT */}
            <div className="min-w-0">

              <p
                className="
                  text-sm
                  font-bold
                  text-[var(--text-primary)]
                  truncate
                "
              >
                {story.founder}
              </p>

              <p
                className="
                  text-xs
                  text-[var(--text-secondary)]
                  mt-1
                  truncate
                "
              >
                {story.company}
              </p>

            </div>

          </div>

          {/* BUTTON */}
          <div
            className="
              px-4
              py-2
              rounded-full
              text-xs
              font-bold
              bg-gradient-to-r
              from-red-500
              to-blue-500
              text-white
              transition-all
              duration-300
              group-hover:scale-105
              shrink-0
            "
          >
            Read Story →
          </div>

        </div>
      </div>
    </Link>
  );
}