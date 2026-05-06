import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Tag, Zap, Star, Calendar, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { imgBaseUrl } from '../utils/axiosInstance';
import apiRoutes from '../variables/apiRoutes';
import { useAuth } from '../context/AuthContext';
import useAxios from '../utils/useAxios';

const ActiveReport = () => {
  const { data, loading, error, fetchData } = useAxios();
  const [plansData, setPlansData] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const getpurchasedplan = async () => {
    try {
      const res = await fetchData({
        url: apiRoutes.purchasedproduct
      });
      if (res.success) {
        setPlansData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getpurchasedplan();
  }, []);

  // Function to format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Your Purchased Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            View all the products you've purchased and their details
          </p>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!loading && plansData.length === 0 && (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <Award className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">No purchases yet</h3>
            <p className="text-gray-600 mb-6">You haven't purchased any products yet.</p>
            <button 
              onClick={() => navigate('/plans')}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Browse Products
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plansData?.map((plan, index) => {
            const discountAmount = plan.mrp - plan.dp;
            const discountPercentage = Math.round((discountAmount / plan.mrp) * 100);
            
            return (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={`${imgBaseUrl}${plan.image}`}
                    alt={plan.title}
                    className="w-full h-48 object-cover"
                  />
                  
                  {/* Purchased Badge */}
                  <div className="absolute top-3 right-3 bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center text-xs font-medium">
                    <CheckCircle size={14} className="mr-1" />
                    Purchased
                  </div>
                  
                  {/* Discount Badge */}
                  {discountAmount > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-bold">
                      {discountPercentage}% OFF
                    </div>
                  )}
                </div>
                
                {/* Product Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {plan.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {plan.description}
                  </p>
                  
                  {/* Pricing Information */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-gray-700">
                        <Tag size={16} className="mr-2 text-blue-500" />
                        <span className="text-sm font-medium">MRP:</span>
                      </div>
                      <div className="flex items-center">
                        {discountAmount > 0 ? (
                          <>
                            <span className="text-gray-400 line-through text-sm mr-2">
                              {formatCurrency(plan.mrp)}
                            </span>
                            <span className="text-lg font-bold text-blue-600">
                              {formatCurrency(plan.dp)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-blue-600">
                            {formatCurrency(plan.mrp)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center text-gray-700">
                        <Zap size={16} className="mr-2 text-green-500" />
                        <span className="text-sm font-medium">Discount Price:</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        {formatCurrency(plan.dp)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-gray-700">
                        <Star size={16} className="mr-2 text-amber-500" />
                        <span className="text-sm font-medium">SP:</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600">
                        {plan.sp}
                      </span>
                    </div>
                
                    
                    {discountAmount > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-green-600 font-medium">
                          You saved {formatCurrency(discountAmount)} on this purchase
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {/* Purchase Date (if available) */}
                  {plan.purchaseDate && (
                    <div className="flex items-center text-gray-500 text-xs mb-4">
                      <Calendar size={14} className="mr-1" />
                      Purchased on: {new Date(plan.purchaseDate).toLocaleDateString()}
                    </div>
                  )}
                  
              
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActiveReport;