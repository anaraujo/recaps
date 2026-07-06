export default function Game() {
  return (
    <main className="flex min-h-0 flex-1 flex-col items-center justify-center pl-60">
      <div
        className="border-brand-orange relative h-full max-h-800 max-w-800 overflow-hidden rounded-lg border-2"
        style={{ aspectRatio: '1 / 1' }}
      >
        <iframe
          src="https://flappy-bee-pi.vercel.app/"
          title="Flappy Bee"
          className="h-full w-full border-0"
          allow="autoplay"
        />
      </div>
    </main>
  );
}
