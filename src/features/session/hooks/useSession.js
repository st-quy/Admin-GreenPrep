import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSessionParticipants,
  fetchSessionRequests,
  fetchStudentParticipants,
  approveRequest,
  rejectRequest,
} from "../api/session_api";
import { message } from "antd";

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
export const useSessionRequests = (sessionId) => {
  return useQuery({
    queryKey: ["sessionRequests", sessionId],
    queryFn: () => fetchSessionRequests(sessionId),
    refetchInterval: 10000,
    enabled: !!sessionId,
  });
};
// Hook approve request
export const useApproveRequest = (sessionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId) => approveRequest(sessionId, requestId),
    onSuccess: () => {
      message.success("Request has been approved!");
      queryClient.invalidateQueries({
        queryKey: ["sessionRequests", sessionId],
      });
      queryClient.invalidateQueries({ queryKey: ["sessionParticipants"] });
    },
    onError: (error) => {
      message.error("Error approving request: " + error.message);
    },
  });
};

// Hook reject request
export const useRejectRequest = (sessionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestId) => rejectRequest(sessionId, requestId),
    onSuccess: () => {
      message.success("Request has been rejected!");
      queryClient.invalidateQueries({
        queryKey: ["sessionRequests", sessionId],
      });
    },
    onError: (error) => {
      message.error("Error rejecting request: " + error.message);
    },
  });
};
export const useApproveSelectedRequest = (sessionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestIds) =>
      Promise.all(
        // @ts-ignore
        requestIds.map((requestId) => approveRequest(sessionId, requestId))
      ),
    onSuccess: () => {
      message.success("Selected Requests has been approved!");
      queryClient.invalidateQueries({
        queryKey: ["sessionRequests", sessionId],
      });
      queryClient.invalidateQueries({ queryKey: ["sessionParticipants"] });
    },
    onError: (error) => {
      message.error("Error approving request: " + error.message);
    },
  });
};

// Hook reject request
export const useRejectSelectedRequest = (sessionId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (requestIds) =>
      Promise.all(
        // @ts-ignore
        requestIds.map((requestId) => rejectRequest(sessionId, requestId))
      ),
    onSuccess: () => {
      message.success("Selected Requests has been rejected!");
      queryClient.invalidateQueries({
        queryKey: ["sessionRequests", sessionId],
      });
      queryClient.invalidateQueries({ queryKey: ["sessionParticipants"] });
    },
    onError: (error) => {
      message.error("Error rejecting request: " + error.message);
    },
  });
};
