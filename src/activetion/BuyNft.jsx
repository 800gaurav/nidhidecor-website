import React, { useEffect, useState } from 'react';
import Usernav from '../pages/dashboard/users/Usernav';
import useAxios from '../utils/useAxios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BuyNft = () => {

  const [allNfts, setAllNfts] = useState([]);
  const [data, setData] = useState([]);
  const [filteredNfts, setFilteredNfts] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [loadingNftId, setLoadingNftId] = useState(null);
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('all');
const navigate = useNavigate()
 const {loading, setloading} = useAuth();
  const { fetchData } = useAxios();
  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;
  const userId = user?.userId;
  const fetchNFTData = async () => {
    try {
       
      const res = await fetchData({
        // url: `/api/v1/user/profile/user-dashboard/${userId}`,
      });
      setData(res.data || {});
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }
  };

  const fetchNft = async () => {
    try {
      setloading(true)
      const res = await fetchData({ url: '/api/v1/admin/nft/', method: 'GET' });
      setAllNfts(res.data);
      setFilteredNfts(res.data);
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  };

  useEffect(() => {
    fetchNft();
    fetchNFTData();
  }, []);

  const filterAndSortNfts = () => {
    let filtered = [...allNfts];

    if (priceFilter.trim() !== '') {
      const price = parseFloat(priceFilter);
      filtered = filtered.filter((nft) => nft.price === price);
    }

    if (sortOrder === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredNfts(filtered);
  };

  useEffect(() => {
    filterAndSortNfts();
  }, [priceFilter, sortOrder, allNfts]);



  return (
    <div className="bg-black min-h-screen text-white">
      <Usernav />
      <div className="p-4 mt-15  flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-lime-400">Buy NFT</h1>
        <div className="flex gap-2 bg-white items-center">
          <input
            type="number"
            placeholder="Search by Price"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-3 py-1 text-black rounded"
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="text-black px-3 py-1 rounded"
          >
            <option value="all">Default</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>
        </div>
      </div>

      {!showModal && (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredNfts.length > 0 ? (
            filteredNfts.map((nft) => (
              <div
                key={nft._id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 shadow-md hover:shadow-xl transition"
              >
                <img src={nft.image} alt={nft.title} className="w-full h-48 object-cover" />
                <div className="p-3">
                  <h2 className="text-lg font-bold text-lime-400">{nft.title}</h2>
                  <p className="text-sm text-gray-300 mb-2">{nft.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">${nft.price}</span>
                    <button
                      onClick={() => navigate(`activation/nft/${nft.price}`)}
                     
                      className="bg-lime-400 text-black px-3 py-1 rounded hover:bg-lime-300 font-semibold text-sm"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">No NFTs found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BuyNft;
