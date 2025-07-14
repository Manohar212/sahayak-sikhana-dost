import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, type, language = 'Hindi', grade, subject, challenge } = await req.json();

    // Get Gemini API key from environment or use fallback
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY') || 'AIzaSyDXm3IFSpfxCfEMoZCXOubVwBx8rGxsEKI';
    
    console.log('API Key available:', !!geminiApiKey);
    console.log('Request data:', { type, language, grade, subject, challenge });

    let enhancedPrompt = '';
    
    switch (type) {
      case 'story':
        enhancedPrompt = `Create a culturally relevant story for Indian children in ${language}. 
        Story request: ${prompt}
        
        Please include:
        - Simple, engaging language appropriate for children
        - Indian cultural context and values
        - A clear moral or lesson
        - Use emojis to make it visually appealing
        - Keep it between 150-300 words`;
        break;
        
      case 'qa':
        enhancedPrompt = `Answer this child's question in ${language} using simple, easy-to-understand language.
        Question: ${prompt}
        
        Please provide:
        - A simple explanation suitable for children aged 6-12
        - Use analogies and examples from everyday Indian life
        - Include emojis to make it engaging
        - Keep the explanation under 200 words
        - Use a warm, encouraging tone`;
        break;
        
      case 'worksheet':
        enhancedPrompt = `Create a worksheet for Grade ${grade} students on the topic: ${prompt}
        
        Please include:
        - 5-7 questions appropriate for Grade ${grade}
        - Different question types (fill-in-blanks, short answers, simple problems)
        - Use simple Hindi/English as appropriate
        - Format it clearly for printing
        - Include answer key at the end`;
        break;
        
      case 'lesson':
        enhancedPrompt = `Create a lesson plan for Grade ${grade} students on the topic: ${prompt}
        
        Please include:
        - Learning objectives
        - Materials needed (low-cost options)
        - Step-by-step teaching activities
        - Assessment methods
        - Cultural relevance for Indian classrooms
        - Duration: 45 minutes`;
        break;
        
      case 'visual':
        enhancedPrompt = `Create a text-based visual aid description for Grade ${grade} students on: ${prompt}
        
        Please provide:
        - Detailed description of visual elements
        - Simple diagrams or charts (described in text)
        - Color suggestions and layout
        - How to create with basic materials
        - Educational purpose of each element`;
        break;
        
      case 'tips':
        enhancedPrompt = `Generate personalized teaching tips for an Indian teacher facing specific challenges.

        Subject: ${subject}
        Grade Level: ${grade}
        Challenge: ${challenge}
        
        Please provide:
        - 5-7 practical, actionable teaching tips
        - Solutions specific to Indian classroom context
        - Low-cost or no-cost strategies
        - Cultural sensitivity and local examples
        - Tips in both Hindi and English where appropriate
        - Real classroom scenarios and examples
        - Easy-to-implement strategies
        
        Format the response with clear headings, bullet points, and practical examples.`;
        break;
        
      default:
        enhancedPrompt = prompt;
    }

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: enhancedPrompt
          }]
        }]
      }),
    });

    console.log('Gemini API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error response:', errorText);
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response data:', JSON.stringify(data, null, 2));
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content || !data.candidates[0].content.parts) {
      throw new Error('Invalid response structure from Gemini API');
    }
    
    const generatedText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ content: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-ai-content function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});