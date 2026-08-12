
import Link from 'next/link';
 

export const metadata = {
  title: 'ThinkForm | 1:1 Thinking Sessions in Goregaon, Mumbai',
  description: 'Private 1:1 thinking sessions for business decisions, ideas and direction in Goregaon and across Western Mumbai. Sessions from ₹3,999.'
}

export default function Goregaon() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-[#f7f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Link href="/locations/western-mumbai" className="inline-block text-sm font-bold text-[#b46d52] hover:text-[#171717] transition-all mb-4">← Back to Western Mumbai</Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">1:1 Thinking Sessions in Goregaon</h1>
          <p className="text-lg text-[#756f68] max-w-2xl">Got something important you're trying to figure out? Think it through privately with ThinkForm. Sessions from ₹3,999.</p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Who this is for</h2>
          <p className="text-[#171717]">Founders, business owners, creators and professionals in Goregaon who need another perspective before making their next move.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">What can we think through?</h2>
          <ul className="list-disc pl-5 space-y-2 text-[#171717]">
            <li>Business decisions and prioritisation</li>
            <li>Validating an idea before you test it</li>
            <li>Career moves and role decisions</li>
            <li>Product direction and go-to-market choices</li>
            <li>Next steps after a pivot or opportunity</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Why ThinkForm</h2>
          <ul className="list-disc pl-5 text-[#171717] space-y-2">
            <li>Private 1:1 conversation focused on your exact situation</li>
            <li>Actionable next steps you can test immediately</li>
            <li>Sessions designed to be concise and high signal</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Serving Goregaon and nearby areas</h2>
          <p className="text-[#171717]">We often work with people across Goregaon West, Goregaon East, Malad, Jogeshwari, Andheri and Kandivali.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-3">Sessions from ₹3,999</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded border border-[#e8e3da]">
              <h4 className="font-black">Quick Think</h4>
              <p className="text-sm text-[#756f68]">60 min · One problem</p>
              <p className="text-sm font-bold mt-2">₹3,999</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#e8e3da]">
              <h4 className="font-black">Deep Dive</h4>
              <p className="text-sm text-[#756f68]">90 min · Complex problem</p>
              <p className="text-sm font-bold mt-2">₹7,999</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#e8e3da]">
              <h4 className="font-black">Strategy Sprint</h4>
              <p className="text-sm text-[#756f68]">Deep strategic session</p>
              <p className="text-sm font-bold mt-2">₹12,999</p>
            </div>
          </div>
        </section>

        <div className="text-center py-8">
          <Link href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-[#111] text-white rounded-xl font-bold">Book a Session</Link>
        </div>

        <div className="mt-12 text-sm text-[#756f68]">
          <p>Nearby: <Link href="/locations/malad" className="underline">Malad</Link> · <Link href="/locations/jogeshwari" className="underline">Jogeshwari</Link> · <Link href="/locations/andheri" className="underline">Andheri</Link></p>
        </div>
      </div>
    </div>
  );
}
