import {
  Pause,
  Play,
  SkipBack,
  SkipForward,
} from '@phosphor-icons/react';
import useYouTubePlayer from 'hooks/useYouTubePlayer';

const PLAYLIST_ID = 'PL6_t3YDqAyeMDcWXv06N-rwj4MoeU-pii';

export default function Footer() {
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
    'cursor-pointer hover:text-brand-orange disabled:cursor-default disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-brand-orange';

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 -left-[9999px] h-px w-px opacity-0"
      >
        <div ref={containerRef} title="Player de rádio do YouTube" />
      </div>

      <footer className="bg-brand-black border-brand-orange/40 text-brand-white sticky bottom-0 z-50 flex h-8 items-center gap-3 border-t px-4 text-xs">
        <button
          type="button"
          onClick={prev}
          disabled={!isReady}
          aria-label="Faixa anterior"
          className={buttonClass}
        >
          <SkipBack size={18} weight="fill" />
        </button>
        <button
          type="button"
          onClick={toggle}
          disabled={!isReady}
          aria-label={isPlaying ? 'Pausar' : 'Tocar'}
          className={buttonClass}
        >
          {isPlaying ? (
            <Pause size={18} weight="fill" />
          ) : (
            <Play size={18} weight="fill" />
          )}
        </button>
        <button
          type="button"
          onClick={next}
          disabled={!isReady}
          aria-label="Próxima faixa"
          className={buttonClass}
        >
          <SkipForward size={18} weight="fill" />
        </button>

        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="min-w-0 flex-1 truncate"
        >
          {error ? (
            <span className="opacity-50">RÁDIO — {error}</span>
          ) : currentTrack ? (
            <>
              <span className="font-semibold">{currentTrack.title}</span>
              <span className="opacity-60"> — {currentTrack.author}</span>
            </>
          ) : (
            <span className="opacity-50">
              RÁDIO — {isReady ? 'sintonizando...' : 'conectando...'}
            </span>
          )}
        </div>

        <span className="hidden sm:inline">
          underground, mas mal feito não <strong>© 2026, RECAPS</strong>
        </span>
      </footer>
    </>
  );
}
