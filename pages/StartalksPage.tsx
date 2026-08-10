import axios from 'axios';
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { StartalkCard } from './StartalkCard';

/* =========================================================
   CONFIG
========================================================= */

const MAX_STARTALK_LENGTH = 1000;

/*
 * Light feed shuffle.
 *
 * We intentionally DO NOT completely randomize the feed.
 * Only a small number of nearby cards are moved so the
 * feed feels fresh after login / refresh without becoming
 * chaotic.
 */
const LIGHT_SHUFFLE_MOVES = 3;

/* =========================================================
   ICONS
========================================================= */

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
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12.56 0c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
);

const PhotoIcon: React.FC<{
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
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1-.75 0Z"
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
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

/* =========================================================
   LIGHT SHUFFLE
========================================================= */

/*
 * Creates a subtle shuffle instead of:
 *
 * [...items].sort(() => Math.random() - 0.5)
 *
 * The old method can completely destroy the feed order.
 *
 * This one only performs a few local swaps.
 */
const lightShuffle = <T,>(
  items: T[],
  moves: number = LIGHT_SHUFFLE_MOVES
): T[] => {
  const result = [...items];

  if (result.length < 2) {
    return result;
  }

  const actualMoves = Math.min(
    moves,
    Math.max(
      1,
      Math.floor(result.length / 2)
    )
  );

  for (
    let i = 0;
    i < actualMoves;
    i++
  ) {
    const firstIndex =
      Math.floor(
        Math.random() *
          result.length
      );

    /*
     * Keep the second position reasonably close.
     * This creates a light shuffle rather than
     * a completely random feed.
     */
    const distance =
      Math.floor(
        Math.random() * 5
      ) + 1;

    const direction =
      Math.random() > 0.5
        ? 1
        : -1;

    let secondIndex =
      firstIndex +
      distance * direction;

    /*
     * Clamp into array range.
     */
    if (
      secondIndex < 0
    ) {
      secondIndex =
        Math.min(
          result.length - 1,
          firstIndex + distance
        );
    }

    if (
      secondIndex >=
      result.length
    ) {
      secondIndex =
        Math.max(
          0,
          firstIndex - distance
        );
    }

    if (
      firstIndex !==
      secondIndex
    ) {
      const temp =
        result[firstIndex];

      result[firstIndex] =
        result[secondIndex];

      result[secondIndex] =
        temp;
    }
  }

  return result;
};

/* =========================================================
   CONFIRMATION MODAL
========================================================= */

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmModal: React.FC<
  ConfirmModalProps
> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[var(--component-background)] border border-[var(--border-primary)] rounded-[2rem] w-full max-w-[320px] overflow-hidden shadow-none animate-in zoom-in-95 duration-200 flex flex-col font-poppins">

        <div className="p-6 text-center">

          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 flex items-center justify-center mx-auto mb-4">
            <TrashIcon className="w-6 h-6" />
          </div>

          <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2 tracking-tight">
            {title}
          </h3>

          <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
            {message}
          </p>

        </div>

        <div className="flex border-t border-[var(--border-primary)]">

          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] hover:bg-[var(--background-tertiary)] transition-colors border-r border-[var(--border-primary)]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-4 py-4 text-[10px] font-black uppercase tracking-widest text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
          >
            Delete
          </button>

        </div>
      </div>
    </div>
  );
};

/* =========================================================
   IMAGE URL HELPER
========================================================= */

const getImageUrl = (
  url: string
) => {
  if (!url) {
    return '';
  }

  return url;
};

/* =========================================================
   STARTALKS PAGE
========================================================= */

const StartalksPage: React.FC = () => {

  const {
    startalks,
    addStartalk,
    deleteStartalk,
    addNotification,
  } = useAppContext();

  /* =======================================================
     CREATE STATE
  ======================================================= */

  const [
    newTalkContent,
    setNewTalkContent,
  ] = useState('');

  const [
    imagePreview,
    setImagePreview,
  ] = useState<string | null>(
    null
  );

  const [
    isPosting,
    setIsPosting,
  ] = useState(false);

  const [
    isImageUploading,
    setIsImageUploading,
  ] = useState(false);

  /* =======================================================
     FILTER
  ======================================================= */

  const [
    activeFilter,
    setActiveFilter,
  ] = useState<
    'Feed' | 'Latest' | 'Most reacted'
  >('Feed');

  /* =======================================================
     DELETE
  ======================================================= */

  const [
    talkToDeleteId,
    setTalkToDeleteId,
  ] = useState<string | null>(
    null
  );

  /* =======================================================
     ROUTER
  ======================================================= */

  const location =
    useLocation();

  /* =======================================================
     REFS
  ======================================================= */

  const imageInputRef =
    useRef<HTMLInputElement>(null);

  const textareaRef =
    useRef<HTMLTextAreaElement>(null);

  /*
   * IMPORTANT:
   *
   * This ref only controls the initial Feed shuffle.
   *
   * It does NOT reset when:
   * - a new Startalk is posted
   * - a reaction changes
   * - comments change
   * - a Startalk is deleted
   *
   * Therefore the feed will not randomly jump around
   * after normal interactions.
   */
  const hasShuffled =
    useRef(false);

  /* =======================================================
     FOCUS TEXTAREA
  ======================================================= */

  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search
      );

    if (
      params.get('focus') ===
        'true' &&
      textareaRef.current
    ) {
      textareaRef.current.focus();
    }
  }, [
    location.search,
  ]);

  /* =======================================================
     POST
  ======================================================= */

  const handlePost =
    async () => {
      const trimmedContent =
        newTalkContent.trim();

      if (
        !trimmedContent ||
        isPosting ||
        isImageUploading
      ) {
        return;
      }

      if (
        trimmedContent.length >
        MAX_STARTALK_LENGTH
      ) {
        return;
      }

      try {
        setIsPosting(true);

        await addStartalk(
          trimmedContent,
          imagePreview ||
            undefined
        );

        setNewTalkContent('');
        setImagePreview(null);

      } finally {
        setIsPosting(false);
      }
    };

  /* =======================================================
     IMAGE UPLOAD
  ======================================================= */

  const handleImageChange =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      const file =
        e.target.files?.[0];

      if (!file) {
        return;
      }

      try {
        setIsImageUploading(
          true
        );

        const formData =
          new FormData();

        formData.append(
          'file',
          file
        );

        const res =
          await axios.post(
            '/api/upload',
            formData,
            {
              headers: {
                'Content-Type':
                  'multipart/form-data',
              },
            }
          );

        if (
          res.data?.success &&
          res.data?.fileUrl
        ) {
          setImagePreview(
            res.data.fileUrl
          );

          if (
            addNotification
          ) {
            addNotification(
              'Image uploaded!',
              'success'
            );
          }
        } else {
          if (
            addNotification
          ) {
            addNotification(
              'Image upload failed.',
              'error'
            );
          }
        }
      } catch (err: any) {
        console.error(
          err
        );

        if (
          addNotification
        ) {
          addNotification(
            err?.response
              ?.data
              ?.message ||
              'Image upload failed.',
            'error'
          );
        }
      } finally {
        setIsImageUploading(
          false
        );

        if (e.target) {
          e.target.value =
            '';
        }
      }
    };

  /* =======================================================
     FILTERED TALKS
  ======================================================= */

  const filteredTalks =
    useMemo(() => {

      /*
       * LATEST
       */
      if (
        activeFilter ===
        'Latest'
      ) {
        return [
          ...startalks,
        ].sort(
          (a, b) =>
            new Date(
              b.timestamp
            ).getTime() -
            new Date(
              a.timestamp
            ).getTime()
        );
      }

      /*
       * MOST REACTED
       */
      if (
        activeFilter ===
        'Most reacted'
      ) {
        return [
          ...startalks,
        ].sort(
          (a, b) => {
            const aTotal =
              Object.values(
                a.reactions ||
                  {}
              ).reduce<number>(
                (
                  sum,
                  count
                ) =>
                  sum +
                  Number(
                    count
                  ),
                0
              );

            const bTotal =
              Object.values(
                b.reactions ||
                  {}
              ).reduce<number>(
                (
                  sum,
                  count
                ) =>
                  sum +
                  Number(
                    count
                  ),
                0
              );

            return (
              bTotal -
              aTotal
            );
          }
        );
      }

      /*
       * FEED
       *
       * Shuffle ONCE when the page/feed is initially
       * rendered.
       *
       * After that return the actual startalk order
       * so normal app updates don't cause jumping.
       */
      if (
        !hasShuffled.current
      ) {
        hasShuffled.current =
          true;

        return lightShuffle(
          startalks,
          LIGHT_SHUFFLE_MOVES
        );
      }

      return startalks;

    }, [
      startalks,
      activeFilter,
    ]);

  /* =======================================================
     CHARACTER PROGRESS
  ======================================================= */

  const characterCount =
    newTalkContent.length;

  const characterProgress =
    Math.min(
      100,
      (
        characterCount /
        MAX_STARTALK_LENGTH
      ) * 100
    );

  const isAtCharacterLimit =
    characterCount >=
    MAX_STARTALK_LENGTH;

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="bg-[var(--background-secondary)] min-h-screen font-poppins">

      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-24 pt-2 pb-8">

        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="text-left mb-6">

          <h1 className="text-4xl font-startives-brand tracking-tighter text-[var(--text-primary)] leading-tight">
            Startalks
          </h1>

          <p className="text-lg text-[var(--text-secondary)] font-medium mt-1 opacity-80 font-poppins">
            Founders sharing raw thoughts & updates.
          </p>

        </div>

        <div className="w-full max-w-6xl mx-auto">

          {/* =================================================
              CREATE STARTALK
          ================================================= */}

          <div className="bg-[var(--component-background)] rounded-3xl border border-[var(--border-primary)] p-6 md:p-8 mb-6 shadow-none relative overflow-hidden text-left font-poppins">

            <div className="absolute inset-0 dot-pattern-bg opacity-[0.03] pointer-events-none" />

            <div className="relative z-10">

              <textarea
                ref={textareaRef}
                value={
                  newTalkContent
                }
                onChange={e =>
                  setNewTalkContent(
                    e.target.value.slice(
                      0,
                      MAX_STARTALK_LENGTH
                    )
                  )
                }
                placeholder="What's happening in your venture?"
                className="
                  w-full
                  bg-transparent
                  border-none
                  focus:ring-0
                  focus:outline-none
                  text-[var(--text-primary)]
                  font-medium
                  text-base
                  md:text-lg
                  resize-none
                  min-h-[120px]
                  md:min-h-[150px]
                  placeholder-[var(--text-muted)]
                  font-poppins
                "
                maxLength={
                  MAX_STARTALK_LENGTH
                }
              />

              {/* IMAGE PREVIEW */}

              {imagePreview && (
                <div className="relative mt-4 mb-2 inline-block shadow-none">

                  <img
                    src={getImageUrl(
                      imagePreview
                    )}
                    alt="Preview"
                    className="max-h-48 rounded-xl border border-[var(--border-primary)] shadow-none"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setImagePreview(
                        null
                      )
                    }
                    className="
                      absolute
                      -top-2
                      -right-2
                      p-1
                      bg-[var(--component-background)]
                      border
                      border-[var(--border-primary)]
                      rounded-full
                      text-red-500
                      shadow-none
                      hover:scale-110
                      transition-transform
                    "
                    title="Remove image"
                    aria-label="Remove image"
                  >
                    <XMarkIcon />
                  </button>

                </div>
              )}

              {/* =================================================
                  POST FOOTER
              ================================================= */}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-primary)]">

                <div className="flex items-center gap-3">

                  {/* IMAGE BUTTON */}

                  <button
                    type="button"
                    onClick={() =>
                      imageInputRef.current?.click()
                    }
                    disabled={
                      isImageUploading ||
                      isPosting
                    }
                    className="
                      p-2.5
                      rounded-full
                      bg-[var(--background-tertiary)]
                      text-[var(--text-muted)]
                      hover:text-purple-600
                      transition-colors
                      border
                      border-[var(--border-primary)]
                      shadow-none
                      disabled:opacity-60
                    "
                    title="Add image"
                  >
                    <PhotoIcon className="w-5 h-5" />
                  </button>

                  <input
                    type="file"
                    ref={
                      imageInputRef
                    }
                    onChange={
                      handleImageChange
                    }
                    className="hidden"
                    accept="image/*"
                  />

                  {/* =================================================
                      CHARACTER COUNTER
                  ================================================= */}

                  <div className="relative w-9 h-9 flex items-center justify-center">

                    <svg
                      viewBox="0 0 36 36"
                      className="absolute w-9 h-9 -rotate-90"
                    >
                      <defs>

                        <linearGradient
                          id="talkGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ff3d5e"
                          />

                          <stop
                            offset="100%"
                            stopColor="#3b82f6"
                          />
                        </linearGradient>

                      </defs>

                      {/* BACKGROUND CIRCLE */}

                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        strokeWidth="3"
                        stroke="rgba(120,120,120,0.2)"
                        fill="none"
                      />

                      {/* PROGRESS */}

                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        strokeWidth="3"
                        stroke={
                          isAtCharacterLimit
                            ? '#ef4444'
                            : 'url(#talkGradient)'
                        }
                        fill="none"
                        strokeDasharray="100"
                        strokeDashoffset={
                          100 -
                          characterProgress
                        }
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />

                    </svg>

                    <span
                      className={`
                        text-[9px]
                        font-bold
                        ${
                          isAtCharacterLimit
                            ? 'text-red-500'
                            : 'text-[var(--text-primary)]'
                        }
                      `}
                    >
                      {
                        characterCount
                      }
                    </span>

                  </div>

                  {/* UPLOAD STATUS */}

                  {isImageUploading && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-purple-500 animate-pulse">
                      Uploading...
                    </span>
                  )}

                </div>

                {/* SHARE BUTTON */}

                <button
                  type="button"
                  onClick={
                    handlePost
                  }
                  disabled={
                    !newTalkContent.trim() ||
                    characterCount >
                      MAX_STARTALK_LENGTH ||
                    isPosting ||
                    isImageUploading
                  }
                  className="
                    button-gradient
                    px-6
                    py-2
                    rounded-full
                    text-white
                    text-[10px]
                    font-black
                    uppercase
                    tracking-widest
                    shadow-none
                    hover:scale-105
                    transition-all
                    active:scale-95
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    font-poppins
                  "
                >
                  {isPosting
                    ? 'Posting...'
                    : isImageUploading
                    ? 'Wait...'
                    : 'Share talk'}
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="flex justify-center mb-10">

            <div className="inline-flex bg-[var(--background-tertiary)] p-1 rounded-full border border-[var(--border-primary)] font-poppins">

              {(
                [
                  'Feed',
                  'Latest',
                  'Most reacted',
                ] as const
              ).map(
                filter => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() =>
                      setActiveFilter(
                        filter
                      )
                    }
                    className={`
                      px-6
                      py-2
                      md:px-8
                      md:py-2.5
                      rounded-full
                      text-[10px]
                      md:text-xs
                      font-black
                      uppercase
                      tracking-widest
                      transition-all
                      duration-300
                      ${
                        activeFilter ===
                        filter
                          ? 'button-gradient text-white shadow-none'
                          : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                      }
                    `}
                  >
                    {filter}
                  </button>
                )
              )}

            </div>

          </div>

          {/* =================================================
              STARTALK FEED
          ================================================= */}

          <div className="space-y-6">

            {filteredTalks.length >
            0 ? (

              filteredTalks.map(
                talk => (
                  <StartalkCard
                    key={
                      talk.id
                    }
                    talk={
                      talk
                    }
                    onDeleteRequest={id =>
                      setTalkToDeleteId(
                        id
                      )
                    }
                  />
                )
              )

            ) : (

              <div className="
                text-center
                py-20
                bg-[var(--component-background)]
                rounded-3xl
                border-2
                border-dashed
                border-[var(--border-primary)]
                shadow-none
              ">
                <p className="
                  text-[var(--text-muted)]
                  font-black
                  uppercase
                  tracking-widest
                  text-xs
                  font-poppins
                ">
                  No talks shared yet.
                  Be the first!
                </p>
              </div>

            )}

          </div>

        </div>

        {/* =================================================
            DELETE MODAL
        ================================================= */}

        <ConfirmModal
          isOpen={
            !!talkToDeleteId
          }
          onClose={() =>
            setTalkToDeleteId(
              null
            )
          }
          onConfirm={() => {

            if (
              talkToDeleteId
            ) {
              deleteStartalk(
                talkToDeleteId
              );

              setTalkToDeleteId(
                null
              );
            }

          }}
          title="Delete startalk?"
          message="This will permanently remove your raw thought from the ecosystem. This action cannot be undone."
        />

      </div>

    </div>
  );
};

export default StartalksPage;