import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const bookEvent = async (bookingData) => {
  return await axios.post(API_URL, bookingData);
};
