import React, { useEffect, useState } from 'react';
import { FiCalendar, FiDownload, FiAlertTriangle, FiDollarSign, FiClock, FiFilter, FiTrash2 } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { directTeam } from '../../utils/columns';
import Table from '../../component/Table';
import generateDummyData from '../../utils/dummyData';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../utils/useAxios';


const DirectTeam = () => {
  const [data, setData] = useState([]);
  const [dateFrom, setDateFrom] = useState('24/09/2025');
  const [dateTo, setDateTo] = useState('24/09/2025');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const { setloading} = useAuth();
  const { fetchData } = useAxios();
      const fetchHistory = async () => {
      setloading(true)
      try {
        const res = await fetchData({
          url: `/api/v1/user/auth/referrals/tree`,
        });
 console.log(res)
        setData(res.data)
        setloading(false)
      } catch (err) {
        console.error(err);
        setloading(false)
      }
    };
useEffect(()=>{
fetchHistory()
},[])  
  const handleExportExcel = () => {
    console.log('Exporting to Excel...');
    // Add export logic
  };

  const handleRemoveOrders = () => {
    console.log('Removing orders:', selectedOrders);
    // Add remove logic
  };

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
     <Table 
          columns={directTeam}
          data={data}
          pageSize={15}
          searchable={false}
          filterable={true}
          striped={true}
          hoverable={true}
          title='Direct Team'
        />
      </div>
    </div>
  );
};

export default DirectTeam;