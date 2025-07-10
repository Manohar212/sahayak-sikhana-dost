
import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;

  constructor() {
    // Initialize with a default API key that users can replace
    this.initializeAPI('AIzaSyD9JK8vQK6V4XxZ9Q3R7M8N2P5T1Y4U3W6');
  }

  initializeAPI(apiKey: string) {
    try {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    } catch (error) {
      console.error('Failed to initialize Gemini AI:', error);
    }
  }

  async generateStory(prompt: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    try {
      const enhancedPrompt = `Create an engaging educational story for primary school children based on the following prompt: "${prompt}". 
      The story should be:
      - Age-appropriate and educational
      - Include moral values
      - Be written in simple language
      - Include relatable characters
      - Have a clear beginning, middle, and end
      
      Story:`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating story:', error);
      throw new Error('Failed to generate story. Please try again.');
    }
  }

  async answerQuestion(question: string, context?: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    try {
      const enhancedPrompt = `You are an AI teaching assistant helping primary school teachers. Answer the following question in a simple, clear, and educational manner suitable for young students:

      Question: "${question}"
      ${context ? `Context: ${context}` : ''}
      
      Please provide a simple, accurate answer that a primary school student can understand:`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error answering question:', error);
      throw new Error('Failed to answer question. Please try again.');
    }
  }

  async generateWorksheet(subject: string, grade: string, topic: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    try {
      const enhancedPrompt = `Create a comprehensive worksheet for ${grade} students on the topic of "${topic}" in ${subject}. 
      
      The worksheet should include:
      - Clear instructions
      - 8-10 questions of varying difficulty
      - A mix of question types (multiple choice, fill in the blanks, short answers)
      - Age-appropriate content
      - Space for answers
      
      Format the worksheet clearly with headings and organized sections:`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating worksheet:', error);
      throw new Error('Failed to generate worksheet. Please try again.');
    }
  }

  async createLessonPlan(subject: string, grade: string, topic: string, duration: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    try {
      const enhancedPrompt = `Create a detailed lesson plan for ${grade} students on the topic of "${topic}" in ${subject} for a ${duration} class.
      
      The lesson plan should include:
      - Learning objectives
      - Materials needed
      - Introduction (5-10 minutes)
      - Main activity (detailed steps)
      - Assessment methods
      - Conclusion and recap
      - Homework/follow-up activities
      
      Make it engaging and age-appropriate:`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error creating lesson plan:', error);
      throw new Error('Failed to create lesson plan. Please try again.');
    }
  }

  async generateVisualAidIdeas(topic: string): Promise<string> {
    if (!this.model) {
      throw new Error('Gemini AI not initialized. Please check your API key.');
    }

    try {
      const enhancedPrompt = `Suggest simple visual aids and drawings that a teacher can create on a blackboard or chart paper for the topic: "${topic}".
      
      Provide:
      - 5-7 specific drawing ideas
      - Step-by-step instructions for each drawing
      - How each visual aid helps explain the concept
      - Materials needed (chalk, colored pencils, etc.)
      
      Keep suggestions simple and practical for a classroom setting:`;

      const result = await this.model.generateContent(enhancedPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating visual aid ideas:', error);
      throw new Error('Failed to generate visual aid ideas. Please try again.');
    }
  }
}

export const geminiService = new GeminiService();
