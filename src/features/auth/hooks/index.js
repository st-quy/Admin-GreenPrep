import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileApi } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../api";
import { message } from "antd";
import { useSelector } from "react-redux";
import { updateUser } from "@app/providers/reducer/auth/authSlice";
import { useDispatch } from "react-redux";

// @ts-ignore
export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (credentials) => {
      const { data } = await AuthApi.login(credentials);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/");
    },
    onError: (error) => {
      // @ts-ignore
      message.error(error?.response?.data?.message || "Login failed");
    },
  });
};

// @ts-ignore
export const useUpdateProfile = () => {
  // @ts-ignore
  const { userId } = useSelector((state) => state.auth);
  const queryClient = useQueryClient()
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async (params) => {
      const { data } = await AuthApi.updateProfile(userId, params);
      message.success(data.message);
      dispatch(updateUser({
        userId: data.data.ID,
        role: data.data.roleIDs,
        lastName: data.data.lastName,
        firstName: data.data.firstName,
        email: data.data.email,
        phone: data.data.phone,
        class: data.data.class,
        studentCode: data.data.studentCode,
        teacherCode: data.data.teacherCode,
      }));
      queryClient.invalidateQueries({ queryKey: ['profile'] }) 
      return data.data;
    },
    onError: (error) => {
      // @ts-ignore
      message.error(error?.response?.data?.message || "Update failed");
    },
  });
};

export const useFetchProfile = (studentId) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await ProfileApi.getProfile(studentId);
      return data;
    },
  });
};

export const useGetProfile = () => {
  const { userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
      try {
        const data = await AuthApi.getProfile(userId);
        dispatch(updateUser({
          userId: data.data.ID,
          role: data.data.roleIDs,
          lastName: data.data.lastName,
          firstName: data.data.firstName,
          email: data.data.email,
          phone: data.data.phone,
          class: data.data.class,
          studentCode: data.data.studentCode,
          teacherCode: data.data.teacherCode,
        }));

        return data.data;
      } catch (error) {
        message.error(error.response?.data?.message || 'Failed to fetch profile');
        return null;
      }
    },
    enabled: Boolean(userId),
    retry: false,
  });
};

export const useForgotPassword = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await AuthApi.forgotPassword(params);
      return data.data;
    },
    onError({ response }) {
      message.error(response.data.message);
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

export const useChangePassword = () => {
  const { userId } = useSelector((state) => state.auth);

  return useMutation({
    mutationFn: async (params) => {
      const { data } = await AuthApi.changePassword(userId, params);
      message.success(data.message);
      return data.data;
    },
    onError({ response }) {
      message.error(response.data.message);
    },
  });
};