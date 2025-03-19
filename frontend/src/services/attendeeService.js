import axios from "axios";

const API_URL = "http://localhost:5000/api/attendees"; 

export const getAttendees = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching attendees:", error);
    return [];
  }
};

export const createAttendee = async (attendeeData) => {
  try {
    const response = await axios.post(API_URL, attendeeData);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating attendee:", error.response?.data || error.message);
  }
};

export const registerForEvent = async (attendeeId, eventId) => {
  try {
    const response = await axios.put(`${API_URL}/${attendeeId}/register`, { event_id: eventId });
    return response.data;
  } catch (error) {
    console.error("❌ Error registering attendee:", error.response?.data || error.message);
  }
};

// ✅ Add deleteAttendee function here
export const deleteAttendee = async (attendeeId) => {
  try {
    await axios.delete(`${API_URL}/${attendeeId}`);
  } catch (error) {
    console.error("❌ Error deleting attendee:", error.response?.data || error.message);
  }
};

export const markAttendance = async (attendeeId) => {
  try {
    const response = await axios.put(`${API_URL}/${attendeeId}/attendance`);
    return response.data;
  } catch (error) {
    console.error("❌ Error marking attendance:", error.response?.data || error.message);
  }
};

export const sendReminder = async (attendeeId) => {
  try {
    const response = await axios.post(`${API_URL}/${attendeeId}/reminder`);
    return response.data;
  } catch (error) {
    console.error("❌ Error sending reminder:", error.response?.data || error.message);
  }
};

export const collectFeedback = async (attendeeId, feedback) => {
  try {
    const response = await axios.put(`${API_URL}/${attendeeId}/feedback`, { feedback });
    return response.data;
  } catch (error) {
    console.error("❌ Error collecting feedback:", error.response?.data || error.message);
  }
};
