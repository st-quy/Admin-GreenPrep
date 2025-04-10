import { useQueryClient, useMutation } from "@tanstack/react-query";

const useScoreMutation = (mutationFn) => {
  const querryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      querryClient.invalidateQueries("participant");
    },
    onError: () => {
      console.log("Error!");
    },
  });
};

export default useScoreMutation;
