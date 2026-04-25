import { useState } from 'react';
import useShineEffect from 'hooks/useShineEffect';
import comeCloser from 'assets/icons/come-closer.gif';
import MetaBalls from 'components/backgrounds/MetaBalls';
import FutureSplash from 'components/backgrounds/FutureSplash';
import Smoothing from 'components/backgrounds/Smoothing';
import Voronoi from 'components/backgrounds/Voronoi';

const backgrounds = [MetaBalls, FutureSplash, Smoothing, Voronoi];

export default function Home() {
  const { ref, onPointerMove } = useShineEffect();
  const [Background] = useState(
    () => backgrounds[Math.floor(Math.random() * backgrounds.length)],
  );

  return (
    <section
      onPointerMove={onPointerMove}
      className="relative flex flex-1 items-center justify-center"
    >
      <Background />

      <div ref={ref} className="shine-card relative rounded-lg px-12 py-8">
        <img
          src={comeCloser}
          alt="Come closer"
          className="absolute inset-0 z-10 m-auto max-h-64 max-w-64"
        />
        <h1 className="relative z-20 text-5xl font-bold tracking-widest uppercase">
          Recaps
        </h1>
      </div>
    </section>
  );
}
