import vero2 from 'assets/artists/vero-2.png';
import vero from 'assets/artists/vero.png';
import fortes from 'assets/artists/fortes.png';
import fortes2 from 'assets/artists/fortes-2.png';
import bin from 'assets/artists/bin.png';
import bin2 from 'assets/artists/bin-2.png';
import planet from 'assets/icons/planet.gif';
import folder from 'assets/icons/folder.png';
import openFolder from 'assets/icons/open-folder.png';
import close from 'assets/icons/close.png';
import RollingText from 'components/RollingText';
import NewsItem from './NewsItem';
import { XSquareIcon } from '@phosphor-icons/react';
import { useState } from 'react';

const news = [
  {
    name: 'Kyle Fortes',
    title: '"Deusvemdeovni", por Kyle Fortes e lucasbin',
    src: 'https://www.youtube.com/embed/3AoEVp56XP8?si=KJhCxfnMED2A7bAf',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'VERO',
    src: 'https://www.youtube.com/embed/3AoEVp56XP8?si=KJhCxfnMED2A7bAf',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'kyle fortes',
    src: 'https://www.youtube.com/embed/3AoEVp56XP8?si=KJhCxfnMED2A7bAf',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'kyle fortes',
    src: 'https://www.youtube.com/embed/3AoEVp56XP8?si=KJhCxfnMED2A7bAf',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'lucasbin',
    src: 'https://www.youtube.com/embed/3AoEVp56XP8?si=KJhCxfnMED2A7bAf',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'lucasbin',
    src: 'https://www.youtube.com/embed/3AoEVp56XP8?si=KJhCxfnMED2A7bAf',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
];

export default function News() {
  const anyDialog = document.querySelector("[closedby='any']");
  const [isOpenFolder, setIsOpenFolder] = useState(false);
  const [current, setCurrent] = useState();

  const handleAnyBtnClick = () => {
    anyDialog.showModal();
  };

  const toggleIcon = () => {
    setIsOpenFolder((prev) => !prev);
  };

  const setIcon = () => {
    isOpenFolder ? openFolder : folder;
  };

  return (
    <main className="min-h-screen p-8 pb-16 pl-60">
      <div className="relaive grid grid-cols-2 gap-20 md:grid-cols-3 lg:grid-cols-4">
        {news.map(({ name, title, src, instagram, spotify, youtube }, i) => (
          <>
            <button
              key={i}
              command="show-modal"
              commandfor="dialog"
              className="flex flex-col items-center justify-center gap-2 p-3"
              onClick={toggleIcon}
            >
              <img
                src={isOpenFolder ? openFolder : folder}
                alt="Folder"
                className=""
              />
              <span className="bg-brand-white text-brand-black px-2 py-0.5 text-sm">
                {name}
              </span>
            </button>

            <dialog
              className="border-brand-gray m-auto rounded-tl-sm rounded-br-sm border border-solid backdrop:bg-gray-900/50"
              id="dialog"
              closedby="any"
              onClose={toggleIcon}
            >
              {/* dialog header */}
              <div className="bg-header-gradient flex items-center justify-between border border-solid border-white p-2">
                <div className="flex items-center gap-2">
                  <img src={planet} alt="Planet" className="w-5" />
                  <span className="text-brand-white text-sm font-bold tracking-[0.2rem] lowercase italic">
                    {title || name}
                  </span>
                </div>
                <button
                  className="bg-brand-white justify-self-end rounded-tl-sm rounded-br-sm p-px"
                  commandfor="dialog"
                  command="close"
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
            </dialog>
          </>
        ))}
      </div>
    </main>
  );
}
