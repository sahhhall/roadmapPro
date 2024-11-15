export const adminEndpoints = {
    login: '/api/admin/',
    getUsers: '/api/admin/users',
    blockunblok: '/api/admin/user-action',

    getBookingsDaysAnalysis: (days?: string | number) => {
        let url = `api/bookings/analytics`;
        if (days) {
            url += `?days=${days}`;
        }
        return url
    },
    getCountOfBookinggsAndUsers: 'api/bookings/analytics/total'
}