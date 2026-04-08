import React from 'react';
import { motion } from 'motion/react';
import { Sprout } from 'lucide-react';

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F5F5DC]/20 via-white to-[#E8F5E9]/30">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Sprout className="w-16 h-16 text-[#1B5E20]" />
      </motion.div>
    </div>
  );
};
