import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAxios from '../../utils/useAxios';
import Usernav from '../dashboard/users/Usernav';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff, FiLock, FiShield } from 'react-icons/fi';
import AuthWrapper from '../../component/wrapper/AuthWrapper';
import Button from '../../component/wrapper/Button';

const ChangeTNXpassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetchData } = useAxios();

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmNewPassword) {
      toast.error('All fields are required!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('New password and confirm password do not match!');
      return;
    }

    try {
      setLoading(true);
      const res = await fetchData({
        url: `/api/v1/user/auth/change-txn-password`,
        method: 'POST',
        data: {
          newTxnPassword: newPassword,
          confirmNewTxnPassword: confirmNewPassword,
        },
      });

      if (res.success) {
        toast.success('✅ Transaction password changed successfully!');
        setNewPassword('');
        setConfirmNewPassword('');
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (

    <AuthWrapper
      showHeadicon={false}
      title="Change Transaction Password"
      subtitle="Secure your transactions with a new password"
      width={500} // max-width for desktop
    >
      {/* Background decorative elements */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-400/10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div> */}

      {/* <Usernav /> */}
      <form className="space-y-4" onSubmit={handleChangePassword}>
        {/* New Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showNewPassword ? "text" : "password"}
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Transaction Password"
            className="w-full pl-10 pr-12 py-3 rounded-xl 
                 border border-gray-300 
                 bg-white/15 backdrop-blur-sm 
                 text-gray-900 dark:bg-black/25 dark:text-white 
                 focus:outline-none focus:ring-2 focus:ring-green-400 
                 focus:border-green-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            required
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            className="w-full pl-10 pr-12 py-3 rounded-xl 
                 border border-gray-300 
                 bg-white/15 backdrop-blur-sm 
                 text-gray-900 dark:bg-black/25 dark:text-white 
                 focus:outline-none focus:ring-2 focus:ring-green-400 
                 focus:border-green-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3.5 text-gray-400 
                 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Password Match Indicator */}
        {confirmNewPassword && (
          <div className="flex items-center text-sm">
            {newPassword === confirmNewPassword ? (
              <>
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-green-500">Passwords match</span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                <span className="text-red-500">Passwords don't match</span>
              </>
            )}
          </div>
        )}

        {/* Submit Button */}
        {/* <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <FiShield size={20} className="mr-2" />
                    Update Transaction Password
                  </>
                )}

                
              </button> */}
        <Button
          type="submit"
          disabled={loading}
          title="Update Transaction Password"
          loading={loading}
          className="w-full"
        />
      </form>

    </AuthWrapper>
  );
};

export default ChangeTNXpassword;