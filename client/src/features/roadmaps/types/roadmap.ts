
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