"use client";
import Link from "next/link";
import { Cloud, MessageCircle, Info, Sparkles, MapPin, Shirt, Plane, Sun, Droplets, Wind } from "lucide-react";

export default function Home() {
  const features = [
    { icon: <Sun className="w-6 h-6" />, title: "Real-Time Weather", desc: "Live weather data for 100+ cities in Japan and India" },
    { icon: <Shirt className="w-6 h-6" />, title: "Smart Clothing Tips", desc: "AI-powered outfit recommendations based on weather" },
    { icon: <Plane className="w-6 h-6" />, title: "Travel Advice", desc: "Activity suggestions perfect for current conditions" },
    { icon: <MessageCircle className="w-6 h-6" />, title: "Natural Chat", desc: "Just talk naturally - I understand context" },
  ];

  const exampleQueries = [
    "Weather in Tokyo",
    "What should I wear in Mumbai?",
    "Suggest activities in Kyoto",
    "Is it good to visit Goa now?",
    "Pack list for Kashmir in January",
    "Compare Delhi and Bangalore weather",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
            <Cloud className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            TenkiSense
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/about" className="flex items-center gap-2 px-4 py-2 text-neutral-300 hover:text-white transition-colors">
            <Info className="w-4 h-4" />
            About
          </Link>
          <Link href="/chat" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-500/20">
            <MessageCircle className="w-4 h-4" />
            Start Chat
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-400">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI-Powered Travel Weather Assistant
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your Smart Weather
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Travel Companion
          </span>
        </h1>

        <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-10">
          Get real-time weather, clothing advice, and activity suggestions for 100+ cities across Japan and India. Just ask naturally!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            Start Chatting
          </Link>
          <Link href="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-lg font-semibold hover:bg-white/10 transition-all">
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need for
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Smart Travel</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Queries */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-4">
          Try Asking
        </h2>
        <p className="text-neutral-400 text-center mb-8">Click any query to start chatting</p>

        <div className="flex flex-wrap justify-center gap-3">
          {exampleQueries.map((query, i) => (
            <Link
              key={i}
              href={`/chat?q=${encodeURIComponent(query)}`}
              className="px-5 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 hover:border-purple-500/30 transition-all text-neutral-300 hover:text-white"
            >
              {query}
            </Link>
          ))}
        </div>
      </section>

      {/* Coverage Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h3 className="text-2xl font-bold">Japan</h3>
            </div>
            <p className="text-neutral-400 mb-4">20+ major cities and popular districts</p>
            <div className="flex flex-wrap gap-2">
              {["Tokyo", "Osaka", "Kyoto", "Yokohama", "Sapporo", "Fukuoka", "Shibuya", "Shinjuku"].map(city => (
                <span key={city} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm text-blue-300">{city}</span>
              ))}
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-purple-400" />
              <h3 className="text-2xl font-bold">India</h3>
            </div>
            <p className="text-neutral-400 mb-4">60+ cities from metros to hill stations</p>
            <div className="flex flex-wrap gap-2">
              {["Mumbai", "Delhi", "Bangalore", "Jaipur", "Goa", "Kashmir", "Manali", "Varanasi"].map(city => (
                <span key={city} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm text-purple-300">{city}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-neutral-500">
            <Cloud className="w-5 h-5" />
            <span>TenkiSense © 2026</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-neutral-500">
            <span>Powered by Cohere AI & OpenWeather</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/chat" className="hover:text-white transition-colors">Chat</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
