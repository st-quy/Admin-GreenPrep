import axios from "axios";
import { fetchSessions } from "./sessionService";

export const fetchClassesWithSessionCount = async () => {
  try {
    // Fetch all classes
    const response = await axios.get(
      "https://dev-api-greenprep.onrender.com/api/classes"
    );
    const classes = response.data.data;

    // Fetch all session counts in parallel
    const sessionCounts = await Promise.all(
      classes.map((cls) => fetchSessions(cls.ID))
    );

    // Combine classes with their session counts
    const classesWithSessionCount = classes.map((cls, index) => ({
      ...cls,
      sessionCount: sessionCounts[index].length,
    }));

    return classesWithSessionCount;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
