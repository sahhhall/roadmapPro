export const MentorEndpoints = {
    getMentorsBySkill: (skill: string, userId: string) => `/api/mentor/${skill}?userId=${userId}`,
    getMentorDetails: (mentorId: string) => `/api/mentor/details/${mentorId}`,
    getAvailbilityOfMentor: (mentorId: string) => `/api/mentors/availability/${mentorId}`,
    
    updateMentorAvailbility: `/api/mentors/availability`,

    createBooking: '/api/bookings',
    fetchMentorBookings: (mentorId: string, status?: string) => {
        let url = `/api/bookings/${mentorId}`;
        if (status) {
            url += `?status=${status}`;
        }
        return url;
    },

    createPaymentIntent : '/api/payments/create'
}