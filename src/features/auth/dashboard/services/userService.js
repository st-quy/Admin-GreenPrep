import axios from "axios";

export const fetchTotalUsers = async () => {
  try {
    const response = await axios.get(
      "https://dev-api-greenprep.onrender.com/api/users"
    );
    const users = response.data.data || [];
    return users.length;
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0;
  }
};
