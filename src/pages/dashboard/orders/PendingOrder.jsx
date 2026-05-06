import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Table from '../../../component/Table';
import useApi from '../../../hooks/useApi';
import { ordersColumns } from '../../../utils/columns';

const PendingOrder = () => {
  const [dateFrom, setDateFrom] = useState('24/09/2025');
  const [dateTo, setDateTo] = useState('24/09/2025');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const { getMyOrder, myOrders } = useApi();

  useEffect(() => {
    getMyOrder('pending');
  }, []);

  console.log(myOrders);

  const columns =[{
  title: "Date",
  key: "date",
  render: (value) => new Date(value).toLocaleDateString("en-IN"),
},
{
  title: "Product",
  key: "productName",
},
{
  title: "Quantity",
  key: "quantity",
},
{
  title: "Status",
  key: "status",
  render: (value) => (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${
        value === "approved"
          ? "bg-green-100 text-green-600"
          : "bg-yellow-100 text-yellow-600"
      }`}
    >
      {value}
    </span>
  ),
},
{
  title: "Net Amount (₹)",
  key: "netAmount",
  render: (value) => `₹${value.toFixed(2)}`,
},]
  return (
    <div className="min-h-screen bg-gray-50 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
         
        </motion.div>

        {/* Table */}
        <Table
         columns={ordersColumns}  // 👈 yaha wahi format lagega jo tumne diya
          data={myOrders || []} // API se aaya data
          pageSize={15}
          searchable={true}
          filterable={true}
          striped={true}
          hoverable={true}
          onUserClick={(userId) => console.log("Clicked User:", userId)}
          title='Pending Orders'
        />
      </div>
    </div>
  );
};

export default PendingOrder;
