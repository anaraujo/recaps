import artists from 'data/artists.json';
import Artist from './Artist';

const artistCards = artists.flatMap(
  ({ name, instagram, spotify, youtubeMusic, images }) =>
    images.map((image) => ({ name, instagram, spotify, youtubeMusic, image })),
);

export default function Artists() {
  return (
    <main className="bg-repeating-linear-gradient h-full overflow-auto p-8 pb-16 pl-69">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {artistCards.map(({ name, image, instagram, spotify, youtubeMusic }, i) => (
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
