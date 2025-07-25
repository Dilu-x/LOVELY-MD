
const { cmd } = require("../command");
const { getBuffer, fetchJson } = require("../lib/functions");

// APK downloader
cmd({
    pattern: "apk",
    desc: "Download APK files",
    category: "downloader",
    react: "📱",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an app name!\n\nExample: *.apk WhatsApp*");
        
        reply("📱 Searching for APK... Please wait...");
        
        const response = await fetchJson(`https://api.ryzendesu.vip/api/downloader/apk?query=${encodeURIComponent(q)}`);
        
        if (response && response.data && response.data.length > 0) {
            const app = response.data[0];
            const caption = `📱 *APK Found*\n\n` +
                           `📝 *Name:* ${app.name || 'Unknown'}\n` +
                           `📦 *Package:* ${app.package || 'Unknown'}\n` +
                           `⭐ *Rating:* ${app.rating || 'Unknown'}\n` +
                           `📥 *Size:* ${app.size || 'Unknown'}\n\n` +
                           `🔗 *Download Link:* ${app.link || 'Not available'}\n\n` +
                           `> 🤖 *LOVELY-MD Downloader*`;
            
            reply(caption);
        } else {
            reply("❌ APK not found. Please try a different app name.");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Google Drive downloader
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "Download from Google Drive",
    category: "downloader",
    react: "☁️",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a Google Drive URL!");
        
        if (!q.includes('drive.google.com')) {
            return reply("❌ Please provide a valid Google Drive URL!");
        }
        
        reply("☁️ Processing Google Drive link... Please wait...");
        
        const response = await fetchJson(`https://api.ryzendesu.vip/api/downloader/gdrive?url=${encodeURIComponent(q)}`);
        
        if (response && response.data) {
            const caption = `☁️ *Google Drive File*\n\n` +
                           `📝 *Name:* ${response.data.fileName || 'Unknown'}\n` +
                           `📏 *Size:* ${response.data.fileSize || 'Unknown'}\n` +
                           `📥 *Download:* ${response.data.downloadUrl || 'Not available'}\n\n` +
                           `> 🤖 *LOVELY-MD Downloader*`;
            
            reply(caption);
        } else {
            reply("❌ Failed to process Google Drive link");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// MediaFire downloader
cmd({
    pattern: "mediafire",
    alias: ["mf"],
    desc: "Download from MediaFire",
    category: "downloader",
    react: "🔥",
    filename: __filename
}, async (robin, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a MediaFire URL!");
        
        if (!q.includes('mediafire.com')) {
            return reply("❌ Please provide a valid MediaFire URL!");
        }
        
        reply("🔥 Processing MediaFire link... Please wait...");
        
        const response = await fetchJson(`https://api.ryzendesu.vip/api/downloader/mediafire?url=${encodeURIComponent(q)}`);
        
        if (response && response.data) {
            const caption = `🔥 *MediaFire File*\n\n` +
                           `📝 *Name:* ${response.data.filename || 'Unknown'}\n` +
                           `📏 *Size:* ${response.data.filesize || 'Unknown'}\n` +
                           `📅 *Upload:* ${response.data.upload_date || 'Unknown'}\n` +
                           `📥 *Download:* ${response.data.link || 'Not available'}\n\n` +
                           `> 🤖 *LOVELY-MD Downloader*`;
            
            reply(caption);
        } else {
            reply("❌ Failed to process MediaFire link");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
