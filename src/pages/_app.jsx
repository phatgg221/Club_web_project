// src/pages/_app.jsx
import '../styles/global.css'; // Import global styles here

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

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
