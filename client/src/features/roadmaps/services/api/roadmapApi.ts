import { apiSlice } from "@/redux/slices/apiSlice";
import { CreateRoadmapRequest, RoadmapResponse } from "@/features/roadmaps/types/roadmap";
import { roadmapEndPoints } from "@/features/roadmaps/services/endpoints";




const roadmapApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createRoadmap: builder.mutation<RoadmapResponse, CreateRoadmapRequest>({
            query: (data) => ({
                url: roadmapEndPoints.roadmapCreate,
                method: 'post',
                body: data
            })
        })
    })
});


export const { useCreateRoadmapMutation } = roadmapApiSlice