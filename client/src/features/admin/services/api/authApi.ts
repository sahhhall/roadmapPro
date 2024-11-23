import { apiSlice } from "@/redux/slices/apiSlice";
import { adminEndpoints } from "@/features/admin/services/endpoints";
import { Blockdata } from '@/features/admin/types/admin';
import { IFetchUserData } from "@/types/database";

const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchusers: builder.query<IFetchUserData, { page: number; pageSize: number }>({
            query: (params) => ({
                url: `${adminEndpoints.getUsers}?page=${params.page}&pageSize=${params.pageSize}`,
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
