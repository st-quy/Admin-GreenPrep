// @ts-nocheck
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const API_URL = 'https://dev-api-greenprep.onrender.com/api';

// Query keys for React Query
export const QUERY_KEYS = {
  USER_PROFILE: 'userProfile',
};

export const getAccessToken = () => {
  try {
    const token = localStorage.getItem('accessToken');
    return token ? token : null;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getUserFromToken = async () => {
  try {
    const token = getAccessToken();
    if (!token) return null;

    const decodedToken = jwtDecode(token);
    
    // Fetch complete user data using the user ID from token
    try {
      const userData = await getDataFromApi(decodedToken.userId);
      return userData;
    } catch (error) {
      console.error('Error fetching complete user data:', error);
      return null;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// Hàm helper để tạo config với token
const getAuthConfig = () => {
  const token = getAccessToken();
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Lấy thông tin user từ API
export const getDataFromApi = async (userId) => {
  try {
    const config = getAuthConfig();
    const response = await axios.get(`${API_URL}/users/${userId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

// Cập nhật thông tin user
export const updateDataFromApi = async (userId, userData) => {
  try {
    const config = getAuthConfig();
    const response = await axios.put(`${API_URL}/users/${userId}`, userData, config);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

// Cập nhật mật khẩu
export const changePasswordFromApi = async (userId, { oldPassword, newPassword }) => {
  try {
    const config = getAuthConfig();
    const response = await axios.post(
      `${API_URL}/users/${userId}/change-password`,
      {
        oldPassword,
        newPassword
      },
      config
    );
    return response.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};