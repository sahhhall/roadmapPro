import { apiSlice } from "@/redux/slices/apiSlice";
import { MentorEndpoints } from "@/features/mentor/services/endPoints";
import { GetMentorsResponse, MentorAvailabilityResponse } from "@/features/mentor/types/mentor";


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
        }),
    })

})


export const { useGetMentorsBySkillQuery,useGetAvailabilityOfMentorQuery,useGetMentorDetailsQuery } = mentorApi;