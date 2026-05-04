import { useState } from 'react';
import ChainLoader from 'components/ChainLoader';
import CandyCrashLoader from 'components/CandyCrashLoader';
import RoundedRectanglesLoader from 'components/RoundedRectanglesLoader';

const loaders = [ChainLoader, CandyCrashLoader, RoundedRectanglesLoader];

export default function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const [Loader] = useState(
    () => loaders[Math.floor(Math.random() * loaders.length)],
  );

  return (
    <>
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center p-4">
        <div
          className="border-brand-orange relative max-h-full w-full max-w-[864px] overflow-hidden rounded-lg border-2"
          style={{ aspectRatio: '864 / 936' }}
        >
          <iframe
            src="https://flappy-bee-recaps.vercel.app/"
            title="Flappy Bee"
            className="h-full w-full border-0"
            allow="autoplay; fullscreen"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </main>
    </>
  );
}
