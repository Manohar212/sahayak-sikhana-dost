
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div className="flex space-x-6">
          <a href="#" className="hover:text-gray-900">Emergency Contact</a>
          <a href="#" className="hover:text-gray-900">Terms & Policies</a>
          <a href="#" className="hover:text-gray-900">Feedback</a>
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
