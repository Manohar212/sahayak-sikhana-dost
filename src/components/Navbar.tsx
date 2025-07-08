
import React from 'react';
import { Button } from '@/components/ui/button';
import { Search, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <span className="text-xl font-semibold text-gray-800">Sahayak AI</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Assignments</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Progress</a>
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium">Resources</a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
