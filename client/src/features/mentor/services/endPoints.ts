export const MentorEndpoints = {
    getMentorsBySkill: (skill: string) => `/api/mentor/${skill}`,
    getMentorDetails: (mentorId: string) => `/api/mentor/details/${mentorId}`,
    getAvailbilityOfMentor: (mentorId: string) => `/api/mentors/availability/${mentorId}`
}