
const { cmd } = require("../command");
const { runtime } = require("../lib/functions");
const { readEnv } = require("../lib/database");
const os = require("os");

// Bot status command
cmd({
    pattern: "botstatus",
    alias: ["status", "botinfo"],
    desc: "Check bot status and info",
    category: "main",
    react: "📊",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const config = await readEnv();
        const uptime = runtime(process.uptime());
        const totalMem = Math.round(require('os').totalmem / 1024 / 1024);
        const freeMem = Math.round(require('os').freemem / 1024 / 1024);
        const usedMem = totalMem - freeMem;
        
        const status = `📊 *BOT STATUS*\n\n` +
                      `🤖 *Bot Name:* ${config.BOT_NAME || 'LOVELY-MD'}\n` +
                      `⏱️ *Uptime:* ${uptime}\n` +
                      `💾 *RAM Usage:* ${usedMem}/${totalMem} MB\n` +
                      `🖥️ *Platform:* ${os.platform()}\n` +
                      `🏗️ *Architecture:* ${os.arch()}\n` +
                      `📝 *Node Version:* ${process.version}\n` +
                      `⚡ *Status:* Online & Active\n\n` +
                      `> 🤖 *LOVELY-MD Bot*`;
        
        reply(status);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Runtime command
cmd({
    pattern: "runtime",
    alias: ["uptime"],
    desc: "Check bot runtime",
    category: "main",
    react: "⏱️",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const uptime = runtime(process.uptime());
        reply(`⏱️ *Bot Runtime*\n\n${uptime}\n\n> 🤖 *LOVELY-MD*`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Repo command
cmd({
    pattern: "repo",
    alias: ["sc", "script"],
    desc: "Get bot repository",
    category: "main",
    react: "📂",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const repoInfo = `📂 *LOVELY-MD Repository*\n\n` +
                        `👨‍💻 *Developer:* DILU\n` +
                        `⭐ *Stars:* Give us a star!\n` +
                        `🍴 *Forks:* Fork and contribute\n` +
                        `📱 *Version:* 1.0.0\n` +
                        `📄 *License:* MIT\n\n` +
                        `🔗 *GitHub:* https://github.com/your-repo\n` +
                        `💬 *Support:* Join our group\n\n` +
                        `> 🤖 *LOVELY-MD Bot*`;
        
        await robin.sendMessage(from, {
            image: { url: "https://files.catbox.moe/pi5fnw.jpg" },
            caption: repoInfo
        }, { quoted: mek });
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Time command
cmd({
    pattern: "time",
    desc: "Get current time",
    category: "main",
    react: "🕐",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const now = new Date();
        const timeInfo = `🕐 *Current Time*\n\n` +
                        `📅 *Date:* ${now.toDateString()}\n` +
                        `⏰ *Time:* ${now.toTimeString()}\n` +
                        `🌍 *Timezone:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n` +
                        `📊 *Timestamp:* ${now.getTime()}\n\n` +
                        `> 🤖 *LOVELY-MD*`;
        
        reply(timeInfo);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
