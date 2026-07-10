import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Calendar, Search } from 'lucide-react';

// --- Static SEO Blog Data ---
export const blogPosts = [
  {
    id: "1",
    title: "5 creative ways VC head of platforms can empower startup founders during an economic decline",
    excerpt: "The VC platform role has grown in popularity over the past five years. But many VCs viewed it as a 'nice to have' when they needed a differentiation factor.",
    date: "MAR 28, 2026",
    category: "BLOG",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=600&q=80",
    isFeatured: true
  },
  {
    id: "2",
    title: "Why VC Firms need to hire a Head of Platform",
    excerpt: "A platform role in VC plays a pivotal role in developing and growing portfolio companies. It also enables the VC firm to stand out from the crowd.",
    date: "MAR 26, 2026",
    category: "BLOG",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
    isFeatured: true
  },
  {
    id: "3",
    title: "Demystifying Preferred Vendor Platforms in Private Equity: An Easy Guide",
    excerpt: "As an operations partner, it's crucial to establish a mutually beneficial relationship for any startup and any venture firm.",
    date: "OCT 13, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "4",
    title: "Navigating the Digital Landscape: How Startups Can Thrive",
    excerpt: "With determination, adaptability, and a focus on innovation, anything is possible for any startup in the current digital landscape.",
    date: "OCT 5, 2025",
    image: "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "5",
    title: "Mastering Performance: A Roadmap for Centralizing Portfolio Data",
    excerpt: "Centralizing portfolio data and performance is not just a trend—it's a transformative journey for modern ecosystem builders.",
    date: "SEP 28, 2025",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
  }
];

const BlogPage: React.FC = () => {
  const featuredPosts = blogPosts.filter(p => p.isFeatured);
  const regularPosts = blogPosts.filter(p => !p.isFeatured);

  return (
    <div className="w-full bg-[var(--background-secondary)] font-poppins pb-16">
      
      {/* 🌟 1. HERO HEADER SECTION (With Grid Lines Vibe) */}
      <div className="relative w-full py-16 px-6 border-b border-[var(--border-primary)] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background-secondary)]"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[11px] font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase">
            BLOG
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mt-3 mb-6 max-w-3xl mx-auto leading-tight">
            Our ideas and insights on <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">suppliers, vendors, networks</span>, platform, and much more.
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* ⚡ 2. FEATURED TWO-COLUMN CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 -mt-8 relative z-20 mb-20">
          {featuredPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group flex flex-col bg-[var(--component-background)] rounded-2xl border border-[var(--border-primary)] hover:border-blue-500/30 transition-all duration-300 overflow-hidden shadow-sm">
              <div className="relative h-64 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                  <h3 className="text-white font-bold text-lg leading-snug line-clamp-2">{post.title}</h3>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1 rounded-md">
                    {post.date}
                  </span>
                  <p className="text-sm text-[var(--text-muted)] font-medium mt-3 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase group-hover:gap-2 transition-all">
                  Read More <ChevronRight className="w-3.5 h-3.5 text-blue-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 🎯 3. LATEST BLOGS SECTION */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tight mb-4">Latest Blogs</h2>
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-[var(--text-muted)] absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search Blogs..." 
              className="w-full pl-10 pr-4 py-2 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-full text-xs font-medium focus:outline-none focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        {/* 🧱 4. GRID LIST SECTION (Red-to-Blue Top Bar Accent) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularPosts.map((post) => (
            <Link to={`/blog/${post.id}`} key={post.id} className="group bg-[var(--component-background)] border border-[var(--border-primary)] hover:border-red-500/20 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-xs">
              <div>
                <div className="relative h-44 overflow-hidden">
                  {/* Top Edge Gradient Accents */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-500 to-blue-500 z-10"></div>
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 bg-neutral-100 dark:bg-neutral-800/50 px-2 py-0.5 rounded">
                    {post.date}
                  </span>
                  <h3 className="text-base font-bold text-[var(--text-primary)] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-red-500 group-hover:to-blue-500 transition-all mt-3 mb-2 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-medium line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>
              
              <div className="p-5 pt-0 flex items-center gap-1 text-[11px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 uppercase group-hover:gap-1.5 transition-all">
                Read More <ChevronRight className="w-3 h-3 text-blue-500" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
