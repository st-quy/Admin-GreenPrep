import axios from "axios";

const BASE_URL = "https://dev-api-greenprep.onrender.com/api";

// Hàm lấy danh sách lớp học
export const fetchClasses = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/classes`);
    if (response.status === 200) {
      return response.data.data.map((cls) => ({
        id: cls.ID,
        name: cls.className,
        createdAt: cls.createdAt,
        updatedAt: cls.updatedAt,
      }));
    }
    throw new Error("Failed to fetch classes");
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching classes");
  }
};

// Hàm lấy thông tin lớp học theo ID
export const getClassById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/classes`);
    if (response.status === 200) {
      const classItem = response.data.data.find((cls) => cls.ID === id);
      if (!classItem) {
        throw new Error("Class not found");
      }
      return {
        id: classItem.ID,
        name: classItem.className,
        createdAt: classItem.createdAt,
        updatedAt: classItem.updatedAt,
      };
    }
    throw new Error("Failed to fetch class by ID");
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching class by ID");
  }
};

// Hàm tạo lớp học mới
export const createClass = async (classData) => {
  try {
    const response = await axios.post(`${BASE_URL}/classes`, {
      className: classData.name,
    });
    if (response.status === 200) {
      return {
        id: response.data.data.ID,
        name: response.data.data.className,
        createdAt: response.data.data.createdAt,
        updatedAt: response.data.data.updatedAt,
      };
    }
    throw new Error("Failed to create class");
  } catch (error) {
    console.error(error);
    throw new Error("Error creating class");
  }
};

// Hàm cập nhật lớp học
export const updateClass = async (id, classData) => {
  try {
    const response = await axios.put(`${BASE_URL}/classes/${id}`, {
      className: classData.name,
    });
    if (response.status === 200) {
      return {
        id: response.data.data.ID,
        name: response.data.data.className,
        createdAt: response.data.data.createdAt,
        updatedAt: response.data.data.updatedAt,
      };
    }
    throw new Error("Failed to update class");
  } catch (error) {
    console.error(error);
    throw new Error("Error updating class");
  }
};

// Hàm xóa lớp học
export const deleteClass = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/classes/${id}`);
    if (response.status === 200) {
      return { success: true };
    }
    throw new Error("Failed to delete class");
  } catch (error) {
    console.error(error);
    throw new Error("Error deleting class");
  }
};

// Hàm lấy danh sách sessions theo classId
export const fetchSessionsByClassId = async (classId) => {
  try {
    const response = await axios.get(`${BASE_URL}/sessions?classId=${classId}`);
    if (response.status === 200) {
      return response.data.data;
    }
    throw new Error("Failed to fetch sessions");
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching sessions");
  }
};

