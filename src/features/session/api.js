export const SESSION_ID = "48ad7513-61ee-4069-a886-e16d39573cd1";

export const API_ENDPOINTS = {
  SESSION_REQUESTS: (sessionId) => `/session-requests/${sessionId}`,
  APPROVE_REQUEST: (sessionId) => `/session-requests/${sessionId}/approve`,
  REJECT_REQUEST: (sessionId) => `/session-requests/${sessionId}/reject`,
};
