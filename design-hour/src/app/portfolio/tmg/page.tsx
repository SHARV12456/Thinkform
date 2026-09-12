import Link from 'next/link';

export const metadata = {
  title: 'TMG — Case Study | TAAS',
  description: 'TMG office reorientation — Problem, TAAS decision, Result.',
};

export default function TmgCase() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--near-black)' }}>
      <section style={{ padding: '6rem 1.25rem', maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ marginBottom: '2rem', color: 'var(--muted)', fontWeight: 700 }}>DECISIONS WE'VE CHANGED</div>
        <h1 style={{ fontSize: '2.75rem', fontWeight: 900, marginBottom: '1rem' }}>TMG — Office Reorientation</h1>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem' }}>A mid-size consultancy fit-out where the existing plan risked extensive rework and cost escalation.</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>
          <div>
            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>THE PROBLEM</h3>
              <p style={{ color: 'var(--muted)' }}>TMG's contractor proposed a fit-out which required shifting services and demolishing key partitions. On paper the layout looked workable, but circulation, acoustics and daylight were compromised — risking a later rebuild.</p>
            </section>

            <section style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>TAAS DECISION</h3>
              <p style={{ color: 'var(--muted)' }}>Within a 60-minute session we identified two critical moves: rotate the primary workstation run and relocate the pantry to preserve daylight. We provided a concise annotated sketch and a prioritized list of contractor instructions to avoid unnecessary demolition.</p>
            </section>

            <section>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>THE RESULT</h3>
              <p style={{ color: 'var(--muted)' }}>TMG implemented the changes and avoided a ₹4–6 Lakh rebuild. The final fit-out preserved daylight, improved circulation and reduced contractor change orders.</p>
            </section>
          </div>

          <aside style={{ background: 'var(--near-black)', color: 'var(--bg)', padding: '1rem' }}>
            <div style={{ height: 240, backgroundImage: "url('https://images.unsplash.com/photo-1505691723518-36a0f3c0a6b7?q=80&w=1200&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontWeight: 800 }}>Project snapshot</div>
              <ul style={{ color: 'var(--muted)', marginTop: '0.5rem' }}>
                <li>Scope: Office fit-out</li>
                <li>Service: TAAS Session — 60 min</li>
                <li>Outcome: Saved ₹400k–600k</li>
              </ul>
              <div style={{ marginTop: '1.25rem' }}>
                <Link href="/book" className="btn-hero primary" data-cursor="BOOK">Book a session →</Link>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
