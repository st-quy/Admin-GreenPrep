import axiosInstance from "@shared/config/axios";

export const sessionsData = [
  {
    sessionName: "Session 1",
    sessionKey: "ABC123",
    startTime: "2025-12-02T17:00:00.000+00:00",
    endTime: "2025-12-02T17:00:00.000+00:00",
    numberOfParticipants: 25,
    status: "Active",
  },
  {
    sessionName: "Session 2",
    sessionKey: "XYZ456",
    startTime: "2025-12-02T17:00:00.000+00:00",
    endTime: "2025-12-02T17:00:00.000+00:00",
    numberOfParticipants: 15,
    status: "Inactive",
  },
  {
    sessionName: "Session 3",
    sessionKey: "LMN789",
    startTime: "2025-12-02T17:00:00.000+00:00",
    endTime: "2025-12-02T17:00:00.000+00:00",
    numberOfParticipants: 20,
    status: "Active",
  },
  {
    sessionName: "Session 4",
    sessionKey: "LMN787",
    startTime: "2025-12-02T17:00:00.000+00:00",
    endTime: "2025-12-02T17:00:00.000+00:00",
    numberOfParticipants: 20,
    status: "Active",
  },
];

export const classData = {
  className: "class01",
  status: "open",
};

export const ClassDetailApi = {
  getClassById: (classId) => {
    return axiosInstance.get(`/classes/${classId}`);
  },
  createSession: (sessionData) => {
    return axiosInstance.post(`/sessions`, sessionData);
  },
  updateSession: (sessionId, sessionData) => {
    return axiosInstance.put(`/sessions/${sessionId}`, sessionData);
  },
  deleteSession: (sessionId) => {
    return axiosInstance.delete(`/sessions/${sessionId}`);
  },
};
