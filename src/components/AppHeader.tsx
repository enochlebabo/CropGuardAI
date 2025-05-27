
import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Menu, User, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const AppHeader = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };

  return (
    <header className="bg-white/90 backdrop-blur-sm border-b border-green-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-800">CropGuard AI</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="text-green-700 hover:text-green-600 font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/" className="text-green-700 hover:text-green-600 font-medium transition-colors">
                  Scan Plants
                </Link>
                <Link to="/learn" className="text-green-700 hover:text-green-600 font-medium transition-colors">
                  Learn
                </Link>
                <Link to="/community" className="text-green-700 hover:text-green-600 font-medium transition-colors">
                  Community
                </Link>
                <Link to="/analytics" className="text-green-700 hover:text-green-600 font-medium transition-colors">
                  <BarChart3 className="h-4 w-4 inline mr-1" />
                  Analytics
                </Link>
                <Button 
                  onClick={handleLogout}
                  variant="outline" 
                  size="sm"
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
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
                <Link to="/login">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <User className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </nav>

          <button className="md:hidden p-2 text-green-700">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};
