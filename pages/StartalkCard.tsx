import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Startalk } from '../types';
import { timeAgo } from '../constants';

const MOOD_EMOJIS = ['🚀', '💡', '❤️', '🔥', '💯', '😂', '😭'];

const isMongoId = (id?: string) => !!id && /^[a-f\d]{24}$/i.test(id);

// --- Icons (Same as before) ---
const SmileIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

// --- Helper to fix Image URLs ---
const getImageUrl = (url: string) => {
  if (!url) return "";
  return url;
};

// ✅ NEW: link detect + clickable
const renderTextWithLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/;

  const parts = text.split(/(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g);

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`;

      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 font-semibold underline break-all hover:text-purple-400 transition"
        >
          {part}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
};

export const StartalkCard: React.FC<{
  talk: Startalk;
  onDeleteRequest?: (id: string) => void;
  className?: string;
}> = ({
  talk,
  onDeleteRequest,
  className = "",
}) => {
  const { reactToStartalk, currentUser, users } = useAppContext();

  const displayUser = users?.find(
    u => String(u.id) === String(talk.authorId)
  );

  const isMe = String(currentUser?.id) === String(talk.authorId);

  const displayName =
    displayUser?.name ||
    (isMe ? currentUser?.name : null) ||
    talk.authorName ||
    "User";

  const displayAvatar =
    displayUser?.profilePictureUrl ||
    displayUser?.avatar ||
    (isMe ? currentUser?.profilePictureUrl || currentUser?.avatar : null) ||
    talk.authorAvatar;

  const displayHeadline =
    displayUser?.headline ||
    (isMe ? currentUser?.headline : null) ||
    talk.authorHeadline ||
    "Builder";

  const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  const initials = talk.authorName
    ? talk.authorName
        .split(' ')
        .map(n => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'UU';

  const handleReaction = (emoji: string) => {
    reactToStartalk(talk.id, emoji);
    setIsReactionMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsReactionMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHoldStart = () => {
    timeoutRef.current = window.setTimeout(
      () => setIsReactionMenuOpen(true),
      300
    );
  };

  const handleHoldEnd = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // ✅ Object.values works perfectly with the new backend fix
  const totalReactions = Object.values(
    talk.reactions || {}
  ).reduce<number>(
    (sum, count) => sum + (count as number),
    0
  );

  const userHasReacted = !!talk.currentUserReaction; // or check userReactions from backend logic if available
  const isOwner = currentUser?.id === talk.authorId;

  const profileClickable = isMongoId(talk.authorId);

  return (
    <div
      className={`bg-[var(--component-background)] rounded-2xl border border-[var(--border-primary)] p-5 md:p-6 transition-all duration-300 hover:shadow-none hover:border-purple-500/30 group flex flex-col gap-4 select-none font-poppins ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {profileClickable ? (
            <Link
              to={`/user/${talk.authorId}`}
              className="relative shrink-0"
            >
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-[var(--border-primary)]"
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full icon-bg-gradient flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {initials}
                </div>
              )}
            </Link>
          ) : (
            <div className="relative shrink-0">
              {displayAvatar ? (
                <img
                  src={displayAvatar}
                  alt={displayName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border border-[var(--border-primary)]"
                />
              ) : (
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full icon-bg-gradient flex items-center justify-center text-white font-bold text-xs md:text-sm">
                  {initials}
                </div>
              )}
            </div>
          )}

          <div className="overflow-hidden text-left">
            {profileClickable ? (
              <Link
                to={`/user/${talk.authorId}`}
                className="font-semibold text-sm md:text-base text-[var(--text-primary)] hover:text-purple-600 transition-colors truncate block tracking-tight font-poppins"
              >
                {displayName}
              </Link>
            ) : (
              <span
                className="font-semibold text-sm md:text-base text-[var(--text-primary)] truncate block tracking-tight font-poppins"
                title="Profile not available"
              >
                {displayName}
              </span>
            )}

            <p className="text-[10px] md:text-xs text-purple-500 truncate font-medium font-poppins">
              {displayHeadline || "Builder"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[10px] font-black uppercase text-[var(--text-muted)] shadow-none h-fit">
            <SmileIcon className="w-3.5 h-3.5 text-purple-500" />
            <span className="text-[var(--text-primary)]">
              {totalReactions}
            </span>
          </div>

          {isOwner && onDeleteRequest && (
            <button
              onClick={() => onDeleteRequest(talk.id)}
              className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:scale-110 transition-transform border border-red-200 dark:border-red-800/30 shadow-none"
              title="Delete talk"
            >
              <TrashIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4 text-left">
        <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-medium whitespace-pre-wrap">
          {renderTextWithLinks(talk.content)}
        </p>

        {talk.imageUrl && (
          <div className="rounded-xl overflow-hidden border border-[var(--border-primary)] bg-[var(--background-tertiary)] shadow-none">
            {/* ✅ Fixed Image URL Display */}
            <img
              src={getImageUrl(talk.imageUrl)}
              alt="Post attachment"
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}
      </div>

      {/* Reaction Breakdown */}
      {totalReactions > 0 && (
        <div className="flex items-center gap-3 flex-wrap text-sm">
          {Object.entries(talk.reactions || {})
            .filter(([_, count]) => (count as number) > 0)
            .map(([emoji, count]) => (
              <div
                key={emoji}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)]"
              >
                <span>{emoji}</span>
                <span className="text-xs font-bold">
                  {count as number}
                </span>
              </div>
            ))}
        </div>
      )}

      <div className="flex flex-col gap-3 pt-2 border-t border-[var(--border-primary)]">
        <div className="flex items-center justify-between">
          <div className="relative">
            <button
              onMouseDown={handleHoldStart}
              onMouseUp={handleHoldEnd}
              onMouseLeave={handleHoldEnd}
              onTouchStart={handleHoldStart}
              onTouchEnd={handleHoldEnd}
              onClick={() =>
                setIsReactionMenuOpen(!isReactionMenuOpen)
              }
              className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all shadow-none active:scale-95 group/pill select-none touch-none text-[10px] font-black uppercase ${
                userHasReacted
                  ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-400'
                  : 'bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50'
              }`}
            >
              {talk.currentUserReaction ? (
                <span className="text-base leading-none">
                  {talk.currentUserReaction}
                </span>
              ) : (
                <SmileIcon className="w-4 h-4 transition-colors group-hover/pill:text-purple-600" />
              )}

              <span>
                {talk.currentUserReaction ? 'Reacted' : 'React'}
              </span>
            </button>

            {isReactionMenuOpen && (
              <div
                ref={menuRef}
                className="absolute bottom-full left-0 mb-3 p-1.5 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-full shadow-none flex items-center gap-1 z-50 animate-in slide-in-from-bottom-2 duration-200"
              >
                {MOOD_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReaction(emoji);
                    }}
                    className={`w-9 h-9 flex items-center justify-center text-lg hover:scale-125 transition-transform hover:bg-[var(--background-tertiary)] rounded-full ${
                      talk.currentUserReaction === emoji
                        ? 'bg-purple-100 dark:bg-purple-900/30'
                        : ''
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>

          <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest font-poppins">
            {timeAgo(talk.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};