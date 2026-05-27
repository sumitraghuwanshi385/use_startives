import { Link } from "react-router-dom";

interface Props {
  story: any;
}

export default function StoryCard({ story }: Props) {
  return (
    <Link
      to={`/builders/${story.id}`}
      className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0b0b0b] hover:border-green-500/40 transition-all"
    >
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs uppercase font-bold">
            {story.category}
          </span>

          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs">
            {story.revenue}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white leading-tight">
          {story.title}
        </h2>

        <p className="text-slate-400 mt-3 line-clamp-3">
          {story.summary}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {story.stats.map((s: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">{story.founder}</p>
            <p className="text-slate-500 text-sm">{story.company}</p>
          </div>

          <span className="text-green-400 text-sm font-bold">
            Read Story →
          </span>
        </div>
      </div>
    </Link>
  );
}