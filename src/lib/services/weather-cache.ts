// Weather data caching service with 15-minute TTL
import { WeatherData, CachedWeather } from "@/types";

export type { WeatherData };

const CACHE_TTL = 15 * 60 * 1000; // 15 minutes
const weatherCache = new Map<string, CachedWeather>();

/**
 * Get weather from cache if valid
 */
export function getCachedWeather(city: string): WeatherData | null {
    const key = city.toLowerCase();
    const cached = weatherCache.get(key);

    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        console.log(`[Cache] Hit: ${city}`);
        return cached.data;
    }

    if (cached) {
        weatherCache.delete(key);
        console.log(`[Cache] Expired: ${city}`);
    }

    return null;
}

/**
 * Store weather in cache
 */
export function setCachedWeather(city: string, data: WeatherData): void {
    const key = city.toLowerCase();
    weatherCache.set(key, {
        data,
        timestamp: Date.now()
    });
    console.log(`[Cache] Stored: ${city}`);
}

/**
 * Clear expired entries
 */
export function cleanCache(): void {
    const now = Date.now();
    for (const [key, value] of weatherCache.entries()) {
        if (now - value.timestamp >= CACHE_TTL) {
            weatherCache.delete(key);
        }
    }
}

/**
 * Get cache stats
 */
export function getCacheStats(): { size: number; cities: string[] } {
    return {
        size: weatherCache.size,
        cities: Array.from(weatherCache.keys())
    };
}

/**
 * Fetch weather with caching
 */
export async function fetchWeatherWithCache(city: string): Promise<WeatherData | null> {
    // Check cache first
    const cached = getCachedWeather(city);
    if (cached) return cached;

    // Fetch from API
    try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

        const res = await fetch(url);
        if (!res.ok) return null;

        const raw = await res.json();

        const data: WeatherData = {
            name: raw.name,
            city: raw.name,
            country: raw.sys.country,
            temp: Math.round(raw.main.temp),
            feelsLike: Math.round(raw.main.feels_like),
            humidity: raw.main.humidity,
            windSpeed: Math.round(raw.wind.speed * 3.6), // m/s to km/h
            description: raw.weather[0].description,
            icon: raw.weather[0].icon,
            main: raw.weather[0].main,
        };

        // Store in cache
        setCachedWeather(city, data);

        return data;
    } catch (error) {
        console.error(`[Weather] Error fetching ${city}:`, error);
        return null;
    }
}
