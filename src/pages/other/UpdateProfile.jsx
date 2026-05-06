  import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { Users } from 'lucide-react';
import useAxios from '../../utils/useAxios';
import Usernav from '../dashboard/users/Usernav';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import AuthWrapper from '../../component/wrapper/AuthWrapper';
import Button from '../../component/wrapper/Button';

const UpdateProfile = () => {
  const { fetchData } = useAxios();
  const { setloading } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    txnpass: "",
    withdrawTRC_ADDRESS: "",
    withdrawBEP_ADDRESS: ""
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setloading(true)
      try {
        const res = await fetchData({
          url: `/api/v1/user/auth/get-profile`,
          method: "GET"
        });
        setProfile({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          txnpass: "",
          withdrawTRC_ADDRESS: res.data.withdrawTRC_ADDRESS || "",
          withdrawBEP_ADDRESS: res.data.withdrawBEP_ADDRESS || ""
        });
        setloading(false)
      } catch (err) {
        toast.error("Failed to load profile.");
        console.error(err);
        setloading(false)
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, txnpass, withdrawTRC_ADDRESS, withdrawBEP_ADDRESS } = profile;

    if (!name || !email || !phone) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setloading(true)
      const res = await fetchData({
        url: `/api/v1/user/auth/update-profile`,
        method: "POST",
        data: profile
      });

      toast.success("✅ Profile updated successfully!");
      setloading(false)
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
      setloading(false)
    }
  };

  return (

    <AuthWrapper
      showHeadicon={false}
      title="Update Profile"
      subtitle="Keep your account information up to date"
      width={500} // max-width for desktop
    >


      {/* <Usernav /> */}



      {/* Form Content */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="relative">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Mobile Number"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* TRC20 Address */}
        <div className="relative">
          <input
            type="text"
            name="withdrawTRC_ADDRESS"
            value={profile.withdrawTRC_ADDRESS === "0" ? "" : profile.withdrawTRC_ADDRESS}
            onChange={handleChange}
            placeholder="Enter USDT.TRC20 Address"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* BEP20 Address */}
        <div className="relative">
          <input
            type="text"
            name="withdrawBEP_ADDRESS"
            value={profile.withdrawBEP_ADDRESS === "0" ? "" : profile.withdrawBEP_ADDRESS}
            onChange={handleChange}
            placeholder="Enter USDT.BEP20 Address"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* Transaction Password */}
        <div className="relative">
          <input
            type="password"
            name="txnpass"
            value={profile.txnpass}
            onChange={handleChange}
            placeholder="Transaction Password"
            className="w-full pl-4 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all"
          />
        </div>

        {/* Submit Button */}
        {/* <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 rounded-xl transition-all"
        >
          Update Profile
        </button> */}

        <Button
          type="submit"
          // disabled={loading}
          title="Update Profile"
          // loading={loading}
          className="w-full"
        />
      </form>


    </AuthWrapper>
  );
};

export default UpdateProfile;