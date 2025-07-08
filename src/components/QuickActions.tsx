
import React from 'react';
import DashboardCard from './DashboardCard';

interface QuickActionProps {
  icon: React.ReactNode;
  title: string;
  onClick?: () => void;
}

const QuickAction = ({ icon, title, onClick }: QuickActionProps) => (
  <div 
    className="flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
    onClick={onClick}
  >
    <div className="text-2xl">{icon}</div>
    <span className="text-gray-700 font-medium">{title}</span>
  </div>
);

const QuickActions = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <DashboardCard title="Daily Report" className="cursor-pointer hover:shadow-md transition-shadow">
        <QuickAction 
          icon={<span>📄</span>}
          title="Summary (PDF)"
        />
      </DashboardCard>
      
      <DashboardCard title="Curriculum" className="cursor-pointer hover:shadow-md transition-shadow">
        <QuickAction 
          icon={<span>📚</span>}
          title="Bank"
        />
      </DashboardCard>
      
      <DashboardCard title="Messages" className="cursor-pointer hover:shadow-md transition-shadow">
        <QuickAction 
          icon={<span>✉️</span>}
          title=""
        />
      </DashboardCard>
    </div>
  );
};

export default QuickActions;
