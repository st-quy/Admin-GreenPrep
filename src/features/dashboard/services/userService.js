import axios from "axios";

export const fetchTotalUsers = async () => {
  try {
    const response = await axios.get("/users/count");
    return response.data.count;
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0;
  }
};

export const fetchUserGrowth = async () => {
  try {
    const response = await axios.get("/users/growth");
    return response.data.map((item) => ({
      date: item.date,
      growth: item.growth,
    }));
  } catch (error) {
    console.error("Error fetching user growth:", error);
    return [];
  }
};
