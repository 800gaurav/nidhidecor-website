import React from "react";
import { useAuth } from "../../context/AuthContext";
import { FiUser } from "react-icons/fi";

const ReferralLink = () => {
  const { currentUser } = useAuth();
  const baseUrl = window.location.origin;

  // Referral Link
  const referralLink = `${baseUrl}/signup?referalID=${currentUser.referralCode}&username=${encodeURIComponent(currentUser.name)}`;

  const handleInvite = async () => {
    try {
      // ✅ Copy link to clipboard
      await navigator.clipboard.writeText(referralLink);
      console.log("Referral link copied!");

      // ✅ Try Web Share API (works on mobile + modern browsers)
      if (navigator.share) {
        await navigator.share({
          title: "Join me on this platform!",
          text: "Use my referral link to sign up:",
          url: referralLink,
        });
      } else {
        // ✅ Fallback → WhatsApp
        const whatsappLink = `https://wa.me/?text=Join%20using%20my%20referral%20link:%20${encodeURIComponent(
          referralLink
        )}`;
        window.open(whatsappLink, "_blank");
      }
    } catch (err) {
      console.error("Error sharing:", err);
    }
  };

  return (
    <button
      className="bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center hover:shadow-lg"
      onClick={handleInvite}
    >
      <FiUser className="mr-2" />
      Invite Friend
    </button>
  );
};

export default ReferralLink;
