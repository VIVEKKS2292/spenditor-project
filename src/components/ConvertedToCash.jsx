import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

function ConvertedToCash() {
  const [convertedAmount, setConvertedAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState(0);

  useEffect(() => {
    // Fetch the converted to cash record from expenses/2
    fetch(`${API_BASE_URL}/expenses/2`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // If not found, return empty
        return { amount: "0" };
      })
      .then((data) => {
        setSavedAmount(parseFloat(data.amount) || 0);
        setConvertedAmount(data.amount || "0");
      })
      .catch(() => {
        setSavedAmount(0);
        setConvertedAmount("0");
      });
  }, []);

  const handleSave = () => {
    if (!convertedAmount || convertedAmount === "") {
      alert("Please enter an amount");
      return;
    }

    // Update the converted to cash amount in expenses/2
    fetch(`${API_BASE_URL}/expenses/2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: convertedAmount,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSavedAmount(parseFloat(convertedAmount));
          alert("Converted to cash amount saved successfully");
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error saving converted to cash amount");
      });
  };

  return (
    <div>
      <div className="mt-4">
        <h4>Converted to Cash</h4>
        <div className="row g-3">
          <div className="col-md-3">
            <input
              type="number"
              placeholder="Amount converted to cash"
              className="form-control"
              value={convertedAmount}
              onChange={(e) => setConvertedAmount(e.target.value)}
              step="0.01"
            />
          </div>
          <div className="col-auto">
            <button className="btn btn-info" onClick={handleSave}>
              Save
            </button>
          </div>
          <div className="col-auto">
            <span className="badge bg-success">
              Saved: ₹{savedAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConvertedToCash;
