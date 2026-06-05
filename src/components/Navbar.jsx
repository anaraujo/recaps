import { NavLink } from 'react-router-dom';
import logo from 'assets/favicon.png';
import RollingText from 'components/RollingText';

const links = [
  { to: '/', label: 'Home' },
  { to: '/artists', label: 'Artistas' },
  { to: '/news', label: 'Novidades' },
  { to: '/game', label: 'Jogo' },
];

export default function Navbar() {
  return (
    <nav className="text-brand-white bg-brand-orange/50 border-brand-white absolute left-0 z-50 flex h-full w-60 flex-col justify-between px-12 py-24">
      <div className="flex flex-col gap-8">
        <img src={logo} alt="Recaps" className="mx-auto size-32" />
        <ul className="flex -rotate-4 flex-col gap-6 text-sm font-bold tracking-[0.4rem] lowercase italic">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
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

      {/* <li className="text-brand-black hover:text-brand-white font-semibold"> */}
      <a
        href="https://recaps.net.br"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-brand-black -rotate-4 self-end justify-self-end-safe"
      >
        <RollingText text="Shop" />
      </a>
      {/* </li> */}
    </nav>
  );
}
