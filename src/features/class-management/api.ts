import axiosInstance from "@shared/config/axios";

export interface Class {
  id: string;
  name: string;
  studentCount: number;
}

export const ClassApi = {
  getAll: () => {
    return axiosInstance.get("/classes");
  },
  delete: (classId: string) => {
    return axiosInstance.delete(`/classes/${classId}`);
  },
}; 