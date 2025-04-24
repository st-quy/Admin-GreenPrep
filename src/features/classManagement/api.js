import axiosInstance from "@shared/config/axios";

export const ClassApi = {
  getAll: (teacherId = null, page = 1, limit = 10, searchName) => {
    return axiosInstance.get("/classes", {
      params: {
        teacherId,
        page,
        limit,
        searchName
      },
    });
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
