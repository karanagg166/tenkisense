// Translation and Japanese language service

import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Check if text contains Japanese characters
 */
export function containsJapanese(text: string): boolean {
    // Hiragana: \u3040-\u309F
    // Katakana: \u30A0-\u30FF  
    // Kanji: \u4E00-\u9FAF
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(text);
}

/**
 * Check if text is primarily Japanese
 */
export function isPrimarilyJapanese(text: string): boolean {
    const japaneseChars = (text.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) || []).length;
    const totalChars = text.replace(/\s/g, '').length;
    return japaneseChars / totalChars > 0.3;
}

/**
 * Translate Japanese to English using Gemini
 */
export async function translateToEnglish(text: string, apiKey: string): Promise<string> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Translate this Japanese text to English. Return ONLY the translation, nothing else:
"${text}"`;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("Translation error:", error);
        return text; // Return original if translation fails
    }
}

/**
 * Translate English to Japanese using Gemini
 */
export async function translateToJapanese(text: string, apiKey: string): Promise<string> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Translate this English text to Japanese. Use natural, conversational Japanese. Return ONLY the translation:
"${text}"`;

        const result = await model.generateContent(prompt);
        return result.response.text().trim();
    } catch (error) {
        console.error("Translation error:", error);
        return text;
    }
}

/**
 * Extract intent from Japanese query
 */
export async function extractJapaneseIntent(
    text: string,
    apiKey: string
): Promise<{ intent: string; city?: string; translated: string }> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Analyze this Japanese text and extract:
1. The intent (greeting, weather, travel, general)
2. Any city name mentioned (in English)
3. English translation

Return JSON only:
{"intent": "...", "city": "..." or null, "translated": "..."}

Text: "${text}"`;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text().trim();

        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return { intent: "general", translated: text };
    } catch (error) {
        console.error("Intent extraction error:", error);
        return { intent: "general", translated: text };
    }
}

/**
 * Generate bilingual response
 */
export async function generateBilingualResponse(
    englishResponse: string,
    apiKey: string,
    includeJapanese: boolean = false
): Promise<{ english: string; japanese?: string }> {
    if (!includeJapanese) {
        return { english: englishResponse };
    }

    const japanese = await translateToJapanese(englishResponse, apiKey);
    return { english: englishResponse, japanese };
}
