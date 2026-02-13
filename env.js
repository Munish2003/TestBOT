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
    API_URL: 'http://localhost:8000',

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
