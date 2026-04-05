import useShineEffect from 'hooks/useShineEffect';
import comeCloser from 'assets/icons/come-closer.gif';

export default function Principal() {
  const { ref, onPointerMove } = useShineEffect();

  return (
    <section
      onPointerMove={onPointerMove}
      className="relative flex flex-1 items-center justify-center"
    >
      {/* placeholder para video/gif/foto */}
      <img
        src={comeCloser}
        alt="Come closer"
        className="absolute max-h-64 max-w-64"
      />
      <div ref={ref} className="shine-card relative z-10 rounded-lg px-8 py-4">
        <h1 className="text-5xl font-bold tracking-widest uppercase">Recaps</h1>
      </div>
    </section>
  );
}
