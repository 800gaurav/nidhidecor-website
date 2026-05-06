import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Shield, X, Check, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { defaultStylesSidebar } from "../../constants/colors";

// Theme colors
export const colors = {
  theme1: "#00349c",
  theme2: "#f5d925",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827"
  }
};

const AuthWrapper = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  icon: Icon = Shield,
  onBackButtonClick,
  showHeadicon = true,
  status, // 'success', 'error', 'warning'
  statusMessage,
  onStatusDismiss,
  transparent = false,
  width // custom width for desktop
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
  }, [status]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onStatusDismiss) {
      setTimeout(onStatusDismiss, 300);
    }
  };

  const backgroundStyle = transparent
    ? { background: 'transparent' }
    : {
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255, 255, 255, 0.6)",
      boxShadow: `
          0 20px 40px -10px rgba(0,0,0,0.1),
          0 0 0 1px rgba(0,0,0,0.05),
          inset 0 0 30px rgba(255,255,255,0.8)
        `
    };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 overflow-hidden " style={{ background: defaultStylesSidebar.cardbg }}>

      {/* Animated bubbles */}
      {!transparent && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => {
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            const size = Math.random() * 40 + 20;
            const bubbleColor = left < 50
              ? `radial-gradient(circle, ${colors.theme2}44, ${colors.theme2}22)`
              : `radial-gradient(circle, ${colors.theme1}44, ${colors.theme1}22)`;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ top: `${top}%`, left: `${left}%`, width: size, height: size, background: bubbleColor }}
                animate={{
                  x: [0, 30, -30, 0],
                  y: [0, -20, 20, 0],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            );
          })}
        </div>
      )}

      {/* Status Toast */}
      <AnimatePresence>
        {status && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4"
          >
            <div className={`rounded-xl p-4 shadow-lg border backdrop-blur-sm ${status === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : status === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-yellow-50 border-yellow-200 text-yellow-800'
              }`}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {status === 'success' ? <Check className="h-5 w-5 text-green-600" />
                    : status === 'error' ? <X className="h-5 w-5 text-red-600" />
                      : <AlertCircle className="h-5 w-5 text-yellow-600" />}
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{statusMessage}</p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={handleDismiss}
                    className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 ${status === 'success'
                      ? 'text-green-500 hover:bg-green-100 focus:ring-green-500'
                      : status === 'error'
                        ? 'text-red-500 hover:bg-red-100 focus:ring-red-500'
                        : 'text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-500'
                      }`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        className="w-full sm:mx-auto rounded-3xl p-8 sm:p-10 z-10 relative overflow-hidden max-h-[95vh]"
        style={{
          ...backgroundStyle,
          maxWidth: width ? `${width}px` : '450px', // dynamic desktop width
        }}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Gradient Glow */}
        {!transparent && (
          <>
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-15 blur-xl" style={{ backgroundColor: colors.theme1 }} />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-15 blur-xl" style={{ backgroundColor: colors.theme1 }} />
            <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: `linear-gradient(to right, ${colors.theme1}, ${colors.theme1})` }} />
          </>
        )}

        <div className="relative z-10 max-h-[85vh] overflow-auto">
          {/* Header */}
          <div className="mb-8">
            {showBackButton && (
              <motion.button
                onClick={() => onBackButtonClick ? onBackButtonClick() : navigate('/')}
                className="flex items-center text-sm transition-all mb-4 group"
                whileHover={{ x: -4 }}
                whileTap={{ scale: 0.95 }}
                style={{ color: colors.theme1 }}
              >
                <motion.span className="mr-2" whileHover={{ scale: 1.1 }}>
                  <ArrowLeft size={18} />
                </motion.span>
                <span className="group-hover:underline font-medium" style={{ color: defaultStylesSidebar.cardbg }}>Back to Home</span>
              </motion.button>
            )}

            <div className="text-center mb-8">
              {showHeadicon && (
                <img src="/Images/logo.png" alt="Logo" className="h-24 w-24 rounded-full border-2 border-white/20 object-cover mx-auto" />
              )}
              {title && (
                <motion.h2
                  className="text-3xl font-bold text-center mb-3 bg-clip-text text-transparent"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  style={{ backgroundImage: `linear-gradient(135deg, ${defaultStylesSidebar.cardbg}, ${defaultStylesSidebar.cardbg})` }}
                >
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p
                  className="text-center text-sm max-w-xs mx-auto leading-relaxed"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  style={{ color: colors.gray[600] }}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </div>

          {/* Children */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthWrapper;
