import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // ✅ Explicitly Import autoTable
import { useState, useEffect } from "react";
import axios from "axios";

const ExportPDF = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:5000/api/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("Expense Report", 20, 10);

    const tableColumn = ["Date", "Category", "Amount", "Description"];
    const tableRows = expenses.map((expense) => [
      expense.date,
      expense.category,
      `$${expense.amount}`,
      expense.description,
    ]);

    // ✅ Ensure autoTable is registered and used correctly
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      theme: "striped",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [22, 160, 133] },
    });

    doc.save("expenses.pdf");
  };

  return (
   
    <button
    onClick={generatePDF}
    className="!bg-green-600 hover:!bg-green-700 !text-white !font-semibold !py-3 !px-6 !rounded-lg !shadow-md !transition-all !duration-300 !border !border-green-800"
  >
    📥 <span>Download PDF</span>
  </button>
  

  

  );
};

export default ExportPDF;
