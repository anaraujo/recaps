import useYouTubePlayer from 'hooks/useYouTubePlayer';
import {
  NextIcon,
  PauseIcon,
  PlayIcon,
  PrevIcon,
} from 'components/icons/PlayerIcons';

const PLAYLIST_ID = 'PL6_t3YDqAyeMDcWXv06N-rwj4MoeU-pii';

export default function RadioPlayer() {
  const {
    containerRef,
    isReady,
    isPlaying,
    currentTrack,
    toggle,
    next,
    prev,
    error,
  } = useYouTubePlayer({ playlistId: PLAYLIST_ID });

  const buttonClass =
    'h-6 w-6 hover:text-brand-orange disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-orange';

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 -left-[9999px] h-px w-px opacity-0"
      >
        <div ref={containerRef} title="YouTube radio playback" />
      </div>

      <div className="bg-brand-black border-brand-orange/40 text-brand-white flex h-8 items-center gap-3 border-t px-3 text-xs">
        <button
          type="button"
          onClick={prev}
          disabled={!isReady}
          aria-label="Previous track"
          className={buttonClass}
        >
          <PrevIcon className="h-full w-full" />
        </button>
        <button
          type="button"
          onClick={toggle}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className={buttonClass}
        >
          {isPlaying ? (
            <PauseIcon className="h-full w-full" />
          ) : (
            <PlayIcon className="h-full w-full" />
          )}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!isReady}
          aria-label="Next track"
          className={buttonClass}
        >
          <NextIcon className="h-full w-full" />
        </button>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="min-w-0 flex-1 truncate"
        >
          {error ? (
            <span className="opacity-50">RADIO — {error}</span>
          ) : currentTrack ? (
            <>
              <span className="font-semibold">{currentTrack.title}</span>
              <span className="opacity-60"> — {currentTrack.author}</span>
            </>
          ) : (
            <span className="opacity-50">
              RADIO — {isReady ? 'press play' : 'connecting...'}
            </span>
          )}
        </div>

        <span className="text-[10px] tracking-widest uppercase opacity-50">
          RADIO
        </span>
      </div>
    </>
  );
}
