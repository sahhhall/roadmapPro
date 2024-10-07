import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';
import { adminLogout } from './adminSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4001',
    credentials: 'include'
});

const baseQueryWithReAuth: BaseQueryFn<any, any, FetchBaseQueryError> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        console.log('Access token expired. Attempting to refresh...');
        const refreshResult = await baseQuery('/api/auth/refreshToken', api, extraOptions);

        if (refreshResult.data) {
            console.log('token refreshed success returying original req');
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log('Refresh token failed. Logging out the user.');
            api.dispatch(logout());
            api.dispatch(adminLogout());
        }
    }

    return result;
};


export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    tagTypes: ['Users', 'Roadmap'],
    endpoints: () => ({})
});
