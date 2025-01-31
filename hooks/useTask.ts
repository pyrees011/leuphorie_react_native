import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Services
import { taskService } from '../services/task-service'

// Hooks
import { useAxiosInstance } from '../axios/axios'
import { useAuth } from './useAuth'

export const useTasks = () => {

  const queryClient = useQueryClient()
  const axiosInstance = useAxiosInstance()
  const { user, loading } = useAuth()

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['tasks', user?.uid], 
    queryFn: () => taskService.getTasks(axiosInstance),
    enabled: !loading && !!user?.token,
    retry: 1,
  })

  const updateTaskMutation = useMutation({
    mutationFn: ({ categoryId, taskId, status }: { categoryId: string, taskId: string, status: string }) => {
      return taskService.updateTaskStatus(
        axiosInstance, 
        { 
          categoryId, 
          taskId, 
          status: status
        }
      );
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.uid] })
    },
  })

  const createTaskMutation = useMutation({
    mutationFn: ({task, categoryId}: {task: any, categoryId: string}) => {
      return taskService.createTask(axiosInstance, {task, categoryId})
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.uid] })
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: ({categoryId, taskId}: {categoryId: string, taskId: string}) => {
      console.log("categoryId hook", categoryId);
      console.log("taskId hook", taskId);
      return taskService.deleteTask(axiosInstance, {categoryId, taskId})
    }, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.uid] })
    }
  })

  console.log("categories", categories);

  const allTasks = categories?.reduce((acc: any, category: any) => {
    return [...acc, 
      ...category.tasks.map((task: any) => ({
        ...task,
        categoryId: category._id,
        name: category.name,
      }))
    ]
  }, []) || []

  const organizedTasks = {
    todo: allTasks.filter((task: any) => task.status.toLowerCase() === 'todo') || [],
    inProgress: allTasks.filter((task: any) => task.status.toLowerCase() === 'inprogress') || [],
    reviewing: allTasks.filter((task: any) => task.status.toLowerCase() === 'reviewing') || [],
    done: allTasks.filter((task: any) => task.status.toLowerCase() === 'done') || []
  }

  return {
    tasks: organizedTasks,
    categories,
    isLoading: isLoadingCategories,
    updateTask: updateTaskMutation.mutate,
    createTask: createTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  }
}