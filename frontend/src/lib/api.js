import { axiosInstance } from "./axios";

export const signup = async (signupData) => {
  const payload = {
    username: signupData.fullName,
    email: signupData.email,
    password: signupData.password,
  };
  const response = await axiosInstance.post("/auth/register", payload);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};

export const verifyOtp = async ({ otpCode }) => {
  const res = await axiosInstance.post("/auth/verify-otp", { otpCode });
  return res.data;
};

export async function getUserFriends() {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export async function getRecommendedUsers() {
  const response = await axiosInstance.get("/users");
  return response.data;
}

export async function getOutgoingFriendReqs() {
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export async function sendFriendRequest(userId) {
  const response = await axiosInstance.post(`/users/friend-request/${userId}`);
  return response.data;
}

// export async function getFriendRequests() {
//   const response = await axiosInstance.get("/users/friend-requests");
//   return response.data;
// }

// export async function acceptFriendRequest(requestId) {
//   const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
//   return response.data;
// }

export const getFriendRequests = async () => {
  // Fake data cho test frontend
  return {
    incomingReqs: [
      {
        _id: "1",
        sender: {
          profilePic: "https://placekitten.com/80/80",
          fullName: "John Doe",
          nativeLanguage: "English",
          learningLanguage: "Vietnamese",
        },
      },
    ],
    acceptedReqs: [],
  };
};

export const acceptFriendRequest = async (id) => {
  return { success: true };
};

// export async function getStreamToken() {
//   const response = await axiosInstance.get("/chat/token");
//   return response.data;
// }

export const getStreamToken = async () => {
  // Mock delay để giống như đang gọi API
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Trả về dữ liệu giả
  return {
    token: "mock-token-1234567890",
    expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // Hết hạn sau 1h
  };
};
