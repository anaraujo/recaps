import { lazy, Suspense, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Navbar from 'components/organisms/Navbar';
import Footer from 'components/Footer';

const Home = lazy(() => import('pages/Home'));
const Artists = lazy(() => import('pages/Artists'));
const News = lazy(() => import('pages/News'));
const Archive = lazy(() => import('pages/Archive'));
const About = lazy(() => import('pages/About'));
const Game = lazy(() => import('pages/Game'));

export default function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggleNav = () => setIsNavOpen((v) => !v);

  return (
    <div className="bg-brand-black text-brand-gray relative h-screen overflow-hidden">
      <AnimatePresence>{isNavOpen && <Navbar />}</AnimatePresence>
      <main className="bg-repeating-linear-gradient flex h-full flex-col pb-8">
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <div className="border-brand-orange size-8 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/news" element={<News />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </main>

      <Footer isNavOpen={isNavOpen} onToggleNav={toggleNav} />
    </div>
  );
}
