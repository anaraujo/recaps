import { lazy, Suspense, useState } from 'react';
import useShineEffect from 'hooks/useShineEffect';
import comeCloser from 'assets/icons/come-closer.gif';
import { prefersReducedMotion } from 'utils/paperCanvas';

const backgroundLoaders = [
  () => import('components/backgrounds/MetaBalls'),
  () => import('components/backgrounds/Smoothing'),
  () => import('components/backgrounds/Voronoi'),
  () => import('components/backgrounds/RadialOrange'),
];

export default function Home() {
  const { ref, onPointerMove } = useShineEffect();
  const reducedMotion = prefersReducedMotion();
  const [Background] = useState(() => {
    if (reducedMotion) return null;
    const index = Math.floor(Math.random() * backgroundLoaders.length);
    return lazy(backgroundLoaders[index]);
  });

  return (
    <section
      onPointerMove={onPointerMove}
      className="relative flex flex-1 items-center justify-center"
    >
      {Background && (
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      )}

      <div ref={ref} className="shine-card relative rounded-[100%] px-12 py-8">
        <h1 className="relative z-20 text-5xl font-bold tracking-widest uppercase">
          Recaps
        </h1>
      </div>
    </section>
  );
}
