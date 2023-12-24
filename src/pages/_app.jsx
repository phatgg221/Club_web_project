// src/pages/_app.jsx
import '../styles/global.css'; // Import global styles here
import 'bootstrap/dist/css/bootstrap.min.global.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import dynamic from 'next/dynamic';

// const Bootstrap = dynamic(() => import('bootstrap'), { ssr: false });

function MyApp({ Component, pageProps }) {
  return (
    <>
    
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
