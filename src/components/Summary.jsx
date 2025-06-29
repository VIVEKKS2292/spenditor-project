import { useEffect, useState } from "react";

function Summary() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    fetch("https://spenditor-json-server.onrender.com/expenses")
      .then((res) => res.json())
      .then(setExpenses);
    fetch("https://spenditor-json-server.onrender.com/income")
      .then((res) => res.json())
      .then(setIncomes);
  }, []);

  const totalIncome = incomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
  const totalExpense = expenses.reduce(
    (sum, i) => sum + parseFloat(i.amount),
    0
  );
  const balance = totalIncome - totalExpense;

  return (
    <div className="mb-4">
      <h5>Total Income: ₹{totalIncome}</h5>
      <h5>Total Expense: ₹{totalExpense}</h5>
      <h5 style={{ backgroundColor: "lightgreen" }}>Net Balance: ₹{balance}</h5>
    </div>
  );
}

export default Summary;
