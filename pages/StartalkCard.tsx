import React, {
  Component,
  ErrorInfo,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { Startalk } from '../types';
import { timeAgo } from '../constants';

const MOOD_EMOJIS = ['🚀', '💡', '❤️', '🔥', '💯', '😂', '😭'];

const MAX_STARTALK_WORDS = 1000;
const MAX_COMMENT_WORDS = 500;

const isMongoId = (id?: string) =>
  !!id && /^[a-f\d]{24}$/i.test(id);

/* =========================================================
   HELPERS
========================================================= */

const countWords = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return 0;
  }

  return trimmed.split(/\s+/).length;
};

const trimToWordLimit = (
  value: string,
  limit: number
) => {
  const words = value.trim().split(/\s+/);

  if (words.length <= limit) {
    return value;
  }

  return words.slice(0, limit).join(' ');
};

const getCommentId = (comment: any) =>
  String(comment?.id || comment?._id || '');

const normalizeComment = (
  comment: any
): LocalComment => {
  const authorObject =
    comment?.author ||
    comment?.user ||
    comment?.authorUser ||
    {};

  const authorName =
    comment?.authorName ||
    comment?.userName ||
    authorObject?.name ||
    'User';

  const authorId =
    comment?.authorId ||
    comment?.userId ||
    authorObject?._id ||
    authorObject?.id;

  const avatar =
    comment?.avatar ||
    comment?.authorAvatar ||
    comment?.profilePictureUrl ||
    authorObject?.profilePictureUrl ||
    authorObject?.avatar;

  const timestamp =
    comment?.timestamp ||
    comment?.createdAt ||
    comment?.updatedAt ||
    new Date().toISOString();

  return {
    id: getCommentId(comment),
    text: String(comment?.text || comment?.content || ''),
    author: String(authorName),
    authorId: authorId
      ? String(authorId)
      : undefined,
    avatar: avatar || undefined,
    timestamp,
  };
};

/* =========================================================
   RUNTIME ERROR BOUNDARY
========================================================= */

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

  static getDerivedStateFromError(
    error: Error
  ): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage:
        error?.message ||
        'An unknown runtime error occurred.',
      errorStack: error?.stack,
    };
  }

  componentDidCatch(
    error: Error,
    errorInfo: ErrorInfo
  ) {
    console.error(
      'STARTALK CARD RUNTIME ERROR:',
      error
    );

    console.error(
      'STARTALK CARD COMPONENT STACK:',
      errorInfo.componentStack
    );
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({
      hasError: false,
      errorMessage: '',
      errorStack: '',
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full rounded-2xl border border-red-500/30 bg-red-50 dark:bg-red-950/20 p-5 md:p-6 font-poppins">
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

              <div className="mt-4 rounded-xl border border-red-500/20 bg-black/5 dark:bg-black/20 p-3 overflow-auto">
                <p className="text-[11px] font-mono font-semibold text-red-600 dark:text-red-300 whitespace-pre-wrap break-words">
                  {this.state.errorMessage}
                </p>

                {this.state.errorStack && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-[10px] font-bold text-red-500 uppercase tracking-wider">
                      Show technical details
                    </summary>

                    <pre className="mt-2 text-[9px] leading-relaxed text-red-500/80 whitespace-pre-wrap break-words">
                      {this.state.errorStack}
                    </pre>
                  </details>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={this.handleReset}
                  className="px-4 py-2 rounded-full bg-[var(--component-background)] border border-[var(--border-primary)] text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)]"
                >
                  Try again
                </button>

                <button
                  type="button"
                  onClick={this.handleReload}
                  className="px-4 py-2 rounded-full bg-red-500 text-white text-[10px] font-black uppercase tracking-widest"
                >
                  Reload
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/* =========================================================
   ICONS
========================================================= */

const SmileIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z"
    />
  </svg>
);

const CommentIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.6}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.625 9.75h6.75m-6.75 3h4.125M12 21a9 9 0 1 0-8.25-5.4L3 21l5.4-.75A8.96 8.96 0 0 0 12 21Z"
    />
  </svg>
);

const ShareIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.7}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="2.2" />
    <circle cx="6" cy="12" r="2.2" />
    <circle cx="18" cy="19" r="2.2" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8 11 7.8-4.6M8 13l7.8 4.6"
    />
  </svg>
);

const CopyIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.7}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <rect
      x="8"
      y="8"
      width="11"
      height="11"
      rx="2"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
    />
  </svg>
);

const TrashIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const XMarkIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* =========================================================
   IMAGE URL
========================================================= */

const getImageUrl = (url: string) => {
  if (!url) return '';
  return url;
};

/* =========================================================
   LINK RENDERER
========================================================= */

const renderTextWithLinks = (text: string) => {
  const urlRegex =
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/;

  const parts = text.split(
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g
  );

  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      const href = part.startsWith('http')
        ? part
        : `https://${part}`;

      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={event =>
            event.stopPropagation()
          }
          className="text-purple-600 dark:text-purple-400 font-semibold underline break-all hover:text-purple-500 transition"
        >
          {part}
        </a>
      );
    }

    return (
      <span key={index}>
        {part}
      </span>
    );
  });
};

/* =========================================================
   COMMENT TYPE
========================================================= */

interface LocalComment {
  id: string;
  text: string;
  author: string;
  authorId?: string;
  avatar?: string;
  timestamp: string;
}

/* =========================================================
   STARTALK CARD
========================================================= */

const StartalkCardContent: React.FC<{
  talk: Startalk;
  onDeleteRequest?: (id: string) => void;
  className?: string;
}> = ({
  talk,
  onDeleteRequest,
  className = '',
}) => {
  const {
    reactToStartalk,
    currentUser,
    users,

    fetchStartalkComments,
    addStartalkComment,
    deleteStartalkComment,
  } = useAppContext();

  /* =======================================================
     USER DATA
  ======================================================= */

  const displayUser = users?.find(
    u =>
      String(u.id) ===
      String(talk.authorId)
  );

  const isMe =
    String(currentUser?.id) ===
    String(talk.authorId);

  const displayName =
    displayUser?.name ||
    (isMe ? currentUser?.name : null) ||
    talk.authorName ||
    'User';

  const displayAvatar =
    displayUser?.profilePictureUrl ||
    (isMe
      ? currentUser?.profilePictureUrl
      : null) ||
    talk.authorAvatar;

  const displayHeadline =
    displayUser?.headline ||
    (isMe
      ? currentUser?.headline
      : null) ||
    talk.authorHeadline ||
    'Builder';

  /* =======================================================
     REACTION STATE
  ======================================================= */

  const [
    isReactionMenuOpen,
    setIsReactionMenuOpen,
  ] = useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  const timeoutRef =
    useRef<number | null>(null);

  /* =======================================================
     COMMENT STATE
  ======================================================= */

  const [
    isCommentsOpen,
    setIsCommentsOpen,
  ] = useState(false);

  const [
    commentText,
    setCommentText,
  ] = useState('');

  const [
    comments,
    setComments,
  ] = useState<LocalComment[]>([]);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(false);

  const [
    commentSubmitting,
    setCommentSubmitting,
  ] = useState(false);

  const [
    commentToDeleteId,
    setCommentToDeleteId,
  ] = useState<string | null>(null);

  const [
    commentDeleting,
    setCommentDeleting,
  ] = useState(false);

  /* =======================================================
     SHARE STATE
  ======================================================= */

  const [
    isShareMenuOpen,
    setIsShareMenuOpen,
  ] = useState(false);

  const [
    shareMessage,
    setShareMessage,
  ] = useState('');

  const shareRef =
    useRef<HTMLDivElement>(null);

  /* =======================================================
     WORD COUNTS
  ======================================================= */

  const commentWordCount =
    countWords(commentText);

  const commentLimitReached =
    commentWordCount >=
    MAX_COMMENT_WORDS;

  /* =======================================================
     INITIALS
  ======================================================= */

  const initials =
    displayName
      ?.split(' ')
      .map(n => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'UU';

  /* =======================================================
     TOTAL REACTIONS
  ======================================================= */

  const totalReactions =
    Object.values(
      talk.reactions || {}
    ).reduce<number>(
      (sum, count) =>
        sum + (count as number),
      0
    );

  const userHasReacted =
    !!talk.currentUserReaction;

  const isOwner =
    String(currentUser?.id) ===
    String(talk.authorId);

  const profileClickable =
    isMongoId(talk.authorId);

  /* =======================================================
     COMMENT COUNT
  ======================================================= */

  const commentCount =
    comments.length;

  /*
   * If your backend returns commentCount on Startalk,
   * use that as initial value.
   *
   * This also keeps the UI compatible with the current
   * Startalk type until backend aggregation is added.
   */
  const backendCommentCount =
    Number(
      (talk as any).commentCount ??
        (talk as any).commentsCount ??
        0
    );

  const displayedCommentCount =
    comments.length > 0
      ? commentCount
      : backendCommentCount;

  /* =======================================================
     LOAD COMMENTS
  ======================================================= */

  const loadComments = async () => {
    setCommentsLoading(true);

    try {
      const result =
        await fetchStartalkComments(
          talk.id
        );

      const normalized =
        Array.isArray(result)
          ? result
              .map(normalizeComment)
              .filter(comment => !!comment.id)
          : [];

      setComments(normalized);

    } catch (error) {
      console.error(
        'Loading comments failed:',
        error
      );

      setComments([]);

    } finally {
      setCommentsLoading(false);
    }
  };

  /* =======================================================
     OPEN COMMENTS
  ======================================================= */

  const openComments = async () => {
    setIsCommentsOpen(true);
    setIsShareMenuOpen(false);

    /*
     * Do not focus input.
     * This intentionally prevents mobile keyboard
     * from opening automatically.
     */
    await loadComments();
  };

  /* =======================================================
     CLOSE COMMENTS
  ======================================================= */

  const closeComments = () => {
    setIsCommentsOpen(false);
    setCommentText('');
    setCommentToDeleteId(null);
    setCommentsLoading(false);
  };

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (!isCommentsOpen) {
      return;
    }

    const originalOverflow =
      document.body.style.overflow;

    const originalTouchAction =
      document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow =
        originalOverflow;

      document.body.style.touchAction =
        originalTouchAction;
    };
  }, [isCommentsOpen]);

  /* =======================================================
     ESCAPE KEY
  ======================================================= */

  useEffect(() => {
    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key !== 'Escape') {
        return;
      }

      if (isCommentsOpen) {
        closeComments();
      }

      if (isShareMenuOpen) {
        setIsShareMenuOpen(false);
      }

      if (isReactionMenuOpen) {
        setIsReactionMenuOpen(false);
      }
    };

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () =>
      document.removeEventListener(
        'keydown',
        handleEscape
      );
  }, [
    isCommentsOpen,
    isShareMenuOpen,
    isReactionMenuOpen,
  ]);

  /* =======================================================
     REACTION OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target as Node
        )
      ) {
        setIsReactionMenuOpen(false);
      }

      if (
        shareRef.current &&
        !shareRef.current.contains(
          event.target as Node
        )
      ) {
        setIsShareMenuOpen(false);
      }
    };

    document.addEventListener(
      'mousedown',
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        'mousedown',
        handleClickOutside
      );
  }, []);

  /* =======================================================
     REACTION
  ======================================================= */

  const handleReaction = (
    emoji: string
  ) => {
    reactToStartalk(
      talk.id,
      emoji
    );

    setIsReactionMenuOpen(false);
  };

  /* =======================================================
     LONG PRESS
  ======================================================= */

  const handleHoldStart = () => {
    if (timeoutRef.current) {
      window.clearTimeout(
        timeoutRef.current
      );
    }

    timeoutRef.current =
      window.setTimeout(() => {
        setIsReactionMenuOpen(true);
      }, 450);
  };

  const handleHoldEnd = () => {
    if (timeoutRef.current) {
      window.clearTimeout(
        timeoutRef.current
      );

      timeoutRef.current = null;
    }
  };

  /* =======================================================
     ADD COMMENT
  ======================================================= */

  const handleAddComment = async () => {
    const text =
      commentText.trim();

    if (!text) {
      return;
    }

    if (
      countWords(text) >
      MAX_COMMENT_WORDS
    ) {
      return;
    }

    if (!currentUser) {
      return;
    }

    setCommentSubmitting(true);

    try {
      const created =
        await addStartalkComment(
          talk.id,
          text
        );

      if (!created) {
        return;
      }

      const normalized =
        normalizeComment(created);

      /*
       * If backend somehow doesn't return an id,
       * generate a safe temporary one.
       */
      if (!normalized.id) {
        normalized.id =
          `${Date.now()}-${Math.random()
            .toString(36)
            .slice(2)}`;
      }

      setComments(prev => [
        ...prev,
        normalized,
      ]);

      setCommentText('');

    } catch (error) {
      console.error(
        'Add comment failed:',
        error
      );

    } finally {
      setCommentSubmitting(false);
    }
  };

  /* =======================================================
     COMMENT INPUT
  ======================================================= */

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value;

    if (
      countWords(value) >
      MAX_COMMENT_WORDS
    ) {
      setCommentText(
        trimToWordLimit(
          value,
          MAX_COMMENT_WORDS
        )
      );

      return;
    }

    setCommentText(value);
  };

  const handleCommentKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey
    ) {
      event.preventDefault();

      if (
        !commentSubmitting &&
        commentText.trim()
      ) {
        handleAddComment();
      }
    }
  };

  /* =======================================================
     DELETE COMMENT
  ======================================================= */

  const requestDeleteComment = (
    commentId: string
  ) => {
    setCommentToDeleteId(
      commentId
    );
  };

  const cancelDeleteComment = () => {
    if (commentDeleting) {
      return;
    }

    setCommentToDeleteId(null);
  };

  const confirmDeleteComment =
    async () => {
      if (!commentToDeleteId) {
        return;
      }

      setCommentDeleting(true);

      try {
        const success =
          await deleteStartalkComment(
            commentToDeleteId
          );

        if (success) {
          setComments(prev =>
            prev.filter(
              comment =>
                comment.id !==
                commentToDeleteId
            )
          );

          setCommentToDeleteId(null);
        }

      } catch (error) {
        console.error(
          'Delete comment failed:',
          error
        );

      } finally {
        setCommentDeleting(false);
      }
    };

  /* =======================================================
     SHARE
  ======================================================= */

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') {
      return '';
    }

    return `${window.location.origin}/startalk/${talk.id}`;
  }, [talk.id]);

  const shareTitle =
    `${displayName} on Startives`;

  const shareText =
    talk.content.length > 180
      ? `${talk.content.slice(0, 180)}…`
      : talk.content;

  const copyShareLink = async () => {
    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard.writeText(
          shareUrl
        );
      } else {
        const textarea =
          document.createElement('textarea');

        textarea.value = shareUrl;

        textarea.style.position =
          'fixed';

        textarea.style.opacity = '0';

        document.body.appendChild(
          textarea
        );

        textarea.focus();
        textarea.select();

        document.execCommand('copy');

        document.body.removeChild(
          textarea
        );
      }

      setShareMessage('Link copied');

      window.setTimeout(() => {
        setShareMessage('');
      }, 1800);

    } catch (error) {
      console.error(
        'Copy share link failed:',
        error
      );

      setShareMessage(
        'Unable to copy'
      );

      window.setTimeout(() => {
        setShareMessage('');
      }, 1800);
    }
  };

  const handleNativeShare =
    async () => {
      try {
        if (
          navigator.share
        ) {
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
        /*
         * AbortError simply means the user closed
         * the native share sheet.
         */
        if (
          error?.name ===
          'AbortError'
        ) {
          return;
        }

        console.error(
          'Native share failed:',
          error
        );

        await copyShareLink();
      }
    };

  const handleShareButton = () => {
    setIsReactionMenuOpen(false);

    /*
     * On mobile devices supporting Web Share API,
     * open native share directly.
     *
     * Otherwise show our fallback menu.
     */
    if (
      typeof navigator !== 'undefined' &&
      typeof navigator.share === 'function'
    ) {
      handleNativeShare();

      return;
    }

    setIsShareMenuOpen(
      prev => !prev
    );
  };

  /* =======================================================
     SHARE MENU
  ======================================================= */

  const openShareMenuFallback =
    () => {
      setIsShareMenuOpen(true);
      setIsReactionMenuOpen(false);
    };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <>
      {/* =================================================
          STARTALK CARD
      ================================================= */}

      <article
        className={`
          w-full
          bg-[var(--component-background)]
          rounded-2xl
          border border-[var(--border-primary)]
          p-5 md:p-6
          transition-all duration-300
          hover:border-purple-500/30
          group
          flex flex-col
          gap-4
          select-none
          font-poppins
          relative
          ${className}
        `}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
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

            <div className="overflow-hidden text-left min-w-0">
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
                {displayHeadline || 'Builder'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)] text-[10px] font-black uppercase text-[var(--text-muted)] h-fit">
              <SmileIcon className="w-3.5 h-3.5 text-purple-500" />

              <span className="text-[var(--text-primary)]">
                {totalReactions}
              </span>
            </div>

            {isOwner &&
              onDeleteRequest && (
                <button
                  type="button"
                  onClick={() =>
                    onDeleteRequest(
                      talk.id
                    )
                  }
                  className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 hover:scale-110 transition-transform border border-red-200 dark:border-red-800/30"
                  title="Delete talk"
                  aria-label="Delete talk"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              )}
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div className="space-y-4 text-left">
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-medium whitespace-pre-wrap break-words">
            {renderTextWithLinks(
              talk.content
            )}
          </p>

          {talk.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-[var(--border-primary)] bg-[var(--background-tertiary)]">
              <img
                src={getImageUrl(
                  talk.imageUrl
                )}
                alt="Post attachment"
                className="w-full h-auto object-cover max-h-[400px]"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* =================================================
            REACTION BREAKDOWN
        ================================================= */}

        {totalReactions > 0 && (
          <div className="flex items-center gap-3 flex-wrap text-sm">
            {Object.entries(
              talk.reactions || {}
            )
              .filter(
                ([, count]) =>
                  (count as number) > 0
              )
              .map(
                ([emoji, count]) => (
                  <div
                    key={emoji}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)]"
                  >
                    <span>{emoji}</span>

                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {count as number}
                    </span>
                  </div>
                )
              )}
          </div>
        )}

        {/* =================================================
            ACTION ROW
        ================================================= */}

        <div className="relative flex flex-col gap-3 pt-2 border-t border-[var(--border-primary)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              {/* =========================================
                  REACT
              ========================================= */}

              <div className="relative shrink-0">
                <button
                  type="button"
                  onMouseDown={
                    handleHoldStart
                  }
                  onMouseUp={
                    handleHoldEnd
                  }
                  onMouseLeave={
                    handleHoldEnd
                  }
                  onTouchStart={
                    handleHoldStart
                  }
                  onTouchEnd={
                    handleHoldEnd
                  }
                  onClick={() =>
                    setIsReactionMenuOpen(
                      prev => !prev
                    )
                  }
                  className={`
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-1.5
                    rounded-full
                    border
                    transition-all
                    active:scale-95
                    group/pill
                    select-none
                    touch-none
                    text-[10px]
                    font-black
                    uppercase
                    ${
                      userHasReacted
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'bg-[var(--background-tertiary)] border-[var(--border-primary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50'
                    }
                  `}
                >
                  {talk.currentUserReaction ? (
                    <span className="text-base leading-none">
                      {
                        talk.currentUserReaction
                      }
                    </span>
                  ) : (
                    <SmileIcon className="w-4 h-4 transition-colors group-hover/pill:text-purple-600" />
                  )}

                  <span>
                    {talk.currentUserReaction
                      ? 'Reacted'
                      : 'React'}
                  </span>
                </button>

                {isReactionMenuOpen && (
                  <div
                    ref={menuRef}
                    className="
                      absolute
                      bottom-full
                      left-0
                      mb-3
                      p-1.5
                      bg-[var(--component-background)]
                      border
                      border-[var(--border-primary)]
                      rounded-full
                      shadow-[0_18px_50px_rgba(0,0,0,0.18)]
                      dark:shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                      flex
                      items-center
                      gap-1
                      z-[80]
                      animate-in
                      slide-in-from-bottom-2
                      duration-200
                    "
                  >
                    {MOOD_EMOJIS.map(
                      emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={event => {
                            event.stopPropagation();

                            handleReaction(
                              emoji
                            );
                          }}
                          className={`
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            text-lg
                            hover:scale-125
                            transition-transform
                            hover:bg-[var(--background-tertiary)]
                            rounded-full
                            ${
                              talk.currentUserReaction ===
                              emoji
                                ? 'bg-purple-100 dark:bg-purple-900/30'
                                : ''
                            }
                          `}
                        >
                          {emoji}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* =========================================
                  COMMENTS
              ========================================= */}

              <button
                type="button"
                onClick={openComments}
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-4
                  py-1.5
                  rounded-full
                  border
                  border-purple-500/25
                  bg-purple-500/[0.06]
                  dark:bg-purple-500/[0.10]
                  text-purple-600
                  dark:text-purple-400
                  hover:bg-purple-500/[0.12]
                  hover:border-purple-500/50
                  transition-all
                  active:scale-95
                  text-[10px]
                  font-black
                  uppercase
                  shrink-0
                "
              >
                <CommentIcon className="w-4 h-4" />

                <span>
                  {displayedCommentCount}
                </span>
              </button>

              {/* =========================================
                  SHARE
              ========================================= */}

              <div
                ref={shareRef}
                className="relative shrink-0"
              >
                <button
                  type="button"
                  onClick={
                    handleShareButton
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    w-9
                    h-8
                    rounded-full
                    border
                    border-[var(--border-primary)]
                    bg-[var(--background-tertiary)]
                    text-[var(--text-muted)]
                    hover:text-purple-600
                    hover:border-purple-500/50
                    transition-all
                    active:scale-95
                  "
                  title="Share Startalk"
                  aria-label="Share Startalk"
                >
                  <ShareIcon className="w-4 h-4" />
                </button>

                {isShareMenuOpen && (
                  <div
                    className="
                      absolute
                      left-0
                      bottom-full
                      mb-3
                      w-[190px]
                      rounded-2xl
                      border
                      border-[var(--border-primary)]
                      bg-[var(--component-background)]
                      shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                      dark:shadow-[0_20px_60px_rgba(0,0,0,0.48)]
                      overflow-hidden
                      z-[90]
                      animate-in
                      fade-in
                      zoom-in-95
                      duration-150
                    "
                  >
                    <div className="p-1.5">
                      <button
                        type="button"
                        onClick={
                          handleNativeShare
                        }
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2.5
                          rounded-xl
                          text-left
                          text-xs
                          font-semibold
                          text-[var(--text-primary)]
                          hover:bg-[var(--background-tertiary)]
                          transition-colors
                        "
                      >
                        <ShareIcon className="w-4 h-4 text-purple-500" />

                        <span>
                          Share Startalk
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={
                          copyShareLink
                        }
                        className="
                          w-full
                          flex
                          items-center
                          gap-3
                          px-3
                          py-2.5
                          rounded-xl
                          text-left
                          text-xs
                          font-semibold
                          text-[var(--text-primary)]
                          hover:bg-[var(--background-tertiary)]
                          transition-colors
                        "
                      >
                        <CopyIcon className="w-4 h-4 text-purple-500" />

                        <span>
                          {shareMessage ||
                            'Copy link'}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest font-poppins shrink-0">
              {timeAgo(
                talk.timestamp
              )}
            </span>
          </div>
        </div>
      </article>

      {/* =================================================
          COMMENTS MODAL
      ================================================= */}

      {isCommentsOpen && (
        <div
          className="
            fixed
            inset-0
            z-[1100]
            flex
            items-center
            justify-center
            px-3
            py-4
            sm:px-4
            sm:py-6
            bg-black/70
            dark:bg-black/80
            backdrop-blur-[7px]
            overscroll-none
            animate-in
            fade-in
            duration-200
          "
          style={{
            paddingTop:
              'max(1rem, env(safe-area-inset-top))',
            paddingBottom:
              'max(1rem, env(safe-area-inset-bottom))',
          }}
          onMouseDown={event => {
            if (
              event.target ===
              event.currentTarget
            ) {
              closeComments();
            }
          }}
        >
          <div
            className="
              w-full
              max-w-[520px]
              h-[76vh]
              max-h-[650px]
              min-h-[430px]
              bg-[var(--component-background)]
              border
              border-[var(--border-primary)]
              rounded-[1.75rem]
              sm:rounded-[2rem]
              shadow-[0_30px_100px_rgba(0,0,0,0.30)]
              dark:shadow-[0_30px_100px_rgba(0,0,0,0.65)]
              overflow-hidden
              flex
              flex-col
              animate-in
              zoom-in-95
              duration-200
              font-poppins
              relative
            "
            onMouseDown={event =>
              event.stopPropagation()
            }
          >
            {/* =========================================
                HEADER
            ========================================= */}

            <div className="
              flex
              items-center
              justify-between
              px-5
              md:px-6
              py-4
              border-b
              border-[var(--border-primary)]
              shrink-0
              bg-[var(--component-background)]
            ">
              <div className="min-w-0">
                <h3 className="text-base md:text-lg font-bold text-[var(--text-primary)] tracking-tight">
                  Comments
                </h3>

                <p className="text-[10px] text-[var(--text-muted)] font-medium mt-0.5">
                  {displayedCommentCount > 0
                    ? `${displayedCommentCount} ${
                        displayedCommentCount === 1
                          ? 'comment'
                          : 'comments'
                      }`
                    : 'Join the conversation'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeComments}
                className="
                  w-8
                  h-8
                  rounded-full
                  flex
                  items-center
                  justify-center
                  bg-[var(--background-tertiary)]
                  border
                  border-[var(--border-primary)]
                  text-[var(--text-muted)]
                  hover:text-[var(--text-primary)]
                  hover:border-purple-500/40
                  transition-all
                  active:scale-95
                  shrink-0
                "
                aria-label="Close comments"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>

            {/* =========================================
                COMMENT LIST
            ========================================= */}

            <div
              className="
                flex-1
                overflow-y-auto
                overscroll-contain
                px-5
                md:px-6
                py-5
                min-h-0
                scrollbar-thin
              "
            >
              {commentsLoading ? (
                <div className="
                  h-full
                  min-h-[260px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                ">
                  <div className="
                    w-10
                    h-10
                    rounded-full
                    border-2
                    border-purple-500/20
                    border-t-purple-500
                    animate-spin
                  />

                  <p className="
                    mt-3
                    text-xs
                    font-semibold
                    text-[var(--text-muted)]
                  ">
                    Loading comments…
                  </p>
                </div>
              ) : comments.length === 0 ? (
                <div className="
                  h-full
                  min-h-[260px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                ">
                  <div className="
                    w-11
                    h-11
                    rounded-full
                    bg-purple-500/[0.07]
                    dark:bg-purple-500/[0.12]
                    border
                    border-purple-500/20
                    flex
                    items-center
                    justify-center
                    mb-3
                    text-purple-500
                  ">
                    <CommentIcon className="w-5 h-5" />
                  </div>

                  <p className="
                    text-xs
                    font-bold
                    text-[var(--text-primary)]
                  ">
                    No comments yet
                  </p>

                  <p className="
                    text-[10px]
                    text-[var(--text-muted)]
                    mt-1
                  ">
                    Be the first to share your thoughts.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  {comments.map(
                    comment => {
                      const isCommentOwner =
                        String(
                          currentUser?.id
                        ) ===
                        String(
                          comment.authorId
                        );

                      const commentInitials =
                        comment.author
                          ?.split(' ')
                          .map(
                            name =>
                              name[0]
                          )
                          .join('')
                          .substring(
                            0,
                            2
                          )
                          .toUpperCase() ||
                        'U';

                      return (
                        <div
                          key={
                            comment.id
                          }
                          className="
                            flex
                            items-start
                            gap-3
                          "
                        >
                          {/* AVATAR */}

                          {comment.avatar ? (
                            <img
                              src={
                                comment.avatar
                              }
                              alt={
                                comment.author
                              }
                              className="
                                w-9
                                h-9
                                rounded-full
                                object-cover
                                border
                                border-[var(--border-primary)]
                                shrink-0
                              "
                            />
                          ) : (
                            <div className="
                              w-9
                              h-9
                              rounded-full
                              icon-bg-gradient
                              flex
                              items-center
                              justify-center
                              text-white
                              text-[10px]
                              font-bold
                              shrink-0
                            ">
                              {
                                commentInitials
                              }
                            </div>
                          )}

                          {/* COMMENT */}

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="
                                text-xs
                                font-bold
                                text-[var(--text-primary)]
                                truncate
                              ">
                                {
                                  comment.author
                                }
                              </span>

                              <span className="
                                text-[9px]
                                text-[var(--text-muted)]
                                font-medium
                                shrink-0
                              ">
                                {timeAgo(
                                  comment.timestamp
                                )}
                              </span>
                            </div>

                            <p className="
                              mt-1
                              text-xs
                              md:text-sm
                              text-[var(--text-secondary)]
                              leading-relaxed
                              break-words
                              whitespace-pre-wrap
                            ">
                              {
                                comment.text
                              }
                            </p>
                          </div>

                          {/* DELETE */}

                          {isCommentOwner && (
                            <button
                              type="button"
                              onClick={() =>
                                requestDeleteComment(
                                  comment.id
                                )
                              }
                              className="
                                p-1.5
                                rounded-full
                                text-[var(--text-muted)]
                                hover:text-red-500
                                hover:bg-red-50
                                dark:hover:bg-red-950/20
                                transition-colors
                                shrink-0
                              "
                              title="Delete comment"
                              aria-label="Delete comment"
                            >
                              <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>

            {/* =========================================
                COMMENT COMPOSER
            ========================================= */}

            <div className="
              px-5
              md:px-6
              py-4
              border-t
              border-[var(--border-primary)]
              bg-[var(--component-background)]
              shrink-0
            ">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={commentText}
                  maxLength={5000}
                  onChange={
                    handleCommentChange
                  }
                  onKeyDown={
                    handleCommentKeyDown
                  }
                  placeholder="Write a comment..."
                  disabled={
                    commentSubmitting
                  }
                  className="
                    flex-1
                    min-w-0
                    h-10
                    px-4
                    rounded-full
                    bg-[var(--background-tertiary)]
                    border
                    border-[var(--border-primary)]
                    text-xs
                    md:text-sm
                    text-[var(--text-primary)]
                    placeholder-[var(--text-muted)]
                    focus:outline-none
                    focus:border-purple-500/60
                    focus:ring-2
                    focus:ring-purple-500/10
                    transition-all
                    font-poppins
                    disabled:opacity-60
                  "
                />

                <button
                  type="button"
                  onClick={
                    handleAddComment
                  }
                  disabled={
                    !commentText.trim() ||
                    commentSubmitting ||
                    commentWordCount >
                      MAX_COMMENT_WORDS
                  }
                  className="
                    h-10
                    px-4
                    md:px-5
                    rounded-full
                    button-gradient
                    text-white
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    transition-all
                    active:scale-95
                    shrink-0
                  "
                >
                  {commentSubmitting
                    ? '...'
                    : 'Post'}
                </button>
              </div>

              <div className="
                flex
                items-center
                justify-between
                mt-2
                px-1
              ">
                <span className="
                  text-[9px]
                  text-[var(--text-muted)]
                ">
                  Press Enter to post
                </span>

                <span
                  className={`
                    text-[9px]
                    font-semibold
                    ${
                      commentLimitReached
                        ? 'text-red-500'
                        : 'text-[var(--text-muted)]'
                    }
                  `}
                >
                  {commentWordCount}/
                  {MAX_COMMENT_WORDS}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =================================================
          DELETE COMMENT CONFIRMATION
      ================================================= */}

      {commentToDeleteId && (
        <div
          className="
            fixed
            inset-0
            z-[1200]
            flex
            items-center
            justify-center
            p-4
            bg-black/70
            dark:bg-black/80
            backdrop-blur-[7px]
            animate-in
            fade-in
            duration-200
          "
          onMouseDown={event => {
            if (
              event.target ===
              event.currentTarget &&
              !commentDeleting
            ) {
              cancelDeleteComment();
            }
          }}
        >
          <div
            className="
              bg-[var(--component-background)]
              border
              border-[var(--border-primary)]
              rounded-[2rem]
              w-full
              max-w-[320px]
              overflow-hidden
              shadow-[0_25px_80px_rgba(0,0,0,0.30)]
              dark:shadow-[0_25px_80px_rgba(0,0,0,0.65)]
              animate-in
              zoom-in-95
              duration-200
              flex
              flex-col
              font-poppins
            "
            onMouseDown={event =>
              event.stopPropagation()
            }
          >
            <div className="p-6 text-center">
              <div className="
                w-12
                h-12
                rounded-full
                bg-red-100
                dark:bg-red-900/30
                text-red-500
                flex
                items-center
                justify-center
                mx-auto
                mb-4
              ">
                <TrashIcon className="w-6 h-6" />
              </div>

              <h3 className="
                text-lg
                font-bold
                text-[var(--text-primary)]
                mb-2
                tracking-tight
              ">
                Delete comment?
              </h3>

              <p className="
                text-xs
                text-[var(--text-muted)]
                font-medium
                leading-relaxed
              ">
                This comment will be permanently removed. This action cannot be undone.
              </p>
            </div>

            <div className="
              flex
              border-t
              border-[var(--border-primary)]
            ">
              <button
                type="button"
                onClick={
                  cancelDeleteComment
                }
                disabled={
                  commentDeleting
                }
                className="
                  flex-1
                  px-4
                  py-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-[var(--text-muted)]
                  hover:bg-[var(--background-tertiary)]
                  transition-colors
                  border-r
                  border-[var(--border-primary)]
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={
                  confirmDeleteComment
                }
                disabled={
                  commentDeleting
                }
                className="
                  flex-1
                  px-4
                  py-4
                  text-[10px]
                  font-black
                  uppercase
                  tracking-widest
                  text-red-500
                  hover:bg-red-50
                  dark:hover:bg-red-950/20
                  transition-colors
                  disabled:opacity-50
                "
              >
                {commentDeleting
                  ? 'Deleting…'
                  : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* =========================================================
   PUBLIC STARTALK CARD
========================================================= */

export const StartalkCard: React.FC<{
  talk: Startalk;
  onDeleteRequest?: (id: string) => void;
  className?: string;
}> = props => {
  return (
    <StartalkErrorBoundary>
      <StartalkCardContent
        {...props}
      />
    </StartalkErrorBoundary>
  );
};