export const roadmapEndPoints = {
    roadmapCreate: '/api/roadmap',
    nodeCreate: '/api/roadmap/node',
    saveRoadmap: '/api/roadmap/publish',
    getAllRoadMaps: '/api/roadmap',
    getRoadMapByID: (id: string) => `/api/roadmap/${id}`
}