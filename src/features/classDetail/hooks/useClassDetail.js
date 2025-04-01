import { useQuery } from "@tanstack/react-query";
import { ClassDetailApi } from "../classAPI";

export const useClassDetailQuery = (classID) => {
  return useQuery({
    queryKey: ["classDetail", classID],
    enabled: !!classID,
    queryFn: async () => {
      const response = await ClassDetailApi.getClassById(classID);
      return response.data.data; // Extract only the nested "data" field
    },
  });
};
