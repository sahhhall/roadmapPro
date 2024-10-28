import { apiSlice } from "@/redux/slices/apiSlice";
import { AllStacksResponse, MentorAssessmentRegistrationRequest, MentorAssessmentRegistrationResponse, QuestionResponse, TestSubmissionRequest } from "@/features/user/types/mentor";
import { AssessmentTestEndpoints } from "@/features/user/services/endPoints";



const mentorTestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAvalibleStacks: builder.query<AllStacksResponse[], any>({
            query: () => ({
                url: AssessmentTestEndpoints.getAllStackUser,
                method: 'get'
            })
        }),
        registerTest: builder.mutation<MentorAssessmentRegistrationResponse, MentorAssessmentRegistrationRequest>({
            query: (data) => ({
                url: AssessmentTestEndpoints.registerTestWithMentorDetails,
                method: 'post',
                body: data
            })
        }),

        getQuestion: builder.query<QuestionResponse, any>({
            query: (id) => ({
                url: AssessmentTestEndpoints.getQuestion(id),
                method: 'get'
            })
        }),

        submitMentor: builder.mutation<any, TestSubmissionRequest>({
            query: (data) => ({
                url: AssessmentTestEndpoints.submitTest,
                method: 'post',
                body: data
            })
        }),

    })
})


export const { useGetAllAvalibleStacksQuery, useRegisterTestMutation, useLazyGetQuestionQuery, useSubmitMentorMutation } = mentorTestApi;