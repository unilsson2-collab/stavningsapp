
import { GoogleGenAI } from "@google/genai";

// We use the browser's built-in Speech Synthesis for INSTANT audio
export function speakWord(text: string) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sv-SE';
    utterance.rate = 0.8; // A bit slower for clarity
    window.speechSynthesis.speak(utterance);
  }
}

export async function getSpellingExplanation(word: string, attempt: string, correct: string, context: string): Promise<string> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return "Bra kämpat! Kom ihåg regeln.";

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    // Timeout pattern for faster fallback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Kort pedagogisk förklaring för barn 10 år. Varför stavas "${correct}" så och inte "${attempt}"? Kontext: ${context}. Max 15 ord.`,
    });

    clearTimeout(timeoutId);
    return response.text || "Bra jobbat!";
  } catch (err) {
    console.warn("AI explanation failed, using fallback", err);
    return "Kom ihåg regeln för det här ordet, du fixar det nästa gång!";
  }
}
