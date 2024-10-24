import { apiSlice } from "@/redux/slices/apiSlice";
import { assessmentEndPoints } from "@/features/assessment/services/endpoints";



const assessmentApiSlices = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createStack: builder.mutation<any, any>({
            query: (data) => ({
                url: assessmentEndPoints.stackCreation,
                method: 'post',
                body: data
            })
        }),
        getStacks: builder.query<any, any>({
            query: () => ({
                url: assessmentEndPoints.getAllStack,
                method: 'get'
            })
        })
    })
})


export const { useCreateStackMutation, useGetStacksQuery } = assessmentApiSlices