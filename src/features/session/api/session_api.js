import axiosInstance from "@shared/config/axios";

export const fetchSessionParticipants = async (sessionId) => {
  const response = await axiosInstance.get(
    `/session-participants/${sessionId}`
  );
  return response.data;
};

export const fetchStudentParticipants = async (studentId) => {
  const response = await axiosInstance.get(
    `/session-participants/user/${studentId}`
  );
  return response.data;
};
export const fetchSessionRequests = async (sessionId) => {
  if (!sessionId) return [];

  const response = await axiosInstance.get(`/session-requests/${sessionId}`);
  return response.data.data;
};

export const approveRequest = (sessionId, requestId) => {
  return axiosInstance.patch(`/session-requests/${sessionId}/approve`, {
    requestId,
  });
};

export const rejectRequest = (sessionId, requestId) => {
  return axiosInstance.patch(`/session-requests/${sessionId}/reject`, {
    requestId,
  });
};
