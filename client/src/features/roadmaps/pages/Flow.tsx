import { useRef, useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Background,
  MiniMap,
  Connection,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "../components/sidebar/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ContentLinks from "../components/drawer/ContentLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Topic } from "../components/drawer/nodes/TopicNode";
import { SubTopic } from "../components/drawer/nodes/SubTopicNode";

type NodeType = "topic" | "subtopic";
const nodeTypes = {
  topic: Topic,
  subtopic: SubTopic,
};
let nodeId = 1;
const getId = () => `dndnode_${nodeId++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [nodeType, setNodeType] = useState<NodeType | null>(null);
  //this for node editing
  const [editValue, setEditValue] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("properties");
  const [nodeColor, setNodeColor] = useState("#f3c950");

  const onNodeClick = (_: any, node: any) => {
    setEditValue(node.data.label);
    setSelectedNodeId(node.id);
    setNodeColor(node.style?.background || "#f3c950");
    setIsSheetOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEditValue(e.target.value);

  const handleUpdate = () => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNodeId
          ? { ...node, data: { label: editValue } }
          : node
      )
    );
  };
  const changeNodeColor = (color: any) => {
    setNodeColor(color);

    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === selectedNodeId
          ? {
              ...node,
              style: { ...node.style, background: color },
            }
          : node
      )
    );
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // const onConnect = useCallback(
  //   (connection: Connection) => setEdges((eds) => addEdge(...connection, eds)),
  //  []);

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: NodeType
  ) => {
    setNodeType(type);
    event.dataTransfer.effectAllowed = "move";
  };

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!nodeType) return;
      console.log(event, "event");
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: getId(),
        position,
        data: { label: `${nodeType}` },
        style: {
          color: "#000000",
          border: "1px solid #222138",
          boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
          width: 100,
          fontSize: "7px",
          padding:'2px',
          fontWeight: "medium",
          background: nodeType === "topic" ? "#fdff00" : "#f3c950",
        },
        type: nodeType,
      };

      setNodes((nds) => nds.concat(newNode));
      setNodeType(null);
    },
    [screenToFlowPosition, nodeType, nodeColor]
  );
  const onNodesDelete = () => {
    setIsSheetOpen(false);
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar onDragStart={onDragStart} />
      <div className="flex-grow" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeClick={onNodeClick}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodesDelete={onNodesDelete}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-3/4 ">
          <SheetHeader className="mt-4 ">
            <SheetDescription className="text-xs"></SheetDescription>
          </SheetHeader>
          <div className="flex flex-row p-2">
            <SheetTitle>
              <button
                className={`px-3 text-xs font-bold py-1 ${
                  activeTab === "properties"
                    ? " bg-gray-200 border rounded-md "
                    : ""
                }`}
                onClick={() => setActiveTab("properties")}
              >
                Properties
              </button>
            </SheetTitle>
            <SheetTitle>
              <button
                className={`px-3 text-xs font-bold py-1 ${
                  activeTab === "content"
                    ? " bg-gray-200 border rounded-md "
                    : ""
                }`}
                onClick={() => setActiveTab("content")}
              >
                Content & Links
              </button>
            </SheetTitle>
          </div>

          <div className="p-4">
            {activeTab === "properties" ? (
              <div>
                <h2 className="text-lg mt-4 font-bold">Node Properties</h2>
                <div>
                  <Input
                    className="border p-2 mt-2 w-full"
                    value={editValue}
                    onChange={handleChange}
                    placeholder="Edit node label"
                  />
                  <Button
                    variant={"submit"}
                    className="w-full mt-4"
                    // className="mt-2 bg-blue-500 text-white px-4 py-2"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                </div>
                <hr className="mt-6" />

                <div className="flex space-x-2 mt-5  flex-col">
                  <div>
                    <span className="mt-4">Node color</span>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      className="bg-yellow-300 border-none py-3 px-4 border rounded-full text-xs"
                      onClick={() => changeNodeColor("#fdff00")}
                    >
                      Y
                    </button>
                    <button
                      className="bg-blue-600 border-none py-3 px-4 border rounded-full text-xs"
                      onClick={() => changeNodeColor("#675ede")}
                    >
                      B
                    </button>
                    <button
                      className="bg-orange-300 border-none py-3 px-4 border rounded-full text-xs"
                      onClick={() => changeNodeColor("#f3c950")}
                    >
                      M
                    </button>
                  </div>
                </div>
                <hr className="mt-3" />
              </div>
            ) : (
              <ContentLinks />
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const WrappedDnDFlow = () => (
  <ReactFlowProvider>
    <DnDFlow />
  </ReactFlowProvider>
);

export default WrappedDnDFlow;
