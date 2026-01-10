"use client";
import Link from "next/link";
import { Cloud, MessageCircle, ArrowLeft, Github, Linkedin, Mail, Heart, Zap, Shield, Globe } from "lucide-react";

export default function AboutPage() {
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

    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white">
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[80px]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
                <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </Link>
                <Link href="/" className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                        <Cloud className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        TenkiSense
                    </span>
                </Link>
                <Link href="/chat" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm hover:from-blue-500 hover:to-purple-500 transition-all">
                    <MessageCircle className="w-4 h-4" />
                    Chat
                </Link>
            </nav>

            {/* Content */}
            <main className="relative z-10 max-w-5xl mx-auto px-6 py-16">
                {/* Hero */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-400 mb-6">
                        <Heart className="w-4 h-4 text-pink-400" />
                        Built with passion
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        About <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TenkiSense</span>
                    </h1>
                    <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
                        An AI-powered travel weather assistant that helps you plan your trips to Japan and India with real-time weather data and smart recommendations.
                    </p>
                </div>

                {/* Features */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
                    {features.map((f, i) => (
                        <div key={i} className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl text-blue-400 mb-3">
                                {f.icon}
                            </div>
                            <h3 className="font-semibold mb-1">{f.title}</h3>
                            <p className="text-sm text-neutral-400">{f.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-center mb-8">Tech Stack</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        {techStack.map((tech, i) => (
                            <div key={i} className="px-5 py-3 bg-white/5 border border-white/10 rounded-xl">
                                <span className="font-medium">{tech.name}</span>
                                <span className="text-neutral-500 text-sm ml-2">{tech.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* API Limits */}
                <div className="mb-16 p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        API Rate Limits
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <h3 className="font-semibold text-yellow-300 mb-2">Cohere AI (Free Tier)</h3>
                            <ul className="text-neutral-400 space-y-1">
                                <li>• 1,000 API calls/month</li>
                                <li>• 5 requests/minute</li>
                                <li>• Command-R7B model</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-300 mb-2">OpenWeather (Free Tier)</h3>
                            <ul className="text-neutral-400 space-y-1">
                                <li>• 1,000 API calls/day</li>
                                <li>• 60 requests/minute</li>
                                <li>• Current weather data</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Creator */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-6">Created By</h2>
                    <div className="inline-flex flex-col items-center p-8 bg-white/5 border border-white/10 rounded-3xl">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                            K
                        </div>
                        <h3 className="text-xl font-bold mb-1">Karan Agarwal</h3>
                        <p className="text-neutral-400 mb-4">Full-Stack Developer</p>
                        <div className="flex gap-3">
                            <a href="https://github.com/karanagg" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="https://linkedin.com/in/karanagg" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="mailto:karan@example.com" className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors">
                                <Mail className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/5 py-6 text-center text-sm text-neutral-500">
                TenkiSense © 2026 — Made with ❤️ for travelers
            </footer>
        </div>
    );
}