import axiosInstance from "@shared/config/axios";

export const fetchSessionParticipants = async (
  sessionId,
  { page = 1, limit = 10 } = {}
) => {
  console.log("Fetching session participants with:", {
    sessionId,
    page,
    limit,
  });
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
