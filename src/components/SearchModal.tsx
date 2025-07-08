
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, FileText, Users, BookOpen, BarChart } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = [
    { id: 1, title: 'Grade 3 Mathematics Worksheet', type: 'worksheet', icon: FileText },
    { id: 2, title: 'Student Progress Report', type: 'report', icon: BarChart },
    { id: 3, title: 'Science Story - Photosynthesis', type: 'story', icon: BookOpen },
    { id: 4, title: 'Class 4A Student List', type: 'students', icon: Users },
  ].filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">Search</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search assignments, students, resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
          </div>
          
          {searchQuery && (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {searchResults.length > 0 ? (
                searchResults.map((result) => {
                  const Icon = result.icon;
                  return (
                    <div
                      key={result.id}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={onClose}
                    >
                      <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-gray-900 dark:text-white">{result.title}</span>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
          
          {!searchQuery && (
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p className="font-medium">Quick searches:</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('Grade 3')}>
                  Grade 3
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('Mathematics')}>
                  Mathematics
                </Button>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('Worksheet')}>
                  Worksheets
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
