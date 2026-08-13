import { lazy, Suspense, useCallback, useState } from 'react';
import folder from 'assets/icons/orange-folder.png';
import openFolder from 'assets/icons/orange-open-folder.png';
import news from 'data/news.json';
import NewsDialog from './NewsDialog';
import { prefersReducedMotion } from 'utils/paperCanvas';

const backgroundLoaders = [
  () => import('components/backgrounds/MetaBalls'),
  () => import('components/backgrounds/Smoothing'),
  () => import('components/backgrounds/Voronoi'),
  () => import('components/backgrounds/RadialOrange'),
];

export default function Archive() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleClose = useCallback(() => setOpenIndex(null), []);

  const reducedMotion = prefersReducedMotion();
  const [Background] = useState(() => {
    if (reducedMotion) return null;
    const index = Math.floor(Math.random() * backgroundLoaders.length);
    return lazy(backgroundLoaders[index]);
  });

  return (
    <main className="min-h-screen pt-24 pr-8 pb-16 pl-69">
      {Background && (
        <Suspense fallback={null}>
          <Background />
        </Suspense>
      )}
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
