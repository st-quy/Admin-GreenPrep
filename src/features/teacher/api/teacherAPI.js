// File: src/features/account/accountAPI.js
import axiosInstance from "@shared/config/axios";

export const createTeachers = async (data) => {
  return await axiosInstance.post("/users/register", data);
};
export const updateTeachers = async (data) => {
  return await axiosInstance.put(`/users/${data.teacherId}`, data.teacherData);
};
export const getTeachers = async (data) => {
  const res = await axiosInstance.post(`/users/teachers`, data);
  return res.data;
};
