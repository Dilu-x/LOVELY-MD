const { readEnv } = require("../lib/database");
const { cmd, commands } = require("../command");
const os = require("os");
const { runtime } = require("../lib/functions");

cmd({
  pattern: "menu",
  react: "📂",
  alias: ["getmenu", "list"],
  desc: "Show bot command menu",
  category: "main",
  filename: __filename,
},
async (robin, mek, m, { from, pushname, reply }) => {
  try {
    const config = await readEnv();

    let desc = `╭═══════════════════════╮
   🌟 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 ${config.BOT_NAME || "LOVELY-MD"} 🌟
╰═══════════════════════╯

👋 Hello, *${pushname}*
📟 Bot is Active & Ready!

╭─❏ 𝗕𝗢𝗧 𝗜𝗡𝗙𝗢 ❏
│📌 *𝙾𝚠𝚗𝚎𝚛*     : _
│⏱️ *𝚄𝚙𝚝𝚒𝚖𝚎*   : ${runtime(process.uptime())}
│🧠 *𝚁𝚊𝚖*         : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
│🌐 *𝙷𝚘𝚜𝚝*       : ${os.hostname()}
│🛠️ *𝚅𝚎𝚛𝚜𝚒𝚘𝚗* : 1.0.0
╰────────────────────╯

╭─❏ 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗜𝗘𝗦 ❏
 | 📁 1 .  𝙼𝚊𝚒𝚗 𝙼𝙴𝙽𝚄
 | 🔍 2 . 𝚂𝚎𝚊𝚛𝚌𝚑 𝙼𝙴𝙽𝚄
 | 📥 3 . 𝙳𝚘𝚠𝚗𝚕𝚘𝚊𝚍 𝙼𝙴𝙽𝚄
 | 👥 4 . 𝙵𝚞𝚗 𝙼𝙴𝙽𝚄
 | 👑 5 . 𝙾𝚠𝚗𝚎𝚛 𝙼𝙴𝙽𝚄
 | 👾 6 . 𝙰𝙸 𝙼𝙴𝙽𝚄
 | 🔑 7 . 𝚃𝚘𝚘𝚕𝚜 𝙼𝙴𝙽𝚄
╰────────────────────╯

📩 Reply with *1 - 6* to see commands in that section.

╭─────────────❏
│⚡ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆 ${config.BOT_NAME || "LOVELY-〽️𝐃"}
╰─────────────❏`;

    const msg = await robin.sendMessage(from, {
      image: { url: "https://files.catbox.moe/pi5fnw.jpg" },
      caption: desc
    }, { quoted: mek });

    robin.ev.on("messages.upsert", async (msgUpdate) => {
      const incoming = msgUpdate.messages[0];
      if (!incoming?.message?.extendedTextMessage) return;

      const selected = incoming.message.extendedTextMessage.text.trim();
      const replyTo = incoming.message.extendedTextMessage?.contextInfo?.stanzaId;

      if (replyTo === msg.key.id) {
        switch (selected) {
          case "1":
  reply(
`╔════════════════════════════╗
║    🔧 𝗠𝗔𝗜𝗡 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦     
╚════════════════════════════╝

╭─〔 ⚙️ ᴄᴏᴍᴍᴀɴᴅs 〕─╮
 |  ❣︎ *alive*
 |  ❣︎ *botstatus*
 |  ❣︎ *ping*
 |  ❣︎ *repo*
 |  ❣︎ *update*
╰────────────────────────╯

>⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
  );
  break;
          case "2":
  reply(
`╔════════════════════════════╗
║     🔍 𝗦𝗘𝗔𝗥𝗖𝗛 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦    
╚════════════════════════════╝

╭─〔 🔎 ᴄᴏᴍᴍᴀɴᴅs〕─╮
 | ❣︎ *yts*
 | ❣︎ *image*
╰────────────────────────╯

 >⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
  );
  break;
            
          case "3":
  reply(
`╔════════════════════════════╗
║    📥 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗 𝗠𝗘𝗡𝗨     
╚════════════════════════════╝

╭─〔 ⬇️ ᴄᴏᴍᴍᴀɴᴅs 〕─╮
 |  ❣︎ *apk*
 |  ❣︎ *twitter*
 |  ❣︎ *gdrive*  
 |  ❣︎ *mediafire*  
 |  ❣︎ *fb*  
 |  ❣︎ *play*
 |  ❣︎ *play2* 
 |  ❣︎ *video*   
 |  ❣︎ *video2* 
 |  ❣︎ *yta*  
 |  ❣︎ *tiktok*
┃ ❣︎ *ytmp3*
 |  ❣︎ *ytmp4*
╰────────────────────────╯

 >⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
  );
  break;
          case "4":
  reply(
`╔════════════════════════════╗
║     🎉 𝗙𝗨𝗡 𝗔𝗡𝗗 𝗝𝗢𝗞𝗘𝗦     
╚════════════════════════════╝

╭─〔 🎭 ᴄᴏᴍᴍᴀɴᴅs 〕─╮
 |  ❣︎ *joke* 
 |  ❣︎ *flirt*  
 |  ❣︎ *truth*  
 |  ❣︎ *dare*  
 |  ❣︎ *fact*
 |  ❣︎ *pickupline*
 |  ❣︎ *character*
 |  ❣︎ *repeat*
 |  ❣︎ *spam*
 |  ❣︎ *readmore*
╰────────────────────────╯

 >⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
  );
  break;
          case "5":
  reply(
`╔════════════════════════════╗
║    👑 𝗢𝗪𝗡𝗘𝗥 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦     
╚════════════════════════════╝

╭─〔 🛠 ᴄᴏᴍᴍᴀᴅɴs 〕─╮
 |  ❣︎ *block*
 |  ❣︎ *unblock*
 |  ❣︎ *broadcast*
 |  ❣︎ *shutdown*
 |  ❣︎ *restart*
╰────────────────────────╯

 >⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
  );
  break;
          case "6":
  reply(
`╔════════════════════════════╗
║     👾 𝗔𝗜 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦      
╚════════════════════════════╝

╭─〔 🖥 ᴄᴏᴍᴍᴀɴᴅs 〕─╮
 |  ❣︎ *analyze*
 |  ❣︎ *blackbox*
 |  ❣︎ *dalle*
 |  ❣︎ *gemini*
 |  ❣︎ *generate*
 |  ❣︎ *deepseek*
 |  ❣︎ *deepseekr1*
 |  ❣︎ *doppleai*
 |  ❣︎ *gpt*
 |  ❣︎ *gpt2*
 |  ❣︎ *imagen*
 |  ❣︎ *imagine*
 |  ❣︎ *metaai*
╰────────────────────────╯

 >⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
  );
  break;
         case "7":
    reply(
`╔════════════════════════════╗
║   🔧 𝗧𝗢𝗢𝗟𝗦 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 
╚════════════════════════════╝

╭─〔 🧰 Cᴄᴏᴍᴍᴀɴᴅs 〕
 |  ❣︎ *browse*
 |  ❣︎ *calculate*
 |  ❣︎ *getpp*
 |  ❣︎ *getabout*
 |  ❣︎ *emojimix*
 |  ❣︎ *fliptext*
 |  ❣︎ *gsmarena*
 |  ❣︎ *genpass*
 |  ❣︎ *device*
 |  ❣︎ *bfuscate*
 |  ❣︎ *filtervcf*
 |  ❣︎ *qrcode*
 |  ❣︎ *say*
 |  ❣︎ *ssweb*
 |  ❣︎ *sswebpc*
 |  ❣︎ *sswebtab*
 |  ❣︎ *sticker*
 |  ❣︎ *fancy*
 |  ❣︎ *take*
 |  ❣︎ *tinyurl*
 |  ❣︎ *toimage*
 |  ❣︎ *tourl*
 |  ❣︎ *translate*
 |  ❣︎ *texttopdf*
 |  ❣︎ *vcc*
╰────────────────────────╯


 >⚡ 𝙿𝙾𝚆𝙴𝚁𝙴𝙳 𝙱𝚈 *𝐋𝐎𝐕𝐄𝐋𝐘-〽️𝑫*`
);
  break;
          default:
            reply("❌ Invalid option. Please reply with 1 - 7.");
        }
      }
    });

  } catch (e) {
    console.log(e);
    reply("⚠️ Error: " + e.message);
  }
});
