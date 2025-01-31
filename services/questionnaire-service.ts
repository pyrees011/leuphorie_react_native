import { AxiosInstance } from "axios";

export const questionnaireService = {
  sendQuestionnaire: async (axiosInstance: AxiosInstance, questionnaire: any) => {
    await axiosInstance.post("/questionnaire", questionnaire)
  },

  getQuestionnaireForUser: async (axiosInstance: AxiosInstance, userId: string) => {
    const response = await axiosInstance.get(`/questionnaire/${userId}`)
    return response.data
  },

  getQuestionnaireParticularForUser: async (axiosInstance: AxiosInstance, userId: string, questionnaireId: string) => {
    const response = await axiosInstance.get(`/questionnaire/${userId}/${questionnaireId}`)
    return response.data
  },

  updateQuestionnaireParticularForUser: async (axiosInstance: AxiosInstance, userId: string, questionnaireId: string, questionnaire: any) => {
    await axiosInstance.put(`/questionnaire/${userId}/${questionnaireId}`, questionnaire)
  },

  deleteQuestionnaireParticularForUser: async (axiosInstance: AxiosInstance, userId: string, questionnaireId: string) => {
    await axiosInstance.delete(`/questionnaire/${userId}/${questionnaireId}`)
  }
}