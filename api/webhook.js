const bot = require('./bot');

// Vercel serverless function
module.exports = async (request, response) => {
    try {
        // Set CORS headers
        response.setHeader('Access-Control-Allow-Origin', '*');
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        // Handle OPTIONS request (preflight)
        if (request.method === 'OPTIONS') {
            return response.status(200).end();
        }

        // Handle the Telegram webhook request
        if (request.method === 'POST') {
            const update = request.body;
            if (update) {
                await bot.handleUpdate(update);
                return response.status(200).json({ ok: true });
            }
            return response.status(400).json({ ok: false, error: 'No update provided' });
        }
        
        // Health check endpoint
        if (request.method === 'GET') {
            return response.status(200).json({ 
                status: 'Bot is running!',
                timestamp: new Date().toISOString()
            });
        }
        
        // Handle other methods
        return response.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('Error in webhook handler:', error);
        return response.status(500).json({ 
            error: 'Internal Server Error',
            message: error.message
        });
    }
}
