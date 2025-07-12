
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, User, Sun, Moon, Download } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import UserModal from './UserModal';
import SearchModal from './SearchModal';

const Navbar = () => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-800 dark:bg-white rounded flex items-center justify-center">
                <span className="text-white dark:text-gray-800 text-sm">✓</span>
              </div>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">Sahayak AI</span>
            </Link>
            
            <div className="flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`font-medium transition-colors ${
                  isActive('/dashboard') 
                    ? 'text-primary' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Dashboard
              </Link>
              <Link 
                to="/assignments" 
                className={`font-medium transition-colors ${
                  isActive('/assignments') 
                    ? 'text-primary' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Assignments
              </Link>
              <Link 
                to="/progress" 
                className={`font-medium transition-colors ${
                  isActive('/progress') 
                    ? 'text-primary' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Progress
              </Link>
              <Link 
                to="/resources" 
                className={`font-medium transition-colors ${
                  isActive('/resources') 
                    ? 'text-primary' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                Resources
              </Link>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowSearchModal(true)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setShowUserModal(true)}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      <UserModal isOpen={showUserModal} onClose={() => setShowUserModal(false)} />
      <SearchModal isOpen={showSearchModal} onClose={() => setShowSearchModal(false)} />
    </>
  );
};

export default Navbar;
