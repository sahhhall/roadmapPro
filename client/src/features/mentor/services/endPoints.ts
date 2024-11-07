export const MentorEndpoints = {
    getMentorsBySkill: (skill: string) => `/api/mentor/${skill}`,
    getMentorDetails: (mentorId: string) => `/api/mentor/details/${mentorId}`,
    getAvailbilityOfMentor: (mentorId: string) => `/api/mentors/availability/${mentorId}`,

    updateMentorAvailbility: `/api/mentors/availability`,
    
    createBooking: '/api/bookings',
    fetchMentorBookings: (mentorId: string) => `/api/bookings/${mentorId}`
}