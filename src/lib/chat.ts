"use server";

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateLessonData = async (topic: string, lessonNumber: number): Promise<{ 
  success: boolean; 
  data?: LevelData; 
  error?: string 
}> => {
  try {
    const systemPrompt = `
You are an expert Security and AI Educator. Create a comprehensive lesson about "${topic}".
Return ONLY a raw JSON object matching this TypeScript interface:

interface Step {
  id: number;
  type: 'intro' | 'comparison' | 'quiz';
  title: string;
  description: string;
  illustration?: string; // Describe a visual scene or icon related to the step
  options?: string[]; 
  correctAnswer?: string;
}

interface LevelData {
  lesson: number;
  steps: Step[];
  xp: number;
  title: string;
  badges: string[];
  points: number;
}

Rules:
1. Return exactly 3-5 steps.
2. The last step MUST be a 'quiz' type.
3. The 'illustration' field should contain a descriptive prompt for an image (e.g., "A digital shield protecting a cloud").
4. Assign XP (100-300) and Points (100-300) based on topic complexity.
5. Create 1 relevant badge name in the 'badges' array (e.g., "firewall-warden").
6. No markdown, no conversational text, ONLY the JSON object.
    `;

    const { text } = await generateText({
      model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Generate Lesson #${lessonNumber} about: ${topic}` },
      ],
    });

    const cleanJson = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(cleanJson) as LevelData;
console.log("Generated Lesson Data:", result);
    // Force the lesson number to match the input
    result.lesson = lessonNumber;

    return { success: true, data: result };
  } catch (error) {
    console.error("Lesson generation failed:", error);
    return { success: false, error: "Failed to generate lesson content." };
  }
};