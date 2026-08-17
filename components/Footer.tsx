import React from 'react';
import { Link } from 'react-router-dom';
import { APP_NAME } from '../constants';
import { Instagram, Twitter } from 'lucide-react';

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
    { name: 'Instagram', href: 'https://www.instagram.com/usestartives', icon: <Instagram className="w-6 h-6" /> },
    { name: 'X (Twitter)', href: 'https://x.com/usestartives', icon: <Twitter className="w-6 h-6" /> },
  ];

  return (
    <footer className="bg-white text-neutral-500 border-t border-neutral-200 relative z-10" aria-label="Site footer">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
             <Link to="/" className="flex items-center text-neutral-900 mb-3" aria-label={`${APP_NAME} home`}>
                <img src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png" alt="Startives Logo" style={{ height: '32px' }} className="mr-3" />
                <span className="font-startives-brand text-2xl tracking-tighter gradient-text bg-gradient-to-r from-red-500 to-blue-500">{APP_NAME}</span>
            </Link>
            <p className="text-sm max-w-sm">Build startups faster with co-founders, builders, projects, startup stories, and a growing founder community.</p>
          </div>

          <nav aria-label="Help Center">
            <h5 className="font-semibold text-neutral-900 mb-3">Help Center</h5>
            <ul className="space-y-2">
              {helpCenterLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-blue-500 transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h5 className="font-semibold text-neutral-900 mb-3">Explore</h5>
            <ul className="space-y-2">
              {exploreLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-blue-500 transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h5 className="font-semibold text-neutral-900 mb-3">Join us on</h5>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="text-neutral-500 hover:text-blue-500 transition-colors duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden leading-none">
        <div className="absolute top-2 sm:top-3 left-0 right-0 z-20 flex justify-center px-4">
          <p className="inline-block bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent font-bold text-xs sm:text-sm">
            © 2026 {APP_NAME}. All rights reserved.
          </p>
        </div>

        <div className="w-full overflow-hidden flex items-end justify-center">
          <img
            src="https://res.cloudinary.com/dp7avkarg/image/upload/v1786961157/IMG_20260817_153521_ckxsje.png"
            alt="Startives founders and builders"
            className="block w-full h-auto max-h-[85%] sm:max-h-[75%] object-contain object-bottom scale-y-[0.85] sm:scale-y-[0.75] origin-bottom"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;