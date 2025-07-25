
const { cmd } = require("../command");
const { tikdown } = require("@tobyg74/tiktok-api-dl");
const { getBuffer } = require("../lib/functions");

cmd({
  pattern: "tiktok",
  alias: ["tt", "ttdl"],
  desc: "Download TikTok videos",
  category: "download",
  react: "📱",
  filename: __filename,
}, async (dilu, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a TikTok URL!\n\nExample: *.tiktok https://vm.tiktok.com/xxx*");

    if (!q.includes("tiktok.com")) {
      return reply("❌ Please provide a valid TikTok URL!");
    }

    reply("📱 Processing TikTok video...");

    const result = await tikdown(q);
    
    if (!result || result.status !== "success") {
      return reply("❌ Failed to download TikTok video. Please check the URL and try again.");
    }

    const videoData = result.data;
    
    if (!videoData.play) {
      return reply("❌ No video found or video is private/unavailable.");
    }

    // Send video info first
    let caption = `🎵 *TikTok Video Downloaded*\n\n`;
    caption += `📝 *Title:* ${videoData.title || 'No title'}\n`;
    caption += `👤 *Author:* ${videoData.author?.nickname || videoData.author?.unique_id || 'Unknown'}\n`;
    caption += `❤️ *Likes:* ${videoData.stats?.like_count || 0}\n`;
    caption += `💬 *Comments:* ${videoData.stats?.comment_count || 0}\n`;
    caption += `🔄 *Shares:* ${videoData.stats?.share_count || 0}\n`;
    caption += `⏱️ *Duration:* ${videoData.duration || 'Unknown'}\n\n`;
    caption += `> 🎬 Downloaded by LOVELY-MD`;

    // Download and send video
    const videoBuffer = await getBuffer(videoData.play);
    
    await dilu.sendMessage(from, {
      video: videoBuffer,
      caption: caption,
      mimetype: 'video/mp4'
    }, { quoted: mek });

    // If audio is available, send it too
    if (videoData.music_info?.play) {
      try {
        const audioBuffer = await getBuffer(videoData.music_info.play);
        await dilu.sendMessage(from, {
          audio: audioBuffer,
          mimetype: 'audio/mpeg',
          fileName: `${videoData.music_info.title || 'tiktok_audio'}.mp3`,
          ptt: false
        }, { quoted: mek });
      } catch (audioError) {
        console.log("Audio download failed:", audioError);
      }
    }

  } catch (error) {
    console.error("TikTok Error:", error);
    
    // Fallback method if primary API fails
    try {
      reply("🔄 Trying alternative method...");
      
      // Simple fallback using different approach
      const fallbackUrl = `https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(q)}`;
      const response = await fetch(fallbackUrl);
      const data = await response.json();
      
      if (data.video?.noWatermark) {
        const videoBuffer = await getBuffer(data.video.noWatermark);
        
        let fallbackCaption = `🎵 *TikTok Video Downloaded*\n\n`;
        fallbackCaption += `📝 *Title:* ${data.title || 'TikTok Video'}\n`;
        fallbackCaption += `👤 *Author:* ${data.author?.name || 'Unknown'}\n\n`;
        fallbackCaption += `> 🎬 Downloaded by LOVELY-MD`;
        
        await dilu.sendMessage(from, {
          video: videoBuffer,
          caption: fallbackCaption,
          mimetype: 'video/mp4'
        }, { quoted: mek });
      } else {
        throw new Error("Fallback method failed");
      }
    } catch (fallbackError) {
      console.error("Fallback Error:", fallbackError);
      reply("❌ Failed to download TikTok video. The video might be private, deleted, or the service is temporarily unavailable. Please try again later.");
    }
  }
});
