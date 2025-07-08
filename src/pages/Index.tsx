import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Navbar />
      
      <main className="container mx-auto px-6 py-8">
        {activeView !== 'home' && (
          <div className="mb-6">
            <Button 
              onClick={() => setActiveView('home')}
              variant="outline"
              className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              ← Back to Dashboard
            </Button>
          </div>
        )}

        {activeView === 'home' ? (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Hello, Ms. Priya!</h1>
              <p className="text-gray-600 dark:text-gray-300">Welcome back to your teaching dashboard</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <StudentProgress />
              <AIContentAssigner />
              <PersonalizedTips />
            </div>

            <QuickActions />

            {/* Enhanced AI Tools Section */}
            <div className="mt-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">AI Teaching Tools</h2>
                <Link to="/dashboard">
                  <Button variant="outline" className="text-primary border-primary hover:bg-primary hover:text-white">
                    View Analytics →
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveView('story')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📖</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Story Generator</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Create engaging stories in local languages</p>
                  <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">✨ AI Powered</div>
                </div>

                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveView('qa')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🧠</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Q&A Support</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Get simple answers for student questions</p>
                  <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">✨ AI Powered</div>
                </div>

                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveView('worksheet')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📝</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Worksheet Creator</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Generate worksheets from textbook photos</p>
                  <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">✨ AI Powered</div>
                </div>

                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveView('visual')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🎨</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visual Aid Creator</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Create simple drawings for blackboard</p>
                  <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">✨ AI Powered</div>
                </div>

                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveView('audio')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">🔊</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audio Assessment</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Evaluate student reading fluency</p>
                  <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">✨ AI Powered</div>
                </div>

                <div 
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => setActiveView('lesson')}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">📋</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lesson Planner</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Create structured lesson plans</p>
                  <div className="mt-3 text-xs text-green-600 dark:text-green-400 font-medium">✨ AI Powered</div>
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
