
const { cmd } = require("../command");
const { getBuffer } = require("../lib/functions");
const instagramGetUrl = require("instagram-url-direct");

cmd({
    pattern: "instagram",
    alias: ["ig", "insta", "igdl"],
    desc: "Download Instagram videos and photos",
    category: "downloader",
    react: "📸",
    filename: __filename
}, async (robin, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) return reply("❌ Please provide an Instagram URL!\n\nExample: *.instagram https://www.instagram.com/p/...*");

        // Check if the URL is a valid Instagram URL
        if (!q.includes('instagram.com')) {
            return reply("❌ Please provide a valid Instagram URL!");
        }

        reply("📸 Processing Instagram media... Please wait...");

        // Download Instagram media
        const result = await instagramGetUrl(q);
        
        if (!result || !result.url_list || result.url_list.length === 0) {
            return reply("❌ Failed to download Instagram media. Please check the URL and try again.");
        }

        const mediaUrl = result.url_list[0];
        const mediaBuffer = await getBuffer(mediaUrl);
        
        if (!mediaBuffer) {
            return reply("❌ Failed to fetch media. Please try again later.");
        }

        const caption = `📸 *Instagram Media Downloaded*\n\n` +
                       `📝 *Type:* ${result.type || 'Media'}\n` +
                       `👤 *Username:* ${result.username || 'Unknown'}\n` +
                       `📄 *Caption:* ${result.caption || 'No caption'}\n\n` +
                       `> 🤖 *LOVELY-MD Bot*`;

        // Check if it's a video or image
        const isVideo = mediaUrl.includes('.mp4') || result.type === 'video';

        if (isVideo) {
            await robin.sendMessage(from, {
                video: mediaBuffer,
                caption: caption,
                mimetype: "video/mp4"
            }, { quoted: mek });
        } else {
            await robin.sendMessage(from, {
                image: mediaBuffer,
                caption: caption
            }, { quoted: mek });
        }

    } catch (e) {
        console.log(e);
        
        // Fallback method
        try {
            reply("🔄 Trying alternative method...");
            
            const fallbackUrl = `https://api.ryzendesu.vip/api/downloader/instagram?url=${encodeURIComponent(q)}`;
            const response = await fetch(fallbackUrl);
            const data = await response.json();
            
            if (data && data.data && data.data.length > 0) {
                const media = data.data[0];
                const mediaBuffer = await getBuffer(media.url);
                
                const fallbackCaption = `📸 *Instagram Media Downloaded*\n\n` +
                                       `📝 *Type:* ${media.type || 'Media'}\n` +
                                       `👁️ *Quality:* ${media.quality || 'Standard'}\n\n` +
                                       `> 🤖 *LOVELY-MD Bot*`;

                if (media.type === 'video') {
                    await robin.sendMessage(from, {
                        video: mediaBuffer,
                        caption: fallbackCaption,
                        mimetype: "video/mp4"
                    }, { quoted: mek });
                } else {
                    await robin.sendMessage(from, {
                        image: mediaBuffer,
                        caption: fallbackCaption
                    }, { quoted: mek });
                }
            } else {
                throw new Error("Fallback method failed");
            }
        } catch (fallbackError) {
            console.log("Fallback Error:", fallbackError);
            reply(`❌ Error downloading Instagram media: ${e.message || e}\n\nThe media might be private, deleted, or the service is temporarily unavailable.`);
        }
    }
});
