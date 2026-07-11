import React from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ChevronLeft, Share2, User, Clock, ArrowRight } from "lucide-react";

// Ye tumhara mini database system hoga, baad me ise external file ya API se replace kar lena
const blogData: Record<string, any> = {
  "1": {
    title: "5 Tactical Frameworks to Align Equity and Vision with Your Tech Co-Founder",
    category: "Startup · Co-founder",
    date: "JUL 10, 2026",
    readTime: "8 min read",
    author: "Startives Editorial Team",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    content: (
      <>
        <p className="lead">
          One of the biggest reasons startups fail isn't technology. It isn't funding. It isn't competition. <strong>It's founder misalignment.</strong> Every year, thousands of promising startups collapse because co-founders disagree on ownership, responsibilities, product direction, and long-term vision.
        </p>

        <p>
          Building a startup is a marathon, not a sprint. When you pair up with a co-founder, you are signing up for a professional marriage. Without a concrete framework to manage your partnership, even the best ideas die in committee.
        </p>

        <h2>1. Use a Dynamic Equity Split Framework</h2>
        <p>
          Avoid splitting equity equally (the dreaded 50/50 split) just because you're friends. Equity is an investment in the future, not a reward for the past. Instead, treat it like a dynamic cap table that reflects:
        </p>
        <ul>
          <li><strong>Time Commitment:</strong> Who is working full-time from Day 1?</li>
          <li><strong>Technical Contribution:</strong> Who is shipping the actual product architecture?</li>
          <li><strong>Network Value:</strong> Who brings the initial investors and early adopters?</li>
          <li><strong>Opportunity Cost:</strong> What salary sacrifices is each founder making?</li>
        </ul>
        <p>Pro-tip: Implement a "vesting schedule" where equity is earned over 4 years with a 1-year cliff. This ensures that if a founder leaves early, the company stays protected.</p>

        <h2>2. Define Responsibilities (The RACI Model)</h2>
        <p>
          Ambiguity creates conflict. Clarity creates speed. Use a simple RACI model (Responsible, Accountable, Consulted, Informed) to decide who owns what.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-[var(--background-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                <h4 className="font-bold mb-2">CEO</h4>
                <p className="text-sm text-[var(--text-muted)]">Vision, fundraising, hiring, and growth strategies.</p>
            </div>
            <div className="bg-[var(--background-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                <h4 className="font-bold mb-2">CTO</h4>
                <p className="text-sm text-[var(--text-muted)]">Product roadmap, tech stack, and dev-ops.</p>
            </div>
            <div className="bg-[var(--background-primary)] p-4 rounded-xl border border-[var(--border-primary)]">
                <h4 className="font-bold mb-2">COO</h4>
                <p className="text-sm text-[var(--text-muted)]">Operations, legal, and execution tracking.</p>
            </div>
        </div>

        <h2>3. Create a Founder Operating Agreement</h2>
        <p>
          Investors love founder agreements. It reduces risk. Your document should explicitly cover:
        </p>
        <ul className="list-decimal">
          <li><strong>Decision Making:</strong> How do we break a tie?</li>
          <li><strong>Exit Clauses:</strong> What happens if one of us wants to sell?</li>
          <li><strong>Conflict Resolution:</strong> At what point do we bring in an advisor?</li>
        </ul>

        <h2>4. Align on Long-Term Vision</h2>
        <p>
          This is the most "uncomfortable" but critical step. You must ask the hard questions:
        </p>
        <blockquote>
          "Are we building a lifestyle business, a VC-backed unicorn, or a bootstrapped cash-flow machine?"
        </blockquote>
        <p>If one founder wants a quick exit and the other wants to build a legacy company, you are doomed before you start.</p>

        <h2>5. Build in Public Together</h2>
        <p>
          Transparency isn't just for marketing; it's for internal health. Teams that share their progress in public attract better hires, advisors, and investors. It creates a "public accountability" loop that keeps founders honest with each other.
        </p>
      </>
    )
  }
};

const BlogDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const blog = id ? blogData[id] : null;

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background-secondary)] text-[var(--text-primary)]">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p>Blog post not found. Check the ID.</p>
            <Link to="/blogs" className="mt-6 inline-block text-blue-500 hover:underline">Back to Blogs</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background-secondary)] min-h-screen transition-colors duration-300">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        
        {/* Navigation */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-blue-500 transition-colors mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Blogs
        </Link>

        {/* Header */}
        <header>
          <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">
            <span>{blog.category}</span>
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            <span>{blog.date}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-[var(--text-primary)] leading-[1.1] mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[var(--text-muted)] mb-8 pb-8 border-b border-[var(--border-primary)]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-500 to-blue-500"></div>
              {blog.author}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {blog.readTime}
            </div>
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors ml-auto">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Hero Image */}
        <img
          src={blog.image}
          className="w-full aspect-video object-cover rounded-3xl mb-12 shadow-lg"
          alt="Blog Header"
        />

        {/* Content Body - Using Tailwind Prose for beautiful typography */}
        <div className="prose prose-lg dark:prose-invert max-w-none 
          prose-headings:font-black prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
          prose-p:text-[var(--text-secondary)] prose-p:leading-8
          prose-a:text-blue-500 prose-ul:list-disc prose-li:my-2
          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-xl">
          {blog.content}
        </div>

        {/* CTA Section */}
        <section className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-[var(--background-primary)] to-[var(--background-secondary)] border border-[var(--border-primary)] shadow-xl">
          <h3 className="text-2xl font-black text-[var(--text-primary)]">
            Ready to find your match?
          </h3>
          <p className="mt-3 text-[var(--text-secondary)] max-w-md">
            Join the Startives community to discover verified co-founders, showcase your project, and build the future together.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 mt-6 px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-blue-500 text-white font-bold hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          >
            Join Startives
            <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </article>
    </div>
  );
};

export default BlogDetailPage;
