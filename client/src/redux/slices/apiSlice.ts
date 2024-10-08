import { BaseQueryFn, createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { logout } from './authSlice';
import { adminLogout } from './adminSlice';
const baseURL =  import.meta.env.VITE_BASE_URL;
const baseQuery = fetchBaseQuery({
    baseUrl: baseURL,
    credentials: 'include'
});

const baseQueryWithReAuth: BaseQueryFn<any, any, FetchBaseQueryError> = async (args, api, extraOptions) => {

    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        console.log('Access token expired. Attempting to refresh...', args);
        // here setted for the conflicts like if i use this as my global store there will be confilct
        // like if i mention any one here it go there and refersh token appropiate one
        // the problem solved here
        //     if i didt mention anything here i used /api/auth so it take req and generate user refresh every time
        const refreshUrl = args.url.startsWith('/api/admin') ? '/api/admin/refreshToken' : '/api/auth/refreshToken'
        const refreshResult = await baseQuery({
            url: refreshUrl,
            method: 'POST',
        }, api, extraOptions);
        console.log(refreshResult, "refreshresult")
        if (refreshResult.data) {
            console.log('token refreshed success returying original req');
            result = await baseQuery(args, api, extraOptions);
        } else {
            //here need change handle later
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
