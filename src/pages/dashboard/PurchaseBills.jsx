import React, { useEffect, useMemo, useState } from "react";
import { FiDownload, FiRefreshCw, FiSearch } from "react-icons/fi";
import { defaultStylesSidebar } from "../../constants/colors";
import useAxios from "../../utils/useAxios";
import { formatCurrency } from "../../utils";
import { downloadTablePdf } from "../../utils/tablePdf";

const PurchaseBills = () => {
  const { fetchData } = useAxios();
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [summary, setSummary] = useState({});
  const [filters, setFilters] = useState({ from: "", to: "" });

  const fetchBills = async (nextFilters = filters) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (nextFilters.from) params.append("from", nextFilters.from);
      if (nextFilters.to) params.append("to", nextFilters.to);

      const res = await fetchData({
        url: `/api/v1/user/profile/purchase-bills?${params.toString()}`,
      });

      if (res.success) {
        setBills(res.data?.bills || []);
        setSummary(res.data || {});
      }
    } catch (error) {
      console.error("Purchase bill fetch failed", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const totals = useMemo(() => {
    return bills.reduce(
      (acc, bill) => {
        acc.amount += Number(bill.amount || 0);
        acc.direct += Number(bill.directIncomeAmount || 0);
        acc.binaryPool += Number(bill.binaryPoolAmount || 0);
        acc.binaryPaid += Number(bill.binaryPoolUsed || 0);
        return acc;
      },
      { amount: 0, direct: 0, binaryPool: 0, binaryPaid: 0 }
    );
  }, [bills]);

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "-";

  const handleReset = () => {
    const resetFilters = { from: "", to: "" };
    setFilters(resetFilters);
    fetchBills(resetFilters);
  };

  const handleDownloadPdf = () => {
    downloadTablePdf({
      title: "Purchase Bill History",
      filename: `purchase-bills-${new Date().toISOString().slice(0, 10)}.pdf`,
      columns: [
        { key: "billDate", title: "Date", exportValue: formatDate },
        { key: "billNumber", title: "Bill No.", exportValue: (value) => value || "-" },
        { key: "productName", title: "Product", exportValue: (value) => value || "-" },
        { key: "designName", title: "Design", exportValue: (value) => value || "-" },
        { key: "amount", title: "Amount", exportValue: formatCurrency },
        { key: "directIncomeAmount", title: "Direct 5%", exportValue: formatCurrency },
        { key: "binaryPoolAmount", title: "Team Pool 10%", exportValue: formatCurrency },
      ],
      rows: bills,
    });
  };

  const statCards = [
    // { label: "Wallet Balance", value: formatCurrency(Number(summary.walletBalance || 0)) },
    { label: "Total Purchase", value: formatCurrency(Number(summary.totalPurchaseAmount || totals.amount || 0)) },
    // { label: "Total Income", value: formatCurrency(Number(summary.totalIncome || 0)) },
    { label: "Today Income", value: formatCurrency(Number(summary.todayIncome || 0)) },
    // { label: "Left Carry", value: formatCurrency(Number(summary.binaryLeftCarryAmount || 0)) },
    // { label: "Right Carry", value: formatCurrency(Number(summary.binaryRightCarryAmount || 0)) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-3 md:p-5">
      <div className="mb-5">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Purchase History</h1>
        <p className="text-sm text-gray-600 mt-1">Your wallpaper purchase bills and business income summary.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mb-5">
        {statCards.map((item) => (
          <div
            key={item.label}
            className="rounded-lg p-4 shadow-sm border border-gray-100 text-white"
            style={{ background: defaultStylesSidebar.cardbg }}
          >
            <p className="text-sm opacity-90">{item.label}</p>
            <p className="text-2xl font-bold mt-1">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:p-5 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-sm font-semibold text-gray-700">From Date</label>
            <input
              type="date"
              value={filters.from}
              onChange={(e) => setFilters((prev) => ({ ...prev, from: e.target.value }))}
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700">To Date</label>
            <input
              type="date"
              value={filters.to}
              onChange={(e) => setFilters((prev) => ({ ...prev, to: e.target.value }))}
              className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50"
            />
          </div>
          <button
            onClick={fetchBills}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white"
            style={{ background: defaultStylesSidebar.cardbg }}
          >
            <FiSearch size={16} />
            Search
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="inline-flex flex-1 items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700"
            >
              <FiRefreshCw size={16} />
              Reset
            </button>
            <button
              onClick={handleDownloadPdf}
              className="inline-flex flex-1 items-center justify-center gap-2 px-4 py-2 rounded-lg text-white"
              style={{ background: defaultStylesSidebar.cardbg }}
            >
              <FiDownload size={16} />
              PDF
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead style={{ background: defaultStylesSidebar.cardbg }}>
              <tr>
                <th className="text-left py-3 px-4 text-white">Date</th>
                <th className="text-left py-3 px-4 text-white">Bill</th>
                <th className="text-left py-3 px-4 text-white">Product</th>
                <th className="text-left py-3 px-4 text-white">Qty</th>
                <th className="text-left py-3 px-4 text-white">Amount</th>
                <th className="text-left py-3 px-4 text-white">Direct 5%</th>
                <th className="text-left py-3 px-4 text-white">Team Pool 10%</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">Loading purchase bills...</td>
                </tr>
              ) : bills.length ? (
                bills.map((bill) => (
                  <tr key={bill._id} className="text-sm hover:bg-blue-50">
                    <td className="py-3 px-4">{formatDate(bill.billDate || bill.createdAt)}</td>
                    <td className="py-3 px-4">{bill.billNumber || "-"}</td>
                    <td className="py-3 px-4">
                      <div className="font-medium text-gray-800">{bill.productName}</div>
                      <div className="text-xs text-gray-500">{bill.designName || bill.materialType || "-"}</div>
                    </td>
                    <td className="py-3 px-4">{bill.quantity || 1} {bill.unit || "pcs"}</td>
                    <td className="py-3 px-4 font-semibold">{formatCurrency(bill.amount)}</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">{formatCurrency(bill.directIncomeAmount)}</td>
                    <td className="py-3 px-4">{formatCurrency(bill.binaryPoolAmount)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">No purchase bills found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBills;
