// src/pages/_app.jsx
import "../styles/global.css"; // Import global styles here
import "bootstrap/dist/css/bootstrap.min.global.css";
const Champions = require('@/models/Champions');
const connectDB = require('@/lib/mongodb');
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import dynamic from "next/dynamic";
import { Montserrat } from "next/font/google";
// const Bootstrap = dynamic(() => import('bootstrap'), { ssr: false });
connectDB();
const montserrat = Montserrat({ weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  const hideLayout = Component.hideLayout || false;
  return (
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
        {!hideLayout&& <Footer />}
      </div>
    </main>
  );
}

export default MyApp;
