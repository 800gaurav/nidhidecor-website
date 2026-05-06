import React, { useEffect, useState } from 'react'
import Usernav from '../pages/dashboard/users/Usernav'
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function LevelMemberDetails() {
     const { level } = useParams(); // Read level from route param
  const { fetchData } = useAxios();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  const [users, setUsers] = useState([]);
  const [levelNo, setLevelNo] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
 const { setloading} = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      setloading(true)
      try {
        const res = await fetchData({
          url: `/api/v1/user/profile/get-level-members/${userId}?level=${level}`,
        });
        setUsers(res.users || []);
        setLevelNo(res.level);
        setloading(false)
      } catch (error) {
        console.error("Failed to fetch level users:", error);
        setloading(false)
      }
    };
    fetchUsers();
  }, [userId, level]);

  // Filtering
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const paginatedData = filteredUsers.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  return (
      <div className="bg-color-1 mt-15">
      <Usernav />
<div className="bg-[#0f0f1a] min-h-screen text-white">
      <Usernav />
      <div className="p-6">
        <h2 className="text-center text-2xl font-bold text-[#ddf247] mb-6">
          Level {levelNo} Team Members
        </h2>

        {/* Controls */}
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center gap-2">
            <label>Show</label>
            <input
              type="number"
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1 w-16"
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            />
            {/* <span>entries</span> */}
          </div>

          <div className="flex items-center gap-2">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Name or User ID"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-gray-800 border border-gray-600 rounded px-2 py-1"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-800">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-900 text-[#e4ff35]">
              <tr>
                <th className="py-2 px-4 border-b border-gray-700 text-left">#</th>
                <th className="py-2 px-4 border-b border-gray-700 text-left">Name</th>
                <th className="py-2 px-4 border-b border-gray-700 text-left">User ID</th>
                <th className="py-2 px-4 border-b border-gray-700 text-left">Total Invested</th>
                <th className="py-2 px-4 border-b border-gray-700 text-left">Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.length > 0 ? (
                paginatedData.map((user, index) => (
                  <tr key={user.userId} className="hover:bg-gray-800 border-b border-gray-800">
                    <td className="py-2 px-4">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                    <td className="py-2 px-4">{user.name}</td>
                    <td className="py-2 px-4">{user.userId}</td>
                    <td className="py-2 px-4">${user.totalInvested}</td>
                    <td className="py-2 px-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 text-sm">
          <p>
            Showing {(currentPage - 1) * entriesPerPage + 1} to{" "}
            {Math.min(currentPage * entriesPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} entries
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700 disabled:opacity-50"
            >
              Prev
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LevelMemberDetails
