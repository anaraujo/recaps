import { useState, useEffect } from 'react';
import ChainLoader from 'components/ChainLoader';
import CandyCrashLoader from 'components/CandyCrashLoader';
import RoundedRectanglesLoader from 'components/RoundedRectanglesLoader';

const loaders = [ChainLoader, CandyCrashLoader, RoundedRectanglesLoader];

export default function Jogo() {
  const [isLoading, setIsLoading] = useState(true);
  const [Loader] = useState(
    () => loaders[Math.floor(Math.random() * loaders.length)],
  );

  useEffect(() => {
    function onMessage(event) {
      if (event.data === 'godot-ready') setIsLoading(false);
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <main className="flex flex-1 flex-col items-center justify-center">
        <div
          className="border-brand-orange relative overflow-hidden rounded-lg border-2"
          style={{ aspectRatio: '864 / 936' }}
        >
          <iframe
            src="/game/Flappy%20Bee.html"
            title="Flappy Bee"
            className="h-full w-full border-0"
            allow="autoplay; fullscreen"
          />
        </div>
      </main>
    </>
  );
}
