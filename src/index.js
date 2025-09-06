require('dotenv').config();
const { Telegraf } = require('telegraf');

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Common responses
const APTOS_INFO = `🚀 Welcome to Aptos - The Next Generation Layer 1 Blockchain!

📌 Core Features:
• 100,000+ TPS with sub-second finality
• Move language for maximum security
• Parallel transaction execution (Block-STM)
• Advanced cryptographic primitives
• BFT consensus mechanism

🎓 Learning Resources:
• Aptos Whitepaper: https://aptos.dev/assets/files/whitepaper.pdf
• Official Documentation: https://aptos.dev
• Move Language Book: https://move-book.com

🎥 Must-Watch Videos:
• Aptos Overview: https://www.youtube.com/watch?v=6M5sRUhm0Hw
• Deep Dive into Move: https://www.youtube.com/watch?v=J6cKlOQwIi0
• Blockchain Architecture: https://www.youtube.com/watch?v=TZPJSxB_qRg

💡 Latest Updates:
• Follow on Twitter: @Aptos_Network
• Join Discord: https://discord.gg/aptoslabs
• Read Blog: https://aptoslabs.com/blog`;

const PONTEM_INFO = `🔐 Pontem Wallet - Your Gateway to Aptos Ecosystem

✨ Key Features:
• Secure HD Wallet with Multi-Account Support
• NFT Gallery & Token Management
• DApp Browser Integration
• Hardware Wallet Support
• Cross-Chain Bridge Support

🛠 Getting Started:
1. Install: https://pontem.network/wallet
2. Create/Import Wallet
3. Get APT tokens
4. Start exploring DApps!

📱 Platform Support:
• Chrome Extension
• Mobile Apps (Coming Soon)
• Web Version Beta

🔍 Security Features:
• Encrypted Key Storage
• Biometric Authentication
• Transaction Simulation
• Phishing Protection

🎥 Tutorial Videos:
• Wallet Setup: https://www.youtube.com/watch?v=H_GQHesi6Oc
• NFT Guide: https://www.youtube.com/watch?v=5Rc5rnD9y5M
• DApp Connection: https://www.youtube.com/watch?v=xH5KCFNxgEU

💬 Support & Community:
• Telegram: @PontemWallet
• Discord: https://discord.gg/44QgPFHYqs
• Twitter: @PontemNetwork`;

const ECOSYSTEM_INFO = `🌐 Aptos Ecosystem Overview

🏦 DeFi Protocols:
• PancakeSwap - Leading DEX
• Liquidswap - AMM Protocol
• Aries Markets - Lending Platform
• Thala Labs - Stablecoin Protocol

🎮 Gaming & NFTs:
• Aptos Monkeys
• Pontem Space
• TopazNFT Marketplace
• Souffl3 NFT Platform

🔄 Cross-Chain:
• LayerZero Bridge
• Wormhole
• Celer Network
• Stargate Finance

🛠 Developer Tools:
• Aptos CLI
• Move Playground
• VS Code Extension
• SDK Documentation

Learn more: https://aptoslabs.com/ecosystem`;

const NETWORKS_INFO = `🌍 Aptos Networks & Infrastructure

🟢 Mainnet
• RPC: https://fullnode.mainnet.aptoslabs.com/v1
• Chain ID: 1
• Explorer: https://explorer.aptoslabs.com
• Status: https://status.aptoslabs.com

🟡 Testnet
• RPC: https://testnet.aptoslabs.com/v1
• Faucet: https://aptoslabs.com/testnet-faucet
• Explorer: https://explorer.aptoslabs.com/?network=testnet
• Docs: https://aptos.dev/nodes/testnet-nodes

🔵 Devnet
• RPC: https://fullnode.devnet.aptoslabs.com/v1
• Faucet: https://aptoslabs.com/devnet-faucet
• Purpose: Testing & Development

⚙️ Node Operation:
• Run a Node: https://aptos.dev/nodes/validator-node/run-validator-node-using-docker
• Validator Guide: https://aptos.dev/nodes/validator-node/operator/node-requirements
• Node Health: https://aptos.dev/nodes/measure/node-health-checker`;

const RESOURCES_INFO = `📚 Comprehensive Aptos Resources

👨‍💻 Development:
• Getting Started: https://aptos.dev/guides/getting-started
• Move Tutorial: https://aptos.dev/guides/move-guides/move-tutorial
• SDK Reference: https://aptos.dev/sdks/ts-sdk/
• Smart Contract Examples: https://github.com/aptos-labs/aptos-core/tree/main/aptos-move/move-examples

📖 Documentation:
• Technical Papers: https://aptos.dev/reference/papers
• API References: https://aptos.dev/nodes/aptos-api-spec
• CLI Documentation: https://aptos.dev/tools/aptos-cli

🎯 Community & Support:
• Developer Discord: https://discord.gg/aptoslabs
• Technical Forum: https://forum.aptoslabs.com
• GitHub: https://github.com/aptos-labs
• Stack Overflow: https://stackoverflow.com/questions/tagged/aptos

🎓 Learning Resources:
• Move Book: https://move-book.com
• Aptos Academy: https://petra.app/learn
• YouTube Channel: https://www.youtube.com/@Aptos-Labs
• Monthly Updates: https://medium.com/aptoslabs`;

// Blockchain Events Data
const BLOCKCHAIN_EVENTS = [
    {
        id: "b1",
        name: "🌟 Aptos Global Summit 2025",
        date: "October 5-7, 2025",
        location: "Singapore",
        type: "Conference",
        entry: "From 500 USD",
        description: "The largest Aptos ecosystem conference featuring keynotes, workshops, and networking.",
        speakers: ["Mo Shaikh", "Avery Ching", "Leading Developers"],
        website: "https://aptossummit.com",
        status: "EARLY BIRD"
    },
    {
        id: "b2",
        name: "🔧 Aptos Hacker House London",
        date: "September 25-26, 2025",
        location: "London, UK",
        type: "Hackathon",
        entry: "Free",
        description: "48-hour hackathon with $100K in prizes. Build the future of Aptos.",
        prizes: "100,000 USD in APT tokens",
        website: "https://aptos.dev/events/hackathon",
        status: "REGISTERING"
    },
    {
        id: "b3",
        name: "📚 Move Language Conference",
        date: "November 1-2, 2025",
        location: "San Francisco, USA",
        type: "Developer Conference",
        entry: "200 USD",
        description: "Deep dive into Move language with core developers and ecosystem projects.",
        speakers: ["Move Core Team", "Aptos Engineers"],
        website: "https://move-conference.com",
        status: "COMING SOON"
    },
    {
        id: "b4",
        name: "🎓 Aptos Developer Workshop",
        date: "Weekly Online",
        location: "Virtual",
        type: "Workshop",
        entry: "Free",
        description: "Weekly workshops covering Aptos development, Move programming, and best practices.",
        schedule: "Every Wednesday",
        website: "https://aptos.dev/workshops",
        status: "ONGOING"
    },
    {
        id: "b5",
        name: "💫 Aptos DeFi Summit",
        date: "December 10-11, 2025",
        location: "Dubai, UAE",
        type: "Industry Conference",
        entry: "300 USD",
        description: "Focus on DeFi innovations, liquid staking, and financial primitives on Aptos.",
        topics: ["DeFi", "Trading", "Liquidity"],
        website: "https://aptosdefi.com",
        status: "ANNOUNCED"
    }
];

// Gaming Events Data
const GAMING_EVENTS = [
    {
        id: 1,
        name: "🏆 Aptos Legends Championship",
        date: "September 15-20, 2025",
        prizePool: "100,000 APT",
        entry: "5 APT",
        game: "Aptos Legends",
        description: "The biggest Aptos gaming tournament of the year! Battle royale with NFT rewards.",
        slots: "500/1000 filled",
        status: "REGISTERING"
    },
    {
        id: 2,
        name: "🎮 CryptoClash Masters",
        date: "September 25, 2025",
        prizePool: "50,000 APT",
        entry: "2 APT",
        game: "CryptoClash",
        description: "Strategic PvP battles with exclusive in-game assets.",
        slots: "200/250 filled",
        status: "ALMOST FULL"
    },
    {
        id: 3,
        name: "⚔️ Move Warriors League",
        date: "October 1-3, 2025",
        prizePool: "75,000 APT",
        entry: "3 APT",
        game: "Move Warriors",
        description: "Team-based combat with smart contract integration.",
        slots: "32/64 teams",
        status: "REGISTERING"
    },
    {
        id: 4,
        name: "🏁 AptosKart Racing Cup",
        date: "October 10, 2025",
        prizePool: "25,000 APT",
        entry: "1 APT",
        game: "AptosKart",
        description: "High-speed racing with NFT vehicles and tracks.",
        slots: "1000/1000 filled",
        status: "FULL"
    },
    {
        id: 5,
        name: "🎲 CryptoQuest RPG Tournament",
        date: "October 15-20, 2025",
        prizePool: "150,000 APT",
        entry: "10 APT",
        game: "CryptoQuest",
        description: "Massive multiplayer RPG event with blockchain items.",
        slots: "100/1000 filled",
        status: "EARLY BIRD"
    }
];

// Bot commands
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

bot.command('info', (ctx) => {
    ctx.reply(APTOS_INFO);
});

bot.command('wallet', (ctx) => {
    ctx.reply(PONTEM_INFO + '\n\nDownload Pontem Wallet: https://pontem.network/wallet');
});

bot.command('price', async (ctx) => {
    try {
        ctx.reply(`💰 Aptos (APT) Price Information

📊 Live Price Trackers:
• CoinGecko: https://www.coingecko.com/en/coins/aptos
• CoinMarketCap: https://coinmarketcap.com/currencies/aptos/
• Binance: https://www.binance.com/en/price/aptos

📈 Trading View Charts:
• Advanced Charts: https://www.tradingview.com/symbols/APTUSDT/

🔄 DEX Prices:
• PancakeSwap: https://pancakeswap.finance/swap?outputCurrency=APT
• Liquidswap: https://liquidswap.com/

📱 Price Alert Tools:
• Binance Price Alerts
• CoinGecko Portfolio Tracking
• TradingView Alerts

💡 Tips: Always check multiple sources and set up price alerts for better trading decisions!`);
    } catch (error) {
        ctx.reply('Error fetching price information. Please try again later.');
    }
});

bot.command('ecosystem', (ctx) => {
    ctx.reply(ECOSYSTEM_INFO);
});

bot.command('networks', (ctx) => {
    ctx.reply(NETWORKS_INFO);
});

bot.command('resources', (ctx) => {
    ctx.reply(RESOURCES_INFO);
});

bot.command('help', (ctx) => {
    ctx.reply(`Available Commands:

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
/wallet - Pontem wallet information
/price - Check current APT price
/ecosystem - Explore Aptos ecosystem
/networks - Get network details
/resources - Find useful links
/help - Show this menu

For any questions about events, gaming, or Aptos blockchain, just ask! 😊`);
});

// Tournament Commands
bot.command('tournaments', (ctx) => {
    const eventList = GAMING_EVENTS.map(event => {
        return `${event.name}
🎯 ID: ${event.id}
📅 ${event.date}
💰 Prize Pool: ${event.prizePool}
🎫 Entry: ${event.entry}
👥 ${event.slots}
🔹 Status: ${event.status}
──────────────`;
    }).join('\n\n');

    ctx.reply(`🎮 Available Gaming Tournaments 🎮\n\n${eventList}\n\nTo view details: /event <id>\nTo register: /register <id>`);
});

bot.command('event', (ctx) => {
    const eventId = parseInt(ctx.message.text.split(' ')[1]);
    const event = GAMING_EVENTS.find(e => e.id === eventId);

    if (!event) {
        return ctx.reply('❌ Event not found. Use /tournaments to see available events.');
    }

    ctx.reply(`🎮 ${event.name}

📅 Date: ${event.date}
🎯 Game: ${event.game}
💰 Prize Pool: ${event.prizePool}
🎫 Entry Fee: ${event.entry}
👥 Slots: ${event.slots}
🔹 Status: ${event.status}

📝 Description:
${event.description}

To register for this event: /register ${event.id}`);
});

bot.command('register', async (ctx) => {
    const eventId = parseInt(ctx.message.text.split(' ')[1]);
    const event = GAMING_EVENTS.find(e => e.id === eventId);

    if (!event) {
        return ctx.reply('❌ Event not found. Use /tournaments to see available events.');
    }

    if (event.status === 'FULL') {
        return ctx.reply('❌ Sorry, this event is already full!');
    }

    // Simulating wallet check and registration process
    ctx.reply(`🎮 Registration Process for "${event.name}":

1️⃣ Entry fee: ${event.entry}
2️⃣ Connect your Pontem Wallet
3️⃣ Sign the registration transaction
4️⃣ Confirm payment

To proceed with registration, you'll need:
- Pontem Wallet installed
- Sufficient APT balance (${event.entry} + gas fees)

For actual registration, this would integrate with:
- Wallet connection
- Smart contract interaction
- Payment processing

This is a demo - no actual registration will occur.`);
});

// Blockchain Events Commands
bot.command('events', (ctx) => {
    const eventList = BLOCKCHAIN_EVENTS.map(event => {
        return `${event.name}
🎯 ID: ${event.id}
📅 ${event.date}
📍 ${event.location}
🎟 Entry: ${event.entry}
🔹 Status: ${event.status}
──────────────`;
    }).join('\n\n');

    ctx.reply(`🌟 Upcoming Aptos Blockchain Events 🌟\n\n${eventList}\n\nTo view details: /eventinfo <id>\nTo register: /attend <id>`);
});

bot.command('eventinfo', (ctx) => {
    const eventId = ctx.message.text.split(' ')[1];
    const event = BLOCKCHAIN_EVENTS.find(e => e.id === eventId);

    if (!event) {
        return ctx.reply('❌ Event not found. Use /events to see available events.');
    }

    let details = `🌟 ${event.name}\n\n`;
    details += `📅 Date: ${event.date}\n`;
    details += `📍 Location: ${event.location}\n`;
    details += `🎟 Entry: ${event.entry}\n`;
    details += `🔹 Status: ${event.status}\n`;
    details += `🔍 Type: ${event.type}\n\n`;
    details += `📝 Description:\n${event.description}\n\n`;
    
    if (event.speakers) {
        details += `👥 Speakers: ${event.speakers.join(', ')}\n`;
    }
    if (event.prizes) {
        details += `🏆 Prizes: ${event.prizes}\n`;
    }
    if (event.topics) {
        details += `📋 Topics: ${event.topics.join(', ')}\n`;
    }
    details += `\n🌐 Website: ${event.website}\n`;
    details += `\nTo register for this event: /attend ${event.id}`;

    ctx.reply(details);
});

bot.command('attend', async (ctx) => {
    const eventId = ctx.message.text.split(' ')[1];
    const event = BLOCKCHAIN_EVENTS.find(e => e.id === eventId);

    if (!event) {
        return ctx.reply('❌ Event not found. Use /events to see available events.');
    }

    ctx.reply(`🎟 Registration Process for "${event.name}":

1️⃣ Event Details:
• Date: ${event.date}
• Location: ${event.location}
• Entry Fee: ${event.entry}

2️⃣ Next Steps:
• Visit: ${event.website}
• Complete registration form
• Receive confirmation email
• Join event community

📧 You'll receive:
• Event updates
• Speaker announcements
• Networking opportunities
• Schedule details

For questions or support:
• Email: support@aptoslabs.com
• Discord: https://discord.gg/aptoslabs`);
});

// Handle regular messages
bot.on('text', (ctx) => {
    const message = ctx.message.text.toLowerCase();
    
    if (message.includes('tournament') || message.includes('events')) {
        bot.command('tournaments').invoke(ctx);
    } else if (message.includes('aptos') && message.includes('what')) {
        ctx.reply(APTOS_INFO);
    } else if (message.includes('wallet') || message.includes('pontem')) {
        ctx.reply(PONTEM_INFO);
    } else if (message.includes('help')) {
        ctx.reply('Type /help to see all available commands!');
    } else if (message.includes('register') || message.includes('join')) {
        ctx.reply('To register for a tournament, use /tournaments to see available events, then use /register <event_id> to sign up!');
    } else {
        ctx.reply('I can help you with Aptos gaming tournaments, blockchain info, and wallet details. Type /help to see what I can do!');
    }
});

// Start the bot
bot.launch().then(() => {
    console.log('Aptos Info Bot is running!');
}).catch((err) => {
    console.error('Bot launch error:', err);
});
