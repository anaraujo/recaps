import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Principal" },
  { to: "/artistas", label: "Artistas" },
  { to: "/jogo", label: "Jogo" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 w-full z-50 flex items-center justify-between px-8 py-4 bg-black/60 backdrop-blur-sm text-white">
      <NavLink to="/" className="text-xl font-bold tracking-widest uppercase">
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
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
            Loja
          </a>
        </li>
      </ul>
    </nav>
  );
}
