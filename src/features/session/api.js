// src/config.js

export const API_BASE_URL = "https://dev-api-greenprep.onrender.com";

export const SESSION_ID = "26fc28e3-a9d8-45f5-ac7b-88086075e82e";

export const API_ENDPOINTS = {
  SESSION_REQUESTS: (sessionId) => `/api/session-requests/${sessionId}`,
  APPROVE_REQUEST: (sessionId) => `/api/session-requests/${sessionId}/approve`,
  REJECT_REQUEST: (sessionId) => `/api/session-requests/${sessionId}/reject`,
};
