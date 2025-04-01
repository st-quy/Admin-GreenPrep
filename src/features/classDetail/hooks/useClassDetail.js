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

export const useCreateSessionMutation = () => {};

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
