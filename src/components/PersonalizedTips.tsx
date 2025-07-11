
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateAIContent } from '@/services/aiService';
import { useToast } from '@/hooks/use-toast';
import ContentDownloader from './ContentDownloader';

const PersonalizedTips = () => {
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [challenge, setChallenge] = useState('');
  const [generatedTips, setGeneratedTips] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!subject || !grade || !challenge) return;
    
    setIsGenerating(true);
    
    try {
      const tips = await generateAIContent('tips', '', { subject, grade, challenge });
      setGeneratedTips(tips);
      toast({
        title: "Tips Ready! 💡",
        description: "Your personalized teaching tips are ready!",
      });
    } catch (error) {
      console.error('Error generating tips:', error);
      toast({
        title: "Error",
        description: "Failed to generate tips. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedTips);
    toast({
      title: "Copied! 📋",
      description: "Tips copied to clipboard",
    });
  };

  const handleGenerateNew = () => {
    setGeneratedTips('');
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-yellow-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-yellow-800 dark:text-yellow-200">
            <span>💡</span>
            <span>Personalized Teaching Tips</span>
          </CardTitle>
          <CardDescription className="text-yellow-600 dark:text-yellow-300">
            व्यक्तिगत शिक्षण सुझाव पाएं • Get AI-powered teaching strategies tailored for your needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                विषय चुनें • Choose Subject
              </label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-yellow-200 dark:border-yellow-700">
                  <SelectValue placeholder="Select subject / विषय चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="math">गणित (Mathematics)</SelectItem>
                  <SelectItem value="science">विज्ञान (Science)</SelectItem>
                  <SelectItem value="social">सामाजिक विज्ञान (Social Studies)</SelectItem>
                  <SelectItem value="general">सामान्य (General Teaching)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                कक्षा • Grade Level
              </label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="bg-white dark:bg-gray-700 border-yellow-200 dark:border-yellow-700">
                  <SelectValue placeholder="Select grade / कक्षा चुनें" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="primary">Primary (1-5)</SelectItem>
                  <SelectItem value="middle">Middle (6-8)</SelectItem>
                  <SelectItem value="secondary">Secondary (9-10)</SelectItem>
                  <SelectItem value="mixed">Mixed Classes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
              चुनौती/समस्या • Teaching Challenge
            </label>
            <Select value={challenge} onValueChange={setChallenge}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-yellow-200 dark:border-yellow-700">
                <SelectValue placeholder="Select your challenge / समस्या चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="attention">Student Attention / ध्यान न देना</SelectItem>
                <SelectItem value="engagement">Low Engagement / रुचि की कमी</SelectItem>
                <SelectItem value="understanding">Concept Understanding / समझ की समस्या</SelectItem>
                <SelectItem value="behavior">Classroom Management / कक्षा नियंत्रण</SelectItem>
                <SelectItem value="resources">Limited Resources / संसाधन की कमी</SelectItem>
                <SelectItem value="assessment">Assessment Methods / मूल्यांकन</SelectItem>
                <SelectItem value="motivation">Student Motivation / प्रेरणा की कमी</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!subject || !grade || !challenge || isGenerating}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white transition-colors"
          >
            {isGenerating ? '💭 सुझाव तैयार हो रहे हैं... Generating Tips...' : '✨ व्यक्तिगत सुझाव पाएं • Get Personalized Tips'}
          </Button>
        </CardContent>
      </Card>

      {generatedTips && (
        <Card className="bg-white dark:bg-gray-800 border-yellow-200 dark:border-yellow-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-yellow-800 dark:text-yellow-200 flex items-center space-x-2">
              <span>🎯</span>
              <span>Your Personalized Teaching Tips • आपके व्यक्तिगत सुझाव</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                {generatedTips}
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600" 
                onClick={handleCopy}
              >
                📋 Copy / कॉपी करें
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-yellow-700 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600" 
                onClick={handleGenerateNew}
              >
                🔄 New Tips / नए सुझाव
              </Button>
            </div>
            <ContentDownloader 
              content={generatedTips}
              filename={`teaching-tips-${Date.now()}`}
              type="lesson"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PersonalizedTips;
