export interface AuthResponse {
  message: string;
  data?: any;
}

export interface ResetPasswordPayload {
  token: string;
  newPassword: string;
}

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
} 