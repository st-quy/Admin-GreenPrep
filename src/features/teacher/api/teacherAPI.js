// File: src/features/account/accountAPI.js
import axiosInstance from "@shared/config/axios";

export const AccountApi = {
  createAccount: (accountData) => {
    return axiosInstance.post("/users/register", accountData);
  },
  updateAccount: (accountId, accountData) => {
    return axiosInstance.put(`/users/${accountId}`, accountData);
  },
};
