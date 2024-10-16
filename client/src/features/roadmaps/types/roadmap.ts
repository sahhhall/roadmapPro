
export interface CreateRoadmapRequest {
    title: string;
    description: string;
    userId: string;
}

export interface RoadmapResponse {
    id: string;
    userId: string;
    title: string;
    description: string;
    status: "drafted" | "published";
    nodes: Array<any>;
    edges: Array<any>;
    adminFeedback: string;
    createdAt: string;
}



// node creation 
interface Position {
    x: number;
    y: number;
}

// export interface NodeStyle {
//     color: string;
//     border: string;
//     boxShadow: string;
//     width: number;
//     fontSize: string;
//     padding: string;
//     fontWeight: string;
//     background: string;
// }


export interface NodeCreationRequest {
    roadmapId: string | undefined;
    type: string;
    position: Position;
    data: string;
    background: string;
}


export interface NodeCreationResponse {
    type: string;
    position: Position;
    data: string;
    hasDetails: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
}




//common

// style: {
//     color: "#000000",
//     border: "1px solid #222138",
//     boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
//     width: 100,
//     fontSize: "7px",
//     padding: "2px",
//     fontWeight: "medium",
//     background: nodeType === "topic" ? "#fdff00" : "#f3c950",
//   },


// interfaces for roadmap saving


interface NodeData {
    id: string | any;
    data: string | any;
    position: Position | any;
    background: string | any;
    type: string | any;
}

interface EdgeData {
    source: string;
    target: string;
}

interface NodeDetail {
    nodeId: string | null;
    title: string;
    description: string;
    links: { title: string; url: string }[];
}

export interface RoadMapSaveRequest {
    roadmapId: string| undefined;
    edges: EdgeData[];
    nodes: NodeData[];
    nodeDetails: NodeDetail[];
}


// get roadmaps

export interface RoadmMapsResponse {
    userId: string;
    title: string;
    description: string;
    status: 'drafted' | 'published'| 'rejected'; 
    nodes: string[];
    edges: (string | null)[]; 
    adminFeedback: string;
    createdAt: string;
    updatedAt: string;
    id: string;
}