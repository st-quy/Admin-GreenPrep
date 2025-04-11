import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ParticipantApi, SpeakingApi, WritingApi, SessionApi } from "../api";

export const useScoreMutation = (mutationFn) => {
  const querryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      querryClient.invalidateQueries();
    },
    onError: () => {
      console.log("Error!");
    },
  });
};

export const useGetSpeaking = (topicID) => {
  return useQuery({
    queryKey: ["speakingData"],
    queryFn: async () => await SpeakingApi.getSpeaking(topicID),
  });
}

export const useGetWriting = (topicID) => {
  return useQuery({
    queryKey: ["writingData"],
    queryFn: async () => await WritingApi.getWriting(topicID),
  });
}

export const useGetParticipants = (sessionId) => {
  return useQuery(
    {
      queryKey: ["participants"],
      queryFn: async () => await ParticipantApi.getParticipants(sessionId),
    }
  );
}

export const useGetSessionDetail = (sessionId) => {
  return useQuery(
    {
      queryKey: ["session"],
      queryFn: async () => await SessionApi.getSessionDetail(sessionId),
    }
  );
}



