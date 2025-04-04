import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClassDetailApi } from "../classAPI";

export const useClassDetailQuery = (classID) => {
  return useQuery({
    queryKey: ["classDetail", classID],
    enabled: !!classID,
    queryFn: async () => {
      const response = await ClassDetailApi.getClassById(classID);
      return response.data.data;
    },
  });
};

export const useSessionByIdQuery = (sessionId) => {
  return useQuery({
    queryKey: ["session", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const response = await ClassDetailApi.getSessionById(sessionId);
      return response.data.data;
    },
  });
};

export const useGenerateSessionKeyMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await ClassDetailApi.generateSessionKey();
      return response.data;
    },
  });
};

export const useDeleteSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sessionId) => {
      const response = await ClassDetailApi.deleteSession(sessionId);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classDetail"] });
    },
    onError: (error) => {
      console.error("Lỗi khi xóa session:", error);
    },
  });
};
export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await ClassDetailApi.createSession(
        // @ts-ignore
        data.classId,
        // @ts-ignore
        data.sessionData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classDetail"] });
    },
  });
};

export const useUpdateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const response = await ClassDetailApi.updateSession(
        // @ts-ignore
        data.sessionId,
        // @ts-ignore
        data.sessionData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classDetail"] });
    },
  });
};
