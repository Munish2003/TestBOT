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
         * ============================================================
         * SSE: Real-time session archive notifications
         * ============================================================
         * 
         * TWO VERSIONS below:
         * 
         * 1. FETCH-BASED (currently ACTIVE) — For DEV with ngrok
         *    Needed because ngrok requires 'ngrok-skip-browser-warning' header
         *    and EventSource cannot send custom headers.
         * 
         * 2. EVENTSOURCE-BASED (currently COMMENTED) — For PRODUCTION
         *    Cleaner, built-in auto-reconnect, browser-optimized.
         * 
         * ⚠️ BEFORE DEPLOYING TO PRODUCTION:
         *    - COMMENT OUT the fetch-based version below
         *    - UNCOMMENT the EventSource version below
         * ============================================================
         */

        // ==========================================
        // ✅ DEV VERSION (fetch-based) — ACTIVE
        // Comment this out before deploying to production
        // ==========================================
        _startSessionEventStream() {
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

                        const events = buffer.split('\n\n');
                        buffer = events.pop();

                        for (const event of events) {
                            if (!event.trim() || event.startsWith(':')) continue;

                            const dataLine = event.split('\n').find(l => l.startsWith('data: '));
                            if (!dataLine) continue;

                            try {
                                const data = JSON.parse(dataLine.substring(6));
                                if (data.type === 'archived') {
                                    window.DebugLogger.log('📡 Received archive event via SSE');
                                    self.uiManager.clearMessages();
                                    self.uiManager.showExpiryMessage();
                                    self.sessionManager.clearSession();
                                    self.sessionManager.getOrCreateSession();
                                    self._startSessionEventStream();
                                    return;
                                }
                            } catch (e) {
                                window.DebugLogger.error('Error parsing SSE event:', e);
                            }
                        }
                    }
                } catch (error) {
                    if (error.name === 'AbortError') return;
                    window.DebugLogger.warn('SSE connection error, reconnecting in 5s...', error);
                    setTimeout(() => self._startSessionEventStream(), 5000);
                }
            })();
        }

        // ==========================================
        // 🚀 PRODUCTION VERSION (EventSource) — COMMENTED
        // Uncomment this and comment the fetch version above before deploying
        // ==========================================
        // _startSessionEventStream() {
        //     if (this.eventSource) {
        //         this.eventSource.close();
        //         this.eventSource = null;
        //     }
        //
        //     const session = this.sessionManager.getOrCreateSession();
        //     const sessionId = session.session_id;
        //     if (!sessionId) return;
        //
        //     const url = `${this.config.apiUrl}/session/${sessionId}/events`;
        //     this.eventSource = new EventSource(url);
        //
        //     this.eventSource.onmessage = (event) => {
        //         try {
        //             const data = JSON.parse(event.data);
        //             if (data.type === 'archived') {
        //                 window.DebugLogger.log('📡 Received archive event via SSE');
        //                 this.eventSource.close();
        //                 this.eventSource = null;
        //                 this.uiManager.clearMessages();
        //                 this.uiManager.showExpiryMessage();
        //                 this.sessionManager.clearSession();
        //                 this.sessionManager.getOrCreateSession();
        //                 this._startSessionEventStream();
        //             }
        //         } catch (e) {
        //             window.DebugLogger.error('Error parsing SSE event:', e);
        //         }
        //     };
        //
        //     this.eventSource.onerror = () => {
        //         window.DebugLogger.warn('SSE reconnecting...');
        //         // EventSource auto-reconnects by default — just log it
        //     };
        // }

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