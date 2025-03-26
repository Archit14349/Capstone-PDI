import axios from "axios";

const API_URL = "http://localhost:5000/api/budgets";

export const getBudgets = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return [];
  }
};

export const createBudget = async (budgetData) => {
  try {
    const response = await axios.post(API_URL, budgetData);
    return response.data;
  } catch (error) {
    console.error("Error creating budget:", error);
    throw error;
  }
};

export const updateBudget = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating budget:", error);
    throw error;
  }
};
