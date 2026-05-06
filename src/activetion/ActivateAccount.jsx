import React, { useEffect, useState } from 'react';
import Usernav from '../pages/dashboard/users/Usernav';
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ActivateAccount = () => {
  const [allNfts, setAllNfts] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [userIdInput, setUserIdInput] = useState('');
  const [txnPass, setTxnPass] = useState('');
  const [buyOtp, setBuyOtp] = useState('');
  const [loadingNftId, setLoadingNftId] = useState(null);

  const [Data, setData] = useState({})
  const [selectedExchange, setSelectedExchange] = useState('');
  const [showExchangeSelector, setShowExchangeSelector] = useState(false);
  const { loading, setloading } = useAuth();
  const { fetchData } = useAxios();
  const { price } = useParams();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;

  const fetchbalancData = async () => {
    try {
      setloading(true)
      const res = await fetchData({
        // url: `/api/v1/user/profile/user-dashboard/${userId}`,
      });
      setData(res.data || {});
      setloading(false)
    } catch (error) {
      console.error("Error fetching NFT data:", error);
      setloading(false)
    }
  };
  useEffect(() => {
    fetchbalancData()
  }, [])

  const fetchNfts = async () => {
    try {
      setloading(true)
      const res = await fetchData({
        url: `/api/v1/admin/nft/show-nft-price-wise?price=${price}`,
        method: 'GET'
      });
      setAllNfts(res.data || []);
      setloading(false)
    } catch (error) {
      console.error(error);
      setloading(false)
    }
  };

  useEffect(() => {
    fetchNfts();
  }, [price]);

  const handleViewClick = async (nft) => {

    setSelectedNFT(nft);
    setShowExchangeSelector(true);
  };

  const selectExchange = async (exchange) => {
    try {
      setloading(true)
      await fetchData({
        url: `/api/v1/user/nft/purchase/send-otp-buy-nft/${userId}`,
        method: 'POST',
        data: { nftId: selectedNFT._id },
      });
      setSelectedExchange(exchange);
      toast.success('OTP sent to your email');

      setShowExchangeModal(true);
      setloading(false)
    } catch (error) {

      toast.error(error.message);
      setloading(false)
    } finally {

      setShowExchangeSelector(false);
      setloading(false)
    }
  };

  const handleConfirmBuy = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const res = await fetchData({
        url: '/api/v1/user/nft/purchase/buy-nft',
        method: 'POST',
        data: {
          nftId: selectedNFT?._id,
          otp: buyOtp,
          txnpass: txnPass,
          userId: userIdInput,
        },
      });
      if (res.success) {
        toast.success('NFT purchased successfully');
        setShowExchangeModal(false);
        setSelectedNFT(null);
        fetchNfts();
        setloading(false)
      }
    } catch (error) {
      toast.error(error.message);
      setloading(false)
    } finally {
      setloading(false)
    }
  };

  return (
    <div className="bg-black min-h-screen text-white mt-15">
      <Usernav />
      <div className="bg-gray-900 p-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-lime-400">NFT Marketplace</h1>
        <p className="text-white">Wallet: ${Data?.fundBalance || '0.00'}</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allNfts.map((nft) => (
          <div key={nft._id} className="bg-gradient-to-b from-gray-800 to-black rounded-xl border border-gray-700 overflow-hidden shadow-lg hover:shadow-lime-400 transition">
            <img src={nft.image} alt={nft.title} className="w-full h-64 object-cover" />
            <div className="p-4 space-y-3">
              <h3 className="text-xl font-bold text-white">{nft.title}</h3>
              <p className="text-sm text-gray-400">{nft.description}</p>
              <div className="flex justify-between items-center">
                <div className="text-lg font-bold text-lime-400">${nft.price}</div>
                <button
                  onClick={() => handleViewClick(nft)}
                  // disabled={loadingNftId === nft._id}
                  className={`bg-lime-400 text-black font-bold py-2 px-5 rounded transition ${loadingNftId === nft._id ? 'opacity-50 cursor-not-allowed' : 'hover:bg-lime-300'}`}
                >
                  Buy Now

                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showExchangeSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0d1117] border-2 border-yellow-400 rounded-xl p-6 max-w-md w-full text-center">
            <h2 className="text-white text-xl font-bold mb-4">Select NFT Exchange</h2>
            <p className="text-gray-400 mb-6">Choose an exchange to continue your NFT purchase.</p>
            <div className="flex flex-col gap-4">
              {['Binance', 'Coinbase', 'OpenSea'].map((exchange) => (
                <button
                  disabled={loading}
                  key={exchange}
                  onClick={() => selectExchange(exchange)}
                  className="bg-lime-400 hover:bg-lime-300 text-black font-bold py-2 rounded"
                >

                  ${exchange} NFT Marketplace

                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showExchangeModal && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#0d1117] border-2 border-lime-500 rounded-xl w-full max-w-xl p-6 relative">
            <button
              onClick={() => setShowExchangeModal(false)}
              className="absolute top-2 right-4 text-white text-2xl hover:text-red-500"
            >
              &times;
            </button>
            <div className="text-center">
              <div className="text-center text-sm text-gray-300 mb-1">
                Main BALANCE : <span className="text-white">{Data?.walletBalance || 0}$</span><br />
                Fund BALANCE : <span className="text-white">{Data?.fundBalance || 0}$</span>
              </div>
              <h2 className="text-lime-400 font-bold text-2xl mb-2">Buy from {selectedExchange} NFT Marketplace</h2>
              <img src={selectedNFT.image} alt={selectedNFT.title} className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-700" />
              <h3 className="text-white text-xl font-semibold">{selectedNFT.title}</h3>
              <p className="text-gray-400 mb-4">{selectedNFT.description}</p>
            </div>
            <form onSubmit={handleConfirmBuy} className="space-y-4">
              <input
                type="text"
                placeholder="User ID"
                value={userIdInput}
                onChange={(e) => setUserIdInput(e.target.value)}
                className="w-full bg-white text-black py-2 px-4 rounded"
              />
              <input
                type="text"
                value={`$${selectedNFT.price}`}
                readOnly
                className="w-full bg-gray-800 text-white py-2 px-4 rounded"
              />
              <input
                type="text"
                placeholder="Enter OTP"
                value={buyOtp}
                onChange={(e) => setBuyOtp(e.target.value)}
                className="w-full bg-white text-black py-2 px-4 rounded"
              />
              <input
                type="password"
                placeholder="Transaction Password"
                value={txnPass}
                onChange={(e) => setTxnPass(e.target.value)}
                className="w-full bg-white text-black py-2 px-4 rounded"
              />
              <button
                type="submit"
                className="w-full bg-lime-400 text-black font-bold py-2 rounded hover:bg-lime-300"
              >
                Confirm Purchase
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivateAccount;
