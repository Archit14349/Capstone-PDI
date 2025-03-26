import axios from "axios";

const API_URL = "http://localhost:5000/api/vendors";

export const getVendors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
};

export const createVendor = async (vendorData) => {
  try {
    const response = await axios.post(API_URL, vendorData);
    return response.data;
  } catch (error) {
    console.error("Error creating vendor:", error);
    throw error;
  }
};

export const assignVendorToEvent = async (vendorId, eventId) => {
  try {
    const response = await axios.put(`${API_URL}/${vendorId}/assign`, { event_id: eventId });
    return response.data;
  } catch (error) {
    console.error("Error assigning vendor:", error);
    throw error;
  }
};

export const updatePerformance = async (vendorId, rating) => {
  try {
    const response = await axios.put(`${API_URL}/${vendorId}/performance`, { performance_rating: rating });
    return response.data;
  } catch (error) {
    console.error("Error updating performance:", error);
    throw error;
  }
};

export const deleteVendor = async (vendorId) => {
  try {
    const res = await axios.delete(`${API_URL}/${vendorId}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting vendor", error);
    throw error;
  }
};

// 🆕 for dropdown
export const getEvents = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/events");
    return res.data;
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
};
