import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// contexts
import { useAuth, User } from "./useAuth";

// axios
import { useAxiosInstance } from "../axios/axios";

// Services
import { questionnaireService } from "../services/questionnaire-service";

export const useQuestionnaire = () => {
  const { user , loading } = useAuth();
  const queryClient = useQueryClient();
  const axiosInstance = useAxiosInstance();

  const { data: questionnaire, isLoading: questionnaireLoading, error: questionnaireError } = useQuery({
    queryKey: ["questionnaire", user?.uid ],
    queryFn: () => questionnaireService.getQuestionnaireForUser(axiosInstance, user?.uid as string),
    enabled: !!user?.token && !loading,
    retry: 1
  })

  const createQuestionnaire = useMutation({
    mutationFn: (questionnaire: any) => questionnaireService.sendQuestionnaire(axiosInstance, questionnaire),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", user?.uid] })
    }
  })

  const updateQuestionnaire = useMutation({
    mutationFn: ({ questionId, questionnaire }: { questionId: string; questionnaire: any }) => 
      questionnaireService.updateQuestionnaireParticularForUser(axiosInstance, user?.uid as string, questionId, questionnaire),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", user?.uid] })
    }
  })

  const deleteQuestionnaire = useMutation({
    mutationFn: (questionnaireId: string) => 
      questionnaireService.deleteQuestionnaireParticularForUser(axiosInstance, user?.uid as string, questionnaireId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["questionnaire", user?.uid] })
    }
  })

  return {
    questionnaire,
    questionnaireLoading,
    questionnaireError,
    createQuestionnaire: createQuestionnaire.mutate,
    updateQuestionnaire: updateQuestionnaire.mutate,
    deleteQuestionnaire: deleteQuestionnaire.mutate
  }
}