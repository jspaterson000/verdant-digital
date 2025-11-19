import { GoogleGenAI, Type } from "@google/genai";
import { AuditResult } from '../types';

// Safely access process.env.API_KEY
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) ? process.env.API_KEY : '';
const ai = new GoogleGenAI({ apiKey });

export const generateAudit = async (businessDescription: string): Promise<AuditResult> => {
  if (!apiKey) {
    console.warn("API Key missing. Using fallback data.");
    // Return fallback immediately if key is missing to prevent API call failure
    return {
      score: 60,
      summary: "Your digital presence needs work if you want to beat the big guys.",
      recommendations: [
        "Claim your Google Business Profile immediately",
        "Showcase recent project photos to build trust",
        "Get a mobile-friendly website to capture leads"
      ]
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze the following trade/construction business description. Provide a practical digital presence audit. Focus on trust signals, local SEO, and lead generation for tradespeople.
      
      Business Description: "${businessDescription}"
      
      Return a JSON object with:
      - score: A number between 0-100 representing estimated digital maturity potential based on the description.
      - summary: A 1-sentence punchy, no-nonsense summary for a tradie.
      - recommendations: An array of 3 specific, high-impact actions (e.g., "Get 5 Google Reviews", "Add photos of past jobs", "Setup Google Business Profile").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            recommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["score", "summary", "recommendations"]
        }
      }
    });

    const text = response.text;
    if (!text) {
        throw new Error("No response from AI");
    }
    
    return JSON.parse(text) as AuditResult;
  } catch (error) {
    console.error("Gemini Audit Error:", error);
    // Fallback if AI fails or key is missing
    return {
      score: 60,
      summary: "Your digital presence needs work if you want to beat the big guys.",
      recommendations: [
        "Claim your Google Business Profile immediately",
        "Showcase recent project photos to build trust",
        "Get a mobile-friendly website to capture leads"
      ]
    };
  }
};