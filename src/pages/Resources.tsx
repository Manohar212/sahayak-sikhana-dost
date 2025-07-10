
import React from 'react';
import Navbar from '@/components/Navbar';
import EducationalResources from '@/components/EducationalResources';

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <EducationalResources />
      </main>
    </div>
  );
};

export default Resources;
