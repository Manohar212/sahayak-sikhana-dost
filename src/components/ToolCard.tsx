
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ToolCardProps {
  title: string;
  description: string;
  emoji: string;
  gradient: string;
  onClick: () => void;
  comingSoon?: boolean;
}

const ToolCard = ({ title, description, emoji, gradient, onClick, comingSoon = false }: ToolCardProps) => {
  return (
    <Card className={`${gradient} border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}>
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <div className="text-3xl animate-gentle-bounce">{emoji}</div>
          <CardTitle className="text-xl text-white">{title}</CardTitle>
        </div>
        <CardDescription className="text-white/90 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={onClick}
          disabled={comingSoon}
          className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30 hover:border-white/50 transition-all duration-200"
          variant="outline"
        >
          {comingSoon ? '🚧 Coming Soon' : '✨ Try Now'}
        </Button>
      </CardContent>
      {comingSoon && (
        <div className="absolute top-2 right-2 bg-white/20 px-2 py-1 rounded-full text-xs text-white">
          Soon
        </div>
      )}
    </Card>
  );
};

export default ToolCard;
