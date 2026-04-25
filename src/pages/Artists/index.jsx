import vero2 from 'assets/artists/vero-2.png';
import vero from 'assets/artists/vero.png';
import fortes from 'assets/artists/fortes.png';
import fortes2 from 'assets/artists/fortes-2.png';
import bin from 'assets/artists/bin.png';
import bin2 from 'assets/artists/bin-2.png';
import RollingText from 'components/RollingText';
import Artist from './Artist';

const artists = [
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

export default function Artists() {
  return (
    <main className="min-h-screen px-8">
      <RollingText text="Artistas" />
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {artists.map(({ name, image }, i) => (
          <Artist key={i} name={name} image={image} />
        ))}
      </div>
    </main>
  );
}
