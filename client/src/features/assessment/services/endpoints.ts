export const assessmentEndPoints = {
    stackCreation: '/api/admin/assessment',
    getAllStack: '/api/admin/assessment',
    deleteStack: '/api/admin/assessment',


    createQuestion: '/api/admin/assessment/questions',
    deleteQuestion: '/api/admin/assessment/question',
    getAllQuestionByStackID: (id: string) => `/api/admin/assessment/questions/${id}`,


    getAllTests: `/api/admin/assessment/tests`,
    updateTest: `/api/admin/assessment/tests`

}