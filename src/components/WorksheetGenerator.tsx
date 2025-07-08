
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WorksheetGenerator = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
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
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-yellow-800">
            <span>🚧</span>
            <span className="font-medium">Coming Soon with Google Cloud Integration</span>
          </div>
          <p className="text-sm text-yellow-700 mt-1">
            This feature will use Gemini Vision API to extract text and generate differentiated worksheets for Grades 2, 4, and 6.
          </p>
        </div>
        
        <Button 
          disabled
          className="w-full bg-sage-400 text-white cursor-not-allowed"
        >
          🔄 Generate Worksheets (Coming Soon)
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorksheetGenerator;
