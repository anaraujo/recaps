import { Routes, Route } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Principal from 'pages/Principal';
import Artistas from 'pages/Artistas';
import Novidades from 'pages/Novidades';
import Jogo from 'pages/Jogo';
import Footer from 'components/Footer';

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/novidades" element={<Novidades />} />
          <Route path="/jogo" element={<Jogo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
