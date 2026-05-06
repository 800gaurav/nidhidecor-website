import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import useAxios from '../../utils/useAxios';
import { toast } from 'react-toastify';
import { message } from 'antd';
import { imgBaseUrl } from '../../utils/axiosInstance';
import { defaultStylesSidebar } from '../../constants/colors';

const ViewKyc = () => {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('bank');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Bank KYC state
  const [bankData, setBankData] = useState({
    accountHolderName: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: '',
    panNumber: '',
    pancardPhoto: null,
    passbookPhoto: null,
  });

  // User KYC state
  const [userKycData, setUserKycData] = useState({
    documentType: '',
    documentNumber: '',
    documentFront: null,
    documentBack: null,
  });

  // Document types
  const documentTypes = [
    { value: '', label: 'Select Document Type' },
    { value: 'aadhaar', label: 'Aadhaar Card' },
    { value: 'pan', label: 'PAN Card' },
    { value: 'driving_license', label: 'Driving License' },
    { value: 'passport', label: 'Passport' },
    { value: 'voter_id', label: 'Voter ID' },
  ];

  // Fetch profile
  const getProfile = async () => {
    setloading(true);
    try {
      const res = await fetchData({ url: '/api/v1/user/profile/get-profile' });
      setProfile(res.data);
      console.log(res)
      // Pre-fill Bank KYC
      if (res.data.bankKyc) {
        const { accountHolderName, accountNumber, ifscCode, bankName, branchName, panNumber, pancardPhoto, passbookPhoto } = res.data.bankKyc;
        setBankData({
          accountHolderName: accountHolderName || '',
          accountNumber: accountNumber || '',
          ifscCode: ifscCode || '',
          bankName: bankName || '',
          branchName: branchName || '',
          panNumber: panNumber || '',
          pancardPhoto: pancardPhoto || null,
          passbookPhoto: passbookPhoto || null,
        });
      }

      // Pre-fill User KYC (without images)
      // ✅ Pre-fill User KYC (with images)
      if (res.data.userKyc) {
        const { documentType, documentNumber, documentFront, documentBack } = res.data.userKyc;
        setUserKycData((prev) => ({
          ...prev,
          documentType: documentType || '',
          documentNumber: documentNumber || '',
          documentFront: documentFront || null,
          documentBack: documentBack || null,
        }));
      }

    } catch (err) {
      console.error(err);
    }
    setloading(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Handlers for Bank KYC
  const handleBankChange = (e) => {
    const { name, value, files } = e.target;
  if (files) {
    setBankData((prev) => ({ ...prev, [name]: files[0] }));;
  }else {
    setBankData((prev) => ({ ...prev, [name]: value }));
  }
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const fd = new FormData();
      fd.append('accountHolderName',   bankData.accountHolderName);
      fd.append('accountNumber', bankData.accountNumber);
      fd.append('ifscCode', bankData.ifscCode);
      fd.append('bankName', bankData.bankName);
      fd.append('branchName', bankData.branchName);
      fd.append('panNumber', bankData.panNumber);
      if (bankData.pancardPhoto) fd.append('pancardPhoto', bankData.pancardPhoto);
      if (bankData.passbookPhoto) fd.append('passbookPhoto', bankData.passbookPhoto);
      const res = await fetchData({
        url: '/api/v1/user/auth/bank-kyc',
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // alert('Bank KYC submitted successfully');
      toast('Bank KYC submitted successfully', { type: 'success' });
      setIsSubmitted(true);
      getProfile();
    } catch (err) {
      console.error(err);
      // alert('Error submitting Bank KYC');
      toast(err.message, { type: 'error' });
    }
    setloading(false);
  };

  // Handlers for User KYC
  const handleUserChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setUserKycData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setUserKycData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      const fd = new FormData();
      fd.append('documentType', userKycData.documentType);
      fd.append('documentNumber', userKycData.documentNumber);
      if (userKycData.documentFront) fd.append('documentFront', userKycData.documentFront);
      if (userKycData.documentBack) fd.append('documentBack', userKycData.documentBack);

      const res = await fetchData({
        url: '/api/v1/user/auth/update-kyc',
        method: 'POST',
        data: fd,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // alert('User KYC submitted successfully');
      toast('User KYC submitted successfully', { type: 'success' });
      getProfile();
    } catch (err) {
      console.error(err);
      // alert('Error submitting User KYC');
      toast(err.message, { type: 'error' });
    }
    setloading(false);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Pending' },
      approved: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Approved' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejected' },
      verified: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Verified' },
    };

    const config = statusConfig[status?.toLowerCase()] || { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Not Submitted' };

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.label}
      </span>
    );
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const getEnhancedStatusBadge = (status) => {
    const baseClasses = "px-3 py-1.5 rounded-full text-xs font-medium";

    switch (status) {
      case 'approved':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800 border border-green-200`}>
            ✓ Verified
          </span>
        );
      case 'pending':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800 border border-yellow-200`}>
            ⏳ Pending
          </span>
        );
      case 'rejected':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800 border border-red-200`}>
            ✗ Action Required
          </span>
        );
      default:
        return (
          <span className={`${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`}>
            ○ Not Started
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Verification</h1>
          <p className="text-gray-600">Complete your Know Your Customer verification to access all features</p>
        </div>

        {/* Status Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Bank KYC Card */}
          <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-xl">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Bank Details</h3>
                    <p className="text-sm text-gray-500 mt-1">Verification for withdrawals</p>
                  </div>
                </div>
                {/* <div className="text-right">
                  {getEnhancedStatusBadge(profile.bankKyc?.status)}
                </div> */}
              </div>

              {/* <p className="text-gray-700 mb-6">
                {profile.bankKyc?.status === 'approved'
                  ? 'Your bank details have been verified successfully. You can now make withdrawals from your account.'
                  : profile.bankKyc?.status === 'pending'
                    ? 'Your bank details are currently under review. This process usually takes 1-2 business days.'
                    : 'Complete your bank KYC verification to enable withdrawals from your account.'}
              </p> */}
{/* 
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {profile.bankKyc?.status === 'approved'
                    ? `Verified on ${profile.bankKyc?.verifiedDate || '15 Oct 2023'}`
                    : profile.bankKyc?.status === 'pending'
                      ? 'Estimated completion: 2 days'
                      : 'Not yet started'}
                </span>

              </div> */}
            </div>
          </div>

          {/* Identity Verification Card */}
          <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-teal-600"></div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Identity Verification</h3>
                    <p className="text-sm text-gray-500 mt-1">Document verification</p>
                  </div>
                </div>
                {/* <div className="text-right">
                  {getEnhancedStatusBadge(profile.userKyc?.status)}
                </div> */}
              </div>

              {/* <p className="text-gray-700 mb-6">
                {profile.userKyc?.status === 'approved'
                  ? 'Your identity documents have been successfully verified. All features are now available to you.'
                  : profile.userKyc?.status === 'pending'
                    ? 'Your identity documents are currently being verified. We will notify you once completed.'
                    : 'Upload your identity documents to verify your account and access all platform features.'}
              </p> */}
{/* 
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {profile.userKyc?.status === 'approved'
                    ? `Verified on ${profile.userKyc?.verifiedDate || '12 Oct 2023'}`
                    : profile.userKyc?.status === 'pending'
                      ? 'Estimated completion: 3 days'
                      : 'Not yet started'}
                </span>

            
              </div> */}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('bank')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${activeTab === 'bank'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <BankIcon className="w-5 h-5" />
                  Bank Details
                </div>
              </button>
              <button
                onClick={() => setActiveTab('identity')}
                className={`flex-1 py-4 px-6 text-center font-medium text-sm border-b-2 transition-colors ${activeTab === 'identity'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <IdCardIcon className="w-5 h-5" />
                  Identity Verification
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Bank KYC Form */}
            {activeTab === 'bank' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-blue-600 rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Bank Account Details</h2>
                    <p className="text-gray-600 text-sm">Provide your bank information for withdrawals</p>
                  </div>
                </div>

                <form onSubmit={handleBankSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Holder Name *
                      </label>
                      <input
                        name="accountHolderName"
                        value={bankData.accountHolderName}
                        onChange={handleBankChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter account holder name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Account Number *
                      </label>
                      <input
                        name="accountNumber"
                        value={bankData.accountNumber}
                        onChange={handleBankChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter account number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        IFSC Code *
                      </label>
                      <input
                        name="ifscCode"
                        value={bankData.ifscCode}
                        onChange={handleBankChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter IFSC code"
                      />
                    </div>

              

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Name *
                      </label>
                      <input
                        name="bankName"
                        value={bankData.bankName}
                        onChange={handleBankChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter bank name"
                      />
                    </div>
      <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PAN Number *
                      </label>
                      <input
                        name="panNumber"
                        value={bankData.panNumber}
                        onChange={handleBankChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter PAN number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Branch Name *
                      </label>
                      <input
                        name="branchName"
                        value={bankData.branchName}
                        onChange={handleBankChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter branch name"
                      />
                    </div>
                    
       <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pan Card *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          name="pancardPhoto"
                          onChange={handleBankChange}
                          required
                          className="hidden"
                          id="pancardPhoto"
                          accept="image/*,.pdf"
                        />

                        <label htmlFor="pancardPhoto" className="cursor-pointer">
                          {bankData?.pancardPhoto ? (
                            typeof bankData.pancardPhoto === "string" ? (
                              bankData.pancardPhoto.toLowerCase().endsWith(".pdf") ? (
                                <a
                                  href={`${imgBaseUrl}${bankData?.pancardPhoto}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  View PDF (Front)
                                </a>
                              ) : (
                                <img
                                  src={`${imgBaseUrl}${bankData?.pancardPhoto}`}
                                  alt="Document Front"
                                  className="mx-auto mb-2 w-32 h-20 object-cover rounded-lg border"
                                />
                              )
                            ) : (
                              <p className="text-sm text-gray-600">
                                {bankData.pancardPhoto.name}
                              </p>
                            )
                          ) : (
                            <>
                              <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload PanCard</p>
                            </>
                          )}
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF up to 5MB</p>
                        </label>
                      </div>
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bank Passbook *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          name="passbookPhoto"
                          onChange={handleBankChange}
                          required
                          className="hidden"
                          id="passbookPhoto"
                          accept="image/*,.pdf"
                        />

                        <label htmlFor="passbookPhoto" className="cursor-pointer">
                          {bankData?.passbookPhoto ? (
                            typeof bankData.passbookPhoto === "string" ? (
                              bankData.passbookPhoto.toLowerCase().endsWith(".pdf") ? (
                                <a
                                  href={`${imgBaseUrl}${bankData.passbookPhoto}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  View PDF (Back)
                                </a>
                              ) : (
                                <img
                                  src={`${imgBaseUrl}${bankData.passbookPhoto}`}
                                  alt="Document Back"
                                  className="mx-auto mb-2 w-32 h-20 object-cover rounded-lg border"
                                />
                              )
                            ) : (
                              <p className="text-sm text-gray-600">
                                {bankData.passbookPhoto.name}
                              </p>
                            )
                          ) : (
                            <>
                              <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload Bank Passbook</p>
                            </>
                          )}
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF up to 5MB</p>
                        </label>
                      </div>
                    </div>

                  </div>

                  {!isSubmitted && (
                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        style={{ color: "white", background: defaultStylesSidebar.cardbg }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                      >
                        Submit Bank Details
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Identity Verification Form */}
            {activeTab === 'identity' && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-green-600 rounded-full"></div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Identity Verification</h2>
                    <p className="text-gray-600 text-sm">Upload your identity documents for verification</p>
                  </div>
                </div>

                <form onSubmit={handleUserSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Type *
                      </label>
                      <select
                        name="documentType"
                        value={userKycData.documentType}
                        onChange={handleUserChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        {documentTypes.map((doc) => (
                          <option key={doc.value} value={doc.value}>
                            {doc.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Number *
                      </label>
                      <input
                        name="documentNumber"
                        value={userKycData.documentNumber}
                        onChange={handleUserChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="Enter document number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Front *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          name="documentFront"
                          onChange={handleUserChange}
                          required
                          className="hidden"
                          id="documentFront"
                          accept="image/*,.pdf"
                        />

                        <label htmlFor="documentFront" className="cursor-pointer">
                          {userKycData?.documentFront ? (
                            typeof userKycData.documentFront === "string" ? (
                              userKycData.documentFront.toLowerCase().endsWith(".pdf") ? (
                                <a
                                  href={`${imgBaseUrl}${userKycData.documentFront}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  View PDF (Front)
                                </a>
                              ) : (
                                <img
                                  src={`${imgBaseUrl}${userKycData.documentFront}`}
                                  alt="Document Front"
                                  className="mx-auto mb-2 w-32 h-20 object-cover rounded-lg border"
                                />
                              )
                            ) : (
                              <p className="text-sm text-gray-600">
                                {userKycData.documentFront.name}
                              </p>
                            )
                          ) : (
                            <>
                              <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload front side</p>
                            </>
                          )}
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF up to 5MB</p>
                        </label>
                      </div>
                    </div>


                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Back *
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                        <input
                          type="file"
                          name="documentBack"
                          onChange={handleUserChange}
                          required
                          className="hidden"
                          id="documentBack"
                          accept="image/*,.pdf"
                        />

                        <label htmlFor="documentBack" className="cursor-pointer">
                          {userKycData?.documentBack ? (
                            typeof userKycData.documentBack === "string" ? (
                              userKycData.documentBack.toLowerCase().endsWith(".pdf") ? (
                                <a
                                  href={`${imgBaseUrl}${userKycData.documentBack}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline"
                                >
                                  View PDF (Back)
                                </a>
                              ) : (
                                <img
                                  src={`${imgBaseUrl}${userKycData.documentBack}`}
                                  alt="Document Back"
                                  className="mx-auto mb-2 w-32 h-20 object-cover rounded-lg border"
                                />
                              )
                            ) : (
                              <p className="text-sm text-gray-600">
                                {userKycData.documentBack.name}
                              </p>
                            )
                          ) : (
                            <>
                              <UploadIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                              <p className="text-sm text-gray-600">Click to upload back side</p>
                            </>
                          )}
                          <p className="text-xs text-gray-500 mt-1">JPG, PNG, PDF up to 5MB</p>
                        </label>
                      </div>
                    </div>


                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <InfoIcon className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 mb-1">Verification Guidelines</h4>
                        <ul className="text-xs text-blue-800 space-y-1">
                          <li>• Ensure documents are clear and all details are visible</li>
                          <li>• File size should not exceed 5MB per document</li>
                          <li>• Accepted formats: JPG, PNG, PDF</li>
                          <li>• Documents should be valid and not expired</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className=" text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                      style={{ background: defaultStylesSidebar.cardbg, color: defaultStylesSidebar.cardtext }}
                    >
                      Submit for Verification
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info */}

      </div>
    </div>
  );
};

// Icon Components
const BankIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
);

const IdCardIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
  </svg>
);

const UploadIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
  </svg>
);

const InfoIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);



export default ViewKyc;