export const AssessmentTestEndpoints = {
    getAllStackUser: '/api/assessment',
    registerTestWithMentorDetails: '/api/assessment/tests',
    getQuestion: (id: string) => `/api/assessment/tests/${id}`,
    submitTest: '/api/assessment/tests/submit',

    getUserDetails: (userId: string) => `/api/user/${userId}`,

}

export const profileEndpoints = {
    updateProfileMentor: '/api/mentor',
    updateGenericProfile: '/api/user/update'
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







export const roadmapEndPoints = {
    getRoadmapDetails: (userId: string, status: string) => {
        let url = `/api/roadmap/profile/${userId}`;
        if (status) {
            url += `?status=${status}`;
        }
        return url
    }
}