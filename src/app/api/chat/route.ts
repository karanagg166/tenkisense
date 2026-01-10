import { CohereClient } from "cohere-ai";
import { NextRequest, NextResponse } from "next/server";

// Known cities map (English -> OpenWeather format)
const KNOWN_CITIES: Record<string, string> = {
    // Japanese cities with Japanese names
    "東京": "Tokyo", "tokyo": "Tokyo", "とうきょう": "Tokyo",
    "大阪": "Osaka", "osaka": "Osaka", "おおさか": "Osaka",
    "京都": "Kyoto", "kyoto": "Kyoto", "きょうと": "Kyoto",
    "横浜": "Yokohama", "yokohama": "Yokohama",
    "名古屋": "Nagoya", "nagoya": "Nagoya",
    "札幌": "Sapporo", "sapporo": "Sapporo",
    "福岡": "Fukuoka", "fukuoka": "Fukuoka",
    "神戸": "Kobe", "kobe": "Kobe",
    "広島": "Hiroshima", "hiroshima": "Hiroshima",
    "仙台": "Sendai", "sendai": "Sendai",
    "沖縄": "Okinawa", "okinawa": "Okinawa",
    // Indian cities
    "mumbai": "Mumbai", "delhi": "Delhi", "bangalore": "Bangalore",
    "chennai": "Chennai", "kolkata": "Kolkata", "hyderabad": "Hyderabad",
    "pune": "Pune", "jaipur": "Jaipur", "goa": "Goa", "varanasi": "Varanasi",
    // Major world cities
    "london": "London", "paris": "Paris", "new york": "New York",
    "los angeles": "Los Angeles", "dubai": "Dubai", "singapore": "Singapore",
    "sydney": "Sydney", "berlin": "Berlin", "rome": "Rome", "amsterdam": "Amsterdam",
    "toronto": "Toronto", "bangkok": "Bangkok", "seoul": "Seoul", "beijing": "Beijing",
    "shanghai": "Shanghai", "moscow": "Moscow", "cairo": "Cairo", "barcelona": "Barcelona",
};

// Extract city from text using pattern matching
function extractCity(text: string): string | null {
    const lower = text.toLowerCase();

    // First check for known cities (including Japanese)
    for (const [key, value] of Object.entries(KNOWN_CITIES)) {
        if (text.includes(key) || lower.includes(key.toLowerCase())) {
            return value;
        }
    }

    // Common patterns to extract city names
    const patterns = [
        // "weather in London", "weather of Paris"
        /weather\s+(?:in|of|for|at)\s+([a-zA-Z][a-zA-Z\s]*?)(?:\?|$|,|\.|\!|\s+and|\s+or)/i,
        // "London weather", "Paris temperature"
        /([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\s+(?:weather|temperature|forecast|climate)/i,
        // "what to wear in Berlin"
        /(?:wear|pack|bring|clothes?)\s+(?:in|to|for)\s+([a-zA-Z][a-zA-Z\s]*?)(?:\?|$|,|\.|\!)/i,
        // "activities in Tokyo", "things to do in Dubai"
        /(?:activities?|things?\s+to\s+do)\s+(?:in|at)\s+([a-zA-Z][a-zA-Z\s]*?)(?:\?|$|,|\.|\!)/i,
        // "visit London", "traveling to Sydney", "trip to Paris"
        /(?:visit(?:ing)?|travel(?:ling|ing)?(?:\s+to)?|going\s+to|trip\s+to)\s+([a-zA-Z][a-zA-Z\s]*?)(?:\?|$|,|\.|\!)/i,
        // "in New York", "of Mumbai", "for Tokyo"
        /(?:in|of|at|for|to)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)(?:\s|$|\?|,|\.|\!)/,
        // City at start or end: "Tokyo please", "tell me about Paris"
        /(?:about|tell\s+me\s+about)\s+([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)/i,
        // Simple city name detection
        /^([A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?)\s*(?:\?|$)/,
    ];

    for (const pattern of patterns) {
        const match = text.match(pattern);
        if (match && match[1]) {
            const extracted = match[1].trim();
            // Filter out common words that aren't cities
            const skipWords = ['weather', 'today', 'tomorrow', 'now', 'the', 'a', 'an', 'my', 'your', 'this', 'that', 'it', 'there', 'here', 'what', 'how', 'when', 'where', 'why', 'please', 'me', 'i', 'you', 'we'];
            if (extracted.length > 2 && extracted.length < 50 && !skipWords.includes(extracted.toLowerCase())) {
                // Capitalize properly
                return extracted.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
            }
        }
    }

    return null;
}

// Fetch weather from OpenWeather API (supports all world cities)
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
        const language = body.language || "en";

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

                prompt = `You are TenkiSense, a helpful global travel and weather assistant.

${langInstruction}

CURRENT WEATHER DATA for ${weather.city}, ${weather.country}:
- Temperature: ${weather.temp}°C (feels like ${weather.feelsLike}°C)
- Condition: ${weather.description}
- Humidity: ${weather.humidity}%
- Wind Speed: ${weather.windSpeed} km/h

USER QUERY: "${message}"

Provide a helpful, medium-length response (4-6 sentences). Format your response with:
• Start with a brief weather summary
• Use bullet points (•) for key recommendations
• Include 3-4 specific tips or suggestions
• End with a friendly closing remark

If they ask about activities, suggest 3-4 weather-appropriate activities.
If they ask about clothing/packing, give specific outfit recommendations.
If they just ask about weather, describe conditions and what it means for their day.`;

                console.log("☀️ Weather fetched:", weather.temp + "°C", weather.description);
            } else {
                // City detected but weather fetch failed
                prompt = `You are TenkiSense, a global travel and weather assistant.
${langInstruction}
The user asked: "${message}"
I tried to get weather for "${city}" but couldn't find it. 
Apologize briefly and ask them to check the city name spelling. Keep it friendly.`;
            }
        } else {
            // CASE 2: No city - Just normal conversation
            prompt = `You are TenkiSense, a friendly global travel and weather assistant supporting cities worldwide.

${langInstruction}

USER MESSAGE: "${message}"

Provide a helpful, medium-length response (3-5 sentences). Format with bullet points (•) when listing options.
- If it's a greeting, greet them warmly and list 3 things you can help with.
- If they ask about travel or weather without a city, ask which city and suggest some popular ones from different continents.
- For other questions, be helpful and provide useful information with examples.`;
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
