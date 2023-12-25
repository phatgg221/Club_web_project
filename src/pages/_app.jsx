// src/pages/_app.jsx
import '../styles/global.css'; // Import global styles here
import 'bootstrap/dist/css/bootstrap.min.global.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import dynamic from 'next/dynamic';
import { Montserrat } from 'next/font/google';
// const Bootstrap = dynamic(() => import('bootstrap'), { ssr: false });

const montserrat = Montserrat({ weight: '400', subsets: ['latin'] });

function MyApp({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

export default MyApp;
