import React from 'react';
import { motion } from 'motion/react';

export const Card = ({ children, className = '', hover = true, ...props }) => {
  const baseStyles = "bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-white/20";
  
  if (hover) {
    return (
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`${baseStyles} hover:shadow-2xl transition-all duration-300 ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`${baseStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};
