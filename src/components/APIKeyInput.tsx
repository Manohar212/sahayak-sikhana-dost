
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { initializeGemini } from '@/utils/geminiAI';
import { useToast } from '@/hooks/use-toast';

interface APIKeyInputProps {
  onKeySet: (isSet: boolean) => void;
}

const APIKeyInput = ({ onKeySet }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSetKey = () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Gemini API key",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    const success = initializeGemini(apiKey);
    
    if (success) {
      localStorage.setItem('gemini_api_key', apiKey);
      onKeySet(true);
      toast({
        title: "Success! 🎉",
        description: "Gemini AI is now ready to help you!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to initialize Gemini AI. Please check your API key.",
        variant: "destructive"
      });
    }
    setIsLoading(false);
  };

  React.useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      const success = initializeGemini(savedKey);
      if (success) {
        onKeySet(true);
      }
    }
  }, [onKeySet]);

  return (
    <Card className="warm-gradient border-saffron-200 mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-saffron-800">
          <span>🔑</span>
          <span>Setup Gemini AI</span>
        </CardTitle>
        <CardDescription className="text-saffron-600">
          अपनी Gemini API key डालें • Enter your Gemini API key to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-blue-800">
            <span>💡</span>
            <span className="font-medium">How to get your free API key:</span>
          </div>
          <ol className="text-sm text-blue-700 mt-2 space-y-1 list-decimal list-inside">
            <li>Visit <a href="https://ai.google.dev/" target="_blank" rel="noopener noreferrer" className="underline">ai.google.dev</a></li>
            <li>Click "Get API Key" and sign in with Google</li>
            <li>Create a new API key</li>
            <li>Paste it below</li>
          </ol>
        </div>
        
        <div className="flex space-x-2">
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your Gemini API key..."
            className="bg-white border-saffron-200"
          />
          <Button 
            onClick={handleSetKey}
            disabled={isLoading}
            className="saffron-gradient text-white hover:opacity-90"
          >
            {isLoading ? '⏳' : '🚀'} Setup
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default APIKeyInput;
