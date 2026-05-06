import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CreditCard,
  FileText,
  CheckCircle,
  Key
} from "lucide-react";
import useAxios from "../utils/useAxios";
import Button from "../component/wrapper/Button";
import projectDetails from "../constants/strings";
import { endpoints } from "../constants/apiEndpoints";
import { showErrorToast } from "../component/toaster";
import { defaultStylesSidebar } from "../constants/colors";

const MultiStepSignup = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [checkingReferral, setCheckingReferral] = useState(false);
  const [referrerName, setReferrerName] = useState("");
  const [searchParams] = useSearchParams();
  const referralID = searchParams.get("referalID");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);


  const username = searchParams.get("username");   // "newOne"


  useEffect(() => {
    if (referralID) {
      setFormData((pre) => ({ ...pre, referrerCode: referralID }))
    }
    if (username) {
      setReferrerName(username)
    }
  }, [referralID, username])
  // Form data state matching your schema
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    name: "",
    gender: "",
    dateOfBirth: "",
    email: "",
    maritalStatus: "",
    phone: "",
    password: "",
    confirmPassword: "",
    referrerCode: referralID || "",

    // Step 2: Address
    address: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      district: "",
      postOffice: "",
      pincode: ""
    },

    // Step 4: Bank KYC
    bankKyc: {
      panNumber: "",
      accountHolderName: "",
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      branchName: ""
    },

    // Step 5: User KYC - Multiple Documents
    userKyc: {
      documentType: "",
      documentNumber: "",
      documentFront: null,
      documentBack: null
    }

  });

  const navigate = useNavigate();
  const { fetchData } = useAxios();

  const steps = [
    { number: 1, title: "Basic Information", icon: User },
  ];

  const documentTypes = [
    "Aadhar Card",
    "PAN Card",
    "Driving License",
    "Passport",
    "Voter ID",
    "Bank Passbook",
    "Utility Bill",
    "Ration Card"
  ];

  // Check referral code validity
  const checkReferralCode = async (code) => {
    try {
      setCheckingReferral(true);
      const res = await fetchData({
        url: `/api/v1/user/auth/get-refrrer-name?referralCode=${code}`,
      });

      if (res.success) {
        setReferrerName(res.data.name || projectDetails.verifiedUser);
        setFieldErrors((prev) => ({ ...prev, referrerCode: "" }));
      } else {
        setFieldErrors((prev) => ({
          ...prev,
          referrerCode: projectDetails.errors.invalidReferralCode,
        }));
        setReferrerName("");
      }
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        referrerCode: error?.message || projectDetails.errors.networkError,
      }));
      setReferrerName("");
    } finally {
      setCheckingReferral(false);
    }
  };

  const handleInputChange = (section, field, value) => {
    if (section === "userKyc") {
      // Single document, no array
      setFormData(prev => ({
        ...prev,
        userKyc: {
          ...prev.userKyc,
          [field]: value
        }
      }));
    } else if (section) {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));

      // Auto-check referral code when it's 7 characters
      if (field === "referrerCode" && value.length >= 7) {
        checkReferralCode(value);
      }
    }
  };


  const addDocument = () => {
    setFormData(prev => ({
      ...prev,
      userKyc: {
        ...prev.userKyc,
        documents: [
          ...prev.userKyc.documents,
          {
            documentType: "",
            documentNumber: "",
            documentFront: null,
            documentBack: null
          }
        ]
      }
    }));
  };

  const removeDocument = (index) => {
    if (formData.userKyc.documents.length > 1) {
      setFormData(prev => ({
        ...prev,
        userKyc: {
          ...prev.userKyc,
          documents: prev.userKyc.documents.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const validateStep = (step) => {
    const errors = {};

    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.email.match(projectDetails.patterns.email)) errors.email = "Invalid email";
        if (!formData.phone.match(projectDetails.patterns.phone)) errors.phone = "Invalid phone";
        if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
        if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords don't match";
        if (!formData.referrerCode.trim()) errors.referrerCode = "Referral code is required";
        if (formData.referrerCode.length < 7) errors.referrerCode = "Referral code must be 7 characters";
        break;

    }

    console.log("Validation errors:", errors);
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    console.log("handleNext called", { currentStep, otpSent, otp });
    
    if (!validateStep(currentStep)) {
      console.log("Validation failed", fieldErrors);
      return;
    }
    
    // If email is filled and OTP not sent, send OTP first
    if (formData.email && !otpSent) {
      console.log("Sending OTP...");
      sendOTP();
    } else if (otpSent && !otp) {
      console.log("OTP required");
      setFieldErrors({ otp: "Please enter OTP" });
    } else {
      console.log("Submitting form...");
      handleSubmit();
    }
  };

  const sendOTP = async () => {
    try {
      setSendingOtp(true);
      console.log("Sending OTP to email:", formData.email);
      
      const res = await fetchData({
        url: "/api/v1/user/auth/send-email-otp",
        method: "POST",
        data: { email: formData.email }
      });

      console.log("OTP Response:", res);

      if (res.success) {
        setOtpSent(true);
        toast.success("OTP sent to your email");
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("OTP Error:", error);
      toast.error(error.message || "Failed to send OTP");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFileUpload = (field, file, index = 0) => {
    handleInputChange("userKyc", field, file, index);
  };

  const prepareFormData = () => {
    const data = new FormData();

    data.append("email", formData.email)

    // Step 1: Basic fields (non-nested)
    Object.keys(formData).forEach(key => {
      if (
        key !== "address" &&
        key !== "bankKyc" &&
        key !== "userKyc" &&
        key !== "confirmPassword"
      ) {
        if (formData[key] !== null && formData[key] !== undefined && formData[key] !== "") {
          data.append(`userData[${key}]`, formData[key]);
        }
      }
    });

    // Step 2: Nested objects (address, bankKyc)
    ["address", "bankKyc"].forEach(section => {
      Object.keys(formData[section]).forEach(field => {
        if (formData[section][field]) {
          data.append(`userData[${section}][${field}]`, formData[section][field]);
        }
      });
    });

    // Step 3: Multiple documents (userKyc)
    if (formData.userKyc.documentType) {
      data.append(`userData[userKyc][documentType]`, formData.userKyc.documentType);
    }
    if (formData.userKyc.documentNumber) {
      data.append(`userData[userKyc][documentNumber]`, formData.userKyc.documentNumber);
    }
    if (formData.userKyc.documentFront) {
      data.append(`documentFront`, formData.userKyc.documentFront);
    }
    if (formData.userKyc.documentBack) {
      data.append(`documentBack`, formData.userKyc.documentBack);
    }

    return data;
  };




  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!validateStep(currentStep)) return;
    if (!otp) {
      setFieldErrors({ otp: "Please enter OTP" });
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = prepareFormData();
      formDataToSend.append("otp", otp);

      console.log("Submitting registration with data:");
      // Log FormData contents
      for (let pair of formDataToSend.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await fetchData({
        url: endpoints.register,
        method: "POST",
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Registration Response:", res);

      if (res.success) {
        const user = res.data?.user;
        toast.success(user?.userId ? `Registration successful! User ID: ${user.userId}. Login credentials sent to your email.` : res.message);
        navigate("/", {
          state: {
            userdata: user,
            fromSignup: true,
          },
        });
      }

      if (res.success === false) {
        toast.error(res.message);

      }
    } catch (error) {
      console.error("Registration Error:", error);
      showErrorToast(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep
          formData={formData}
          onChange={handleInputChange}
          errors={fieldErrors}
          checkingReferral={checkingReferral}
          referrerName={referrerName}
          referalID={referralID}
          otpSent={otpSent}
          otp={otp}
          setOtp={setOtp}
          sendingOtp={sendingOtp}
          onResendOtp={sendOTP}
        />;
      // +
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Complete Your Registration
          </h1>

        </div>



        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
          <form onSubmit={(e) => e.preventDefault()}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                title={otpSent ? (loading ? "Registering..." : "Complete Registration") : (sendingOtp ? "Sending OTP..." : "Send OTP & Continue")}
                onClick={handleNext}
                disabled={loading || sendingOtp}
                loading={loading || sendingOtp}
                className="flex items-center gap-2 w-full"
              />
            </div>
                 
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-gray-600 text-sm">
                  Already Registered?{" "}
                  <NavLink
                    to="/"
                    className="font-medium transition-colors duration-200 hover:underline"
                    style={{ color: defaultStylesSidebar.cardbg, fontWeight: "600" }}
                  >
                    login
                  </NavLink>
                </p>
              </div>
   
          </form>
        </div>
      </div>
    </div>
  );
};

// Step Components
const BasicInfoStep = ({ formData, onChange, errors, checkingReferral, referrerName, referalID, otpSent, otp, setOtp, sendingOtp, onResendOtp }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {/* Referral Code - Now Required */}
    <div className="md:col-span-2">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Referral Code *
      </label>
      <input
        type="text"
        value={formData.referrerCode}
        onChange={(e) => {
          const value = e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
          onChange(null, "referrerCode", value);
        }}
        disabled={referalID}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
        placeholder="Enter referral code (7 characters)"
        maxLength={8}
      />
      {checkingReferral && (
        <p className="text-sm text-blue-600 mt-2 flex items-center">
          <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></span>
          Verifying referral code...
        </p>
      )}
      {referrerName && (
        <p className="text-sm text-green-600 mt-2 flex items-center">
          <CheckCircle size={16} className="mr-1" />
          Referred by: {referrerName}
        </p>
      )}
      {errors.referrerCode && (
        <p className="text-red-500 text-sm mt-1">{errors.referrerCode}</p>
      )}
    </div>

    <div className="grid grid-cols-2 gap-4">
      {/* Title dropdown */}
      {/* Full name input */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => onChange(null, "name", e.target.value)}
          className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
      <select
        value={formData.gender}
        onChange={(e) => onChange(null, "gender", e.target.value)}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
      <input
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => onChange(null, "dateOfBirth", e.target.value)}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
      <input
        type="email"
        value={formData.email}
        onChange={(e) => onChange(null, "email", e.target.value)}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
        placeholder="Enter your email"
        disabled={otpSent}
      />
      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
    </div>

    {/* OTP Field - Show after OTP is sent */}
    {otpSent && (
      <div className="md:col-span-2">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Enter OTP *
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            className="flex-1 px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
            placeholder="Enter 6-digit OTP"
            maxLength={6}
          />
          <button
            type="button"
            onClick={onResendOtp}
            disabled={sendingOtp}
            className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 disabled:opacity-50"
          >
            {sendingOtp ? "Sending..." : "Resend"}
          </button>
        </div>
        {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
        <p className="text-sm text-gray-600 mt-2">
          OTP sent to {formData.email}
        </p>
      </div>
    )}

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Marital Status</label>
      <select
        type="text"
        value={formData.maritalStatus}
        onChange={(e) => onChange(null, "maritalStatus", e.target.value)}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
      >
        <option value="">Select </option>
        <option value="Married">Married</option>
        <option value="Unmarried">Unmarried</option>

      </select>
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone *</label>
      <input
        type="tel"
        value={formData.phone}
        onChange={(e) => onChange(null, "phone", e.target.value.replace(/\D/g, ""))}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
        placeholder="Enter your phone number"
        maxLength={10}
      />
      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
      <input
        type="password"
        value={formData.password}
        onChange={(e) => onChange(null, "password", e.target.value)}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
        placeholder="Create password"
      />
      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
      <input
        type="password"
        value={formData.confirmPassword}
        onChange={(e) => onChange(null, "confirmPassword", e.target.value)}
        className="w-full px-4 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500"
        placeholder="Confirm password"
      />
      {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
    </div>
  </div>
);


export default MultiStepSignup;
