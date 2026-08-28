import { NavLink } from 'react-router-dom';
import NavIcon from 'components/atoms/NavIcon';
import application from 'assets/icons/application.png';
import book from 'assets/icons/book.png';
import cd from 'assets/icons/cd.png';
import file from 'assets/icons/file.png';
import folder from 'assets/icons/old-open-folder.png';
import globe from 'assets/icons/globe.png';
import pc from 'assets/icons/pc.png';
import phone from 'assets/icons/phone.png';
import lab from 'assets/icons/lab.png';

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

export default function NavbarItem({ to, iconName, label }) {
  return (
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
      <NavIcon src={icons[iconName]} />
      <span className="inline-block first-letter:underline">{label}</span>
    </NavLink>
  );
}
