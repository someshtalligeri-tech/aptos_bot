const express = require('express');
const { Telegraf } = require('telegraf');
require('dotenv').config();

// Create express app
const app = express();

// Initialize bot with all the event handlers
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Add all your bot commands and event handlers here
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

// ... (add all your other bot commands here)

// Webhook endpoint
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Aptos Bot is running!');
});

// Webhook route
app.post('/api/webhook', async (req, res) => {
    try {
        await bot.handleUpdate(req.body);
        res.sendStatus(200);
    } catch (error) {
        console.error('Error in webhook:', error);
        res.sendStatus(500);
    }
});

// Export the Express app
module.exports = app;

// If running locally
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, async () => {
        console.log(`Server is running on port ${PORT}`);
        try {
            const webhookUrl = process.env.VERCEL_URL 
                ? `https://${process.env.VERCEL_URL}/api/webhook`
                : `http://localhost:${PORT}/api/webhook`;
            
            await bot.telegram.setWebhook(webhookUrl);
            console.log('Webhook set to:', webhookUrl);
        } catch (error) {
            console.error('Failed to set webhook:', error);
            // Fallback to polling mode in development
            if (!process.env.VERCEL_URL) {
                console.log('Starting bot in polling mode...');
                await bot.launch();
            }
        }
    });
}
