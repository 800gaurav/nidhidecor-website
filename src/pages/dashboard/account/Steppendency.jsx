import React, { useEffect, useState } from 'react';
import Table from '../../../component/Table';
import useAxios from '../../../utils/useAxios';
import { useAuth } from '../../../context/AuthContext';

const Steppendency = () => {
  const { setloading } = useAuth();
  const { fetchData } = useAxios();

  const [userData, setUserData] = useState(null);
  const [tableData, setTableData] = useState([]);

  // Static levels data
  const bonusQualification = [
    {level: 1,left: 200, right: 100, income: 2000},
    {level: 2,left: 800, right: 400, income: 5000},
    {level: 3,left: 2000, right: 1000, income: 10000},
    {level: 4,left: 4400, right: 2200, income: 20000},
    {level: 5,left: 9200, right: 4600, income: 40000},
    {level: 6,left: 18800, right: 9400, income: 80000},
    {level: 7,left: 42800, right: 21400, income: 200000},
    {level: 8,left: 90800, right: 45400, income: 380000},
    {level: 9,left: 186800, right: 93400, income: 600000},
    {level: 10,left: 378800, right: 189400, income: 1200000},
    {level: 11,left: 762800, right: 381400, income: 2400000} 
  ];

  const fetchHistory = async () => {
    setloading(true);
    try {
      const res = await fetchData({
        url: `/api/v1/user/profile/get-user-data`,
      });
       console.log(res)
      const apiData = res.data;

      // Merge API data with qualification table
      // Merge API data with qualification table
let remainingLeft = apiData.leftTotalsp;
let remainingRight = apiData.rightTotalsp;


const formatted = bonusQualification.map((level) => {
const usedLeft = Math.min(remainingLeft, level.left)
const usedRight = Math.min(remainingRight, level.right)

remainingLeft -= usedLeft,
remainingRight -= usedRight

  // const requiredLeft = level.left - usedLeft;
  // const requiredRight = level.right - usedRight;
  const requiredLeft = Math.max(0, level.left - apiData.leftTotalsp)
  const requiredRight =  Math.max(0, level.right - apiData.rightTotalsp)

  return {
    ...level,
    leftsp: apiData.leftTotalsp,
    rightsp: apiData.rightTotalsp,
    requiredLeft,
    requiredRight,
        status:
      requiredLeft === 0 && requiredRight === 0
        ? "✅ Complete"
        : "⏳ Pending",
  };
});

      setUserData(apiData);
      setTableData(formatted);
      setloading(false);
    } catch (err) {
      console.error(err);
      setloading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const columns = [
    { key: 'level', title: 'Level', sortable: true },
    { key: 'left', title: 'Required SAO', sortable: true },
    { key: 'right', title: 'Required SGO', sortable: true },
    { key: 'leftsp', title: 'Current SAO SP', sortable: true },
    { key: 'rightsp', title: 'Current SGO SP', sortable: true },
    { key: 'requiredLeft', title: 'Remaining SAO', sortable: true },
    { key: 'requiredRight', title: 'Remaining SGO', sortable: true },
    { key: 'income', title: 'Income', sortable: true },
    { key: 'status', title: 'Status', sortable: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4">
      <div className="max-w-6xl mx-auto">
   

        <Table
          columns={columns}
          data={tableData}
          pageSize={12}
          searchable={true}
          filterable={true}
          striped
          hoverable
          title='Step pending'
        />
      </div>
    </div>
  );
};

export default Steppendency;
