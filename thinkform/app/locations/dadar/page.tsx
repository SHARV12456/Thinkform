import Link from 'next/link';

export const metadata = {
  title: 'ThinkForm | Business Consultant in Dadar, Mumbai',
  description: 'Local 1:1 thinking sessions in Dadar. Book a strategy or idea session near you.',
};

export default function Dadar() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link href="/locations" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">← Back</Link>
        <h1 className="text-4xl font-black mb-4">Business Consultant in Dadar</h1>
        <p className="text-lg text-[#666] mb-6">Private 1:1 thinking sessions in and around Dadar — online or in-person by appointment.</p>
        <Link href="/book?session=Business%20Reset" className="inline-block bg-black text-white px-5 py-3 rounded-lg font-bold">Book a Session</Link>
      </div>
    </div>
  );
}
