/**
 * Build Script for Chatbot Widget
 * 
 * Bundles all JS files + CSS into a single file for easy embedding.
 * 
 * Usage: node build.js
 */

const fs = require('fs');
const path = require('path');

// Build output directory
const BUILD_DIR = path.join(__dirname, 'build');

// Source files in dependency order (env.js MUST be first!)
const JS_FILES = [
    'env.js',  // Sets window.CHATBOT_ENV - must be first!
    'src/config.js',
    'src/debug-logger.js',
    'src/session-manager.js',
    'src/api-client.js',
    'src/ui-manager.js',
    'src/chatbot-widget.js'
];

const CSS_FILE = 'styles/widget.css';

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
}

console.log('🔧 Building Chatbot Widget Bundle...\n');

// Read and embed CSS as JavaScript
console.log('📦 Embedding CSS...');
const cssContent = fs.readFileSync(path.join(__dirname, CSS_FILE), 'utf8');
const cssMinified = cssContent
    .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove comments
    .replace(/\s+/g, ' ')               // Collapse whitespace
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove space around selectors
    .trim();

const cssInjector = `
// Auto-inject CSS styles
(function() {
    const style = document.createElement('style');
    style.id = 'chatbot-widget-styles';
    style.textContent = ${JSON.stringify(cssMinified)};
    document.head.appendChild(style);
})();
`;

// Concatenate all JavaScript files
console.log('📦 Bundling JavaScript files...');
let jsBundle = '';

JS_FILES.forEach(file => {
    const filePath = path.join(__dirname, file);
    const content = fs.readFileSync(filePath, 'utf8');
    jsBundle += `\n// ============ ${file} ============\n`;
    jsBundle += content;
    console.log(`   ✓ ${file}`);
});

// Create the full bundle with CSS injector first
const fullBundle = `/**
 * Chatbot Widget Bundle
 * Auto-generated - Do not edit directly
 * Generated: ${new Date().toISOString()}
 */
${cssInjector}
${jsBundle}
`;

// Write unminified bundle
const bundlePath = path.join(BUILD_DIR, 'chatbot-widget.bundle.js');
fs.writeFileSync(bundlePath, fullBundle, 'utf8');
console.log(`\n✅ Created: build/chatbot-widget.bundle.js (${(fullBundle.length / 1024).toFixed(1)} KB)`);

// For now, copy bundle as min.js (use proper minifier like terser for production)
// The aggressive regex minification was breaking JS syntax
console.log('📋 Creating min.js (same as bundle, use terser for real minification)...');
const minPath = path.join(BUILD_DIR, 'chatbot-widget.min.js');
fs.writeFileSync(minPath, fullBundle, 'utf8');
console.log(`✅ Created: build/chatbot-widget.min.js (${(fullBundle.length / 1024).toFixed(1)} KB)`);

console.log('\n🎉 Build complete!\n');
console.log('Usage:');
console.log('  <script src="https://your-cdn.com/chatbot-widget.min.js"></script>');
console.log('  <script>ChatbotWidget.init({ apiUrl: "https://your-api.com" });</script>');
console.log('\nTip: For production, run: npx terser build/chatbot-widget.bundle.js -o build/chatbot-widget.min.js --compress --mangle');
