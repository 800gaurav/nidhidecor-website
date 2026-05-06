import React, { useEffect, useState } from "react";
import Usernav from "../pages/dashboard/users/Usernav";
import Cookies from "js-cookie";
import useAxios from "../utils/useAxios";
import { useAuth } from "../context/AuthContext";
import Table from "../component/Table";
import { formatCurrency } from "../utils";
import { colors } from "../variables/colors";

function DirectTeamPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;
 const { setloading} = useAuth();
  const fetchDirectReferrals = async () => {
    try {
      setloading(true)
      const res = await fetchData({
        url: `/api/v1/user/auth/referrals/tree`,
      });
      console.log(res)
      setData(res.directUsers || []);
      setloading(false)
    } catch (error) {
      console.error("Error fetching direct referrals:", error);
      setloading(false)
    }
  };

  useEffect(() => {
    fetchDirectReferrals();
  }, []);

  const filteredData = data.filter((row) =>
    row.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.phone?.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };


const columns = [
  {
    key: 'userId',
    title: 'User ID',
    sortable: true,
    filterable: true,
  },
  {
    key: 'name',
    title: 'Name',
    sortable: true,
    filterable: true,
  },
  {
    key: 'isActivated',
    title: 'Status',
    sortable: true,
    render: (isActivated) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          isActivated
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {isActivated ? 'Activated' : 'Not Activated'}
      </span>
    ),
  },
  {
    key: 'createdAt',
    title: 'Join Date',
    sortable: true,
    render: (value) => new Date(value).toLocaleString(),
  },
];

 

  return (
    <div className="">
    
      <div className=" p-6 min-h-screen">
        <h2 className="text-center text-2xl font-bold  mb-6 uppercase"
        style={{
          color:colors.theme1
        }}
        >
          My Direct Referrals
        </h2>

         <Table
            columns={columns}
            data={data}
            pageSize={5}
            searchable={true}
            filterable={true}
            striped={true}
            hoverable={true}
            className="mt-6"
          />
      </div>
    </div>
  );
}

export default DirectTeamPage;

