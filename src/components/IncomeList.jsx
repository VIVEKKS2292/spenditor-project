import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

function IncomeList() {
  const [incomes, setIncomes] = useState([]);
  const [editMode, setEditMode] = useState(null);
  const [editForm, setEditForm] = useState({
    amount: "",
    date: "",
    category: "",
    otherCategory: "",
    description: "",
  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/income`)
      .then((res) => res.json())
      .then((data) => setIncomes(data));
  }, []);

  const deleteIncome = (id) => {
    if (window.confirm("Are you sure you want to delete this income?")) {
      fetch(`${API_BASE_URL}/income/${id}`, {
        method: "DELETE",
      }).then(() => {
        setIncomes(incomes.filter((i) => i.id !== id));
      });
    }
  };

  const startEdit = (income) => {
    setEditMode(income.id);
    setEditForm({
      amount: income.amount,
      date: income.date,
      category: ["Salary", "Refund"].includes(income.category)
        ? income.category
        : "Others",
      otherCategory: ["Salary", "Refund"].includes(income.category)
        ? ""
        : income.category,
      description: income.description || "",
    });
  };

  const handleUpdate = (id) => {
    const payload = {
      ...editForm,
      category:
        editForm.category === "Others"
          ? editForm.otherCategory
          : editForm.category,
    };
    delete payload.otherCategory;

    fetch(`${API_BASE_URL}/income/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(() => {
      setIncomes(
        incomes.map((income) =>
          income.id === id ? { ...income, ...payload } : income
        )
      );
      setEditMode(null);
    });
  };

  return (
    <div>
      <div className="mt-4">
        <h4>Income List</h4>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          {incomes && incomes.length > 0 ? (
            <tbody>
              {incomes.map((income) => (
                <tr key={income.id}>
                  {editMode === income.id ? (
                    <>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          value={editForm.date}
                          onChange={(e) =>
                            setEditForm({ ...editForm, date: e.target.value })
                          }
                        />
                      </td>
                      <td className="d-flex gap-2">
                        <select
                          className="form-select"
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                        >
                          <option value="Salary">Salary</option>
                          <option value="Refund">Refund</option>
                          <option value="Others">Others</option>
                        </select>
                        {editForm.category === "Others" && (
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Specify category"
                            value={editForm.otherCategory}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                otherCategory: e.target.value,
                              })
                            }
                          />
                        )}
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Description"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={editForm.amount}
                          onChange={(e) =>
                            setEditForm({ ...editForm, amount: e.target.value })
                          }
                        />
                      </td>
                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={() => handleUpdate(income.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditMode(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{income.date}</td>
                      <td>{income.category}</td>
                      <td>{income.description || "-"}</td>
                      <td>₹{income.amount}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => startEdit(income)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteIncome(income.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  No income records to show
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export default IncomeList;
