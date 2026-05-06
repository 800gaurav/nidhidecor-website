import React, { useEffect, useState } from "react";
import useAxios from "../../utils/useAxios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { formatCurrency } from "../../utils/index.js";
import { defaultStylesSidebar } from "../../constants/colors.js";
import { FiDownload } from "react-icons/fi";
import { downloadTablePdf } from "../../utils/tablePdf.js";

const App = () => {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const fetchHistory = async () => {
    setloading(true);
    try {
      const res = await fetchData({
        url: `/api/v1/user/income/history`,
      });

      const histories = Array.isArray(res.data) ? res.data : res.data?.incomes || [];
      const incomeOnly = histories.filter((item) => item.type === "income");

      setData(incomeOnly);
      setFilteredData(incomeOnly);
      setloading(false);
    } catch (err) {
      console.error(err);
      setloading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...data];

    // Filter by FROM DATE
    if (filters.fromDate) {
      filtered = filtered.filter(
        (item) => new Date(item.createdAt) >= new Date(filters.fromDate)
      );
    }

    // Filter by TO DATE
    if (filters.toDate) {
      filtered = filtered.filter(
        (item) => new Date(item.createdAt) <= new Date(filters.toDate)
      );
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, data]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const getTotalAmount = () => {
    return filteredData.reduce((total, item) => total + item.amount, 0);
  };

  const statementPdfColumns = [
    {
      key: "createdAt",
      title: "Date",
      exportValue: (createdAt) => {
        if (!createdAt) return "N/A";

        return new Date(createdAt).toLocaleString("en-IN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
      },
    },
    {
      key: "paymenttype",
      title: "Description",
      exportValue: (paymenttype) => paymenttype || "No Description",
    },
    {
      key: "amount",
      title: "Amount",
      exportValue: (amount, row) =>
        `${row.type === "income" ? "+" : "-"} ${formatCurrency(amount)}`,
    },
  ];

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: "Commission History",
      filename: `commission-history-${new Date().toISOString().slice(0, 10)}.pdf`,
      columns: statementPdfColumns,
      rows: filteredData,
    });
  };

  return (
    <div className="p-3 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4"
      >
        <h1 className="text-xl md:text-3xl font-bold text-gray-800">
          Commission  History
        </h1>
       
      </motion.div>

      {/* FILTERS */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-3 md:p-6 mb-4 md:mb-6 rounded-lg md:rounded-2xl shadow border border-gray-100"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-base md:text-lg text-gray-800">
            Filters
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-2 px-4 py-2 !text-white rounded-lg text-sm"
              style={{ background: defaultStylesSidebar.cardbg }}
            >
              <FiDownload size={16} />
              Download PDF
            </button>

            <button
              onClick={() =>
                setFilters({
                  fromDate: "",
                  toDate: "",
                })
              }
              className="px-4 py-2 !text-white rounded-lg text-sm"
              style={{background: defaultStylesSidebar.cardbg}}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          <div>
            <label className="text-xs md:text-sm font-semibold text-gray-700">
              From Date
            </label>
            <input
              type="date"
              value={filters.fromDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, fromDate: e.target.value }))
              }
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50"
            />
          </div>

          <div>
            <label className="text-xs md:text-sm font-semibold text-gray-700">
              To Date
            </label>
            <input
              type="date"
              value={filters.toDate}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, toDate: e.target.value }))
              }
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50"
            />
          </div>

        </div>
      </motion.div>

      {/* TABLE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow overflow-hidden "
      >
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{background: defaultStylesSidebar.cardbg}}>
              <tr>
                <th className="text-left py-3 px-4 text-white">Date</th>
                <th className="text-left py-3 px-4 text-white">Description</th>
                <th className="text-left py-3 px-4 text-white">Amount</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr
                    key={index}
                    className=" hover:bg-blue-50 text-sm"
                  >
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">
                          {new Date(item.createdAt).toLocaleDateString("en-IN")}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(item.createdAt).toLocaleTimeString("en-IN")}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      {item.paymenttype || "No Description"}
                    </td>

                    <td className="py-3 px-4 text-green-600 font-bold">
                      + {formatCurrency(item.amount)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-500">
                    No income found in selected date range
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </motion.div>

      {/* TOTAL INCOME */}
      {filteredData.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg p-4 text-white shadow"
          style={{background: defaultStylesSidebar.cardbg}}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Total</h3>
            <p className="text-2xl font-bold text-green-300">
              {formatCurrency(getTotalAmount())}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default App;
