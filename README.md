# Education Chatbot Widget - Frontend

A lightweight, embeddable chatbot widget built with Vanilla JavaScript.

## 🚀 Quick Start

### For Development
```bash
# No build step needed! Just open in browser
open index.html
```

### For Production (Embedding)
```html
<!-- Add to your website -->
<script src="https://your-cdn.com/chatbot-widget.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'http://localhost:8000',
    primaryColor: '#667eea',
    position: 'bottom-right'
  });
</script>
```

## 📁 File Structure

```
frontend/
├── index.html              # Development test page
├── src/
│   ├── chatbot-widget.js   # Main widget controller
│   ├── session-manager.js  # localStorage session handling
│   ├── api-client.js       # Backend API communication
│   ├── ui-manager.js       # DOM manipulation & rendering
│   └── config.js           # Configuration defaults
├── styles/
│   ├── widget.css          # Main widget styles
│   └── themes.css          # Color themes
└── build/
    └── chatbot-widget.min.js  # Production bundle (created manually)
```

## 🎨 Features

- ✅ Streaming chat responses (NDJSON)
- ✅ Session persistence (localStorage with 7-day expiry)
- ✅ Lead capture (automatic via conversation)
- ✅ Returning user recognition
- ✅ Responsive design
- ✅ Dark mode support
- ✅ Zero dependencies
- ✅ ~10KB total size

## 🔧 Configuration

### Runtime Configuration (Recommended for Deployment)

Edit `env.js` to configure the widget **without rebuilding**. Perfect for changing settings after deployment:

```javascript
// env.js - Edit this file on your server after deployment
window.CHATBOT_ENV = {
    API_URL: 'https://your-api.azurewebsites.net',
    SESSION_EXPIRY_DAYS: 7,
    PRIMARY_COLOR: '#667eea',
    THEME: 'light',
    WIDGET_POSITION: 'bottom-right',
    GREETING_MESSAGE: 'Hi! How can I help you today?',
    PLACEHOLDER_TEXT: 'Type your message...',
    WIDGET_WIDTH: '380px',
    WIDGET_HEIGHT: '600px'
};
```

**Benefits:**
- ✅ No rebuild required
- ✅ Change API URL instantly
- ✅ Update colors/messages on the fly
- ✅ Perfect for multi-environment deployments

### JavaScript Configuration (Optional Override)

You can also override settings programmatically:

```javascript
ChatbotWidget.init({
  apiUrl: 'http://localhost:8000',  // Overrides env.js
  primaryColor: '#667eea',
  position: 'bottom-right',  // or 'bottom-left'
  theme: 'light',            // or 'dark'
  sessionExpiryDays: 7,
  placeholder: 'Type a message...',
  greeting: 'Hi! How can I help you today?'
});
```

### Post-Deployment Configuration Changes

**To change config after deployment:**

1. SSH into your server
2. Edit `env.js`:
   ```bash
   nano /var/www/chatbot/env.js
   ```
3. Change values (e.g., `API_URL`)
4. Save and exit
5. Changes take effect immediately on page refresh!

**No rebuild or redeploy needed!**

---

## 🔄 Session Management

### Session Lifecycle

```
Page Load → Check localStorage → Session exists?
    ├─ NO  → Create new session (sess_<uuid>)
    └─ YES → Generate new session_id, keep lead_id
             (Each page load = new conversation session)

User sends message → Stored in Redis (backend)
    └─ Every 5 user messages → Auto-summary created

Lead captured → lead_id stored in:
    ├─ localStorage (frontend)
    ├─ Redis (backend session)
    └─ Persists across sessions

Session inactive > X minutes → Archive Worker:
    ├─ Save to PostgreSQL
    ├─ Save to Dataverse (linked to lead_id)
    └─ Clean up Redis
```

### Session Keys

| Location | Key | Purpose |
|----------|-----|---------|
| **Browser localStorage** | `chatbot_session` | Full session object with user info |
| **Redis** | `messages:list:{session_id}` | Conversation history |
| **Redis** | `lead_id:{session_id}` | CRM lead reference |
| **Redis** | `summary:{session_id}` | Rolling summary (every 5 msgs) |
| **PostgreSQL** | `sessions.session_id` | Archived conversation |
| **Dataverse** | `zx_postgressessionid` | Cross-system sync ID |

### Important Behaviors

1. **New session_id per page load** - Each refresh/new tab = new conversation
2. **Lead info persists** - `lead_id`, phone, email, name survive across sessions
3. **7-day expiry** - Sessions expire after 7 days of inactivity (default)
4. **Rolling summaries** - Every 5 user messages trigger LLM-based summary
5. **Cryptographically secure IDs** - Uses `crypto.randomUUID()` not `Math.random()`

---


## 📚 API Reference

### Widget Methods

```javascript
// Initialize widget
ChatbotWidget.init(config);

// Open/close widget
ChatbotWidget.open();
ChatbotWidget.close();

// Send message programmatically
ChatbotWidget.sendMessage('Hello');

// Clear session
ChatbotWidget.clearSession();
```

## 🧪 Testing

1. **Start your FastAPI backend:**
   ```bash
   cd chatbot
   python main.py  # Runs on http://localhost:8000
   ```

2. **Open test page:**
   ```bash
   cd frontend
   open index.html  # or use Live Server in VS Code
   ```

3. **Test scenarios:**
   - Send 3 messages without providing contact info
   - Provide phone number on 4th message
   - Refresh page (session should persist)
   - Clear cache after 7 days (should ask for info again)

## 📦 Building for Production

Since this is vanilla JS, no build step is strictly needed. However, for optimization:

```bash
# Minify (optional - use online tools or simple script)
# Combine all JS files into one
cat src/config.js src/session-manager.js src/api-client.js src/ui-manager.js src/chatbot-widget.js > build/chatbot-widget.js

# Use online minifier or terser
npx terser build/chatbot-widget.js -o build/chatbot-widget.min.js
```

## 🎯 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

Private project - All rights reserved
