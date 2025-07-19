import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <motion.div
      className="mt-8 bg-gray-100 p-4 rounded-xl shadow-inner text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-lg font-medium text-gray-700 animate-pulse">⏳ Generating Summary...</p>
    </motion.div>
  );
};

export default Loading;