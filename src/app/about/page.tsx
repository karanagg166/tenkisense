"use client";
import { Heart, Zap, Shield, Globe, Github, Linkedin, Mail, Code, ExternalLink } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";

export default function AboutPage() {
    const { theme, t } = useApp();

    const techStack = [
        { name: "Next.js 16", desc: "React Framework" },
        { name: "Cohere AI", desc: "Language Model" },
        { name: "OpenWeather", desc: "Weather API" },
        { name: "TypeScript", desc: "Type Safety" },
        { name: "Tailwind CSS", desc: "Styling" },
        { name: "Vercel", desc: "Deployment" },
    ];

    const features = [
        { icon: <Globe className="w-5 h-5" />, title: "100+ Cities", desc: "Comprehensive coverage of Japan and India" },
        { icon: <Zap className="w-5 h-5" />, title: "Real-Time Data", desc: "Live weather updates every request" },
        { icon: <Shield className="w-5 h-5" />, title: "AI-Powered", desc: "Smart responses using Cohere" },
        { icon: <Heart className="w-5 h-5" />, title: "User Friendly", desc: "Natural language understanding" },
    ];

    const socialLinks = [
        { icon: <Github className="w-5 h-5" />, label: "GitHub", url: "https://github.com/karanagg166", color: "hover:text-white" },
        { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", url: "https://linkedin.com/in/karan-agarwal-9005b5257", color: "hover:text-blue-400" },
        { icon: <Code className="w-5 h-5" />, label: "Codeforces", url: "https://codeforces.com/profile/karanagg166", color: "hover:text-red-400" },
        { icon: <Code className="w-5 h-5" />, label: "LeetCode", url: "https://leetcode.com/karanagg166", color: "hover:text-yellow-400" },
        { icon: <ExternalLink className="w-5 h-5" />, label: "Portfolio", url: "https://karanagg.vercel.app", color: "hover:text-purple-400" },
        { icon: <Mail className="w-5 h-5" />, label: "Email", url: "mailto:karanagarwal1012@gmail.com", color: "hover:text-green-400" },
    ];

    const bgClass = theme === "dark" ? "bg-[#0a0a0f]" : "bg-gray-50";
    const textClass = theme === "dark" ? "text-white" : "text-gray-900";
    const cardClass = theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-sm";
    const mutedClass = theme === "dark" ? "text-neutral-400" : "text-gray-600";

    return (
        <div className={`min-h-screen ${bgClass} ${textClass}`}>
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] ${theme === "dark" ? "bg-blue-500/10" : "bg-blue-500/5"} rounded-full blur-[100px]`} />
                <div className={`absolute bottom-0 right-1/4 w-[400px] h-[400px] ${theme === "dark" ? "bg-purple-500/10" : "bg-purple-500/5"} rounded-full blur-[80px]`} />
            </div>

            {/* Shared Header */}
            <Header />

            {/* Content */}
            <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 ${cardClass} border rounded-full text-sm ${mutedClass} mb-6`}>
                        <Heart className="w-4 h-4 text-pink-400" />
                        Built with passion
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        {t("about.title")} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TenkiSense</span>
                    </h1>
                    <p className={`text-xl ${mutedClass} max-w-2xl mx-auto`}>
                        {t("about.desc")}
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {features.map((f, i) => (
                        <div key={i} className={`p-5 ${cardClass} border rounded-2xl`}>
                            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl text-blue-400 mb-3">
                                {f.icon}
                            </div>
                            <h3 className="font-semibold mb-1">{f.title}</h3>
                            <p className={`text-sm ${mutedClass}`}>{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">{t("about.tech")}</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech, i) => (
                            <div key={i} className={`px-5 py-3 ${cardClass} border rounded-xl`}>
                                <span className="font-medium">{tech.name}</span>
                                <span className={`${mutedClass} text-sm ml-2`}>{tech.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API Limits */}
                <div className={`mb-16 p-6 bg-gradient-to-br ${theme === "dark" ? "from-yellow-500/10 to-orange-500/10 border-yellow-500/20" : "from-yellow-100 to-orange-100 border-yellow-300"} border rounded-2xl`}>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        {t("about.limits")}
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-yellow-600 dark:text-yellow-300 mb-2">Cohere AI (Free Tier)</h3>
                            <ul className={`${mutedClass} space-y-1`}>
                                <li>• 1,000 API calls/month</li>
                                <li>• 5 requests/minute</li>
                                <li>• Command-R7B model</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-600 dark:text-blue-300 mb-2">OpenWeather (Free Tier)</h3>
                            <ul className={`${mutedClass} space-y-1`}>
                                <li>• 1,000 API calls/day</li>
                                <li>• 60 requests/minute</li>
                                <li>• Current weather data</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Creator */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">{t("about.creator")}</h2>
                    <div className={`inline-flex flex-col items-center p-8 ${cardClass} border rounded-3xl`}>
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-4xl font-bold text-white mb-4">
                            KA
                        </div>
                        <h3 className="text-2xl font-bold mb-1">Karan Agarwal</h3>
                        <p className={`${mutedClass} mb-6`}>Full-Stack Developer | Competitive Programmer</p>

                        {/* Social Links */}
                        <div className="grid grid-cols-3 gap-3">
                            {socialLinks.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex flex-col items-center gap-2 p-3 ${cardClass} border rounded-xl transition-all ${link.color}`}
                                >
                                    {link.icon}
                                    <span className="text-xs">{link.label}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className={`relative z-10 border-t ${theme === "dark" ? "border-white/5" : "border-gray-200"} py-6 text-center text-sm ${mutedClass}`}>
                TenkiSense © 2026 — {t("about.footer")}
            </footer>
        </div>
    );
}