import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

// contexts
import { useAuth } from "./useAuth";

// axios
import { useAxiosInstance } from "@/axios/axios";

// Services
import { chatService } from "../services/chat-service";

export const useChat = (sessionId: string | null = null) => {
    const { user, loading } = useAuth();
    const queryClient = useQueryClient();
    const axiosInstance = useAxiosInstance();

    const getMessagesHook = useQuery({
        queryKey: ["messages", user?.uid, sessionId],
        queryFn: async () => chatService.getMessages(axiosInstance, user?.uid as string, sessionId as string),
        enabled: !!user?.token && !loading && !!sessionId,
        retry: 1
    });

    const sendMessageHook = useMutation({
        mutationFn: async ({ message, sessionId = null }: { message: string; sessionId: string | null }) => {
            const response = await chatService.sendMessage(axiosInstance, message, user?.uid as string, sessionId as string);
            return response.data;
        },
        onSuccess: (data: any) => {
            const sessionId = data.session_id;
            queryClient.invalidateQueries({ queryKey: ["messages", user?.uid, sessionId] });
        }
    });

    return {
        messages: getMessagesHook.data,
        isLoading: getMessagesHook.isLoading,
        sendMessage: sendMessageHook.mutate,
        isError: getMessagesHook.isError,
        error: getMessagesHook.error
    };
};
