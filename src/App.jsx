import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddExpense from "./pages/AddExpense";
import ExpenseList from "./pages/ExpenseList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";  // Import Dashboard
import SetBudget from "./pages/SetBudget";  // Import SetBudget

const PrivateRoute = ({ children }) => {
    return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/expenses" element={<PrivateRoute><ExpenseList /></PrivateRoute>} />
                <Route path="/add-expense" element={<PrivateRoute><AddExpense /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/set-budget" element={<PrivateRoute><SetBudget userId="USER_ID_HERE" /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
