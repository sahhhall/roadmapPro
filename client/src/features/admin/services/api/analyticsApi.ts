import { apiSlice } from "@/redux/slices/apiSlice";
import { adminEndpoints } from "../endpoints";

const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookingDaysAnlaylisis: builder.query<any, any>({
            query: ({ days }) => ({
                url: adminEndpoints.getBookingsDaysAnalysis(days),
                method: 'get'
            }),
            keepUnusedDataFor: 0
        }),
        getCountOfBookingsAndUsers: builder.query<{ totalUser: number, totolBookings: number }, any>({
            query: () => ({
                url: adminEndpoints.getCountOfBookinggsAndUsers,
                method: 'get'
            }),
            keepUnusedDataFor: 0
        }),
    })
});

export const { useGetBookingDaysAnlaylisisQuery,useGetCountOfBookingsAndUsersQuery } = analyticsApi;
