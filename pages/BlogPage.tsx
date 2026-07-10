import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';

// --- Startives Optimized SEO Blog Data ---
export const blogPosts = [
  {
    id: "1",
    title: "5 Tactical Frameworks to Align Equity and Vision with Your Tech Co-Founder",
    excerpt: "Diving deep into split structures, vesting schedules, and engineering culture milestones that modern builders need to scale their products effortlessly.",
    date: "JUL 10, 2026",
    category: "FOUNDER GUIDES",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    isFeatured: true
  },
  {
    id: "2",
    title: "How to Optimize Your Startup Profile on Startives to Attract Premium VCs",
    excerpt: "A complete walkthrough on positioning your pitch deck metrics, product prototypes, and builder stories to gain unfair visibility in front of active investors.",
    date: "JUL 06, 2026",
    category: "GROWTH",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    isFeatured: true
  },
  {
    id: "3",
    title: "Demystifying Preferred Co-Founder Matching Algorithms in Modern Ecosystems",
    excerpt: "How automated platform networking helps builders cut down the search time for looking into skill gaps and core team alignment.",
    date: "JUN 28, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "4",
    title: "Navigating Product-Market Fit: Tactical Blueprints for Early Stage Devs",
    excerpt: "With raw validation loops, community building, and focus on minimum viable experiences, build things that people actually track and use.",
    date: "JUN 15, 2026",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "5",
    title: "Ecosystem Synergies: Why Open Builders are Outpacing Stealth Mode Founders",
    excerpt: "The power of building in public, validating metrics openly, and sharing your journey to assemble high-caliber teams organically.",
    date: "MAY 30, 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
  }
];

const BlogPage: React.FC = () => {
  const featuredPosts = blogPosts.filter(p => p.isFeatured);
  const regularPosts = blogPosts.filter(p => !p.isFeatured);

  return (
    <div className="w-full bg-[var(--background-secondary)] font-poppins pb-24">
      
      {/* 🌟 1. HERO HEADER SECTION (Tighter Padding for Closer Alignment) */}
      <div className="relative w-full pt-12 pb-20 px-4 border-b border-[var(--border-primary)] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background-secondary)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[10px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase">
            STARTIVES KNOWLEDGE HUB
          </span>
          <h1 className="text-2xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-2.5 max-w-3xl mx-auto leading-tight sm:leading-none">
            Our ideas and insights on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">builders, co-founders, networks</span>, products, and much more.
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ⚡ 2. FEATURED TWO-COLUMN CARDS (Pulled Up significantly closer to title) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 -mt-12 sm:-mt-16 relative z-20 mb-16">
          {featuredPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-[var(--component-background)] rounded-2xl border border-[var(--border-primary)] hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-md">
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-5 sm:p-6">
                  <h3 className="text-white font-bold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-neutral-200 transition-colors">{post.title}</h3>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 bg-neutral-100 dark:bg-neutral-800/60 px-2 py-0.5 rounded">
                    {post.date}
                  </span>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] font-medium mt-3.5 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="mt-5 flex items-center gap-1 text-[10px] sm:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase group-hover:gap-1.5 transition-all">
                  Read Insights <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 🎯 3. LATEST BLOGS SECTION HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-primary)] tracking-tight mb-4">Ecosystem Playbooks</h2>
          <div className="max-w-md mx-auto relative px-4 sm:px-0">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-8 sm:left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search resource archive..." 
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-full text-xs font-medium focus:outline-none focus:border-blue-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* 🧱 4. GRID LIST SECTION */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col justify-between transition-all duration-300">
              <div>
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-900 border border-[var(--border-primary)] shadow-xs">
                  {/* Top Edge Gradient Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase tracking-wider block mb-1">
                    {post.date}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-normal line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 flex items-center gap-1 text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase group-hover:gap-1.5 transition-all">
                Read Full Article <ChevronRight className="w-3 h-3 text-blue-500 stroke-[3]" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
