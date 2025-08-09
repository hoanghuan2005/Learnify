import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getAuthUser } from '../lib/api';

// const useAuthUser = () => {
//   const authUser = useQuery({
//     queryKey: ["authUser"],
//     queryFn: getAuthUser,
//     retry: false, // không tự động retry nếu bị lỗi
//   });

//   return { isLoading: authUser.isLoading, error: authUser.error, authUser: authUser.data?.user };
// }

// export default useAuthUser

const useAuthUser = () => {
  return {
    isLoading: false,
    error: null,
    authUser: {
      fullName: "Nguyễn Văn Test",
      profilePic: null,
    }
  };
};
export default useAuthUser;