import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  PieChart,
  DollarSign,
  ArrowUpRight,
  Calendar,
  Coins,
  BarChart3,
  ChevronRight
} from "lucide-react";
import useAxios from "../../utils/useAxios";
import apiRoutes from "../../variables/apiRoutes";
import { useNavigate } from "react-router-dom";

// Theme colors
export const colors = {
  theme1: "#0671FF",
  theme2: "#02D396",
  theme3: "#FF6B6B",
  theme4: "#9C27B0",
};

const Investment = () => {
  const { fetchData } = useAxios();
  const [allInvestedPlans, setAllInvestedPlans] = useState([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [gain, setGain] = useState(0);
  const [gainPercentage, setGainPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  const getAllPlans = async () => {
    try {
      setIsLoading(true);
      const res = await fetchData({
        url: apiRoutes.allInvestedPlans,
      });

      if (res.success) {
        setAllInvestedPlans(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

  useEffect(() => {
    if (allInvestedPlans.length > 0) {
      const invested = allInvestedPlans.reduce(
        (sum, p) => sum + (p.planId?.baseAmount || 0),
        0
      );

      const current = allInvestedPlans.reduce(
        (sum, p) => sum + (p.planId?.netAmount || 0),
        0
      );

      const g = current - invested;
      const gPercent = invested > 0 ? (g / invested) * 100 : 0;

      setTotalInvestment(invested);
      setTotalCurrentValue(current);
      setGain(g);
      setGainPercentage(gPercent);
    }
  }, [allInvestedPlans]);

  // Format currency with commas
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED': return 'text-green-600 bg-green-100';
      case 'PENDING': return 'text-yellow-600 bg-yellow-100';
      case 'REJECTED': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-[#0671FF] border-r-[#02D396] border-b-[#0671FF] border-l-[#02D396] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your investments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[100px] min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-[#0671FF] to-[#02D396] bg-clip-text text-transparent">
            Investment Portfolio
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your cryptocurrency investments and portfolio performance
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Investment Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Total Invested</h3>
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.theme1}15` }}
              >
                <DollarSign
                  className="w-5 h-5"
                  style={{ color: colors.theme1 }}
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalInvestment)}
            </p>
            <p className="text-sm text-gray-500 mt-1">Across all plans</p>
          </motion.div>

          {/* Current Value Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Current Value</h3>
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.theme2}15` }}
              >
                <TrendingUp
                  className="w-5 h-5"
                  style={{ color: colors.theme2 }}
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(totalCurrentValue)}
            </p>
            {/* <div className="flex items-center mt-1">
              <span
                className={`text-sm font-semibold ${gain >= 0 ? "text-green-600" : "text-red-600"
                  }`}
              >
                {gain >= 0 ? "↑" : "↓"} {Math.abs(gainPercentage).toFixed(2)}%
              </span>
              <span className="text-sm text-gray-500 ml-2">
                ({gain >= 0 ? "+" : "-"}{formatCurrency(Math.abs(gain))})
              </span>
            </div> */}
          </motion.div>

          {/* Plans Count Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Investment Plans</h3>
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: `${colors.theme3}15` }}
              >
                <PieChart
                  className="w-5 h-5"
                  style={{ color: colors.theme3 }}
                />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {allInvestedPlans.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">Requested investments</p>
          </motion.div>

          {/* Avg. Return Card */}
          {/* Approved Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Approved Plans</h3>
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.theme4}15` }} />
            </div>
            <p className="text-2xl font-bold text-green-600">
              {allInvestedPlans?.filter((x) => x.status === "APPROVED").length || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Approved</p>
          </motion.div>

          {/* Pending Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Pending Plans</h3>
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.theme2}15` }} />
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {allInvestedPlans?.filter((x) => x.status === "PENDING").length || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Awaiting Approval</p>
          </motion.div>

          {/* Rejected Plans */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 font-medium">Rejected Plans</h3>
              <div className="p-2 rounded-lg" style={{ backgroundColor: `${colors.theme3}15` }} />
            </div>
            <p className="text-2xl font-bold text-red-600">
              {allInvestedPlans?.filter((x) => x.status === "REJECTED").length || 0}
            </p>
            <p className="text-sm text-gray-500 mt-1">Total Rejected</p>
          </motion.div>
        </div>

        {/* Investment List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 mb-10"
        >
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Investment Plans
            </h2>
            <span className="text-sm text-gray-500 bg-blue-50 px-3 py-1 rounded-full">
              {allInvestedPlans.length}  plans
            </span>
          </div>

          {allInvestedPlans.length === 0 ? (
            <div className="py-16 text-center">
              <Coins className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No investments yet</h3>
              <p className="text-gray-500">Start investing to see your portfolio here</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {allInvestedPlans.map((plan, index) => {
                const planGain = (plan.planId?.netAmount || 0) - (plan.planId?.baseAmount || 0);
                const planGainPercentage = (plan.planId?.baseAmount || 0) > 0
                  ? (planGain / (plan.planId?.baseAmount || 1)) * 100
                  : 0;

                return (
                  <motion.div
                    key={plan._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group"
                    onClick={() => {
                      if (plan.status == 'APPROVED') {
                        console.log(plan)
                        // return
                        navigate(`/dashboard/investment/${plan?._id}?planid=${plan.planId._id}`)
                      }
                    }}
                  >

                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-blue-50">
                        <Coins className="w-6 h-6 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Investment Plan #{index + 1}
                        </h3>
                        <div className="flex items-center mt-1 space-x-3">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(plan.status)}`}>
                            {plan.status}
                          </span>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(plan.createdAt)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Transaction: {plan.transactionId}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(plan.planId?.netAmount || 0)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Plan: {formatCurrency(plan.planId?.baseAmount || 0)}
                      </p>
                      <div className={`text-xs font-medium mt-1 ${planGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {planGain >= 0 ? '+' : ''}{formatCurrency(planGain)} ({planGain >= 0 ? '+' : ''}{planGainPercentage.toFixed(2)}%)
                      </div>
                    </div>

                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Total Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-gray-600 font-medium">Total Portfolio Value</p>
              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {formatCurrency(totalCurrentValue)}
                </p>
                {/* <div className={`text-sm ${gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {gain >= 0 ? '+' : ''}{formatCurrency(gain)} ({gain >= 0 ? '+' : ''}{gainPercentage.toFixed(2)}%)
                </div> */}
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </div>
  );
};

export default Investment;