import vero2 from 'assets/artists/vero-2.png';
import vero from 'assets/artists/vero.png';
import fortes from 'assets/artists/fortes.png';
import fortes2 from 'assets/artists/fortes-2.png';
import bin from 'assets/artists/bin.png';
import bin2 from 'assets/artists/bin-2.png';
import Artist from './Artist';

const artists = [
  {
    name: 'VERO',
    instagram: 'https://www.instagram.com/jazzdavero/',
    spotify: 'https://open.spotify.com/intl-pt/artist/4jGsOURk2Pxk4BtofViTGj',
    youtubeMusic: 'https://music.youtube.com/channel/UCqRu52tp2TL4niMbaT9H9Fg',
    image: vero,
  },
  {
    name: 'VERO',
    instagram: 'https://www.instagram.com/jazzdavero/',
    spotify: 'https://open.spotify.com/intl-pt/artist/4jGsOURk2Pxk4BtofViTGj',
    youtubeMusic: 'https://music.youtube.com/channel/UCqRu52tp2TL4niMbaT9H9Fg',
    image: vero2,
  },
  {
    name: 'kyle fortes',
    instagram: 'https://www.instagram.com/fxrtess/',
    spotify: 'https://open.spotify.com/intl-pt/artist/6dNbjGxPkhGLjBNNJLlulK',
    youtubeMusic: 'https://music.youtube.com/channel/UCaeJuJw3vluw9HJUDOtIF8A',
    image: fortes,
  },
  {
    name: 'kyle fortes',
    instagram: 'https://www.instagram.com/fxrtess/',
    spotify: 'https://open.spotify.com/intl-pt/artist/6dNbjGxPkhGLjBNNJLlulK',
    youtubeMusic: 'https://music.youtube.com/channel/UCaeJuJw3vluw9HJUDOtIF8A',
    image: fortes2,
  },
  {
    name: 'lucasbin',
    instagram: 'https://www.instagram.com/lucasbin__/',
    spotify: 'https://open.spotify.com/intl-pt/artist/7KYrffinPH0x6rrRIqIBid',
    youtubeMusic: 'https://music.youtube.com/channel/UCxHike0Q4ka062MMHia6M2Q',
    image: bin,
  },
  {
    name: 'lucasbin',
    instagram: 'https://www.instagram.com/lucasbin__/',
    spotify: 'https://open.spotify.com/intl-pt/artist/7KYrffinPH0x6rrRIqIBid',
    youtubeMusic: 'https://music.youtube.com/channel/UCxHike0Q4ka062MMHia6M2Q',
    image: bin2,
  },
];

export default function Artists() {
  return (
    <main className="ml-60 h-full overflow-auto p-8 pb-16">
      <div className="gap-6s grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artists.map(({ name, image, instagram, spotify, youtubeMusic }, i) => (
          <Artist
            key={i}
            name={name}
            image={image}
            instagram={instagram}
            spotify={spotify}
            youtubeMusic={youtubeMusic}
          />
        ))}
      </div>
    </main>
  );
}
