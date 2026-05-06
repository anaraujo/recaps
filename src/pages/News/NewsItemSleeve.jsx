import {
  InstagramLogoIcon,
  SpotifyLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';

export default function NewsItemSleeve({
  name,
  image,
  instagram,
  spotify,
  youtube,
}) {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[325px]">
      {/* Vinyl behind sleeve — slides up on hover, spins via vinyl-spin */}
      <div className="absolute inset-0 z-0 transition-transform duration-500 ease-out group-hover:-translate-y-[42%]">
        <div
          className="vinyl-spin h-full w-full rounded-full bg-zinc-950 shadow-2xl"
          style={{
            backgroundImage:
              'repeating-radial-gradient(circle at center, #050505 0 1px, #1a1a1a 1px 3px)',
          }}
        >
          {/* Center label — brand orange disc */}
          <div className="bg-brand-orange absolute inset-[34%] flex items-center justify-center overflow-hidden rounded-full ring-2 ring-zinc-900">
            <span className="text-brand-black px-1 text-center text-[0.65rem] font-bold tracking-widest uppercase">
              {name}
            </span>
          </div>
          {/* Spindle */}
          <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800" />
        </div>
      </div>

      {/* Sleeve in front — square album cover */}
      <div className="absolute inset-0 z-10 overflow-hidden rounded-sm shadow-xl ring-1 ring-zinc-700/60">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
        {/* subtle inner edge to suggest cardboard */}
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/40" />
      </div>

      {/* Social buttons — appear above the sleeve, on the visible vinyl peek */}
      <div className="absolute -top-[18%] right-0 left-0 z-20 flex justify-center gap-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-300">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no Instagram`}
          className="text-brand-white hover:text-brand-orange hover:mix-blend-difference cursor-pointer"
        >
          <InstagramLogoIcon size={40} weight="duotone" />
        </a>
        <a
          href={spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no Spotify`}
          className="text-brand-white hover:text-brand-orange hover:mix-blend-difference cursor-pointer"
        >
          <SpotifyLogoIcon size={40} weight="duotone" />
        </a>
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no YouTube`}
          className="text-brand-white hover:text-brand-orange hover:mix-blend-difference cursor-pointer"
        >
          <YoutubeLogoIcon size={40} weight="duotone" />
        </a>
      </div>
    </div>
  );
}
