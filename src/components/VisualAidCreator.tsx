
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import APIKeyInput from './APIKeyInput';

const VisualAidCreator = () => {
  const [concept, setConcept] = useState('');
  const [generatedDrawing, setGeneratedDrawing] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!concept.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation for now - this would use Gemini for text-to-image or detailed drawing descriptions
    setTimeout(() => {
      const drawingDescription = `📐 Simple Drawing Instructions for: ${concept}

🎯 Materials needed:
- Chalk/Marker
- Blackboard/Whiteboard
- Scale/Ruler

📝 Step-by-step drawing guide:

1. Start with basic shapes
   • Draw a large circle in the center
   • Add smaller circles around it

2. Add details
   • Draw simple lines connecting the shapes
   • Add labels in both Hindi and English

3. Final touches
   • Use different colors if available
   • Make text large enough for all students to see

💡 Teaching tip: Draw this step-by-step with students, explaining each part as you go!`;

      setGeneratedDrawing(drawingDescription);
      setIsGenerating(false);
      toast({
        title: "Drawing Guide Ready! 🎨",
        description: "Visual aid instructions created!",
      });
    }, 2000);
  };

  if (!isApiKeySet) {
    return <APIKeyInput onKeySet={setIsApiKeySet} />;
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-800">
            <span>🎨</span>
            <span>Visual Aid Creator</span>
          </CardTitle>
          <CardDescription className="text-purple-600">
            ब्लैकबोर्ड के लिए सरल चित्र बनाएं • Create simple drawings for blackboard teaching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-purple-800 mb-2">
              कॉन्सेप्ट बताएं • Describe the Concept
            </label>
            <Textarea
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              placeholder="उदाहरण: फोटोसिंथेसिस, सौर मंडल, हृदय... / Example: Photosynthesis, Solar System, Heart..."
              className="bg-white border-purple-200 min-h-[100px]"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!concept.trim() || isGenerating}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors"
          >
            {isGenerating ? '🎨 चित्र बन रहा है... Creating Drawing...' : '✏️ Drawing Guide बनाएं • Create Drawing Guide'}
          </Button>
        </CardContent>
      </Card>

      {generatedDrawing && (
        <Card className="bg-white border-purple-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center space-x-2">
              <span>📐</span>
              <span>Drawing Instructions • चित्र बनाने के निर्देश</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {generatedDrawing}
            </div>
            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
                📋 Copy / कॉपी करें
              </Button>
              <Button variant="outline" size="sm" className="text-purple-700 border-purple-300">
                🖨️ Print / प्रिंट करें
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VisualAidCreator;
