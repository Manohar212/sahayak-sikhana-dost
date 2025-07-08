
import React from 'react';
import DashboardCard from './DashboardCard';

const StudentProgress = () => {
  const progressData = [
    { grade: 'Grade 3', percentage: 76 },
    { grade: 'Grade 4', percentage: 52 },
  ];

  return (
    <DashboardCard title="Student Progress">
      <div className="space-y-4">
        {progressData.map((item) => (
          <div key={item.grade} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-700 font-medium">{item.grade}</span>
              <span className="text-gray-900 font-semibold">{item.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gray-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default StudentProgress;
