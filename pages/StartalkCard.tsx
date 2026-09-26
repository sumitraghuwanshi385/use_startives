import React, {
  Component,
  ErrorInfo,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Startalk } from '../types';
import { timeAgo } from '../constants';
import {
  Smile,
  MessageCircle,
  Share2,
  Copy,
  Trash2,
  X,
  ExternalLink,
} from 'lucide-react';

const MOOD_EMOJIS = ['🚀', '💡', '❤️', '🔥', '💯', '😂', '😭'];

export const MAX_STARTALK_WORDS = 1000;
export const MAX_COMMENT_LENGTH = 500;

const isMongoId = (id?: string) => !!id && /^[a-f\d]{24}$/i.test(id);

const countCharacters = (value: string) => value.length;

const trimToCharacterLimit = (value: string, limit: number) => {
  if (value.length <= limit) return value;
  return value.slice(0, limit);
};

interface LocalComment {
  id: string;
  text: string;
  author: string;
  authorId?: string;
  avatar?: string;
  headline?: string;
  timestamp: string;
}

const normalizeComment = (comment: any): LocalComment => {
  const source = comment?.comment || comment?.data || comment || {};

  const authorObject =
    source?.user && typeof source.user === 'object'
      ? source.user
      : source?.author && typeof source.author === 'object'
      ? source.author
      : source?.authorUser && typeof source.authorUser === 'object'
      ? source.authorUser
      : {};

  const authorId =
    source?.authorId ||
    source?.userId ||
    authorObject?.id ||
    authorObject?._id;

  const resolvedAuthor =
    typeof source?.author === 'string'
      ? source.author
      : source?.authorName ||
        source?.userName ||
        authorObject?.name ||
        source?.name ||
        'User';

  const resolvedAvatar =
    source?.avatar ||
    source?.authorAvatar ||
    source?.profilePictureUrl ||
    authorObject?.profilePictureUrl ||
    authorObject?.avatar ||
    undefined;

  const resolvedHeadline = source?.headline || authorObject?.headline || 'Builder';

  return {
    id: String(
      source?.id ||
        source?._id ||
        `\( {Date.now()}- \){Math.random().toString(36).slice(2)}`
    ),
    text: String(source?.text || source?.content || ''),
    author: String(resolvedAuthor),
    authorId: authorId ? String(authorId) : undefined,
    avatar: resolvedAvatar,
    headline: resolvedHeadline,
    timestamp:
      source?.timestamp ||
      source?.createdAt ||
      source?.updatedAt ||
      new Date().toISOString(),
  };
};

const getStartalkCommentCount = (talk: any): number => {
  if (Array.isArray(talk?.comments)) return talk.comments.length;

  const possibleCounts = [
    talk?.commentCount,
    talk?.commentsCount,
    talk?.comment_count,
    talk?.totalComments,
  ];

  for (const value of possibleCounts) {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      Number.isFinite(Number(value))
    ) {
      return Math.max(0, Number(value));
    }
  }

  return 0;
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  errorStack?: string;
}

class StartalkErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
    errorStack: '',
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'An unknown runtime error occurred.',
      errorStack: error?.stack,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('STARTALK CARD ERROR:', error);
    console.error('STARTALK COMPONENT STACK:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-2xl border border-red-500/30 bg-red-50 dark:bg-red-950/20 p-5 font-poppins">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 shrink-0 rounded-full bg-red-100 dark:bg-red-900/40 text-red-500 flex items-center justify-center font-black">
              !
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-red-600 dark:text-red-400">
                Startalk failed to render
              </h3>
              <p className="mt-1 text-xs text-red-500/80 dark:text-red-300/80">
                A runtime error occurred in the Startalk card.
              </p>
              <div className="mt-3 rounded-xl border border-red-500/20 bg-black/5 dark:bg-black/20 p-3 overflow-auto">
                <p className="text-[11px] font-mono font-semibold text-red-600 dark:text-red-300 whitespace-pre-wrap break-words">
                  {this.state.errorMessage}
                </p>
                {this.state.errorStack && (
                  **Summary:**

                      Technical details
                    
                    <pre className="mt-2 text-[9px] leading-relaxed text-red-500/80 whitespace-pre-wrap break-words">
                      {this.state.errorStack}
                    </pre>
                )}
              </div>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-widest"
              >
                Reload
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const extractFirstUrl = (text: string): string | null => {
  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,}[^\s]*)/gi;
  const match = text.match(urlRegex);
  if (!match || !match[0]) return null;

  let url = match[0];
  if (!url.startsWith('http')) {
    url = `https://${url}`;
  }
  return url;
};

interface LinkPreviewData {
  title?: string;
  description?: string;
  image?: string;
  url: string;
  siteName?: string;
}

const LinkPreview: React.FC<{
  url: string;
  onClose?: () => void;
}> = ({ url, onClose }) => {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchPreview = async () => {
      try {
        setLoading(true);
        setError(false);

        const res = await fetch(
          `https://api.microlink.io?url=${encodeURIComponent(url)}&palette=false&audio=false&video=false&iframe=false`
        );
        const json = await res.json();

        if (cancelled) return;

        if (json.status === 'success' && json.data) {
          setData({
            title: json.data.title,
            description: json.data.description,
            image: json.data.image?.url || json.data.logo?.url,
            url: json.data.url || url,
            siteName: json.data.publisher || json.data.siteName,
          });
        } else {
          setError(true);
        }
      } catch (err) {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPreview();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (loading) {
    return (
      <div className="mt-3 rounded-xl border border-[var(--border-primary)] bg-[var(--background-tertiary)] p-4 animate-pulse">
        <div className="h-4 bg-[var(--border-primary)] rounded w-3/4 mb-2" />
        <div className="h-3 bg-[var(--border-primary)] rounded w-1/2" />
      </div>
    );
  }

  if (error || !data) return null;

  return (
    <div className="mt-3 relative group/preview">
      <a
        href={data.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="block rounded-xl border border-[var(--border-primary)] overflow-hidden bg-[var(--background-tertiary)] hover:border-purple-500/40 transition-all"
      >
        {data.image && (
          <div className="w-full h-40 sm:h-48 bg-[var(--background-secondary)] overflow-hidden">
            <img
              src={data.image}
              alt={data.title || 'Preview'}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="p-3.5">
          {data.siteName && (
            <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1">
              {data.siteName}
            </p>
          )}
          {data.title && (
            <h4 className="text-sm font-bold text-[var(--text-primary)] line-clamp-2 leading-snug">
              {data.title}
            </h4>
          )}
          {data.description && (
            <p className="mt-1 text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
              {data.description}
            </p>
          )}
          <div className="mt-2 flex items-center gap-1.5 text-[10px] text-purple-500 font-medium">
            <ExternalLink className="w-3 h-3" />
            <span className="truncate">{new URL(data.url).hostname}</span>
          </div>
        </div>
      </a>

      {onClose && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover/preview:opacity-100 transition-opacity hover:bg-black/80"
          title="Hide preview"
          aria-label="Hide preview"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

const renderTextWithLinks = (text: string) => {
  const parts = text.split(
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g
  );

  const urlRegex = /^(https?:\/\/|www\.)|^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith('http') ? part : `https://${part}`;

      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-purple-600 dark:text-purple-400 font-semibold underline break-all hover:text-purple-500"
        >
          {part}
        </a>
      );
    }

    return <span key={index}>{part}</span>;
  });
};

const StartalkCardContent: React.FC<{
  talk: Startalk;
  onDeleteRequest?: (id: string) => void;
  className?: string;
}> = ({ talk, onDeleteRequest, className = '' }) => {
  const app = useAppContext() as any;

  const {
    reactToStartalk,
    currentUser,
    users,
    fetchStartalkComments,
    addStartalkComment,
    deleteStartalkComment,
  } = app;

  const displayUser = users?.find(
    (u: any) => String(u.id) === String(talk.authorId)
  );

  const isMe = String(currentUser?.id) === String(talk.authorId);

  const displayName =
    displayUser?.name ||
    (isMe ? currentUser?.name : null) ||
    talk.authorName ||
    (talk as any).author ||
    'User';

  const displayAvatar =
    displayUser?.profilePictureUrl ||
    displayUser?.avatar ||
    (isMe ? currentUser?.profilePictureUrl || currentUser?.avatar : null) ||
    talk.authorAvatar ||
    (talk as any).profilePictureUrl;

  const displayHeadline =
    displayUser?.headline ||
    (isMe ? currentUser?.headline : null) ||
    talk.authorHeadline ||
    'Builder';

  const initials =
    String(displayName)
      .split(' ')
      .map((name: string) => name[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'UU';

  const isOwner = String(currentUser?.id) === String(talk.authorId);
  const profileClickable = isMongoId(talk.authorId);

  const [isReactionMenuOpen, setIsReactionMenuOpen] = useState(false);
  const reactionRef = useRef<HTMLDivElement>(null);
  const holdTimeout = useRef<number | null>(null);

  const totalReactions = Object.values(talk.reactions || {}).reduce<number>(
    (sum, count) => sum + Number(count),
    0
  );

  const userHasReacted = !!talk.currentUserReaction;

  const handleReaction = (emoji: string) => {
    reactToStartalk(talk.id, emoji);
    setIsReactionMenuOpen(false);
  };

  const handleHoldStart = () => {
    if (holdTimeout.current) window.clearTimeout(holdTimeout.current);
    holdTimeout.current = window.setTimeout(() => {
      setIsReactionMenuOpen(true);
    }, 450);
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      window.clearTimeout(holdTimeout.current);
      holdTimeout.current = null;
    }
  };

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<LocalComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [commentToDeleteId, setCommentToDeleteId] = useState<string | null>(null);
  const [commentDeleting, setCommentDeleting] = useState(false);
  const [commentCount, setCommentCount] = useState<number>(() =>
    getStartalkCommentCount(talk)
  );

  useEffect(() => {
    const incomingCount = getStartalkCommentCount(talk);
    setCommentCount(incomingCount);
  }, [
    talk.id,
    (talk as any).commentCount,
    (talk as any).commentsCount,
    (talk as any).comment_count,
    Array.isArray((talk as any).comments)
      ? (talk as any).comments.length
      : undefined,
  ]);

  const displayedCommentCount = comments.length > 0 ? comments.length : commentCount;
  const commentCharacterCount = countCharacters(commentText);

  const loadComments = async () => {
    if (typeof fetchStartalkComments !== 'function') {
      console.error('fetchStartalkComments is not available in AppContext.');
      return;
    }

    setCommentsLoading(true);

    try {
      const result = await fetchStartalkComments(talk.id);
      const source = Array.isArray(result)
        ? result
        : Array.isArray(result?.comments)
        ? result.comments
        : Array.isArray(result?.data)
        ? result.data
        : [];

      const normalized = source
        .map(normalizeComment)
        .filter((comment) => !!comment.id);

      setComments(normalized);
      setCommentCount(normalized.length);
    } catch (error) {
      console.error('Loading Startalk comments failed:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const openComments = async () => {
    setIsCommentsOpen(true);
    setIsShareMenuOpen(false);
    setIsReactionMenuOpen(false);
    await loadComments();
  };

  const closeComments = () => {
    setIsCommentsOpen(false);
    setCommentText('');
    setCommentToDeleteId(null);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCommentText(trimToCharacterLimit(value, MAX_COMMENT_LENGTH));
  };

  const handleAddComment = async () => {
    const text = commentText.trim();

    if (!text || !currentUser || commentSubmitting) return;
    if (text.length > MAX_COMMENT_LENGTH) return;

    if (typeof addStartalkComment !== 'function') {
      console.error('addStartalkComment is not available in AppContext.');
      return;
    }

    setCommentSubmitting(true);

    try {
      const created = await addStartalkComment(talk.id, text);
      if (created === false) throw new Error('Backend rejected the comment.');
      await loadComments();
      setCommentText('');
    } catch (error) {
      console.error('Adding Startalk comment failed:', error);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleCommentKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      if (commentText.trim() && !commentSubmitting) {
        handleAddComment();
      }
    }
  };

  const requestDeleteComment = (commentId: string) => {
    setCommentToDeleteId(commentId);
  };

  const confirmDeleteComment = async () => {
    if (!commentToDeleteId || commentDeleting) return;

    if (typeof deleteStartalkComment !== 'function') {
      console.error('deleteStartalkComment is not available in AppContext.');
      return;
    }

    setCommentDeleting(true);

    try {
      const success = await deleteStartalkComment(commentToDeleteId);
      if (success === false) throw new Error('Backend rejected comment deletion.');
      await loadComments();
      setCommentToDeleteId(null);
    } catch (error) {
      console.error('Deleting Startalk comment failed:', error);
    } finally {
      setCommentDeleting(false);
    }
  };

  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const shareRef = useRef<HTMLDivElement>(null);

  const shareUrl =
    typeof window !== 'undefined'
      ? `\( {window.location.origin}/startalk/ \){talk.id}`
      : '';

  const shareTitle = `${displayName} on Startives`;
  const shareText =
    talk.content.length > 180
      ? `${talk.content.slice(0, 180)}…`
      : talk.content;

  const copyShareLink = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = shareUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setShareMessage('Link copied');
      window.setTimeout(() => setShareMessage(''), 1600);
    } catch (error) {
      console.error('Copy failed:', error);
      setShareMessage('Unable to copy');
      window.setTimeout(() => setShareMessage(''), 1600);
    }
  };

  const handleNativeShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setIsShareMenuOpen(false);
        return;
      }
      await copyShareLink();
    } catch (error: any) {
      if (error?.name === 'AbortError') return;
      console.error('Share failed:', error);
      await copyShareLink();
    }
  };

  const handleShareButton = () => {
    setIsReactionMenuOpen(false);
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      handleNativeShare();
      return;
    }
    setIsShareMenuOpen((prev) => !prev);
  };

  // Link Preview
  const firstUrl = extractFirstUrl(talk.content || '');
  const [hidePreview, setHidePreview] = useState(false);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (reactionRef.current && !reactionRef.current.contains(target)) {
        setIsReactionMenuOpen(false);
      }
      if (shareRef.current && !shareRef.current.contains(target)) {
        setIsShareMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setIsReactionMenuOpen(false);
      setIsShareMenuOpen(false);
      if (isCommentsOpen) closeComments();
    };

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isCommentsOpen]);

  useEffect(() => {
    if (!isCommentsOpen) return;

    const oldOverflow = document.body.style.overflow;
    const oldTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = oldOverflow;
      document.body.style.touchAction = oldTouchAction;
    };
  }, [isCommentsOpen]);

  const commentsModal =
    isCommentsOpen && typeof document !== 'undefined'
      ? createPortal(
          <div
            className="fixed inset-0 z-[1100] flex items-center justify-center px-3 py-4 sm:px-4 sm:py-6 bg-black/65 dark:bg-black/80 backdrop-blur-[7px] overscroll-none"
            style={{
              paddingTop: 'max(1rem, env(safe-area-inset-top))',
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
              width: '100vw',
              height: '100dvh',
            }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeComments();
            }}
          >
            <div className="relative w-full max-w-[520px] overflow-visible">
              <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-[1.75rem] overflow-hidden shadow-2xl max-h-[85vh] flex flex-col">
                <div className="flex items-center justify-between px-5 md:px-6 py-4 border-b border-[var(--border-primary)] shrink-0">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">
                    Comments
                  </h3>
                  <button
                    type="button"
                    onClick={closeComments}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[var(--text-muted)] hover:bg-[var(--background-tertiary)] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-5 md:px-6 py-4 space-y-4 min-h-[200px]">
                  {commentsLoading ? (
                    <div className="text-center py-10 text-xs text-[var(--text-muted)]">
                      Loading comments...
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="text-center py-10 text-xs text-[var(--text-muted)]">
                      No comments yet. Be the first!
                    </div>
                  ) : (
                    comments.map((comment) => {
                      const isCommentOwner =
                        String(currentUser?.id) === String(comment.authorId);
                      const commentProfileClickable = isMongoId(comment.authorId);

                      return (
                        <div key={comment.id} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--background-tertiary)] flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden">
                            {comment.avatar ? (
                              <img
                                src={comment.avatar}
                                alt={comment.author}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              comment.author?.[0]?.toUpperCase() || 'U'
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              {commentProfileClickable ? (
                                <Link
                                  to={`/user/${comment.authorId}`}
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-xs font-bold text-[var(--text-primary)] truncate hover:text-purple-600 transition-colors"
                                >
                                  {comment.author}
                                </Link>
                              ) : (
                                <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                                  {comment.author}
                                </span>
                              )}
                              <span className="text-[9px] text-[var(--text-muted)] font-medium shrink-0">
                                {timeAgo(comment.timestamp)}
                              </span>
                            </div>
                            <p className="mt-1 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed break-words whitespace-pre-wrap">
                              {comment.text}
                            </p>
                          </div>

                          {isCommentOwner && (
                            <button
                              type="button"
                              onClick={() => requestDeleteComment(comment.id)}
                              className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors shrink-0"
                              title="Delete comment"
                              aria-label="Delete comment"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="px-5 md:px-6 py-4 border-t border-[var(--border-primary)] bg-[var(--component-background)] shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentText}
                      maxLength={MAX_COMMENT_LENGTH}
                      onChange={handleCommentChange}
                      onKeyDown={handleCommentKeyDown}
                      placeholder="Write a comment..."
                      disabled={commentSubmitting}
                      className="flex-1 min-w-0 h-10 px-4 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-xs md:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/10 transition-all disabled:opacity-60"
                    />
                    <button
                      type="button"
                      onClick={handleAddComment}
                      disabled={
                        !commentText.trim() ||
                        commentSubmitting ||
                        commentCharacterCount > MAX_COMMENT_LENGTH
                      }
                      className="h-10 px-4 md:px-5 rounded-full button-gradient text-white text-[10px] font-black uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 shrink-0"
                    >
                      {commentSubmitting ? '...' : 'Post'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[9px] text-[var(--text-muted)]">
                      Press Enter to post
                    </span>
                    <span
                      className={`text-[9px] font-semibold ${
                        commentCharacterCount >= MAX_COMMENT_LENGTH
                          ? 'text-red-500'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      {commentCharacterCount}/{MAX_COMMENT_LENGTH}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <article
        className={`w-full relative bg-[var(--component-background)] rounded-2xl border border-[var(--border-primary)] p-5 md:p-6 transition-all duration-300 hover:border-purple-500/30 group flex flex-col gap-4 select-none font-poppins ${className}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {profileClickable ? (
              <Link
                to={`/user/${talk.authorId}`}
                className="relative shrink-0 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                aria-label={`View ${displayName}'s profile`}
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

            <div className="overflow-hidden min-w-0">
              {profileClickable ? (
                <Link
                  to={`/user/${talk.authorId}`}
                  className="font-semibold text-sm md:text-base text-[var(--text-primary)] hover:text-purple-600 transition-colors truncate block tracking-tight"
                >
                  {displayName}
                </Link>
              ) : (
                <span className="font-semibold text-sm md:text-base text-[var(--text-primary)] truncate block tracking-tight">
                  {displayName}
                </span>
              )}
              <p className="text-[10px] md:text-xs text-purple-500 truncate font-medium">
                {displayHeadline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[10px] font-black">
              <Smile className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-[var(--text-primary)]">{totalReactions}</span>
            </div>

            {isOwner && onDeleteRequest && (
              <button
                type="button"
                onClick={() => onDeleteRequest(talk.id)}
                className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 border border-red-200 dark:border-red-800/30"
                title="Delete talk"
                aria-label="Delete talk"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 text-left">
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-medium whitespace-pre-wrap break-words">
            {renderTextWithLinks(talk.content)}
          </p>

          {talk.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[var(--border-primary)] bg-[var(--background-tertiary)]">
              <img
                src={talk.imageUrl}
                alt="Post attachment"
                className="w-full h-auto object-cover max-h-[400px]"
                loading="lazy"
              />
            </div>
          )}

          {/* Link Preview */}
          {firstUrl && !hidePreview && (
            <LinkPreview url={firstUrl} onClose={() => setHidePreview(true)} />
          )}
        </div>

        {/* Reactions */}
        {totalReactions > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            {Object.entries(talk.reactions || {})
              .filter(([, count]) => Number(count) > 0)
              .map(([emoji, count]) => (
                <div
                  key={emoji}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)]"
                >
                  <span className="text-[0.8rem] leading-none">{emoji}</span>
                  <span className="text-xs font-bold text-[var(--text-primary)]">
                    {Number(count)}
                  </span>
                </div>
              ))}
          </div>
        )}

        {/* Actions */}
        <div className="relative pt-2 border-t border-[var(--border-primary)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {/* React */}
              <div ref={reactionRef} className="relative shrink-0">
                <button
                  type="button"
                  onMouseDown={handleHoldStart}
                  onMouseUp={handleHoldEnd}
                  onMouseLeave={handleHoldEnd}
                  onTouchStart={handleHoldStart}
                  onTouchEnd={handleHoldEnd}
                  onClick={() => setIsReactionMenuOpen((prev) => !prev)}
                  className={`inline-flex items-center justify-center gap-2 w-[104px] h-8 px-3 rounded-full border transition-all active:scale-95 text-[10px] font-black uppercase ${
                    userHasReacted
                      ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'bg-[var(--background-tertiary)] border-[var(--border-primary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50'
                  }`}
                >
                  <span className="w-5 flex items-center justify-center shrink-0">
                    {talk.currentUserReaction ? (
                      <span className="text-base leading-none">
                        {talk.currentUserReaction}
                      </span>
                    ) : (
                      <Smile className="w-4 h-4" />
                    )}
                  </span>
                  <span className="whitespace-nowrap">
                    {talk.currentUserReaction ? 'Reacted' : 'React'}
                  </span>
                </button>

                {isReactionMenuOpen && (
                  <div className="absolute bottom-full left-0 mb-3 p-1.5 bg-[var(--component-background)] border border-[var(--border-primary)] rounded-full shadow-[0_18px_50px_rgba(0,0,0,0.22)] dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)] flex items-center gap-1 z-[90]">
                    {MOOD_EMOJIS.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReaction(emoji);
                        }}
                        className={`w-9 h-9 flex items-center justify-center text-lg hover:scale-125 transition-transform rounded-full ${
                          talk.currentUserReaction === emoji
                            ? 'bg-purple-100 dark:bg-purple-900/30'
                            : 'hover:bg-[var(--background-tertiary)]'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Comments */}
              <button
                type="button"
                onClick={openComments}
                className="inline-flex items-center justify-center gap-2 w-[72px] h-8 px-3 rounded-full border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50 transition-all active:scale-95 text-[10px] font-black uppercase shrink-0"
                aria-label={`${displayedCommentCount} comments`}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{displayedCommentCount}</span>
              </button>

              {/* Share */}
              <div ref={shareRef} className="relative shrink-0">
                <button
                  type="button"
                  onClick={handleShareButton}
                  className="inline-flex items-center justify-center w-9 h-8 rounded-full border border-[var(--border-primary)] bg-[var(--background-tertiary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50 transition-all active:scale-95"
                  title="Share Startalk"
                  aria-label="Share Startalk"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                {isShareMenuOpen && (
                  <div className="absolute left-0 bottom-full mb-3 w-[190px] rounded-2xl border border-[var(--border-primary)] bg-[var(--component-background)] shadow-[0_20px_60px_rgba(0,0,0,0.20)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.50)] overflow-hidden z-[100]">
                    <div className="p-1.5">
                      <button
                        type="button"
                        onClick={handleNativeShare}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--background-tertiary)] transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-purple-500" />
                        <span>Share Startalk</span>
                      </button>
                      <button
                        type="button"
                        onClick={copyShareLink}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--background-tertiary)] transition-colors"
                      >
                        <Copy className="w-4 h-4 text-purple-500" />
                        <span>{shareMessage || 'Copy link'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[8.5px] text-[var(--text-muted)] font-bold uppercase tracking-widest shrink-0">
              {timeAgo(talk.timestamp)}
            </span>
          </div>
        </div>
      </article>

      {commentsModal}

      {/* Delete Comment Modal */}
      {commentToDeleteId &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-[1200] flex items-center justify-center p-4 bg-black/70 dark:bg-black/80 backdrop-blur-[7px]"
            style={{ width: '100vw', height: '100dvh' }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !commentDeleting) {
                setCommentToDeleteId(null);
              }
            }}
          >
            <div
              className="w-full max-w-[320px] bg-[var(--component-background)] border border-[var(--border-primary)] rounded-[2rem] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_80px_rgba(0,0,0,0.65)]"
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  Delete comment?
                </h3>
                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                  This comment will be permanently removed. This action cannot be
                  undone.
                </p>
              </div>
              <div className="flex border-t border-[var(--border-primary)]">
                <button
                  type="button"
                  onClick={() => setCommentToDeleteId(null)}
                  disabled={commentDeleting}
                  className="flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--background-tertiary)] border-r border-[var(--border-primary)] disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteComment}
                  disabled={commentDeleting}
                  className="flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-50"
                >
                  {commentDeleting ? 'Deleting…' : 'Delete'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export const StartalkCard: React.FC<{
  talk: Startalk;
  onDeleteRequest?: (id: string) => void;
  className?: string;
}> = (props) => (
  <StartalkErrorBoundary>
    <StartalkCardContent {...props} />
  </StartalkErrorBoundary>
);