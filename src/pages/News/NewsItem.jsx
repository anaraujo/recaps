import {
  InstagramLogoIcon,
  SpotifyLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';

export default function NewsItem({ name, image, instagram, spotify, youtube }) {
  return (
    <div className="group relative mx-auto aspect-square w-full max-w-[325px]">
      {/* Turntable platter */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-950 shadow-2xl ring-1 ring-zinc-600/50" />

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
    </div>
  );
}
