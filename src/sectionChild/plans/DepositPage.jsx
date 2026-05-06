// components/DepositPage.jsx
import React, { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import apiRoutes from "../../variables/apiRoutes";
import useAxios from "../../utils/useAxios";
import { imageUrl } from "../../utils";
import Button from "../../component/wrapper/Button";
import { imgBaseUrl } from "../../utils/axiosInstance";

const DepositPage = () => {
  const { data: payInfoData, fetchData, loading } = useAxios();
  console.log(payInfoData.qrCode, "dsfjosidjfodsfji")
  const { data: historyData, fetchData: fetchHistory, loading: historyLoading } = useAxios();

  const [uploadedScreenshot, setUploadedScreenshot] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [txnId, setTxnId] = useState("");

  // 📌 Get QR info
  const getPaymentInf = async () => {
    await fetchData({ url: apiRoutes.paymentInfo });
  };

  // 📌 Get Deposit History
  const getDepositHistory = async () => {
    await fetchHistory({ url: apiRoutes.depositHistory });
  };

  useEffect(() => {
    getPaymentInf();
    getDepositHistory();
  }, []);

  // 📌 Screenshot Upload
  const handleScreenshotUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(file);
      setUploadedScreenshot(URL.createObjectURL(file));
    }
  };

  // 📌 Submit Deposit Request
  const submitPaymentRequest = async () => {
    try {
      const formData = new FormData();
      formData.append("screenshot", uploadedImage);
      formData.append("txnId", txnId);

      await fetchData({
        url: apiRoutes.buyPlan,
        method: "POST",
        data: formData,
      });


      getDepositHistory();
      setUploadedScreenshot(null);
      setUploadedImage(null);
      setTxnId("");
    } catch (error) {
      console.error("Error submitting payment request:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Deposit Payment
      </h2>

      {/* QR Code Section */}
      <div className="text-center">
        <p className="text-gray-600 mb-4 font-medium">
          Scan the QR code using your UPI app
        </p>
        <div className="bg-white p-5 rounded-xl border border-gray-200 inline-block shadow-sm">
          <div className="w-48 h-48 flex items-center justify-center mx-auto">
            {payInfoData?.qrCode ? (
              <img
                // src={imgBaseUrl(payInfoData?.qrCode)}
                src={`${imgBaseUrl}/${payInfoData.qrCode}`}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400 text-sm">Loading QR...</span>
            )}
          </div>
        </div>
      </div>

      {/* Upload + Txn ID */}
      <div className="space-y-4">
        {/* Upload Screenshot */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Payment Screenshot <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
            {uploadedScreenshot ? (
              <div className="relative">
                <img
                  src={uploadedScreenshot}
                  alt="Payment screenshot"
                  className="mx-auto max-h-40 rounded shadow-sm"
                />
                <button
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setUploadedScreenshot(null);
                    setUploadedImage(null);
                  }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                  <Upload className="w-6 h-6 text-blue-500" />
                </div>
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload screenshot
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG up to 5MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleScreenshotUpload}
                />
              </label>
            )}
          </div>
        </div>

        {/* Transaction ID */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Transaction ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={txnId}
            onChange={(e) => setTxnId(e.target.value)}
            placeholder="Enter UPI Transaction ID"
            className="w-full border rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit */}
        <Button
          title={loading ? "Submitting..." : "Submit Payment Request"}
          type="button"
          onClick={submitPaymentRequest}
          disabled={!uploadedScreenshot || !txnId}
          loading={loading}
        />
      </div>

      {/* Deposit History */}
      <div className="mt-10">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Deposit History
        </h3>
        {historyLoading ? (
          <p className="text-gray-500">Loading history...</p>
        ) : historyData?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm">
                <tr>
                  <th className="px-4 py-2 border">Txn ID</th>
                  <th className="px-4 py-2 border">Amount</th>
                  <th className="px-4 py-2 border">Status</th>
                  <th className="px-4 py-2 border">Date</th>
                </tr>
              </thead>
              <tbody>
                {historyData.map((item) => (
                  <tr key={item._id} className="text-sm text-gray-600">
                    <td className="px-4 py-2 border">{item.txnId}</td>
                    <td className="px-4 py-2 border">₹{item.amount}</td>
                    <td className="px-4 py-2 border">{item.status}</td>
                    <td className="px-4 py-2 border">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No deposits yet</p>
        )}
      </div>
    </div>
  );
};

export default DepositPage;
