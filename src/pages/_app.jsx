// src/pages/_app.jsx
import '../styles/global.css'; // Adjust the path to your global styles if necessary

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Global layout components like header can be added here */}
      <Component {...pageProps} />
      {/* Footer components can be added here */}
    </>
  );
}

export default MyApp;
