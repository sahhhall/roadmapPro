export const AssessmentTestEndpoints = {
    getAllStackUser: '/api/assessment',
    registerTestWithMentorDetails: '/api/assessment/tests',
    getQuestion: (id: string) => `/api/assessment/tests/${id}`,
    submitTest: '/api/assessment/tests/submit',

    getUserDetails: (userId: string) => `/api/user/${userId}`,

}

export const BookingEndpoints = {
    getBookingDetails: (userId: string, status?: string) => {
        let url = `/api/bookings/profile/${userId}`;
        if (status) {
            url += `?status=${status}`;
        }
        return url
    }
}