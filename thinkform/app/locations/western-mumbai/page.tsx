import Link from 'next/link';
 
export const metadata = {
  title: 'ThinkForm | 1:1 Thinking Sessions Across Western Mumbai',
  description: 'Private 1:1 thinking sessions for decisions, ideas and direction across Western Mumbai. Sessions from ₹3,999.'
}

export default function WesternMumbai() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-[#f7f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <Link href="/" className="inline-block text-sm font-bold text-[#b46d52] hover:text-[#171717] transition-all mb-4">← Back to ThinkForm</Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">Private Thinking Sessions Across Western Mumbai</h1>
          <p className="text-lg text-[#756f68] max-w-2xl">ThinkForm offers private 1:1 sessions for people across Western Mumbai who need clarity on business decisions, ideas and next steps. Sessions from ₹3,999.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {name: 'Goregaon', href: '/locations/goregaon'},
            {name: 'Malad', href: '/locations/malad'},
            {name: 'Kandivali', href: '/locations/kandivali'},
            {name: 'Borivali', href: '/locations/borivali'},
            {name: 'Andheri', href: '/locations/andheri'},
            {name: 'Jogeshwari', href: '/locations/jogeshwari'},
            {name: 'Vile Parle', href: '/locations/vile-parle'},
            {name: 'Santacruz', href: '/locations/santacruz'},
            {name: 'Bandra', href: '/locations/bandra'},
            {name: 'Khar Road', href: '/locations/khar-road'},
          ].map(loc => (
            <Link key={loc.href} href={loc.href} className="p-4 bg-white border border-[#e8e3da] rounded-lg text-center font-medium hover:shadow-md transition-all">{loc.name}</Link>
          ))}
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What we help people think through</h2>
          <ul className="list-disc pl-5 text-[#171717] space-y-2">
            <li>Business direction and priorities</li>
            <li>Validating new ideas</li>
            <li>Career moves and role changes</li>
            <li>Product and go-to-market choices</li>
            <li>Next-step clarity after a pivot or opportunity</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Why ThinkForm</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded border border-[#e8e3da]">
              <h3 className="font-bold mb-2">Private 1:1</h3>
              <p className="text-sm text-[#756f68]">No templates — a focused conversation about your situation.</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#e8e3da]">
              <h3 className="font-bold mb-2">Actionable</h3>
              <p className="text-sm text-[#756f68]">Leave with specific, testable next steps.</p>
            </div>
            <div className="p-6 bg-white rounded border border-[#e8e3da]">
              <h3 className="font-bold mb-2">Fast</h3>
              <p className="text-sm text-[#756f68]">Clarity in a single session, not a long program.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Sessions from ₹3,999</h2>
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

        <div className="text-center py-10">
          <Link href="/book" className="inline-flex items-center justify-center px-6 py-3 bg-[#111] text-white rounded-xl font-bold">Book a Session</Link>
        </div>
      </div>
    </div>
  );
}
