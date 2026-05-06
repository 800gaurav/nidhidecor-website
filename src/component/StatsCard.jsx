import React from 'react';
import { Card, Typography, Spin } from 'antd';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Wallet, 
  Users, 
  Mail, 
  Phone, 
  Shield, 
  Award,
  DollarSign,
  BarChart3,
  Plane,
  Shrub
} from 'lucide-react';

const { Title, Text } = Typography;

// Color palette for cards
const colorPalettes = [
  { gradient: 'from-blue-500 to-blue-600', bg: 'bg-blue-500', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { gradient: 'from-green-500 to-green-600', bg: 'bg-green-500', iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { gradient: 'from-purple-500 to-purple-600', bg: 'bg-purple-500', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { gradient: 'from-orange-500 to-orange-600', bg: 'bg-orange-500', iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { gradient: 'from-red-500 to-red-600', bg: 'bg-red-500', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
  { gradient: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-500', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
  { gradient: 'from-teal-500 to-teal-600', bg: 'bg-teal-500', iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
  { gradient: 'from-pink-500 to-pink-600', bg: 'bg-pink-500', iconBg: 'bg-pink-100', iconColor: 'text-pink-600' },
];

// Icon mapping for different stats
const iconMap = {
  totalIncome: DollarSign,
  walletBalance: Wallet,
  todayIncome: TrendingUp,
  salesGrowthcomission: Shrub,
  salesPerformancecomission: BarChart3,
  tripcomission: Plane,
  leftteam: Users,
  rightteam: Users,
  leftTotalsp: Award,
  rightTotalsp: Award,
  username: Users,
  email: Mail,
  phone: Phone,
  bankKyc: Shield,
  userKyc: Shield,
};

// Format values based on key
const formatValue = (key, value) => {
  // Phone number case - as string
  if (key === 'phone') {
    return value.toString(); // simple string
  }

  if (typeof value === 'number') {
    if (key.includes('Income') || key.includes('comission') || key.includes('Balance')) {
      return `₹${value}`; // no commas
    }
    return value.toString(); // team counts, etc. without commas
  }

  if (key === 'bankKyc' || key === 'userKyc') {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  return value;
};

// Get display name for keys
const getDisplayName = (key) => {
  const names = {
    totalIncome: 'Total Income',
    walletBalance: 'Wallet Balance',
    todayIncome: "Today's Income",
    salesGrowthcomission: 'Sales Growth Commission',
    salesPerformancecomission: 'Sales Performance Commission',
    tripcomission: 'Trip Commission',
    leftteam: 'Left Team',
    rightteam: 'Right Team',
    leftTotalsp: 'Left Total SP',
    rightTotalsp: 'Right Total SP',
    username: 'Username',
    email: 'Email',
    phone: 'Phone Number', // Changed to Phone Number for better display
    bankKyc: 'Bank KYC Status',
    userKyc: 'User KYC Status',
  };
  return names[key] || key;
};

// Single Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, index }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        delay: index * 0.1, 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
  };

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card 
        className={`
          h-full border-0 shadow-lg hover:shadow-2xl 
          transition-all duration-300 transform hover:scale-105
          bg-gradient-to-br ${color.gradient} text-white
          relative overflow-hidden
        `}
      >
        {/* Background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Text className="text-white text-opacity-80 text-sm font-medium">
                {title}
              </Text>
              <Title level={3} className="text-white mt-1 mb-0 font-bold">
                {formatValue(title.toLowerCase().replace(/\s+/g, ''), value)}
              </Title>
            </div>
            <div className={`p-3 rounded-xl ${color.iconBg}`}>
              <Icon size={24} className={color.iconColor} />
            </div>
          </div>
          
          {/* Progress indicator for numeric values */}
          {typeof value === 'number' && value > 0 && title !== 'Phone Number' && (
            <div className="flex items-center mt-2">
              <TrendingUp size={16} className="text-white mr-1" />
              <Text className="text-white text-opacity-90 text-xs">
                Active
              </Text>
            </div>
          )}
          
          {/* Status badge for KYC */}
          {(title.includes('KYC') || title.includes('Status')) && (
            <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium mt-2 ${
              value === 'approved' ? 'bg-green-500 text-white' : 
              value === 'pending' ? 'bg-yellow-500 text-white' : 
              'bg-red-500 text-white'
            }`}>
              {value}
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

// Main Stats Generator Component
const StatsGenerator = ({ data, loading, title = "User Statistics", className = "" }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <Text className="text-gray-500 text-lg">No data available</Text>
      </div>
    );
  }

  const allData = Object.entries(data);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`${className}`}>
      {title && (
        <Title level={2} className="text-gray-800 mb-6 text-center">
          {title}
        </Title>
      )}
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        {allData.map(([key, value], index) => {
          // Skip success and message keys
          if (key === 'success' || key === 'message') return null;
          
          const IconComponent = iconMap[key] || DollarSign;
          const colorIndex = index % colorPalettes.length;
          const color = colorPalettes[colorIndex];
          
          return (
            <StatCard
              key={key}
              title={getDisplayName(key)}
              value={value}
              icon={IconComponent}
              color={color}
              index={index}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

export default StatsGenerator;