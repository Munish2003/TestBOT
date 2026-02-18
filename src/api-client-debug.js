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
            const response = await fetch(`${this.baseUrl}/session/${sessionId}/status`);
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
                },
                body: JSON.stringify({
                    query: query,
                    session_id: sessionId
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
                    clearTimeout(inactivityTimeout);
                    if (onComplete) onComplete();
                    break;
                }

                resetInactivity();
                buffer += decoder.decode(value, { stream: true });

                const lines = buffer.split('\n');
                buffer = lines.pop();

                for (const line of lines) {
                    if (line.trim() === '') continue;

                    try {
                        const data = JSON.parse(line);

                        if (data.type === 'token') {
                            if (onToken) onToken(data.content, data.node);
                        } else if (data.type === 'heartbeat') {
                            // Keep-alive signal — no action needed
                        } else if (data.type === 'tool_start') {
                            // Tool execution started
                        } else if (data.type === 'tool_result') {
                            if (onToolResult) onToolResult(data.tool_name, data.content);
                        } else if (data.type === 'error') {
                            if (onError) onError(new Error(data.error));
                        } else if (data.type === 'done' || data.done) {
                            if (onComplete) onComplete();
                        }
                    } catch (e) {
                        // Skip malformed JSON lines
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
