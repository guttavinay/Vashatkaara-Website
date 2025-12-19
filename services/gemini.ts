
import { GoogleGenAI } from "@google/genai";

// Function to handle AI strategist chat using the Gemini API
export const getAIResponse = async (userPrompt: string) => {
  // Defensive check for process.env
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : '';
  
  if (!apiKey) {
    console.error("Gemini API Error: API_KEY is missing from process.env");
    return "The AI consultant is currently offline. Please check your configuration.";
  }

  // CRITICAL: Initialize GoogleGenAI directly inside the function using process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: apiKey as string });

  const systemInstruction = `
    You are the Senior Solutions Architect for Vashatkaara, a leading software company. 
    Our services include:
    1. Content Management (CMS)
    2. Software Outsourcing
    3. Document Scanning & OCR Tools
    4. AI Integrations
    5. Chatbot Development

    The user is asking for advice, a quote, or technical details. 
    Be professional, concise, and technical. Recommend specific Vashatkaara services where relevant.
    Maintain a modern tech-forward tone.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "An error occurred while communicating with the AI consultant.";
  }
};
