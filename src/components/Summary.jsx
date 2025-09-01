import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

function Summary() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/expenses`)
      .then((res) => res.json())
      .then(setExpenses);
    fetch(`${API_BASE_URL}/income`)
      .then((res) => res.json())
      .then(setIncomes);
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
  const totalSalary = incomes
    .filter((i) => i.category === "Salary")
    .reduce((sum, i) => sum + parseFloat(i.amount), 0);
  const totalExpense = expenses
    .filter((expense) => expense.category !== "Amma") // Exclude Amma category from expenses
    .reduce((sum, i) => sum + parseFloat(i.amount), 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="mb-4">
      <h5>Total Income: ₹{totalIncome}</h5>
      <h5>Total Salary: ₹{totalSalary}</h5>
      <h5>Total Expense: ₹{totalExpense}</h5>
      <h5 style={{ backgroundColor: "lightgreen" }}>Net Balance: ₹{balance}</h5>
    </div>
  );
}

export default Summary;
