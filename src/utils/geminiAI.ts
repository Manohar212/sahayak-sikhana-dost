
import { GoogleGenerativeAI } from '@google/generative-ai';

// Default API key for demo purposes - users should replace with their own
const DEFAULT_API_KEY = 'AIzaSyBmD4QlF8o8nO_2OAG9kqyR1HzXQo8N6Ts';

let genAI: GoogleGenerativeAI | null = null;

export const initializeGemini = (apiKey?: string) => {
  const key = apiKey || localStorage.getItem('gemini_api_key') || DEFAULT_API_KEY;
  
  try {
    genAI = new GoogleGenerativeAI(key);
    return true;
  } catch (error) {
    console.error('Failed to initialize Gemini AI:', error);
    return false;
  }
};

export const generateStory = async (prompt: string, language: string) => {
  if (!genAI) {
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro" });
  
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
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro" });
  
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
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro-vision" });
  
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

export const generateDashboardData = async () => {
  if (!genAI) {
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate realistic educational data for a teacher's dashboard in India. Include:
  - Student performance metrics
  - Recent activities
  - Teaching insights
  - Progress summaries
  Format as structured data suitable for a dashboard.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateAssignmentData = async () => {
  if (!genAI) {
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate assignment data for Indian school teachers including:
  - Subject-wise assignments
  - Due dates and completion rates
  - Grade levels
  - Assignment types (worksheets, projects, etc.)
  Make it realistic and relevant to Indian curriculum.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateProgressData = async () => {
  if (!genAI) {
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate student progress data for Indian schools including:
  - Academic performance trends
  - Subject-wise improvements
  - Individual student progress
  - Class averages and comparisons
  Make it comprehensive and actionable for teachers.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

export const generateResourceData = async () => {
  if (!genAI) {
    const initialized = initializeGemini();
    if (!initialized) {
      throw new Error('Gemini AI not initialized');
    }
  }

  const model = genAI!.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Generate educational resources for Indian teachers including:
  - Teaching materials
  - Lesson plans
  - Activity suggestions
  - Cultural context materials
  - Assessment tools
  Make it practical and culturally relevant.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};

// Initialize with default key on module load
initializeGemini();
