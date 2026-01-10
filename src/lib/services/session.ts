// Session management service for context preservation
import { Message as BaseMessage, Session as BaseSession } from "@/types";

// Extended message with additional session-specific fields
export interface Message extends Omit<BaseMessage, 'weather'> {
    timestamp: number;
    weatherCity?: string;
}

export interface Session {
    id: string;
    messages: Message[];
    visitedCities: string[];
    lastCity?: string;
    created: number;
    updated: number;
}

const sessions = new Map<string, Session>();
const MAX_MESSAGES = 20; // Keep last 20 messages for context

/**
 * Generate unique session ID
 */
export function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get or create session
 */
export function getSession(sessionId: string): Session {
    let session = sessions.get(sessionId);

    if (!session) {
        session = {
            id: sessionId,
            messages: [],
            visitedCities: [],
            created: Date.now(),
            updated: Date.now()
        };
        sessions.set(sessionId, session);
    }

    return session;
}

/**
 * Add message to session
 */
export function addMessage(
    sessionId: string,
    role: "user" | "assistant",
    content: string,
    weatherCity?: string
): void {
    const session = getSession(sessionId);

    session.messages.push({
        role,
        content,
        timestamp: Date.now(),
        weatherCity
    });

    // Keep only last N messages
    if (session.messages.length > MAX_MESSAGES) {
        session.messages = session.messages.slice(-MAX_MESSAGES);
    }

    // Track visited cities
    if (weatherCity && !session.visitedCities.includes(weatherCity)) {
        session.visitedCities.push(weatherCity);
    }

    if (weatherCity) {
        session.lastCity = weatherCity;
    }

    session.updated = Date.now();
}

/**
 * Get conversation context for AI
 */
export function getConversationContext(sessionId: string, limit: number = 6): string {
    const session = getSession(sessionId);
    const recent = session.messages.slice(-limit);

    if (recent.length === 0) return "";

    const context = recent.map(m =>
        `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`
    ).join("\n");

    let contextStr = `\n[CONVERSATION HISTORY]\n${context}`;

    if (session.visitedCities.length > 0) {
        contextStr += `\n\n[Previously discussed cities: ${session.visitedCities.join(", ")}]`;
    }

    if (session.lastCity) {
        contextStr += `\n[Last city discussed: ${session.lastCity}]`;
    }

    return contextStr;
}

/**
 * Get last discussed city
 */
export function getLastCity(sessionId: string): string | undefined {
    return getSession(sessionId).lastCity;
}

/**
 * Clear old sessions (cleanup)
 */
export function cleanupSessions(maxAge: number = 24 * 60 * 60 * 1000): void {
    const now = Date.now();
    for (const [id, session] of sessions.entries()) {
        if (now - session.updated > maxAge) {
            sessions.delete(id);
        }
    }
}
