import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { StartupIdea } from '../types';
import {
  ChevronLeftIcon,
  BookmarkIcon,
  GlobeAltIcon,
  ShoppingBagIcon,
  timeAgo
} from '../constants';

const SavedProjectCard: React.FC<{ idea: StartupIdea }> = ({ idea }) => {
  const navigate = useNavigate();
  const { toggleSaveProject, getUserById } = useAppContext();

  const founder = useMemo(
    () => getUserById(idea.founderId),
    [idea.founderId, getUserById]
  );

  return (
    <div className="bg-[var(--component-background)] rounded-[2rem] border border-[var(--border-primary)] transition-all duration-300 hover:border-purple-500/30 font-poppins shadow-none flex flex-col">

      {/* TOP SECTION */}
      <div className="p-5 pb-3 flex-grow">

        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[var(--border-primary)] bg-neutral-100 shrink-0">
              <img
                src={idea.imageUrl}
                alt={idea.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[var(--text-primary)] leading-tight">
                {idea.title}
              </h3>

              {/* 🔥 Reduced gap here */}
              <p className="text-sm text-purple-600 mt-0.5">
                {idea.tagline}
              </p>
            </div>
          </div>

          {/* SAVE BUTTON */}
          <button
  type="button"
  onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSaveProject(idea.id);
  }}
  className="p-2.5 rounded-full text-red-600 bg-[var(--background-tertiary)] border border-[var(--border-primary)] transition-all hover:bg-red-50"
>"
          >
            <BookmarkIcon className="w-5 h-5" solid />
          </button>
        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="flex justify-between items-center px-5 py-3 bg-gray-50/50 dark:bg-neutral-900/30 border-t border-[var(--border-primary)]">

        {/* LEFT: Profile + Time */}
        <div className="flex items-center gap-2">
          {founder && (
            <div
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/user/${idea.founderId}`);
              }}
            >
              <img
                src={
                  founder.profilePictureUrl ||
                  `https://i.pravatar.cc/150?u=${founder.id}`
                }
                className="w-5 h-5 rounded-full object-cover ring-2 ring-white dark:ring-neutral-800"
              />
              <span className="text-xs font-black text-[var(--text-secondary)]">
                {founder.name?.split(' ')[0]}
              </span>
            </div>
          )}

          <span className="text-[10px] text-[var(--text-muted)] font-bold flex items-center gap-1.5">
            <span className="opacity-30">•</span>
            {timeAgo(idea.postedDate)}
          </span>
        </div>

        {/* RIGHT: Details (Only clickable area) */}
        <div
          onClick={() =>
            navigate(idea.askingPrice ? `/asset/${idea.id}` : `/idea/${idea.id}`)
          }
          className="flex items-center cursor-pointer text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest gap-1 hover:translate-x-1 transition-transform"
        >
          Details
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
              clipRule="evenodd"
            />
          </svg>
        </div>

      </div>
    </div>
  );
};

const SavedProjectsPage: React.FC = () => {
  const { startupIdeas, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'ventures' | 'assets'>('ventures');

  if (!currentUser) return null;

  const savedProjects = startupIdeas.filter(
    (idea) =>
      currentUser.savedProjectIds?.includes(idea.id) &&
      !idea.askingPrice
  );

  const savedAssets = startupIdeas.filter(
    (idea) =>
      currentUser.savedProjectIds?.includes(idea.id) &&
      idea.askingPrice
  );

  return (
    <div className="max-w-6xl mx-auto pb-20 font-poppins">
      <div className="flex justify-start mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-full px-5 py-2"
        >
          <ChevronLeftIcon className="w-3.5 h-3.5" />
          <span>Dashboard</span>
        </Link>
      </div>

      <div className="text-left mb-6 px-1">
        <h1 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tighter">
          Whitelist
        </h1>
        <p className="text-[11px] text-[var(--text-muted)] font-medium mt-0.5 uppercase tracking-widest">
          Your curated collection of high-potential ventures.
        </p>
      </div>

      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1 bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-full overflow-hidden">
          <button
            onClick={() => setActiveTab('ventures')}
            className={`px-12 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'ventures'
                ? 'button-gradient text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Ventures
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-12 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'assets'
                ? 'button-gradient text-white'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Assets
          </button>
        </div>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {activeTab === 'ventures'
          ? savedProjects.map((idea) => (
              <SavedProjectCard key={idea.id} idea={idea} />
            ))
          : savedAssets.map((idea) => (
              <SavedProjectCard key={idea.id} idea={idea} />
            ))}
      </div>
    </div>
  );
};

export default SavedProjectsPage;