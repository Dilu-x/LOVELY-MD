
const { cmd } = require("../command");
const { getSetting, setSetting } = require("../lib/settings");

cmd({
    pattern: "mode",
    desc: "Switch bot mode between public and private",
    category: "owner",
    react: "🔄",
    filename: __filename
}, async (robin, mek, m, { from, args, reply, isOwner }) => {
    try {
        if (!isOwner) return reply("❌ This command is only for bot owners!");

        const mode = args[0]?.toLowerCase();
        
        if (!mode) {
            const currentMode = getSetting("mode");
            return reply(`🔄 *Current Mode:* ${currentMode.toUpperCase()}\n\n📖 *Usage:*\n• *.mode public* - Anyone can use bot\n• *.mode private* - Only owner can use bot`);
        }

        if (!["public", "private"].includes(mode)) {
            return reply("❌ Invalid mode! Use:\n• *.mode public*\n• *.mode private*");
        }

        setSetting("mode", mode);
        
        const modeEmoji = mode === "public" ? "🌍" : "🔒";
        const modeDescription = mode === "public" ? "Anyone can use the bot" : "Only owner can use the bot";
        
        reply(`✅ *Mode Changed Successfully!*\n\n${modeEmoji} *New Mode:* ${mode.toUpperCase()}\n📝 *Description:* ${modeDescription}\n\n> 🤖 *LOVELY-MD Bot*`);

    } catch (e) {
        console.log(e);
        reply(`❌ Error changing mode: ${e.message}`);
    }
});
