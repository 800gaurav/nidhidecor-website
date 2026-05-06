import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiCalendar,
  FiTruck,
  FiSave,
  FiShoppingCart,
  FiDollarSign,
  FiCreditCard,
  FiTrash2,
  FiPackage,
  FiMapPin,
  FiPhone,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { message, Badge } from "antd";
import { showSuccessToast } from "../../../component/toaster";
import { CustomButton } from "../../../component/Buttons";
import useAxios from "../../../utils/useAxios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { imageUrl } from "../../../utils";
import axios from "axios";
import {load} from "@cashfreepayments/cashfree-js"

const generateTxnId = () => "TXN" + Date.now() + Math.floor(Math.random() * 1000);

const NewOrder = () => {
  const [formData, setFormData] = useState({
    date: new Date().toLocaleDateString("en-GB"),
    dsName: "",
    transactionId: generateTxnId(),
    dsCode: "",
    address: "",
    shippingAddress: "",
    shippingMobile: "",
    shippingPincode: "",
    paymentMedium: "wallet",
    saleGroup: "SL",
    cf: "CF123",
    district: "",
    state: "",
    cfType: "Retail",
  });


  useEffect(() => {
    async function initSDK() {
      const cf = await load({ mode: "production" });
      setCashfree(cf);
    }
    initSDK();
  }, []);

  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [billDetails, setBillDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { fetchData } = useAxios();
  const [cashfree, setCashfree] = useState(null);

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.shippingAddress?.trim()) {
      newErrors.shippingAddress = "Shipping address is required";
    }

    if (!formData.shippingMobile) {
      newErrors.shippingMobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.shippingMobile)) {
      newErrors.shippingMobile = "Please enter a valid 10-digit mobile number";
    }

    if (!formData.shippingPincode) {
      newErrors.shippingPincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.shippingPincode.trim())) {
      newErrors.shippingPincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Fetch products
  const getProducts = async () => {
    try {
      const res = await fetchData({ url: `/api/v1/user/cart/`, method: "GET" });
      if (res?.success) setProducts(res.data?.items);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch user profile
  const getUser = async () => {
    try {
      const res = await fetchData({ url: `/api/v1/user/profile/get-profile`, method: "GET" });
      if (res?.success) {
        const u = res.data;
        const fullAddress = u.address
          ? `${u.address.addressLine1 || ""}${u.address.addressLine2 ? ", " + u.address.addressLine2 : ""}, ${u.address.city || ""
          }, ${u.address.district || ""}, ${u.address.state || ""} - ${u.address.pincode || ""}`
          : "";

        setFormData((prev) => ({
          ...prev,
          dsName: u.name || "",
          dsCode: u.userId || "",
          address: fullAddress,
          shippingAddress: fullAddress,
          shippingMobile: u.phone || "",
          shippingPincode: u.address?.pincode || "",
          saleGroup: "SL",
          cf: "CF123",
          district: u.address?.district,
          state: u.address?.state,
          cfType: "Retail",
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUser();
    getProducts();
  }, []);

  // Toggle product selection
  const toggleProductSelect = (product) => {
    setSelectedProducts((prev) => {
      const exists = prev.find((p) => p._id === product._id);
      if (exists) return prev.filter((p) => p._id !== product._id);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, quantity) => {
    const qty = Math.max(1, Number(quantity));
    setSelectedProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, quantity: qty } : p))
    );
  };

  const calculateDiscount = (mrp, dp) => Math.round(((mrp - dp) / mrp) * 100);

  useEffect(() => {
    if (!selectedProducts.length) {
      setBillDetails(null);
      return;
    }

    let totalBasic = 0, totalTax = 0, totalShipping = 0, totalSp = 0;
    selectedProducts.forEach((p) => {
      console.log(p, "product data")
      const qty = p.quantity || 1;
      const basic = p.dp * qty;
      const tax = basic * ((p.cgstRate + p.sgstRate + p.igstRate) / 100);
      totalBasic += basic;
      totalTax += tax;
      totalShipping += p.shippingCharge || 0;
      totalSp += p.sp * qty || 0;
    });
    
    const netAmount = totalBasic + totalTax + totalShipping;
    setBillDetails({totalSp, totalBasic, totalTax, totalShipping, netAmount });
  }, [selectedProducts]);

  const removeProduct = async (productId) => {
    try {
      await fetchData({ url: `/api/v1/user/cart/remove/${productId}`, method: "DELETE" });
      setSelectedProducts((prev) => prev.filter((p) => p._id !== productId));
      getProducts();
      message.success("Product removed successfully");
    } catch {
      message.error("Failed to remove product");
    }
  };

  // Real-time validation on input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      message.error("Please fill all required shipping details correctly");
      return;
    }
    
    if (!selectedProducts.length) {
      message.error("Please select at least one product");
      return;
    }

    const payload = {
      txnId: formData.transactionId,
      userId: formData.dsCode,
      products: selectedProducts.map((p) => ({
        productId: p._id,
        quantity: p.quantity,
      })),
      shippingAddress: formData.shippingAddress,
      shippingMobile: formData.shippingMobile,
      shippingPincode: formData.shippingPincode,
      mediumOfPayment: formData.paymentMedium,
      saleGroup: formData.saleGroup,
      cf: formData.cf,
      district: formData.district,
      state: formData.state,
      cfType: formData.cfType,
    };

    setLoading(true);
    try {
      const res = await fetchData({
        url: `/api/v1/user/order/create`,
        method: "POST",
        data: payload,
      });

      if (res?.success) {
        if (payload.mediumOfPayment === 'Online') {
          doPayment(res.data.cashfreeOrder.payment_session_id)
        }else{
        showSuccessToast(res.message);
        setSelectedProducts([]);
        setBillDetails(null);
        setTimeout(() => navigate("/dashboard/products"), 800);
        }
      } else message.error(res?.message);
    } catch (error) {
      message.error("Something went wrong");
      toast.error(error.message);
      if (error.message === "Please check all the fields and fill carefully") {
        alert("Please fill your address complete address")
        navigate('/dashboard/profile')
        toast.error("Please fill your address complete address");
      }
      
    } finally {
      setLoading(false);
    }
  };


 const doPayment = async (sessionId) => {
    if (!cashfree) {
      return alert("Payment SDK not loaded yet");
    }
    if (!sessionId) {
      await createOrder();
    }
    await cashfree.checkout({
      paymentSessionId: sessionId,
      redirectTarget: "_modal",

    }).then(result => {
      if (result.error) {
        console.error("Error or user closed: ", result.error);
      } else if (result.paymentDetails) {
        console.log("Payment done: ", result.paymentDetails);
        // optionally call backend to verify order status
      } else if (result.redirect) {
        console.log("Redirecting to payment page...");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-10"
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow border border-gray-200">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FiShoppingCart className="text-blue-600 text-2xl" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Place Your Order
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Select products and complete your purchase</p>
            </div>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
         

          {/* Product List */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-3 border-b flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
                <FiPackage className="text-purple-600" /> Products ({selectedProducts.length})
              </h2>
            </div>

            <div className="p-4 sm:p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              <AnimatePresence>
                {products.map((prod) => {
                  const isSelected = selectedProducts.some((p) => p._id === prod._id);
                  const selected = selectedProducts.find((p) => p._id === prod._id);
                  const discount = calculateDiscount(prod.mrp, prod.dp);

                  return (
                    <motion.div
                      key={prod._id}
                      layout
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
                        isSelected ? "border-blue-400 bg-blue-50/30" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProductSelect(prod)}
                          className="w-5 h-5 accent-blue-600"
                        />
                        <img src={imageUrl(prod.image)} alt={prod.title} className="w-14 h-14 rounded-lg object-cover border" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{prod.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">{prod.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2 text-sm">
                            <span className="font-bold text-green-600">₹{prod.dp}</span>
                            {prod.mrp > prod.dp && (
                              <>
                                <span className="text-gray-500 line-through">₹{prod.mrp}</span>
                                <Badge count={`${discount}% OFF`} style={{ backgroundColor: "#10b981" }} />
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {isSelected && (
                          <div className="flex items-center border rounded-lg overflow-hidden">
                            <button
                              type="button"
                              onClick={() => updateQuantity(prod._id, (selected?.quantity || 1) - 1)}
                              className="w-8 h-8 hover:bg-gray-100"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={selected?.quantity || 1}
                              min={1}
                              onChange={(e) => updateQuantity(prod._id, e.target.value)}
                              className="w-12 text-center border-x bg-gray-50"
                            />
                            <button
                              type="button"
                              onClick={() => updateQuantity(prod._id, (selected?.quantity || 1) + 1)}
                              className="w-8 h-8 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removeProduct(prod._id)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </motion.section>

          {/* Bill Summary */}
          {billDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border-t border-gray-200 rounded-lg p-4 sticky bottom-0 z-20 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2 mb-3">
                Order Summary
              </h3>

              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex justify-between text-gray-700">
                  <span>Total Sp</span>
                  <span className="font-medium text-gray-900">{billDetails.totalSp}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Basic Amount</span>
                  <span className="font-medium text-gray-900">₹{billDetails.totalBasic.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-medium text-gray-900">₹{billDetails.totalTax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">₹{billDetails.totalShipping.toFixed(2)}</span>
                </div>

                <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 text-base font-semibold text-green-700">
                  <span>Total Payable</span>
                  <span>₹{billDetails.netAmount.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}

        {/* Customer Info */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-3 mb-4">
              <FiUser className="text-blue-600" /> Customer Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Date", value: formData.date },
                { label: "Transaction ID", value: formData.transactionId },
                { label: "DS Name", value: formData.dsName },
                { label: "DS Code", value: formData.dsCode },
              ].map((item, index) => (
                <div key={index}>
                  <p className="text-sm text-gray-600 mb-1">{item.label}</p>
                  <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm break-all">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Shipping Info */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6"
          >
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-3 mb-4">
              <FiTruck className="text-green-600" /> Shipping Information
            </h2>

            <div className="mb-4">
              <textarea
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={(e) => handleInputChange("shippingAddress", e.target.value)}
                placeholder="Enter complete shipping address"
                rows={3}
                className={`w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 resize-none ${
                  errors.shippingAddress ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.shippingAddress && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <FiMapPin className="text-red-500" /> {errors.shippingAddress}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={formData.shippingMobile}
                  onChange={(e) => handleInputChange("shippingMobile", e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                    errors.shippingMobile ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={10}
                />
                {errors.shippingMobile && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FiPhone className="text-red-500" /> {errors.shippingMobile}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.shippingPincode}
                  onChange={(e) => handleInputChange("shippingPincode", e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500 ${
                    errors.shippingPincode ? "border-red-500" : "border-gray-300"
                  }`}
                  maxLength={6}
                />
                {errors.shippingPincode && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <FiMapPin className="text-red-500" /> {errors.shippingPincode}
                  </p>
                )}
              </div>
            </div>
          </motion.section>


          {/* Payment */}
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-3 mb-4">
              <FiCreditCard className="text-orange-600" /> Payment Method
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { value: "wallet", label: "Wallet", },
                { value: "Offline", label: "Offline",},
                { value: "Online", label: "Online", },
              ].map((mode) => (
                <label key={mode.value} className="cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMedium"
                    value={mode.value}
                    checked={formData.paymentMedium === mode.value}
                    onChange={(e) => setFormData({ ...formData, paymentMedium: e.target.value })}
                    className="hidden"
                  />
                  <div
                    className={`px-5 py-2 rounded-xl border-2 transition-all ${
                      formData.paymentMedium === mode.value
                        ? `border-transparent bg-[#002247] text-white`
                        : "border-gray-300 text-gray-700 hover:border-gray-400"
                    }`}
                  >
                    {mode.label}
                  </div>
                </label>
              ))}
            </div>
          </motion.section>

          {/* Submit */}
          <div className="flex justify-center pt-4">
            <CustomButton
              icon={FiSave}
              type="submit"
              loading={loading}
              disabled={!selectedProducts.length || loading || Object.keys(errors).some(key => errors[key])}
              className={`bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-lg shadow-lg transition-all ${
                !selectedProducts.length || Object.keys(errors).some(key => errors[key]) ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
              }`}
            >
              {loading ? "Creating Order..." : `Create Order • ₹${billDetails?.netAmount.toFixed(2) || "0.00"}`}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;



// import React, { useEffect, useState } from "react";
// import {
//   FiUser,
//   FiCalendar,
//   FiPhone,
//   FiTruck,
//   FiPackage,
//   FiSave,
//   FiSearch,
//   FiMapPin,
//   FiCopy,
//   FiDollarSign,
//   FiShoppingCart,
//   FiPercent,
//   FiCreditCard,

// } from "react-icons/fi";

// import { motion } from "framer-motion";
// import { CustomButton } from "../../../component/Buttons";
// import useAxios from "../../../utils/useAxios";
// import { message } from "antd";
// import { Building } from "lucide-react";
// import { showErrorToast, showSuccessToast } from "../../../component/toaster";
// import useApi from "../../../hooks/useApi";
// import { useNavigate, useSearchParams } from "react-router-dom";

// // Random txn generator
// const generateTxnId = () => {
//   return "TXN" + Date.now() + Math.floor(Math.random() * 1000);
// };

// const NewOrder = () => {
//   const [formData, setFormData] = useState({
//     date: new Date().toLocaleDateString("en-GB"),
//     dsName: "",
//     transactionId: generateTxnId(),
//     dsCode: "",
//     address: "",
//     shippingAddress: "",
//     shippingMobile: "",
//     shippingPincode: "",
//     paymentMedium: "Online",
//     cfType: "Main Admin", // New field
//     cfState: "", // New field
//     cfDistrict: "", // New field
//     productGroup: "Books",
//     product: "",
//     quantity: 1,
//     shippingCharge: 0,
//     netAmount: 0,
//     remarks: "",
//     sameAsPermanent: true,
//   });

//   const navigate = useNavigate()

// const [searchParams] = useSearchParams();
// const productIdFromQuery = searchParams.get('productId'); // ✅ works

//   const {getAllProducts,products, setProducts}=useApi()

//   useEffect(() => {
//   if (products.length > 0 && productIdFromQuery) {
//     const defaultProd = products.find((p) => p._id === productIdFromQuery);

//     if (defaultProd) {
//       setFormData((prev) => ({
//         ...prev,
//         product: defaultProd._id,
//         quantity: 1,
//       }));
//       setSelectedProduct(defaultProd);

//       // Calculate bill for default product
//       setTimeout(() => {
//         calculateBill();
//       }, 100);
//     }
//   }
// }, [products, productIdFromQuery]);



//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [billDetails, setBillDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { fetchData } = useAxios();

//   // Get products


//   // Get user details
//   const getUser = async () => {
//     try {
//       const res = await fetchData({
//         url: `/api/v1/user/profile/get-profile`,
//         method: "GET",
//       });

//       if (res?.success) {
//         const u = res.data;
//         const userAddress = u.address ?
//           `${u.address.addressLine1 || ''}${u.address.addressLine2 ? ', ' + u.address.addressLine2 : ''}, ${u.address.city || ''}, ${u.address.district || ''}, ${u.address.state || ''} - ${u.address.pincode || ''}`
//           : '';

//         setFormData((prev) => ({
//           ...prev,
//           dsName: u.name || "",
//           dsCode: u.userId || "",
//           address: userAddress,
//           shippingAddress: userAddress,
//           shippingMobile: u.phone || "",
//           shippingPincode: u.address?.pincode || "",
//         }));
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//     getAllProducts();
//   }, []);

//   // Update C&F details when C&F type changes
//   useEffect(() => {
//     if (formData.cfType === "Main Admin") {
//       setFormData(prev => ({
//         ...prev,
//         cfState: "Rajasthan",
//         cfDistrict: "Jaipur"
//       }));
//     } else if (formData.cfType === "Company C&F") {
//       setFormData(prev => ({
//         ...prev,
//         cfState: "Delhi",
//         cfDistrict: "Delhi"
//       }));
//     }
//   }, [formData.cfType]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));

//     // Reset product selection when group changes
//     if (name === 'productGroup') {
//       setFormData(prev => ({ ...prev, product: '', quantity: 1 }));
//       setSelectedProduct(null);
//       setBillDetails(null);
//     }

//     // Update selected product when product changes
//     if (name === 'product') {
//       const product = products.find(p => p._id === value);
//       setSelectedProduct(product);
//       setBillDetails(null);
//     }
//   };

//   // const handleCopyAddress = () => {
//   //   setFormData(prev => ({
//   //     ...prev,
//   //     shippingAddress: prev.address,
//   //     shippingPincode: prev.shippingPincode
//   //   }));
//   //   message.success("Address copied successfully!");
//   // };

//  const calculateBill = () => {
//   if (!selectedProduct) {
//     message.error("Please select a product first");
//     return;
//   }

//   const quantity = parseInt(formData.quantity) || 1;
//   const {
//     dp,
//     shippingCharge,
//     cgstRate,
//     sgstRate,
//     igstRate,
//     mrp
//   } = selectedProduct;

//   const shippingChargeNum = Number(shippingCharge) || 0;

//   // Calculate taxes based on DP
//   const taxAmount = dp * ((Number(cgstRate || 0) + Number(sgstRate || 0) + Number(igstRate || 0)) / 100);
//   // const tdsAmount = dp * (Number(tdsRate || 0) / 100);
//   // const maintenanceAmount = dp * (Number(maintenanceRate || 0) / 100);

//   // Basic amount = DP * quantity
//   const basicAmount = dp * quantity;

//   // Net amount = DP + taxes + TDS + maintenance + shipping
//   const netAmount = basicAmount + taxAmount + shippingChargeNum;

//   const bill = {
//     basicAmount,
//     shippingCharge: shippingChargeNum,
//     cgst: (basicAmount * (Number(cgstRate) / 100)),
//     sgst: (basicAmount * (Number(sgstRate) / 100)),
//     igst: (basicAmount * (Number(igstRate) / 100)),
   
//     taxAmount,
//     netAmount,
//     quantity,
//     mrp:mrp*quantity
//   };

//   setBillDetails(bill);

//   // Update form data
//   setFormData(prev => ({
//     ...prev,
//     shippingCharge: shippingChargeNum,
//     netAmount: Math.round(netAmount * 100) / 100 // Round to 2 decimals
//   }));

//   message.success("Bill calculated successfully!");
// };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!selectedProduct) {
//       message.error("Please select a product");
//       return;
//     }
//  console.log(selectedProduct)
//     if (!formData.shippingAddress || !formData.shippingMobile) {
//       message.error("Please fill all shipping details");
//       return;
//     }
//     console.log(formData.shippingAddress , formData.shippingMobile)

//     if (!formData.cfType) {
//       message.error("Please select C&F Type");
//       return;
//     }
// console.log('frtyghj')
//     console.log(formData)
//     // 👉 Transform formData to backend payload
//     const payload = {
//       userId: formData.dsCode,
//       txnID: formData.transactionId,
//       productId: formData.product,
//       quantity: formData.quantity,
//       shippingAddress: formData.shippingAddress,
//       shippingMobile: formData.shippingMobile,
//       shippingPincode: formData.shippingPincode,
//       mediumOfPayment: formData.paymentMedium,
//       cfType: formData.cfType,
//       state: formData.cfState,
//       district: formData.cfDistrict,
//       cfType: 'Supplier',
//       cf: 'ABC Traders',
//       saleGroup: "SR",
//       remarks: formData.remarks,
//     };

//     console.log("Final Payload:", payload);

//     setLoading(true);

//     try {
//       const res = await fetchData({
//         url: `/api/v1/user/order/create`,
//         method: "POST",
//         data: payload,
//       });
// console.log(res)
//       if (res?.success) {
//        console.log(res.message)
//         showSuccessToast(res?.message)
//         setSelectedProduct(null);
//         setBillDetails(null);
//         setTimeout(()=>{
//           navigate('/dashboard/pending-order')
//         },400)
//       } else {
//         message.error(res?.message || "Failed to create order");
//       }
//     } catch (error) {
//       console.error("Error submitting order:", error);
//       message.error("Failed to create order");
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">Create New Order</h1>
//           <p className="text-gray-600">Fill in the details to place a new order</p>
//         </motion.div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 space-y-8"
//           >
//             {/* Customer Information */}
//             <section className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
//                 <FiUser className="text-blue-600" size={28} /> Customer Information
//               </h2>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Date</label>
//                   <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-300">
//                     <FiCalendar className="text-gray-400" />
//                     <span className="text-gray-900">{formData.date}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
//                   <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-300">
//                     <span className="text-gray-900 font-mono">{formData.transactionId}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">DS Name</label>
//                   <div className="p-3 bg-white rounded-lg border border-gray-300">
//                     <span className="text-gray-900">{formData.dsName}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">DS Code</label>
//                   <div className="p-3 bg-white rounded-lg border border-gray-300">
//                     <span className="text-gray-900 font-mono">{formData.dsCode}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Permanent Address */}
//               {formData.address && (
//                 <div className="mt-6 space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
//                   <div className="p-4 bg-white rounded-lg border border-gray-300">
//                     <div className="flex items-start gap-3">
//                       <FiMapPin className="text-red-500 mt-1 flex-shrink-0" />
//                       <span className="text-gray-900 whitespace-pre-line">{formData.address}</span>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </section>

//             {/* Shipping Information */}
//             <section className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
//                 <FiTruck className="text-green-600" size={28} /> Shipping Information
//               </h2>

//               {/* <div className="flex items-center mb-4">
//                 <input
//                   type="checkbox"
//                   id="sameAsPermanent"
//                   name="sameAsPermanent"
//                   checked={formData.sameAsPermanent}
//                   onChange={handleChange}
//                   className="w-4 h-4 text-blue-600 rounded"
//                 />
//                 <label htmlFor="sameAsPermanent" className="ml-2 text-sm font-medium text-gray-700">
//                   Same as permanent address
//                 </label>
//                 {!formData.sameAsPermanent && (
//                   <button
//                     type="button"
//                     onClick={handleCopyAddress}
//                     className="ml-4 flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
//                   >
//                     <FiCopy size={14} />
//                     Copy from Permanent
//                   </button>
//                 )} 
//               </div> */}

             
         
//                   <div className="space-y-2 mb-4">
//                     <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
//                     <textarea
//                       name="shippingAddress"
//                       value={formData.shippingAddress}
//                       onChange={handleChange}
//                       rows={3}
//                       placeholder="Enter complete shipping address"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       required
//                     />
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
//                       <div className="flex items-center gap-2">
//                         <FiPhone className="text-gray-400" />
//                         <input
//                           type="tel"
//                           name="shippingMobile"
//                           value={formData.shippingMobile}
//                           onChange={handleChange}
//                           className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                           placeholder="Enter mobile number"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="block text-sm font-medium text-gray-700">Pincode</label>
//                       <input
//                         type="text"
//                         name="shippingPincode"
//                         value={formData.shippingPincode}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                         placeholder="Enter pincode"
//                         required
//                       />
//                     </div>
//                   </div>
             
//             </section>

//             {/* Product Information */}
//             <section className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
//               <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
//                 <FiPackage className="text-purple-600" size={28} /> Product Details
//               </h2>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Product Group */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Product Category</label>
//                   <select
//                     name="productGroup"
//                     value={formData.productGroup}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   >
//                     <option value="Books">Books</option>
//                   </select>
//                 </div>

//                 {/* Product Selection */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Select Product</label>
//                   <select
//                     name="product"
//                     value={formData.product}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                     required
//                   >
//                     <option value="">Choose a product</option>
//                     {products.map((prod) => (
//                       <option key={prod._id} value={prod._id}>
//                         {prod.title} - ₹{prod.dp} (SP: {prod.sp})
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Quantity */}
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Quantity</label>
//                   <input
//                     type="number"
//                     name="quantity"
//                     value={formData.quantity}
//                     onChange={handleChange}
//                     min={1}
//                     max={100}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Fetch Details Button */}
//               {formData.product && (
//                 <div className="mt-6 flex justify-center">
//                   <CustomButton
//                     textColor="white"
//                     icon={FiSearch}
//                     onClick={calculateBill}
//                     className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
//                   >
//                     Calculate Bill
//                   </CustomButton>
//                 </div>
//               )}

//               {/* Bill Details */}
//               {billDetails && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mt-6 bg-white rounded-xl border border-gray-200 p-6"
//                 >
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
//                     <FiDollarSign className="text-green-600" />
//                     Bill Breakdown
//                   </h3>

//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600 ">MRP:</span>
//                         <span className="font-semibold line-through">₹{billDetails?.mrp?.toFixed(2)} </span>
//                       </div>
//                        <div className="flex justify-between">
//                         <span className="text-gray-600">DP:</span>
//                         <span className="font-semibold">₹{billDetails.basicAmount.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Shipping:</span>
//                         <span className="font-semibold">₹{billDetails.shippingCharge.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">CGST ({selectedProduct.cgstRate}%):</span>
//                         <span className="font-semibold">₹{billDetails.cgst.toFixed(2)}</span>
//                       </div>
//                     </div>

//                     <div className="space-y-2">
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">SGST ({selectedProduct.sgstRate}%):</span>
//                         <span className="font-semibold">₹{billDetails.sgst.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">IGST ({selectedProduct.igstRate}%):</span>
//                         <span className="font-semibold">₹{billDetails.igst.toFixed(2)}</span>
//                       </div>
//                       {/* <div className="flex justify-between">
//                         <span className="text-gray-600">TDS ({selectedProduct.tdsRate}%):</span>
//                         <span className="font-semibold text-gray-600">₹{billDetails.tds.toFixed(2)}</span>
//                       </div> */}
//                     </div>

//                     <div className="space-y-2">
//                       {/* <div className="flex justify-between">
//                         <span className="text-gray-600">Maintenance ({selectedProduct.maintenanceRate}%):</span>
//                         <span className="font-semibold text-gray-600">₹{billDetails.maintenance.toFixed(2)}</span>
//                       </div> */}
//                       <div className="flex justify-between border-t pt-2">
//                         <span className="text-gray-800 font-semibold">Net Amount:</span>
//                         <span className="text-xl font-bold text-green-600">₹{billDetails.netAmount.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}

//               {/* Final Amount Display */}
//               <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Shipping Charge</label>
//                   <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
//                     <span className="text-gray-900 font-semibold">₹{formData.shippingCharge}</span>
//                   </div>
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-gray-700">Net Amount</label>
//                   <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
//                     <span className="text-2xl font-bold text-green-600">₹{formData.netAmount}</span>
//                   </div>
//                 </div>
//               </div>

//  {/* Payment & C&F Information */}
//             <section className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">


//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Mode of Payment */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <FiCreditCard className="text-blue-500" />
//                     Mode of Payment
//                   </h3>
//                   <div className="flex gap-4">
//                         <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="paymentMedium"
//                         value="wallet"
//                         checked={formData.paymentMedium === "wallet"}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       <span className="text-gray-700 ml-2">Wallet</span>
//                     </label>
                  
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="paymentMedium"
//                         value="Offline"
//                         checked={formData.paymentMedium === "Offline"}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       <span className="text-gray-700 ml-2">Offline</span>
//                     </label>  
//                     <label className="flex items-center space-x-2 cursor-pointer">
//                       <input
//                         type="radio"
//                         name="paymentMedium"
//                         value="Online"
//                         checked={formData.paymentMedium === "Online"}
//                         onChange={handleChange}
//                         className="w-4 h-4 text-blue-600"
//                       />
//                       <span className="text-gray-700 ml-2">Online</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* C&F Type */}
//                 <div className="space-y-4">
//                   <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                     <Building className="text-green-500" />
//                     C&F Type *
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex gap-4">
//                       <label className="flex items-center space-x-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="cfType"
//                           value="Main Admin"
//                           checked={formData.cfType === "Main Admin"}
//                           onChange={handleChange}
//                           className="w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-gray-700 ml-2">Main Admin</span>
//                       </label>
//                       <label className="flex items-center space-x-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           name="cfType"
//                           value="Company C&F"
//                           checked={formData.cfType === "Company C&F"}
//                           onChange={handleChange}
//                           className="w-4 h-4 text-blue-600"
//                         />
//                         <span className="text-gray-700 ml-2">Company C&F</span>
//                       </label>
//                     </div>

//                     {/* C&F Details - Non-editable */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                       <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700">State</label>
//                         <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
//                           <span className="text-gray-900">{formData.cfState}</span>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <label className="block text-sm font-medium text-gray-700">District</label>
//                         <div className="p-3 bg-gray-50 rounded-lg border border-gray-300">
//                           <span className="text-gray-900">{formData.cfDistrict}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </section>

//               {/* Remarks */}
//               <div className="mt-6 space-y-2">
//                 <label className="block text-sm font-medium text-gray-700">Remarks (Optional)</label>
//                 <textarea
//                   name="remarks"
//                   value={formData.remarks}
//                   onChange={handleChange}
//                   rows={2}
//                   placeholder="Any additional notes or instructions..."
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//               </div>
//             </section>
//           </motion.div>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <CustomButton
//               textColor="white"
//               icon={FiSave}
//               type="submit"
//               loading={loading}
//               className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
//             >
//               {loading ? "Creating Order..." : "Create Order"}
//             </CustomButton>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default NewOrder;