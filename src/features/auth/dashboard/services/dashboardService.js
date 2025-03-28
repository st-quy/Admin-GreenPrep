import axios from "axios";

export const dashboardService = {
  getOverviewStats: () => {
    return axios.get("/api/dashboard/stats");
  },

  getSkillsPerformance: (studentId) => {
    return axios.get(`/api/dashboard/skills/${studentId}`);
  },

  getProgressData: (studentId, dateRange) => {
    return axios.get(`/api/dashboard/progress`, {
      params: { studentId, startDate: dateRange[0], endDate: dateRange[1] },
    });
  },

  getRecentActivities: () => {
    return axios.get("/api/dashboard/activities");
  },

  getTopicPerformance: () => {
    return axios.get("/api/dashboard/topics");
  },
};
