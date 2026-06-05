import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Home = lazy(() => import('pages/Home'));
const Artists = lazy(() => import('pages/Artists'));
const News = lazy(() => import('pages/News'));
const Game = lazy(() => import('pages/Game'));

export default function App() {
  return (
    <div className="bg-brand-black text-brand-white h-screen overflow-hidden">
      <Navbar />
      <main className="bg-repeating-linear-gradient flex h-full flex-col pb-8">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/news" element={<News />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
