import vero2 from 'assets/artists/vero-2.png';
import vero from 'assets/artists/vero.png';
import fortes from 'assets/artists/fortes.png';
import fortes2 from 'assets/artists/fortes-2.png';
import bin from 'assets/artists/bin.png';
import bin2 from 'assets/artists/bin-2.png';
import ScrambleText from 'components/ScrambleText';
import NewsItem from './NewsItem';

const news = [
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

export default function News() {
  return (
    <main className="min-h-screen px-8">
      <ScrambleText text="Novidades" />
      {/* <h1 className="relative my-8 text-center text-5xl font-bold tracking-widest uppercase">
        News
      </h1> */}
      <div className="grid grid-cols-2 gap-20 md:grid-cols-3 lg:grid-cols-4">
        {news.map(({ name, image }, i) => (
          <NewsItem key={i} name={name} image={image} />
        ))}
      </div>
    </main>
  );
}
