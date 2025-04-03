// @ts-nocheck
import axiosInstance from "@shared/config/axios";
import { jwtDecode } from "jwt-decode";

export const AUTH_QUERY_KEYS = {
  USER_LOGIN: "userLogin",
  USER_LOGOUT: "userLogout",
};

export const AuthApi = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post(
        "https://dev-api-greenprep.onrender.com/api/users/login",
        credentials
      );

      const { access_token, refresh_token } = response.data.data;

      const decodedToken = jwtDecode(access_token);

      const userResponse = await axiosInstance.get(
        `https://dev-api-greenprep.onrender.com/api/users/${decodedToken.userId}`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const userData = userResponse.data;

      if (!userData.roleIDs || !userData.roleIDs.includes("teacher")) {
        throw new Error("Unauthorized: Only teachers can access this platform");
      }

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      return {
        ...response.data,
        user: userData,
      };
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("No access token found");
      }

      const decodedToken = await import("jwt-decode").then((module) =>
        module.jwtDecode(token)
      );
      const userId = decodedToken.userId;

      const response = await axiosInstance.post(
        `https://dev-api-greenprep.onrender.com/api/users/logout/${userId}`
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return response.data;
    } catch (error) {
      console.error("Logout error:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw error;
    }
  },
};

export const ProfileApi = {
  getProfile: (id) => {
    return axiosInstance.get(`/users/${id}`);
  },
};
