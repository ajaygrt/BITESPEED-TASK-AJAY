// pages/index.js
import ChatbotFlowBuilder from './chatbotflowbuilder';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="flex min-h-screen flex-col items-center justify-center w-full">
      <ChatbotFlowBuilder />
    </div>
    </DndProvider>
  );
}
