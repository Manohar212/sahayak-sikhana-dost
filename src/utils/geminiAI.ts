
import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: In production, this should be stored in environment variables
// For now, we'll use a placeholder that users can replace
const API_KEY = 'YOUR_GEMINI_API_KEY_HERE';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey?: string) => {
  const key = apiKey || API_KEY;
  if (key === 'YOUR_GEMINI_API_KEY_HERE') {
    console.warn('Please set your Gemini API key');
    return false;
  }
  genAI = new GoogleGenerativeAI(key);
  return true;
};

export const generateStory = async (prompt: string, language: string) => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const enhancedPrompt = `Create a culturally relevant story for Indian children in ${language}. 
  Story request: ${prompt}
  
  Please include:
  - Simple, engaging language appropriate for children
  - Indian cultural context and values
  - A clear moral or lesson
  - Use emojis to make it visually appealing
  - Keep it between 150-300 words`;

  const result = await model.generateContent(enhancedPrompt);
  const response = await result.response;
  return response.text();
};

export const generateChildFriendlyAnswer = async (question: string, language: string) => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const enhancedPrompt = `Answer this child's question in ${language} using simple, easy-to-understand language.
  Question: ${question}
  
  Please provide:
  - A simple explanation suitable for children aged 6-12
  - Use analogies and examples from everyday Indian life
  - Include emojis to make it engaging
  - Keep the explanation under 200 words
  - Use a warm, encouraging tone`;

  const result = await model.generateContent(enhancedPrompt);
  const response = await result.response;
  return response.text();
};

export const generateWorksheetFromImage = async (imageData: string, grade: string) => {
  if (!genAI) {
    throw new Error('Gemini AI not initialized');
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
  
  const prompt = `Analyze this textbook page image and create a worksheet for Grade ${grade} students.
  
  Please:
  - Extract key concepts from the image
  - Create 5-7 questions appropriate for Grade ${grade}
  - Include different question types (fill-in-blanks, short answers, simple problems)
  - Use simple Hindi/English as appropriate
  - Format it clearly for printing`;

  const imagePart = {
    inlineData: {
      data: imageData,
      mimeType: "image/jpeg"
    }
  };

  const result = await model.generateContent([prompt, imagePart]);
  const response = await result.response;
  return response.text();
};
