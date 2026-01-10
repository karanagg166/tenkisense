"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "dark" | "light";
type Language = "en" | "ja";

interface AppContextType {
    theme: Theme;
    language: Language;
    toggleTheme: () => void;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    en: {
        // Navigation
        "nav.about": "About",
        "nav.chat": "Start Chat",
        "nav.back": "Back",

        // Home
        "home.badge": "AI-Powered Travel Weather Assistant",
        "home.title1": "Your Smart Weather",
        "home.title2": "Travel Companion",
        "home.subtitle": "Get real-time weather, clothing advice, and activity suggestions for 100+ cities across Japan and India. Just ask naturally!",
        "home.cta": "Start Chatting",
        "home.learn": "Learn More",
        "home.features": "Everything You Need for",
        "home.smart": "Smart Travel",
        "home.try": "Try Asking",
        "home.click": "Click any query to start chatting",

        // Features
        "feature.weather": "Real-Time Weather",
        "feature.weather.desc": "Live weather data for 100+ cities in Japan and India",
        "feature.clothing": "Smart Clothing Tips",
        "feature.clothing.desc": "AI-powered outfit recommendations based on weather",
        "feature.travel": "Travel Advice",
        "feature.travel.desc": "Activity suggestions perfect for current conditions",
        "feature.chat": "Natural Chat",
        "feature.chat.desc": "Just talk naturally - I understand context",

        // Chat
        "chat.welcome": "Hey! 👋 I'm TenkiSense, your travel weather assistant. Ask me about weather, what to wear, or activities in any city in Japan or India!",
        "chat.placeholder": "Ask about weather, activities, packing...",
        "chat.thinking": "Thinking...",

        // About
        "about.title": "About",
        "about.desc": "An AI-powered travel weather assistant that helps you plan your trips to Japan and India with real-time weather data and smart recommendations.",
        "about.tech": "Tech Stack",
        "about.limits": "API Rate Limits",
        "about.creator": "Created By",
        "about.footer": "Made with ❤️ for travelers",
        "about.name": "Karan Agarwal",
        "about.role": "Full-Stack Developer | Competitive Programmer",
        "about.passion": "Built with passion",
        "about.cities": "100+ Cities",
        "about.cities.desc": "Comprehensive coverage of Japan and India",
        "about.realtime": "Real-Time Data",
        "about.realtime.desc": "Live weather updates every request",
        "about.ai": "AI-Powered",
        "about.ai.desc": "Smart responses using Cohere",
        "about.friendly": "User Friendly",
        "about.friendly.desc": "Natural language understanding",
    },
    ja: {
        // Navigation
        "nav.about": "について",
        "nav.chat": "チャット開始",
        "nav.back": "戻る",

        // Home
        "home.badge": "AI搭載トラベル天気アシスタント",
        "home.title1": "スマート天気",
        "home.title2": "旅行コンパニオン",
        "home.subtitle": "日本とインドの100以上の都市で、リアルタイムの天気、服装アドバイス、アクティビティ提案を取得。自然に話しかけるだけ！",
        "home.cta": "チャット開始",
        "home.learn": "詳細を見る",
        "home.features": "スマートな旅行に必要な",
        "home.smart": "すべて",
        "home.try": "試してみる",
        "home.click": "クエリをクリックしてチャットを開始",

        // Features
        "feature.weather": "リアルタイム天気",
        "feature.weather.desc": "日本とインドの100以上の都市のライブ天気データ",
        "feature.clothing": "スマート服装アドバイス",
        "feature.clothing.desc": "天気に基づいたAI搭載の服装提案",
        "feature.travel": "旅行アドバイス",
        "feature.travel.desc": "現在の状況に最適なアクティビティ提案",
        "feature.chat": "自然な会話",
        "feature.chat.desc": "自然に話しかけるだけ - コンテキストを理解します",

        // Chat
        "chat.welcome": "こんにちは！👋 TenkiSenseです。日本やインドの天気、服装、アクティビティについて聞いてください！",
        "chat.placeholder": "天気、アクティビティ、持ち物について聞く...",
        "chat.thinking": "考え中...",

        // About
        "about.title": "について",
        "about.desc": "リアルタイムの天気データとスマートな提案で、日本とインドへの旅行計画をサポートするAI搭載トラベル天気アシスタント。",
        "about.tech": "技術スタック",
        "about.limits": "APIレート制限",
        "about.creator": "作成者",
        "about.footer": "旅行者のために❤️を込めて作成",
        "about.name": "カラン・アガルワル",
        "about.role": "フルスタック開発者 | 競技プログラマー",
        "about.passion": "情熱を込めて構築",
        "about.cities": "100以上の都市",
        "about.cities.desc": "日本とインドを包括的にカバー",
        "about.realtime": "リアルタイムデータ",
        "about.realtime.desc": "リクエストごとにライブ天気更新",
        "about.ai": "AI搭載",
        "about.ai.desc": "Cohereによるスマートな応答",
        "about.friendly": "ユーザーフレンドリー",
        "about.friendly.desc": "自然言語理解",
    }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        // Load from localStorage
        const savedTheme = localStorage.getItem("theme") as Theme;
        const savedLang = localStorage.getItem("language") as Language;

        if (savedTheme) setTheme(savedTheme);
        if (savedLang) setLanguage(savedLang);
    }, []);

    useEffect(() => {
        // Apply theme to document
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    const toggleTheme = () => {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, t }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within AppProvider");
    }
    return context;
}
