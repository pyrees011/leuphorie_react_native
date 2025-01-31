import { AxiosInstance } from "axios";

export const chatService = {
  sendMessage: async (axiosInstance: AxiosInstance, message: string, userId: string, sessionId: string) => {
    const messageBlock = {
        message,
        session_id: sessionId
    }
    return await axiosInstance.post(`/chat/${userId}`, messageBlock)
  },

  getMessages: async (axiosInstance: AxiosInstance, userId: string, sessionId: string) => {
    const response = await axiosInstance.get(`/chat/${userId}`, {
        params: {
            session_id: sessionId
        }
    })
    return response.data
  }
}