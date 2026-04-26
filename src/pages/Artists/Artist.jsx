import {
  InstagramLogoIcon,
  SpotifyLogoIcon,
  PlayCircleIcon,
} from '@phosphor-icons/react';

export default function Artist({ name, image }) {
  return (
    <div className="group from-brand-orange hover:to-brand-orange relative aspect-square cursor-pointer rounded-lg bg-linear-to-t from-25% to-transparent to-25%">
      <img
        src={image}
        alt={name}
        className="relative z-10 h-full w-full rounded-lg object-cover"
      />
      <div className="absolute inset-0 flex items-start justify-center gap-4 p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <button type="button" className="hover:text-brand-black cursor-pointer">
          <InstagramLogoIcon size={64} weight="duotone" />
        </button>
        <button type="button" className="hover:text-brand-black cursor-pointer">
          <SpotifyLogoIcon size={64} weight="duotone" />
        </button>
        <button type="button" className="hover:text-brand-black cursor-pointer">
          <PlayCircleIcon size={64} weight="duotone" />
        </button>
      </div>
    </div>
  );
}
