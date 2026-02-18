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
            this.pollingInterval = null;
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

            // Start inactivity polling
            this._startInactivityPolling();

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
         * Start polling backend for session expiry
         */
        _startInactivityPolling() {
            if (this.pollingInterval) clearInterval(this.pollingInterval);

            this.pollingInterval = setInterval(async () => {
                const session = this.sessionManager.getOrCreateSession();
                const sessionId = session.session_id;
                if (!sessionId) return;

                // Check backend status
                const status = await this.apiClient.checkSessionStatus(sessionId);

                // If session expired on backend
                if (status && status.expired === true) {
                    // Stop polling temporarily
                    clearInterval(this.pollingInterval);

                    // Clear old messages from UI
                    this.uiManager.clearMessages();

                    // Show expiry message
                    this.uiManager.showExpiryMessage();

                    // Clear local session data completely
                    this.sessionManager.clearSession();

                    // Create NEW fresh session (No re-linking)
                    this.sessionManager.getOrCreateSession();

                    // Restart polling with new session
                    this._startInactivityPolling();
                }
            }, 60000); // Check every 60 seconds
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
            this._sendMessageToBackend(message, session.session_id);
        }

        /**
         * Actually send the message to backend
         */
        async _sendMessageToBackend(message, sessionId) {

            // Add user message to UI
            this.uiManager.addUserMessage(message);
            this.uiManager.clearInput();
            this.uiManager.disableInput();

            // Show typing indicator
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
                    this.uiManager.enableInput();
                    this.uiManager.focusInput();
                },

                onError: (error) => {
                    this.uiManager.hideTypingIndicator();
                    this.uiManager.showError('Failed to send message. Please try again.');
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