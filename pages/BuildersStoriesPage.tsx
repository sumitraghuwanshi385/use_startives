import StoryCard from "../components/StoryCard";
import { stories } from "../data/stories";

export default function BuildersStoriesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-28 pb-20 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="uppercase tracking-[0.3em] text-green-400 text-xs font-bold mb-4">
              BUILDERS STORIES
            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Real Founder Stories.
              <br />
              Real Revenue.
            </h1>

            <p className="mt-6 text-slate-400 text-lg leading-relaxed">
              Deep startup case studies covering SaaS growth, revenue,
              acquisition, failures, distribution, and scaling journeys.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-16">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}