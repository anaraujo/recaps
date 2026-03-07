import { NavLink } from 'react-router-dom';
import logo from 'assets/channels4_profile.jpg';

const links = [
  { to: '/', label: 'Principal' },
  { to: '/artistas', label: 'Artistas' },
  { to: '/novidades', label: 'Novidades' },
  { to: '/jogo', label: 'Jogo' },
];

export default function Navbar() {
  return (
    <nav className="bg-brand-orange text-brand-white sticky top-0 z-50 flex w-full items-center justify-between px-8 py-4">
      <NavLink
        to="/"
        className="flex items-center gap-2 text-xl font-bold tracking-widest uppercase"
      >
        <img src={logo} alt="Recaps" className="h-8 w-auto" />
        Recaps
      </NavLink>
      <ul className="flex gap-6 text-sm tracking-wider uppercase">
        {links.map(({ to, label }) => (
          <li key={to} className="hover:text-brand-black">
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? 'underline underline-offset-4' : 'hover:opacity-70'
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li className="text-brand-black hover:text-brand-white font-semibold">
          <a
            href="https://recaps.net.br"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-70"
          >
            Loja
          </a>
        </li>
      </ul>
    </nav>
  );
}
