import api from '../lib/axios';

// REGISTER (không login ngay)
export const signup = async (signupData) => {
  const payload = {
    username: signupData.fullName,
    email: signupData.email,
    password: signupData.password,
  };
  const { data } = await api.post('/auth/register', payload);
  return data;
};

// LOGIN (nhận token, lưu & gắn vào axios)
export const login = async (loginData) => {
  const { data } = await api.post('/auth/login', loginData);
  const token = data?.token;
  if (token) {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return data;
};

// LOGOUT (BE optional), luôn dọn client token
export const logout = async () => {
  try { await api.post('/auth/logout'); } catch {}
  localStorage.removeItem('token');
  delete api.defaults.headers.common['Authorization'];
  return { message: 'Logged out' };
};

// ME (trả null khi 401/403 để UI không treo)
export const getAuthUser = async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data ?? null;
  } catch (error) {
    if (error?.response && [401, 403].includes(error.response.status)) return null;
    throw error;
  }
};

// ONBOARDING 
export const completeOnboarding = async (userData) => {
  const { data } = await api.post('/auth/onboarding', userData);
  return data;
};

// VERIFY OTP 
export const verifyOtp = async ({ email, otpCode }) => {
  const { data } = await api.post('/auth/verify-otp', { email, otpCode });
  return data;
};

// Friends APIs
export async function getUserFriends() {
  const { data } = await api.get('/users/friends');
  return data;
}
export async function getRecommendedUsers() {
  const { data } = await api.get('/users');
  return data;
}
export async function getOutgoingFriendReqs() {
  const { data } = await api.get('/users/outgoing-friend-requests');
  return data;
}
export async function sendFriendRequest(userId) {
  const { data } = await api.post(`/users/friend-request/${userId}`);
  return data;
}

// Mock (giữ nguyên nếu bạn chưa làm BE)
export const getFriendRequests = async () => ({
  incomingReqs: [
    { _id: '1', sender: { profilePic: 'https://placekitten.com/80/80', fullName: 'John Doe', nativeLanguage: 'English', learningLanguage: 'Vietnamese' } },
  ],
  acceptedReqs: [],
});
export const acceptFriendRequest = async (_id) => ({ success: true });

// Stream token mock
export const getStreamToken = async () => {
  await new Promise(r => setTimeout(r, 500));
  return { token: 'mock-token-1234567890', expiresAt: new Date(Date.now() + 3600_000).toISOString() };
};
