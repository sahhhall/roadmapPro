import { useRef, useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  useReactFlow,
  Background,
} from "@xyflow/react";
import '@xyflow/react/dist/style.css';
import Sidebar from "../components/sidebar/Sidebar";
import Container from "@/components/Container";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [nodeType, setNodeType] = useState(null);
  console.log(nodes)
  const onConnect = useCallback(
    (params: any) => setEdges((eds: any) => addEdge(params, eds)),
    []
  );

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDragStart = (event: any, type: any) => {
    setNodeType(type);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!nodeType) {
        return;
      }
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type: nodeType,
        position,
        data: { label: `${nodeType} node` },
      };
      setNodes((nds) => nds.concat(newNode));
      setNodeType(null);
    },
    [screenToFlowPosition, nodeType]
  );

  return (
    <Container className="flex h-screen w-screen">
      <Sidebar onDragStart={onDragStart} />
      <div className="flex-grow" ref={reactFlowWrapper}>
      <Controls showZoom={true}  />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          panOnDrag={false} 
          panOnScroll={false} 
        >
          
     
        </ReactFlow>
      </div>
    </Container>
  );
};

const WrappedDnDFlow = () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);

export default WrappedDnDFlow;
