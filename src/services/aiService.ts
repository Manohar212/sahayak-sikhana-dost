import { supabase } from '@/integrations/supabase/client';

export const generateAIContent = async (
  type: 'story' | 'qa' | 'worksheet' | 'lesson' | 'visual' | 'tips',
  prompt: string,
  options: {
    language?: string;
    grade?: string;
    subject?: string;
    challenge?: string;
  } = {}
) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-ai-content', {
      body: {
        prompt,
        type,
        language: options.language || 'Hindi',
        grade: options.grade,
        subject: options.subject,
        challenge: options.challenge,
      },
    });

    if (error) throw error;
    return data.content;
  } catch (error) {
    console.error('AI content generation error:', error);
    throw new Error('Failed to generate content. Please try again.');
  }
};

// Legacy function names for backward compatibility
export const generateStory = (prompt: string, language: string) =>
  generateAIContent('story', prompt, { language });

export const generateChildFriendlyAnswer = (question: string, language: string) =>
  generateAIContent('qa', question, { language });

export const generatePersonalizedTips = (subject: string, grade: string, challenge: string) =>
  generateAIContent('tips', '', { subject, grade, challenge });