import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "../styles/Auth.css"; // Import CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors

    // ✅ Prevent empty fields submission
    if (!email.trim() || !password.trim()) {
      setError("⚠️ Please enter both email and password.");
      return;
    }

    try {
      const res = await AuthService.login(email, password);
      
      // ✅ Ensure token is received before saving it
      if (res.token) {
        AuthService.saveToken(res.token);
        alert("✅ Login successful!");
        navigate("/add-expense"); // Redirect to Add Expense page
      } else {
        setError("❌ Login failed. No token received.");
      }
    } catch (errMsg) {
      console.error("Login Error:", errMsg); // ✅ Log error for debugging
      setError(errMsg);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
