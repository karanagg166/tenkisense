"use client";
import { useState } from "react";
interface VoiceInputProps {
    onTranscription: (transcription: string) => void;
}
export default function VoiceInput({ onTranscription }: VoiceInputProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [transcription, setTranscription] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);







    return (
        <div>
            <button onClick={() => { setIsRecording(true) }}>Record</button>
        </div>
    );
}