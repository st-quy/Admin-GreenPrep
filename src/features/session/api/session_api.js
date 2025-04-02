import axiosInstance from "../../../shared/config/axios";

export const fetchSessionParticipants = async (sessionId) => {
  const response = await axiosInstance.get(`/session-participants/${sessionId}`);
  return response.data;
};

export const fetchStudentParticipants = async (studentId) => {
  const response = await axiosInstance.get(`/session-participants/user/${studentId}`);
  return response.data;
};
