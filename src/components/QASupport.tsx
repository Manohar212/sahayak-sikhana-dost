
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateChildFriendlyAnswer } from '@/utils/geminiAI';
import { useToast } from '@/hooks/use-toast';
import ContentDownloader from './ContentDownloader';

const QASupport = () => {
  const [question, setQuestion] = useState('');
  const [language, setLanguage] = useState('');
  const [generatedAnswer, setGeneratedAnswer] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
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

  return (
    <div className="space-y-6">
      <Card className="warm-gradient border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-800 dark:text-blue-200">
            <span>🧠</span>
            <span>Child-Friendly Q&A Support</span>
          </CardTitle>
          <CardDescription className="text-blue-600 dark:text-blue-300">
            बच्चों के सवालों के सरल जवाब पाएं • Get simple answers to children's questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              भाषा चुनें • Choose Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-blue-200 dark:border-blue-700">
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
            <label className="block text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
              बच्चे का सवाल • Child's Question
            </label>
            <Textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="उदाहरण: आसमान नीला क्यों है? / Example: Why is the sky blue?"
              className="bg-white dark:bg-gray-700 border-blue-200 dark:border-blue-700 min-h-[100px] text-gray-900 dark:text-white"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!question.trim() || !language || isGenerating}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
          >
            {isGenerating ? '🤔 सोच रहे हैं... Thinking...' : '💡 सरल जवाब दें • Get Simple Answer'}
          </Button>
        </CardContent>
      </Card>

      {generatedAnswer && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <span>💡</span>
              <span>सरल जवाब • Simple Answer</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                {generatedAnswer}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" 
                onClick={handleCopy}
              >
                📋 Copy / कॉपी करें  
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600" 
                onClick={handleAnotherAnswer}
              >
                🔄 Another Answer / दूसरा जवाब
              </Button>
            </div>
            <ContentDownloader 
              content={generatedAnswer}
              filename={`qa-answer-${Date.now()}`}
              type="qa"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QASupport;
