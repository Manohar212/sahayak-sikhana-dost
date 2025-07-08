import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import ToolCard from '@/components/ToolCard';
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
    <div className="min-h-screen warm-gradient">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {activeView !== 'home' && (
          <div className="mb-6">
            <Button 
              onClick={() => setActiveView('home')}
              variant="outline"
              className="bg-white/80 border-saffron-200 text-saffron-800 hover:bg-white"
            >
              ← वापस जाएं • Go Back
            </Button>
          </div>
        )}

        {activeView === 'home' ? (
          <>
            <div className="text-center mb-12">
              <h2 className="text-2xl font-semibold text-saffron-800 mb-4">
                🙏 नमस्ते Teacher Ji! Welcome to Sahayak
              </h2>
              <p className="text-lg text-saffron-700 max-w-2xl mx-auto leading-relaxed">
                आपकी teaching journey को आसान बनाने के लिए यहाँ हैं कुछ खास tools। 
                चुनिए जो आपको चाहिए और बनाइए amazing lessons! 
                <br />
                <span className="text-sm opacity-75">
                  Choose the tool you need and create amazing lessons with AI assistance!
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <ToolCard
                title="Story Generator"
                description="Create engaging stories and content in your local language for different age groups"
                emoji="📖"
                gradient="saffron-gradient"
                onClick={() => setActiveView('story')}
              />
              
              <ToolCard
                title="Q&A Support"
                description="Get simple, child-friendly explanations for curious student questions"
                emoji="🧠"
                gradient="bg-gradient-to-br from-earthOrange-400 to-earthOrange-600"
                onClick={() => setActiveView('qa')}
              />
              
              <ToolCard
                title="Worksheet Creator"
                description="Upload textbook photos and generate differentiated worksheets for multiple grades"
                emoji="📝"
                gradient="sage-gradient"
                onClick={() => setActiveView('worksheet')}
              />
              
              <ToolCard
                title="Visual Aid Creator"
                description="Generate simple line drawings and diagrams for blackboard teaching"
                emoji="🎨"
                gradient="bg-gradient-to-br from-purple-400 to-purple-600"
                onClick={() => setActiveView('visual')}
              />
              
              <ToolCard
                title="Audio Assessment"
                description="Evaluate student reading fluency with AI-powered speech analysis"
                emoji="🔊"
                gradient="bg-gradient-to-br from-blue-400 to-blue-600"
                onClick={() => setActiveView('audio')}
              />
              
              <ToolCard
                title="Lesson Planner"
                description="Create structured lesson plans aligned with your curriculum goals"
                emoji="📋"
                gradient="bg-gradient-to-br from-pink-400 to-pink-600"
                onClick={() => setActiveView('lesson')}
              />
            </div>

            <div className="bg-white/70 rounded-lg p-6 border border-saffron-200">
              <h3 className="text-lg font-semibold text-saffron-800 mb-3 flex items-center space-x-2">
                <span>💝</span>
                <span>आपके लिए खुशखबरी • Good News for You</span>
              </h3>
              <div className="text-saffron-700 space-y-2 text-sm">
                <p>✨ No login required - सीधे इस्तेमाल करें</p>
                <p>🌍 Multiple Indian languages supported</p>
                <p>📱 Works on any device - mobile, tablet, computer</p>
                <p>🎯 Made specially for Indian teachers and students</p>
                <p>❤️ Completely free to use</p>
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderActiveView()}
          </div>
        )}
      </main>
      
      <footer className="bg-saffron-100 border-t border-saffron-200 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-saffron-700 text-sm">
            Made with ❤️ for Indian Teachers • भारतीय शिक्षकों के लिए प्रेम से बनाया गया
          </p>
          <p className="text-saffron-600 text-xs mt-2">
            Powered by AI • Supporting rural education • गाँव की शिक्षा को बेहतर बनाना
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
