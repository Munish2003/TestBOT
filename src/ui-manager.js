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