import { apiSlice } from "@/redux/slices/apiSlice";
import { assessmentEndPoints } from "@/features/assessment/services/endpoints";
import { AllQuestionsByStackResponse, AllStacksResponse, CreateQuestionRequest } from "@/features/assessment/types/assessment";



const assessmentApiSlices = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createStack: builder.mutation<AllStacksResponse, { name: string }>({
            query: (data) => ({
                url: assessmentEndPoints.stackCreation,
                method: 'post',
                body: data
            })
        }),
        getStacks: builder.query<AllStacksResponse[], any>({
            query: () => ({
                url: assessmentEndPoints.getAllStack,
                method: 'get'
            })
        }),
        getQuestionsByStackId: builder.query<AllQuestionsByStackResponse[], any>({
            query: (id: string) => ({
                url: assessmentEndPoints.getAllQuestionByStackID(id),
                method: 'get'
            })
        }),
        createQuestion: builder.mutation<any, CreateQuestionRequest>({
            query: (data) => ({
                url: assessmentEndPoints.createQuestion,
                method: 'post',
                body: data
            })
        })
    })
})


export const { useCreateStackMutation, useGetStacksQuery, useGetQuestionsByStackIdQuery, useCreateQuestionMutation } = assessmentApiSlices