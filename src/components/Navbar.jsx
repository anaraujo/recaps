import { lazy, useEffect } from 'react';
import globe from 'assets/icons/globe.png';
import { links } from 'data/site.json';
import NavbarItem from 'components/molecules/NavbarItem';

const RollingText = lazy(() => import('components/RollingText'));

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
                <NavbarItem to={to} iconName={iconName} label={label} />
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
