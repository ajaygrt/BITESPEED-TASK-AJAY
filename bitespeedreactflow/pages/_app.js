// pages/_app.js
import 'reactflow/dist/style.css';
import '../styles/globals.css'; // Ensure you have this file or update the path accordingly

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;