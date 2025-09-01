import { useEffect, useState } from "react";
import Summary from "./components/Summary";
import AddIncome from "./components/AddIncome";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
import IncomeList from "./components/IncomeList";
import AmmaBalance from "./components/AmmaBalance";
import { API_BASE_URL } from "./constants";

const SECRET_KEY = "vivek123securekey";

function App() {
  const [authKey, setAuthKey] = useState(localStorage.getItem("authKey"));

  useEffect(() => {
    if (!authKey) {
      const key = prompt("Enter access key:");
      if (key === SECRET_KEY) {
        localStorage.setItem("authKey", key);
        setAuthKey(key);
      } else {
        alert("Access denied");
        window.location.reload();
      }
    }
  }, [authKey]);

  const clearAllData = () => {
    if (window.confirm("Are you sure you want to delete ALL records?")) {
      Promise.all([
        // Reset Amma balance to 0 instead of deleting
        fetch(`${API_BASE_URL}/expenses/1`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: "0",
            category: "Amma",
            description: "Amma",
            id: "1",
          }),
        }),
        // Delete all other expenses except Amma (id: 1)
        fetch(`${API_BASE_URL}/expenses`)
          .then((res) => res.json())
          .then((data) =>
            Promise.all(
              data
                .filter((item) => item.id !== "1")
                .map((item) =>
                  fetch(`${API_BASE_URL}/expenses/${item.id}`, {
                    method: "DELETE",
                  })
                )
            )
          ),
        // Delete all income records
        fetch(`${API_BASE_URL}/income`)
          .then((res) => res.json())
          .then((data) =>
            Promise.all(
              data.map((item) =>
                fetch(`${API_BASE_URL}/income/${item.id}`, {
                  method: "DELETE",
                })
              )
            )
          ),
      ]).then(() => window.location.reload());
    }
  };
  return (
    authKey && (
      <>
        <div className="container">
          <h2 className="text-center my-4">Expense Tracker</h2>
          <Summary />
          <AmmaBalance />
          <AddIncome />
          <AddExpense />
          <ExpenseList />
          <IncomeList />
        </div>
        <div className="text-center my-4">
          <button className="btn btn-danger" onClick={clearAllData}>
            Delete All Records
          </button>
        </div>
      </>
    )
  );
}

export default App;
