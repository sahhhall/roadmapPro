import { apiSlice } from "@/redux/slices/apiSlice";
import { AllStacksResponse, MentorAssessmentRegistrationRequest, MentorAssessmentRegistrationResponse } from "@/features/user/types/mentor";
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
        })
    })
})


export const { useGetAllAvalibleStacksQuery, useRegisterTestMutation } = mentorTestApi;