import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error('Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

export class GeminiService {
  private model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  async generateResponse(prompt: string): Promise<string> {
    try {
      // Add context about TrekSure to make responses more relevant
      const contextualPrompt = `You are a helpful AI assistant for TrekSure, an AI-powered travel safety platform. 
      TrekSure provides real-time risk assessment, community-driven safety intelligence, interactive safety maps, 
      incident reporting, and emergency response features for travelers worldwide. 
      
      Please provide helpful, accurate, and relevant responses about travel safety, the platform features, 
      or general travel assistance. Keep responses concise and friendly.
      
      User question: ${prompt}`;

      const result = await this.model.generateContent(contextualPrompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error generating response:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  }

  async generateStreamResponse(prompt: string): Promise<AsyncGenerator<string, void, unknown>> {
    try {
      const contextualPrompt = `You are a helpful AI assistant for TrekSure, an AI-powered travel safety platform. 
      TrekSure provides real-time risk assessment, community-driven safety intelligence, interactive safety maps, 
      incident reporting, and emergency response features for travelers worldwide. 
      
      Please provide helpful, accurate, and relevant responses about travel safety, the platform features, 
      or general travel assistance. Keep responses concise and friendly.
      
      User question: ${prompt}`;

      const result = await this.model.generateContentStream(contextualPrompt);
      
      async function* streamGenerator() {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          yield chunkText;
        }
      }
      
      return streamGenerator();
    } catch (error) {
      console.error('Error generating stream response:', error);
      throw new Error('Failed to generate response. Please try again.');
    }
  }
}

export const geminiService = new GeminiService();