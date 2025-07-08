
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const QASupport = () => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!question.trim() || !language) return;
    
    setIsGenerating(true);
    
    // Simulate AI generation for now
    setTimeout(() => {
      const sampleAnswers = {
        hindi: `🌈 बच्चों के लिए सरल उत्तर:

आसमान नीला क्यों दिखता है? यह एक बहुत ही दिलचस्प सवाल है!

🌞 सूरज की रोशनी में सभी रंग होते हैं - जैसे इंद्रधनुष में होते हैं!
🌍 जब यह रोशनी हमारे वायुमंडल में आती है, तो यह हवा के छोटे-छोटे कणों से टकराती है।
🔵 नीला रंग अन्य रंगों से ज्यादा बिखरता है।
✨ इसीलिए हमें आसमान नीला दिखाई देता है!

🎯 आसान तरीका समझाने के लिए:
"जैसे तुम एक प्रिज्म से सूरज की रोशनी को देखते हो और सतरंगी रंग दिखते हैं, वैसे ही आसमान में नीला रंग सबसे ज्यादा दिखता है!"`,
        
        marathi: `🌈 मुलांसाठी सोपे उत्तर:

आकाश निळे का दिसते? हा खूप मनोरंजक प्रश्न आहे!

🌞 सूर्याच्या प्रकाशात सर्व रंग असतात - जसे इंद्रधनुष्यात असतात!
🌍 जेव्हा हा प्रकाश आपल्या वातावरणात येतो, तेव्हा तो हवेतील छोट्या कणांशी टक्कर होतो।
🔵 निळा रंग इतर रंगांपेक्षा जास्त विखुरतो।
✨ म्हणूनच आपल्याला आकाश निळे दिसते!

🎯 समजावून सांगण्यासाठी सोपा मार्ग:
"जसे तुम्ही प्रिझमवरून सूर्याचा प्रकाश पाहता आणि इंद्रधनुषी रंग दिसतात, तसेच आकाशात निळा रंग सर्वात जास्त दिसतो!"`
      };
      
      const answer = sampleAnswers[language as keyof typeof sampleAnswers] || sampleAnswers.hindi;
      setGeneratedAnswer(answer);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="warm-gradient border-earthOrange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-earthOrange-800">
            <span>🧠</span>
            <span>Child-Friendly Q&A Support</span>
          </CardTitle>
          <CardDescription className="text-earthOrange-600">
            बच्चों के सवालों के सरल जवाब पाएं • Get simple answers to children's questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-earthOrange-800 mb-2">
              भाषा चुनें • Choose Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-white border-earthOrange-200">
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
            <label className="block text-sm font-medium text-earthOrange-800 mb-2">
              बच्चे का सवाल • Child's Question
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="उदाहरण: आसमान नीला क्यों है? / Example: Why is the sky blue?"
              className="bg-white border-earthOrange-200 min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!question.trim() || !language || isGenerating}
            className="w-full bg-earthOrange-500 hover:bg-earthOrange-600 text-white transition-colors"
          >
            {isGenerating ? '🤔 सोच रहे हैं... Thinking...' : '💡 सरल जवाब दें • Get Simple Answer'}
          </Button>
        </CardContent>
      </Card>

      {generatedAnswer && (
        <Card className="bg-white border-sage-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sage-800 flex items-center space-x-2">
              <span>💡</span>
              <span>सरल जवाब • Simple Answer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {generatedAnswer}
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300">
                📋 Copy / कॉपी करें  
              </Button>
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300">
                🔄 Another Answer / दूसरा जवाब
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QASupport;
