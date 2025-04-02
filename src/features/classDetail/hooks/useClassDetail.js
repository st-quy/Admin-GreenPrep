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

export const useGenerateSessionKeyMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await ClassDetailApi.generateSessionKey();
      return response.data;
    },
  });
};

export const useCreateSessionMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (classID, data) => {
      const response = await ClassDetailApi.createSession(classID, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["classDetail"] });
    },
    onError: (error) => {
      console.error("Lỗi khi tạo session:", error);
    },
  });
};

export const useUpdateSessionMutation = () => {};

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
