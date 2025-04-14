import axiosInstance from "@shared/config/axios";

export const fetchSessionParticipants = async (
  sessionId,
  { page = 1, limit = 10 } = {}
) => {
  try {
    const response = await axiosInstance.get(
      `/session-participants/${sessionId}`,
      {
        params: { page, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching session participants:", error);
    throw error;
  }
};

export const fetchStudentParticipants = async (
  studentId,
  { page = 1, limit = 10 } = {}
) => {
  const response = await axiosInstance.get(
    `/session-participants/user/${studentId}`,
    {
      params: { page, limit },
    }
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
