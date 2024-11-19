import { apiSlice } from "@/redux/slices/apiSlice";
import { AllStacksResponse, IGetAllBookingsResponse, IMentorDetailsResponse, IMentorUpdateRequest, IRoadmapResponse, IUpdateGenericProfileRequest, MentorAssessmentRegistrationRequest, MentorAssessmentRegistrationResponse, QuestionResponse, TestSubmissionRequest } from "@/features/user/types/mentor";
import { AssessmentTestEndpoints, BookingEndpoints, profileEndpoints, roadmapEndPoints } from "@/features/user/services/endPoints";
import { INotificationResponse } from "../../types/notification";



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

        getUserDetails: builder.query<any, any>({
            query: (id) => ({
                url: AssessmentTestEndpoints.getUserDetails(id),
                method: 'get',
            }),
            keepUnusedDataFor: 0
        }),


        getAllBookingDetails: builder.query<IGetAllBookingsResponse[], any>({
            query: ({ mentorId, status }) => ({
                url: BookingEndpoints.getBookingDetails(mentorId, status),
                method: 'get',
            }),
            keepUnusedDataFor: 0,
        }),

        getAllRoadmapsByUserId: builder.query<IRoadmapResponse[], any>({
            query: ({ mentorId, status }) => ({
                url: roadmapEndPoints.getRoadmapDetails(mentorId, status),
                method: 'get',
            }),
            keepUnusedDataFor: 0,
        }),

        updateMentorProfile: builder.mutation<IMentorDetailsResponse, IMentorUpdateRequest>({
            query: (data) => ({
                url: profileEndpoints.updateProfileMentor,
                method: 'put',
                body: data
            }),
            invalidatesTags: ['MentorDetails']
        }),
        updateUserDetails: builder.mutation<any, IUpdateGenericProfileRequest>({
            query: (data) => ({
                url: profileEndpoints.updateGenericProfile,
                method: 'put',
                body: data
            }),
        }),

        getNotifications: builder.query<INotificationResponse[], { email: string; skip: number }>({
            query: ({ email, skip }) => ({
                url: `${profileEndpoints.getNotifications}/${email}`,
                method: 'GET',
                params: { skip }
            }),
            keepUnusedDataFor: 0
        }),
        getNoticationCount: builder.query<{ notificationCount: number }, { email?: any }>({
            query: ({ email }) => ({
                url: `${profileEndpoints.getNotificationCount}/${email}`,
                method: 'GET',
            }),
            keepUnusedDataFor: 0,

        })


    })
})


export const {
    useGetAllAvalibleStacksQuery,
    useRegisterTestMutation,
    useLazyGetQuestionQuery,
    useSubmitMentorMutation,
    useGetUserDetailsQuery,
    useGetAllBookingDetailsQuery,
    useGetAllRoadmapsByUserIdQuery,
    useUpdateMentorProfileMutation,
    useUpdateUserDetailsMutation,
    useGetNotificationsQuery,
    useGetNoticationCountQuery
} = mentorTestApi;