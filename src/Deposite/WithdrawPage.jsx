import React, { useState } from "react";


import Swal from "sweetalert2";
import { Upload, X, ArrowRight, Info, CheckCircle } from "lucide-react";
import apiRoutes from "../variables/apiRoutes";
import { useAuth } from "../context/AuthContext";
import useAxios from "../utils/useAxios";
import { useNavigate } from "react-router-dom";
import Button from "../component/wrapper/Button";
import { m } from "framer-motion";
import { defaultStylesSidebar } from "../constants/colors";

// Color constants
export const colors = {
  theme1: "#0671FF",
  theme2: "#02D396"
};

const WithdrawPage = () => {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    amount: "",
    upiId: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    passbookPhoto: null,
    pancardPhoto: null,
  });

  const [previewImages, setPreviewImages] = useState({
    passbookPhoto: null,
    pancardPhoto: null,
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }

    if (files && files[0]) {
      const file = files[0];

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, [name]: "Please upload an image file" }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, [name]: "File size must be less than 2MB" }));
        return;
      }

      setFormValues({ ...formValues, [name]: file });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImages(prev => ({ ...prev, [name]: e.target.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormValues({ ...formValues, [name]: value });
    }
  };

  const removeImage = (name) => {
    setFormValues({ ...formValues, [name]: null });
    setPreviewImages(prev => ({ ...prev, [name]: null }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formValues.amount || formValues.amount <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (!formValues.upiId) {
      newErrors.upiId = "UPI ID is required";
    }

    if (!formValues.accountNumber || formValues.accountNumber.length < 9) {
      newErrors.accountNumber = "Please enter a valid account number";
    }

    if (!formValues.ifscCode) {
      newErrors.ifscCode = "IFSC Code is required";
    }

    if (!formValues.bankName) {
      newErrors.bankName = "Bank name is required";
    }

    if (!formValues.passbookPhoto) {
      newErrors.passbookPhoto = "Passbook photo is required";
    }

    if (!formValues.pancardPhoto) {
      newErrors.pancardPhoto = "PAN card photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Values:", formValues);

    // if (!validateForm()) {
    //   return;
    // }

    setloading(true);

    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });

      // Debugging: Check FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await fetchData({
        url: apiRoutes.withdrawRequest,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",  // ✅ Force multipart
        },
      });


      console.log("Withdraw Response:", res);

      if (res.success) {
        setSubmitted(true);
        setFormValues({
          amount: "",
          upiId: "",
          accountNumber: "",
          ifscCode: "",
          bankName: "",
          passbookPhoto: null,
          pancardPhoto: null,
        });
        setPreviewImages({
          passbookPhoto: null,
          pancardPhoto: null,
        });

        Swal.fire({
          title: "Success 🎉",
          text: res.message || "Withdrawal request submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

      } else {
        Swal.fire({
          title: "Error ",
          text: res.message || "Failed to submit withdrawal request",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Withdraw Error:", error);
         if (error.message === "KYC not approved. Please complete KYC first.") {
        Swal.fire({
          title: "KYC Required ⚠️",
          text: "Please complete your KYC before making a withdrawal.",
          icon: "warning",
          confirmButtonText: "Go to KYC",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/dashboard/view-kyc"); // 👈 change this path if your KYC route is different
          }
        });
      } else {
        // other errors
        Swal.fire({
          title: "Error ❌",
          text: error.message || "Something went wrong while submitting withdrawal request",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } finally {
      setloading(false);
    }
  };



  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Withdrawal Request Submitted</h2>
            <p className="text-gray-600 mb-6">
              Your withdrawal request has been submitted successfully. We will process it within 24-48 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3  rounded-lg font-medium  transition-colors"
              style={{ background: defaultStylesSidebar.cardbg, color: "white" }}
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8 mt-[100px]">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#0671FF] to-[#02D396] p-6 text-white">
            <h1 className="text-2xl font-bold">Withdrawal Request</h1>
            <p className="opacity-90">Enter the amount you want to withdraw</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (INR)
              </label>
              <input
                type="number"
                name="amount"
                value={formValues.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${errors.amount ? "border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200"
                  }`}
              />
              {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
            </div>

            {/* Bank Details */}


            {/* Submit Button */}
            <Button
              type="submit"
              title="Submit Withdrawal Request"
              className="w-full  py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
            />

            {/* <ArrowRight className="w-5 h-5 ml-2" /> */}


            <Button
              title="View Withdrawal History"
              onClick={() => navigate('/dashboard/funds/withdraw-history')}
              type="submit"
              className="w-full  py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center"
              style={{ marginTop: '1rem' }}
            />
          </form>


        </div>
      </div>
    </div>
  );
};

export default WithdrawPage;