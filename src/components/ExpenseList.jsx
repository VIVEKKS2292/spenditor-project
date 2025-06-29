import { useEffect, useState } from "react";

function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("https://spenditor-json-server.onrender.com/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));
  }, []);

  const deleteExpense = (id) => {
    fetch(`https://spenditor-json-server.onrender.com/expenses/${id}`, {
      method: "DELETE",
    }).then(() => {
      setExpenses(expenses.filter((e) => e.id !== id));
    });
  };

  return (
    <div>
      <div className="mt-4">
        <h4>Expense List</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          {expenses && expenses.length > 0 ? (
            <tbody>
              {expenses.map((e) => (
                <tr key={e.id}>
                  <td>{e.date}</td>
                  <td>{e.category}</td>
                  <td>{e.description}</td>
                  <td>₹{e.amount}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteExpense(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  No expenses to show
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default ExpenseList;
