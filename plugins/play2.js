
const { cmd } = require("../command");
const yts = require("yt-search");
const ytdl = require("ytdl-core");
const fs = require("fs");

cmd({
  pattern: "play2",
  alias: ["video", "mp4"],
  desc: "Download YouTube video",
  category: "download",
  react: "🎥",
  filename: __filename,
}, async (dilu, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a video name or YouTube URL!\n\nExample: *.play2 Eminem rap god*");

    reply("🔍 Searching for video...");

    let videoUrl;
    if (q.includes("youtube.com") || q.includes("youtu.be")) {
      videoUrl = q;
    } else {
      const search = await yts(q);
      if (search.videos.length === 0) {
        return reply("❌ No results found for your search query.");
      }
      videoUrl = search.videos[0].url;
    }

    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
    const duration = info.videoDetails.lengthSeconds;
    
    if (duration > 300) {
      return reply("❌ Sorry, video must be less than 5 minutes long!");
    }

    reply(`📥 Downloading: *${info.videoDetails.title}*\n⏱️ Duration: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}`);

    const stream = ytdl(videoUrl, {
      filter: 'videoandaudio',
      quality: 'highest'
    });

    const filename = `${title}_${Date.now()}.mp4`;
    const filePath = `./${filename}`;

    stream.pipe(fs.createWriteStream(filePath));

    stream.on('end', async () => {
      try {
        await dilu.sendMessage(from, {
          video: fs.readFileSync(filePath),
          mimetype: 'video/mp4',
          fileName: `${info.videoDetails.title}.mp4`,
          caption: `🎥 *${info.videoDetails.title}*\n\n👤 Channel: ${info.videoDetails.author.name}\n⏱️ Duration: ${Math.floor(duration/60)}:${(duration%60).toString().padStart(2, '0')}\n👁️ Views: ${parseInt(info.videoDetails.viewCount).toLocaleString()}`
        }, { quoted: mek });

        // Clean up file
        fs.unlinkSync(filePath);
      } catch (error) {
        console.error("Send Error:", error);
        reply("❌ Failed to send video file.");
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });

    stream.on('error', (error) => {
      console.error("Download Error:", error);
      reply("❌ Failed to download video. Please try again.");
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });

  } catch (error) {
    console.error("Play2 Error:", error);
    reply("❌ An error occurred while processing your request. Please try again later.");
  }
});
