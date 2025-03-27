// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { RequestApi } from "../api"; // You'll need to create this
// import { message } from "antd";
// const useFetchAllRequest = () => {
//   return useQuery({
//     queryKey: ["requests"],
//     queryFn: async () => {
//       const { data } = await RequestApi.getAll();
//       return data.data;
//     },
//   });
// };

// const useUpdateRequest = () => {
//   return useMutation({
//     mutationFn: async (params) => {
//       const { data } = await RequestApi.update(params);
//       return data;
//     },
//     onError(response) {
//       message.error(response.message);
//     },
//   });
// };

// export { useFetchAllRequest, useUpdateRequest };
