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
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import Sidebar from "@/features/roadmaps/components/sidebar/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ContentLinks from "@/features/roadmaps/components/drawer/ContentLinks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Topic } from "@/features/roadmaps/components/drawer/nodes/TopicNode";
import { SubTopic } from "@/features/roadmaps/components/drawer/nodes/SubTopicNode";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppStore";
import {
  useCreateNodeMutation,
  useSaveRoadMapMutation,
} from "../services/api/roadmapApi";
import { useNavigate, useParams } from "react-router-dom";
import { deleteNodeDetails } from "@/redux/slices/roadMapslice";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck } from "lucide-react";

type NodeType = "topic" | "subtopic";
const nodeTypes = {
  topic: Topic,
  subtopic: SubTopic,
};
// let nodeId = 1;
// const getId = () => `dndnode_${nodeId++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const { screenToFlowPosition } = useReactFlow();
  const [nodeType, setNodeType] = useState<NodeType | null>(null);
  //this for node editing
  const [editValue, setEditValue] = useState("");
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  //this also i pass to content link beacuse i want when submit i wan close
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  //this for content& links page
  const [activeTab, setActiveTab] = useState("properties");
  //this for set coloring when a node
  const [nodeColor, setNodeColor] = useState("#f3c950");

  //API for creat node when drop
  const { id } = useParams<string>();

  const navigate = useNavigate();
  //APis
  const [createNode] = useCreateNodeMutation();
  const [saveroadMap, { isLoading }] = useSaveRoadMapMutation();

  const { toast } = useToast();

  const roadmapNodeContent = useAppSelector((state) => state?.roadMap);
  const dispatch = useAppDispatch();
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
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (!nodeType) return;
      console.log(event, "event");
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      try {
        const response = await createNode({
          roadmapId: id,
          type: nodeType,
          position,
          data: nodeType,
          background: nodeType === "topic" ? "#fdff00" : "#f3c950",
        }).unwrap();

        const newNode = {
          id: response.id,
          position,
          data: { label: `${nodeType}` },
          style: {
            color: "#000000",
            border: "1px solid #222138",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
            width: 100,
            fontSize: "7px",
            padding: "2px",
            fontWeight: "medium",
            background: nodeType === "topic" ? "#fdff00" : "#f3c950",
          },
          type: nodeType,
        };

        setNodes((nds) => nds.concat(newNode));
        setNodeType(null);
      } catch (error) {
        console.log("check your code flowwwwwwwwwwww");
      }
    },
    [screenToFlowPosition, nodeType, nodeColor]
  );
  const onNodesDelete = useCallback(
    (deletedNodes: Node[]) => {
      console.log(deletedNodes, "delete");
      let nodeIdTodelete = deletedNodes[0];
      console.log(nodeIdTodelete, "delete");
      dispatch(deleteNodeDetails({ id: nodeIdTodelete.id }));
      setIsSheetOpen(false);
    },
    [setIsSheetOpen]
  );

  const handleSubmitRoadmap = async () => {
    const roadmapData = { nodes, edges, roadmapNodeContent };
    const formattedNodesForPayload = nodes.map((node) => ({
      id: node.id,
      data: node.data.label,
      position: node.position,
      type: node.type,
      background: node.style?.background,
    }));
    const formattedEdgesForPayload = edges.map((edge) => ({
      source: edge?.source,
      target: edge?.target,
    }));
    console.log("Saved Roadmap Data:", roadmapData);
    console.log(formattedNodesForPayload, "formatted");
    try {
      await saveroadMap({
        roadmapId: id,
        nodeDetails: roadmapNodeContent.nodes,
        nodes: formattedNodesForPayload,
        edges: formattedEdgesForPayload,
      }).unwrap();
      toast({
        description: (
          <>
            <CircleCheck color="green" className="inline-block mr-2" />
            Roadmap saved successfully <br />
            wait for admin approval!!
          </>
        ),
        className: "border-none",
        variant: "default",
      });
      navigate("/");
      console.log("here need clean up for roadmap contnet details from redux stor")
    } catch (error) {
      console.log("submission error ");
    }
  };

  return (
    <div className="flex h-screen w-full">
      <Sidebar
        isLoading={isLoading}
        onSaveRoadmap={handleSubmitRoadmap}
        onDragStart={onDragStart}
      />
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
        <SheetContent side="right" className="w-3/4 overflow-scroll ">
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
              <ContentLinks
                setIsSheetOpen={setIsSheetOpen}
                nodeId={selectedNodeId}
              />
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
