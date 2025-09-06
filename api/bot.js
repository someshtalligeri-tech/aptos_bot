const { Telegraf } = require('telegraf');
require('dotenv').config();

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Add all your bot commands here
bot.command('start', (ctx) => {
    ctx.reply(`Welcome to Aptos Gaming & Info Bot! 🎮🚀

Available commands:

🎮 Gaming:
/tournaments - View all gaming tournaments
/event <id> - View specific event details
/register <id> - Register for an event

🎟 Events & Conferences:
/events - View Aptos blockchain events
/eventinfo <id> - View specific event details
/attend <id> - Register for blockchain event

ℹ️ Information:
/info - Learn about Aptos blockchain
/wallet - Pontem wallet info
/price - Current APT price
/ecosystem - Aptos ecosystem info
/networks - Aptos network details
/resources - Useful links
/help - Show this menu`);
});

// Add all your other bot commands here...

// Export the bot instance
module.exports = bot;
