
import React from 'react';

const Header = () => {
  return (
    <header className="warm-gradient border-b border-saffron-200 shadow-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center space-x-3">
          <div className="text-4xl animate-gentle-bounce">🌟</div>
          <div>
            <h1 className="text-3xl font-bold text-saffron-800">
              सहायक Sahayak
            </h1>
            <p className="text-sm text-saffron-600 mt-1">
              आपका विश्वसनीय शिक्षण साथी • Your Trusted Teaching Companion
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
