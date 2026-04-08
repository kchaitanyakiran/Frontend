import React from 'react';
import { motion } from 'motion/react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '',
  ...props 
}) => {
  const baseStyles = "rounded-2xl font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden";
  
  const variants = {
    primary: "bg-[#1B5E20] text-white hover:bg-[#2E7D32] shadow-lg hover:shadow-xl hover:scale-105",
    secondary: "bg-[#5D4037] text-white hover:bg-[#6D4C41] shadow-lg hover:shadow-xl hover:scale-105",
    outline: "border-2 border-[#1B5E20] text-[#1B5E20] hover:bg-[#1B5E20] hover:text-white",
    ghost: "text-[#1B5E20] hover:bg-[#E8F5E9]",
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };
  
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.button>
  );
};
