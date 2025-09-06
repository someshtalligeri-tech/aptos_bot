const { v4: uuidv4 } = require('uuid');

module.exports = function(bot, supabase) {
    bot.command('start', async (ctx) => {
        const nonce = uuidv4();
        const userId = ctx.from.id;
        
        // Store nonce in database
        await supabase
            .from('nonce_signs')
            .insert([{ user_id: userId, nonce, expires_at: new Date(Date.now() + 3600000) }]);

        const connectUrl = `${process.env.HOST}/connect?nonce=${nonce}`;
        ctx.reply('Welcome! Please connect your Pontem Wallet:', {
            reply_markup: {
                inline_keyboard: [[{ text: 'Connect Wallet', url: connectUrl }]]
            }
        });
    });

    bot.command('wallet', async (ctx) => {
        const userId = ctx.from.id;
        
        // Get user's wallet from database
        const { data: user } = await supabase
            .from('users')
            .select('wallet_address')
            .eq('telegram_id', userId)
            .single();

        if (!user?.wallet_address) {
            return ctx.reply('Please connect your wallet first using /start');
        }

        // Get balance from Aptos network
        const balance = '0'; // TODO: Implement getBalance
        ctx.reply(`Wallet: ${user.wallet_address}\nBalance: ${balance} APT`);
    });

    bot.command('mint', async (ctx) => {
        const userId = ctx.from.id;
        
        // Check if user has connected wallet
        const { data: user } = await supabase
            .from('users')
            .select('wallet_address')
            .eq('telegram_id', userId)
            .single();

        if (!user?.wallet_address) {
            return ctx.reply('Please connect your wallet first using /start');
        }

        const nonce = uuidv4();
        await supabase
            .from('nonce_signs')
            .insert([{ user_id: userId, nonce, expires_at: new Date(Date.now() + 3600000) }]);

        const mintUrl = `${process.env.HOST}/mint?nonce=${nonce}`;
        ctx.reply('Click here to mint your NFT:', {
            reply_markup: {
                inline_keyboard: [[{ text: 'Mint NFT', url: mintUrl }]]
            }
        });
    });

    bot.command('market', async (ctx) => {
        // Get marketplace items from database
        const { data: items } = await supabase
            .from('marketplace')
            .select('*')
            .limit(5);

        if (!items?.length) {
            return ctx.reply('No items available in the marketplace');
        }

        const message = items.map(item => 
            `${item.name}\nPrice: ${item.price} APT\nID: ${item.id}`
        ).join('\n\n');

        ctx.reply('Available items in marketplace:\n\n' + message);
    });

    // Placeholder commands
    const placeholderCommands = ['dao', 'stake', 'airdrop', 'waitlist', 'launchpad'];
    placeholderCommands.forEach(cmd => {
        bot.command(cmd, (ctx) => {
            ctx.reply(`${cmd.toUpperCase()} feature coming soon!`);
        });
    });
};
