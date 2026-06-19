import {
  InstagramLogoIcon,
  SpotifyLogoIcon,
  YoutubeLogoIcon,
} from '@phosphor-icons/react';

import planet from 'assets/icons/planet.gif';
import close from 'assets/icons/close.png';

export default function NewsItem({
  dialogId,
  name,
  title,
  src,
  onClose,
  onDragHandlePointerDown,
}) {
  return (
    <div className="">
      {/* dialog header */}
      <div className="bg-header-gradient flex items-center justify-between rounded-tl-lg border border-solid border-white p-2">
        <div
          className="flex flex-1 cursor-grab items-center gap-2 active:cursor-grabbing"
          onPointerDown={onDragHandlePointerDown}
        >
          <img src={planet} alt="Planet" className="w-5" />
          <span className="text-brand-white text-sm font-bold tracking-[0.2rem] lowercase italic">
            {title || name}
          </span>
        </div>
        <button
          className="bg-brand-white justify-self-end rounded-tl-sm rounded-br-sm p-px"
          commandfor={dialogId}
          command="close"
          onClick={onClose}
        >
          <img src={close} alt="Close" className="size-6" />
        </button>
      </div>
      {/* dialog body */}
      <div className="bg-brand-gray border border-solid border-white p-4">
        <iframe
          width="560"
          height="315"
          src={src}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}
