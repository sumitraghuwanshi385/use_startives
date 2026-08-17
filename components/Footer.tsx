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
    <footer className="bg-[var(--background-secondary)] text-[var(--text-muted)] border-t border-[var(--border-primary)] relative z-10" aria-label="Site footer">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
             <Link to="/" className="flex items-center text-[var(--text-primary)] mb-3" aria-label={`${APP_NAME} home`}>
                <img src="https://res.cloudinary.com/dp7avkarg/image/upload/v1774009098/Picsart_26-03-20_17-47-02-831_szxuv6.png" alt="Startives Logo" style={{ height: '32px' }} className="mr-3" />
                <span className="font-startives-brand text-2xl tracking-tighter gradient-text bg-gradient-to-r from-red-500 to-blue-500">{APP_NAME}</span>
            </Link>
            <p className="text-sm max-w-sm">Build startups faster with co-founders, builders, projects, startup stories, and a growing founder community.</p>
          </div>

          <nav aria-label="Help Center">
            <h5 className="font-semibold text-[var(--text-primary)] mb-3">Help Center</h5>
            <ul className="space-y-2">
              {helpCenterLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-[var(--accent-info-hover)] transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Explore">
            <h5 className="font-semibold text-[var(--text-primary)] mb-3">Explore</h5>
            <ul className="space-y-2">
              {exploreLinks.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-[var(--accent-info-hover)] transition-colors duration-300 text-sm">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h5 className="font-semibold text-[var(--text-primary)] mb-3">Join us on</h5>
            <div className="flex space-x-4">
              {socialLinks.map(social => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name} className="text-[var(--text-muted)] hover:text-[var(--accent-info-hover)] transition-colors duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden leading-none">
        <div className="absolute top-3 sm:top-5 left-0 right-0 z-10 text-center px-4">
          <p className="text-xs sm:text-sm font-medium text-white/90">
            &copy; 2026 {APP_NAME}. All rights reserved.
          </p>
        </div>
        <img
          src="https://res.cloudinary.com/dp7avkarg/image/upload/v1786960609/Picsart_26-08-17_15-26-26-148_cknym4.jpg"
          alt="Startives founders and builders"
          className="block w-full h-auto min-h-[180px] sm:min-h-[240px] object-cover object-bottom"
        />
      </div>
    </footer>
  );
};

export default Footer;