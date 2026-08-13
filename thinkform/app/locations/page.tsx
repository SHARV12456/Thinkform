import Link from 'next/link';

export default function Locations() {
  const places = [
    { slug: 'borivali', label: 'Borivali' },
    { slug: 'andheri', label: 'Andheri' },
    { slug: 'bandra', label: 'Bandra' },
    { slug: 'dadar', label: 'Dadar' },
    { slug: 'lower-parel', label: 'Lower Parel' },
  ];

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">← Back</Link>
        <h1 className="text-4xl font-black mb-6">Areas We Serve — Western Mumbai</h1>
        <p className="text-lg text-[#666] mb-8">We run 1:1 sessions across Western Mumbai. Choose a nearby area to see local booking options.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {places.map(p => (
            <Link key={p.slug} href={`/locations/${p.slug}`} className="block p-6 bg-white border rounded-lg hover:shadow-md">
              <h3 className="font-bold text-lg mb-1">{p.label}</h3>
              <p className="text-sm text-[#666]">Book a local session in {p.label} or online.</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
