import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

function AmmaBalance() {
  const [ammaBalance, setAmmaBalance] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [newAmount, setNewAmount] = useState("");

  useEffect(() => {
    fetchAmmaBalance();
  }, []);

  const fetchAmmaBalance = () => {
    fetch(`${API_BASE_URL}/expenses/1`)
      .then((res) => res.json())
      .then((data) => {
        setAmmaBalance(data);
        setNewAmount(data.amount || "");
      });
  };

  const handleModify = () => {
    fetch(`${API_BASE_URL}/expenses/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...ammaBalance,
        amount: newAmount,
        category: "Amma",
        description: "Amma",
      }),
    }).then(() => {
      fetchAmmaBalance();
      setIsEditing(false);
    });
  };

  const handleAdd = () => {
    const currentAmount = parseFloat(ammaBalance.amount || 0);
    const addAmount = parseFloat(newAmount);

    fetch(`${API_BASE_URL}/expenses/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...ammaBalance,
        amount: (currentAmount + addAmount).toString(),
        category: "Amma",
        description: "Amma",
      }),
    }).then(() => {
      fetchAmmaBalance();
      setIsEditing(false);
      setNewAmount("");
    });
  };

  if (!ammaBalance) return null;

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h4 className="card-title">Amma Balance</h4>
        <div className="d-flex align-items-center gap-3">
          <h3 className="mb-0">₹{ammaBalance.amount || 0}</h3>
          {isEditing ? (
            <>
              <input
                type="number"
                className="form-control w-auto"
                value={newAmount}
                onChange={(e) => setNewAmount(e.target.value)}
                placeholder="Enter amount"
              />
              <button className="btn btn-success btn-sm" onClick={handleModify}>
                Save Modification
              </button>
              <button className="btn btn-success btn-sm" onClick={handleAdd}>
                Add to Balance
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setIsEditing(true)}
            >
              Modify
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AmmaBalance;
