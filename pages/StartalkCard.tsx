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
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375-.336.375-.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
  </svg>
);

const TrashIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

const CommentIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75h6.75m-6.75 3h4.5M21 12c0 4.556-4.03 8.25-9 8.25a9.83 9.83 0 01-3.287-.56L3 21l1.31-4.37A8.223 8.223 0 013 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
  </svg>
);

const SendIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.27 3.17a.75.75 0 01.98-.98L21 12 4.25 21.81a.75.75 0 01-.98-.98L6 12zm0 0h8.25" />
  </svg>
);

const XMarkIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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

interface StartalkComment {
  id: string;
  text: string;
  authorName: string;
  authorAvatar?: string;
  timestamp: string;
}

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

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<StartalkComment[]>([]);

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

    return () => document.removeEventListener("mousedown", handleClickOutside);
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
  const totalReactions = Object.values(talk.reactions || {}).reduce<number>(
    (sum, count) => sum + (count as number),
    0
  );

  const userHasReacted = !!talk.currentUserReaction;
  const isOwner = currentUser?.id === talk.authorId;

  const profileClickable = isMongoId(talk.authorId);

  const handleAddComment = () => {
    const trimmedComment = commentText.trim();

    if (!trimmedComment) return;

    const newComment: StartalkComment = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      text: trimmedComment,
      authorName: currentUser?.name || "User",
      authorAvatar:
        currentUser?.profilePictureUrl ||
        currentUser?.avatar ||
        undefined,
      timestamp: new Date().toISOString(),
    };

    setComments(prev => [...prev, newComment]);
    setCommentText('');
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

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
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
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

            <button
              type="button"
              onClick={() => setIsCommentModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50 transition-all active:scale-95 text-[10px] font-black uppercase"
            >
              <CommentIcon className="w-4 h-4" />
              <span>
                Comment{comments.length > 0 ? ` ${comments.length}` : ''}
              </span>
            </button>
          </div>

          <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest font-poppins whitespace-nowrap">
            {timeAgo(talk.timestamp)}
          </span>
        </div>
      </div>

      {/* Comments Modal */}
      {isCommentModalOpen && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setIsCommentModalOpen(false);
            }
          }}
        >
          <div className="w-full max-w-[520px] max-h-[80vh] bg-[var(--component-background)] border border-[var(--border-primary)] rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col font-poppins">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-primary)]">
              <div>
                <h3 className="text-base font-bold text-[var(--text-primary)]">
                  Comments
                </h3>
                <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">
                  Join the conversation
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCommentModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex items-start gap-3"
                    >
                      {comment.authorAvatar ? (
                        <img
                          src={comment.authorAvatar}
                          alt={comment.authorName}
                          className="w-9 h-9 rounded-full object-cover border border-[var(--border-primary)] shrink-0"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full icon-bg-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                          {comment.authorName
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .substring(0, 2)
                            .toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                            {comment.authorName}
                          </span>

                          <span className="text-[9px] text-[var(--text-muted)] font-medium whitespace-nowrap">
                            {timeAgo(comment.timestamp)}
                          </span>
                        </div>

                        <div className="mt-1 px-3 py-2.5 rounded-2xl rounded-tl-md bg-[var(--background-tertiary)] border border-[var(--border-primary)]">
                          <p className="text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap break-words">
                            {comment.text}
                          </p>
                        </div>

                        {String(currentUser?.name) ===
                          String(comment.authorName) && (
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteComment(comment.id)
                            }
                            className="mt-1 text-[9px] font-bold uppercase tracking-wider text-red-500 hover:text-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="w-12 h-12 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] flex items-center justify-center mx-auto mb-3 text-[var(--text-muted)]">
                    <CommentIcon className="w-5 h-5" />
                  </div>

                  <p className="text-xs font-bold text-[var(--text-primary)]">
                    No comments yet
                  </p>

                  <p className="text-[10px] text-[var(--text-muted)] mt-1">
                    Be the first to start the conversation.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[var(--border-primary)]">
              <div className="flex items-end gap-2 p-2 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-primary)]">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      !e.shiftKey
                    ) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                  placeholder="Write a comment..."
                  rows={1}
                  maxLength={500}
                  className="flex-1 min-h-[38px] max-h-[110px] resize-none bg-transparent border-none outline-none focus:ring-0 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] px-2 py-2"
                />

                <button
                  type="button"
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="w-9 h-9 shrink-0 rounded-full button-gradient text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                  title="Post comment"
                >
                  <SendIcon className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[9px] text-[var(--text-muted)] mt-2 px-1">
                Press Enter to comment · Shift + Enter for a new line
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};