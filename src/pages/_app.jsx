import { useEffect } from 'react';
import "../styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "../contexts/AuthContext";
import dynamic from 'next/dynamic';
import { CloudinaryContext } from 'cloudinary-react';
import Footer from "../components/Footer/Footer";
import { Montserrat } from "next/font/google";

//MongoDB connection
const connectDB = require('../lib/mongodb');
connectDB();

const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const hideLayout = Component.hideLayout || false;
  const Header = dynamic(() => import('@/components/Header/Header'), { ssr: false });
  const cloudName = 'dhjapmqga';
  return (
    <CloudinaryContext cloudName={cloudName}>
      <AuthProvider>
        <main className={montserrat.className}>
          {!hideLayout && <Header />}
          <div
            className="mainBody"
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 70px)",
              background: "#fffefa",
              paddingTop: "20px",
            }}
          >
            <Component {...pageProps} />
            {!hideLayout && <Footer />}
          </div>
        </main>
      </AuthProvider>
    </CloudinaryContext>
  );
}

export default MyApp;