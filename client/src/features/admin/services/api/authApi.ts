import { apiSlice } from "@/redux/slices/apiSlice";
import { adminEndpoints } from "@/features/admin/services/endpoints";
import { IUserData } from "@/types/database";
import { Blockdata } from '@/features/admin/types/admin';

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchusers: builder.query<IUserData, any>({
            query: () => ({
                url: adminEndpoints.getUsers,
                method: 'get'
            }),
            providesTags: ["Users"]
        }),
        blockuser: builder.mutation<Blockdata, any>({
            query: (data) => ({
                url: adminEndpoints.blockunblok,    
                method: 'post',
                body: data
            }),
            invalidatesTags: ["Users"]
        })
    })
});

export const { useFetchusersQuery, useLazyFetchusersQuery, useBlockuserMutation } = adminApiSlice;
