import { dashboardApi } from "../api/api";

export const getAllClasses = async () => {
  try {
    const response = await dashboardApi.getAllClasses();
    return response.data;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
