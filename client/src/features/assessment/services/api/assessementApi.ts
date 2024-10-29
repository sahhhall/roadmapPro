import { apiSlice } from "@/redux/slices/apiSlice";
import { assessmentEndPoints } from "@/features/assessment/services/endpoints";
import { AllQuestionsByStackResponse, AllStacksResponse, CreateQuestionRequest, TestsReponse } from "@/features/assessment/types/assessment";



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
        }),
        deleteQuestion: builder.mutation<any, { id: string }>({
            query: (data) => ({
                url: assessmentEndPoints.deleteQuestion,
                method: 'delete',
                body: data
            })
        }),
        deleteStack: builder.mutation<any, { id: string }>({
            query: (data) => ({
                url: assessmentEndPoints.deleteStack,
                method: 'delete',
                body: data
            })
        }),


        getTestsByResult: builder.query<TestsReponse[], { result?: string }>({
            query: (params) => ({
                url: assessmentEndPoints.getAllTests,
                method: 'get',
                params,
            }),
        }),
        updateTest: builder.mutation<TestsReponse, { id: string; result: string; resultFeedback?: string }>({
            query: (data) => ({
                url: assessmentEndPoints.updateTest,
                method: 'put',
                body: data
            }),
        }),
    })
})


export const { useCreateStackMutation, useGetStacksQuery, useGetQuestionsByStackIdQuery, useCreateQuestionMutation, useDeleteQuestionMutation, useDeleteStackMutation, useLazyGetTestsByResultQuery, useUpdateTestMutation } = assessmentApiSlices