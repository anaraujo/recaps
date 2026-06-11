import {
  InstagramLogoIcon,
  SpotifyLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';

export default function NewsItem({ name, image, instagram, spotify, youtube }) {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-81.25">
      {/* Turntable platter */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-zinc-700 via-zinc-800 to-zinc-950 shadow-2xl ring-1 ring-zinc-600/50" />

      {/* Vinyl record (spinning layer) */}
      <div
        className="vinyl-spin absolute inset-[5%] rounded-full bg-zinc-950"
        style={{
          backgroundImage:
            'repeating-radial-gradient(circle at center, #050505 0 1px, #1a1a1a 1px 3px)',
        }}
      >
        {/* Center label */}
        <div className="absolute inset-[34%] overflow-hidden rounded-full ring-2 ring-zinc-900">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        {/* Spindle */}
        <div className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-800" />
      </div>

      {/* Tonearm */}
      <svg
        viewBox="0 0 100 100"
        className="pointer-events-none absolute inset-0 z-10 h-full w-full origin-[88%_12%] -rotate-18 transition-transform duration-300 ease-out group-hover:rotate-[22deg]"
      >
        {/* pivot base */}
        <circle cx="88" cy="12" r="6" fill="#555" />
        <circle cx="88" cy="12" r="2.5" fill="#222" />
        {/* arm */}
        <line
          x1="88"
          y1="12"
          x2="38"
          y2="62"
          stroke="#9a9a9a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* counterweight (back of pivot) */}
        <line
          x1="88"
          y1="12"
          x2="96"
          y2="4"
          stroke="#777"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* headshell + needle */}
        <g transform="rotate(45 38 62)">
          <rect x="32" y="58" width="13" height="8" rx="1.5" fill="#3a3a3a" />
          <rect x="38" y="65" width="1.5" height="3" fill="#bbb" />
        </g>
      </svg>

      {/* Social buttons */}
      <div className="absolute inset-x-0 top-[6%] z-20 flex justify-center gap-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-300">
        <a
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no Instagram`}
          className="text-brand-white hover:text-brand-orange cursor-pointer hover:mix-blend-difference"
        >
          <InstagramLogoIcon size={48} weight="duotone" />
        </a>
        <a
          href={spotify}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no Spotify`}
          className="text-brand-white hover:text-brand-orange cursor-pointer hover:mix-blend-difference"
        >
          <SpotifyLogoIcon size={48} weight="duotone" />
        </a>
        <a
          href={youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${name} no YouTube`}
          className="text-brand-white hover:text-brand-orange cursor-pointer hover:mix-blend-difference"
        >
          <YoutubeLogoIcon size={48} weight="duotone" />
        </a>
      </div>
    </div>
  );
}
