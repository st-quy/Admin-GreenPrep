import axiosInstance from "@shared/config/axios";

export const SpeakingApi = {
  getSpeaking: (topicID) => {
    return axiosInstance.get(
      `/topics/${topicID}?skillName=SPEAKING`
    );
  },
};

export const WritingApi = {
  getWriting: (topicID) => {
    return axiosInstance.get(
      `/topics/${topicID}?skillName=WRITING`
    );
  },
};

export const ParticipantApi = {
  getParticipant: (sessionId, participantId) => {
    return axiosInstance.get(``);
  },
  getParticipants: (sessionId) => {
    return axiosInstance.get(`/session-participants/${sessionId}`);
  },
};

export const SessionApi = {
  getSessionDetail: (sessionId) => {
    return axiosInstance.get(`/sessions/${sessionId}`)
  }
}
