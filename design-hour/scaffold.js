const fs = require('fs');
const path = require('path');

const srcAppDir = path.join(__dirname, 'src', 'app');

const createPage = (routePath, title) => {
  const fullDir = path.join(srcAppDir, ...routePath.split('/'));
  fs.mkdirSync(fullDir, { recursive: true });
  const filePath = path.join(fullDir, 'page.tsx');
  
  if (!fs.existsSync(filePath)) {
    const content = `import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: '${title} | Design Hour',
  description: 'Book a professional interior design consultation in Mumbai. Get expert advice on layout, materials, furniture, storage and more.',
};

export default function Page() {
  return (
    <main>
      <Navbar />
      <div style={{ padding: '6rem 2rem', maxWidth: 1200, margin: '0 auto', minHeight: '60vh' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem' }}>${title}</h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem' }}>
          Get professional design advice for your home, office, rental property or commercial space.
        </p>
        <div style={{ padding: '2rem', background: 'var(--color-off-white)', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>60-Minute Consultation — ₹3,999</h2>
          <p style={{ marginBottom: '1rem' }}>First 15 minutes complimentary.</p>
          <Link href="/book" className="btn btn-primary" style={{ display: 'inline-block', padding: '1rem 2rem', background: 'var(--color-near-black)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>BOOK MY CONSULTATION</Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
`;
    fs.writeFileSync(filePath, content);
  }
};

const locations = [
  'mumbai', 'borivali', 'kandivali', 'malad', 'goregaon', 'jogeshwari', 'andheri', 'vile-parle', 'santacruz', 'khar', 'bandra', 'mahim', 'dadar', 'prabhadevi', 'lower-parel', 'mahalaxmi', 'mumbai-central', 'grant-road', 'charni-road', 'marine-lines', 'churchgate', 'versova', 'lokhandwala', 'oshiwara', 'seven-bungalows', 'yari-road', 'juhu', 'jvpd', 'pali-hill', 'carter-road', 'bandra-reclamation', 'worli', 'tardeo', 'girgaon', 'opera-house', 'fort', 'colaba', 'nariman-point'
];

locations.forEach(loc => {
  const titleName = loc.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  createPage(`locations/${loc}`, `Interior Design Consultation in ${titleName}`);
  createPage(`ads/${loc}/design-consultation`, `Design Consultation in ${titleName}`);
});

const serviceSeoPages = [
  'interior-design-consultation',
  'interior-design-consultation-mumbai',
  'on-site-interior-design-consultation-mumbai',
  'interior-designer-consultation-mumbai',
  'home-design-consultation-mumbai',
  'residential-design-consultation',
  'rental-home-design-consultation',
  'modular-kitchen-consultation',
  'living-room-design-consultation',
  'bedroom-design-consultation',
  'commercial-interior-design-consultation',
  'office-design-consultation',
  'retail-design-consultation',
  'cafe-design-consultation',
  'restaurant-design-consultation'
];

serviceSeoPages.forEach(page => {
  const titleName = page.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  createPage(page, titleName);
});

createPage('about', 'About Us');
createPage('consultation/30-minute', '30-Minute Quick Consultation');
createPage('consultation/60-minute', '60-Minute Design Hour');
createPage('consultation/90-minute', '90-Minute Deep-Dive');
createPage('reviews', 'Client Reviews');
createPage('ads/google/interior-design-consultation', 'Need Design Advice Before You Spend?');
createPage('ads/meta/design-hour', 'One Design Problem?');

const adminPages = [
  'locations', 'seo', 'payments'
];

adminPages.forEach(page => {
  const fullDir = path.join(srcAppDir, 'admin', page);
  fs.mkdirSync(fullDir, { recursive: true });
  const filePath = path.join(fullDir, 'page.tsx');
  if (!fs.existsSync(filePath)) {
    const titleName = page.charAt(0).toUpperCase() + page.slice(1);
    const content = `'use client';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';

export default function Admin${titleName}() {
  const path = usePathname();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>${titleName} Management</h1>
        </div>
        <div style={{ padding: '2rem' }}>
          <p>This section is under construction.</p>
        </div>
      </div>
    </div>
  );
}
`;
    fs.writeFileSync(filePath, content);
  }
});

console.log('Scaffolding complete.');
