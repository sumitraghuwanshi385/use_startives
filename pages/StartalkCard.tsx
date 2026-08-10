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

const MOOD_EMOJIS = [
  '🚀',
  '💡',
  '❤️',
  '🔥',
  '💯',
  '😂',
  '😭',
];

export const MAX_STARTALK_WORDS = 1000;
export const MAX_COMMENT_LENGTH = 500;

const isMongoId = (id?: string) =>
  !!id && /^[a-f\d]{24}$/i.test(id);

/* =========================================================
   HELPERS
========================================================= */

const countCharacters = (value: string) =>
  value.length;

const trimToCharacterLimit = (
  value: string,
  limit: number
) => {
  if (value.length <= limit) {
    return value;
  }

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

/*
 * IMPORTANT:
 *
 * Backend formatComment() returns:
 *
 * {
 *   id,
 *   authorId,
 *   author: "Apives",
 *   avatar: "...",
 *   headline: "...",
 *   text: "..."
 * }
 *
 * Earlier frontend code treated `author` like an object.
 * That caused:
 *
 * author = "User"
 *
 * even though backend was correctly returning the real name.
 */

const normalizeComment = (
  comment: any
): LocalComment => {
  const source =
    comment?.comment ||
    comment?.data ||
    comment ||
    {};

  const authorObject =
    source?.user &&
    typeof source.user === 'object'
      ? source.user
      : source?.author &&
        typeof source.author === 'object'
      ? source.author
      : source?.authorUser &&
        typeof source.authorUser === 'object'
      ? source.authorUser
      : {};

  const authorId =
    source?.authorId ||
    source?.userId ||
    authorObject?.id ||
    authorObject?._id;

  /*
   * FIX:
   *
   * Backend sends author as STRING:
   *
   * author: "Apives"
   *
   * So explicitly support string author.
   */
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

  const resolvedHeadline =
    source?.headline ||
    authorObject?.headline ||
    'Builder';

  return {
    id: String(
      source?.id ||
        source?._id ||
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2)}`
    ),

    text: String(
      source?.text ||
        source?.content ||
        ''
    ),

    author: String(
      resolvedAuthor
    ),

    authorId: authorId
      ? String(authorId)
      : undefined,

    avatar: resolvedAvatar,

    headline:
      resolvedHeadline,

    timestamp:
      source?.timestamp ||
      source?.createdAt ||
      source?.updatedAt ||
      new Date().toISOString(),
  };
};

/*
 * Get the best available comment count from the Startalk.
 *
 * Supports multiple backend/frontend field names so the card
 * does not fall back to 0 when another valid count exists.
 */
const getStartalkCommentCount = (
  talk: any
): number => {
  if (
    Array.isArray(talk?.comments)
  ) {
    return talk.comments.length;
  }

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
      return Math.max(
        0,
        Number(value)
      );
    }
  }

  return 0;
};

/* =========================================================
   ERROR BOUNDARY
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
      'STARTALK CARD ERROR:',
      error
    );

    console.error(
      'STARTALK COMPONENT STACK:',
      errorInfo.componentStack
    );
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
                  <details className="mt-2">
                    <summary className="cursor-pointer text-[10px] font-bold text-red-500 uppercase tracking-wider">
                      Technical details
                    </summary>

                    <pre className="mt-2 text-[9px] leading-relaxed text-red-500/80 whitespace-pre-wrap break-words">
                      {this.state.errorStack}
                    </pre>
                  </details>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
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

/* =========================================================
   ICONS
========================================================= */

const SmileIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.18 15.18a4.5 4.5 0 0 1-6.36 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75h.01M14.25 9.75h.01"
    />
  </svg>
);

const CommentIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.35 9m-4.78 0L9.26 9m9.97-3.21c.34.05.68.1 1.02.16M19.23 5.79 18.16 19.67a2.25 2.25 0 0 1-2.24 2.08H8.08a2.25 2.25 0 0 1-2.24-2.08L4.77 5.79m14.46 0a48.1 48.1 0 0 0-3.48-.4m-12.56 0c.34-.06.68-.11 1.02-.16m0 0a48.1 48.1 0 0 1 3.48-.4m7.5 0v-.92c0-1.18-.91-2.16-2.09-2.2a52 52 0 0 0-3.32 0c-1.18.04-2.09 1.02-2.09 2.2v.92"
    />
  </svg>
);

const XMarkIcon: React.FC<{
  className?: string;
}> = ({
  className = 'w-4 h-4',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

/* =========================================================
   LINKS
========================================================= */

const renderTextWithLinks = (
  text: string
) => {
  const parts = text.split(
    /(https?:\/\/[^\s]+|www\.[^\s]+|[a-zA-Z0-9-]+\.[a-zA-Z]{2,})/g
  );

  const urlRegex =
    /^(https?:\/\/|www\.)|^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  return parts.map(
    (part, index) => {
      if (urlRegex.test(part)) {
        const href =
          part.startsWith('http')
            ? part
            : `https://${part}`;

        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e =>
              e.stopPropagation()
            }
            className="text-purple-600 dark:text-purple-400 font-semibold underline break-all hover:text-purple-500"
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
    }
  );
};

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
  const app =
    useAppContext() as any;

  const {
    reactToStartalk,
    currentUser,
    users,
    fetchStartalkComments,
    addStartalkComment,
    deleteStartalkComment,
  } = app;

  /* =======================================================
     USER
  ======================================================= */

  const displayUser =
    users?.find(
      (u: any) =>
        String(u.id) ===
        String(talk.authorId)
    );

  const isMe =
    String(currentUser?.id) ===
    String(talk.authorId);

  const displayName =
    displayUser?.name ||
    (isMe
      ? currentUser?.name
      : null) ||
    talk.authorName ||
    (talk as any).author ||
    'User';

  const displayAvatar =
    displayUser?.profilePictureUrl ||
    displayUser?.avatar ||
    (isMe
      ? currentUser?.profilePictureUrl ||
        currentUser?.avatar
      : null) ||
    talk.authorAvatar ||
    (talk as any).profilePictureUrl;

  const displayHeadline =
    displayUser?.headline ||
    (isMe
      ? currentUser?.headline
      : null) ||
    talk.authorHeadline ||
    'Builder';

  const initials =
    String(displayName)
      .split(' ')
      .map(
        (name: string) =>
          name[0]
      )
      .join('')
      .substring(0, 2)
      .toUpperCase() || 'UU';

  const isOwner =
    String(currentUser?.id) ===
    String(talk.authorId);

  const profileClickable =
    isMongoId(
      talk.authorId
    );

  /* =======================================================
     REACTION
  ======================================================= */

  const [
    isReactionMenuOpen,
    setIsReactionMenuOpen,
  ] = useState(false);

  const reactionRef =
    useRef<HTMLDivElement>(null);

  const holdTimeout =
    useRef<number | null>(null);

  const totalReactions =
    Object.values(
      talk.reactions || {}
    ).reduce<number>(
      (sum, count) =>
        sum + Number(count),
      0
    );

  const userHasReacted =
    !!talk.currentUserReaction;

  const handleReaction = (
    emoji: string
  ) => {
    reactToStartalk(
      talk.id,
      emoji
    );

    setIsReactionMenuOpen(false);
  };

  const handleHoldStart = () => {
    if (holdTimeout.current) {
      window.clearTimeout(
        holdTimeout.current
      );
    }

    holdTimeout.current =
      window.setTimeout(() => {
        setIsReactionMenuOpen(true);
      }, 450);
  };

  const handleHoldEnd = () => {
    if (holdTimeout.current) {
      window.clearTimeout(
        holdTimeout.current
      );

      holdTimeout.current = null;
    }
  };

  /* =======================================================
     COMMENTS
  ======================================================= */

  const [
    isCommentsOpen,
    setIsCommentsOpen,
  ] = useState(false);

  const [
    comments,
    setComments,
  ] = useState<LocalComment[]>([]);

  const [
    commentsLoading,
    setCommentsLoading,
  ] = useState(false);

  const [
    commentText,
    setCommentText,
  ] = useState('');

  const [
    commentSubmitting,
    setCommentSubmitting,
  ] = useState(false);

  const [
    commentToDeleteId,
    setCommentToDeleteId,
  ] = useState<string | null>(
    null
  );

  const [
    commentDeleting,
    setCommentDeleting,
  ] = useState(false);

  /*
   * FIX #2:
   *
   * Keep the count independently at card level.
   *
   * This means opening comments is NOT required to know
   * the count.
   */
  const [
    commentCount,
    setCommentCount,
  ] = useState<number>(() =>
    getStartalkCommentCount(
      talk
    )
  );

  /*
   * Sync count when the actual Startalk changes.
   *
   * IMPORTANT:
   * This does NOT depend on reactions or other local card
   * interactions.
   */
  useEffect(() => {
    const incomingCount =
      getStartalkCommentCount(
        talk
      );

    setCommentCount(
      incomingCount
    );
  }, [
    talk.id,
    (talk as any).commentCount,
    (talk as any).commentsCount,
    (talk as any).comment_count,
    Array.isArray(
      (talk as any).comments
    )
      ? (talk as any).comments.length
      : undefined,
  ]);

  const displayedCommentCount =
    comments.length > 0
      ? comments.length
      : commentCount;

  const commentCharacterCount =
    countCharacters(commentText);

  /* =======================================================
     LOAD COMMENTS
  ======================================================= */

  const loadComments =
    async () => {
      if (
        typeof fetchStartalkComments !==
        'function'
      ) {
        console.error(
          'fetchStartalkComments is not available in AppContext.'
        );

        return;
      }

      setCommentsLoading(true);

      try {
        const result =
          await fetchStartalkComments(
            talk.id
          );

        const source =
          Array.isArray(result)
            ? result
            : Array.isArray(
                result?.comments
              )
            ? result.comments
            : Array.isArray(
                result?.data
              )
            ? result.data
            : [];

        const normalized =
          source
            .map(normalizeComment)
            .filter(
              comment =>
                !!comment.id
            );

        setComments(
          normalized
        );

        /*
         * Backend is now the source of truth.
         *
         * This fixes:
         * 3 comments -> refresh -> 0
         */
        setCommentCount(
          normalized.length
        );
      } catch (error) {
        console.error(
          'Loading Startalk comments failed:',
          error
        );

        /*
         * Don't destroy the existing count if the
         * comments request temporarily fails.
         */
      } finally {
        setCommentsLoading(false);
      }
    };

  /* =======================================================
     OPEN COMMENTS
  ======================================================= */

  const openComments =
    async () => {
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

  /* =======================================================
     COMMENT INPUT
  ======================================================= */

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value =
      event.target.value;

    setCommentText(
      trimToCharacterLimit(
        value,
        MAX_COMMENT_LENGTH
      )
    );
  };

  /* =======================================================
     ADD COMMENT
  ======================================================= */

  const handleAddComment =
    async () => {
      const text =
        commentText.trim();

      if (
        !text ||
        !currentUser ||
        commentSubmitting
      ) {
        return;
      }

      if (
        text.length >
        MAX_COMMENT_LENGTH
      ) {
        return;
      }

      if (
        typeof addStartalkComment !==
        'function'
      ) {
        console.error(
          'addStartalkComment is not available in AppContext.'
        );

        return;
      }

      setCommentSubmitting(true);

      try {
        const created =
          await addStartalkComment(
            talk.id,
            text
          );

        if (created === false) {
          throw new Error(
            'Backend rejected the comment.'
          );
        }

        /*
         * Always reload Mongo data.
         */
        await loadComments();

        setCommentText('');
      } catch (error) {
        console.error(
          'Adding Startalk comment failed:',
          error
        );
      } finally {
        setCommentSubmitting(false);
      }
    };

  const handleCommentKeyDown =
    (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (
        event.key === 'Enter' &&
        !event.shiftKey
      ) {
        event.preventDefault();

        if (
          commentText.trim() &&
          !commentSubmitting
        ) {
          handleAddComment();
        }
      }
    };

  /* =======================================================
     DELETE COMMENT
  ======================================================= */

  const requestDeleteComment =
    (commentId: string) => {
      setCommentToDeleteId(
        commentId
      );
    };

  const confirmDeleteComment =
    async () => {
      if (
        !commentToDeleteId ||
        commentDeleting
      ) {
        return;
      }

      if (
        typeof deleteStartalkComment !==
        'function'
      ) {
        console.error(
          'deleteStartalkComment is not available in AppContext.'
        );

        return;
      }

      setCommentDeleting(true);

      try {
        const success =
          await deleteStartalkComment(
            commentToDeleteId
          );

        if (success === false) {
          throw new Error(
            'Backend rejected comment deletion.'
          );
        }

        await loadComments();

        setCommentToDeleteId(
          null
        );
      } catch (error) {
        console.error(
          'Deleting Startalk comment failed:',
          error
        );
      } finally {
        setCommentDeleting(false);
      }
    };

  /* =======================================================
     SHARE
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

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/startalk/${talk.id}`
      : '';

  const shareTitle =
    `${displayName} on Startives`;

  const shareText =
    talk.content.length > 180
      ? `${talk.content.slice(0, 180)}…`
      : talk.content;

  const copyShareLink =
    async () => {
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
            document.createElement(
              'textarea'
            );

          textarea.value =
            shareUrl;

          textarea.style.position =
            'fixed';

          textarea.style.opacity =
            '0';

          document.body.appendChild(
            textarea
          );

          textarea.focus();
          textarea.select();

          document.execCommand(
            'copy'
          );

          document.body.removeChild(
            textarea
          );
        }

        setShareMessage(
          'Link copied'
        );

        window.setTimeout(() => {
          setShareMessage('');
        }, 1600);
      } catch (error) {
        console.error(
          'Copy failed:',
          error
        );

        setShareMessage(
          'Unable to copy'
        );

        window.setTimeout(() => {
          setShareMessage('');
        }, 1600);
      }
    };

  const handleNativeShare =
    async () => {
      try {
        if (
          typeof navigator !==
            'undefined' &&
          typeof navigator.share ===
            'function'
        ) {
          await navigator.share({
            title: shareTitle,
            text: shareText,
            url: shareUrl,
          });

          setIsShareMenuOpen(
            false
          );

          return;
        }

        await copyShareLink();
      } catch (error: any) {
        if (
          error?.name ===
          'AbortError'
        ) {
          return;
        }

        console.error(
          'Share failed:',
          error
        );

        await copyShareLink();
      }
    };

  const handleShareButton =
    () => {
      setIsReactionMenuOpen(false);

      if (
        typeof navigator !==
          'undefined' &&
        typeof navigator.share ===
          'function'
      ) {
        handleNativeShare();
        return;
      }

      setIsShareMenuOpen(
        prev => !prev
      );
    };

  /* =======================================================
     OUTSIDE CLICK + ESCAPE
  ======================================================= */

  useEffect(() => {
    const handleOutside =
      (event: MouseEvent) => {
        const target =
          event.target as Node;

        if (
          reactionRef.current &&
          !reactionRef.current.contains(
            target
          )
        ) {
          setIsReactionMenuOpen(
            false
          );
        }

        if (
          shareRef.current &&
          !shareRef.current.contains(
            target
          )
        ) {
          setIsShareMenuOpen(
            false
          );
        }
      };

    const handleEscape =
      (event: KeyboardEvent) => {
        if (
          event.key !== 'Escape'
        ) {
          return;
        }

        setIsReactionMenuOpen(
          false
        );

        setIsShareMenuOpen(false);

        if (isCommentsOpen) {
          closeComments();
        }
      };

    document.addEventListener(
      'mousedown',
      handleOutside
    );

    document.addEventListener(
      'keydown',
      handleEscape
    );

    return () => {
      document.removeEventListener(
        'mousedown',
        handleOutside
      );

      document.removeEventListener(
        'keydown',
        handleEscape
      );
    };
  }, [isCommentsOpen]);

  /* =======================================================
     BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (!isCommentsOpen) {
      return;
    }

    const oldOverflow =
      document.body.style.overflow;

    const oldTouchAction =
      document.body.style.touchAction;

    document.body.style.overflow =
      'hidden';

    document.body.style.touchAction =
      'none';

    return () => {
      document.body.style.overflow =
        oldOverflow;

      document.body.style.touchAction =
        oldTouchAction;
    };
  }, [isCommentsOpen]);

  /* =======================================================
     COMMENT MODAL
  ======================================================= */

  const commentsModal =
    isCommentsOpen &&
    typeof document !== 'undefined'
      ? createPortal(
          <div
            className="
              fixed inset-0 z-[1100]
              flex items-center justify-center
              px-3 py-4 sm:px-4 sm:py-6
              bg-black/65 dark:bg-black/80
              backdrop-blur-[7px]
              overscroll-none
            "
            style={{
              paddingTop:
                'max(1rem, env(safe-area-inset-top))',
              paddingBottom:
                'max(1rem, env(safe-area-inset-bottom))',
              width: '100vw',
              height: '100dvh',
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
                relative w-full max-w-[520px]
                overflow-visible
              "
            >
              <div
                className="
                  absolute -inset-3 rounded-[2rem]
                  bg-black/10 dark:bg-black/25
                  blur-2xl pointer-events-none
                "
                aria-hidden="true"
              />

              <div
                className="
                  relative w-full
                  h-[76vh] max-h-[650px]
                  min-h-[430px]
                  bg-[var(--component-background)]
                  border border-[var(--border-primary)]
                  rounded-[1.75rem] sm:rounded-[2rem]
                  shadow-[0_30px_90px_-20px_rgba(0,0,0,0.45)]
                  dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.70)]
                  overflow-hidden flex flex-col
                  font-poppins animate-in zoom-in-95 duration-200
                "
                onMouseDown={event =>
                  event.stopPropagation()
                }
              >
                {/* HEADER */}

                <div
                  className="
                    flex items-center justify-between
                    px-5 md:px-6 py-4
                    border-b border-[var(--border-primary)]
                    shrink-0 bg-[var(--component-background)]
                  "
                >
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
                    onClick={
                      closeComments
                    }
                    className="
                      w-8 h-8 rounded-full
                      flex items-center justify-center
                      bg-[var(--background-tertiary)]
                      border border-[var(--border-primary)]
                      text-[var(--text-muted)]
                      hover:text-[var(--text-primary)]
                      hover:border-purple-500/40
                      transition-all active:scale-95 shrink-0
                    "
                    aria-label="Close comments"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>

                {/* COMMENT LIST */}

                <div
                  className="
                    flex-1 overflow-y-auto
                    overscroll-contain
                    px-5 md:px-6 py-5 min-h-0
                  "
                >
                  {commentsLoading ? (
                    <div className="h-full min-h-[260px] flex flex-col items-center justify-center">
                      <div className="w-9 h-9 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />

                      <p className="mt-3 text-xs font-semibold text-[var(--text-muted)]">
                        Loading comments…
                      </p>
                    </div>
                  ) : comments.length === 0 ? (
                    <div className="h-full min-h-[260px] flex flex-col items-center justify-center text-center">
                      <div
                        className="
                          w-11 h-11 rounded-full
                          bg-purple-500/[0.07]
                          dark:bg-purple-500/[0.12]
                          border border-purple-500/20
                          flex items-center justify-center
                          mb-3 text-purple-500
                        "
                      >
                        <CommentIcon className="w-5 h-5" />
                      </div>

                      <p className="text-xs font-bold text-[var(--text-primary)]">
                        No comments yet
                      </p>

                      <p className="text-[10px] text-[var(--text-muted)] mt-1">
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

                          const commentProfileClickable =
                            isMongoId(
                              comment.authorId
                            );

                          const commentInitials =
                            String(
                              comment.author ||
                                'User'
                            )
                              .split(' ')
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

                          /*
                           * Profile avatar.
                           *
                           * NOW CLICKABLE.
                           */
                          const commentAvatar =
                            comment.avatar ? (
                              <img
                                src={
                                  comment.avatar
                                }
                                alt={
                                  comment.author
                                }
                                className="
                                  w-9 h-9 rounded-full
                                  object-cover
                                  border border-[var(--border-primary)]
                                  shrink-0
                                "
                              />
                            ) : (
                              <div
                                className="
                                  w-9 h-9 rounded-full
                                  icon-bg-gradient
                                  flex items-center justify-center
                                  text-white text-[10px]
                                  font-bold shrink-0
                                "
                              >
                                {
                                  commentInitials
                                }
                              </div>
                            );

                          return (
                            <div
                              key={
                                comment.id
                              }
                              className="flex items-start gap-3"
                            >
                              {commentProfileClickable ? (
                                <Link
                                  to={`/user/${comment.authorId}`}
                                  className="
                                    shrink-0
                                    rounded-full
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-purple-500/40
                                  "
                                  aria-label={`View ${comment.author}'s profile`}
                                  onClick={e =>
                                    e.stopPropagation()
                                  }
                                >
                                  {
                                    commentAvatar
                                  }
                                </Link>
                              ) : (
                                commentAvatar
                              )}

                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  {commentProfileClickable ? (
                                    <Link
                                      to={`/user/${comment.authorId}`}
                                      onClick={e =>
                                        e.stopPropagation()
                                      }
                                      className="
                                        text-xs font-bold
                                        text-[var(--text-primary)]
                                        truncate
                                        hover:text-purple-600
                                        transition-colors
                                      "
                                    >
                                      {
                                        comment.author
                                      }
                                    </Link>
                                  ) : (
                                    <span className="text-xs font-bold text-[var(--text-primary)] truncate">
                                      {
                                        comment.author
                                      }
                                    </span>
                                  )}

                                  <span className="text-[9px] text-[var(--text-muted)] font-medium shrink-0">
                                    {timeAgo(
                                      comment.timestamp
                                    )}
                                  </span>
                                </div>

                                <p className="mt-1 text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed break-words whitespace-pre-wrap">
                                  {
                                    comment.text
                                  }
                                </p>
                              </div>

                              {isCommentOwner && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    requestDeleteComment(
                                      comment.id
                                    )
                                  }
                                  className="
                                    p-1.5 rounded-full
                                    text-[var(--text-muted)]
                                    hover:text-red-500
                                    hover:bg-red-50
                                    dark:hover:bg-red-950/20
                                    transition-colors shrink-0
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

                {/* COMMENT INPUT */}

                <div
                  className="
                    px-5 md:px-6 py-4
                    border-t border-[var(--border-primary)]
                    bg-[var(--component-background)]
                    shrink-0
                  "
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={commentText}
                      maxLength={
                        MAX_COMMENT_LENGTH
                      }
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
                        flex-1 min-w-0 h-10 px-4
                        rounded-full
                        bg-[var(--background-tertiary)]
                        border border-[var(--border-primary)]
                        text-xs md:text-sm
                        text-[var(--text-primary)]
                        placeholder-[var(--text-muted)]
                        focus:outline-none
                        focus:border-purple-500/60
                        focus:ring-2
                        focus:ring-purple-500/10
                        transition-all
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
                        commentCharacterCount >
                          MAX_COMMENT_LENGTH
                      }
                      className="
                        h-10 px-4 md:px-5
                        rounded-full button-gradient
                        text-white text-[10px]
                        font-black uppercase
                        tracking-widest
                        disabled:opacity-40
                        disabled:cursor-not-allowed
                        transition-all active:scale-95
                        shrink-0
                      "
                    >
                      {commentSubmitting
                        ? '...'
                        : 'Post'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-2 px-1">
                    <span className="text-[9px] text-[var(--text-muted)]">
                      Press Enter to post
                    </span>

                    <span
                      className={`
                        text-[9px] font-semibold
                        ${
                          commentCharacterCount >=
                          MAX_COMMENT_LENGTH
                            ? 'text-red-500'
                            : 'text-[var(--text-muted)]'
                        }
                      `}
                    >
                      {
                        commentCharacterCount
                      }
                      /
                      {
                        MAX_COMMENT_LENGTH
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )
      : null;

  /* =======================================================
     RENDER CARD
  ======================================================= */

  return (
    <>
      <article
        className={`
          w-full relative
          bg-[var(--component-background)]
          rounded-2xl
          border border-[var(--border-primary)]
          p-5 md:p-6
          transition-all duration-300
          hover:border-purple-500/30
          group flex flex-col gap-4
          select-none font-poppins
          ${className}
        `}
      >
        {/* HEADER */}

        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {profileClickable ? (
              <Link
                to={`/user/${talk.authorId}`}
                className="
                  relative shrink-0 rounded-full
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-500/40
                "
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
                  className="
                    font-semibold text-sm md:text-base
                    text-[var(--text-primary)]
                    hover:text-purple-600
                    transition-colors truncate block
                    tracking-tight
                  "
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
                  className="p-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 border border-red-200 dark:border-red-800/30"
                  title="Delete talk"
                  aria-label="Delete talk"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              )}
          </div>
        </div>

        {/* CONTENT */}

        <div className="space-y-4 text-left">
          <p className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed font-medium whitespace-pre-wrap break-words">
            {renderTextWithLinks(
              talk.content
            )}
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
        </div>

        {/* REACTIONS */}

        {totalReactions > 0 && (
          <div className="flex items-center gap-3 flex-wrap">
            {Object.entries(
              talk.reactions || {}
            )
              .filter(
                ([, count]) =>
                  Number(count) > 0
              )
              .map(
                ([emoji, count]) => (
                  <div
                    key={emoji}
                    className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-primary)]"
                  >
                    <span>
                      {emoji}
                    </span>

                    <span className="text-xs font-bold text-[var(--text-primary)]">
                      {Number(count)}
                    </span>
                  </div>
                )
              )}
          </div>
        )}

        {/* ACTIONS */}

        <div className="relative pt-2 border-t border-[var(--border-primary)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">

              {/* REACT */}

              <div
                ref={reactionRef}
                className="relative shrink-0"
              >
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
                    inline-flex items-center
                    justify-center gap-2
                    w-[104px] h-8 px-3
                    rounded-full border
                    transition-all active:scale-95
                    text-[10px] font-black uppercase
                    ${
                      userHasReacted
                        ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-500 text-purple-600 dark:text-purple-400'
                        : 'bg-[var(--background-tertiary)] border-[var(--border-primary)] text-[var(--text-muted)] hover:text-purple-600 hover:border-purple-500/50'
                    }
                  `}
                >
                  <span className="w-5 flex items-center justify-center shrink-0">
                    {talk.currentUserReaction ? (
                      <span className="text-base leading-none">
                        {
                          talk.currentUserReaction
                        }
                      </span>
                    ) : (
                      <SmileIcon className="w-4 h-4" />
                    )}
                  </span>

                  <span className="whitespace-nowrap">
                    {talk.currentUserReaction
                      ? 'Reacted'
                      : 'React'}
                  </span>
                </button>

                {isReactionMenuOpen && (
                  <div
                    className="
                      absolute bottom-full left-0 mb-3
                      p-1.5
                      bg-[var(--component-background)]
                      border border-[var(--border-primary)]
                      rounded-full
                      shadow-[0_18px_50px_rgba(0,0,0,0.22)]
                      dark:shadow-[0_18px_50px_rgba(0,0,0,0.5)]
                      flex items-center gap-1 z-[90]
                    "
                  >
                    {MOOD_EMOJIS.map(
                      emoji => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={e => {
                            e.stopPropagation();

                            handleReaction(
                              emoji
                            );
                          }}
                          className={`w-9 h-9 flex items-center justify-center text-lg hover:scale-125 transition-transform rounded-full ${
                            talk.currentUserReaction ===
                            emoji
                              ? 'bg-purple-100 dark:bg-purple-900/30'
                              : 'hover:bg-[var(--background-tertiary)]'
                          }`}
                        >
                          {emoji}
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>

              {/* COMMENTS */}

              <button
                type="button"
                onClick={
                  openComments
                }
                className="
                  inline-flex items-center
                  justify-center gap-2
                  w-[72px] h-8 px-3
                  rounded-full border
                  border-[var(--border-primary)]
                  bg-[var(--background-tertiary)]
                  text-[var(--text-muted)]
                  hover:text-purple-600
                  hover:border-purple-500/50
                  transition-all active:scale-95
                  text-[10px] font-black uppercase
                  shrink-0
                "
                aria-label={`${displayedCommentCount} comments`}
              >
                <CommentIcon className="w-4 h-4" />

                <span>
                  {displayedCommentCount}
                </span>
              </button>

              {/* SHARE */}

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
                    inline-flex items-center
                    justify-center
                    w-9 h-8 rounded-full
                    border border-[var(--border-primary)]
                    bg-[var(--background-tertiary)]
                    text-[var(--text-muted)]
                    hover:text-purple-600
                    hover:border-purple-500/50
                    transition-all active:scale-95
                  "
                  title="Share Startalk"
                  aria-label="Share Startalk"
                >
                  <ShareIcon className="w-4 h-4" />
                </button>

                {isShareMenuOpen && (
                  <div
                    className="
                      absolute left-0 bottom-full mb-3
                      w-[190px]
                      rounded-2xl
                      border border-[var(--border-primary)]
                      bg-[var(--component-background)]
                      shadow-[0_20px_60px_rgba(0,0,0,0.20)]
                      dark:shadow-[0_20px_60px_rgba(0,0,0,0.50)]
                      overflow-hidden z-[100]
                    "
                  >
                    <div className="p-1.5">
                      <button
                        type="button"
                        onClick={
                          handleNativeShare
                        }
                        className="
                          w-full flex items-center
                          gap-3 px-3 py-2.5 rounded-xl
                          text-left text-xs font-semibold
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
                          w-full flex items-center
                          gap-3 px-3 py-2.5 rounded-xl
                          text-left text-xs font-semibold
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

            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest shrink-0">
              {timeAgo(
                talk.timestamp
              )}
            </span>
          </div>
        </div>
      </article>

      {commentsModal}

      {/* =================================================
          DELETE COMMENT
      ================================================= */}

      {commentToDeleteId &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="
              fixed inset-0 z-[1200]
              flex items-center justify-center p-4
              bg-black/70 dark:bg-black/80
              backdrop-blur-[7px]
            "
            style={{
              width: '100vw',
              height: '100dvh',
            }}
            onMouseDown={event => {
              if (
                event.target ===
                  event.currentTarget &&
                !commentDeleting
              ) {
                setCommentToDeleteId(
                  null
                );
              }
            }}
          >
            <div
              className="
                w-full max-w-[320px]
                bg-[var(--component-background)]
                border border-[var(--border-primary)]
                rounded-[2rem]
                overflow-hidden
                shadow-[0_25px_80px_rgba(0,0,0,0.35)]
                dark:shadow-[0_25px_80px_rgba(0,0,0,0.65)]
              "
              onMouseDown={event =>
                event.stopPropagation()
              }
            >
              <div className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center mx-auto mb-4">
                  <TrashIcon className="w-6 h-6" />
                </div>

                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  Delete comment?
                </h3>

                <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                  This comment will be permanently removed. This action cannot be undone.
                </p>
              </div>

              <div className="flex border-t border-[var(--border-primary)]">
                <button
                  type="button"
                  onClick={() =>
                    setCommentToDeleteId(
                      null
                    )
                  }
                  disabled={
                    commentDeleting
                  }
                  className="
                    flex-1 px-4 py-4
                    text-[10px] font-black
                    uppercase tracking-widest
                    text-[var(--text-muted)]
                    hover:bg-[var(--background-tertiary)]
                    border-r border-[var(--border-primary)]
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
                    flex-1 px-4 py-4
                    text-[10px] font-black
                    uppercase tracking-widest
                    text-red-500
                    hover:bg-red-50
                    dark:hover:bg-red-950/20
                    disabled:opacity-50
                  "
                >
                  {commentDeleting
                    ? 'Deleting…'
                    : 'Delete'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

/* =========================================================
   PUBLIC COMPONENT
========================================================= */

export const StartalkCard: React.FC<{
  talk: Startalk;
  onDeleteRequest?: (id: string) => void;
  className?: string;
}> = props => (
  <StartalkErrorBoundary>
    <StartalkCardContent
      {...props}
    />
  </StartalkErrorBoundary>
);