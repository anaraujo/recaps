import { Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Home from 'pages/Home';
import Artists from 'pages/Artists';
import News from 'pages/News';
import Game from 'pages/Game';
import Footer from 'components/Footer';
import SpotifyPlayer from 'components/SpotifyPlayer';

export default function App() {
  return (
    <div className="bg-brand-black text-brand-white flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/news" element={<News />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
      <SpotifyPlayer />
      <Footer />
    </div>
  );
}
