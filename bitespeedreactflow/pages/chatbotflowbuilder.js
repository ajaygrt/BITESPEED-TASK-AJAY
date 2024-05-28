import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  ReactFlowProvider,
  Handle,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useDrag, useDrop } from 'react-dnd';

// Custom node component for rendering nodes in the flow
const CustomNode = ({ data }) => {
  // Render the custom node UI
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 5, backgroundColor: '#fff', width:'300px' }}>
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <div style={{ fontWeight: 'bold', marginBottom: 5, background:'#c8ffc8', padding:'5px', display:'flex', gap:'10px', justifyContent:'space-between' }}>
        <div className="flex gap-2">
          <img src="./chat.png" className="w-[25px]"/>
          Send Message
        </div>
        <img src="./whatsapp.svg" className="w-[25px]"/>
      </div>
      <div className="p-3">{data.label}</div>
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
};
// Define custom node types
const nodeTypes = { custom: CustomNode };

// Draggable node component for creating new nodes
const DraggableNode = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'node',
    item: { type: 'new-node' }, // Define the draggable item
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        padding: '8px',
        backgroundColor: '#ddd',
        borderRadius: '5px',
        textAlign: 'center',
        margin: '8px',
      }}
    >
      Drag Node
    </div>
  );
};

// Main component for building the chatbot flow
const ChatbotFlowBuilder = () => {

  // Initial nodes and edges for the flow
  const initialNodes = [
    { id: '1', position: { x: 100, y: 100 }, data: { label: 'Hello' }, type: 'custom' },
    { id: '2', position: { x: 300, y: 400 }, data: { label: 'How are you?' }, type: 'custom' },
  ];
  const initialEdges = [{ id: 'e1-2', source: '1', target: '2', sourceHandle: 'a', targetHandle: 'b' }];

  // States for managing flow data and UI
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [panelMode, setPanelMode] = useState('node');
  const [selectedNode, setSelectedNode] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [saveFlowError, setSaveFlowError] = useState(false);
  const [saveFlowSuccess, setSaveFlowSuccess] = useState(false);
  const [changesMade, setChangesMade] = useState(false);

   // Load saved nodes and edges from local storage on component mount
  useEffect(() => {
    // Load saved nodes and edges
    const savedNodes = JSON.parse(localStorage.getItem('nodes'));
    const savedEdges = JSON.parse(localStorage.getItem('edges'));
    if (savedNodes) setNodes(savedNodes);
    if (savedEdges) setEdges(savedEdges);
  }, []);

   // Save nodes and edges to local storage whenever they change
  useEffect(() => {
     // Save nodes and edges to local storage
    localStorage.setItem('nodes', JSON.stringify(nodes));
    localStorage.setItem('edges', JSON.stringify(edges));
  }, [nodes, edges]);


  // Handle click on the container to switch panel mode
  const handleContainerClick = () => {
     // Switch panel mode
    if (panelMode !== 'node') {
      setPanelMode('node');
      setSelectedNode(null);
    }
  };

   // Callback to handle changes made in nodes
  const handleChangesMade = () => {
    // Set changes made flag
    setChangesMade(true);
  };
  
  // Callback to apply changes to nodes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Callback to apply changes to edges
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  // Callback to add a new edge
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

   // Delete a selected node and its connected edges
  const deleteNode = () => {
     // Delete selected node and its edges
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
      setSelectedNode(null);
    }
  };

   // Handle click on a node to select it and show its message
  const onNodeClick = (event, node) => {
    // Select node and show its message
    event.stopPropagation(); // Prevent container click event from triggering
    setSelectedNode(node);
    setMessageText(node.data.text);
    setPanelMode('message');
  };

   // Handle text change in the message textarea
  const handleTextChange = (e) => {
     // Update message text
    e.stopPropagation(); // Prevent container click event from triggering
    setMessageText(e.target.value);
  };

  // Validate nodes to ensure all have edges
  const validateNodes = () => {
    // Validate nodes
    const nodeIdsWithEdges = new Set();
    edges.forEach(edge => {
      nodeIdsWithEdges.add(edge.source);
      nodeIdsWithEdges.add(edge.target);
    });
    return nodes.every(node => nodeIdsWithEdges.has(node.id));
  };


// Function to handle save changes
const handleSaveChanges = () => {
  // Save changes to nodes and edges
  if (!validateNodes()) {
    setSaveFlowError(true);
    setTimeout(() => {
      setSaveFlowError(false);
    }, 1000);
    return;
  }
  if (selectedNode) {
    const updatedNode = { ...selectedNode, data: { ...selectedNode.data, text: messageText, label: messageText || `Node ${selectedNode.id}` } };
    setNodes((nds) => nds.map((node) => (node.id === selectedNode.id ? updatedNode : node)));
    setSelectedNode(updatedNode);
  }
  setSaveFlowSuccess(true);
  setTimeout(() => {
    setSaveFlowSuccess(false);
  }, 1000);
  
  // Reset changesMade state after saving changes
  setChangesMade(false);
};

 // Drop handler for adding new nodes to the flow
  const [{ isOver }, drop] = useDrop({
     // Define drop behavior
    accept: 'node',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const reactFlowBounds = document.querySelector('.reactflow-wrapper').getBoundingClientRect();
      const position = reactFlowBounds ? { x: offset.x - reactFlowBounds.left, y: offset.y - reactFlowBounds.top } : { x: 0, y: 0 };

      const newNode = {
        id: `${nodes.length + 1}`,
        position,
        data: { label: `Node ${nodes.length + 1}`, text: `Node ${nodes.length + 1}` },
        type: 'custom',
      };
      setNodes((nds) => [...nds, newNode]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

   // Render the chatbot flow builder UI
  return (
    <div className="flex flex-col w-full" onClick={handleContainerClick}>
      <div className="flex justify-between items-center bg-[#d7d7d7] p-4">
        <div className="flex-grow flex justify-center">
          {saveFlowError && (
            <p className="bg-[#e48f8f] p-[8px] rounded-lg self-center">Cannot Save Flow</p>
          )}
          {saveFlowSuccess && (
            <p className="bg-green-500 p-[8px] rounded-lg self-center text-white">Saved Successfully</p>
          )}
        </div>
        <div className="flex justify-end">
          <button 
            onClick={handleSaveChanges} 
            className="border-2 border-blue-500 bg-white text-blue-500 font-bold rounded-md px-12 py-2 text-[10px]"
          >
            Save Changes
          </button>
        </div>
      </div>
      <div className="flex min-h-screen w-full relative">
        <div className="w-[70%] relative reactflow-wrapper" ref={drop} style={{ border: isOver ? '2px dashed #000' : '2px dashed transparent' }}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              className="w-full h-full"
            >
              <MiniMap />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
        <div className="w-[30%] border-l absolute top-0 right-0 min-h-screen bg-white shadow-lg border border-[#cbc7c7] text-center">
          <div className="flex flex-row border border-[#cbc7c7] border-t-0 border-l-0 border-r-0 text-center text-sm p-2">
            {selectedNode && <img src="/arrowLeft.svg" className="self-center h-4 mr-2" alt="Arrow Left"/>}
            {selectedNode && <h1 className="flex-grow">Message</h1>}
            {!selectedNode && <h1 className="flex-grow">Settings panel</h1>}
          </div>
         
          {selectedNode && (
            <div className="mt-4 p-4">
              <p className="text-left p-2 pl-0 text-sm text-[#cbc7c7]">Text</p>
              <textarea
                value={messageText}
                onChange={handleTextChange}
                placeholder="Enter node text"
                className="w-full p-2 border border-[#cbc7c7] rounded"
                onClick={(e) => e.stopPropagation()} // Prevent container click event from triggering
              />
              <button onClick={deleteNode} className="mt-2 border rounded text-blue-500 border-blue-500 p-2 text-sm">Delete Node</button>
            </div>
          )}
          {!selectedNode && (
            <div className="mt-4 p-4 flex flex-col justify-center gap-2">
              <DraggableNode />
              <button 
  onClick={() => {
    const lastNode = nodes[nodes.length - 1];
    if (lastNode) {
      alert(lastNode.data.text);
    } else {
      alert("No nodes available");
    }
  }} 
  className="self-center flex flex-col gap-2 items-center justify-center border-blue-500 border text-blue-500 w-[150px] min-h-[80px] text-sm"
>
  <img src="./chat.png" className="w-[20px]"/>
  Message
</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotFlowBuilder;
