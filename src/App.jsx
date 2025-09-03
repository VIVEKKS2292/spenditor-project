import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wallet, PiggyBank, Trash2, Calculator } from "lucide-react";
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
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="container mx-auto px-4 py-8 max-w-4xl"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-8 text-wallet-800 dark:text-wallet-100 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Wallet className="w-8 h-8 text-primary" />
            Expense Tracker
          </motion.h2>{" "}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <Calculator className="w-5 h-5 text-primary" />
              <Summary />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-2"
            >
              <PiggyBank className="w-5 h-5 text-primary" />
              <AmmaBalance />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AddIncome />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <AddExpense />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <ExpenseList />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <IncomeList />
            </motion.div>
          </div>
          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={clearAllData}
              className="px-6 py-2 bg-destructive text-destructive-foreground rounded-md hover:bg-destructive/90 transition-colors inline-flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete All Records
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  );
}

export default App;
