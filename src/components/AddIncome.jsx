import { useState } from "react";
import { API_BASE_URL } from "../constants";

function AddIncome() {
  const [income, setIncome] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${API_BASE_URL}/income`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: income,
        date: new Date().toISOString().split("T")[0],
      }),
    }).then(() => setIncome(""));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="input-group">
        <input
          type="number"
          placeholder="Add Income"
          className="form-control"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          required
        />
        <button className="btn btn-success">Add</button>
      </div>
    </form>
  );
}

export default AddIncome;
