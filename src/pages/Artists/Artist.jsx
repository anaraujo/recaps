import {
  InstagramLogoIcon,
  SpotifyLogoIcon,
  PlayCircleIcon,
} from '@phosphor-icons/react';

export default function Artist({
  name,
  image,
  instagram,
  spotify,
  youtubeMusic,
}) {
  return (
    <div className="group from-brand-orange hover:to-brand-orange relative mx-auto aspect-square w-full max-w-[325px] rounded-[100%] bg-linear-to-t from-25% to-transparent to-25%">
      <img
        src={image}
        alt={name}
        className="pointer-events-none relative z-10 h-full w-full rounded-[100%] object-cover"
      />
      <div className="absolute inset-0 flex items-start justify-center gap-4 p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no Instagram`}
          className="text-brand-white hover:text-brand-orange hover:mix-blend-difference cursor-pointer"
        >
          <InstagramLogoIcon size={64} weight="duotone" />
        </a>
        <a
          href={spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no Spotify`}
          className="text-brand-white hover:text-brand-orange hover:mix-blend-difference cursor-pointer"
        >
          <SpotifyLogoIcon size={64} weight="duotone" />
        </a>
        <a
          href={youtubeMusic}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no YouTube Music`}
          className="text-brand-white hover:text-brand-orange hover:mix-blend-difference cursor-pointer"
        >
          <PlayCircleIcon size={64} weight="duotone" />
        </a>
      </div>
    </div>
  );
}
