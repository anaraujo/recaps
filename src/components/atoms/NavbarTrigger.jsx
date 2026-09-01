import { motion } from 'motion/react';
import logo from 'assets/favicon.png';

export default function NavbarTrigger({ isOpen, onToggle }) {
  return (
    <motion.button
      type="button"
      className="bg-brand-light-gray border-brand-white border-t-brand-black border-l-brand-black flex cursor-pointer items-center justify-center border-2 p-1"
      aria-expanded={isOpen}
      aria-controls="site-nav"
      whileTap={{ scale: 0.95 }}
      onClick={onToggle}
    >
      <div className="border-brand-black flex items-center gap-1 border border-dotted">
        <img src={logo} alt="Recaps" className="mx-auto h-7" />
        <span className="font-secondary mx-1 text-lg font-bold">Iniciar</span>
      </div>
    </motion.button>
  );
}
