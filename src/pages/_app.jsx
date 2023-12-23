// src/pages/_app.jsx
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import '../styles/global.css'; // Adjust the path to your global styles if necessary

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      {/* <Component {...pageProps} /> */}
      <Footer/>
    </>
  );
}

export default MyApp;
