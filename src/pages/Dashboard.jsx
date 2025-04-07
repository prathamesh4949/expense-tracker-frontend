import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { motion } from "framer-motion";
import ExportPDF from "../components/ExportPDF"; // Import PDF Export Component
import "./Dashboard.css";

const Dashboard = () => {
  const [warnings, setWarnings] = useState([]);
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const [budgetResponse, trendsResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/budget/check-budget", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/expenses/monthly-trends", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setWarnings(budgetResponse.data.warnings || []);

        const formattedData = trendsResponse.data.map((item) => ({
          month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
          total: item.totalAmount,
        }));
        setMonthlyExpenses(formattedData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">📊 Dashboard</h2>

      {/* Budget Warnings */}
      {warnings.length > 0 && (
        <motion.div
          className="bg-yellow-200 text-red-600 font-semibold p-4 rounded-lg shadow-md mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h4 className="text-lg font-bold">⚠️ Budget Warnings:</h4>
          {warnings.map((warning, index) => (
            <p key={index}>{warning}</p>
          ))}
        </motion.div>
      )}

      {/* 📥 PDF Export Button */}
      <div className="flex justify-end mb-4">
        <ExportPDF />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <motion.div
          className="p-4 bg-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold mb-2">📈 Monthly Expense Bar Chart</h3>
          {monthlyExpenses.length > 0 ? (
            <BarChart width={350} height={250} data={monthlyExpenses}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#4A90E2" />
            </BarChart>
          ) : (
            <p className="text-gray-500">📌 No data available.</p>
          )}
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          className="p-4 bg-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold mb-2">📊 Expense Distribution</h3>
          {monthlyExpenses.length > 0 ? (
            <PieChart width={350} height={250}>
              <Pie
                data={monthlyExpenses}
                dataKey="total"
                nameKey="month"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              />
              <Tooltip />
            </PieChart>
          ) : (
            <p className="text-gray-500">📌 No data available.</p>
          )}
        </motion.div>

        {/* Line Chart */}
        <motion.div
          className="p-4 bg-white rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-semibold mb-2">📉 Expense Trends Over Time</h3>
          {monthlyExpenses.length > 0 ? (
            <LineChart width={350} height={250} data={monthlyExpenses}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#FF6384" strokeWidth={2} />
            </LineChart>
          ) : (
            <p className="text-gray-500">📌 No data available.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
