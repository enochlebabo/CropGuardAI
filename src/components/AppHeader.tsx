
import React from 'react';
import { Leaf, Menu } from 'lucide-react';

export const AppHeader = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            <button 
              onClick={() => scrollToSection('scan')}
              className="text-green-700 hover:text-green-600 font-medium transition-colors"
            >
              Scan Plants
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-green-700 hover:text-green-600 font-medium transition-colors"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-green-700 hover:text-green-600 font-medium transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-green-700 hover:text-green-600 font-medium transition-colors"
            >
              Contact
            </button>
          </nav>

          <button className="md:hidden p-2 text-green-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
