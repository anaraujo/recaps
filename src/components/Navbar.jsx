import { lazy, Suspense, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import logo from 'assets/favicon.png';

const RollingText = lazy(() => import('components/RollingText'));

const routePrefetchers = {
  '/': () => import('pages/Home'),
  '/artists': () => import('pages/Artists'),
  '/news': () => import('pages/News'),
  '/game': () => import('pages/Game'),
};

const links = [
  { to: '/', label: 'Home' },
  { to: '/artists', label: 'Artistas' },
  { to: '/news', label: 'Lançamentos' },
  { to: '/game', label: 'Jogo' },
];

const shopFallbackClass =
  'mb-8 text-5xl font-semibold lowercase italic leading-none tracking-tight';

export default function Navbar() {
  useEffect(() => {
    const prefetchRollingText = () => import('components/RollingText');
    const id = requestIdleCallback(prefetchRollingText);
    return () => cancelIdleCallback(id);
  }, []);

  return (
    <nav className="text-brand-gray bg-brand-orange/50 border-brand-white absolute left-0 z-50 flex h-full w-60 flex-col justify-between px-12 py-24">
      <div className="flex flex-col gap-8">
        <img src={logo} alt="Recaps" className="mx-auto size-32" />
        <ul className="flex -rotate-4 flex-col gap-6 text-sm font-bold tracking-[0.4rem] lowercase italic">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onMouseEnter={() => routePrefetchers[to]?.()}
                onFocus={() => routePrefetchers[to]?.()}
                className={({ isActive }) =>
                  isActive
                    ? 'text-brand-black hover:text-brand-white underline underline-offset-4'
                    : 'hover:text-brand-black'
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="https://recaps.net.br"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-brand-black -rotate-4 self-end justify-self-end-safe"
      >
        <Suspense fallback={<span className={shopFallbackClass}>Shop</span>}>
          <RollingText text="Shop" />
        </Suspense>
      </a>
    </nav>
  );
}
