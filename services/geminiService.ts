
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeIncident = async (description: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze this security incident and provide a summary of recommended actions, severity classification, and possible SOP references: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            recommendedSeverity: { type: Type.STRING, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] },
            immediateActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            relevantSopReference: { type: Type.STRING }
          },
          required: ["summary", "recommendedSeverity", "immediateActions"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    return null;
  }
};

export const generatePostEventReport = async (eventDetails: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a formal security review report for the following event details: ${eventDetails}. Include observations, risks addressed, and improvement suggestions.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Report Generation Error:", error);
    return "Error generating report.";
  }
};
