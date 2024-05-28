// pages/_app.js
import "reactflow/dist/style.css";
import "../styles/globals.css"; // Ensure you have this file or update the path accordingly
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function MyApp({ Component, pageProps }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Component {...pageProps} />
    </DndProvider>
  );
}

export default MyApp;
