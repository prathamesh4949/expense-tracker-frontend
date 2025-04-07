import { useState } from "react";
import axios from "axios";
import "../styles/ExpenseForm.css"; // Custom styling

const AddExpense = () => {
    const [expense, setExpense] = useState({ amount: "", category: "", date: "" });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            await axios.post("http://localhost:5000/api/expenses", expense, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Expense added successfully!");
            setExpense({ amount: "", category: "", date: "" }); // Reset form
        } catch (error) {
            console.error("Error adding expense:", error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="expense-form-container">
            <h2>Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <input type="number" name="amount" placeholder="Amount" value={expense.amount} onChange={handleChange} required />
                
                {/* Category Dropdown */}
                <select name="category" value={expense.category} onChange={handleChange} required>
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Other">Other</option>
                </select>
                
                <input type="date" name="date" value={expense.date} onChange={handleChange} required />
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
