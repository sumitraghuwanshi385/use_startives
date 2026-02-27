import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { StartupIdea } from '../types';
import { ChevronLeftIcon, BookmarkIcon, GlobeAltIcon, ShoppingBagIcon } from '../constants';

const SavedProjectCard: React.FC<{ idea: StartupIdea }> = ({ idea }) => {
  const navigate = useNavigate();
  const { unsaveProject, receivedApplications } = useAppContext();

  const getId = (val: any) => {
    if (!val) return null;
    if (typeof val === "string") return val;
    if (typeof val === "object") {
      return val._id?.toString?.() || val.id?.toString?.();
    }
    return val.toString();
  };

  const totalApplications = receivedApplications.filter(
    app => getId(app.ideaId) === getId(idea.id)
  ).length;

  const openPositions = idea.positions?.filter(p => p.isOpen).length || 0;

  return (
    <div
      className="bg-[var(--component-background)] rounded-[2rem] border border-[var(--border-primary)] p-5 transition-all duration-300 transform hover:border-purple-500/30 group font-poppins shadow-none cursor-pointer"
      onClick={() => navigate(idea.askingPrice ? `/asset/${idea.id}` : `/idea/${idea.id}`)}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-[var(--border-primary)] bg-neutral-100 shrink-0">
            <img src={idea.imageUrl} alt={idea.title} className="w-full h-full object-cover" />
          </div>

          <div>
            <h3 className="text-xl font-semibold font-poppins text-[var(--text-primary)] hover:text-purple-500 leading-tight">
              {idea.title}
            </h3>

            <p className="text-sm font-poppins text-purple-600 mt-1">
              {idea.tagline}
            </p>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            unsaveProject(idea.id);
          }}
          className="p-2.5 rounded-full text-red-600 bg-[var(--background-tertiary)] border border-[var(--border-primary)] transition-all shadow-none hover:bg-red-50"
        >
          <BookmarkIcon className="w-5 h-5" solid />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-[var(--border-primary)] pt-4 gap-4">
        <div className="flex items-center space-x-8">
          <div>
            <p className="font-semibold text-2xl text-purple-600">
              {totalApplications}
            </p>
            <p className="text-xs font-poppins text-[var(--text-muted)]">
              Total applications
            </p>
          </div>

          <div>
            <p className="font-semibold text-2xl text-sky-500">
              {openPositions}
            </p>
            <p className="text-xs font-poppins text-[var(--text-muted)]">
              Open roles
            </p>
          </div>
        </div>

        <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">
          Details
        </span>
      </div>
    </div>
  );
};

const SavedProjectsPage: React.FC = () => {
  const { startupIdeas, currentUser } = useAppContext();
  const [activeTab, setActiveTab] = useState<'ventures' | 'assets'>('ventures');

  if (!currentUser) return null;

  const savedProjects = startupIdeas.filter(
    idea => currentUser.savedProjectIds?.includes(idea.id) && !idea.askingPrice
  );

  const savedAssets = startupIdeas.filter(
    idea => currentUser.savedProjectIds?.includes(idea.id) && idea.askingPrice
  );

  return (
    <div className="max-w-6xl mx-auto pb-20 font-poppins">
      <div className="flex justify-start mb-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center space-x-1 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-full px-5 py-2 shadow-none font-poppins"
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
        <div className="inline-flex p-1 bg-[var(--background-tertiary)] border border-[var(--border-primary)] rounded-full overflow-hidden shadow-none">
          <button
            onClick={() => setActiveTab('ventures')}
            className={`px-12 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'ventures'
                ? 'button-gradient text-white shadow-none'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Ventures
          </button>
          <button
            onClick={() => setActiveTab('assets')}
            className={`px-12 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === 'assets'
                ? 'button-gradient text-white shadow-none'
                : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
            }`}
          >
            Assets
          </button>
        </div>
      </div>

      {activeTab === 'ventures' ? (
        savedProjects.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            {savedProjects.map(idea => (
              <SavedProjectCard key={idea.id} idea={idea} />
            ))}
          </div>
        ) : (
          <div className="py-20 bg-[var(--component-background)] rounded-[3rem] border-2 border-dashed border-[var(--border-primary)] flex flex-col items-center font-poppins shadow-none">
            <GlobeAltIcon className="w-16 h-16 text-neutral-300 mb-4 shadow-none" />
            <p className="text-xs font-bold text-[var(--text-muted)] uppercase italic tracking-widest">
              Whitelist is empty
            </p>
          </div>
        )
      ) : savedAssets.length > 0 ? (
        <div className="space-y-6 max-w-4xl mx-auto">
          {savedAssets.map(asset => (
            <SavedProjectCard key={asset.id} idea={asset} />
          ))}
        </div>
      ) : (
        <div className="py-20 bg-[var(--component-background)] rounded-[3rem] border-2 border-dashed border-[var(--border-primary)] flex flex-col items-center font-poppins shadow-none">
          <ShoppingBagIcon className="w-16 h-16 text-neutral-300 mb-4 shadow-none" />
          <p className="text-xs font-bold text-[var(--text-muted)] uppercase italic tracking-widest">
            Asset list empty
          </p>
        </div>
      )}
    </div>
  );
};

export default SavedProjectsPage;