
import React from 'react';
import { Leaf, Menu } from 'lucide-react';

export const AppHeader = () => {
  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">CropGuard AI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#scan" className="text-green-700 hover:text-green-600 font-medium transition-colors">
              Scan Plants
            </a>
            <a href="#diseases" className="text-green-700 hover:text-green-600 font-medium transition-colors">
              Disease Library
            </a>
            <a href="#tips" className="text-green-700 hover:text-green-600 font-medium transition-colors">
              Care Tips
            </a>
            <a href="#history" className="text-green-700 hover:text-green-600 font-medium transition-colors">
              Scan History
            </a>
          </nav>

          <button className="md:hidden p-2 text-green-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
