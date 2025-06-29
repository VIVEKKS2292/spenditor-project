import { useState } from "react";

function AddExpense() {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://spenditor-json-server.onrender.com/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    }).then(() =>
      setForm({
        amount: "",
        category: "",
        date: "",
        description: "",
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            type="number"
            placeholder="Amount"
            className="form-control"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Category"
            className="form-control"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Description"
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="col-md-12 text-center">
          <button className="btn btn-primary">Add Expense</button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
