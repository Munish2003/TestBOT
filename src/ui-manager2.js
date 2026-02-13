/**
 * UIManager - IMT Edition (Markdown Headers Fixed)
 * Features: 
 * - Parses **, *, and # (Headers) into clean HTML.
 * - Smooth typewriter & Smart Delay.
 * - Preserves chat history.
 */

class UIManager {
    constructor(config) {
        this.config = config;

        // UI Elements
        this.widgetContainer = null;
        this.messagesContainer = null;
        this.inputField = null;
        this.sendButton = null;
        this.toggleButton = null;
        this.minimizeButton = null;
        this.attentionBadge = null;
        this.typingIndicator = null;
        this.badgeText = null;

        // State
        this.isOpen = false;
        this.currentAIMessageElement = null;

        // Typewriter & Markdown State
        this.typewriterQueue = [];
        this.typewriterTimer = null;
        this.isNetworkStreamDone = false;
        this.currentStreamedText = ""; // Buffer for raw text
        this.typingStartTime = 0;
        this.minTypingMs = 0; // OPTIMIZATION: Instant start (was 1500)
        this.isTypingVisible = false;
        this._lastFrameTime = 0; // For rAF throttling

        // Badge State
        this.badgeInterval = null;
        this.currentBadgeIndex = 0;
        this.isBadgeActive = true;

        this.attentionMessages = [
            { emoji: "💬", text: "Hey! Need help with admissions or figuring out your next step?" },
            { emoji: "😕", text: "Feeling confused about what to do after graduation?" },
            { emoji: "🎯", text: "Not sure which course fits you best? I can help!" },
            { emoji: "📝", text: "Stuck with forms, deadlines, or options?" },
            { emoji: "🛤️", text: "Trying to decide your future path?" },
            { emoji: "❓", text: "Got questions about college life or placements?" }
        ];
    }

    init() {
        this.widgetContainer = this._createWidgetHTML();
        document.body.appendChild(this.widgetContainer);

        // Bind Elements
        this.messagesContainer = this.widgetContainer.querySelector('#chatMessagesLeft');
        this.inputField = this.widgetContainer.querySelector('#chatInputLeft');
        this.sendButton = this.widgetContainer.querySelector('#sendButtonLeft');
        this.toggleButton = this.widgetContainer.querySelector('#chatToggleBtnLeft');
        this.minimizeButton = this.widgetContainer.querySelector('#minimizeBtnLeft');
        this.attentionBadge = this.widgetContainer.querySelector('#attentionBadge');
        this.badgeText = this.widgetContainer.querySelector('#badgeText');
        this.typingIndicator = this.widgetContainer.querySelector('#typingIndicatorLeft');

        this._initAttentionBadge();

        if (this.minimizeButton) {
            this.minimizeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.close();
            });
        }

        // TAB SWITCH FIX: When user returns to tab, flush all queued tokens instantly
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'visible' && this.typewriterQueue.length > 0) {
                this._flushQueue();
            }
        });
    }

    _createWidgetHTML() {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="chatbot-widget-left">
                <div class="chat-attention-badge" id="attentionBadge">
                    <div class="chat-attention-badge-content">
                        <span class="emoji">💬</span>
                        <span id="badgeText">Hey! Need help with admissions?</span>
                    </div>
                </div>
                
                <button class="chat-toggle-btn-left" id="chatToggleBtnLeft">
                    <img src="./images/IMT (2).png" alt="Ask Genie" class="chat-logo-icon">
                  
                </button>

                <div class="chat-window-left" id="chatWindowLeft">
                    <div class="chat-header">
                        <div class="chat-header-info">
                            <h3>IMT Agentic Assistant</h3>
                            <span class="chat-status">● Online</span>
                        </div>
                        <button class="minimize-btn chatbot-close-btn" id="minimizeBtnLeft">−</button>
                    </div>
                    
                    <div class="chat-messages" id="chatMessagesLeft"></div>

                    <div class="message bot typing-indicator-bubble" id="typingIndicatorLeft" style="display: none;">
                        <div class="message-avatar">🎓</div>
                        <div class="message-content">
                            <div class="typing-dots-wrapper">
                                <div class="typing-dot"></div>
                                <div class="typing-dot"></div>
                                <div class="typing-dot"></div>
                            </div>
                        </div>
                    </div>

                    <div class="chat-input-container">
                        <input 
                            type="text" 
                            class="chat-input" 
                            id="chatInputLeft" 
                            placeholder="Type your message..." 
                            autocomplete="off"
                        >
                        <button class="send-button" id="sendButtonLeft">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        return container;
    }

    // --- MARKDOWN PARSER (Updated) ---
    _parseMarkdown(text) {
        if (!text) return '';

        // 1. Escape HTML first (Security)
        let safeText = text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        // 2. HEADERS (#, ##, ###) -> Bold Text
        // Matches start of line (^), 1 to 6 #s, a space, then the text
        safeText = safeText.replace(/^\s*#{1,6}\s+(.*$)/gim, '<strong>$1</strong>');

        // 3. Bold (**text**)
        safeText = safeText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // 4. Italic (*text*)
        safeText = safeText.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 5. Line Breaks
        safeText = safeText.replace(/\n/g, '<br>');

        return safeText;
    }

    // --- Typewriter Logic ---
    _startTypewriterLoop() {
        if (this.typewriterTimer) cancelAnimationFrame(this.typewriterTimer);
        this._lastFrameTime = 0;

        const tick = (timestamp) => {
            // REMOVED Smart Delay: We want text to appear immediately
            // if (this.isTypingVisible) { ... }

            // Throttle to ~8ms per character (Faster typing)
            if (timestamp - this._lastFrameTime >= 8) {
                this._lastFrameTime = timestamp;

                if (this.typewriterQueue.length > 0) {
                    const char = this.typewriterQueue.shift();
                    this.currentStreamedText += char;

                    if (this.currentAIMessageElement) {
                        this.currentAIMessageElement.innerHTML = this._parseMarkdown(this.currentStreamedText);
                        this._scrollToBottom();
                    }
                } else if (this.isNetworkStreamDone) {
                    // Queue empty + network done → stop the loop
                    this.typewriterTimer = null;
                    this.currentAIMessageElement = null;
                    return; // Don't request another frame
                }
            }

            this.typewriterTimer = requestAnimationFrame(tick);
        };

        this.typewriterTimer = requestAnimationFrame(tick);
    }

    /**
     * Flush all remaining queued characters to the UI at once.
     * Called when: (1) user returns to tab, (2) stream finishes.
     */
    _flushQueue() {
        if (this.typewriterQueue.length === 0) return;

        // Cancel loop if running, to prevent conflict
        if (this.typewriterTimer) cancelAnimationFrame(this.typewriterTimer);
        this.typewriterTimer = null;

        // Dump all remaining chars into the streamed text at once
        this.currentStreamedText += this.typewriterQueue.join('');
        this.typewriterQueue = [];

        if (this.currentAIMessageElement) {
            this.currentAIMessageElement.innerHTML = this._parseMarkdown(this.currentStreamedText);
            this._scrollToBottom();
        }
    }

    // --- Message Handling ---
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.innerHTML = `<div class="message-content">${this._escapeHtml(text)}</div>`;
        this.messagesContainer.appendChild(messageDiv);
        this._scrollToBottom();
    }

    startAIMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-avatar">🎓</div>
            <div class="message-content"></div> 
        `;
        this.messagesContainer.appendChild(messageDiv);
        this.currentAIMessageElement = messageDiv.querySelector('.message-content');
        this._scrollToBottom();

        // Reset states
        this.typewriterQueue = [];
        this.currentStreamedText = "";
        this.isNetworkStreamDone = false;

        this._startTypewriterLoop();

        return this.currentAIMessageElement;
    }

    appendToAIMessage(token) {
        if (token) {
            const chars = token.split('');
            this.typewriterQueue.push(...chars);
        }
    }

    finishAIMessage() {
        this.isNetworkStreamDone = true;

        // FIX: Don't flush queue immediately if user is watching.
        // Let the typewriter finish naturally.
        // Only flush if tab is hidden (background) to ensure data is ready when they return.
        if (document.visibilityState === 'hidden') {
            this._flushQueue();
            this.currentAIMessageElement = null;
        }

        // If visible, do NOTHING else. The _startTypewriterLoop will handle the rest:
        // 1. Drain queue
        // 2. See isNetworkStreamDone = true
        // 3. Stop itself and null the element
    }

    // --- Indicators ---
    showTypingIndicator() {
        if (this.typingIndicator) {
            this.isTypingVisible = true;
            this.typingStartTime = Date.now();
            this.typingIndicator.style.display = 'flex';
            this._scrollToBottom();
        }
    }

    hideTypingIndicator() {
        // STREAMING FIX: Hiding immediately so text starts appearing ASAP
        this._forceHideIndicator();
    }

    _forceHideIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
            this.isTypingVisible = false;
        }
    }

    showGreeting() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        // Using innerHTML directly for the greeting since it's hardcoded
        messageDiv.innerHTML = `
            <div class="message-avatar">🎓</div>
            <div class="message-content">
                <p>Hello! Welcome to <strong>IMT Nagpur</strong>. 👋</p>
                <p>I’m IMT Nagpur Genie, here to help you with admissions, fees, or placements!</p>
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
    }

    showExpiryMessage() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot system-message';
        messageDiv.innerHTML = `
            <div class="message-avatar">⚠️</div>
            <div class="message-content" style="background:#FEF2F2; color:#991B1B; border:1px solid #FCA5A5;">
                Session timed out. I'm ready to start fresh!
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this._scrollToBottom();
    }

    showError(msg) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot';
        messageDiv.innerHTML = `
            <div class="message-avatar">⚠️</div>
            <div class="message-content" style="color:red;">
                ${msg}
            </div>
        `;
        this.messagesContainer.appendChild(messageDiv);
        this._scrollToBottom();
    }

    // --- Badge Logic ---
    _initAttentionBadge() {
        setTimeout(() => {
            if (this.isBadgeActive && this.attentionBadge && !this.isOpen) {
                this.attentionBadge.classList.add('show');
                this._startBadgeRotation();
            }
        }, 1000);
    }

    _startBadgeRotation() {
        if (this.badgeInterval) clearInterval(this.badgeInterval);
        this.badgeInterval = setInterval(() => {
            if (!this.isBadgeActive || this.isOpen) {
                clearInterval(this.badgeInterval);
                return;
            }
            this.attentionBadge.classList.remove('show');
            this.attentionBadge.classList.add('hide');

            setTimeout(() => {
                if (!this.isBadgeActive || this.isOpen) return;
                this.currentBadgeIndex = (this.currentBadgeIndex + 1) % this.attentionMessages.length;
                const nextMsg = this.attentionMessages[this.currentBadgeIndex];
                const emojiEl = this.attentionBadge.querySelector('.emoji');
                if (emojiEl) emojiEl.textContent = nextMsg.emoji;
                if (this.badgeText) this.badgeText.textContent = nextMsg.text;
                this.attentionBadge.classList.remove('hide');
                this.attentionBadge.classList.add('show');
            }, 500);
        }, 5000);
    }

    _stopBadge() {
        this.isBadgeActive = false;
        if (this.badgeInterval) clearInterval(this.badgeInterval);
        if (this.attentionBadge) {
            this.attentionBadge.classList.remove('show');
            this.attentionBadge.classList.add('hide');
            setTimeout(() => { this.attentionBadge.style.display = 'none'; }, 400);
        }
    }

    // --- Controls ---
    clearMessages() { if (this.messagesContainer) this.messagesContainer.innerHTML = ''; }
    clearInput() { this.inputField.value = ''; }
    getInputValue() { return this.inputField.value.trim(); }
    focusInput() { this.inputField.focus(); }
    disableInput() { this.inputField.disabled = true; this.sendButton.disabled = true; }
    enableInput() { this.inputField.disabled = false; this.sendButton.disabled = false; }

    toggle() { if (this.isOpen) this.close(); else this.open(); }

    open() {
        this._stopBadge();
        const windowEl = this.widgetContainer.querySelector('#chatWindowLeft');
        const btn = this.toggleButton;
        windowEl.classList.add('active');
        btn.classList.add('active');
        this.isOpen = true;
        setTimeout(() => this.focusInput(), 300);
    }

    close() {
        const windowEl = this.widgetContainer.querySelector('#chatWindowLeft');
        const btn = this.toggleButton;
        windowEl.classList.remove('active');
        btn.classList.remove('active');
        this.isOpen = false;
    }

    _scrollToBottom() { this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight; }

    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

window.UIManager = UIManager;