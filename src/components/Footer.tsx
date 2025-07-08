
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 px-6 py-4 mt-8 transition-colors">
      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Emergency Contact</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms & Policies</a>
          <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Feedback</a>
        </div>
        <div className="flex items-center space-x-2">
          <span>Language: English</span>
          <span>›</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
