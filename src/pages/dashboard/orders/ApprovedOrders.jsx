import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Table from '../../../component/Table';
import useApi from '../../../hooks/useApi';
import { ordersColumns } from '../../../utils/columns';

const ApprovedOrders = () => {
  const [dateFrom, setDateFrom] = useState('24/09/2025');
  const [dateTo, setDateTo] = useState('24/09/2025');
  const [selectedOrders, setSelectedOrders] = useState([]);

  const { getMyOrder, myOrders } = useApi();

  useEffect(() => {
    getMyOrder('approved');
  }, []);

  console.log(myOrders);

  

  return (
    <div className="min-h-screen bg-gray-50   px-4">
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
          title='Approved Orders'
        />
      </div>
    </div>
  );
};

export default ApprovedOrders;
