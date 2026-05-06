// columns.js
import { FiArrowUp, FiArrowDown, FiDownload } from 'react-icons/fi';
import { generateInvoicePdf } from './Invoice';
import Button from '../component/wrapper/Button';
import { defaultStylesSidebar } from '../constants/colors';

export const columns = [
  { key: 'sno', title: 'SNo.', sortable: true },
  { key: 'dsCode', title: 'DS Code', sortable: true, filterable: true },
  { key: 'dsName', title: 'DS Name', sortable: true, filterable: true },
  { key: 'totalAmount', title: 'Total Amount', sortable: true, filterable: true },
  { key: 'payDate', title: 'Pay Date', sortable: true },
  { key: 'tds', title: 'TDS', sortable: true, filterable: true },
  { key: 'dataMaintenanceCharges', title: 'Data Maintenance Charges', sortable: true },
  { key: 'netAmount', title: 'Net Amount', sortable: true },
  { key: 'dispatchDetail', title: 'Dispatch Detail', sortable: true },
  { key: 'paymentRemark', title: 'Payment Remark', sortable: true },
  { key: 'payout', title: 'Payout', sortable: true },
  { key: 'statement', title: 'Statement', sortable: true },
];
export const statement = [
  // { key: 'sno', title: 'SNo.', sortable: true },
 {
    key: 'amount',
    title: 'Amount',
    sortable: true,
    filterable: true,
    render: (amount, row) => (
      <span
        className={`font-semibold ${
          row.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {row.type === 'income' ? '+' : '-'} ₹{amount}
      </span>
    ),
  },
  { key: 'paymenttype', title: 'Payment Type', sortable: true, filterable: true },
  { key: 'createdAt', title: 'Date', render: (createdAt) => {
  const date = new Date(createdAt);
  const formatted = date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return <span>{formatted}</span>;
} },

];
export const directTeam = [
  // { key: 'sno', title: 'SNo.', sortable: true },
  { key: 'userId', title: 'UserId', sortable: true, filterable: true },
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'createdAt', title: 'DOJ', sortable: true, filterable: true },
  { key: 'sponsor', title: 'Sponsor', sortable: true },
  {
    key: 'totalPurchaseAmount',
    title: 'Total Purchase',
    sortable: true,
    filterable: true,
    render: (value) => `Rs ${Number(value || 0).toLocaleString('en-IN')}`,
  },
];

export const ordersColumns = [{
  title: "Date",
  key: "createdAt",
  render: (value) => new Date(value).toLocaleDateString("en-IN"),
  sortable: true,
  filterable: true
},
{
  title: "billNumber",
  key: "billNumber",
  sortable: true,
  filterable: true
},

{
  title: "Status",
  key: "status",
  render: (value) => {
    const statusMap = {
      approved: {
        label: "APPROVED",
        bg: "bg-green-100",
        text: "text-green-700",
        icon: "✔️",
      },
      pending: {
        label: "PENDING",
        bg: "bg-yellow-100",
        text: "text-yellow-700",
        icon: "⏳",
      },
      rejected: {
        label: "REJECTED",
        bg: "bg-red-100",
        text: "text-red-700",
        icon: "❌",
      },
      shipped: {
        label: "SHIPPED",
        bg: "bg-blue-100",
        text: "text-blue-700",
        icon: "🚚",
      },
    };

    const status = statusMap[value] || {
      label: value?.toUpperCase() || "UNKNOWN",
      bg: "bg-gray-100",
      text: "text-gray-700",
      icon: "❔",
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold tracking-wide ${status.bg} ${status.text}`}
      >
        <span>{status.icon}</span>
        {status.label}
      </span>
    );
  },
  sortable: true,
  filterable: true,
},
{
  title: "Net Amount (₹)",
  key: "netAmount",
  render: (value) => `₹${value.toFixed(2)}`,
  sortable: true,
  filterable: true
}, {
  title: "Invoice",
  key: "download",
  render: (value, row) => (
    <button
      onClick={() => {
        console.log("Full row object:", row);
        generateInvoicePdf(row)
      }}
      className="px-3 py-1 text-white rounded hover:bg-blue-600 transition"
      style={{
        background: defaultStylesSidebar.cardbg
      }}
     
    >
      <FiDownload size={18} color='white'/>
    </button>
  ),

},
]

export const depthTeam = [
  // { key: 'sno', title: 'SNo.', sortable: true },
  { key: 'userId', title: 'UserId', sortable: true, filterable: true, },
  { key: 'name', title: 'Name', sortable: true, filterable: true },
  { key: 'createdAt', title: 'DOJ', sortable: true, filterable: true },
  { key: 'sponsor', title: 'Sponsor', sortable: true },
  {
    key: 'totalPurchaseAmount',
    title: 'Total Purchase',
    sortable: true,
    filterable: true,
    render: (value) => `Rs ${Number(value || 0).toLocaleString('en-IN')}`,
  },
];
