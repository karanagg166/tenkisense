// ==========================================
// Chat Types
// ==========================================

// Weather info displayed in chat bubbles
export interface WeatherInfo {
    temp: number;
    feelsLike: number;
    description: string;
    icon: string;
}

// Message in chat
export interface Message {
    role: "user" | "assistant";
    content: string;
    weather?: WeatherInfo;
}

// ==========================================
// Weather Types
// ==========================================

// Full weather data from API
export interface WeatherData {
    name: string;
    city: string;
    country: string;
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
    main: string;
}

// Cached weather entry
export interface CachedWeather {
    data: WeatherData;
    timestamp: number;
}

// ==========================================
// Session Types
// ==========================================

// Chat session
export interface Session {
    id: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}

// ==========================================
// Location Types
// ==========================================

// Location info for cities
export interface LocationInfo {
    city: string;
    country: string;
    countryCode: string;
    aliases: string[];
    districts?: string[];
}

// ==========================================
// App Context Types
// ==========================================

export type Theme = "dark" | "light";
export type Language = "en" | "ja";

export interface AppContextType {
    theme: Theme;
    language: Language;
    toggleTheme: () => void;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

// ==========================================
// Component Props Types
// ==========================================

export interface VoiceInputProps {
    onResult: (transcript: string) => void;
    disabled?: boolean;
    language?: Language;
}

export interface WeatherDisplayProps {
    weather: WeatherData | null;
    loading?: boolean;
}
