import React, { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import Cookies from "js-cookie";
import { useAuth } from "../../../context/AuthContext";
import {
  FiCreditCard,
  FiTrendingUp,
  FiBarChart2,
  FiDollarSign,
  FiActivity,
  FiZap,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Referral from "../../../component/Referral";
import useLiveTimeDifference from "./useLiveTimeDifference";

const Dashboard = () => {
  const [data, setData] = useState({});
  const { fetchData } = useAxios();
  const { setloading, setuserData, logout } = useAuth();
  const user = Cookies.get("USER") ? JSON.parse(Cookies.get("USER")) : null;
  const userId = user?.userId;
  const navigate = useNavigate();

  const userdashboard = async () => {
    try {
      setloading(true);
      const res = await fetchData({
        url: `/api/v1/user/auth/user-dashboard/${userId}`,
      });

      if (res?.data?.isblocked) logout();

      setData(res?.data || {});
      setuserData(res?.data);
      setloading(false);
    } catch (error) {
      console.error("Error:", error);
      setloading(false);
    }
  };

  useEffect(() => {
    if (userId) userdashboard();
  }, [userId]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const displayData = {
    walletBalance: data?.walletBalance || 0,
    totalIncome: data?.totalIncome || 0,
    todayIncome: data?.todayIncome || 0,
    active: data?.active,
    username: data?.username || user?.name,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto space-y-5">

        {/* 🔥 Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4 md:p-5 shadow-xl text-white">
          <h1 className="text-xl md:text-2xl font-bold">
            Welcome, {displayData.username} 👋
          </h1>
          <p className="text-blue-100 text-sm">
            Dashboard overview
          </p>
        </div>

        {/* 🔥 COMPACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Wallet */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <FiCreditCard className="text-white" size={20} />
              <FiTrendingUp className="text-white/60" size={16} />
            </div>
            <p className="text-blue-100 text-xs">Wallet</p>
            <h2 className="text-xl font-bold text-white mt-1">
              {formatCurrency(displayData.walletBalance)}
            </h2>
          </div>

          {/* Total */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <FiDollarSign className="text-white" size={20} />
              <FiBarChart2 className="text-white/60" size={16} />
            </div>
            <p className="text-green-100 text-xs">Total Income</p>
            <h2 className="text-xl font-bold text-white mt-1">
              {formatCurrency(displayData.totalIncome)}
            </h2>
          </div>

          {/* Today */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 shadow-lg">
            <div className="flex justify-between items-center mb-2">
              <FiActivity className="text-white" size={20} />
              <FiZap className="text-white/60" size={16} />
            </div>
            <p className="text-purple-100 text-xs">Today</p>
            <h2 className="text-xl font-bold text-white mt-1">
              {formatCurrency(displayData.todayIncome)}
            </h2>
          </div>

        </div>

        {/* 🔥 Referral */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-4 shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <FiUsers />
            Invite & Earn
          </h3>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <Referral />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;