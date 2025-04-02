// src/config.js

export const API_BASE_URL = "https://dev-api-greenprep.onrender.com";

export const SESSION_ID = "48ad7513-61ee-4069-a886-e16d39573cd1";

export const API_ENDPOINTS = {
  SESSION_REQUESTS: (sessionId) => `/api/session-requests/${sessionId}`,
  APPROVE_REQUEST: (sessionId) => `/api/session-requests/${sessionId}/approve`,
  REJECT_REQUEST: (sessionId) => `/api/session-requests/${sessionId}/reject`,
};
