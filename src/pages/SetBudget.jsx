import React, { useState } from "react";
import axios from "axios";

const SetBudget = () => {
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const [message, setMessage] = useState("");

  const handleSetBudget = async () => {
    if (!category || !limit || limit <= 0) {
      setMessage("⚠️ Please select a category and enter a valid budget limit.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Get token
      if (!token) {
        console.error("No token found");
        setMessage("❌ Authentication error. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/budget/set",
        { category, limit },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected token syntax
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(`✅ Budget set successfully for ${category}!`);
      setCategory("");
      setLimit("");
    } catch (error) {
      setMessage("❌ Failed to set budget. Try again later.");
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h3>Set Monthly Budget</h3>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Travel">Travel</option>
        <option value="Shopping">Shopping</option>
        <option value="Bills">Bills</option>
      </select>

      <input
        type="number"
        placeholder="Enter budget limit"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />

      <button
        onClick={handleSetBudget}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Set Budget
      </button>

      {message && (
        <p
          style={{
            marginTop: "10px",
            fontSize: "14px",
            color: message.includes("❌") ? "red" : "green",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default SetBudget;
