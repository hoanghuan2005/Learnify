import api from "./axios";

// Create a new meeting
export const createMeeting = async (meetingData) => {
  try {
    const { data } = await api.post("/api/meets", meetingData);
    return data;
  } catch (error) {
    console.error("Error creating meeting:", error);
    throw error;
  }
};

// Get meeting by ID
export const getMeeting = async (meetingId) => {
  try {
    const { data } = await api.get(`/api/meets/${meetingId}`);
    return data;
  } catch (error) {
    console.error("Error fetching meeting:", error);
    throw error;
  }
};

// Delete meeting
export const deleteMeeting = async (meetingId) => {
  try {
    await api.delete(`/api/meets/${meetingId}`);
    return true;
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw error;
  }
};

// Generate meeting URL (for Jitsi integration)
export const generateMeetingUrl = (meetingId) => {
  // This would typically generate a Jitsi Meet URL
  // For now, we'll use a placeholder
  return `https://meet.jit.si/learnify-${meetingId}`;
};
