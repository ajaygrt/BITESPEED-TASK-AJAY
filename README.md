# BITESPEED-TASK-AJAY

Chatbot Flow Builder This is a simple chatbot flow builder application built using React, React Flow, and React DnD. It allows users to visually create chatbot conversation flows by dragging and dropping nodes and connecting them with edges.

Features Drag and drop nodes to create a chatbot flow. Custom nodes with configurable text. Save and load flows from local storage. Enforces rules to allow only one outgoing edge from a source handle and multiple incoming edges to a target handle. Demo You can view the live demo of the project here.

Installation Clone the repository:

// important Links bash ಕೋಡ್ ನಕಲಿಸಿ git clone https://github.com/ajaygrt/BITESPEED-TASK-AJAY.git cd BITESPEED-TASK-AJAY/bitespeedreactflow

Hosted on - https://bitespeed-task-ajay-git-main-ajays-projects-2f90824e.vercel.app/

Install dependencies:

bash ಕೋಡ್ ನಕಲಿಸಿ npm install Run the development server:

bash ಕೋಡ್ ನಕಲಿಸಿ npm run dev Open your browser and navigate to http://localhost:3000 to view the application.

Usage Drag the "Drag Node" component from the right panel to the flow area to create new nodes. Click on a node to edit its text. Connect nodes by dragging from the source handle (bottom) of one node to the target handle (top) of another node. Click "Save Changes" to save the current flow to local storage. Code Structure index.js: Entry point of the application. chatbotflowbuilder.js: Main component containing the flow builder logic and UI. CustomNode.js: Custom node component used in the flow. DraggableNode.js: Draggable component used to create new nodes.

Links Hosted on Vercel: Chatbot Flow Builder - https://bitespeed-task-ajay-git-main-ajays-projects-2f90824e.vercel.app/ GitHub Repository: GitHub Repo - https://github.com/ajaygrt/BITESPEED-TASK-AJAY/tree/main/bitespeedreactflow Contributing Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.
