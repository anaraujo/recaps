import folder from 'assets/icons/orange-folder.png';
import openFolder from 'assets/icons/orange-open-folder.png';
import NewsDialog from './NewsDialog';
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
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="min-h-screen pt-24 pr-8 pb-16 pl-69">
      <div className="relative grid grid-cols-1 gap-20 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8">
        {news.map(({ name, title, src, instagram, spotify, youtube }, i) => {
          const dialogId = `dialog-${i}`;

          return (
            <div key={i}>
              <button
                command="show-modal"
                commandfor={dialogId}
                className="flex flex-col items-center justify-end gap-2 p-3"
                onClick={() => setOpenIndex(i)}
              >
                <img
                  src={openIndex === i ? openFolder : folder}
                  alt="Folder"
                  className="max-w-28"
                />
                <span className="bg-brand-white text-brand-black px-2 py-0.5 text-sm">
                  {name}
                </span>
              </button>

              <NewsDialog
                dialogId={dialogId}
                title={title}
                name={name}
                src={src}
                onClose={() => setOpenIndex(null)}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
