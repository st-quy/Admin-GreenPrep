import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { GradeApi, ParticipantApi } from "../api";
import { message } from "antd";

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

export const useGetParticipants = (sessionId) => {
  return useQuery(
    {
      queryKey: ["participants"],
      queryFn: async () => await ParticipantApi.getParticipants(sessionId),
    }
  );
}

export const useGetWritingQuestionsAnswers = (participantId) => {
  return useQuery(
    {
      queryKey: ["writing"],
      queryFn: async () => await GradeApi.getGrade(participantId, "writing"),
    }
  );
}

export const useGetSpeakingQuestionsAnswers = (participantId) => {
  return useQuery(
    {
      queryKey: ["speaking"],
      queryFn: async () => await GradeApi.getGrade(participantId, "speaking"),
    }
  );
}

export const usePostGrade = () => {
  return useMutation({
    mutationFn: async (params) => {
      const { data } = await GradeApi.postGrade(params);
      return data.data;
    },
    onError({ response }) {
      message.error(response?.data?.message || "Post grade error");
    },
  });
}




