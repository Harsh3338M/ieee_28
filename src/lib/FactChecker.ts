"use server";

import { createGroq } from '@ai-sdk/groq';
import { generateText } from 'ai';

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const factCheckSecurity = async (query: string, base64Image?: string) => {
    try {
      const systemPrompt = `
        You are a specialized Cyber-Security Fact Checker. 
        Analyze the user's input for scams or phishing.
        
        CRITICAL: You must output ONLY a valid JSON object. 
        Do not include any introductory text, markdown, or explanations outside the JSON.
  
        JSON Structure:
        {
          "riskLevel": "Low" | "Medium" | "High" | "Critical",
          "isScam": boolean,
          "summary": "Short verdict",
          "redFlags": ["Flag 1", "Flag 2"],
          "recommendations": ["Do this", "Don't do that"]
        }
      `;
  
      const { text } = await generateText({
        model: groq('meta-llama/llama-4-scout-17b-16e-instruct'),
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
      });
  
      // --- ROBUST EXTRACTION ---
      // This finds the first '{' and the last '}' and slices everything in between
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
         throw new Error("AI did not return a valid JSON object");
      }
      
      const cleanJson = jsonMatch[0];
      const analysis = JSON.parse(cleanJson);
  
      return { success: true, analysis };
    } catch (error) {
      console.error("Fact check failed:", error);
      return { success: false, error: "Analysis failed." };
    }
  };