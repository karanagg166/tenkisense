"use client";
import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

// Dynamic page title component that updates based on language
export default function DynamicTitle() {
    const { language } = useApp();

    useEffect(() => {
        const titles: Record<string, string> = {
            en: "TenkiSense - AI Weather Assistant",
            ja: "TenkiSense - AI天気アシスタント"
        };
        document.title = titles[language] || titles.en;
    }, [language]);

    return null;
}
