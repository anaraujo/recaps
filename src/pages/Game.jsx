import { useState } from 'react';
import CandyCrashLoader from 'components/CandyCrashLoader';
import RoundedRectanglesLoader from 'components/RoundedRectanglesLoader';

const loaders = [CandyCrashLoader, RoundedRectanglesLoader];

export default function Game() {
  const [isLoading, setIsLoading] = useState(true);
  const [Loader] = useState(
    () => loaders[Math.floor(Math.random() * loaders.length)],
  );

  return (
    <>
      <main className="flex min-h-0 flex-1 flex-col items-center justify-center pl-60">
        {false && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <Loader />
          </div>
        )}
        <div
          className="border-brand-orange relative h-full max-h-800 max-w-800 overflow-hidden rounded-lg border-2"
          style={{ aspectRatio: '1 / 1' }}
        >
          <iframe
            src="https://flappy-bee-pi.vercel.app/"
            title="Flappy Bee"
            className="h-full w-full border-0"
            allow="autoplay"
            onLoad={() => setIsLoading(false)}
          />
        </div>
      </main>
    </>
  );
}
