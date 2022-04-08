import Link from 'next/link';
import Footer from '../components/Footer/Footer';

export default function Custom404() {
  return (
    <div className="main">
      <h1>404 - Síða fannst ekki</h1>
      <p style={{ marginBottom: '1rem' }}>Síðan sem þú baðst um fannst ekki</p>
      <Link href="/">Forsíða</Link>
      <Footer />
    </div>
  );
}
