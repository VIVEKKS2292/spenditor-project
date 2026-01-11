import { useState } from "react";
import { API_BASE_URL } from "../constants";

function AddExpense() {
  const [form, setForm] = useState({
    amount: "",
    category: "Lunch",
    otherCategory: "",
    date: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      category: form.category === "Others" ? form.otherCategory : form.category,
    };
    delete payload.otherCategory;

    fetch(`${API_BASE_URL}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() =>
      setForm({
        amount: "",
        category: "Lunch",
        otherCategory: "",
        date: "",
        description: "",
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-2">
          <input
            type="number"
            placeholder="Amount"
            className="form-control"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <select
            className="form-select"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          >
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Amma">Amma</option>
            <option value="Celebration">Celebration</option>
            <option value="Just Chumma">Just Chumma</option>
            <option value="Weekly Expenses">Weekly Expenses</option>
            <option value="Monthly Expenses">Monthly Expenses</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {form.category === "Others" && (
          <div className="col-md-2">
            <input
              type="text"
              placeholder="Specify category"
              className="form-control"
              value={form.otherCategory}
              onChange={(e) =>
                setForm({ ...form, otherCategory: e.target.value })
              }
              required
            />
          </div>
        )}
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            placeholder="Description"
            className="form-control"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary">Add Expense</button>
        </div>
      </form>
    </div>
  );
}

export default AddExpense;
