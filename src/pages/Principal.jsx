import { useState } from 'react';
import useShineEffect from 'hooks/useShineEffect';
import comeCloser from 'assets/icons/come-closer.gif';
import MetaBalls from 'components/backgrounds/MetaBalls';
import FutureSplash from 'components/backgrounds/FutureSplash';
import Smoothing from 'components/backgrounds/Smoothing';
import Voronoi from 'components/backgrounds/Voronoi';

const backgrounds = [MetaBalls, FutureSplash, Smoothing, Voronoi];

export default function Principal() {
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
      <img
        src={comeCloser}
        alt="Come closer"
        className="absolute z-10 max-h-64 max-w-64"
      />
      <div ref={ref} className="shine-card relative z-20 rounded-lg px-8 py-4">
        <h1 className="text-5xl font-bold tracking-widest uppercase">Recaps</h1>
      </div>
    </section>
  );
}
