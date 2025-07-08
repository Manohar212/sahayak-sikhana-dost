
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import StudentProgress from '@/components/StudentProgress';
import AIContentAssigner from '@/components/AIContentAssigner';
import PersonalizedTips from '@/components/PersonalizedTips';
import QuickActions from '@/components/QuickActions';
import Footer from '@/components/Footer';
import StoryGenerator from '@/components/StoryGenerator';
import QASupport from '@/components/QASupport';
import WorksheetGenerator from '@/components/WorksheetGenerator';
import VisualAidCreator from '@/components/VisualAidCreator';
import AudioAssessment from '@/components/AudioAssessment';
import LessonPlanner from '@/components/LessonPlanner';

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'story' | 'qa' | 'worksheet' | 'visual' | 'audio' | 'lesson'>('home');

  const renderActiveView = () => {
    switch (activeView) {
      case 'story':
        return <StoryGenerator />;
      case 'qa':
        return <QASupport />;
      case 'worksheet':
        return <WorksheetGenerator />;
      case 'visual':
        return <VisualAidCreator />;
      case 'audio':
        return <AudioAssessment />;
      case 'lesson':
        return <LessonPlanner />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {activeView !== 'home' && (
          <div className="mb-6">
            <Button 
              onClick={() => setActiveView('home')}
              variant="outline"
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              ← Back to Dashboard
            </Button>
          </div>
        )}

        {activeView === 'home' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Hello, Ms. Priya!</h1>
              <p className="text-gray-600">Welcome back to your teaching dashboard</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <StudentProgress />
              <AIContentAssigner />
              <PersonalizedTips />
            </div>

            <QuickActions />

            {/* AI Tools Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">AI Teaching Tools</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('story')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">📖</span>
                    <h3 className="text-lg font-semibold text-gray-900">Story Generator</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Create engaging stories in local languages</p>
                </div>

                <div 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('qa')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">🧠</span>
                    <h3 className="text-lg font-semibold text-gray-900">Q&A Support</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Get simple answers for student questions</p>
                </div>

                <div 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('worksheet')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">📝</span>
                    <h3 className="text-lg font-semibold text-gray-900">Worksheet Creator</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Generate worksheets from textbook photos</p>
                </div>

                <div 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('visual')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">🎨</span>
                    <h3 className="text-lg font-semibold text-gray-900">Visual Aid Creator</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Create simple drawings for blackboard</p>
                </div>

                <div 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('audio')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">🔊</span>
                    <h3 className="text-lg font-semibold text-gray-900">Audio Assessment</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Evaluate student reading fluency</p>
                </div>

                <div 
                  className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => setActiveView('lesson')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl">📋</span>
                    <h3 className="text-lg font-semibold text-gray-900">Lesson Planner</h3>
                  </div>
                  <p className="text-gray-600 text-sm">Create structured lesson plans</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderActiveView()}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
