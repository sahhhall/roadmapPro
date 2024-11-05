import { apiSlice } from "@/redux/slices/apiSlice";
import { MentorEndpoints } from "@/features/mentor/services/endPoints";
import { GetMentorsResponse } from "@/features/mentor/types/mentor";


const mentorApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMentorsBySkill: builder.query<GetMentorsResponse[], any>({
            query: (skill) => ({
                url: MentorEndpoints.getMentorsBySkill(skill),
                method: 'get',
            })
        })
    })
})


export const { useGetMentorsBySkillQuery} = mentorApi;