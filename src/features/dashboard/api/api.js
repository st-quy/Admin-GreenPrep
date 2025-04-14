import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const dashboardApi = {
  // User related endpoints
  getTotalUsers: () => axios.get(`${API_URL}/users/count`),

  // Class related endpoints
  getAllClasses: () => axios.get(`${API_URL}/classes`),

  // Session related endpoints
  getAllSessions: () => axios.get(`${API_URL}/sessions`),
  getSessionStatistics: () => axios.get(`${API_URL}/sessions/statistics`),
};
