// components/Button.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {  defaultStylesButton } from '../../constants/colors';

const Button = ({
    type = 'button',
    disabled = false,
    loading = false,
    title = "Text",
    className = '',
    style = {},
    titleStyle = {},
    onClick,
    leftIcon,
    rightIcon,
    variant = 'default', // 'default', 'custom'
    // New props for better customization
    hoverEffect = true,
    animation = true,
    ...props
}) => {
    // Determine if this is a custom button (for toggle buttons)
    const isCustomButton = variant === 'custom' || (className && className.includes('bg-'));
    
    // Default classes for gradient button
    const defaultClasses = 'w-full py-3 px-4 rounded-xl text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-75 flex items-center justify-center gap-2 relative overflow-hidden';
    
    // Default styles for gradient button
  

    // Animation props for gradient buttons
    const animationProps = animation ? {
        initial: { scale: 1, boxShadow: "0 4px 14px 0 #0671FF40" },
        whileHover: { 
            scale: disabled || loading ? 1 : 1.02,
            boxShadow: disabled || loading ? "0 4px 14px 0 #0671FF40" : "0 6px 20px 0 #0671FF60"
        },
        whileTap: { 
            scale: disabled || loading ? 1 : 0.98,
            boxShadow: "0 2px 10px 0 #0671FF30"
        },
        transition: { 
            type: "spring", 
            stiffness: 400, 
            damping: 17,
            duration: 0.2
        },
        whileFocus: { 
            scale: 1.01,
            boxShadow: "0 0 0 3px rgba(6, 113, 255, 0.2), 0 6px 20px 0 #0671FF60"
        }
    } : {};

    return (
        <motion.button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={isCustomButton ? className : defaultClasses}
            style={isCustomButton ? style : { ...defaultStylesButton , maxWidth:"99%", alignSelf:"center", ...style }}
            {...(!isCustomButton && animationProps)}
            {...props}
        >
            {/* Ripple effect overlay - only for gradient buttons */}
            {!isCustomButton && !disabled && !loading && hoverEffect && (
                <motion.span
                    className="absolute inset-0 bg-white opacity-0 rounded-xl"
                    whileHover={{ opacity: 0.1 }}
                    transition={{ duration: 0.2 }}
                />
            )}
            
            {/* Loading overlay - only for gradient buttons */}
            {loading && !isCustomButton && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#00349c] to-[#f5d925] rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                />
            )}

            {/* Content */}
            {loading ? (
                <div className="flex items-center justify-center z-10">
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin mr-2"></div>
                    <span style={titleStyle}>{title}</span>
                </div>
            ) : (
                <div className="flex items-center justify-center gap-2 z-10">
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    <span className='text-white' style={titleStyle}>{title}</span>
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </div>
            )}
        </motion.button>
    );
};

export default Button;