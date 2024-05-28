import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import ChatbotFlowBuilder from "./chatbotflowbuilder";

// Wrap your component tree with DndProvider
const App = () => {
  return (
    <React.StrictMode>
      <DndProvider backend={HTML5Backend}>
        <ChatbotFlowBuilder />
      </DndProvider>
    </React.StrictMode>
  );
};

// Use createRoot to render the App component
const root = document.getElementById("root");
const rootElement = React.createRoot(root);
rootElement.render(<App />);
