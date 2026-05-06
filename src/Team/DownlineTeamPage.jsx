import React, { useEffect, useState } from "react";
import Usernav from "../pages/dashboard/users/Usernav";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "../context/AuthContext";
import apiRoutes from "../variables/apiRoutes";
import Table from "../component/Table";
import { colors } from "../variables/colors";

function DownlineTeamPage() {
  const [levels, setLevels] = useState([]);
  const [expandedLevel, setExpandedLevel] = useState(null);

  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const { setloading } = useAuth();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;

  useEffect(() => {
    const fetchDownlineLevels = async () => {
      setloading(true);
      try {
        const res = await fetchData({
          url: apiRoutes.myDownLine(userId),
        });
        console.log("API Response:", res);

        if (res.success && res.data) {
          // Convert object {level_1, level_2,...} → array
          const formattedLevels = Object.entries(res.data).map(
            ([key, value]) => ({
              level: key.replace("level_", ""), // "level_1" → "1"
              totalMembers: value.count,
              users: value.users,
              totalInvestment: 0, // agar API nahi bhejti toh 0
              status: value.count > 0 ? "qualified" : "not_qualified",
            })
          );
          setLevels(formattedLevels);
        } else {
          setLevels([]);
        }

        setloading(false);
      } catch (error) {
        console.error("Error fetching downline levels:", error);
        setloading(false);
      }
    };

    fetchDownlineLevels();
  }, []);

  const toggleExpand = (level) => {
    setExpandedLevel((prev) => (prev === level ? null : level));
  };

  const columns = [
    {
      key: "level",
      title: "Level",
      sortable: true,
      filterable: true,
    },
    {
      key: "totalMembers",
      title: "Total Members",
      sortable: true,
      filterable: true,
    },
   
    {
      key: "action",
      title: "Action",
      render: (_, row) => (
        <button
          className="text-sm font-medium text-blue-600 hover:underline"
          onClick={() => toggleExpand(row.level)}
        >
          {expandedLevel === row.level ? "Hide Users" : "View Users"}
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen ">
      <Usernav />
      <div className="p-6">
        <h2
          className="text-center text-2xl font-bold mb-6"
          style={{ color: colors.theme1 }}
        >
          Team Downline by Level
        </h2>

        {/* Table */}
        <Table
          columns={columns}
          data={levels}
          pageSize={5}
          searchable={true}
          filterable={true}
          striped={true}
          hoverable={true}
          className="mt-6"
        />

        {/* Expanded Users */}
        {expandedLevel && (
  <div className="mt-6 border rounded-xl bg-white shadow-lg overflow-hidden">
    <h3
      className="font-semibold px-4 py-3 border-b"
      style={{ color: colors.theme1, borderColor: colors.theme1 }}
    >
      Users in Level {expandedLevel}
    </h3>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-6 py-3 text-left text-sm font-bold tracking-wider"
              style={{ color: colors.theme1 }}
            >
              User ID
            </th>
            <th
              className="px-6 py-3 text-left text-sm font-bold tracking-wider"
              style={{ color: colors.theme1 }}
            >
              Email
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {levels
            .find((lvl) => lvl.level === expandedLevel)
            ?.users.map((user, idx) => (
              <tr
                key={user._id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100 transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-900">
                  {user.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-base font-medium text-gray-800">
                  {user.email}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  </div>
)}

      </div>
    </div>
  );
}

export default DownlineTeamPage;
