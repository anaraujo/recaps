import { SpotifyLogoIcon, PlayCircleIcon } from '@phosphor-icons/react';

export default function Artist({ name, image }) {
  return (
    <div className="group from-brand-orange hover:to-brand-orange relative aspect-square cursor-pointer rounded-lg bg-linear-to-t from-25% to-transparent to-25%">
      <img
        src={image}
        alt={name}
        className="h-full w-full rounded-lg object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          type="button"
          className="text-brand-black hover:text-brand-white cursor-pointer"
        >
          <SpotifyLogoIcon size={52} weight="duotone" />
        </button>
        <button
          type="button"
          className="text-brand-black hover:text-brand-white cursor-pointer"
        >
          <PlayCircleIcon size={52} weight="duotone" />
        </button>
      </div>
    </div>
  );
}
