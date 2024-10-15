import { apiSlice } from "@/redux/slices/apiSlice";
import { CreateRoadmapRequest, NodeCreationRequest, NodeCreationResponse, RoadmapResponse } from "@/features/roadmaps/types/roadmap";
import { roadmapEndPoints } from "@/features/roadmaps/services/endpoints";




const roadmapApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRoadmap: builder.mutation<RoadmapResponse, CreateRoadmapRequest>({
            query: (data) => ({
                url: roadmapEndPoints.roadmapCreate,
                method: 'post',
                body: data
            })
        }),
        createNode: builder.mutation<NodeCreationResponse, NodeCreationRequest>({
            query: (data) => ({
                url: roadmapEndPoints.nodeCreate,
                method: 'post',
                body: data
            }),
        })
    })
});


export const { useCreateRoadmapMutation,useCreateNodeMutation } = roadmapApiSlice