import vero2 from 'assets/artistas/vero-2.png';
import vero from 'assets/artistas/vero.png';
import fortes from 'assets/artistas/fortes.png';
import fortes2 from 'assets/artistas/fortes-2.png';
import bin from 'assets/artistas/bin.png';
import bin2 from 'assets/artistas/bin-2.png';
import Artista from './Artista';

const artistas = [
  {
    name: 'VERO',
    image: vero,
  },
  {
    name: 'VERO',
    image: vero2,
  },
  {
    name: 'kyle fortes',
    image: fortes,
  },
  {
    name: 'kyle fortes',
    image: fortes2,
  },
  {
    name: 'lucasbin',
    image: bin,
  },
  {
    name: 'lucasbin',
    image: bin2,
  },
];

export default function Artistas() {
  return (
    <main className="bg-brand-black text-brand-white min-h-screen px-8">
      <h1 className="relative my-8 text-center text-5xl font-bold tracking-widest uppercase">
        Artistas
      </h1>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {artistas.map(({ name, image }, i) => (
          <Artista key={i} name={name} image={image} />
        ))}
      </div>
    </main>
  );
}
