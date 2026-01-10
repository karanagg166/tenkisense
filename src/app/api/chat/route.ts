import { CohereClient } from "cohere-ai";
import { NextRequest, NextResponse } from "next/server";

// Known cities for better extraction
const CITIES = [
    // Japan
    "tokyo", "osaka", "kyoto", "yokohama", "nagoya", "sapporo", "fukuoka", "kobe",
    "hiroshima", "sendai", "nara", "kanazawa", "okinawa", "nikko", "hakone",
    // India  
    "mumbai", "delhi", "bangalore", "bengaluru", "chennai", "kolkata", "hyderabad",
    "pune", "ahmedabad", "jaipur", "lucknow", "surat", "indore", "bhopal", "jabalpur",
    "nagpur", "kochi", "goa", "varanasi", "agra", "amritsar", "udaipur", "jodhpur",
    "shimla", "manali", "rishikesh", "dehradun", "darjeeling", "srinagar", "kashmir",
    "leh", "ladakh", "mysore", "ooty", "kodaikanal", "pondicherry", "guwahati"
];

// Extract city from text
function extractCity(text: string): string | null {
    const lower = text.toLowerCase();

    // Check for known cities first
    for (const city of CITIES) {
        if (lower.includes(city)) {
            return city.charAt(0).toUpperCase() + city.slice(1);
        }
    }

    // Pattern matching for unknown cities
    const patterns = [
        /(?:weather|activities?|things to do|visit|travel|going|trip|in|at|for|to)\s+(?:in|to|at|for)?\s*([a-zA-Z]+)/i,
        /([a-zA-Z]+)\s+(?:weather|temperature|forecast|activities?)/i,
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1] && match[1].length > 2) {
            return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
        }
    }

    return null;
}

// Fetch weather from OpenWeather API
async function getWeather(city: string) {
    try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        if (!apiKey) return null;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
        const res = await fetch(url);

        if (!res.ok) return null;

        const data = await res.json();
        return {
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            humidity: data.main.humidity,
            windSpeed: Math.round(data.wind.speed * 3.6),
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            main: data.weather[0].main,
        };
    } catch (error) {
        console.error("Weather fetch error:", error);
        return null;
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const message = body.message?.trim();
        const language = body.language || "en"; // Get language from request

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const apiKey = process.env.COHERE_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: "COHERE_API_KEY not configured" }, { status: 500 });
        }

        console.log("📝 Input:", message, "| Language:", language);

        // Try to extract city from the message
        const city = extractCity(message);
        console.log("🏙️ Extracted city:", city);

        // Initialize Cohere
        const cohere = new CohereClient({ token: apiKey });

        // Language instruction
        const langInstruction = language === "ja"
            ? "IMPORTANT: You MUST respond entirely in Japanese (日本語). Use natural, polite Japanese."
            : "Respond in English.";

        let prompt: string;
        let weatherData = null;

        if (city) {
            // CASE 1: City detected - Fetch weather and include it in prompt
            const weather = await getWeather(city);

            if (weather) {
                weatherData = {
                    temp: weather.temp,
                    feelsLike: weather.feelsLike,
                    description: weather.description,
                    icon: weather.icon
                };

                prompt = `You are TenkiSense, a helpful travel and weather assistant.

${langInstruction}

CURRENT WEATHER DATA for ${weather.city}, ${weather.country}:
- Temperature: ${weather.temp}°C (feels like ${weather.feelsLike}°C)
- Condition: ${weather.description}
- Humidity: ${weather.humidity}%
- Wind Speed: ${weather.windSpeed} km/h

USER QUERY: "${message}"

Based on the weather data above, respond helpfully to the user's query. 
If they ask about activities, suggest weather-appropriate activities.
If they ask about clothing/packing, give specific advice based on the temperature.
If they just ask about weather, describe it naturally.
Keep your response conversational and helpful, 2-4 sentences.`;

                console.log("☀️ Weather fetched:", weather.temp + "°C", weather.description);
            } else {
                // City detected but weather fetch failed
                prompt = `You are TenkiSense, a travel and weather assistant.
${langInstruction}
The user asked: "${message}"
I tried to get weather for "${city}" but couldn't find it. 
Apologize briefly and ask them to check the city name spelling. Keep it friendly.`;
            }
        } else {
            // CASE 2: No city - Just normal conversation
            prompt = `You are TenkiSense, a friendly travel and weather assistant specializing in Japan and India.

${langInstruction}

USER MESSAGE: "${message}"

Respond naturally and helpfully. 
- If it's a greeting, greet them warmly and mention you can help with weather/travel.
- If they ask about travel or weather without a city, ask which city they're interested in.
- For other questions, be helpful and conversational.
Keep your response concise, 1-3 sentences.`;
        }

        console.log("🤖 Calling Cohere...");

        const response = await cohere.chat({
            model: "command-r7b-12-2024",
            message: prompt,
        });

        const responseText = response.text.trim();

        console.log("✅ Response:", responseText.substring(0, 80) + "...");

        return NextResponse.json({
            response: responseText,
            city: weatherData ? city : null,
            weather: weatherData
        });

    } catch (error: any) {
        console.error("❌ Error:", error?.message);

        return NextResponse.json({
            response: "Something went wrong. Please try again!",
            error: error?.message
        });
    }
}
