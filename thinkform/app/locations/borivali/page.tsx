import Link from 'next/link';

export const metadata = {
  title: 'ThinkForm | Business Consultant in Borivali, Mumbai',
  description: 'Local 1:1 thinking sessions in Borivali. Book a strategy or idea session near you.',
};

export default function Borivali() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/locations" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">← Back</Link>
        <h1 className="text-4xl font-black mb-4">Business Consultant in Borivali</h1>
        <p className="text-lg text-[#666] mb-6">Private 1:1 thinking sessions in and around Borivali — online or in-person by appointment.</p>
        <h2 className="text-xl font-bold mb-2">Why book locally?</h2>
        <p className="text-[#666] mb-4">Convenient meeting options, local market context, and faster scheduling for nearby clients.</p>
        <Link href="/book?session=Idea%20Session" className="inline-block bg-black text-white px-5 py-3 rounded-lg font-bold">Book a Session</Link>
      </div>
    </div>
  );
}
