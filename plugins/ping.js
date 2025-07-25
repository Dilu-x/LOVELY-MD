const { cmd } = require("../command");

cmd({
  pattern: "ping",
  desc: "Check bot response speed",
  category: "main",
  react: "🏓",
  filename: __filename,
}, async (conn, mek, m, { reply }) => {
  const start = Date.now();

  await reply("📡 *Pinging...*"); // ✅ No .then here

  const end = Date.now();
  const speed = end - start;

  reply(`🏓 *Pong!*\n⚡ Response: ${speed} ms`);
});