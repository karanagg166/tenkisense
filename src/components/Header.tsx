"use client";
import Link from "next/link";
import { Cloud, MessageCircle, Info, Sun, Moon, Languages } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Header() {
    const { theme, language, toggleTheme, setLanguage, t } = useApp();

    const cardClass = theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200";
    const mutedClass = theme === "dark" ? "text-neutral-400" : "text-gray-600";

    return (
        <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                    <Cloud className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    TenkiSense
                </span>
            </Link>

            <div className="flex items-center gap-3">
                {/* Language Toggle */}
                <button
                    onClick={() => setLanguage(language === "en" ? "ja" : "en")}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl ${cardClass} border transition-all hover:scale-105`}
                >
                    <Languages className="w-4 h-4" />
                    <span className="text-sm font-medium">{language === "en" ? "EN" : "日本語"}</span>
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-xl ${cardClass} border transition-all hover:scale-105`}
                >
                    {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <Link href="/about" className={`flex items-center gap-2 px-4 py-2 ${mutedClass} hover:opacity-80 transition-colors`}>
                    <Info className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("nav.about")}</span>
                </Link>
                <Link href="/chat" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">{t("nav.chat")}</span>
                </Link>
            </div>
        </nav>
    );
}
