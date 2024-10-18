import { ReactFlow, Node } from "@xyflow/react";
import { UserViewTopic } from "@/features/roadmaps/components/drawer/nodes/UserViewTopic";
import { UserViewSubTopic } from "@/features/roadmaps/components/drawer/nodes/UserViewSubTopic";
import { useCallback, useMemo, useState } from "react";
import { useLazyGetNodeDetailsByIDQuery } from "@/features/roadmaps/services/api/roadmapApi";
import NodeDetailsSheet from "@/features/roadmaps/components/view/NodeDetailsSheet";
import { NodeDetailsResponse } from "@/features/roadmaps/types/roadmap";

const nodeTypes = {
  topic: UserViewTopic,
  subtopic: UserViewSubTopic,
};

interface RoadmapData {
  nodes: any[];
  edges: any[];
  title?: string;
  description?: string;
}

export const RoadmapFlow: React.FC<{ roadmapData: RoadmapData }> = ({
  roadmapData,
}) => {
  const [trigger, { data: nodeDetails,isLoading }] = useLazyGetNodeDetailsByIDQuery();

  //it for controlling sheet open and close state

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openSheet = useCallback(() => setIsOpen(true), []);
  const closeSheet = useCallback(() => setIsOpen(false), []);
  const nodes = useMemo(() => {
    return (
      roadmapData?.nodes?.map((node) => ({
        id: node.id,
        type: node.type,
        position: node.position,
        data: { label: node.data },
        style: {
          background: node.background,
          color: node.type === "topic" ? "#000000" : "#000000",
          border: "1px solid #222138",
          width: 100,
          fontSize: "7px",
          padding: "2px",
          fontWeight: "medium",
        },
      })) || []
    );
  }, [roadmapData?.nodes]);

  const edges = useMemo(() => {
    return (
      roadmapData?.edges?.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        type: "smoothstep",
        // animated: true,
        style: {
          stroke: "#a78bfa",
          strokeWidth: 1,
        },
        data: {
          createdAt: edge.createdAt,
          updatedAt: edge.updatedAt,
        },
      })) || []
    );
  }, [roadmapData?.edges]);
  
  //for effiecieny
  const onNodeClick = useCallback(
    async (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      try {
        await trigger(node.id).unwrap();
        openSheet();
      } catch (error) {
        console.log(error, "from de");
      }
    },
    [trigger, openSheet]
  );

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        onNodeClick={onNodeClick}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={false}
        zoomOnScroll={false}
        panOnDrag={false}
        zoomOnPinch={false}
      />
      <NodeDetailsSheet
        isOpen={isOpen}
        closeSheet={closeSheet}
        nodeDetails={nodeDetails as NodeDetailsResponse}
        isLoading={isLoading}
      />
    </>
  );
};
