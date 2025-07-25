const { cmd } = require("../command");
const { fetchJson } = require("../lib/functions");

// Analyze command
cmd({
    pattern: "analyze",
    desc: "Analyze text or image",
    category: "ai",
    react: "🔍",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide text to analyze!");
        
        reply("🔍 Analyzing... Please wait...");
        
        // Simple text analysis
        const wordCount = q.split(' ').length;
        const charCount = q.length;
        const sentiment = q.toLowerCase().includes('good') || q.toLowerCase().includes('great') || q.toLowerCase().includes('amazing') ? 'Positive' : 
                         q.toLowerCase().includes('bad') || q.toLowerCase().includes('terrible') || q.toLowerCase().includes('awful') ? 'Negative' : 'Neutral';
        
        const analysis = `📊 *Text Analysis*\n\n` +
                        `📝 *Text:* ${q}\n` +
                        `🔢 *Word Count:* ${wordCount}\n` +
                        `📏 *Character Count:* ${charCount}\n` +
                        `😊 *Sentiment:* ${sentiment}\n\n` +
                        `> 🤖 *LOVELY-MD Analysis*`;
        
        reply(analysis);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// DALL-E command
cmd({
    pattern: "dalle",
    desc: "Generate image using DALL-E",
    category: "ai",
    react: "🎨",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a description for image generation!");
        
        reply("🎨 Generating image... Please wait...");
        
        // Using a free image generation API
        const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(q)}?width=512&height=512`;
        
        await robin.sendMessage(from, {
            image: { url: imageUrl },
            caption: `🎨 *DALL-E Generated Image*\n\n📝 *Prompt:* ${q}\n\n> 🤖 *LOVELY-MD AI*`
        }, { quoted: mek });
        
    } catch (e) {
        reply(`❌ Error generating image: ${e.message}`);
    }
});

// Gemini command
cmd({
    pattern: "gemini",
    desc: "Chat with Gemini AI",
    category: "ai",
    react: "💎",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a question!");
        
        reply("💎 Gemini is thinking... Please wait...");
        
        // Using a free AI API
        const response = await fetchJson(`https://api.ryzendesu.vip/api/ai/gemini?text=${encodeURIComponent(q)}`);
        
        if (response && response.response) {
            reply(`💎 *Gemini AI*\n\n${response.response}\n\n> 🤖 *LOVELY-MD*`);
        } else {
            reply("❌ Failed to get response from Gemini AI");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// GPT command
cmd({
    pattern: "gpt",
    desc: "Chat with GPT AI",
    category: "ai",
    react: "🤖",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a question!");
        
        reply("🤖 GPT is thinking... Please wait...");
        
        const response = await fetchJson(`https://api.ryzendesu.vip/api/ai/chatgpt?text=${encodeURIComponent(q)}`);
        
        if (response && response.response) {
            reply(`🤖 *ChatGPT*\n\n${response.response}\n\n> 🤖 *LOVELY-MD*`);
        } else {
            reply("❌ Failed to get response from GPT");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Meta AI command
cmd({
    pattern: "metaai",
    desc: "Chat with Meta AI",
    category: "ai",
    react: "🔮",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a question!");
        
        reply("🔮 Meta AI is thinking... Please wait...");
        
        const response = await fetchJson(`https://api.ryzendesu.vip/api/ai/llama?text=${encodeURIComponent(q)}`);
        
        if (response && response.response) {
            reply(`🔮 *Meta AI*\n\n${response.response}\n\n> 🤖 *LOVELY-MD*`);
        } else {
            reply("❌ Failed to get response from Meta AI");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
