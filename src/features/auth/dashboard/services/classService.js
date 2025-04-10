import axios from "axios";
import { fetchSessions } from "./sessionService";

export const getAllClasses = async () => {
  try {
    const response = await axios.get(
      "https://dev-api-greenprep.onrender.com/api/classes"
    );

    if (response.data.status === 200) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to fetch classes");
    }
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
