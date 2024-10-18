export const roadmapEndPoints = {
    roadmapCreate: '/api/roadmap',
    nodeCreate: '/api/roadmap/node',
    saveRoadmap: '/api/roadmap/publish',
    getAllRoadMaps: '/api/roadmap',
    getRoadmapByRequest: 'api/admin/roadmap',
    getAllRoadMapsPublished: '/api/roadmap/published',
    // getAllRequestedRoadmaps:'/api/roadmap/drafted',
    getRoadMapByID: (id: string) => `/api/roadmap/${id}`,
    getNodeDetailsByID:  (id: string) => `/api/roadmap/nodedetails/${id}`
}