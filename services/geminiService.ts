import { GoogleGenAI, Type } from "@google/genai";

// FIX: Refactored to align with Gemini API guidelines.
// The API key is sourced directly from process.env.API_KEY and manual checks are removed,
// assuming the key is always present in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getExplanation(topic: string, context: string): Promise<string> {
  try {
    const prompt = `
      You are an expert AI researcher and educator with a knack for making complex topics understandable.
      Your task is to explain a concept from the provided text.

      **Instructions:**
      1.  Explain the following concept or mathematical formula in simple, clear terms.
      2.  Assume the audience is a software engineer who is smart but not an expert in this specific domain.
      3.  Keep the explanation concise, focusing on the core intuition.
      4.  Start the explanation directly, without preamble like "This equation represents...".

      ---
      **Concept to Explain:**
      \`\`\`latex
      ${topic}
      \`\`\`

      **Surrounding Context:**
      ${context}
      ---

      **Explanation:**
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
}

export async function getKeywordsForText(text: string): Promise<string[]> {
  try {
    const prompt = `
      From the following text, extract the 10 most important and specific key concepts, technical terms, or named entities.
      Return them as a JSON array of strings. For example: ["Quantum Physics", "General Relativity"].
      Return *only* the JSON array.

      ---
      **Text for Analysis:**
      ${text}
      ---
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
       config: {
         responseMimeType: "application/json",
         responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING
            }
          },
       },
    });

    const jsonText = response.text.trim();
    const keywords = JSON.parse(jsonText);
    return keywords.slice(0, 12); // Limit to max 12 keywords for UI
  } catch (error) {
      console.error("Gemini API error while extracting keywords:", error);
      throw new Error("Failed to extract keywords using the AI model.");
  }
}

export async function generateNovelIdeaForText(text: string, selectedTopics: string[]): Promise<string> {
  if (selectedTopics.length === 0) {
    throw new Error("At least one topic must be selected to generate a novel idea.");
  }
  
  try {
    const prompt = `
      You are an HNE (Hypothetical/Novel/Exploratory) Engine.
      Your purpose is to generate a novel, speculative, and creative hypothesis that extends or challenges the concepts presented in the provided text, focusing specifically on the user-selected topics.

      **Instructions:**
      1.  Read the provided text for foundational context.
      2.  Your primary creative focus must be on the intersection, combination, or extension of the **Focus Topics**.
      3.  Generate a single, compelling, and boundary-pushing hypothesis.
      4.  The idea should be insightful and spark further investigation.
      5.  Present the idea clearly and concisely. Start directly with the hypothesis.

      ---
      **Content for Context:**
      ${text}

      ---
      **Focus Topics for Novelty:**
      - ${selectedTopics.join('\n- ')}
      ---

      **Generated Hypothesis:**
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("Failed to generate novel idea from the AI model.");
  }
}

// --- Specific functions for the ZCEB framework document ---
import { DOCUMENT_TEXT } from '../data/document';

export async function getKeywords(sectionContent: string): Promise<string[]> {
    // This function is now a wrapper around the generic one
    return getKeywordsForText(sectionContent);
}

export async function getNovelIdea(sectionTitle: string, sectionContent: string, selectedTopics: string[]): Promise<string> {
    // This function now uses the generic idea generator, but could be adapted
    // to include ZCEB-specific context if needed in the future.
    const fullContext = `Section "${sectionTitle}":\n${sectionContent}`;
    return generateNovelIdeaForText(fullContext, selectedTopics);
}