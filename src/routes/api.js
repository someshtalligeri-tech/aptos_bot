const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

module.exports = function(app, supabase, aptosClient) {
    // Verify wallet connection
    app.post('/api/verify', async (req, res) => {
        try {
            const { address, nonce, signature } = req.body;
            
            // Verify signature (simplified - implement actual verification)
            // TODO: Implement actual signature verification with Pontem
            
            // Get nonce from database
            const { data: nonceData } = await supabase
                .from('nonce_signs')
                .select('*')
                .eq('nonce', nonce)
                .single();

            if (!nonceData) {
                return res.status(400).json({ error: 'Invalid nonce' });
            }

            // Store or update user's wallet
            await supabase
                .from('users')
                .upsert([{
                    telegram_id: nonceData.user_id,
                    wallet_address: address
                }]);

            // Delete used nonce
            await supabase
                .from('nonce_signs')
                .delete()
                .eq('nonce', nonce);

            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get wallet balance
    app.get('/api/balance/:address', async (req, res) => {
        try {
            const { address } = req.params;
            // TODO: Implement balance check with Aptos SDK
            const balance = '0';
            res.json({ balance });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Upload file to IPFS/Pinata
    app.post('/api/upload', upload.single('file'), async (req, res) => {
        try {
            // TODO: Implement actual IPFS/Pinata upload
            const ipfsHash = 'dummy_hash';
            res.json({ ipfsHash });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Mint NFT
    app.post('/api/mint', async (req, res) => {
        try {
            const metadata = req.body;
            // TODO: Implement actual minting with Aptos SDK
            res.json({ success: true, tokenId: 'dummy_token_id' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

    // Get marketplace items
    app.get('/api/market', async (req, res) => {
        try {
            const { data: items } = await supabase
                .from('marketplace')
                .select('*');
            res.json(items);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
