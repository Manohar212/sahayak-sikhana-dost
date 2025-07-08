
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateWorksheetFromImage } from '@/utils/geminiAI';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from './APIKeyInput';

const WorksheetGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [generatedWorksheet, setGeneratedWorksheet] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64 = result.split(',')[1]; // Remove data:image/jpeg;base64, prefix
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleGenerate = async () => {
    if (!selectedImage || !selectedGrade) return;
    
    setIsGenerating(true);
    
    try {
      const imageBase64 = await convertImageToBase64(selectedImage);
      const worksheet = await generateWorksheetFromImage(imageBase64, selectedGrade);
      setGeneratedWorksheet(worksheet);
      toast({
        title: "Worksheet Created! 📄",
        description: `Grade ${selectedGrade} worksheet is ready!`,
      });
    } catch (error) {
      console.error('Error generating worksheet:', error);
      toast({
        title: "Error",
        description: "Failed to generate worksheet. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedWorksheet);
    toast({
      title: "Copied! 📋",
      description: "Worksheet copied to clipboard",
    });
  };

  if (!isApiKeySet) {
    return <APIKeyInput onKeySet={setIsApiKeySet} />;
  }

  return (
    <div className="space-y-6">
      <Card className="warm-gradient border-sage-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-sage-800">
            <span>📝</span>
            <span>Worksheet Generator</span>
          </CardTitle>
          <CardDescription className="text-sage-600">
            किताब की फोटो से worksheet बनाएं • Create worksheets from textbook photos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-sage-800 mb-2">
              कक्षा चुनें • Choose Grade
            </label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="bg-white border-sage-200">
                <SelectValue placeholder="Select grade / कक्षा चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Grade 2 / कक्षा 2</SelectItem>
                <SelectItem value="4">Grade 4 / कक्षा 4</SelectItem>
                <SelectItem value="6">Grade 6 / कक्षा 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-2 border-dashed border-sage-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-sage-700 mb-2">
                {selectedImage ? selectedImage.name : 'Click to upload textbook photo'}
              </p>
              <p className="text-sm text-sage-500">
                किताब का पेज अपलोड करें • Upload textbook page
              </p>
            </label>
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!selectedImage || !selectedGrade || isGenerating}
            className="w-full sage-gradient text-white hover:opacity-90 transition-opacity"
          >
            {isGenerating ? '🔄 Worksheet बन रहा है... Creating Worksheet...' : '📝 Worksheet बनाएं • Generate Worksheet'}
          </Button>
        </CardContent>
      </Card>

      {generatedWorksheet && (
        <Card className="bg-white border-sage-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-sage-800 flex items-center space-x-2">
              <span>📄</span>
              <span>Generated Worksheet • बना हुआ Worksheet</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed font-mono text-sm bg-gray-50 p-4 rounded-lg">
                {generatedWorksheet}
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300" onClick={handleCopy}>
                📋 Copy / कॉपी करें
              </Button>
              <Button variant="outline" size="sm" className="text-sage-700 border-sage-300" onClick={() => window.print()}>
                🖨️ Print / प्रिंट करें
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorksheetGenerator;
