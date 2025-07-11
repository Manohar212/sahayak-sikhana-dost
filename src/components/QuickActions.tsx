import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, HelpCircle, FileText, Calendar, Image, Lightbulb } from 'lucide-react';
import { generateAIContent } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const QuickActions = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [contentType, setContentType] = useState('');
  const [showResult, setShowResult] = useState(false);
  const { toast } = useToast();

  const handleQuickAction = async (type: string) => {
    setIsGenerating(true);
    setContentType(type);
    
    try {
      let content = '';
      
      switch (type) {
        case 'story':
          content = await generateAIContent('story', 'A moral story about honesty for children', { language: 'Hindi' });
          break;
        case 'question':
          content = await generateAIContent('qa', 'Why is the sky blue?', { language: 'Hindi' });
          break;
        case 'worksheet':
          content = await generateAIContent('worksheet', 'Basic addition and subtraction', { grade: 'Primary (1-5)' });
          break;
        case 'lesson':
          content = await generateAIContent('lesson', 'Introduction to plants', { grade: 'Primary (1-5)' });
          break;
        case 'visual':
          content = await generateAIContent('visual', 'Solar system diagram');
          break;
        case 'tips':
          content = await generateAIContent('tips', '', { 
            subject: 'general', 
            grade: 'primary', 
            challenge: 'engagement' 
          });
          break;
      }
      
      setGeneratedContent(content);
      setShowResult(true);
      
      toast({
        title: "Generated Successfully! ✨",
        description: `Your ${type} has been created!`,
      });
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please make sure the API key is configured.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const quickActions = [
    {
      id: 'story',
      title: 'Quick Story',
      description: 'Generate a moral story instantly',
      icon: BookOpen,
      color: 'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
      borderColor: 'border-blue-200 dark:border-blue-700'
    },
    {
      id: 'question',
      title: 'Answer Questions',
      description: 'Get child-friendly explanations',
      icon: HelpCircle,
      color: 'from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20',
      borderColor: 'border-green-200 dark:border-green-700'
    },
    {
      id: 'worksheet',
      title: 'Quick Worksheet',
      description: 'Create practice exercises',
      icon: FileText,
      color: 'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
      borderColor: 'border-purple-200 dark:border-purple-700'
    },
    {
      id: 'lesson',
      title: 'Lesson Plan',
      description: 'Generate structured lessons',
      icon: Calendar,
      color: 'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
      borderColor: 'border-orange-200 dark:border-orange-700'
    },
    {
      id: 'visual',
      title: 'Visual Aids',
      description: 'Create drawing instructions',
      icon: Image,
      color: 'from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20',
      borderColor: 'border-pink-200 dark:border-pink-700'
    },
    {
      id: 'tips',
      title: 'Teaching Tips',
      description: 'Get personalized advice',
      icon: Lightbulb,
      color: 'from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20',
      borderColor: 'border-yellow-200 dark:border-yellow-700'
    }
  ];

  return (
    <>
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-indigo-200 dark:border-indigo-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-indigo-800 dark:text-indigo-200">
            <span>⚡</span>
            <span>Quick Actions</span>
          </CardTitle>
          <CardDescription className="text-indigo-600 dark:text-indigo-300">
            तुरंत सहायता • Instant AI-powered teaching tools
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className={`h-auto p-4 flex-col space-y-2 bg-gradient-to-br ${action.color} ${action.borderColor} hover:shadow-md transition-all duration-200`}
                  onClick={() => handleQuickAction(action.id)}
                  disabled={isGenerating}
                >
                  <IconComponent className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {action.description}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
          
          {isGenerating && (
            <div className="mt-4 text-center">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-current border-t-transparent text-indigo-600 rounded-full"></div>
              <p className="mt-2 text-sm text-indigo-600 dark:text-indigo-400">
                Generating {contentType}...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showResult} onOpenChange={setShowResult}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="capitalize">Generated {contentType}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                {generatedContent}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigator.clipboard.writeText(generatedContent)}
              >
                📋 Copy
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowResult(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuickActions;