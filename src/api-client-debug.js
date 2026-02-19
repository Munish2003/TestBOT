/**
 * APIClient - Handles all communication with the FastAPI backend
 * Supports streaming responses via NDJSON
 */

class APIClient {
    constructor(config) {
        this.baseUrl = config.apiUrl;
    }

    async checkSessionStatus(sessionId) {
        try {
            const response = await fetch(`${this.baseUrl}/session/${sessionId}/status`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            return await response.json();
        } catch (error) {
            return { expired: false };
        }
    }

    async sendMessage(query, sessionId, callbacks) {
        const { onToken, onToolResult, onComplete, onError } = callbacks;

        // 120 second timeout for initial response (handles cold starts + token refresh)
        const controller = new AbortController();
        let timeoutId = setTimeout(() => {
            controller.abort();
        }, 120000);

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

            clearTimeout(timeoutId);

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

            // Stream-level inactivity timeout: resets on every chunk received
            let inactivityTimeout;
            const resetInactivity = () => {
                clearTimeout(inactivityTimeout);
                inactivityTimeout = setTimeout(() => {
                    controller.abort();
                }, 90000);
            };
            resetInactivity();

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    console.log('[STREAM] Reader done');
                    clearTimeout(inactivityTimeout);
                    if (onComplete) onComplete();
                    break;
                }

                resetInactivity();
                const chunk = decoder.decode(value, { stream: true });
                console.log('[STREAM] Raw chunk received:', chunk.substring(0, 200));
                buffer += chunk;

                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    let data;
                    try {
                        data = JSON.parse(line);
                    } catch (e) {
                        console.warn('[STREAM] Malformed JSON line:', line.substring(0, 100));
                        continue;
                    }

                    try {
                        console.log('[STREAM] Event:', data.type, data.type === 'token' ? data.content.substring(0, 50) : '');

                        if (data.type === 'token') {
                            if (onToken) onToken(data.content, data.node);
                        } else if (data.type === 'heartbeat') {
                            // Keep-alive signal — no action needed
                        } else if (data.type === 'tool_start') {
                            console.log('[STREAM] Tool starting:', data.tool_name);
                        } else if (data.type === 'tool_result') {
                            if (onToolResult) onToolResult(data.tool_name, data.content);
                        } else if (data.type === 'error') {
                            console.error('[STREAM] Backend error:', data.error);
                            if (onError) onError(new Error(data.error));
                        } else if (data.type === 'done' || data.done) {
                            if (onComplete) onComplete();
                        }
                    } catch (callbackError) {
                        console.error('[STREAM] ❌ Callback error on event:', data.type, callbackError);
                    }
                }
            }

        } catch (error) {
            if (onError) onError(error);
        }
    }

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

            return await response.json();
        } catch (error) {
            return null;
        }
    }
}

window.APIClient = APIClient;
