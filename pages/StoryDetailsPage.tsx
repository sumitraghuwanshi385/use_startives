import { useParams } from "react-router-dom";
import { stories } from "../data/stories";

export default function StoryDetailsPage() {
  const { id } = useParams();

  const story = stories.find((s) => s.id === id);

  if (!story) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Story not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={story.image}
          className="w-full h-full object-cover opacity-40"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute bottom-10 left-0 right-0">
          <div className="max-w-5xl mx-auto px-6">
            <span className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs uppercase font-bold">
              {story.category}
            </span>

            <h1 className="text-5xl md:text-7xl font-black mt-6 leading-tight">
              {story.title}
            </h1>

            <div className="flex flex-wrap gap-3 mt-6">
              {story.stats.map((s: string, i: number) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-300"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-12">
          <div>
            <p className="text-white text-2xl font-bold">
              {story.founder}
            </p>
            <p className="text-slate-400 mt-1">
              Founder of {story.company}
            </p>
          </div>

          <a
            href={story.website}
            target="_blank"
            className="px-5 py-3 rounded-full bg-green-500 text-black font-bold"
          >
            Visit Website
          </a>
        </div>

        <article className="prose prose-invert prose-lg max-w-none">
          <div className="whitespace-pre-line text-slate-300 leading-loose text-lg">
            {story.story}
          </div>
        </article>
      </div>
    </div>
  );
}