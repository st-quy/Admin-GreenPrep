import axiosInstance from "@shared/config/axios";


export const ParticipantApi = {
  getParticipant: (sessionId, participantId) => {
    return axiosInstance.get(``);
  },
  getParticipants: (sessionId) => {
    return axiosInstance.get(`/session-participants/${sessionId}`);
  },
};

export const GradeApi = {
  getGrade: (participantId, skill) => {
    return axiosInstance.get(
      `/grades/participants?sessionParticipantId=${participantId}&skillName=${skill}`
    );
  },
  // postGrade: (data) => {
  //   return axiosInstance.post(
  //     `/grades/teacher-grade`,
  //     data
  //   );
  // },
};
