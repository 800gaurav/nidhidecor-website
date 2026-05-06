import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaHeadset,
  FaTimes,
  FaClock,
} from "react-icons/fa"

const CustomerSupport = () => {
  const [showInfo, setShowInfo] = useState(false)

  const supportInfo = {
    phone: "+91 xxxxxxx",
    email: "info@nidhidecor.com",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    whatsapp: "xxxxxxxxx",
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="mb-4 bg-white rounded-lg shadow-lg p-4 w-72"
          >
            <h3 className="text-lg font-semibold text-center mb-2">
              Customer Support
            </h3>

            {/* Call */}
            <div
              onClick={() => window.open(`tel:${supportInfo.phone}`)}
              className="flex items-center p-2 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer mb-2"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                <FaPhoneAlt className="text-white text-sm" />
              </div>
              <div>
                <p className="text-sm font-medium">Call Us</p>
                <p className="text-xs text-gray-600">{supportInfo.phone}</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div
              onClick={() =>
                window.open(`https://wa.me/${supportInfo.whatsapp}`, "_blank")
              }
              className="flex items-center p-2 bg-green-50 rounded-lg hover:bg-green-100 cursor-pointer mb-2"
            >
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                <FaWhatsapp className="text-white text-sm" />
              </div>
              <p className="text-sm font-medium">WhatsApp Chat</p>
            </div>

            {/* Email */}
            <div
              onClick={() =>
                window.open(`mailto:${supportInfo.email}`)
              }
              className="flex items-center p-2 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer mb-2"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <FaEnvelope className="text-white text-sm" />
              </div>
              <p className="text-sm font-medium">{supportInfo.email}</p>
            </div>

            {/* Hours */}
            <div className="flex items-center p-2 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                <FaClock className="text-white text-sm" />
              </div>
              <p className="text-sm">{supportInfo.hours}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowInfo(!showInfo)}
        className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center"
      >
        {showInfo ? (
          <FaTimes className="text-xl" color="white" />
        ) : (
          <FaHeadset className="text-xl" color="white"/>
        )}
      </motion.button>
    </div>
  )
}

export default CustomerSupport
