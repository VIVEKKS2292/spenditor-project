import { useState } from "react";
import { API_BASE_URL } from "../constants";

function AddIncome() {
  const [formData, setFormData] = useState({
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Salary",
    otherCategory: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      amount: formData.amount,
      date: formData.date,
      category:
        formData.category === "Others"
          ? formData.otherCategory
          : formData.category,
    };

    fetch(`${API_BASE_URL}/income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setFormData({
        amount: "",
        date: new Date().toISOString().split("T")[0],
        category: "Salary",
        otherCategory: "",
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="row g-3">
        <div className="col-md-3">
          <input
            type="number"
            placeholder="Add Income"
            className="form-control"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Salary">Salary</option>
            <option value="Refund">Refund</option>
            <option value="Others">Others</option>
          </select>
        </div>
        {formData.category === "Others" && (
          <div className="col-md-2">
            <input
              type="text"
              className="form-control"
              placeholder="Specify category"
              name="otherCategory"
              value={formData.otherCategory}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="col-auto">
          <button className="btn btn-success">Add</button>
        </div>
      </div>
    </form>
  );
}

export default AddIncome;
