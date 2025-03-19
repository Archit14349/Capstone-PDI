import React, { useEffect, useState } from "react";
import { getBudgets } from "../services/budgetService";

const BudgetPage = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    getBudgets().then(setBudgets);
  }, []);

  return (
    <div>
      <h1>Event Budgets</h1>
      <ul>
        {budgets.map(budget => (
          <li key={budget.id}>Event ID: {budget.eventId}, Budget: ${budget.totalBudget}</li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetPage;
