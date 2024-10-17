import { ReactFlow, Node } from "@xyflow/react";
import { UserViewTopic } from "../drawer/nodes/UserViewTopic";
import { UserViewSubTopic } from "../drawer/nodes/UserViewSubTopic";
import { useMemo } from "react";

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
        animated: true,
        style: {
          stroke: "#a78bfa",
          strokeWidth: 2,
        },
        data: {
          createdAt: edge.createdAt,
          updatedAt: edge.updatedAt,
        },
      })) || []
    );
  }, [roadmapData?.edges]);

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    event.preventDefault();
    console.log("Clicked node:", node);
  };

  return (
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
  );
};
