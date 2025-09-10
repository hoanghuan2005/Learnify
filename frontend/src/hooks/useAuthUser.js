// src/hooks/useAuthUser.ts
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import axios from "axios";

export default function useAuthUser() {
  const query = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        console.log("Making API call to /auth/me");
        const token = localStorage.getItem("token");
        console.log("Token from localStorage:", token ? "exists" : "missing");

        const { data } = await api.get("/auth/me");
        console.log("API response data:", data);
        return data ?? null;
      } catch (err) {
        console.error("API call failed:", err);
        console.error("Error response:", err.response?.data);
        console.error("Error status:", err.response?.status);

        if (
          axios.isAxiosError(err) &&
          [401, 403].includes(err.response?.status ?? 0)
        ) {
          console.log("Authentication failed, returning null");
          return null;
        }
        throw err;
      }
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  });

  console.log("useAuthUser query result:", query);
  return query;
}
