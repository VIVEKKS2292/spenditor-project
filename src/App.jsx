import { useEffect, useState } from "react";
import Summary from "./components/Summary";
import AddIncome from "./components/AddIncome";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";

function App() {
  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL records?")) {
      Promise.all([
        fetch("https://spenditor-json-server.onrender.com/expenses")
          .then((res) => res.json())
          .then((data) =>
            Promise.all(
              data.map((item) =>
                fetch(
                  `https://spenditor-json-server.onrender.com/expenses/${item.id}`,
                  { method: "DELETE" }
                )
              )
            )
          ),
        fetch("https://spenditor-json-server.onrender.com/income")
          .then((res) => res.json())
          .then((data) =>
            Promise.all(
              data.map((item) =>
                fetch(
                  `https://spenditor-json-server.onrender.com/income/${item.id}`,
                  { method: "DELETE" }
                )
              )
            )
          ),
      ]).then(() => window.location.reload());
    }
  };
  return (
    <>
      <div className="container">
        <h2 className="text-center my-4">Expense Tracker</h2>
        <Summary />
        <AddIncome />
        <AddExpense />
        <ExpenseList />
      </div>
      <div className="text-center my-4">
        <button className="btn btn-danger" onClick={clearAllData}>
          Delete All Records
        </button>
      </div>
    </>
  );
}

export default App;
