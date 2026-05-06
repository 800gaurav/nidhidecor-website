import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { FiEye, FiEyeOff, FiLock, FiCheckCircle } from 'react-icons/fi';
import useAxios from '../../utils/useAxios';
import { useNavigate } from 'react-router-dom';
import AuthWrapper from '../../component/wrapper/AuthWrapper';
import Button from '../../component/wrapper/Button';
import { showErrorToast, showSuccessToast } from '../../component/toaster';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { fetchData } = useAxios();

  const user = Cookies.get('USER') ? JSON.parse(Cookies.get('USER')) : null;

  const handlePasswordChange = (value) => setNewPassword(value);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      showErrorToast('All fields are required!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      showErrorToast('New password and confirm password do not match!');
      return;
    }
    if (newPassword === oldPassword) {
      showErrorToast('New password should not be same as old password!');
      return;
    }

    try {
      setLoading(true);
      const res = await fetchData({
        url: `api/v1/user/auth/change-password`,
        method: 'POST',
        data: { oldPassword, newPassword, confirmNewPassword },
      });

      if (res) {
        showSuccessToast('✅ Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        navigate("/dashboard");
      }
    } catch (error) {
      console.error('Change password error:', error);
      showErrorToast(error?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthWrapper
      showHeadicon={false}
      title="Change Password"
      subtitle="Secure your account with a new password"
      width={500} // max-width for desktop
    >
      <form
        className="space-y-4" // हर field के बीच gap
        onSubmit={handleChangePassword}
      >
        {/* Old Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showOldPassword ? 'text' : 'password'}
            value={oldPassword}
            placeholder="Current password"
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full pl-10 pr-12 py-3 rounded-xl 
                 border border-gray-300 
                 bg-white/15 backdrop-blur-sm 
                 text-gray-900 dark:bg-black/25 dark:text-white 
                 focus:outline-none focus:ring-2 focus:ring-green-400 
                 focus:border-green-400 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowOldPassword(!showOldPassword)}
            className="absolute right-3 top-3.5 text-gray-400 
                 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {showOldPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* New Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            placeholder="New password"
            onChange={(e) => handlePasswordChange(e.target.value)}
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
            className="absolute right-3 top-3.5 text-gray-400 
                 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Confirm New Password */}
        <div className="relative">
          <FiLock className="absolute left-3 top-3.5 text-gray-400" />
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
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
                <FiCheckCircle size={16} className="text-green-500 mr-1" />
                <span className="text-green-500">Passwords match</span>
              </>
            ) : (
              <>
                <div className="w-4 h-4 rounded-full bg-red-500 mr-1"></div>
                <span className="text-red-500">Passwords don't match</span>
              </>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          title="Update Password"
          loading={loading}
          className="w-full"
        />
      </form>

    </AuthWrapper>
  );
};

export default ChangePassword;
