import axios from "axios";

const API_URL = "http://localhost:5000/api/venues";

export const getVenues = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    return [];
  }
};

export const createVenue = async (venueData) => {
  try {
    const response = await axios.post(API_URL, venueData);
    return response.data;
  } catch (error) {
    console.error("Error creating venue:", error);
  }
};

export const updateVenue = async (venueId, venueData) => {
  try {
    const response = await axios.put(`${API_URL}/${venueId}`, venueData);
    return response.data;
  } catch (error) {
    console.error("Error updating venue:", error);
  }
};

export const deleteVenue = async (venueId) => {
  try {
    await axios.delete(`${API_URL}/${venueId}`);
  } catch (error) {
    console.error("Error deleting venue:", error);
  }
};

// ✅ Fix bookVenue API Request: Now uses venue_id in URL
export const bookVenue = async (venueId, eventId) => {
  try {
    const response = await axios.post(`${API_URL}/${venueId}/book`, { event_id: eventId });
    return response.data;
  } catch (error) {
    console.error("Error booking venue:", error);
  }
};
