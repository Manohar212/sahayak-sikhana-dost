
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from './APIKeyInput';

const AudioAssessment = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [assessmentText, setAssessmentText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  const startRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started! 🎙️",
      description: "Student can start reading now...",
    });
    
    // Simulate recording for 10 seconds
    setTimeout(() => {
      setIsRecording(false);
      generateFeedback();
    }, 10000);
  };

  const generateFeedback = () => {
    const sampleFeedback = `📊 Reading Assessment Report

👍 Strengths:
• Clear pronunciation of most words
• Good reading pace for grade level
• Confident voice

📈 Areas for Improvement:
• Practice "difficult" sounds more
• Take pauses at commas
• Read with more expression

⭐ Overall Score: 7/10 (Good!)

💡 Teacher's Note: Encourage the student to practice reading aloud daily. Focus on pronunciation exercises for challenging sounds.

🎯 Next Steps:
1. Practice sight words
2. Read with expression
3. Work on fluency building`;

    setFeedback(sampleFeedback);
    toast({
      title: "Assessment Complete! 📊",
      description: "Reading fluency report generated!",
    });
  };

  if (!isApiKeySet) {
    return <APIKeyInput onKeySet={setIsApiKeySet} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800">
            <span>🔊</span>
            <span>Audio Reading Assessment</span>
          </CardTitle>
          <CardDescription className="text-blue-600">
            छात्र की पढ़ने की गुणवत्ता जांचें • Evaluate student reading fluency with AI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 mb-2">
              पाठ दें • Provide Reading Text
            </label>
            <Textarea
              value={assessmentText}
              onChange={(e) => setAssessmentText(e.target.value)}
              placeholder="यहाँ वह text लिखें जो student को पढ़ना है... / Enter the text for student to read..."
              className="bg-white border-blue-200 min-h-[100px]"
            />
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-6 text-center">
            {!isRecording ? (
              <div>
                <div className="text-4xl mb-4">🎙️</div>
                <p className="text-blue-700 mb-4">
                  Ready to record student reading
                </p>
                <Button 
                  onClick={startRecording}
                  disabled={!assessmentText.trim()}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  🎙️ Start Recording / रिकॉर्डिंग शुरू करें
                </Button>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-4 animate-pulse">🔴</div>
                <p className="text-red-600 mb-4 font-medium">
                  Recording... Student is reading
                </p>
                <div className="text-sm text-gray-600">
                  Recording will stop automatically in a few seconds
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {feedback && (
        <Card className="bg-white border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center space-x-2">
              <span>📊</span>
              <span>Reading Assessment Report • पढ़ने की रिपोर्ट</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {feedback}
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300">
                📋 Copy Report / रिपोर्ट कॉपी करें
              </Button>
              <Button variant="outline" size="sm" className="text-blue-700 border-blue-300">
                🔄 New Assessment / नई जांच
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AudioAssessment;
