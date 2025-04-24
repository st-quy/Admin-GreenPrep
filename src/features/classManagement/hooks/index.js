import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ClassApi } from "../api";
import { message } from "antd";
import { useSelector } from "react-redux";

export const useGetAllClass = (teacherId = null, page, limit, searchName) => {
  return useQuery({
    queryKey: ["classes",teacherId,  page, limit, searchName],
    queryFn: async () => {
      const { data } = await ClassApi.getAll(teacherId, page, limit, searchName);
      return data;
    },
  });
};

export const useCreateClass = () => {
  const { user } = useSelector((state) => state.auth);

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const response = await ClassApi.createClass({
        ...params,
        userId: user.userId,
      });
      return response.data;
    },
    onSuccess: (data) => {
      message.success("Class created successfully");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: ({response}) => {
      message.error(response.data.message || "Failed to create class");
    }
  });
};

export const useUpdateClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params) => {
      const response = await ClassApi.updateClass(params.classId, {
        className: params.className,
      });
      return response.data;
    },
    onSuccess: (data) => {
      message.success("Class updated successfully");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
};

export const useDeleteClass = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (classId) => {
      const response = await ClassApi.deleteClass(classId);
      return response.data;
    },
    onSuccess: (data) => {
      message.success("Deleted class successfully");
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: ({response}) => {
      message.error("Can't delete this class because it has sessions");
    }
  });
};
