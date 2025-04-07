import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // Ensure this matches your backend

const AuthService = {
  register: async (name, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { name, email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Registration failed";
    }
  },

  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Login failed";
    }
  },

  saveToken: (token) => {
    localStorage.setItem("token", token);
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default AuthService;
