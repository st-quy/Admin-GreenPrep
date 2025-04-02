import { useQuery } from "@tanstack/react-query";
import { fetchSessionParticipants, fetchStudentParticipants } from "../api/session_api";

export const useSessionParticipants = (sessionId) => {
  return useQuery({
    queryKey: ["sessionParticipants", sessionId],
    queryFn: () => fetchSessionParticipants(sessionId),
    enabled: !!sessionId,
  });
};

export const useStudentParticipants = (studentId) => {
  return useQuery({
    queryKey: ["studentParticipants", studentId],
    queryFn: () => fetchStudentParticipants(studentId),
    enabled: !!studentId,
  });
};
