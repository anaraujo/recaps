export default function Artistas() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-white pt-24 px-8">
      <h1 className="text-3xl font-bold mb-8">Artistas</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-square bg-brand-orange rounded-lg" />
        ))}
      </div>
    </main>
  );
}
