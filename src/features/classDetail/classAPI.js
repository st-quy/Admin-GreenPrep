import axiosInstance from "@shared/config/axios";

export const ClassDetailApi = {
  getClassById: (classId) => {
    return axiosInstance.get(`/classes/${classId}`);
  },
  generateSessionKey: () => {
    return axiosInstance.get(`/sessions/generate-key`);
  },
  createSession: (classId, sessionData) => {
    return axiosInstance.post(
      `/sessions?classId=${encodeURIComponent(classId)}`,
      sessionData
    );
  },
  updateSession: (sessionId, sessionData) => {
    return axiosInstance.put(`/sessions/${sessionId}`, sessionData);
  },
  deleteSession: (sessionId) => {
    return axiosInstance.delete(`/sessions/${sessionId}`);
  },
};
