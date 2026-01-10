import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error("⚠️ GEMINI_API_KEY is not set in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

export async function POST(req: NextRequest) {
    try {
        const { text } = await req.json();

        if (!text) {
            return NextResponse.json(
                { error: "Text is required" },
                { status: 400 }
            );
        }

        console.log("📝 Extracting city from:", text);

        if (!apiKey) {
            console.error("❌ GEMINI_API_KEY is missing");
            return NextResponse.json(
                { error: "API key not configured" },
                { status: 500 }
            );
        }

        // Use Gemini to extract city name
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `Extract ONLY the city name from this weather query. Return just the city name, nothing else. If no city is mentioned, return "Unknown".

Query: "${text}"

City:`;

        console.log("🤖 Calling Gemini API...");
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const city = response.text().trim();

        console.log(`✅ Extracted city: "${city}" from text: "${text}"`);

        return NextResponse.json({ city });
    } catch (error: any) {
        console.error("❌ Error extracting city:", error);
        console.error("Error details:", {
            message: error?.message,
            status: error?.status,
            statusText: error?.statusText,
            stack: error?.stack,
        });
        return NextResponse.json(
            { error: "Failed to extract city", details: error?.message },
            { status: 500 }
        );
    }
}
