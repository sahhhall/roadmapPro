import { apiSlice } from "@/redux/slices/apiSlice";
import { MentorEndpoints } from "@/features/mentor/services/endPoints";
import { GetMentorsResponse, ICreateBookingRequest, IGetMenotrsBookingsResponse, MentorAvailabilityResponse, UpdateMentorAvailbilityRequest } from "@/features/mentor/types/mentor";


const mentorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMentorsBySkill: builder.query<GetMentorsResponse[], any>({
            query: (skill) => ({
                url: MentorEndpoints.getMentorsBySkill(skill),
                method: 'get',
            })
        }),
        getMentorDetails: builder.query<GetMentorsResponse, string>({
            query: (mentorId) => ({
                url: MentorEndpoints.getMentorDetails(mentorId),
                method: 'get',
            }),
        }),
        getAvailabilityOfMentor: builder.query<MentorAvailabilityResponse, string>({
            query: (mentorId) => ({
                url: MentorEndpoints.getAvailbilityOfMentor(mentorId),
                method: 'get',
            }),
            providesTags: ["AvailbilityMentor"]
        }),

        updateMentorAvailibility: builder.mutation<any, UpdateMentorAvailbilityRequest>({
            query: (data) => ({
                url: MentorEndpoints.updateMentorAvailbility,
                method: 'put',
                body: data,
            }),
            invalidatesTags: ["AvailbilityMentor"]
        }),

        createBooking: builder.mutation<IGetMenotrsBookingsResponse, ICreateBookingRequest>({
            query: (data) => ({
                url: MentorEndpoints.createBooking,
                method: 'post',
                body: data,
            }),
            invalidatesTags: ['BookingData']
        }),

        fetchMentorBookingsById: builder.query<IGetMenotrsBookingsResponse[], { mentorId: string; status?: string }>({
            query: ({ mentorId, status }) => ({
                url: MentorEndpoints.fetchMentorBookings(mentorId, status),
                method: 'get',
            }),
            providesTags: ['BookingData']
        }),

    })

})


export const {
    useGetMentorsBySkillQuery,
    useGetAvailabilityOfMentorQuery,
    useGetMentorDetailsQuery,
    useUpdateMentorAvailibilityMutation,
    useFetchMentorBookingsByIdQuery,
    useCreateBookingMutation
} = mentorApi;