
const { cmd } = require("../command");
const { getBuffer, fetchJson } = require("../lib/functions");

// Browse command
cmd({
    pattern: "browse",
    alias: ["google", "search"],
    desc: "Search on Google",
    category: "tools",
    react: "🔍",
    filename: __filename
}, async (robin, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a search query!");
        
        reply("🔍 Searching... Please wait...");
        
        const searchResults = `🔍 *Google Search Results*\n\n` +
                             `📝 *Query:* ${q}\n` +
                             `🔗 *Link:* https://www.google.com/search?q=${encodeURIComponent(q)}\n\n` +
                             `💡 Click the link above to see full results\n\n` +
                             `> 🤖 *LOVELY-MD Tools*`;
        
        reply(searchResults);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Calculate command
cmd({
    pattern: "calculate",
    alias: ["calc", "math"],
    desc: "Calculate mathematical expressions",
    category: "tools",
    react: "🔢",
    filename: __filename
}, async (robin, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a mathematical expression!\n\nExample: *.calc 2+2*");
        
        // Simple calculator (basic operations only for security)
        const expression = q.replace(/[^0-9+\-*/().\s]/g, '');
        
        if (!expression) return reply("❌ Invalid mathematical expression!");
        
        try {
            const result = eval(expression);
            
            const calculation = `🔢 *Calculator*\n\n` +
                              `📝 *Expression:* ${q}\n` +
                              `✅ *Result:* ${result}\n\n` +
                              `> 🤖 *LOVELY-MD Tools*`;
            
            reply(calculation);
        } catch (calcError) {
            reply("❌ Invalid mathematical expression!");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Get profile picture command
cmd({
    pattern: "getpp",
    alias: ["profilepic", "avatar"],
    desc: "Get profile picture of a user",
    category: "tools",
    react: "🖼️",
    filename: __filename
}, async (robin, mek, m, { from, quoted, reply }) => {
    try {
        let targetUser = mek.key.participant || mek.key.remoteJid;
        
        if (quoted) {
            targetUser = quoted.sender;
        }
        
        try {
            const ppUrl = await robin.profilePictureUrl(targetUser, 'image');
            
            await robin.sendMessage(from, {
                image: { url: ppUrl },
                caption: `🖼️ *Profile Picture*\n\n📱 *User:* @${targetUser.split('@')[0]}\n\n> 🤖 *LOVELY-MD Tools*`,
                mentions: [targetUser]
            }, { quoted: mek });
        } catch (ppError) {
            reply("❌ Profile picture not found or user doesn't have one!");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Get about command
cmd({
    pattern: "getabout",
    alias: ["about", "bio"],
    desc: "Get user's about/bio",
    category: "tools",
    react: "📝",
    filename: __filename
}, async (robin, mek, m, { from, quoted, reply }) => {
    try {
        let targetUser = mek.key.participant || mek.key.remoteJid;
        
        if (quoted) {
            targetUser = quoted.sender;
        }
        
        try {
            const about = await robin.fetchStatus(targetUser);
            
            const aboutInfo = `📝 *User About*\n\n` +
                             `👤 *User:* @${targetUser.split('@')[0]}\n` +
                             `💬 *About:* ${about.status || 'No about available'}\n` +
                             `📅 *Set on:* ${about.setAt ? new Date(about.setAt * 1000).toDateString() : 'Unknown'}\n\n` +
                             `> 🤖 *LOVELY-MD Tools*`;
            
            reply(aboutInfo);
        } catch (aboutError) {
            reply("❌ Unable to fetch user's about information!");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Emoji mix command
cmd({
    pattern: "emojimix",
    alias: ["mixemoji"],
    desc: "Mix two emojis",
    category: "tools",
    react: "😊",
    filename: __filename
}, async (robin, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide two emojis!\n\nExample: *.emojimix 😀+😍*");
        
        const emojis = q.split('+');
        if (emojis.length !== 2) return reply("❌ Please provide exactly two emojis separated by +");
        
        reply("😊 Mixing emojis... Please wait...");
        
        // Using Google's emoji kitchen API
        const emoji1 = encodeURIComponent(emojis[0].trim());
        const emoji2 = encodeURIComponent(emojis[1].trim());
        
        const mixUrl = `https://www.gstatic.com/android/keyboard/emojikitchen/20201001/u${emoji1.codePointAt(0).toString(16)}/u${emoji1.codePointAt(0).toString(16)}_u${emoji2.codePointAt(0).toString(16)}.png`;
        
        try {
            await robin.sendMessage(from, {
                image: { url: mixUrl },
                caption: `😊 *Emoji Mix*\n\n🔀 *Mixed:* ${emojis[0].trim()} + ${emojis[1].trim()}\n\n> 🤖 *LOVELY-MD Tools*`
            }, { quoted: mek });
        } catch (mixError) {
            reply("❌ Unable to mix these emojis. Try different ones!");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// QR Code command
cmd({
    pattern: "qrcode",
    alias: ["qr"],
    desc: "Generate QR code",
    category: "tools",
    react: "📱",
    filename: __filename
}, async (robin, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide text to generate QR code!\n\nExample: *.qr Hello World*");
        
        reply("📱 Generating QR code... Please wait...");
        
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(q)}`;
        
        await robin.sendMessage(from, {
            image: { url: qrUrl },
            caption: `📱 *QR Code Generated*\n\n📝 *Text:* ${q}\n\n> 🤖 *LOVELY-MD Tools*`
        }, { quoted: mek });
        
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Device info command
cmd({
    pattern: "device",
    alias: ["deviceinfo"],
    desc: "Get device information",
    category: "tools",
    react: "📱",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const os = require('os');
        
        const deviceInfo = `📱 *Device Information*\n\n` +
                          `🖥️ *Platform:* ${os.platform()}\n` +
                          `🏗️ *Architecture:* ${os.arch()}\n` +
                          `💾 *Total RAM:* ${Math.round(os.totalmem() / 1024 / 1024)} MB\n` +
                          `🆓 *Free RAM:* ${Math.round(os.freemem() / 1024 / 1024)} MB\n` +
                          `⚡ *CPU Count:* ${os.cpus().length}\n` +
                          `📝 *Node Version:* ${process.version}\n` +
                          `⏱️ *Uptime:* ${Math.round(os.uptime() / 3600)} hours\n\n` +
                          `> 🤖 *LOVELY-MD Tools*`;
        
        reply(deviceInfo);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
