import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FiCreditCard, FiTrendingUp } from "react-icons/fi";
import { defaultStylesSidebar } from "../../../constants/colors";

ChartJS.register(ArcElement, Tooltip, Legend);

export const UserAnalyticsCard = ({ title, data, colors }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 4,
        spacing: 2,
      },
    ],
  };

  const options = {
    cutout: "65%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#1f2937",
        bodyColor: "#4b5563",
        borderColor: "#e5e7eb",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
    maintainAspectRatio: false,
  };

  const total = Object.values(data).reduce((sum, value) => sum + value, 0);

  return (
    <div className="group w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-100 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl shadow-sm" style={{background: defaultStylesSidebar.cardbg}}>
            <FiCreditCard className="text-white" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiTrendingUp size={14} />
              Analytics overview
            </p>
          </div>
        </div>
      
      </div>

      {/* Chart and Stats Container */}
      <div className="flex items-center justify-between">
        {/* Chart */}
        <div className="relative w-52 h-52">
          <Doughnut data={chartData} options={options} />
          
        </div>

     
      </div>

      {/* Progress Bars */}
      <div className="mt-6 space-y-2">
        {Object.keys(data).map((key, index) => {
          const value = data[key];
          const percentage = Math.round((value / total) * 100);
          
          return (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-600 w-20 truncate">{key}</span>
              <div className="flex-1 mx-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      backgroundColor: colors[index],
                      width: `${percentage}%`
                    }}
                  ></div>
                </div>
              </div>
              <span className="font-medium text-gray-800 w-8 text-right">
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};