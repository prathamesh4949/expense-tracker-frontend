import React, { useEffect, useState } from "react";
import axios from "axios";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/expenses", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(response => setExpenses(response.data))
    .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Your Expenses</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{new Date(expense.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
