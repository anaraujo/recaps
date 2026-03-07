import { useState } from 'react';

export default function Jogo() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-brand-black flex flex-1 flex-col items-center justify-center">
      <div
        className="border-brand-orange relative w-full overflow-hidden rounded-lg border-2"
        style={{ aspectRatio: '864 / 936' }}
      >
        {isLoading && (
          <div className="bg-brand-black absolute inset-0 z-10 flex items-center justify-center">
            <p className="text-brand-white animate-pulse text-lg tracking-widest uppercase">
              Carregando...
            </p>
          </div>
        )}

        <iframe
          src="/game/Flappy%20Bee.html"
          title="Flappy Bee"
          className="h-full w-full border-0"
          allow="autoplay; fullscreen"
          onLoad={() => setIsLoading(false)}
        />
      </div>
    </main>
  );
}
