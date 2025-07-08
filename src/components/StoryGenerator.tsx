
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const StoryGenerator = () => {
  const [request, setRequest] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!request.trim() || !language) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation for now
    setTimeout(() => {
      const sampleStories = {
        hindi: `🌟 एक छोटी सी चिड़िया की कहानी 🌟

एक बार की बात है, एक छोटी सी चिड़िया थी जिसका नाम चिरप था। चिरप बहुत मेहनती थी और हमेशा अपने दोस्तों की मदद करती थी।

एक दिन जंगल में बारिश आई और चिरप के दोस्त बिल्ली मिल्ली का घर भीग गया। चिरप ने तुरंत अपने सभी दोस्तों को इकट्ठा किया और मिलकर मिल्ली के लिए एक नया घर बनाया।

🌈 सीख: मदद करना हमेशा अच्छा होता है, और दोस्ती सबसे बड़ी संपत्ति है।`,
        
        marathi: `🌟 लहान पक्ष्याची कथा 🌟

एकदा एक लहान पक्षी होता ज्याचे नाव चिरप होते. चिरप खूप मेहनती होता आणि नेहमी आपल्या मित्रांची मदत करत असे.

एके दिवशी जंगलात पाऊस पडला आणि चिरपच्या मैत्रिणी मांजर मिल्लीचे घर भिजले. चिरपने लगेच आपल्या सर्व मित्रांना एकत्र केले आणि मिळून मिल्लीसाठी नवीन घर बांधले.

🌈 शिकवण: मदत करणे नेहमी चांगले असते, आणि मैत्री ही सर्वात मोठी संपत्ती आहे.`
      };
      
      const story = sampleStories[language as keyof typeof sampleStories] || sampleStories.hindi;
      setGeneratedStory(story);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="warm-gradient border-saffron-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-saffron-800">
            <span>📖</span>
            <span>Story & Content Generator</span>
          </CardTitle>
          <CardDescription className="text-saffron-600">
            बच्चों के लिए कहानियां और सामग्री बनाएं • Create stories and content for children
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-saffron-800 mb-2">
              भाषा चुनें • Choose Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-white border-saffron-200">
                <SelectValue placeholder="Select a language / भाषा चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                <SelectItem value="marathi">मराठी (Marathi)</SelectItem>
                <SelectItem value="telugu">తెలుగు (Telugu)</SelectItem>
                <SelectItem value="kannada">ಕನ್ನಡ (Kannada)</SelectItem>
                <SelectItem value="english">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-saffron-800 mb-2">
              आप क्या कहानी चाहते हैं? • What story would you like?
            </label>
            <Textarea
              value={request}
              onChange={(e) => setRequest(e.target.value)}
              placeholder="उदाहरण: दोस्ती के बारे में एक कहानी... / Example: A story about friendship..."
              className="bg-white border-saffron-200 min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!request.trim() || !language || isGenerating}
            className="w-full saffron-gradient text-white hover:opacity-90 transition-opacity"
          >
            {isGenerating ? '✨ कहानी बन रही है... Creating Story...' : '📖 कहानी बनाएं • Generate Story'}
          </Button>
        </CardContent>
      </Card>

      {generatedStory && (
        <Card className="bg-white border-sage-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sage-800 flex items-center space-x-2">
              <span>✨</span>
              <span>आपकी कहानी • Your Story</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {generatedStory}
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300">
                📋 Copy / कॉपी करें
              </Button>
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300">
                🔄 Generate Another / दूसरी बनाएं
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StoryGenerator;
