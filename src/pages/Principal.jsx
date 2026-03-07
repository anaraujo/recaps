import useShineEffect from 'hooks/useShineEffect';

export default function Principal() {
  const { ref, onPointerMove } = useShineEffect();

  return (
    <section
      onPointerMove={onPointerMove}
      className="relative flex-1 flex items-center justify-center bg-brand-black text-brand-white"
    >
      {/* placeholder para video/gif/foto */}
      <div className="absolute inset-0 bg-brand-black" />
      <div
        ref={ref}
        className="shine-card relative z-10 rounded-lg px-8 py-4"
      >
        <h1 className="text-5xl font-bold tracking-widest uppercase">
          Recaps
        </h1>
      </div>
    </section>
  );
}
