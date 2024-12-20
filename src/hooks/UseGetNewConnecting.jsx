import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Instance from "../utils/Instance";
import axios from "axios";

// Yangi foydaluvchilarni olish
export const UseNewConnecting = async (param) => {
  return useQuery({
    queryKey: ["newconnectiongs"],
    queryFn: async () => {
      const { data } = await axios.get(
        "http://192.168.23.100:8080/api/v1/admin/doctors/not-declined-not-enabled",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ0hJRUYiLCJzdGF0dXMiOiJFTkFCTEVEIiwic3ViIjoiZjA4YmM4ZWEtNjA2Mi00MmY5LWE0YjktM2VlMDAyMWZlY2QzIiwiaWF0IjoxNzM0NzEyNzA4LCJleHAiOjE3MzQ3OTkxMDh9.DCnP4M8GO_brI-B3QxW0C-e7R6_DBQJS2lK89J3LSIo`, // Token yoki boshqa header
          },
        }
      );
      console.log(data);

      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 daqiqa
  });
};
