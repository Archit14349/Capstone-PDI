import axios from "axios";

const API_URL = "http://localhost:5000/api/budgets"; // Use 8080 if calling Spring Boot

export const getBudgets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
};
