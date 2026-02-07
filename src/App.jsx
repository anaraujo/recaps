import { Routes, Route } from "react-router-dom";
import Navbar from "components/Navbar";
import Principal from "pages/Principal";
import Artistas from "pages/Artistas";
import Jogo from "pages/Jogo";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/artistas" element={<Artistas />} />
        <Route path="/jogo" element={<Jogo />} />
      </Routes>
    </>
  );
}
