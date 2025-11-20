import React from 'react';
import { FiHeart } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">FitnessPro</h3>
            <p className="text-gray-400 text-sm mt-1">Your ultimate fitness training platform</p>
          </div>
          
          <div className="flex items-center">
            <p className="text-gray-400 text-sm">
              Made with <FiHeart className="inline text-red-500 mx-1" /> for fitness enthusiasts
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} FitnessPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;