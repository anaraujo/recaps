import vero2 from 'assets/artists/vero-2.png';
import vero from 'assets/artists/vero.png';
import fortes from 'assets/artists/fortes.png';
import fortes2 from 'assets/artists/fortes-2.png';
import bin from 'assets/artists/bin.png';
import bin2 from 'assets/artists/bin-2.png';
import RollingText from 'components/RollingText';
import NewsItem from './NewsItem';
import NewsItemSleeve from './NewsItemSleeve';

const news = [
  {
    name: 'VERO',
    image: vero,
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'VERO',
    image: vero2,
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'kyle fortes',
    image: fortes,
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'kyle fortes',
    image: fortes2,
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'lucasbin',
    image: bin,
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
  {
    name: 'lucasbin',
    image: bin2,
    instagram: '#',
    spotify: '#',
    youtube: '#',
  },
];

export default function News() {
  return (
    <main className="min-h-screen px-8">
      <RollingText text="Novidades" />
      <div className="grid grid-cols-2 gap-20 md:grid-cols-3 lg:grid-cols-4">
        {news.map(({ name, image, instagram, spotify, youtube }, i) => {
          // Alternate between splatter (C) and sleeve (D) so both can be
          // compared side by side. Drop one once you pick a winner.
          const Item = i % 2 === 0 ? NewsItem : NewsItemSleeve;
          return (
            <Item
              key={i}
              name={name}
              image={image}
              instagram={instagram}
              spotify={spotify}
              youtube={youtube}
            />
          );
        })}
      </div>
    </main>
  );
}
