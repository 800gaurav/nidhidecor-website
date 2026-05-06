import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../utils/useAxios';
import Table from '../../component/Table';
import { depthTeam as depthTeamColumns } from '../../utils/columns';
import { defaultStylesSidebar } from '../../constants/colors';

const Depthdownline = () => {
  const [data, setData] = useState([]);
  const { setloading, userData, loading } = useAuth();
  const { fetchData } = useAxios();

  const handleUserClick = async (clickedUserId) => {
    setloading(true);
    try {
      const res = await fetchData({
        url: `/api/v1/user/profile/get-left-right-user/${clickedUserId}`,
      });

      const formatted = [];
      if (res.data) {
        // formatted.push({ ...res.data, label: "Main User" });
        if (res.data.leftChild) formatted.push({ ...res.data.leftChild, label: "Left User" });
        if (res.data.rightChild) formatted.push({ ...res.data.rightChild, label: "Right User" });
      }

      setData(formatted);
      setloading(false);
    } catch (err) {
      console.error(err);
      setloading(false);
    }
  };

  useEffect(() => {
    if (userData?.id) handleUserClick(userData.id);
  }, [userData]);



  // columns me onUserClick pass kar rahe hain
  const columns = depthTeamColumns.map(col => {
    if (col.key === 'userId') {
      return {
        ...col,
        render: (value, row) => (
          <button
            onClick={() => handleUserClick(row._id)}
         
            style={{ color: defaultStylesSidebar.cardbg, cursor: "pointer" }} // ✅ sahi syntax
          >
            {value}
          </button>
        )
      }
    }
    return col;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4">
      <div className="max-w-6xl mx-auto">


        <Table
          columns={columns}
          data={data}
          pageSize={10}
          searchable={false}
          filterable={true}
          striped
          hoverable
          title='Depth Team'
        />
      </div>
    </div>
  );
};

export default Depthdownline;
