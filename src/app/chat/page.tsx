"use client";
import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Send, Mic, MicOff, Loader2, Cloud, ArrowLeft, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface Message {
    role: "user" | "assistant";
    content: string;
    weather?: {
        temp: number;
        feelsLike: number;
        description: string;
        icon: string;
    };
}

function WeatherCard({ weather }: { weather: Message["weather"] }) {
    if (!weather) return null;

    return (
        <div className="mt-3 p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-4">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.description}
                    className="w-16 h-16"
                />
                <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-white">{weather.temp}°C</span>
                        <span className="text-neutral-400">feels like {weather.feelsLike}°C</span>
                    </div>
                    <p className="text-neutral-300 capitalize">{weather.description}</p>
                </div>
            </div>
        </div>
    );
}

export default function ChatPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get("q");

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "Hey! 👋 I'm TenkiSense, your travel weather assistant. Ask me about weather, what to wear, or activities in any city in Japan or India!"
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const hasSentInitial = useRef(false);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle initial query from URL
    useEffect(() => {
        if (initialQuery && !hasSentInitial.current) {
            hasSentInitial.current = true;
            sendMessage(initialQuery);
        }
    }, [initialQuery]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = "en-US";

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                    setIsRecording(false);
                };

                recognition.onend = () => setIsRecording(false);
                recognition.onerror = () => {
                    setIsRecording(false);
                    toast.error("Voice input failed");
                };

                recognitionRef.current = recognition;
            }
        }
    }, []);

    const toggleRecording = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
            setIsRecording(true);
        }
    };

    const sendMessage = async (text?: string) => {
        const messageText = text || input.trim();
        if (!messageText || loading) return;

        setInput("");
        setMessages(prev => [...prev, { role: "user", content: messageText }]);
        setLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: messageText }),
            });

            const data = await res.json();

            setMessages(prev => [...prev, {
                role: "assistant",
                content: data.response,
                weather: data.weather
            }]);

        } catch (error) {
            toast.error("Failed to get response");
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, I'm having trouble right now. Please try again!"
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessage();
    };

    const suggestions = [
        "Weather in Tokyo",
        "What to wear in Mumbai?",
        "Activities in Kyoto",
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
            {/* Animated Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between px-4 py-3 border-b border-white/5 bg-black/20 backdrop-blur-lg">
                <Link href="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back</span>
                </Link>
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600">
                        <Cloud className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">TenkiSense</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                    <Sparkles className="w-3 h-3" />
                    <span className="hidden sm:inline">AI Powered</span>
                </div>
            </div>

            {/* Messages */}
            <div className="relative z-10 flex-1 max-w-3xl mx-auto w-full overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`max-w-[85%]`}>
                            <div
                                className={`px-4 py-3 rounded-2xl ${msg.role === "user"
                                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-md"
                                        : "bg-white/5 border border-white/10 text-neutral-100 rounded-bl-md backdrop-blur-sm"
                                    }`}
                            >
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            {msg.weather && <WeatherCard weather={msg.weather} />}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white/5 border border-white/10 text-neutral-400 px-4 py-3 rounded-2xl rounded-bl-md backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin" />
                                <span className="text-sm">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
                <div className="relative z-10 max-w-3xl mx-auto w-full px-4 pb-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {suggestions.map((query) => (
                            <button
                                key={query}
                                onClick={() => sendMessage(query)}
                                className="px-4 py-2 text-sm bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-neutral-300 transition-all hover:border-purple-500/30"
                            >
                                {query}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="relative z-10 max-w-3xl mx-auto w-full p-4 border-t border-white/5 bg-black/20 backdrop-blur-lg">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about weather, activities, packing..."
                        className="flex-1 bg-white/5 text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 placeholder-neutral-500 transition-all"
                        disabled={loading}
                    />
                    <button
                        type="button"
                        onClick={toggleRecording}
                        disabled={loading}
                        className={`p-3 rounded-xl transition-all ${isRecording
                                ? "bg-red-500 text-white animate-pulse"
                                : "bg-white/5 text-neutral-400 hover:text-white border border-white/10 hover:border-white/20"
                            }`}
                    >
                        {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-purple-500/20"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}
