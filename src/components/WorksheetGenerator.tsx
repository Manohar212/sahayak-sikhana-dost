
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { generateWorksheetFromImage } from '@/utils/geminiAI';
import { useToast } from '@/hooks/use-toast';
import ContentDownloader from './ContentDownloader';

const WorksheetGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [generatedWorksheet, setGeneratedWorksheet] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
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

  return (
    <div className="space-y-6">
      <Card className="warm-gradient border-green-200 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
            <span>📝</span>
            <span>Worksheet Generator</span>
          </CardTitle>
          <CardDescription className="text-green-600 dark:text-green-300">
            किताब की फोटो से worksheet बनाएं • Create worksheets from textbook photos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-800 dark:text-green-200 mb-2">
              कक्षा चुनें • Choose Grade
            </label>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="bg-white dark:bg-gray-700 border-green-200 dark:border-green-700">
                <SelectValue placeholder="Select grade / कक्षा चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2">Grade 2 / कक्षा 2</SelectItem>
                <SelectItem value="4">Grade 4 / कक्षा 4</SelectItem>
                <SelectItem value="6">Grade 6 / कक्षा 6</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-green-700 dark:text-green-300 mb-2">
                {selectedImage ? selectedImage.name : 'Click to upload textbook photo'}
              </p>
              <p className="text-sm text-green-500 dark:text-green-400">
                किताब का पेज अपलोड करें • Upload textbook page
              </p>
            </label>
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!selectedImage || !selectedGrade || isGenerating}
            className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors"
          >
            {isGenerating ? '🔄 Worksheet बन रहा है... Creating Worksheet...' : '📝 Worksheet बनाएं • Generate Worksheet'}
          </Button>
        </CardContent>
      </Card>

      {generatedWorksheet && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-200 flex items-center space-x-2">
              <span>📄</span>
              <span>Generated Worksheet • बना हुआ Worksheet</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed font-mono text-sm bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                {generatedWorksheet}
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
            </div>
            <ContentDownloader 
              content={generatedWorksheet}
              filename={`worksheet-grade-${selectedGrade}-${Date.now()}`}
              type="worksheet"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorksheetGenerator;
