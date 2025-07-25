
const { cmd } = require("../command");
const { fetchJson } = require("../lib/functions");

// Dare command
cmd({
    pattern: "dare",
    desc: "Get a random dare",
    category: "fun",
    react: "😈",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const dares = [
            "Text your crush and tell them how you feel",
            "Call a random number and sing 'Happy Birthday'",
            "Post an embarrassing photo on your story",
            "Eat a spoonful of hot sauce",
            "Do 20 push-ups right now",
            "Send a voice note singing your favorite song",
            "Dance for 1 minute without music",
            "Tell everyone your most embarrassing moment"
        ];
        
        const randomDare = dares[Math.floor(Math.random() * dares.length)];
        
        reply(`😈 *DARE*\n\n${randomDare}\n\n> 🤖 *LOVELY-MD Fun*`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Fact command
cmd({
    pattern: "fact",
    desc: "Get a random fact",
    category: "fun",
    react: "🧠",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const facts = [
            "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still edible.",
            "A group of flamingos is called a 'flamboyance'.",
            "Octopuses have three hearts and blue blood.",
            "Bananas are berries, but strawberries aren't.",
            "A day on Venus is longer than a year on Venus.",
            "Wombat poop is cube-shaped.",
            "There are more possible games of chess than atoms in the observable universe.",
            "Dolphins have names for each other."
        ];
        
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        reply(`🧠 *RANDOM FACT*\n\n${randomFact}\n\n> 🤖 *LOVELY-MD Fun*`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Jokes command
cmd({
    pattern: "joke",
    alias: ["jokes"],
    desc: "Get a random joke",
    category: "fun",
    react: "😂",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const jokes = [
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? He was outstanding in his field!",
            "Why don't eggs tell jokes? They'd crack each other up!",
            "What do you call a fake noodle? An impasta!",
            "Why did the coffee file a police report? It got mugged!",
            "What do you call a bear with no teeth? A gummy bear!",
            "Why don't skeletons fight each other? They don't have the guts!",
            "What do you call a sleeping bull? A bulldozer!"
        ];
        
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        
        reply(`😂 *RANDOM JOKE*\n\n${randomJoke}\n\n> 🤖 *LOVELY-MD Fun*`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Memes command
cmd({
    pattern: "meme",
    alias: ["memes"],
    desc: "Get a random meme",
    category: "fun",
    react: "😆",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        reply("😆 Fetching a meme for you... Please wait...");
        
        const response = await fetchJson('https://api.imgflip.com/get_memes');
        
        if (response && response.data && response.data.memes) {
            const memes = response.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            
            await robin.sendMessage(from, {
                image: { url: randomMeme.url },
                caption: `😆 *Random Meme*\n\n📝 *Name:* ${randomMeme.name}\n\n> 🤖 *LOVELY-MD Fun*`
            }, { quoted: mek });
        } else {
            reply("❌ Failed to fetch meme. Try again later!");
        }
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Quotes command
cmd({
    pattern: "quote",
    alias: ["quotes"],
    desc: "Get a random quote",
    category: "fun",
    react: "💭",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "Life is what happens to you while you're busy making other plans. - John Lennon",
            "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
            "It is during our darkest moments that we must focus to see the light. - Aristotle",
            "The only impossible journey is the one you never begin. - Tony Robbins",
            "In the end, we will remember not the words of our enemies, but the silence of our friends. - Martin Luther King Jr.",
            "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
            "The way to get started is to quit talking and begin doing. - Walt Disney"
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        reply(`💭 *INSPIRATIONAL QUOTE*\n\n${randomQuote}\n\n> 🤖 *LOVELY-MD Fun*`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});

// Truth command
cmd({
    pattern: "truth",
    desc: "Get a random truth question",
    category: "fun",
    react: "🤔",
    filename: __filename
}, async (robin, mek, m, { from, reply }) => {
    try {
        const truths = [
            "What's the most embarrassing thing you've ever done?",
            "Have you ever lied to your best friend?",
            "What's your biggest fear?",
            "What's the worst thing you've ever said to someone?",
            "Have you ever had a crush on a teacher?",
            "What's your most embarrassing childhood memory?",
            "Have you ever cheated on a test?",
            "What's the biggest lie you've ever told?"
        ];
        
        const randomTruth = truths[Math.floor(Math.random() * truths.length)];
        
        reply(`🤔 *TRUTH*\n\n${randomTruth}\n\n> 🤖 *LOVELY-MD Fun*`);
    } catch (e) {
        reply(`❌ Error: ${e.message}`);
    }
});
