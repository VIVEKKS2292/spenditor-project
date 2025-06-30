import { useEffect, useState } from "react";
import Summary from "./components/Summary";
import AddIncome from "./components/AddIncome";
import AddExpense from "./components/AddExpense";
import ExpenseList from "./components/ExpenseList";
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
        fetch(`${API_BASE_URL}/expenses`)
          .then((res) => res.json())
          .then((data) =>
            Promise.all(
              data.map((item) =>
                fetch(`${API_BASE_URL}/expenses/${item.id}`, {
                  method: "DELETE",
                })
              )
            )
          ),
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
    )
  );
}

export default App;
