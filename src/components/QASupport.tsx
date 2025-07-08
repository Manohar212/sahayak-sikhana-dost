
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateChildFriendlyAnswer } from '@/utils/geminiAI';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from './APIKeyInput';

const QASupport = () => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!question.trim() || !language) return;
    
    setIsGenerating(true);
    
    try {
      const answer = await generateChildFriendlyAnswer(question, language);
      setGeneratedAnswer(answer);
      toast({
        title: "Answer Ready! 💡",
        description: "Child-friendly explanation generated!",
      });
    } catch (error) {
      console.error('Error generating answer:', error);
      toast({
        title: "Error",
        description: "Failed to generate answer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedAnswer);
    toast({
      title: "Copied! 📋",
      description: "Answer copied to clipboard",
    });
  };

  const handleAnotherAnswer = () => {
    setGeneratedAnswer('');
  };

  if (!isApiKeySet) {
    return <APIKeyInput onKeySet={setIsApiKeySet} />;
  }

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
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300" onClick={handleCopy}>
                📋 Copy / कॉपी करें  
              </Button>
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300" onClick={handleAnotherAnswer}>
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
