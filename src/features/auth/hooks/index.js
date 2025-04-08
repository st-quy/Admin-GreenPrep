import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileApi } from "../api";

export const useFetchProfile = (studentId) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await ProfileApi.getProfile(studentId);
      return data;
    },
  });
};
