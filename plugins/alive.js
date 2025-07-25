const { cmd } = require('../command');
const config = require('../config');
const { getBuffer, runtime } = require('../lib/functions');
const moment = require('moment-timezone');

cmd({
  pattern: "alive",
  desc: "Show bot is alive",
  category: "main",
  filename: __filename
}, async (m, text, { robin }) => {
  const aliveImg = 'https://files.catbox.moe/nj9z4m.jpg';

  // Set timezone and format
  const now = moment().tz("Asia/Colombo"); // Or change to your preferred timezone
  const formattedTime = now.format("DD/MM/YYYY, h:mm:ss a");

  const aliveMsg = `
╭━〔 *🤖 LOVELY-MD ELISHA ALIVE* 〕━◉
│ 👑 *Owner:* ${config.OWNER_NUMBER}
│ ⚙️ *Mode:* public
│ ⏰ *Uptime:* ${runtime(process.uptime())}
│ 📅 *Date:* ${formattedTime}
╰━━━━━━━━━━━━━━━◉
  `.trim();

  const buffer = await getBuffer(aliveImg);

  return robin.sendMessage(m.chat, {
    image: buffer,
    caption: aliveMsg
  }, { quoted: m });
});
