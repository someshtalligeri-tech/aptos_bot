const express = require('express');
const { Telegraf } = require('telegraf');
require('dotenv').config();

// Create express app
const app = express();

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

// Your existing bot code here...
// (All the command handlers and event definitions remain the same)

// Webhook endpoint
app.use(express.json());
app.post(`/webhook/${process.env.TELEGRAM_BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body, res);
});

// Health check endpoint
app.get('/', (req, res) => {
    res.send('Bot is running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Set webhook
    const VERCEL_URL = process.env.VERCEL_URL;
    if (VERCEL_URL) {
        bot.telegram.setWebhook(`https://${VERCEL_URL}/webhook/${process.env.TELEGRAM_BOT_TOKEN}`)
            .then(() => {
                console.log('Webhook set successfully!');
            })
            .catch(console.error);
    } else {
        console.log('VERCEL_URL not found, running in polling mode');
        bot.launch().catch(console.error);
    }
});
