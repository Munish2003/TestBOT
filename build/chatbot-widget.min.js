/**
 * Chatbot Widget Bundle
 * Auto-generated - Do not edit directly
 * Generated: 2026-02-19T09:15:30.107Z
 */

// Auto-inject CSS styles
(function() {
    const style = document.createElement('style');
    style.id = 'chatbot-widget-styles';
    style.textContent = ":root{--cb-font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;--cb-font-size-base:15px;--cb-line-height:1.6;--cb-color-primary:#6366F1;--cb-color-primary-hover:#4F46E5;--cb-color-bg:#ffffff;--cb-color-bg-alt:#F8FAFC;--cb-color-text-main:#0F172A;--cb-color-text-muted:#64748B;--cb-color-border:#E2E8F0;--cb-msg-user-bg:linear-gradient(135deg,#6366F1,#8B5CF6);--cb-msg-user-text:#ffffff;--cb-msg-ai-bg:#F1F5F9;--cb-msg-ai-text:var(--cb-color-text-main);--cb-shadow-sm:0 1px 3px rgba(0,0,0,0.05);--cb-shadow-wrapper:0 25px 50px -12px rgba(0,0,0,0.15),0 8px 20px rgba(0,0,0,0.08);--cb-radius-lg:24px;--cb-radius-md:16px;--cb-radius-sm:10px;--cb-transition:all 0.25s cubic-bezier(0.2,0.8,0.2,1);}.chatbot-widget.chatbot-dark-theme{--cb-color-primary:#818CF8;--cb-color-primary-hover:#A5B4FC;--cb-color-bg:#0F172A;--cb-color-bg-alt:#1E293B;--cb-color-text-main:#F8FAFC;--cb-color-text-muted:#94A3B8;--cb-color-border:#334155;--cb-msg-ai-bg:#1E293B;--cb-msg-ai-text:#F8FAFC;--cb-shadow-wrapper:0 25px 50px -12px rgba(0,0,0,0.5),0 8px 20px rgba(0,0,0,0.3);}.chatbot-widget-container{position:fixed;bottom:30px;right:30px;z-index:999999;font-family:var(--cb-font-family);-webkit-font-smoothing:antialiased;}.chatbot-toggle-btn{width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#6366F1,#8B5CF6);border:none;cursor:pointer;box-shadow:0 8px 24px rgba(99,102,241,0.4);transition:var(--cb-transition);display:flex;align-items:center;justify-content:center;color:white;position:absolute;bottom:0;right:0;}.chatbot-toggle-btn:hover{transform:scale(1.08) translateY(-2px);box-shadow:0 12px 32px rgba(99,102,241,0.5);}.chatbot-toggle-btn svg{width:32px;height:32px;}.chatbot-icon-open{display:block;}.chatbot-icon-close{display:none;}.chatbot-widget{position:absolute;bottom:80px;right:0;width:400px;height:640px;max-height:calc(100vh - 120px);background:var(--cb-color-bg);border-radius:var(--cb-radius-lg);box-shadow:var(--cb-shadow-wrapper);display:flex;flex-direction:column;overflow:hidden;transform-origin:bottom right;animation:chatbot-scale-in 0.3s cubic-bezier(0.2,0.8,0.2,1);border:1px solid var(--cb-color-border);}@keyframes chatbot-scale-in{from{opacity:0;transform:scale(0.9) translateY(20px);}to{opacity:1;transform:scale(1) translateY(0);}}.chatbot-header{padding:20px 24px;background:var(--cb-color-primary);display:flex;align-items:center;justify-content:space-between;color:white;}.chatbot-header-content{display:flex;align-items:center;gap:14px;}.chatbot-avatar{width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,0.2);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;font-size:24px;}.chatbot-header-text{display:flex;flex-direction:column;}.chatbot-title{font-weight:600;font-size:17px;color:white;letter-spacing:-0.01em;}.chatbot-status{font-size:13px;color:rgba(255,255,255,0.9);display:flex;align-items:center;gap:6px;}.chatbot-status-dot{width:7px;height:7px;border-radius:50%;background:#10B981;box-shadow:0 0 0 2px rgba(16,185,129,0.2);animation:pulse 2s infinite;}@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}.chatbot-header-actions{display:flex;gap:8px;}.chatbot-header-btn{width:36px;height:36px;border-radius:var(--cb-radius-sm);background:rgba(255,255,255,0.15);border:none;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:var(--cb-transition);}.chatbot-header-btn:hover{background:rgba(255,255,255,0.25);}.chatbot-header-btn svg{width:18px;height:18px;stroke:white;}.chatbot-messages{flex:1;overflow-y:auto;padding:24px 20px;display:flex;flex-direction:column;gap:18px;background:var(--cb-color-bg);}.chatbot-messages::-webkit-scrollbar{width:6px;}.chatbot-messages::-webkit-scrollbar-thumb{background-color:var(--cb-color-border);border-radius:10px;}.chatbot-messages::-webkit-scrollbar-track{background:transparent;}.chatbot-message{display:flex;gap:12px;max-width:85%;animation:chatbot-slide-up 0.3s ease-out;}@keyframes chatbot-slide-up{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}.chatbot-message-user{align-self:flex-end;flex-direction:row-reverse;}.chatbot-message-user .chatbot-message-content{background:var(--cb-msg-user-bg);color:var(--cb-msg-user-text);border-radius:20px 20px 4px 20px;box-shadow:0 4px 14px rgba(99,102,241,0.25);}.chatbot-message-ai{align-self:flex-start;}.chatbot-message-ai .chatbot-message-bubble{display:flex;flex-direction:column;}.chatbot-message-ai .chatbot-message-content{background:var(--cb-msg-ai-bg);color:var(--cb-msg-ai-text);border-radius:20px 20px 20px 4px;box-shadow:0 2px 8px rgba(0,0,0,0.05);}.chatbot-message-content{padding:14px 18px;font-size:var(--cb-font-size-base);line-height:1.5;word-wrap:break-word;}.chatbot-message-avatar{width:32px;height:32px;flex-shrink:0;border-radius:50%;background:var(--cb-color-bg-alt);display:flex;align-items:center;justify-content:center;font-size:18px;}.chatbot-typing-indicator{display:flex;align-items:flex-start;gap:12px;animation:chatbot-slide-up 0.3s ease-out;}.chatbot-typing-dots{display:flex;align-items:center;gap:6px;padding:16px 20px;background:var(--cb-msg-ai-bg);border-radius:20px 20px 20px 4px;}.chatbot-typing-dots span{width:8px;height:8px;background:var(--cb-color-primary);border-radius:50%;animation:chatbot-bounce 1.4s infinite ease-in-out both;}.chatbot-typing-dots span:nth-child(1){animation-delay:-0.32s;}.chatbot-typing-dots span:nth-child(2){animation-delay:-0.16s;}@keyframes chatbot-bounce{0%,80%,100%{transform:scale(0.6);opacity:0.5;}40%{transform:scale(1);opacity:1;}}.chatbot-input-area{padding:18px 24px;background:var(--cb-color-bg);border-top:1px solid var(--cb-color-border);display:flex;align-items:center;gap:12px;}.chatbot-input{flex:1;border:1px solid var(--cb-color-border);background:var(--cb-color-bg-alt);border-radius:24px;padding:13px 18px;font-size:14px;color:var(--cb-color-text-main);outline:none;transition:var(--cb-transition);}.chatbot-input:focus{background:var(--cb-color-bg);border-color:var(--cb-color-primary);box-shadow:0 0 0 3px rgba(99,102,241,0.1);}.chatbot-input::placeholder{color:var(--cb-color-text-muted);}.chatbot-send-btn{width:44px;height:44px;background:var(--cb-color-primary);border-radius:50%;border:none;color:white;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:var(--cb-transition);flex-shrink:0;}.chatbot-send-btn:hover:not(:disabled){background:var(--cb-color-primary-hover);transform:scale(1.05);}.chatbot-send-btn:disabled{background:var(--cb-color-bg-alt);color:var(--cb-color-text-muted);cursor:not-allowed;}.chatbot-send-btn svg{width:20px;height:20px;fill:white;}.chatbot-footer{padding:12px 24px;text-align:center;background:var(--cb-color-bg);border-top:1px solid var(--cb-color-border);}.chatbot-powered-by{font-size:11px;color:var(--cb-color-text-muted);letter-spacing:0.02em;}.chatbot-system-message .chatbot-message-bubble{background:#FEF2F2 !important;border-left:4px solid #EF4444 !important;}.chatbot-system-message .chatbot-message-content{background:transparent !important;color:#991B1B !important;}@media (max-width:480px){.chatbot-widget-container{bottom:0;right:0;left:0;}.chatbot-widget{width:100%;height:100%;max-height:100%;bottom:0;right:0;border-radius:0;}.chatbot-toggle-btn{bottom:20px;right:20px;}}";
    document.head.appendChild(style);
})();


// ============ env.js ============
/**
 * Runtime Configuration for Chatbot Widget
 * 
 * IMPORTANT: This file can be edited AFTER deployment without rebuilding!
 * Simply edit the values below and changes take effect on page refresh.
 * 
 * This is useful for:
 * - Changing API URL when moving between environments
 * - Updating theme colors
 * - Modifying default messages
 * - Adjusting session settings
 */

window.CHATBOT_ENV = {
    // Backend API URL - Injected by GitHub Actions from secrets.CHATBOT_API_URL
    // Production: https://zox-edu-ai.southindia.cloudapp.azure.com/chatbot
    API_URL: 'https://pseudoevangelically-primatial-latasha.ngrok-free.dev',

    // Session Configuration
    SESSION_EXPIRY_DAYS: 7,
    SESSION_STORAGE_KEY: 'chatbot_session',

    // UI Theme
    PRIMARY_COLOR: '#667eea',
    THEME: 'light', // 'light' or 'dark'
    WIDGET_POSITION: 'bottom-right', // 'bottom-right' or 'bottom-left'

    // Widget Dimensions
    WIDGET_WIDTH: '380px',
    WIDGET_HEIGHT: '600px',

    // Messages
    GREETING_MESSAGE: 'Hi! How can I help you today?',
    PLACEHOLDER_TEXT: 'Type your message...',
};

// ============ src/config.js ============
/**
 * Configuration for the Chatbot Widget
 * 
 * Uses runtime environment variables from window.CHATBOT_ENV (defined in env.js)
 * Falls back to defaults if env.js is not loaded
 */

const DEFAULT_CONFIG = {
    // Backend API - From runtime env or default
    apiUrl: window.CHATBOT_ENV?.API_URL || 'http://localhost:8000',

    // Session management
    sessionExpiryDays: window.CHATBOT_ENV?.SESSION_EXPIRY_DAYS || 7,
    sessionStorageKey: window.CHATBOT_ENV?.SESSION_STORAGE_KEY || 'chatbot_session',

    // UI/UX
    position: window.CHATBOT_ENV?.WIDGET_POSITION || 'bottom-right',
    primaryColor: window.CHATBOT_ENV?.PRIMARY_COLOR || '#667eea',
    theme: window.CHATBOT_ENV?.THEME || 'light',

    // Messages
    placeholder: window.CHATBOT_ENV?.PLACEHOLDER_TEXT || 'Type your message...',
    greeting: window.CHATBOT_ENV?.GREETING_MESSAGE || 'Hi! How can I help you today?',

    // Widget dimensions
    width: window.CHATBOT_ENV?.WIDGET_WIDTH || '380px',
    height: window.CHATBOT_ENV?.WIDGET_HEIGHT || '600px',
};

// Export for use in other modules
window.ChatbotConfig = DEFAULT_CONFIG;

// ============ src/debug-logger.js ============
/**
 * DebugLogger - Centralized logging system for developer debugging
 * Captures all logs in memory instead of browser console
 */

class DebugLogger {
    constructor() {
        this.logs = [];
        this.maxLogs = 500; // Keep last 500 logs
    }

    /**
     * Add a log entry
     */
    _addLog(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            data: data ? JSON.stringify(data) : null
        };

        this.logs.push(logEntry);

        // Keep only last maxLogs entries
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Also log to console in development (can be disabled in production)
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            // Optionally keep console logs for localhost development
            // Comment out these lines to completely hide console logs
            // const consoleMethod = level === 'error' ? console.error : level === 'warn' ? console.warn : console.log;
            // consoleMethod(`[${level.toUpperCase()}]`, message, data || '');
        }
    }

    /**
     * Log info message
     */
    log(message, data = null) {
        this._addLog('info', message, data);
    }

    /**
     * Log info message (alias)
     */
    info(message, data = null) {
        this._addLog('info', message, data);
    }

    /**
     * Log warning message
     */
    warn(message, data = null) {
        this._addLog('warn', message, data);
    }

    /**
     * Log error message
     */
    error(message, data = null) {
        this._addLog('error', message, data);
    }

    /**
     * Get all logs
     */
    getLogs() {
        return [...this.logs]; // Return copy
    }

    /**
     * Clear all logs
     */
    clearLogs() {
        this.logs = [];
    }

    /**
     * Get logs as formatted HTML
     */
    getLogsHTML() {
        return this.logs.map(log => {
            const levelColors = {
                info: '#3B82F6',
                warn: '#F59E0B',
                error: '#EF4444'
            };
            const color = levelColors[log.level] || '#6B7280';
            const time = new Date(log.timestamp).toLocaleTimeString();
            
            return `
                <div class="log-entry log-${log.level}">
                    <span class="log-time">${time}</span>
                    <span class="log-level" style="color: ${color}">[${log.level.toUpperCase()}]</span>
                    <span class="log-message">${log.message}</span>
                    ${log.data ? `<span class="log-data">${log.data}</span>` : ''}
                </div>
            `;
        }).join('');
    }
}

// Create global instance
window.DebugLogger = new DebugLogger();

// ============ src/session-manager.js ============
/**
 * SessionManager - Handles localStorage-based session persistence
 * Manages session_id, lead_id, and expiry logic.
 * LOGIC SUMMARY:
 * 1. Anonymous Users: Session is ephemeral. Refreshing the page creates a NEW session_id.
 * 2. Identified Leads: Session is persistent. Refreshing the page restores the existing session_id.
 */

class SessionManager {
    constructor(config) {
        this.storageKey = config.sessionStorageKey || 'chatbot_session_v2';
        this.expiryDays = config.expiryDays || 7;
        this._cachedSession = null; // In-memory cache to prevent repeated regeneration
    }

    /**
     * Generate a unique session ID using Web Crypto API
     */
    generateSessionId() {
        return `IMT_sess_${crypto.randomUUID()}`;
    }

    /**
     * Get existing session or create a new one.
     * This is the "Brain" of the session logic.
     */
    getOrCreateSession() {
        const now = new Date();
        const stored = localStorage.getItem(this.storageKey);

        // 1. Double-check memory cache vs timeout before returning it
        if (this._cachedSession) {
            // Check if what we have in memory is actually expired
            const lastActivity = new Date(this._cachedSession.last_activity);
            const daysSinceActivity = (now - lastActivity) / (1000 * 60 * 60 * 24);

            if (daysSinceActivity <= this.expiryDays) {
                return this._cachedSession;
            } else {
                window.DebugLogger.log('In-memory Lead session expired.');
                this.clearSession();
                // Proceed to create/restore fresh
            }
        }

        if (stored) {
            try {
                const data = JSON.parse(stored);

                // ============================================================
                // 🛑 CRITICAL LOGIC: ANONYMOUS vs LEAD
                // ============================================================
                // If there is NO lead_id, this user is anonymous.
                // We do NOT want to persist anonymous sessions across refreshes.
                // Therefore, we discard the stored data and create a fresh session.
                if (!data.lead_id) {
                    window.DebugLogger.log('Anonymous user refresh detected - Generating NEW session.');
                    return this._createNewSession();
                }

                // ============================================================
                // 🛑 EXPIRY CHECK (Only for Leads)
                // ============================================================
                const lastActivity = new Date(data.last_activity);
                const daysSinceActivity = (now - lastActivity) / (1000 * 60 * 60 * 24);

                if (daysSinceActivity > this.expiryDays) {
                    window.DebugLogger.log('Lead session expired - Generating NEW session.');
                    localStorage.removeItem(this.storageKey);
                    return this._createNewSession();
                }

                // ============================================================
                // ✅ RESTORE LEAD SESSION
                // ============================================================
                // The user is a known lead and the session is valid. Restore it.
                // We generate a NEW session_id for the *chat conversation* // but we attach the existing `lead_id` to it so the bot knows them.
                const restoredSession = {
                    ...data,
                    session_id: this.generateSessionId(), // Optional: Keep ID or rotate it. Rotating is safer for "Conversation" logic.
                    last_activity: now.toISOString(),
                    isReturning: true
                };

                this._cachedSession = restoredSession;
                this._saveToStorage(restoredSession);

                window.DebugLogger.log('Returning Lead detected:', restoredSession.lead_id);
                return restoredSession;

            } catch (e) {
                window.DebugLogger.error('Corrupt session data found - Resetting.', e);
                return this._createNewSession();
            }
        }

        // No stored data found -> Create New Session
        return this._createNewSession();
    }

    /**
     * Create a brand new session with default values
     */
    _createNewSession() {
        const now = new Date().toISOString();
        const newSession = {
            session_id: this.generateSessionId(),
            lead_id: null,      // Important: null means anonymous
            phone: null,
            email: null,
            name: null,
            created_at: now,
            last_activity: now,
            isReturning: false,
            messageCount: 0,
            contactProvidedInSession: false
        };

        // Cache and save
        this._cachedSession = newSession;
        this._saveToStorage(newSession);

        window.DebugLogger.log('New Session Created:', newSession.session_id);
        return newSession;
    }

    /**
     * Update session when a user provides contact info (Lead Capture)
     * This "locks" the session so it persists on refresh.
     */
    updateLeadInfo(leadId, phone, email, name) {
        if (!this._cachedSession) {
            this.getOrCreateSession();
        }

        // Update fields
        this._cachedSession.lead_id = leadId;
        this._cachedSession.phone = phone || this._cachedSession.phone;
        this._cachedSession.email = email || this._cachedSession.email;
        this._cachedSession.name = name || this._cachedSession.name;
        this._cachedSession.isReturning = true;

        // Reset message count on successful capture
        this.resetMessageCount();

        // Save immediately
        this.saveSession(this._cachedSession);
        window.DebugLogger.log('Lead Captured & Session Locked:', { leadId, phone });
    }

    // ==========================================
    // HELPER METHODS
    // ==========================================

    _saveToStorage(sessionData) {
        localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
    }

    saveSession(sessionData) {
        sessionData.last_activity = new Date().toISOString();
        this._cachedSession = sessionData;
        this._saveToStorage(sessionData);
    }

    updateActivity() {
        if (this._cachedSession) {
            this._cachedSession.last_activity = new Date().toISOString();
            this._saveToStorage(this._cachedSession);
        }
    }

    incrementMessageCount() {
        if (!this._cachedSession) this.getOrCreateSession();

        if (!this._cachedSession.messageCount) {
            this._cachedSession.messageCount = 0;
        }

        this._cachedSession.messageCount++;
        this._saveToStorage(this._cachedSession);
        return this._cachedSession.messageCount;
    }

    getMessageCount() {
        const session = this.getOrCreateSession();
        return session.messageCount || 0;
    }

    resetMessageCount() {
        if (this._cachedSession) {
            this._cachedSession.messageCount = 0;
            this._saveToStorage(this._cachedSession);
        }
    }

    markContactProvided() {
        if (this._cachedSession) {
            this._cachedSession.contactProvidedInSession = true;
            this._saveToStorage(this._cachedSession);
        }
    }

    clearSession() {
        this._cachedSession = null;
        localStorage.removeItem(this.storageKey);
        window.DebugLogger.log('Session Cleared');
    }

    getSessionId() {
        const session = this.getOrCreateSession();
        return session.session_id;
    }

    getLeadId() {
        const session = this.getOrCreateSession();
        return session.lead_id;
    }

    isReturningUser() {
        const session = this.getOrCreateSession();
        return session.isReturning && session.lead_id !== null;
    }
}

// Export for use in other modules
window.SessionManager = SessionManager;
// ============ src/api-client.js ============
/**
 * APIClient - Handles all communication with the FastAPI backend
 * Supports streaming responses via NDJSON
 */

class APIClient {
    constructor(config) {
        this.baseUrl = config.apiUrl;
    }

    /**
     * Send a chat message and handle streaming response
     * @param {string} query - User's message
     * @param {string} sessionId - Current session ID
     * @param {function} onToken - Callback for each token received (content, node)
     * @param {function} onToolResult - Callback for tool results
     * @param {function} onComplete - Callback when stream completes
     * @param {function} onError - Callback for errors
     */

    async checkSessionStatus(sessionId) {
        try {
            const response = await fetch(`${this.baseUrl}/session/${sessionId}/status`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            return await response.json();
        } catch (error) {
            window.DebugLogger.error('Status check failed:', error);
            return { expired: false };
        }
    }
    async sendMessage(query, sessionId, callbacks) {
        const { onToken, onToolResult, onComplete, onError } = callbacks;

        // 60 second timeout to prevent browser from randomly aborting
        const controller = new AbortController();
        let timeoutId = setTimeout(() => controller.abort(), 60000);

        try {
            const response = await fetch(`${this.baseUrl}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    query: query,
                    session_id: sessionId
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);  // Clear timeout on successful response

            if (!response.ok) {
                // Extract FastAPI error detail from response body
                let detail = `HTTP error! status: ${response.status}`;
                try {
                    const errorBody = await response.json();
                    if (errorBody.detail) detail = errorBody.detail;
                } catch (e) { /* ignore parse errors */ }
                throw new Error(detail);
            }

            // Handle streaming NDJSON response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    window.DebugLogger.log('Stream complete');

                    // Process any remaining buffer content
                    if (buffer.trim()) {
                        try {
                            const data = JSON.parse(buffer);
                            // Process valid data types
                            if (data.type === 'token' && onToken) {
                                onToken(data.content, data.node);
                            } else if (data.type === 'tool_result' && onToolResult) {
                                onToolResult(data.tool_name, data.content);
                            }
                        } catch (e) {
                            window.DebugLogger.error('Error parsing final buffer:', e);
                        }
                    }

                    if (onComplete) onComplete();
                    break;
                }

                // Decode chunk and add to buffer
                buffer += decoder.decode(value, { stream: true });

                // Process complete JSON lines
                const lines = buffer.split('\n');
                buffer = lines.pop(); // Keep incomplete line in buffer

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    try {
                        const data = JSON.parse(line);

                        // Handle different message types
                        if (data.type === 'token') {
                            if (onToken) onToken(data.content, data.node);

                        } else if (data.type === 'heartbeat') {
                            // Keep-alive signal
                            window.DebugLogger.log('Heartbeat received');
                        } else if (data.type === 'tool_start') {
                            // Tool started
                            window.DebugLogger.log('Tool started:', data.tool_name);
                        } else if (data.type === 'tool_result') {
                            if (onToolResult) onToolResult(data.tool_name, data.content);
                        } else if (data.done) {
                            if (onComplete) onComplete();
                        }
                    } catch (e) {
                        window.DebugLogger.error('Error parsing JSON line:', { line, error: e });
                    }
                }
            }

        } catch (error) {
            window.DebugLogger.error('Error sending message:', error);
            if (onError) onError(error);
        }
    }

    /**
     * Initialize session with lead_id for returning users
     * @param {string} sessionId - New session ID
     * @param {string} leadId - Existing lead ID from localStorage
     */
    async initSession(sessionId, leadId) {
        try {
            const response = await fetch(`${this.baseUrl}/session/init`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true'
                },
                body: JSON.stringify({
                    session_id: sessionId,
                    lead_id: leadId
                })
            });

            const data = await response.json();
            window.DebugLogger.log('Session initialized:', data);
            return data;
        } catch (error) {
            window.DebugLogger.error('Error initializing session:', error);
            // Non-critical error, continue anyway
            return null;
        }
    }
}

// Export for use in other modules
window.APIClient = APIClient;


// ============ src/ui-manager.js ============
/**
 * UIManager - Go Ed AI Edition
 * Professional UI with Robot and Student Icons
 */

class UIManager {
    // AI Robot Icon (for AI messages and header)
    static AI_AVATAR_SVG = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C11.4477 2 11 2.44772 11 3V4H8C6.89543 4 6 4.89543 6 6V9.17071C4.83481 9.58254 4 10.6938 4 12V18C4 19.6569 5.34315 21 7 21H17C18.6569 21 20 19.6569 20 18V12C20 10.6938 19.1652 9.58254 18 9.17071V6C18 4.89543 17.1046 4 16 4H13V3C13 2.44772 12.5523 2 12 2ZM16 6H8V9H16V6ZM7 11C6.44772 11 6 11.4477 6 12V18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V12C18 11.4477 17.5523 11 17 11H7ZM9 14C9.55228 14 10 13.5523 10 13C10 12.4477 9.55228 12 9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14ZM16 13C16 13.5523 15.5523 14 15 14C14.4477 14 14 13.5523 14 13C14 12.4477 14.4477 12 15 12C15.5523 12 16 12.4477 16 13ZM9 17H15C15 16.4477 14.5523 16 14 16H10C9.44772 16 9 16.4477 9 17Z"/>
        </svg>
    `;

    // Student Icon (for user messages)
    static STUDENT_AVATAR_SVG = `
        <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 7L5 9.18V15.18C5 16.79 8.13 18 12 18C15.87 18 19 16.79 19 15.18V9.18L21 8.09V17H23V7L12 2ZM18.82 7L12 10.72L5.18 7L12 3.28L18.82 7ZM17 15C17 15.5 14.77 16 12 16C9.23 16 7 15.5 7 15V10.27L12 13L17 10.27V15Z"/>
        </svg>
    `;

    constructor(config) {
        this.config = config;
        this.widgetContainer = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.sendButton = null;
        this.toggleButton = null;
        this.isOpen = false;
        this.currentAIMessageElement = null;
    }

    init() {
        this.widgetContainer = this._createWidgetHTML();
        document.body.appendChild(this.widgetContainer);

        this.messagesContainer = this.widgetContainer.querySelector('.chatbot-messages');
        this.inputField = this.widgetContainer.querySelector('.chatbot-input');
        this.sendButton = this.widgetContainer.querySelector('.chatbot-send-btn');
        this.toggleButton = document.querySelector('.chatbot-toggle-btn');
        this.themeToggleBtn = this.widgetContainer.querySelector('.chatbot-theme-toggle');

        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        this._applyConfig();
        window.DebugLogger.log('UI initialized');
    }

    clearMessages() {
        if (this.messagesContainer) {
            this.messagesContainer.innerHTML = '';
        }
    }

// Add this method to UIManager class

// showContactWarning() {
//     const messageDiv = document.createElement('div');
//     messageDiv.className = 'chatbot-message chatbot-message-ai chatbot-system-message';
//     messageDiv.innerHTML = `
//         <div class="chatbot-message-avatar">
//             🤖
//         </div>
//         <div class="chatbot-message-bubble" style="background: #FFF7ED; border-left: 4px solid #F97316;">
//             <div class="chatbot-message-content" style="color: #9A3412;">
//                 <strong>⚠️ Contact Details Required</strong><br>
//                 Since you haven't provided your contact details, we won't be able to register you or send you any notifications. Please share your contact information!
//             </div>
//         </div>
//     `;
    
//     this.messagesContainer.appendChild(messageDiv);
//     this._scrollToBottom();
// }


    showExpiryMessage(isArchived = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message chatbot-message-ai chatbot-system-message';

        if (isArchived) {
            // Session was archived to Postgres/Dataverse
            messageDiv.innerHTML = `
                <div class="chatbot-message-avatar">
                    🤖
                </div>
                <div class="chatbot-message-bubble" style="background: #FEF3C7; border-left: 4px solid #F59E0B;">
                    <div class="chatbot-message-content" style="color: #92400E;">
                        <strong>💾 Session Archived</strong><br>
                        Your previous conversation has been saved. A new session has been started. Feel free to continue chatting!
                    </div>
                </div>
            `;
        } else {
            // Session expired due to inactivity
            messageDiv.innerHTML = `
                <div class="chatbot-message-avatar">
                    🤖
                </div>
                <div class="chatbot-message-bubble" style="background: #FEF2F2; border-left: 4px solid #EF4444;">
                    <div class="chatbot-message-content" style="color: #991B1B;">
                        <strong>⏰ Session Expired</strong><br>
                        Your chat session ended due to inactivity. A new session has been started. Feel free to continue chatting!
                    </div>
                </div>
            `;
        }

        this.messagesContainer.appendChild(messageDiv);
        this._scrollToBottom();

        if (!this.isOpen) {
            this.open();
        }
    }

    showError(message) {
        if (!this.messagesContainer) return;

        const errorDiv = document.createElement('div');
        errorDiv.className = 'chatbot-message chatbot-message-ai';
        errorDiv.innerHTML = `
            <div class="chatbot-message-avatar">
                🤖
            </div>
            <div class="chatbot-message-bubble" style="background: #FEF2F2; border: 1px solid #FCA5A5;">
                <div class="chatbot-message-content" style="color: #B91C1C; font-weight: 500;">
                    ${message}
                </div>
            </div>
        `;

        this.messagesContainer.appendChild(errorDiv);
        this._scrollToBottom();
    }

    _createWidgetHTML() {
        const container = document.createElement('div');
        container.className = 'chatbot-widget-container';
        container.innerHTML = `
            <!-- Toggle Button with Chat Icon -->
            <button class="chatbot-toggle-btn" aria-label="Toggle chat">
                <svg class="chatbot-icon-open" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16ZM7 9H9V11H7V9ZM11 9H13V11H11V9ZM15 9H17V11H15V9Z"/>
                </svg>
                <svg class="chatbot-icon-close" viewBox="0 0 24 24" fill="currentColor" style="display:none;">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
                </svg>
            </button>

            <!-- Main Widget -->
            <div class="chatbot-widget" style="display: none;">
                <!-- Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-content">
                        <div class="chatbot-avatar">
                            🤖
                        </div>
                        <div class="chatbot-header-text">
                            <div class="chatbot-title">Go Ed AI Assistant</div>
                            <div class="chatbot-status">
                                <span class="chatbot-status-dot"></span>
                                Online
                            </div>
                        </div>
                    </div>
                    <div class="chatbot-header-actions">
                        <button class="chatbot-header-btn chatbot-theme-toggle" aria-label="Toggle dark mode">
                            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: none;">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                            </svg>
                            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                            </svg>
                        </button>
                        <button class="chatbot-header-btn chatbot-close-btn" aria-label="Close chat">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"/>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Messages Area -->
                <div class="chatbot-messages"></div>

                <!-- Input Area -->
                <div class="chatbot-input-area">
                    <input 
                        type="text" 
                        class="chatbot-input" 
                        placeholder="${this.config.placeholder}"
                        aria-label="Type your message"
                    />
                    <button class="chatbot-send-btn" aria-label="Send message">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>

                <!-- Footer -->
                <div class="chatbot-footer">
                    <span class="chatbot-powered-by">Powered by Go Ed AI</span>
                </div>
            </div>
        `;
        return container;
    }

    _applyConfig() {
        const widget = this.widgetContainer.querySelector('.chatbot-widget');

        if (this.config.position === 'bottom-left') {
            this.widgetContainer.style.left = '24px';
            this.widgetContainer.style.right = 'auto';
        }

        const root = document.documentElement;
        root.style.setProperty('--chatbot-primary-color', this.config.primaryColor);

        this._initTheme();

        widget.style.width = this.config.width || '400px';
        widget.style.height = this.config.height || '640px';
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message chatbot-message-user';
        messageDiv.innerHTML = `
            <div class="chatbot-message-avatar" style="background: linear-gradient(135deg, #6366F1, #8B5CF6);">
                🎓
            </div>
            <div class="chatbot-message-content">${this._escapeHtml(text)}</div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this._scrollToBottom();
    }

    startAIMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message chatbot-message-ai';
        messageDiv.innerHTML = `
            <div class="chatbot-message-avatar">
                🤖
            </div>
            <div class="chatbot-message-bubble">
                <div class="chatbot-message-content"></div>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
        this.currentAIMessageElement = messageDiv.querySelector('.chatbot-message-content');
        this._scrollToBottom();

        return this.currentAIMessageElement;
    }

    appendToAIMessage(token) {
        if (this.currentAIMessageElement) {
            this.currentAIMessageElement.textContent += token;
            this._scrollToBottom();
        }
    }

    finishAIMessage() {
        this.currentAIMessageElement = null;
    }

    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-typing-indicator';
        typingDiv.innerHTML = `
            <div class="chatbot-message-avatar">
                🤖
            </div>
            <div class="chatbot-typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        typingDiv.id = 'chatbot-typing';
        this.messagesContainer.appendChild(typingDiv);
        this._scrollToBottom();
    }

    hideTypingIndicator() {
        const typingDiv = document.getElementById('chatbot-typing');
        if (typingDiv) {
            typingDiv.remove();
        }
    }

    showGreeting() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chatbot-message chatbot-message-ai chatbot-greeting';
        messageDiv.innerHTML = `
            <div class="chatbot-message-avatar">
                🤖
            </div>
            <div class="chatbot-message-bubble">
                <div class="chatbot-message-content">${this._escapeHtml(this.config.greeting)}</div>
            </div>
        `;

        this.messagesContainer.appendChild(messageDiv);
    }

    clearInput() {
        this.inputField.value = '';
    }

    getInputValue() {
        return this.inputField.value.trim();
    }

    focusInput() {
        this.inputField.focus();
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        const widget = this.widgetContainer.querySelector('.chatbot-widget');
        const iconOpen = this.toggleButton.querySelector('.chatbot-icon-open');
        const iconClose = this.toggleButton.querySelector('.chatbot-icon-close');

        widget.style.display = 'flex';
        iconOpen.style.display = 'none';
        iconClose.style.display = 'block';
        this.isOpen = true;

        this.focusInput();
    }

    close() {
        const widget = this.widgetContainer.querySelector('.chatbot-widget');
        const iconOpen = this.toggleButton.querySelector('.chatbot-icon-open');
        const iconClose = this.toggleButton.querySelector('.chatbot-icon-close');

        widget.style.display = 'none';
        iconOpen.style.display = 'block';
        iconClose.style.display = 'none';
        this.isOpen = false;
    }

    _scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    disableInput() {
        this.inputField.disabled = true;
        this.sendButton.disabled = true;
    }

    enableInput() {
        this.inputField.disabled = false;
        this.sendButton.disabled = false;
    }

    _initTheme() {
        const savedTheme = localStorage.getItem('chatbot-theme');
        const widget = this.widgetContainer.querySelector('.chatbot-widget');

        if (savedTheme === 'dark' || (!savedTheme && this.config.theme === 'dark')) {
            this._setTheme('dark');
        } else {
            this._setTheme('light');
        }
    }

    toggleTheme() {
        const widget = this.widgetContainer.querySelector('.chatbot-widget');
        const isDark = widget.classList.contains('chatbot-dark-theme');
        this._setTheme(isDark ? 'light' : 'dark');
    }

    _setTheme(theme) {
        const widget = this.widgetContainer.querySelector('.chatbot-widget');
        const sunIcon = this.widgetContainer.querySelector('.icon-sun');
        const moonIcon = this.widgetContainer.querySelector('.icon-moon');

        if (theme === 'dark') {
            widget.classList.add('chatbot-dark-theme');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
            localStorage.setItem('chatbot-theme', 'dark');
        } else {
            widget.classList.remove('chatbot-dark-theme');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
            localStorage.setItem('chatbot-theme', 'light');
        }
    }
}

window.UIManager = UIManager;
// ============ src/chatbot-widget.js ============
/**
 * ChatbotWidget - Main controller that orchestrates all components
 * This is the entry point and public API
 * CLEANED VERSION: Session-only, no lead/identity logic
 */

(function () {
    'use strict';

    class ChatbotWidget {
        constructor() {
            this.config = null;
            this.sessionManager = null;
            this.apiClient = null;
            this.uiManager = null;
            this.initialized = false;
            this._sseAbortController = null;
        }

        /**
         * Initialize the chatbot widget
         * @param {Object} userConfig - User configuration
         */
        init(userConfig = {}) {
            if (this.initialized) {
                return;
            }

            // Merge user config with defaults
            this.config = { ...window.ChatbotConfig, ...userConfig };
            this.config.expiryDays = this.config.sessionExpiryDays;

            // Initialize components
            this.sessionManager = new window.SessionManager(this.config);
            this.apiClient = new window.APIClient(this.config);
            this.uiManager = new window.UIManager(this.config);

            // Initialize UI
            this.uiManager.init();

            // Set up event listeners
            this._setupEventListeners();

            // Initialize session (Ensure ID exists)
            this._initializeSession();

            // Start real-time session event stream (SSE)
            this._startSessionEventStream();

            // Show generic greeting
            this.uiManager.showGreeting();

            this.initialized = true;
        }

        /**
         * Initialize session
         * Purely ensures a valid session_id exists. No backend handshake required.
         */
        async _initializeSession() {
            this.sessionManager.getOrCreateSession();
        }

        /**
         * Start real-time SSE stream for session events (archive notifications)
         * Uses fetch() instead of EventSource to support custom headers (ngrok requires it)
         */
        _startSessionEventStream() {
            // Abort any existing connection
            if (this._sseAbortController) {
                this._sseAbortController.abort();
                this._sseAbortController = null;
            }

            const session = this.sessionManager.getOrCreateSession();
            const sessionId = session.session_id;
            if (!sessionId) return;

            const url = `${this.config.apiUrl}/session/${sessionId}/events`;
            this._sseAbortController = new AbortController();

            const self = this;

            (async function () {
                try {
                    const response = await fetch(url, {
                        headers: {
                            'ngrok-skip-browser-warning': 'true',
                            'Accept': 'text/event-stream'
                        },
                        signal: self._sseAbortController.signal
                    });

                    if (!response.ok) {
                        throw new Error(`SSE HTTP error: ${response.status}`);
                    }

                    const reader = response.body.getReader();
                    const decoder = new TextDecoder();
                    let buffer = '';

                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        buffer += decoder.decode(value, { stream: true });

                        // Process complete SSE events (separated by double newline)
                        const events = buffer.split('\n\n');
                        buffer = events.pop(); // keep incomplete event

                        for (const event of events) {
                            if (!event.trim() || event.startsWith(':')) continue; // skip keepalives/comments

                            // Parse "data: {...}" lines
                            const dataLine = event.split('\n').find(l => l.startsWith('data: '));
                            if (!dataLine) continue;

                            try {
                                const data = JSON.parse(dataLine.substring(6));
                                if (data.type === 'archived') {
                                    window.DebugLogger.log('📡 Received archive event via SSE');

                                    // Clear old messages from UI
                                    self.uiManager.clearMessages();

                                    // Show expiry message
                                    self.uiManager.showExpiryMessage();

                                    // Clear local session data completely
                                    self.sessionManager.clearSession();

                                    // Create NEW fresh session
                                    self.sessionManager.getOrCreateSession();

                                    // Reconnect SSE with new session
                                    self._startSessionEventStream();
                                    return; // exit this stream reader
                                }
                            } catch (e) {
                                window.DebugLogger.error('Error parsing SSE event:', e);
                            }
                        }
                    }
                } catch (error) {
                    if (error.name === 'AbortError') return; // intentional abort
                    window.DebugLogger.warn('SSE connection error, reconnecting in 5s...', error);
                    setTimeout(() => self._startSessionEventStream(), 5000);
                }
            })();
        }

        /**
         * Setup all event listeners
         */
        _setupEventListeners() {
            // Toggle button
            this.uiManager.toggleButton.addEventListener('click', () => {
                this.uiManager.toggle();
            });

            // Close button
            const closeBtn = this.uiManager.widgetContainer.querySelector('.chatbot-close-btn');
            closeBtn.addEventListener('click', () => {
                this.uiManager.close();
            });

            // Send button
            this.uiManager.sendButton.addEventListener('click', () => {
                this._handleSendMessage();
            });

            // Input field - Enter key
            this.uiManager.inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this._handleSendMessage();
                }
            });

            // Input field - Update activity on typing
            this.uiManager.inputField.addEventListener('input', () => {
                this.sessionManager.updateActivity();
            });
        }

        /**
         * Handle sending a message
         * Simplified: No status checks, no warning thresholds
         */
        async _handleSendMessage() {
            const message = this.uiManager.getInputValue();

            if (!message) {
                return;
            }

            // Ensure valid session
            const session = this.sessionManager.getOrCreateSession();

            // Send directly
            await this._sendMessageToBackend(message, session.session_id);
        }

        /**
         * Actually send the message to backend
         */
        async _sendMessageToBackend(message, sessionId) {

            // Add user message to UI FIRST
            this.uiManager.addUserMessage(message);
            this.uiManager.clearInput();
            this.uiManager.disableInput();

            // CRITICAL FIX: Wait for the browser to paint the user message
            // before starting the API call. Without this, if the backend responds
            // very fast, the AI response bubble can appear before the user's
            // message is visually rendered.
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

            // Show typing indicator (after user message is painted)
            this.uiManager.showTypingIndicator();

            // Update activity timestamp
            this.sessionManager.updateActivity();

            // Send to API
            await this.apiClient.sendMessage(message, sessionId, {
                onToken: (content, node) => {
                    // Remove typing indicator on first token
                    if (this.uiManager.isTypingVisible) {
                        this.uiManager.hideTypingIndicator();
                    }

                    // Start AI message if not started
                    if (!this.uiManager.currentAIMessageElement) {
                        this.uiManager.startAIMessage();
                    }

                    // Append token
                    this.uiManager.appendToAIMessage(content);
                },

                onToolResult: (toolName, content) => {
                    // No frontend logic needed.
                    // The Backend handles all identity logic.
                },

                onComplete: () => {
                    this.uiManager.hideTypingIndicator();
                    this.uiManager.finishAIMessage();
                    // Re-enable input ONLY after typewriter queue fully drains
                    this.uiManager.onQueueDrained = () => {
                        this.uiManager.enableInput();
                        this.uiManager.focusInput();
                    };
                },

                onError: (error) => {
                    this.uiManager.hideTypingIndicator();

                    // Handle specific session archived error
                    if (error.message === 'SESSION_ARCHIVED') {
                        window.DebugLogger.warn('Backend rejected message: Session already archived. Rotating ID.');

                        // Clear UI and Local Session
                        this.uiManager.clearMessages();
                        this.sessionManager.clearSession();

                        // Show expiry message
                        this.uiManager.showExpiryMessage();

                        // Create NEW session and re-start polling
                        this.sessionManager.getOrCreateSession();
                        this._startSessionEventStream();
                    } else {
                        this.uiManager.showError('Failed to send message. Please try again.');
                    }

                    this.uiManager.enableInput();
                    this.uiManager.focusInput();
                }
            });
        }

        /**
         * Public API: Send message programmatically
         */
        sendMessage(message) {
            if (!this.initialized) return;
            this.uiManager.inputField.value = message;
            this._handleSendMessage();
        }

        /**
         * Public API: Open widget
         */
        open() {
            if (!this.initialized) return;
            this.uiManager.open();
        }

        /**
         * Public API: Close widget
         */
        close() {
            if (!this.initialized) return;
            this.uiManager.close();
        }

        /**
         * Public API: Clear session
         */
        clearSession() {
            if (!this.initialized) return;
            this.sessionManager.clearSession();
        }

        /**
         * Public API: Get session info
         */
        getSessionInfo() {
            if (!this.initialized) return null;

            return {
                session_id: this.sessionManager.getSessionId()
            };
        }
    }

    // Create global instance
    window.ChatbotWidget = new ChatbotWidget();

    // Auto-initialize on DOMContentLoaded if config exists
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.ChatbotAutoInit) {
                window.ChatbotWidget.init(window.ChatbotAutoInit);
            }
        });
    }

})();
