import axios from "axios";

const API_BASE_URL = "https://dev-api-greenprep.onrender.com/api";

export const fetchSessions = async (classId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/sessions?classId=${classId}`
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const fetchAllSessions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/sessions/all`);
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching all sessions:", error);
    return [];
  }
};

export const getSessionStatusStatistics = async () => {
  try {
    const sessions = await fetchAllSessions();

    // Count sessions by status
    const statusCounts = sessions.reduce((counts, session) => {
      const status = session.status || "Unknown";
      counts[status] = (counts[status] || 0) + 1;
      return counts;
    }, {});

    // Convert to format for charts
    const statusStats = Object.entries(statusCounts).map(([status, count]) => ({
      type: status,
      value: count,
    }));

    return statusStats;
  } catch (error) {
    console.error("Error getting session statistics:", error);
    return [];
  }
};
