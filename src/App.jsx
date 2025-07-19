import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Loading from './Loading.jsx';

const App = () => {
  const [change, setChange] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getSummary = async (e) => {
    e.preventDefault();
    setLoading(true)
    console.log("Sending to:", `${backendURL}/summarize/text`);

    try {
      
      const response = await axios.post(`${backendURL}/summarize/text`, {
        text: change
      },);
      
      setSummary(response.data.summary);
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-900 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="rgb-border shadow-2xl rounded-2xl p-10 w-full max-w-lg"
      >
        <h1 className="text-3xl font font-bold text-center mb-6 text-white">AI Text Summarizer</h1>

        <form onSubmit={getSummary} className="flex flex-col space-y-4">
          <input
            className="w-full font bw-border p-4 text-lg border bg-slate-100 border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            onChange={(e) => setChange(e.target.value)}
            type="text"
            placeholder="Provide long text here....."
          />
          <button
            type="submit"
            className="bg-blue-600 font text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition duration-300 cursor-pointer"
          >
            Generate Summary
          </button>
        </form>

        <AnimatePresence mode="wait">
          {loading ? (
            <Loading key="loading" />
          ) : summary && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8 bg-gray-100 p-4 rounded-xl shadow-inner"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Summary:</h3>
              <p className="text-gray-800">{summary}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default App;