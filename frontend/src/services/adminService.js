import axios from "axios";

const API_URL = "http://localhost:5000/api/admin";

export const getDashboardStats = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};
