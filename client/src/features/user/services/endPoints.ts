export const AssessmentTestEndpoints = {
    getAllStackUser: '/api/assessment',
    registerTestWithMentorDetails: '/api/assessment/tests',
    getQuestion: (id: string) => `/api/assessment/tests/${id}`,
    submitTest: '/api/assessment/tests/submit'
}