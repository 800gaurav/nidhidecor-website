import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, CheckCircle, Edit3, UserCheck, Shield, BanknoteIcon, X } from 'lucide-react';

// Adjust path as needed
import useAxios from '../../../../utils/useAxios';
import apiRoutes from '../../../../variables/apiRoutes';
import { imageUrl } from '../../../../utils';
import { showSuccessToast } from '../../../../component/toaster';
import Button from '../../../../component/wrapper/Button';

// KYC Form Component
const KYCForm = ({ initialData, onSubmit, isSubmitting, onCancel }) => {
    const [formData, setFormData] = useState({
        bankDetails: {
            accountNumber: initialData?.bankDetails?.accountNumber || '',
            ifsc: initialData?.bankDetails?.ifsc || '',
            bankName: initialData?.bankDetails?.bankName || ''
        },
        aadharFront: null,
        aadharBack: null,
        panCard: null,
        bankPassbook: null
    });

    const [previews, setPreviews] = useState({
        aadharFront: initialData?.aadharFront || null,
        aadharBack: initialData?.aadharBack || null,
        panCard: initialData?.panCard || null,
        bankPassbook: initialData?.bankPassbook || null
    });

    const [files, setFiles] = useState({
        aadharFront: null,
        aadharBack: null,
        panCard: null,
        bankPassbook: null
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('bankDetails.')) {
            const field = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                bankDetails: {
                    ...prev.bankDetails,
                    [field]: value
                }
            }));
        }
    };

    const handleFileChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setFiles(prev => ({
                ...prev,
                [field]: file
            }));

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews(prev => ({
                    ...prev,
                    [field]: e.target.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData for file upload
        const submitData = new FormData();
        submitData.append('accountNumber', formData.bankDetails.accountNumber);
        submitData.append('ifsc', formData.bankDetails.ifsc);
        submitData.append('bankName', formData.bankDetails.bankName);

        if (files.aadharFront) submitData.append('aadharFront', files.aadharFront);
        if (files.aadharBack) submitData.append('aadharBack', files.aadharBack);
        if (files.panCard) submitData.append('panCard', files.panCard);
        if (files.bankPassbook) submitData.append('bankPassbook', files.bankPassbook);

        onSubmit(submitData);
    };

    const removeFile = (field) => {
        setFiles(prev => ({
            ...prev,
            [field]: null
        }));
        setPreviews(prev => ({
            ...prev,
            [field]: null
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bank Details Section */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                    <BanknoteIcon className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Bank Details</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Account Number *
                        </label>
                        <input
                            type="text"
                            name="bankDetails.accountNumber"
                            value={formData.bankDetails.accountNumber}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            placeholder="Enter your account number"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            IFSC Code *
                        </label>
                        <input
                            type="text"
                            name="bankDetails.ifsc"
                            value={formData.bankDetails.ifsc}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            placeholder="Enter IFSC code"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Bank Name *
                        </label>
                        <input
                            type="text"
                            name="bankDetails.bankName"
                            value={formData.bankDetails.bankName}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                            placeholder="Enter bank name"
                        />
                    </div>
                </div>
            </div>

            {/* Document Upload Section */}
            <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">Document Verification</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Aadhar Front */}
                    <DocumentUpload
                        title="Aadhar Card Front *"
                        field="aadharFront"
                        preview={previews.aadharFront}
                        onChange={handleFileChange}
                        onRemove={removeFile}
                        existingFile={initialData?.aadharFront}
                    />

                    {/* Aadhar Back */}
                    <DocumentUpload
                        title="Aadhar Card Back *"
                        field="aadharBack"
                        preview={previews.aadharBack}
                        onChange={handleFileChange}
                        onRemove={removeFile}
                        existingFile={initialData?.aadharBack}
                    />

                    {/* PAN Card */}
                    <DocumentUpload
                        title="PAN Card *"
                        field="panCard"
                        preview={previews.panCard}
                        onChange={handleFileChange}
                        onRemove={removeFile}
                        existingFile={initialData?.panCard}
                    />

                    {/* Bank Passbook (Optional) */}
                    <DocumentUpload
                        title="Bank Passbook (Optional)"
                        field="bankPassbook"
                        preview={previews.bankPassbook}
                        onChange={handleFileChange}
                        onRemove={removeFile}
                        existingFile={initialData?.bankPassbook}
                        required={false}
                    />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-300 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-400 transition-colors"
                >
                    Cancel
                </button>

                <Button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    title={isSubmitting ? 'Submitting...' : initialData ? "Update KYC": 'Submit KYC'}
                    rightIcon={<UserCheck className="w-5 h-5" />}
                    style={{
                        maxWidth:"10em"
                    }}

                />
                {/* <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-8 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                            Submitting...
                        </>
                    ) : (
                        <>
                            <UserCheck className="w-5 h-5" />
                            {initialData ? 'Update KYC' : 'Submit KYC'}
                        </>
                    )}
                </motion.button> */}
            </div>
        </form>
    );
};

// Document Upload Component
const DocumentUpload = ({ title, field, preview, onChange, onRemove, existingFile, required = true }) => {
    const isExistingFile = !preview?.startsWith('data:') && existingFile;
    const fileUrl = isExistingFile ? imageUrl(existingFile) : preview;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
                {title}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id={field}
                    onChange={(e) => onChange(e, field)}
                    required={required && !fileUrl}
                />

                {fileUrl ? (
                    <div className="relative">
                        <img
                            src={fileUrl}
                            alt={title}
                            className="mx-auto max-h-40 rounded-lg shadow-sm"
                        />
                        <div className="absolute -top-2 -right-2 flex gap-1">
                            <label
                                htmlFor={field}
                                className="bg-blue-600 text-white rounded-full p-1 cursor-pointer hover:bg-blue-700 transition-colors"
                            >
                                <Edit3 className="w-4 h-4" />
                            </label>
                            {!isExistingFile && (
                                <button
                                    onClick={() => onRemove(field)}
                                    className="bg-red-600 text-white rounded-full p-1 cursor-pointer hover:bg-red-700 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        {isExistingFile && (
                            <div className="text-xs text-green-600 mt-2">Previously uploaded</div>
                        )}
                    </div>
                ) : (
                    <label htmlFor={field} className="cursor-pointer flex flex-col items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                            <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">Click to upload</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                    </label>
                )}
            </div>
        </div>
    );
};

// KYC Status Component
const KYCStatus = ({ status, onEdit }) => {
    const statusConfig = {
        pending: {
            color: 'text-yellow-600 bg-yellow-100',
            text: 'Under Review',
            icon: <Shield className="w-5 h-5" />
        },
        approved: {
            color: 'text-green-600 bg-green-100',
            text: 'Verified',
            icon: <CheckCircle className="w-5 h-5" />
        },
        rejected: {
            color: 'text-red-600 bg-red-100',
            text: 'Rejected',
            icon: <Shield className="w-5 h-5" />
        },
        not_submitted: {
            color: 'text-gray-600 bg-gray-100',
            text: '',
            icon: <Shield className="w-5 h-5" />
        }
    };

    const config = statusConfig[status] || statusConfig.not_submitted;

    return (
        <div className="bg-white rounded-xl p-6 shadow-md mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                        {config.icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-800">KYC Details</h3>
                        <p className={`text-sm ${config.color.split(' ')[0]}`}>
                            {config.text}
                        </p>
                    </div>
                </div>

                {status !== 'approved' && (
                    <button
                        onClick={onEdit}
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <Edit3 className="w-4 h-4" />
                        {status === 'not_submitted' ? 'Submit KYC' : 'Update Details'}
                    </button>
                )}
            </div>
        </div>
    );
};

// Main KYC Page Component
const Kycpage = () => {
    const [kycData, setKycData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { fetchData } = useAxios();

    const getKycDetails = async () => {
        try {
            const res = await fetchData({
                url: apiRoutes.getKyc,
                method: "GET"
            });

            if (res.success) {
                console.log("KYC Data:", res.data);
                setKycData(res.data);
            }
        } catch (error) {
            console.error("Error fetching KYC details:", error);
            // If KYC doesn't exist, set to null
            setKycData(null);
        }
    };

    const submitKyc = async (formData) => {
        setIsSubmitting(true);
        try {
            const res = await fetchData({
                url: apiRoutes.updateKyc, // This should be your KYC create/update endpoint
                method: "POST",
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
            });
            console.log(res)
            if (res.success) {
                console.log("KYC submitted successfully:", res.data);
                showSuccessToast(res.message)
                setKycData(res.data);
                setIsEditing(false);

            } else {
                console.error("Failed to submit KYC:", res.message);
            }
        } catch (error) {
            console.error("Error submitting KYC:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {

        getKycDetails();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">KYC Verification</h1>
                    <p className="text-gray-600">Complete your Know Your Customer verification to access all features</p>
                </motion.div>

                {/* KYC Status */}
                {kycData && (
                    <KYCStatus
                        status={kycData.status || ''}
                        onEdit={handleEdit}
                    />
                )}

                {/* KYC Form or View */}
                {isEditing ? (
                    <KYCForm
                        initialData={kycData}
                        onSubmit={submitKyc}
                        isSubmitting={isSubmitting}
                        onCancel={handleCancel}
                    />
                ) : kycData ? (
                    <div className="bg-white rounded-xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-semibold text-gray-800">Your KYC Details</h3>
                            <button
                                onClick={handleEdit}
                                className="bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                            >
                                <Edit3 className="w-4 h-4" />
                                Edit Details
                            </button>
                        </div>

                        {/* Display KYC details */}
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">Account Number</h4>
                                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{kycData.bankDetails.accountNumber}</p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-700 mb-2">IFSC Code</h4>
                                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{kycData.bankDetails.ifsc}</p>
                                </div>
                                <div className="md:col-span-2">
                                    <h4 className="font-medium text-gray-700 mb-2">Bank Name</h4>
                                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{kycData.bankDetails.bankName}</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-700 mb-4">Uploaded Documents</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {kycData.aadharFront && (
                                        <DocumentView title="Aadhar Front" url={kycData.aadharFront} />
                                    )}
                                    {kycData.aadharBack && (
                                        <DocumentView title="Aadhar Back" url={kycData.aadharBack} />
                                    )}
                                    {kycData.panCard && (
                                        <DocumentView title="PAN Card" url={kycData.panCard} />
                                    )}
                                    {kycData.bankPassbook && (
                                        <DocumentView title="Bank Passbook" url={kycData.bankPassbook} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <KYCForm
                        onSubmit={submitKyc}
                        isSubmitting={isSubmitting}
                        onCancel={() => setIsEditing(false)}
                    />
                )}
            </div>
        </div>
    );
};

// Document View Component for showing uploaded documents
const DocumentView = ({ title, url }) => {
    const fullUrl = imageUrl(url)

    return (
        <div className="border border-gray-200 rounded-lg p-4">
            <h5 className="font-medium text-gray-700 mb-2">{title}</h5>
            <img
                src={fullUrl}
                alt={title}
                className="w-full h-40 object-contain rounded-lg"
            />
            <a
                href={fullUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mt-2 inline-block hover:underline"
            >
                View Full Document
            </a>
        </div>
    );
};

export default Kycpage;