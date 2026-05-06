import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export const ActionButton = ({ icon, label, gradient, text, autoRun = false, onClick }) => {
  const [showText, setShowText] = useState(false)

  const handleClick = () => {
    if (text && !autoRun) {
      setShowText(true)
      setTimeout(() => setShowText(false), 2000)
    } else if (onClick) {
      onClick()
    }
  }

  // Auto-run popup on mount
  useEffect(() => {
    if (autoRun && text) {
      setShowText(true)
      const timer = setTimeout(() => setShowText(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [autoRun, text])

  return (
    <div className="relative inline-block">
      <button
        onClick={handleClick}
        style={{
          background: gradient,
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          border: "none",
          cursor: "pointer",
          fontWeight: "600",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          transition: "transform 0.2s ease",
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {icon}
        {label}
      </button>

      <AnimatePresence>
        {showText && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -40, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 font-semibold px-4 py-2 rounded-xl shadow-lg mt-2 z-10"
          >
            🚧 {text} 🚀
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
