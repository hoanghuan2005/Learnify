// src/hooks/useAuthUser.ts
import { useQuery } from '@tanstack/react-query'
import api from '../lib/axios'
import axios from 'axios'

export default function useAuthUser() {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: async () => {
      try {
        const { data } = await api.get('/auth/me'
          
          //,  { withCredentials: true }
          )
        return data ?? null
      } catch (err) {
         if (axios.isAxiosError(err) && [401, 403].includes(err.response?.status ?? 0)) {
          return null
        }
        throw err
      }
    },
    retry: 0,
    refetchOnWindowFocus: false,
    staleTime: 60_000,
  })
}
