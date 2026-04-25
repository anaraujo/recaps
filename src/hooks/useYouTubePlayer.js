import { useCallback, useEffect, useRef, useState } from 'react';
import loadYouTubeAPI from 'utils/youtubeApi';

const MAX_CONSECUTIVE_ERRORS = 5;

export default function useYouTubePlayer({ playlistId }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const errorCountRef = useRef(0);
  const lastTitleRef = useRef('');

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeAPI().then((YT) => {
      if (cancelled || !containerRef.current) return;

      playerRef.current = new YT.Player(containerRef.current, {
        width: '1',
        height: '1',
        playerVars: {
          listType: 'playlist',
          list: playlistId,
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          playsinline: 1,
          iv_load_policy: 3,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (cancelled) return;
            setIsReady(true);
          },
          onStateChange: (event) => {
            if (cancelled) return;
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);

            const data = event.target.getVideoData?.();
            if (data?.title && data.title !== lastTitleRef.current) {
              lastTitleRef.current = data.title;
              setCurrentTrack({ title: data.title, author: data.author });
              errorCountRef.current = 0;
              setError(null);
            }
          },
          onError: () => {
            if (cancelled) return;
            errorCountRef.current += 1;
            if (errorCountRef.current >= MAX_CONSECUTIVE_ERRORS) {
              setError('playback unavailable');
              return;
            }
            playerRef.current?.nextVideo();
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [playlistId]);

  const toggle = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  }, [isPlaying]);

  const next = useCallback(() => {
    playerRef.current?.nextVideo();
  }, []);

  const prev = useCallback(() => {
    playerRef.current?.previousVideo();
  }, []);

  return {
    containerRef,
    isReady,
    isPlaying,
    currentTrack,
    toggle,
    next,
    prev,
    error,
  };
}
