import { NavLink } from "react-router-dom";
import logo from "assets/channels4_profile.jpg";

const links = [
  { to: "/", label: "Principal" },
  { to: "/artistas", label: "Artistas" },
  { to: "/jogo", label: "Jogo" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-brand-orange backdrop-blur-sm text-brand-white">
      <NavLink to="/" className="flex items-center gap-2 text-xl font-bold tracking-widest uppercase">
        <img src={logo} alt="Recaps" className="h-8 w-auto" />
        Recaps
      </NavLink>
      <ul className="flex gap-6 text-sm uppercase tracking-wider">
        {links.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? "underline underline-offset-4" : "hover:opacity-70"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
        <li>
          <a href="https://recaps.net.br" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
            Loja
          </a>
        </li>
      </ul>
    </nav>
  );
}
