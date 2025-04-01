import axios from "axios";

export const fetchClassesWithSessionCount = async () => {
  try {
    const response = await axios.get(
      "https://dev-api-greenprep.onrender.com/api/classes"
    );
    const classes = response.data.data;

    // Fetch session count for each class
    const classesWithSessionCount = await Promise.all(
      classes.map(async (cls) => {
        const sessionResponse = await axios.get(
          `https://dev-api-greenprep.onrender.com/api/sessions?classId=${cls.ID}`
        );
        // Access the data array from the response
        const sessions = sessionResponse.data.data || [];
        return {
          ...cls,
          sessionCount: sessions.length,
        };
      })
    );

    console.log("Classes with session count:", classesWithSessionCount);
    return classesWithSessionCount;
  } catch (error) {
    console.error("Error fetching classes:", error);
    throw error;
  }
};
