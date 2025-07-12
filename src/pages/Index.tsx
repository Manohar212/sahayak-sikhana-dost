
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, TrendingUp, FileText, Lightbulb, HelpCircle, PenTool, Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import StoryGenerator from '@/components/StoryGenerator';
import QASupport from '@/components/QASupport';
import WorksheetGenerator from '@/components/WorksheetGenerator';
import LessonPlanner from '@/components/LessonPlanner';
import VisualAidCreator from '@/components/VisualAidCreator';
import PersonalizedTips from '@/components/PersonalizedTips';
import QuickActions from '@/components/QuickActions';
import { useAssignments, useStudents } from '@/hooks/useSupabaseData';

const Index = () => {
  const { profile, user } = useAuth();
  const { data: assignments } = useAssignments();
  const { data: students } = useStudents();
  const [activeDialog, setActiveDialog] = useState<string>('');
  
  const getUserName = () => {
    if (profile?.full_name) {
      return profile.full_name;
    }
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'Teacher';
  };

  const handleQuickAction = async (action: string) => {
    // Simulate quick action functionality
    console.log(`Executing quick action: ${action}`);
    
    switch (action) {
      case 'create-assignment':
        // In a real app, this would open assignment creation modal
        alert('Assignment creation feature - would open assignment form');
        break;
      case 'add-student':
        alert('Add student feature - would open student registration form');
        break;
      case 'generate-worksheet':
        setActiveDialog('worksheet');
        break;
      case 'plan-lesson':
        setActiveDialog('lesson-planner');
        break;
      default:
        break;
    }
  };

  const tools = [
    {
      icon: BookOpen,
      title: "Story Generator",
      description: "Create engaging stories for your students based on curriculum topics using AI",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      component: "story-generator"
    },
    {
      icon: HelpCircle,
      title: "Q&A Support",
      description: "Get instant AI-powered answers to curriculum questions and teaching doubts",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      component: "qa-support"
    },
    {
      icon: PenTool,
      title: "Worksheet Generator",
      description: "Generate custom worksheets and practice materials with AI assistance",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      component: "worksheet-generator"
    },
    {
      icon: FileText,
      title: "Lesson Planner",
      description: "Create detailed lesson plans aligned with your curriculum using AI",
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      component: "lesson-planner"
    },
    {
      icon: Eye,
      title: "Visual Aid Creator",
      description: "Generate visual aids and educational diagrams with AI support",
      color: "text-pink-600",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      component: "visual-aid-creator"
    },
    {
      icon: Lightbulb,
      title: "Personalized Tips",
      description: "Get AI-powered teaching tips and strategies tailored for you",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      component: "personalized-tips"
    }
  ];

  const renderToolComponent = (componentName: string) => {
    switch (componentName) {
      case 'story-generator':
        return <StoryGenerator />;
      case 'qa-support':
        return <QASupport />;
      case 'worksheet-generator':
        return <WorksheetGenerator />;
      case 'lesson-planner':
        return <LessonPlanner />;
      case 'visual-aid-creator':
        return <VisualAidCreator />;
      case 'personalized-tips':
        return <PersonalizedTips />;
      default:
        return <div>Component not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Enhanced Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome back, {getUserName()}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Your AI-powered teaching assistant is ready to help you create amazing learning experiences
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
            Transform your teaching with intelligent tools designed specifically for Indian educators. 
            Create stories, generate worksheets, plan lessons, and get instant support - all powered by advanced AI technology.
          </p>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg inline-block">
            <p className="text-sm font-medium">
              🎯 Ready to revolutionize your classroom? Let's get started with AI-powered teaching!
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Assignments</CardTitle>
              <FileText className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{assignments?.length || 0}</div>
              <p className="text-xs opacity-80">Active learning materials</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{students?.length || 0}</div>
              <p className="text-xs opacity-80">Across all classes</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Tools Used</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs opacity-80">Available AI assistants</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Tools Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            🤖 AI Teaching Tools - Powered by Advanced AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${tool.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Dialog open={activeDialog === tool.component} onOpenChange={(open) => setActiveDialog(open ? tool.component : '')}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-primary group-hover:text-white transition-colors"
                        onClick={() => setActiveDialog(tool.component)}
                      >
                        Try Now - AI Powered
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <tool.icon className={`h-5 w-5 ${tool.color}`} />
                          <span>{tool.title}</span>
                        </DialogTitle>
                      </DialogHeader>
                      {renderToolComponent(tool.component)}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Working QuickActions Component */}
        <QuickActions />
      </main>
    </div>
  );
};

export default Index;
