import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { FiGift } from "react-icons/fi";
import { motion } from "framer-motion";
import { defaultStylesSidebar } from "../constants/colors";

const Referral = () => {
  const { currentUser } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [copied, setCopied] = useState(false);
  const referralLink = `${window.location.origin}/signup?referalID=${currentUser?.referralCode
    }&username=${encodeURIComponent(currentUser?.name || "")}`;

  const copyReferralLink = () => {
    if (currentUser?.referralCode) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  return (
    <>
      {currentUser?.referralCode && !isCollapsed && (
        <div className="bg-white referral-section border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
          {/* Header */}
          <div className="referral-header flex items-center gap-2 mb-3">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 p-2 rounded-lg">
              <FiGift size={16} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Refer & Earn
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Share your link and earn rewards
              </p>
            </div>
          </div>

          {/* Referral Link Container */}
          <div className="referral-link-container flex gap-2 mb-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={referralLink}
                readOnly
                style={{ color: defaultStylesSidebar.cardbg, }}
                className="w-full pl-3 pr-10 py-2.5 rounded-lg text-sm text-black focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />

              <button
                onClick={copyReferralLink}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 rounded-md transition-all duration-200 ${copied
                  ? "bg-green-500 text-black"
                  : "bg-gray-800 dark:bg-white text-gray-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white"
                  }`}
              >
                {copied ? (
                  <Check size={14} color="white" />
                ) : (
                  <Copy size={14} />
                )}
              </button>
            </div>
          </div>


          {/* Feedback Message */}
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-medium"
            >
              <Check size={12} />
              Copied to clipboard!
            </motion.div>
          )}

          {/* Bonus Info */}
          {/* <div className="mt-3 flex items-center justify-between text-xs">
            <span className="text-gray-600 dark:text-gray-400">
              Earn up to 15% commission
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
              🎁 Bonus
            </span>
          </div> */}
        </div>
      )}
    </>
  );
};

export default Referral;
