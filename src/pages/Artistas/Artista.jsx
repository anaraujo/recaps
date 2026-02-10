export default function Artista({ name, image }) {
  return (
    <div className="from-brand-orange hover:to-brand-orange aspect-square cursor-pointer rounded-lg bg-linear-to-t from-25% to-transparent to-25%">
      <img
        src={image}
        alt={name}
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  );
}
