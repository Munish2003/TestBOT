// /**
//  * SessionManager - Handles localStorage-based session persistence
//  * Manages session_id, lead_id, and expiry logic
//  * 
//  * IMPORTANT: Session is cached in memory to prevent regenerating session_id on every call
//  */

// class SessionManager {
//     constructor(config) {
//         this.storageKey = config.sessionStorageKey;
//         this.expiryDays = config.expiryDays;
//         this._cachedSession = null; // In-memory cache to prevent repeated regeneration
//     }

//     /**
//      * Generate a unique session ID using Web Crypto API
//      * Format: sess_<uuid>
//      * 
//      * Uses crypto.randomUUID() for cryptographically secure random IDs
//      * More secure than Math.random() and standards-compliant
//      */
//     generateSessionId() {
//         return `sess_${crypto.randomUUID()}`;
//     }

//     /**
//      * Get or create session data (with caching)
//      * Returns: { session_id, lead_id, phone, email, name, created_at, last_activity, isReturning }
//      * 
//      * NOTE: Session is cached in memory. session_id is generated ONCE per page load.
//      */
//   getOrCreateSession() {
//     // Return cached session if available
//     if (this._cachedSession) {
//         return this._cachedSession;
//     }

//     const stored = localStorage.getItem(this.storageKey);
//     const now = new Date();

//     if (stored) {
//         try {
//             const data = JSON.parse(stored);

//             // Validate required fields
//             if (!data.session_id || !data.last_activity || !data.created_at) {
//                 throw new Error('Invalid session shape');
//             }

//             // Check expiry
//             const lastActivity = new Date(data.last_activity);
//             const daysSinceActivity = (now - lastActivity) / (1000 * 60 * 60 * 24);

//             if (daysSinceActivity > this.expiryDays) {
//                 window.DebugLogger.log('Session expired, creating new session');
//                 localStorage.removeItem(this.storageKey);
//                 return this._createNewSession();
//             }

//             // Reuse existing session (NO mutation, NO extra fields)
//             const session = {
//                 session_id: data.session_id,
//                 created_at: data.created_at,
//                 last_activity: now.toISOString()
//             };

//             this._cachedSession = session;
//             this._saveToStorage(session);
//             return session;

//         } catch (e) {
//             window.DebugLogger.error('Invalid session data, resetting session', e);
//             localStorage.removeItem(this.storageKey);
//             return this._createNewSession();
//         }
//     }

//     // No stored session → create new
//     return this._createNewSession();
// }



//     /**
//      * Create a new session for first-time user
//      */
//     _createNewSession() {
//         const now = new Date().toISOString();
//         const newSession = {
//             session_id: this.generateSessionId(),
//             // lead_id: null,
//             // phone: null,
//             // email: null,
//             // name: null,
//             created_at: now,
//             last_activity: now,
//             // isReturning: false,
//             // messageCount: 0,
//             // contactProvidedInSession: false

//         };

//         // Cache and save
//         this._cachedSession = newSession;
//         this._saveToStorage(newSession);
//         window.DebugLogger.log('New session created:', newSession.session_id);
//         return newSession;
//     }

    
//     //track user messages
// /**
//  * Increment user message count
//  */
// // incrementMessageCount() {
// //     if (!this._cachedSession) {
// //         this.getOrCreateSession();
// //     }
    
// //     if (!this._cachedSession.messageCount) {
// //         this._cachedSession.messageCount = 0;
// //     }
    
// //     this._cachedSession.messageCount++;
// //     this._saveToStorage(this._cachedSession);
    
// //     return this._cachedSession.messageCount;
// // }

// /**
//  * Get current message count
//  */
// // getMessageCount() {
// //     const session = this.getOrCreateSession();
// //     return session.messageCount || 0;
// // }

// /**
//  * Reset message count (call this when lead is captured)
//  */
// // resetMessageCount() {
// //     if (this._cachedSession) {
// //         this._cachedSession.messageCount = 0;
// //         this._saveToStorage(this._cachedSession);
// //     }
// // }

// /**
//  * Mark that contact details were provided in this session
//  */
// // markContactProvided() {
// //     if (this._cachedSession) {
// //         this._cachedSession.contactProvidedInSession = true;
// //         this._saveToStorage(this._cachedSession);
// //         window.DebugLogger.log('Contact provided flag set for current session');
// //     }
// // }


//     /**
//      * Internal: Save session to localStorage without triggering cache invalidation
//      */
//     _saveToStorage(sessionData) {
//         localStorage.setItem(this.storageKey, JSON.stringify(sessionData));
//     }

//     /**
//      * Save/update session data to localStorage and update cache
//      */
//     saveSession(sessionData) {
//         sessionData.last_activity = new Date().toISOString();
//         this._cachedSession = sessionData;  // Update cache
//         this._saveToStorage(sessionData);
//     }

//     /**
//      * Update session with lead information
//      * Called when agent captures user's contact info
//      */
//     // updateLeadInfo(leadId, phone, email, name) {
//     //     // Use cached session directly - don't call getOrCreateSession()
//     //     if (!this._cachedSession) {
//     //         this.getOrCreateSession();  // Initialize if needed
//     //     }

//     //     this._cachedSession.lead_id = leadId;
//     //     this._cachedSession.phone = phone || this._cachedSession.phone;
//     //     this._cachedSession.email = email || this._cachedSession.email;
//     //     this._cachedSession.name = name || this._cachedSession.name;
        
//     //     this.resetMessageCount();  // Add this line
//     //     this.saveSession(this._cachedSession);
//     //     window.DebugLogger.log('Lead info updated:', { leadId, phone, email, name });
//     // }

//     /**
//      * Update activity timestamp (lightweight - no session regeneration)
//      * Call this on every message sent/received
//      */
//     updateActivity() {
//         // Only update timestamp in storage, don't regenerate session
//         if (this._cachedSession) {
//             this._cachedSession.last_activity = new Date().toISOString();
//             this._saveToStorage(this._cachedSession);
//         }
//     }

//     /**
//      * Clear session data (logout/reset)
//      */
//     clearSession() {
//         this._cachedSession = null;  // Clear cache
//         localStorage.removeItem(this.storageKey);
//         window.DebugLogger.log('Session cleared');
//     }

//     /**
//      * Get current session ID
//      */
//     getSessionId() {
//         const session = this.getOrCreateSession();
//         return session.session_id;
//     }

//     /**
//      * Get current lead ID (null if not registered)
//      */
//     // getLeadId() {
//     //     const session = this.getOrCreateSession();
//     //     return session.lead_id;
//     // }

//     /**
//      * Check if user is a returning user
//      */
//     // isReturningUser() {
//     //     const session = this.getOrCreateSession();
//     //     return session.isReturning && session.lead_id !== null;
//     // }
// }

// // Export for use in other modules
// window.SessionManager = SessionManager;
















/**
 * SessionManager - Handles localStorage-based session persistence
 * Manages session_id, lead_id, and expiry logic.
 * * LOGIC SUMMARY:
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
        return `sess_${crypto.randomUUID()}`;
    }

    /**
     * Get existing session or create a new one.
     * This is the "Brain" of the session logic.
     */
    getOrCreateSession() {
        // 1. Return memory cache if available (prevents regenerating ID multiple times per page load)
        if (this._cachedSession) {
            return this._cachedSession;
        }

        const stored = localStorage.getItem(this.storageKey);
        const now = new Date();

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