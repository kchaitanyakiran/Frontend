import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { RefreshCw } from 'lucide-react';

export const Captcha = ({ onVerify }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(captcha);
    setUserInput('');
    setIsVerified(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleVerify = () => {
    if (userInput === captchaText) {
      setIsVerified(true);
      onVerify(true);
    } else {
      setIsVerified(false);
      onVerify(false);
      generateCaptcha();
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div 
          className="flex-1 h-12 flex items-center justify-center bg-gradient-to-r from-[#F5F5DC] to-white border-2 border-[#1B5E20]/20 rounded-lg select-none"
          style={{
            fontFamily: 'monospace',
            fontSize: '20px',
            letterSpacing: '8px',
            fontWeight: 'bold',
            color: '#1B5E20',
            textDecoration: 'line-through',
            textDecorationColor: '#C9A961',
            textDecorationThickness: '1px'
          }}
        >
          {captchaText}
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 180 }}
          whileTap={{ scale: 0.9 }}
          onClick={generateCaptcha}
          className="p-3 bg-[#1B5E20]/10 hover:bg-[#1B5E20]/20 rounded-lg transition-colors"
          type="button"
        >
          <RefreshCw className="w-5 h-5 text-[#1B5E20]" />
        </motion.button>
      </div>

      <div className="flex gap-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleVerify()}
          placeholder="Enter the characters above"
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#1B5E20] transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVerify}
          className="px-6 py-2 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors font-medium"
          type="button"
        >
          Verify
        </motion.button>
      </div>

      {isVerified && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-600 text-sm font-medium"
        >
          ✓ CAPTCHA verified successfully
        </motion.div>
      )}
    </div>
  );
};
