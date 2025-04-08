import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileApi } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../api";
import { message } from "antd";

export const useFetchProfile = (studentId) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await ProfileApi.getProfile(studentId);
      return data;
    },
  });
};

export const useResetPassword = () => {
    const navigate = useNavigate();
    return useMutation({
      mutationFn: async (params) => {
        const { data } = await AuthApi.resetPassword(params);
        message.success(data.message);
        navigate("/reset-success");
        return data.data;
      },
      onError({ response }) {
        message.error(response.data.message);
        navigate("/reset-password");
      },
    });
  };