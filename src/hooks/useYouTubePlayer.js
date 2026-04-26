import { useCallback, useEffect, useRef, useState } from 'react';
import loadYouTubeAPI from 'utils/youtubeApi';

const MAX_CONSECUTIVE_ERRORS = 5;

export default function useYouTubePlayer({ playlistId }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const errorCountRef = useRef(0);
  const lastTrackKeyRef = useRef('');

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    // YT auto-generates "<Artist> - Topic" channels for music uploads;
    // strip the suffix so we display just the artist name.
    const cleanAuthor = (author) =>
      (author || '').replace(/\s*-\s*Topic$/i, '');

    const updateTrack = (data) => {
      if (!data?.title) return false;
      const author = cleanAuthor(data.author);
      const key = `${data.video_id || ''}|${author}`;
      if (key === lastTrackKeyRef.current) return false;
      lastTrackKeyRef.current = key;
      setCurrentTrack({ title: data.title, author });
      errorCountRef.current = 0;
      setError(null);
      return true;
    };

    // YT's getVideoData() leaves `author` empty for cued-but-untouched videos.
    // oEmbed gives us the channel name without needing an API key.
    const backfillAuthor = async (videoId, title) => {
      try {
        const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(watchUrl)}&format=json`;
        const res = await fetch(oembedUrl);
        if (!res.ok) return;
        const json = await res.json();
        const author = cleanAuthor(json.author_name);
        if (cancelled || !author) return;
        // bail if the track changed while we were fetching
        if (!lastTrackKeyRef.current.startsWith(`${videoId}|`)) return;
        lastTrackKeyRef.current = `${videoId}|${author}`;
        setCurrentTrack({ title, author });
      } catch {
        /* network/CORS issue — title alone is fine */
      }
    };

    const handleData = (data) => {
      if (!updateTrack(data)) return;
      if (!data.author && data.video_id) {
        backfillAuthor(data.video_id, data.title);
      }
    };

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
          onReady: (event) => {
            if (cancelled) return;
            setIsReady(true);
            event.target.setShuffle(true);
            // advance to the new shuffled first track; autoplay is blocked
            // without a gesture, but the player still loads the video and
            // onStateChange will fire with the fresh metadata. We skip
            // reading getVideoData here so the originally-cued track
            // doesn't flash before the shuffled one resolves.
            event.target.playVideoAt(0);
          },
          onStateChange: (event) => {
            if (cancelled) return;
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
            handleData(event.target.getVideoData?.());
          },
          onError: () => {
            if (cancelled) return;
            errorCountRef.current += 1;
            if (errorCountRef.current >= MAX_CONSECUTIVE_ERRORS) {
              setError('indisponível');
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
