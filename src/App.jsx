import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Principal from "pages/Principal";
import Artistas from "pages/Artistas";
import Jogo from "pages/Jogo";
import Footer from "components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/jogo" element={<Jogo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
