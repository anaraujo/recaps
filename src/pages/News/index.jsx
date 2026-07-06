import { useCallback, useState } from 'react';
import folder from 'assets/icons/orange-folder.png';
import openFolder from 'assets/icons/orange-open-folder.png';
import NewsDialog from './NewsDialog';

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
    name: 'lucasbin',
    title: 'lucasbin - CONTRACULTURA (Álbum Completo)',
    src: 'https://www.youtube.com/embed/JE_dMg593dQ?si=2CeKvYG38SImnyuM',
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'VERO',
    title: 'VERO No Sótão (live session)',
    src: 'https://www.youtube.com/embed/mlq6sjhA50w?si=MoLfXgsTupR04Wg0',
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
  const handleClose = useCallback(() => setOpenIndex(null), []);

  return (
    <main className="min-h-screen pt-24 pr-8 pb-16 pl-69">
      <div className="relative grid grid-cols-[repeat(auto-fill,minmax(min(100%,10rem),1fr))] gap-20">
        {news.map(({ name, title, src, instagram, spotify, youtube }, i) => {
          const dialogId = `dialog-${i}`;
          const isOpen = openIndex === i;

          return (
            <div key={i}>
              <button
                command="show-modal"
                commandfor={dialogId}
                className="flex w-full flex-col items-center justify-end gap-2 p-3"
                onClick={() => setOpenIndex(i)}
              >
                <div className="flex h-28 w-full items-end justify-center">
                  <img
                    src={isOpen ? openFolder : folder}
                    alt="Folder"
                    className="w-auto max-w-28 object-contain"
                  />
                </div>
                <span className="bg-brand-white text-brand-black px-2 py-0.5 text-sm">
                  {name}
                </span>
              </button>

              {isOpen && (
                <NewsDialog
                  dialogId={dialogId}
                  title={title}
                  name={name}
                  src={src}
                  isOpen
                  onClose={handleClose}
                />
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
