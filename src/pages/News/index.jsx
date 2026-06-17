import planet from 'assets/icons/planet.gif';
import folder from 'assets/icons/orange-folder.png';
import openFolder from 'assets/icons/orange-open-folder.png';
import close from 'assets/icons/close.png';
import NewsItem from './NewsItem';
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
  const [isCurrent, setIsCurrent] = useState();

  const handleAnyBtnClick = () => {
    anyDialog.showModal();
  };

  const toggleIcon = () => {
    setIsOpenFolder((prev) => !prev);
  };

  const setIcon = () => {
    isOpenFolder ? openFolder : folder;
  };

  const open = (i) => {
    console.log(i);
    setCurrent(i);
    setIsOpenFolder(true);
    anyDialog.showModal();
  };
  return (
    <main className="min-h-screen p-8 pb-16 pl-69">
      <div className="relaive grid grid-cols-2 gap-20 md:grid-cols-3 lg:grid-cols-4">
        {news.map(({ name, title, src, instagram, spotify, youtube }, i) => (
          <div key={i}>
            <button
              command="show-modal"
              commandfor="dialog"
              className="flex h-48 flex-col items-center justify-end gap-2 p-3"
              onClick={toggleIcon}
            >
              {current}
              <img
                src={isOpenFolder ? openFolder : folder}
                alt="Folder"
                className="max-w-36"
              />
              <span className="bg-brand-white text-brand-black px-2 py-0.5 text-sm">
                {name}
              </span>
            </button>

            <dialog
              className="border-brand-gray m-auto rounded-tl-lg rounded-br-lg border border-solid backdrop:bg-gray-900/50"
              id="dialog"
              closedby="any"
              onClick={toggleIcon}
            >
              <NewsItem title={title} name={name} src={src} />
            </dialog>
          </div>
        ))}
      </div>
    </main>
  );
}
