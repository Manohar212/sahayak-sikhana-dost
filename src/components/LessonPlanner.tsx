
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from './APIKeyInput';

const LessonPlanner = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [grade, setGrade] = useState('');
  const [duration, setDuration] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!subject || !topic.trim() || !grade || !duration) return;
    
    setIsGenerating(true);
    
    // Simulate lesson plan generation
    setTimeout(() => {
      const lessonPlan = `📋 Lesson Plan: ${topic}

📚 Subject: ${subject} | 🎓 Grade: ${grade} | ⏰ Duration: ${duration} minutes

🎯 Learning Objectives:
• Students will understand the concept of ${topic}
• Students will be able to explain key points
• Students will apply knowledge in simple exercises

📖 Materials Needed:
• Blackboard/Whiteboard
• Chalk/Markers
• Textbook
• Simple props (if available)

⏰ Lesson Structure:

🌅 Introduction (5 minutes):
• Warm greeting in local language
• Quick review of previous lesson
• Introduce today's topic with a simple question

📚 Main Teaching (${Math.floor(parseInt(duration) * 0.6)} minutes):
• Explain concept step by step
• Use local examples and analogies
• Draw simple diagrams on board
• Encourage student questions

🧠 Activity Time (${Math.floor(parseInt(duration) * 0.2)} minutes):
• Group discussion
• Simple hands-on activity
• Q&A session

📝 Assessment (${Math.floor(parseInt(duration) * 0.15)} minutes):
• Quick oral questions
• Simple written exercise
• Check understanding

🎯 Closure (5 minutes):
• Summarize key points
• Preview next lesson
• Assign simple homework

💡 Teaching Tips:
• Use local language when needed
• Be patient and encouraging
• Praise student efforts
• Make learning fun with stories/examples

🏠 Homework:
• Practice exercises from textbook
• Think of local examples
• Share learning with family`;

      setGeneratedPlan(lessonPlan);
      setIsGenerating(false);
      toast({
        title: "Lesson Plan Ready! 📋",
        description: "Your structured lesson plan is complete!",
      });
    }, 3000);
  };

  if (!isApiKeySet) {
    return <APIKeyInput onKeySet={setIsApiKeySet} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-50 to-pink-100 border-pink-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-pink-800">
            <span>📋</span>
            <span>Lesson Planner</span>
          </CardTitle>
          <CardDescription className="text-pink-600">
            व्यवस्थित पाठ योजना बनाएं • Create structured lesson plans for your curriculum
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-pink-800 mb-2">
                विषय चुनें • Choose Subject
              </label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="bg-white border-pink-200">
                  <SelectValue placeholder="Select subject / विषय चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="math">गणित (Mathematics)</SelectItem>
                  <SelectItem value="science">विज्ञान (Science)</SelectItem>
                  <SelectItem value="social">सामाजिक विज्ञान (Social Studies)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-pink-800 mb-2">
                कक्षा • Grade
              </label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="bg-white border-pink-200">
                  <SelectValue placeholder="Select grade / कक्षा चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Grade 1</SelectItem>
                  <SelectItem value="2">Grade 2</SelectItem>
                  <SelectItem value="3">Grade 3</SelectItem>
                  <SelectItem value="4">Grade 4</SelectItem>
                  <SelectItem value="5">Grade 5</SelectItem>
                  <SelectItem value="6">Grade 6</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-800 mb-2">
              समय अवधि • Duration (minutes)
            </label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-white border-pink-200">
                <SelectValue placeholder="Select duration / समय चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-pink-800 mb-2">
              विषय/टॉपिक • Topic
            </label>
            <Textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="उदाहरण: जोड़-घटाव, कहानी लेखन, प्रकाश... / Example: Addition-Subtraction, Story Writing, Light..."
              className="bg-white border-pink-200 min-h-[80px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!subject || !topic.trim() || !grade || !duration || isGenerating}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors"
          >
            {isGenerating ? '📋 योजना बन रही है... Creating Plan...' : '✨ Lesson Plan बनाएं • Create Lesson Plan'}
          </Button>
        </CardContent>
      </Card>

      {generatedPlan && (
        <Card className="bg-white border-pink-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-pink-800 flex items-center space-x-2">
              <span>📄</span>
              <span>Your Lesson Plan • आपकी पाठ योजना</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-4 rounded-lg">
              {generatedPlan}
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="text-pink-700 border-pink-300">
                📋 Copy / कॉपी करें
              </Button>
              <Button variant="outline" size="sm" className="text-pink-700 border-pink-300">
                🖨️ Print / प्रिंट करें
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonPlanner;
