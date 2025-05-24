'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 pt-8 pb-12 text-center text-gray-600">
      <motion.div 
        className="flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <p className="flex items-center text-sm">
          Made with 
          <motion.span 
            className="mx-1 text-red-500"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          >
            ❤️
          </motion.span> 
          by Vamsi
        </p>
      </motion.div>
      <motion.p 
        className="mt-2 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        &copy; {new Date().getFullYear()} - 
        <motion.a 
          href="https://www.balaveerulu.com" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4F46E5] hover:underline"
          whileHover={{ scale: 1.05 }}
        >
          www.balaveerulu.com
        </motion.a>
      </motion.p>
    </footer>
  );
}
