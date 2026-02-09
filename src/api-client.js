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
            const response = await fetch(`${this.baseUrl}/session/${sessionId}/status`);
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
        const timeoutId = setTimeout(() => controller.abort(), 60000);

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

            clearTimeout(timeoutId);  // Clear timeout on successful response

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Handle streaming NDJSON response
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();

                if (done) {
                    window.DebugLogger.log('Stream complete');
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

