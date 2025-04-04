export const API_ENDPOINTS = {
  SESSION_REQUESTS: (sessionId) => `/session-requests/${sessionId}`,
  APPROVE_REQUEST: (sessionId) => `/session-requests/${sessionId}/approve`,
  REJECT_REQUEST: (sessionId) => `/session-requests/${sessionId}/reject`,
};
