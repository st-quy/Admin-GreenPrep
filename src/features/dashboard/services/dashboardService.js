import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

console.log("API Base URL:", import.meta.env.VITE_BASE_URL);

export const fetchDashboardStats = async () => {
  try {
    console.log("Fetching dashboard stats...");
    const [teachers, classes, sessions, answers, requests] = await Promise.all([
      api.get("/users/teachers"),
      api.get("/classes"),
      api.get("/sessions/all"),
      api.get("/student-answers"),
      api.get("/session-requests"),
    ]);

    console.log("API responses:", {
      teachers: teachers.data,
      classes: classes.data,
      sessions: sessions.data,
      answers: answers.data,
      requests: requests.data,
    });

    return {
      teacherCount: teachers.data.length,
      studentCount: 0, // Will be implemented
      activeClasses: classes.data.filter((c) => c.status === "active").length,
      ongoingSessions: sessions.data.filter((s) => s.status === "ongoing")
        .length,
      upcomingSessions: sessions.data.filter((s) => s.status === "upcoming")
        .length,
      completedSessions: sessions.data.filter((s) => s.status === "completed")
        .length,
      totalSubmissions: answers.data.length,
      pendingRequests: requests.data.filter((r) => r.status === "pending")
        .length,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return {
      teacherCount: 0,
      studentCount: 0,
      activeClasses: 0,
      ongoingSessions: 0,
      upcomingSessions: 0,
      completedSessions: 0,
      totalSubmissions: 0,
      pendingRequests: 0,
    };
  }
};

export const fetchRecentActivities = async () => {
  try {
    const response = await api.get("/activities/recent");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent activities:", error);
    return [];
  }
};

export const fetchPendingRequests = async () => {
  try {
    const response = await api.get("/session-requests");
    return response.data.filter((request) => request.status === "pending");
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    return [];
  }
};

export const approveSessionRequest = async (requestId) => {
  try {
    await api.patch(`/session-requests/${requestId}/approve`);
    return true;
  } catch (error) {
    console.error("Error approving request:", error);
    return false;
  }
};

export const rejectSessionRequest = async (requestId) => {
  try {
    await api.patch(`/session-requests/${requestId}/reject`);
    return true;
  } catch (error) {
    console.error("Error rejecting request:", error);
    return false;
  }
};
