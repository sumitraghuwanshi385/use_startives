import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import {
  Instagram,
  Twitter,
  Bot,
  Sparkles,
  Search,
  Brain,
  Code2,
  MessageSquare,
  Zap,
} from 'lucide-react';

const Footer: React.FC = () => {
  const helpCenterLinks: { name: string; path: string }[] = [
    { name: 'About Us', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Contact Us', path: '/contact-us' },
    { name: 'For Sponsorship', path: '/sponsorship' },
  ];

  const exploreLinks: { name: string; path: string }[] = [
    { name: 'Projects', path: '/projects' },
    { name: 'Marketplace', path: '/blueprint' },
    { name: 'Starverse', path: '/globe' },
    { name: 'Builder Stories', path: '/builders' },
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/usestartives',
      icon: <Instagram className="w-6 h-6" />,
    },
    {
      name: 'X (Twitter)',
      href: 'https://x.com/usestartives',
      icon: <Twitter className="w-6 h-6" />,
    },
  ];

  const prompt = encodeURIComponent(
    'What is Startives? Explain the platform in detail — how founders find co-founders, builders, projects, marketplace, Starverse, builder stories, and the overall founder community. Keep it clear and helpful.'
  );

  const aiLinks = [
    {
      name: 'ChatGPT',
      href: `https://chatgpt.com/?q=${prompt}`,
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      name: 'Gemini',
      href: `https://gemini.google.com/app?q=${prompt}`,
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      name: 'Perplexity',
      href: `https://www.perplexity.ai/search?q=${prompt}`,
      icon: <Search className="w-5 h-5" />,
    },
    {
      name: 'Claude',
      href: `https://claude.ai/new?q=${prompt}`,
      icon: <Brain className="w-5 h-5" />,
    },
    {
      name: 'DeepSeek',
      href: `https://chat.deepseek.com/`,
      icon: <Code2 className="w-5 h-5" />,
    },
    {
      name: 'Copilot',
      href: `https://copilot.microsoft.com/?q=${prompt}`,
      icon: <Bot className="w-5 h-5" />,
    },
    {
      name: 'Grok',
      href: `https://grok.com/?q=${prompt}`,
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  return (
    <footer
      className="
        bg-white
        dark:bg-black
        text-neutral-500
        dark:text-neutral-400
        border-t
        border-neutral-200
        dark:border-white/10
        relative
        z-10
      "
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6 py-12 md:py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              to="/"
              className="
                flex
                items-center
                text-neutral-900
                dark:text-white
                mb-3
              "
              aria-label={`${APP_NAME} home`}
            >
              <img
                src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png"
                alt="Startives Logo"
                style={{ height: '32px' }}
                className="mr-3"
              />
              <span className="font-startives-brand text-2xl tracking-tighter gradient-text bg-gradient-to-r from-red-500 to-blue-500">
                {APP_NAME}
              </span>
            </Link>

            <p className="text-sm max-w-sm text-neutral-500 dark:text-neutral-400">
              Build startups faster with co-founders, builders, projects, startup stories, and a growing founder community.
            </p>
          </div>

          {/* EXPLORE */}
          <nav aria-label="Explore" className="lg:order-2">
            <h5
              className="
                font-semibold
                text-neutral-900
                dark:text-white
                mb-3
                text-base
                lg:text-[17px]
              "
            >
              Explore
            </h5>
            <ul className="space-y-2">
              {exploreLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="
                      hover:text-blue-500
                      transition-colors
                      duration-300
                      text-sm
                      text-neutral-500
                      dark:text-neutral-400
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* HELP CENTER */}
          <nav aria-label="Help Center" className="lg:order-3">
            <h5
              className="
                font-semibold
                text-neutral-900
                dark:text-white
                mb-3
                text-base
                lg:text-[17px]
              "
            >
              Help Center
            </h5>
            <ul className="space-y-2">
              {helpCenterLinks.map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="
                      hover:text-blue-500
                      transition-colors
                      duration-300
                      text-sm
                      text-neutral-500
                      dark:text-neutral-400
                    "
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* SOCIAL */}
          <div className="lg:order-4">
            <h5
              className="
                font-semibold
                text-neutral-900
                dark:text-white
                mb-3
                text-base
              "
            >
              Join us on
            </h5>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="
                    text-neutral-500
                    dark:text-neutral-400
                    hover:text-blue-500
                    transition-colors
                    duration-300
                  "
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ASK AI ABOUT STARTIVES */}
        <div className="border-t border-neutral-200 dark:border-white/10 pt-8">
          <h5
            className="
              font-semibold
              text-neutral-900
              dark:text-white
              mb-4
              text-base
              lg:text-[17px]
            "
          >
            Ask AI About Startives
          </h5>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 max-w-2xl">
            Click any AI below — it will open with a ready prompt so you can instantly learn about Startives.
          </p>
          <div className="flex flex-wrap gap-3">
            {aiLinks.map(ai => (
              <a
                key={ai.name}
                href={ai.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ask ${ai.name} about Startives`}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-2
                  rounded-full
                  border
                  border-neutral-200
                  dark:border-white/15
                  bg-neutral-50
                  dark:bg-white/5
                  text-sm
                  font-medium
                  text-neutral-700
                  dark:text-neutral-300
                  hover:border-blue-500
                  hover:text-blue-500
                  hover:bg-blue-50
                  dark:hover:bg-blue-500/10
                  transition-all
                  duration-300
                "
              >
                {ai.icon}
                <span>{ai.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM IMAGE */}
      <div className="relative w-full overflow-hidden leading-none">
        <div className="absolute top-2 sm:top-3 left-0 right-0 z-20 flex justify-center px-4">
          <p className="inline-block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent font-bold text-xs sm:text-sm">
            © 2026 {APP_NAME}. All rights reserved.
          </p>
        </div>

        <div className="w-full overflow-hidden flex items-end justify-center">
          {/* LIGHT MODE IMAGE */}
          <img
            src="https://res.cloudinary.com/dp7avkarg/image/upload/v1786961157/IMG_20260817_153521_ckxsje.png"
            alt="Startives founders and builders"
            className="
              block
              dark:hidden
              w-full
              h-auto
              max-h-[85%]
              sm:max-h-[75%]
              object-contain
              object-bottom
              scale-y-[0.85]
              sm:scale-y-[0.75]
              origin-bottom
            "
          />

          {/* DARK MODE IMAGE */}
          <img
            src="https://res.cloudinary.com/dp7avkarg/image/upload/v1787124636/IMG_20260819_125947_wbmrqu.png"
            alt="Startives founders and builders"
            className="
              hidden
              dark:block
              w-full
              h-auto
              max-h-[85%]
              sm:max-h-[75%]
              object-contain
              object-bottom
              scale-y-[0.85]
              sm:scale-y-[0.75]
              origin-bottom
            "
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;