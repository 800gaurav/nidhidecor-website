import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, Zap, Percent } from 'lucide-react';
import useAxios from '../../utils/useAxios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiRoutes from '../../variables/apiRoutes';
import { imgBaseUrl } from '../../utils/axiosInstance';
import Swal from 'sweetalert2';

const Plans = () => {
  const { data, loading, error, fetchData } = useAxios();
  const [plansData, setPlansData] = useState([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const getAllPlans = async () => {
    try {
      const res = await fetchData({
        url: apiRoutes.getPlan
      });
      if (res.success) {
        setPlansData(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlans();
  }, []);

const buynow = async (productId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Do you really want to buy this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Buy it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const res = await fetchData({
          url: apiRoutes.buyproduct(productId),
          method: "POST"
        });

        if (res.success) {
          Swal.fire({
            title: "Success!",
            text: "Product purchased successfully 🎉",
            icon: "success",
            confirmButtonColor: "#3085d6"
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: res.message || "Something went wrong",
            icon: "error",
            confirmButtonColor: "#d33"
          });
        }
      } catch (error) {
        console.log(error);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonColor: "#d33"
        });
      }
    }
  });
};

  // Calculate discount percentage


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Available Products
        </h1>

        {loading && <p className="text-center">Loading...</p>}
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plansData?.map((plan, index) => {
            const discountPercentage = ((plan.mrp)-(plan.dp));
            
            return (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 relative"
              >
                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-bold z-10">
                    {/* <Percent size={14} className="mr-1" /> */}
                    ₹{discountPercentage} OFF
                  </div>
                )}
                
                <img
                  src={`${imgBaseUrl}${plan.image}`}
                  alt={plan.title}
                  className="w-full h-56 object-cover"
                />
                
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {plan.title}
                  </h2>
                  <p className="text-gray-600 mt-2 text-sm">
                    {plan.description}
                  </p>
                  
                  {/* Pricing section */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        <Tag size={16} className="mr-1 text-blue-500" />
                        <span className="text-sm">MRP:</span>
                      </div>
                      <div className="flex items-center">
                        {discountPercentage > 0 ? (
                          <>
                            <span className="text-gray-400 line-through mr-2">₹{plan.mrp}</span>
                            {/* <span className="text-lg font-bold text-blue-600">{plan.sp}</span> */}
                          </>
                        ) : (
                          <span className="text-lg font-bold text-blue-600">₹{plan.mrp}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        <Zap size={16} className="mr-1 text-green-500" />
                        <span className="text-sm">Discount Price:</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">₹{plan.dp}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-700">
                        {/* <Zap size={16} className="mr-1 text-green-500" /> */}
                        <span className="text-sm">SP</span>
                      </div>
                      <span className="text-lg font-bold text-green-600">{plan.sp}</span>
                    </div>
                    
                    {discountPercentage > 0 && (
                      <div className="pt-2 border-t border-gray-100">
                        <p className="text-xs text-gray-500">
                          You save ₹{plan.mrp - plan.dp} on this product
                        </p>
                      </div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() =>
                      isLoggedIn
                        ? buynow(plan._id)
                        : navigate("/login")
                    }
                    className="mt-6 flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-3 rounded-xl shadow hover:bg-blue-700 transition"
                  >
                    Buy Now <ArrowRight size={18} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plans;