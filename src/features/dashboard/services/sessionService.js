import { dashboardApi } from "../api/api";

export const fetchAllSessions = async () => {
  try {
    const response = await dashboardApi.getAllSessions();
    return response.data;
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const getSessionStatusStatistics = async () => {
  try {
    const response = await dashboardApi.getSessionStatistics();
    return response.data;
  } catch (error) {
    console.error("Error fetching session statistics:", error);
    throw error;
  }
};
