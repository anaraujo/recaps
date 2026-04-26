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
    <div className="bg-brand-black text-brand-white flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
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
