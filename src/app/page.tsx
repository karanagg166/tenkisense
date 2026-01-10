"use client";
import Link from "next/link";
import { Cloud, MessageCircle, Sparkles, MapPin, Shirt, Plane, Sun } from "lucide-react";
import { useApp } from "@/context/AppContext";
import Header from "@/components/Header";

export default function Home() {
  const { theme, language, t } = useApp();

  const features = [
    { icon: <Sun className="w-6 h-6" />, title: t("feature.weather"), desc: t("feature.weather.desc") },
    { icon: <Shirt className="w-6 h-6" />, title: t("feature.clothing"), desc: t("feature.clothing.desc") },
    { icon: <Plane className="w-6 h-6" />, title: t("feature.travel"), desc: t("feature.travel.desc") },
    { icon: <MessageCircle className="w-6 h-6" />, title: t("feature.chat"), desc: t("feature.chat.desc") },
  ];

  const exampleQueries = language === "en"
    ? ["Weather in Tokyo", "What should I wear in Mumbai?", "Suggest activities in Kyoto", "Is it good to visit Goa now?", "Pack list for Kashmir in January"]
    : ["東京の天気", "ムンバイで何を着るべき？", "京都のアクティビティを提案", "今ゴアを訪れるのは良い？", "1月のカシミール用荷物リスト"];

  const bgClass = theme === "dark" ? "bg-[#0a0a0f]" : "bg-gray-50";
  const textClass = theme === "dark" ? "text-white" : "text-gray-900";
  const cardClass = theme === "dark" ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-gray-200 hover:bg-gray-50 shadow-sm";
  const mutedClass = theme === "dark" ? "text-neutral-400" : "text-gray-600";

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} overflow-hidden`}>
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${theme === "dark" ? "bg-blue-500/20" : "bg-blue-500/10"} rounded-full blur-[120px] animate-pulse`} />
        <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${theme === "dark" ? "bg-purple-500/20" : "bg-purple-500/10"} rounded-full blur-[100px] animate-pulse`} style={{ animationDelay: "1s" }} />
      </div>

      {/* Shared Header */}
      <Header />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="flex justify-center mb-6">
          <div className={`flex items-center gap-2 px-4 py-2 ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} border rounded-full text-sm ${mutedClass}`}>
            <Sparkles className="w-4 h-4 text-yellow-400" />
            {t("home.badge")}
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          {t("home.title1")}
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t("home.title2")}
          </span>
        </h1>

        <p className={`text-xl ${mutedClass} max-w-2xl mx-auto mb-10`}>
          {t("home.subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-lg font-semibold text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105">
            <MessageCircle className="w-5 h-5" />
            {t("home.cta")}
          </Link>
          <Link href="/about" className={`inline-flex items-center justify-center gap-2 px-8 py-4 ${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} border rounded-2xl text-lg font-semibold hover:bg-opacity-80 transition-all`}>
            {t("home.learn")}
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t("home.features")}
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> {t("home.smart")}</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div key={i} className={`p-6 ${cardClass} border rounded-2xl transition-all group`}>
              <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl mb-4 text-blue-400 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className={`${mutedClass} text-sm`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Example Queries */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-4">{t("home.try")}</h2>
        <p className={`${mutedClass} text-center mb-8`}>{t("home.click")}</p>

        <div className="flex flex-wrap justify-center gap-3">
          {exampleQueries.map((query, i) => (
            <Link
              key={i}
              href={`/chat?q=${encodeURIComponent(query)}`}
              className={`px-5 py-3 ${cardClass} border rounded-full transition-all hover:border-purple-500/30`}
            >
              {query}
            </Link>
          ))}
        </div>
      </section>

      {/* Coverage Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌍 {t("home.worldwide")}
        </h2>
        <p className={`${mutedClass} text-center mb-8`}>{t("home.worldwide.desc")}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Asia */}
          <div className={`p-6 bg-gradient-to-br ${theme === "dark" ? "from-blue-500/10 to-blue-500/5 border-blue-500/20" : "from-blue-100 to-blue-50 border-blue-200"} border rounded-2xl`}>
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h3 className="text-xl font-bold">{t("home.asia")}</h3>
            </div>
            <p className={`${mutedClass} text-sm mb-3`}>{t("home.asia.desc")}</p>
            <div className="flex flex-wrap gap-2">
              {["Tokyo", "Mumbai", "Bangkok", "Singapore", "Dubai", "Seoul"].map(city => (
                <span key={city} className={`px-2 py-1 ${theme === "dark" ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-blue-100 border-blue-200 text-blue-700"} border rounded-full text-xs`}>{city}</span>
              ))}
            </div>
          </div>

          {/* Europe */}
          <div className={`p-6 bg-gradient-to-br ${theme === "dark" ? "from-purple-500/10 to-purple-500/5 border-purple-500/20" : "from-purple-100 to-purple-50 border-purple-200"} border rounded-2xl`}>
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-purple-400" />
              <h3 className="text-xl font-bold">{t("home.europe")}</h3>
            </div>
            <p className={`${mutedClass} text-sm mb-3`}>{t("home.europe.desc")}</p>
            <div className="flex flex-wrap gap-2">
              {["London", "Paris", "Rome", "Berlin", "Barcelona", "Amsterdam"].map(city => (
                <span key={city} className={`px-2 py-1 ${theme === "dark" ? "bg-purple-500/10 border-purple-500/20 text-purple-300" : "bg-purple-100 border-purple-200 text-purple-700"} border rounded-full text-xs`}>{city}</span>
              ))}
            </div>
          </div>

          {/* Americas */}
          <div className={`p-6 bg-gradient-to-br ${theme === "dark" ? "from-cyan-500/10 to-cyan-500/5 border-cyan-500/20" : "from-cyan-100 to-cyan-50 border-cyan-200"} border rounded-2xl`}>
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xl font-bold">{t("home.americas")}</h3>
            </div>
            <p className={`${mutedClass} text-sm mb-3`}>{t("home.americas.desc")}</p>
            <div className="flex flex-wrap gap-2">
              {["New York", "Los Angeles", "Toronto", "Miami", "São Paulo", "Mexico City"].map(city => (
                <span key={city} className={`px-2 py-1 ${theme === "dark" ? "bg-cyan-500/10 border-cyan-500/20 text-cyan-300" : "bg-cyan-100 border-cyan-200 text-cyan-700"} border rounded-full text-xs`}>{city}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 border-t ${theme === "dark" ? "border-white/5" : "border-gray-200"} py-8`}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className={`flex items-center gap-2 ${mutedClass}`}>
            <Cloud className="w-5 h-5" />
            <span>TenkiSense © 2026</span>
          </div>
          <div className={`flex items-center gap-6 text-sm ${mutedClass}`}>
            <span>{t("home.footer.powered")}</span>
            <Link href="/about" className="hover:opacity-80 transition-colors">{t("nav.about")}</Link>
            <Link href="/chat" className="hover:opacity-80 transition-colors">{t("nav.chat")}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
