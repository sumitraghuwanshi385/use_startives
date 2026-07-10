import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search } from 'lucide-react';

// --- Startives Optimized Real-World Blog Data (Strictly 2026) ---
export const blogPosts = [
  {
    id: "1",
    title: "5 Tactical Frameworks to Align Equity and Vision with Your Tech Co-Founder",
    excerpt: "Diving deep into split structures, vesting schedules, and engineering culture milestones that modern builders need to scale their products effortlessly.",
    date: "JUL 10, 2026",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "2",
    title: "How to Optimize Your Startup Profile on Startives to Attract Premium VCs",
    excerpt: "A complete walkthrough on positioning your pitch deck metrics, product prototypes, and builder stories to gain unfair visibility in front of active investors.",
    date: "JUL 06, 2026",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=600&q=80"
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
  },
  {
    id: "6",
    title: "The Art of Non-Dilutive Funding: Grants and Venture Debt for SaaS in 2026",
    excerpt: "Keep your equity intact. Explore the emerging landscape of alternative financing instruments tailored specifically for high-growth software products.",
    date: "MAY 14, 2026",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "7",
    title: "Cracking the Micro-SaaS Blueprint: Solopreneur to $10K MRR in 6 Months",
    excerpt: "An inside look at lean framework architectures, automated cold outreach, and webhook-driven distribution loops that change the bootstrapping game.",
    date: "APR 22, 2026",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "8",
    title: "Building Scalable AI Agents: Architecture Patterns for Modern Application Infrastructure",
    excerpt: "Stop wasting API credits. Learn how context window caching, vector database optimization, and semantic routing layer strategies save costs.",
    date: "MAR 09, 2026",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80"
  }
];

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[var(--background-secondary)] font-poppins pb-24">
      
      {/* 🌟 1. CLEAN HERO HEADER SECTION (Minimalist, No Effects, Super Tight Padding) */}
      <div className="w-full pt-4 pb-6 px-4 border-b border-[var(--border-primary)] text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase">
            Blogs
          </span>
          <h1 className="text-xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight mt-1 max-w-3xl mx-auto leading-tight">
            Our ideas and insights on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">builders, co-founders, networks</span>, products, and much more.
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* 🎯 2. SEARCH ARCHIVE */}
        <div className="max-w-md mx-auto relative mb-12">
          <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search resource archive..." 
            className="w-full pl-10 pr-4 py-2.5 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-full text-xs font-medium focus:outline-none focus:border-blue-500 transition-all shadow-xs text-[var(--text-primary)]"
          />
        </div>

        {/* 🧱 3. UNIFIED GRID LIST SECTION (More Spacing Between Cards) */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 sm:gap-10">
            {filteredPosts.map((post) => (
              <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col justify-between transition-all duration-300">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-4 bg-neutral-100 dark:bg-neutral-900 border border-[var(--border-primary)] shadow-xs">
                    {/* Gradient Top Edge Accent */}
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
        ) : (
          <div className="text-center text-sm text-[var(--text-muted)] py-12">
            No posts match your search criteria.
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogPage;
