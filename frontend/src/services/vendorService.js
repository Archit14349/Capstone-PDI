import axios from "axios";

const API_URL = "http://localhost:5000/api/vendors"; // Use 8080 if calling Spring Boot

export const getVendors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return [];
  }
};
