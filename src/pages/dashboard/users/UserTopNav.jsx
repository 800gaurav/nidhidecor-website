import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiLogOut, FiSettings, FiEdit, FiCheckCircle, FiXCircle } from "react-icons/fi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import useAxios from "../../../utils/useAxios";
import { useAuth } from "../../../context/AuthContext";
import { imgBaseUrl } from "../../../utils/axiosInstance";

const UserNavbar = () => {
  const [profile, setProfile] = useState({});
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { fetchData } = useAxios();
  const navigate = useNavigate();
  const { userData, logout} = useAuth();
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // ✅ Fetch user profile photo
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const res = await fetchData({
        url: `/api/v1/user/auth/getProfilePhoto/${userData.id}`,
      });
      if (res?.success) setProfile(res.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Upload new profile photo
  const updateProfilePhoto = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePhoto", file);

      const res = await fetchData({
        url: `/api/v1/user/auth/uploadProfilePhoto/${userData.id}`,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.success) {
        toast.success("Profile photo updated successfully ✅");
        fetchUserProfile();
      } else {
        toast.error("Failed to update photo");
      }
    } catch (error) {
      toast.error(error.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please select an image file");
    if (file.size > 5 * 1024 * 1024) return toast.error("File must be <5MB");
    updateProfilePhoto(file);
  };

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Fetch on mount
  useEffect(() => {
    if (userData?.id) fetchUserProfile();
  }, [userData?.id]);

  // ✅ Logout handler
  const handleLogout = () => {
logout()
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <div className="shadow-sm border-b border-gray-200 bg-[#002247] md:bg-white px-4 py-3">
      <div className="flex justify-between items-center">
        {/* App Logo or Name */}
        <div
          className="flex items-center space-x-2 cursor-pointer select-none"
       
        >
          {/* <img src="/Images/logo.png" alt="Logo" className="h-8 w-8 rounded" />
          <span className="text-lg font-bold text-gray-800">DHANTAG</span> */}
        </div>

        {/* User Section */}
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center gap-3">
            {/* Profile Photo */}
            <div className="relative group">
              <div
                className="w-12 h-12 rounded-full border border-gray-300 overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {loading ? (
                  <span className="text-xs text-gray-400 animate-pulse">...</span>
                ) : profile?.profilePhoto ? (
                  <img
                    src={`${imgBaseUrl}${profile.profilePhoto}`}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FiUser size={22} className="text-gray-400" />
                )}
              </div>

              {/* Edit icon */}
              <div
                className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-1 cursor-pointer transform translate-x-1/4 translate-y-1/4"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiEdit className="text-white" size={10} />
              </div>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* User Info */}
            
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-50">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full overflow-hidden border">
                  {profile?.profilePhoto ? (
                    <img
                      src={`${imgBaseUrl}${profile.profilePhoto}`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-gray-400 w-full h-full p-2" />
                  )}
                </div>
                <div className="flex flex-col">
                  <h4 className="text-sm font-semibold text-gray-800">
                    {userData?.username}
                  </h4>
                  <p className="text-xs text-gray-500">{userData?.email}</p>
                  <p className="text-xs text-gray-500 font-medium">ID: {userData?.userId}</p>
                </div>
              </div>

              {/* Active Status */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs font-medium text-gray-700">Status:</span>
                <span className="flex items-center gap-1 text-xs font-semibold">
                  {userData?.active ? (
                    <>
                      <FiCheckCircle className="text-green-500" /> <span className="text-green-600">Active</span>
                    </>
                  ) : (
                    <>
                      <FiXCircle className="text-red-500" /> <span className="text-red-500">Inactive</span>
                    </>
                  )}
                </span>
              </div>

              {/* Buttons */}
              <div className="mt-3 border-t border-gray-100 pt-3 space-y-2">
                <button
                  onClick={() => navigate("/dashboard/profile")}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:bg-gray-100 w-full px-3 py-1.5 rounded-md"
                >
                  <FiSettings size={14} /> Profile Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-600 hover:bg-red-50 w-full px-3 py-1.5 rounded-md"
                >
                  <FiLogOut size={14} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
