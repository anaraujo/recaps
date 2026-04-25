import useShineEffect from 'hooks/useShineEffect';

export default function NewsItem({ name, image }) {
  const { ref, onPointerMove } = useShineEffect();

  return (
    <div className="overflow-hidden rounded-[50%]">
      <div
        ref={ref}
        onPointerMove={onPointerMove}
        className="shine-card bg-brand-orange aspect-square cursor-pointer"
      >
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
