export const roadmapEndPoints = {
    roadmapCreate: '/api/roadmap',
    nodeCreate: '/api/roadmap/node',
    saveRoadmap: '/api/roadmap/publish',
    getAllRoadMaps: '/api/roadmap',
    getAllRoadMapsPublished: '/api/roadmap/published',
    getRoadMapByID: (id: string) => `/api/roadmap/${id}`,
    getNodeDetailsByID:  (id: string) => `/api/roadmap/nodedetails/${id}`
}