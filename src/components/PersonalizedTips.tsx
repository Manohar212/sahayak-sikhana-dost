
import React from 'react';
import { Button } from '@/components/ui/button';
import DashboardCard from './DashboardCard';

const PersonalizedTips = () => {
  const tips = [
    "Try visual aids for...",
    "Play audio stories...",
    "Assign game-based qui"
  ];

  return (
    <DashboardCard title="Personalized Tips">
      <div className="space-y-3">
        {tips.map((tip, index) => (
          <Button 
            key={index}
            variant="outline" 
            className="w-full justify-start text-left h-auto py-3 px-4"
          >
            {tip}
          </Button>
        ))}
      </div>
    </DashboardCard>
  );
};

export default PersonalizedTips;
