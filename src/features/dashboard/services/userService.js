import { dashboardApi } from "../api/api";

export const fetchTotalUsers = async () => {
  try {
    const response = await dashboardApi.getTotalUsers();
    return response.data;
  } catch (error) {
    console.error("Error fetching total users:", error);
    throw error;
  }
};
