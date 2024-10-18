import { apiSlice } from "@/redux/slices/apiSlice";
import { CreateRoadmapRequest, NodeCreationRequest, NodeCreationResponse, NodeDetailsResponse, RoadmapResponse, RoadMapSaveRequest, RoadmMapsResponse } from "@/features/roadmaps/types/roadmap";
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
        }),
        saveRoadMap: builder.mutation<any, RoadMapSaveRequest>({
            query: (data) => ({
                url: roadmapEndPoints.saveRoadmap,
                method: 'post',
                body: data
            }),
            invalidatesTags: ['Roadmap']
        }),
        getRoadmaps: builder.query<RoadmMapsResponse[], any>({
            query: () => ({
                url: roadmapEndPoints.getAllRoadMaps,
                method: 'get'
            }),
            providesTags: ["Roadmap"]
        }),
        getRoadmapsPublished: builder.query<RoadmMapsResponse[], any>({
            query: () => ({
                url: roadmapEndPoints.getAllRoadMapsPublished,
                method: 'get'
            }),
            providesTags: ["RoadmapPublished"]
        }),
        getRoadMapByID: builder.query<RoadmMapsResponse, any>({
            query: (id) => ({
                url: roadmapEndPoints.getRoadMapByID(id),
                method: 'get'
            })
        }),
        getNodeDetailsByID: builder.query<NodeDetailsResponse, any>({
            query: (id) => ({
                url: roadmapEndPoints.getNodeDetailsByID(id),
                method: 'get'
            })
        })
    })
});


export const { useCreateRoadmapMutation, useCreateNodeMutation, useSaveRoadMapMutation, useGetRoadmapsQuery, useGetRoadMapByIDQuery, useGetNodeDetailsByIDQuery, useLazyGetNodeDetailsByIDQuery,useGetRoadmapsPublishedQuery } = roadmapApiSlice