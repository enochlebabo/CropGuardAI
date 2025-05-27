
import React from 'react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-green-800 text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">MRCHAPTERVERSE</h3>
          <p className="text-green-200">by Seabata Enoch Lebabo</p>
          <p className="text-green-300 text-sm">
            © {currentYear} Seabata Enoch Lebabo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
