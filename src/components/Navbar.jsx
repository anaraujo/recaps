import { lazy, Suspense, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import application from 'assets/icons/application.png';
import book from 'assets/icons/book.png';
import cd from 'assets/icons/cd.png';
import file from 'assets/icons/file.png';
import folder from 'assets/icons/old-open-folder.png';
import globe from 'assets/icons/globe.png';
import pc from 'assets/icons/pc.png';
import phone from 'assets/icons/phone.png';
import lab from 'assets/icons/lab.png';
import { links } from 'data/site.json';

const RollingText = lazy(() => import('components/RollingText'));

const routePrefetchers = {
  '/': () => import('pages/Home'),
  '/artists': () => import('pages/Artists'),
  '/news': () => import('pages/News'),
  '/archive': () => import('pages/Archive'),
  '/game': () => import('pages/Game'),
  // '/shows': () => import('pages/Shows'),
};

const icons = {
  application,
  book,
  cd,
  file,
  folder,
  globe,
  pc,
  phone,
  lab,
};

const shopFallbackClass =
  'mb-8 text-5xl font-semibold lowercase italic leading-none tracking-tight';

export default function Navbar() {
  useEffect(() => {
    const prefetchRollingText = () => import('components/RollingText');
    const id = requestIdleCallback(prefetchRollingText);
    return () => cancelIdleCallback(id);
  }, []);

  return (
    <nav className="text-brand-black bg-brand-light-gray border-b-brand-black border-r-brand-black border-t-brand-white border-l-brand-white absolute bottom-7.5 left-0 z-50 grid h-[calc(100vh-60px)] min-h-96 min-w-60 grid-cols-[50px_1fr] justify-between border-2">
      <div className="border-brand-gray bg-brand-dark-gray text-brand-light-gray border-tl-2 flex items-end pr-1 pb-4 text-[40px] leading-8 font-extrabold uppercase [writing-mode:sideways-lr]">
        <span>Recaps</span>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-8">
          {/* <img src={logo} alt="Recaps" className="mx-auto size-32" /> */}
          <ul className="flex flex-col gap-6 pt-6 pb-3 text-xl">
            {links.map(({ to, iconName, label }) => (
              <li className="group hover:bg-brand-orange py-2" key={to}>
                <NavLink
                  to={to}
                  onMouseEnter={() => routePrefetchers[to]?.()}
                  onFocus={() => routePrefetchers[to]?.()}
                  className={({ isActive }) =>
                    `font-secondary flex items-center gap-x-6 px-3 ${
                      isActive
                        ? 'text-brand-black group-hover:text-brand-white underline underline-offset-4'
                        : 'group-hover:text-brand-white'
                    }`
                  }
                >
                  <img src={icons[iconName]} alt="Recaps" className="size-10" />
                  <span className="inline-block first-letter:underline">
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-brand-gray border-b-0.5 w-full">
          <div className="bg-brand-dark-gray border-b-brand-white box-content h-0.5 w-full border-b"></div>

          <a
            href="https://recaps.net.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-brand-orange font-secondary hover:text-brand-white flex items-center gap-6 gap-x-2.5 px-3 py-2 pt-4 pb-3 text-xl first-letter:underline"
          >
            <img src={globe} alt="Recaps" className="size-10" />
            <span>Loja online...</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
