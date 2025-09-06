const bot = require('./bot');

// Vercel serverless function
module.exports = async (request, response) => {
    try {
        // Handle the Telegram webhook request
        if (request.method === 'POST') {
            await bot.handleUpdate(request.body, response);
            return response.status(200).send('OK');
        }
        
        // Health check endpoint
        if (request.method === 'GET') {
            return response.status(200).send('Bot is running!');
        }
        
        // Handle other methods
        return response.status(405).send('Method not allowed');
    } catch (error) {
        console.error('Error in webhook handler:', error);
        return response.status(500).send('Internal Server Error');
    }
}
