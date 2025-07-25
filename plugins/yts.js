
const { cmd } = require("../command");
const yts = require("yt-search");

cmd({
  pattern: "yts",
  alias: ["ytsearch", "youtube"],
  desc: "Search YouTube videos",
  category: "search",
  react: "🔍",
  filename: __filename,
}, async (dilu, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
  try {
    if (!q) return reply("❌ Please provide a search query!\n\nExample: *.yts Eminem rap god*");

    reply("🔍 Searching YouTube...");

    const search = await yts(q);
    const videos = search.videos.slice(0, 5);

    if (videos.length === 0) {
      return reply("❌ No results found for your search query.");
    }

    let searchResults = `🎥 *YouTube Search Results*\n\n`;
    searchResults += `🔍 Query: *${q}*\n`;
    searchResults += `📊 Found: *${search.videos.length}* results\n\n`;

    videos.forEach((video, index) => {
      searchResults += `*${index + 1}.* ${video.title}\n`;
      searchResults += `👤 *Channel:* ${video.author.name}\n`;
      searchResults += `⏱️ *Duration:* ${video.timestamp}\n`;
      searchResults += `👁️ *Views:* ${video.views.toLocaleString()}\n`;
      searchResults += `📅 *Uploaded:* ${video.ago}\n`;
      searchResults += `🔗 *Link:* ${video.url}\n\n`;
    });

    searchResults += `> 💡 Use *.play <title>* to download audio\n`;
    searchResults += `> 💡 Use *.video <title>* to download video`;

    await dilu.sendMessage(from, {
      image: { url: videos[0].thumbnail },
      caption: searchResults
    }, { quoted: mek });

  } catch (error) {
    console.error("YTS Error:", error);
    reply("❌ An error occurred while searching YouTube. Please try again later.");
  }
});
