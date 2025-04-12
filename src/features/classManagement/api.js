import axiosInstance from "@shared/config/axios";

export const ClassApi = {
  getAll: () => {
    return axiosInstance.get("/classes");
  },
  createClass: (params) => {
    return axiosInstance.post(`/classes`, params);
  },
  updateClass: (classId, params) => {
    return axiosInstance.put(`/classes/${classId}`, params);
  },
  deleteClass: (classId) => {
    return axiosInstance.delete(`/classes/${classId}`);
  },
};