"use client";
import { useState, useEffect } from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

interface VoiceInputProps {
    onTranscription: (transcription: string) => void;
}

export default function VoiceInput({ onTranscription }: VoiceInputProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if (typeof window !== "undefined") {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (SpeechRecognition) {
                const recognitionInstance = new SpeechRecognition();
                recognitionInstance.continuous = false;
                recognitionInstance.interimResults = true;
                recognitionInstance.lang = "en-US";

                recognitionInstance.onstart = () => {
                    setIsRecording(true);
                    toast.success("Listening...");
                };

                recognitionInstance.onresult = (event: any) => {
                    const transcript = Array.from(event.results)
                        .map((result: any) => result[0])
                        .map((result) => result.transcript)
                        .join("");

                    setTranscription(transcript);
                };

                recognitionInstance.onend = () => {
                    setIsRecording(false);
                    if (transcription) {
                        onTranscription(transcription);
                    }
                };

                recognitionInstance.onerror = (event: any) => {
                    setIsRecording(false);
                    console.error("Speech recognition error:", event.error);

                    if (event.error === "not-allowed") {
                        toast.error("Microphone access denied. Please enable it in your browser settings.");
                    } else if (event.error === "no-speech") {
                        toast.error("No speech detected. Please try again.");
                    } else {
                        toast.error("Voice recognition failed. Try typing instead.");
                    }
                };

                setRecognition(recognitionInstance);
            } else {
                console.warn("Web Speech API not supported");
            }
        }
    }, []);

    const startRecording = () => {
        if (recognition) {
            setTranscription("");
            recognition.start();
        } else {
            toast.error("Voice input not supported in this browser. Please use Chrome.");
        }
    };

    const stopRecording = () => {
        if (recognition) {
            recognition.stop();
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (transcription.trim()) {
            onTranscription(transcription);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <div className="flex items-center gap-4">
                    {/* Text Input */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={transcription}
                            onChange={(e) => setTranscription(e.target.value)}
                            placeholder="Ask about weather in any city..."
                            className="w-full px-6 py-4 pr-16 bg-white/10 backdrop-blur-lg border border-white/30 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                            disabled={isProcessing}
                        />
                        {isProcessing && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                            </div>
                        )}
                    </div>

                    {/* Voice Button */}
                    <button
                        type="button"
                        onClick={isRecording ? stopRecording : startRecording}
                        disabled={isProcessing}
                        className={`p-4 rounded-2xl transition-all duration-300 ${isRecording
                                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                                : "bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                            } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
                    >
                        {isRecording ? (
                            <MicOff className="w-6 h-6 text-white" />
                        ) : (
                            <Mic className="w-6 h-6 text-white" />
                        )}
                    </button>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!transcription.trim() || isProcessing}
                        className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                        Search
                    </button>
                </div>

                {/* Recording Indicator */}
                {isRecording && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-white/70">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Listening...</span>
                    </div>
                )}
            </form>
        </div>
    );
}