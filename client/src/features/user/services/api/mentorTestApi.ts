import { apiSlice } from "@/redux/slices/apiSlice";
import { AllStacksResponse } from "../../types/mentor";
import { AssessmentTestEndpoints } from "../endPoints";



const mentorTestApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllAvalibleStacks: builder.query<AllStacksResponse[], any>({
            query: () => ({
                url: AssessmentTestEndpoints.getAllStackUser,
                method: 'get'
            })
        })
    })
})


export const { useGetAllAvalibleStacksQuery } = mentorTestApi;