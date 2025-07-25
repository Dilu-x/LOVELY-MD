
const { cmd } = require("../command");
const { getBuffer } = require("../lib/functions");
const fb = require("fb-downloader-scrapper");

cmd({
    pattern: "fb",
    alias: ["facebook", "fbdl"],
    desc: "Download Facebook videos",
    category: "downloader",
    react: "📹",
    filename: __filename
}, async (robin, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a Facebook video URL!\n\nExample: *.fb https://www.facebook.com/watch?v=...*");

        // Check if the URL is a valid Facebook URL
        if (!q.includes('facebook.com') && !q.includes('fb.watch')) {
            return reply("❌ Please provide a valid Facebook video URL!");
        }

        reply("📹 Downloading Facebook video... Please wait...");

        // Download Facebook video
        const result = await fb(q);
        
        if (!result || !result.sd) {
            return reply("❌ Failed to download Facebook video. Please check the URL and try again.");
        }

        const videoBuffer = await getBuffer(result.sd);
        
        if (!videoBuffer) {
            return reply("❌ Failed to fetch video. Please try again later.");
        }

        const caption = `🎬 *Facebook Video Downloaded*\n\n` +
                       `📝 *Title:* ${result.title || 'No title available'}\n` +
                       `⏱️ *Duration:* ${result.duration || 'Unknown'}\n` +
                       `👁️ *Quality:* SD\n\n` +
                       `> 🤖 *LOVELY-MD Bot*`;

        await robin.sendMessage(from, {
            video: videoBuffer,
            caption: caption,
            mimetype: "video/mp4"
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error downloading Facebook video: ${e.message || e}`);
    }
});
