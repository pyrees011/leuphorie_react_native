import { AxiosInstance } from "axios";


export const taskService = {
  getTasks: async (axiosInstance: AxiosInstance) => {
    const { data } = await axiosInstance.get(`/categories`)
    return data
  },

  updateTaskStatus: async (axiosInstance: AxiosInstance, { categoryId, taskId, status }: { categoryId: string, taskId: string, status: string }) => {
    const { data } = await axiosInstance.patch(
      `/categories/${categoryId}/tasks/${taskId}/status`, 
      { status }
    );
    return data;
  },

  createTask: async (axiosInstance: AxiosInstance, { task, categoryId }: { task: any, categoryId: string }) => {
    const { data } = await axiosInstance.post(`/categories/${categoryId}/tasks`, task)
    return data
  },

  deleteTask: async (axiosInstance: AxiosInstance, { categoryId, taskId }: { categoryId: string, taskId: string }) => {
    console.log("categoryId service", categoryId);
    console.log("taskId service", taskId);
    await axiosInstance.delete(`/categories/${categoryId}/tasks/${taskId}`)
  }
} 