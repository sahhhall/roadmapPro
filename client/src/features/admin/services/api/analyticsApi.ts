import { apiSlice } from "@/redux/slices/apiSlice";
import { adminEndpoints } from "../endpoints";

const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBookingMonthBaseAnlaylisis: builder.query<any, any>({
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
        getTotalRevenue: builder.query<any, any>({
            query: () => ({
                url: adminEndpoints.getTotalRevenue,
                method: 'get'
            }),
            keepUnusedDataFor: 0
        }),
    })
});

export const { useGetBookingMonthBaseAnlaylisisQuery, useGetCountOfBookingsAndUsersQuery,useGetTotalRevenueQuery } = analyticsApi;
