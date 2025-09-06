# Aptos Telegram Bot

A simple Telegram bot that provides information about Aptos blockchain and Pontem wallet.

## Features

- Information about Aptos blockchain
- Pontem wallet details and guidance
- Current APT price check
- Aptos ecosystem overview
- Network information (Mainnet, Testnet, Devnet)
- Useful resources and links

## Available Commands

- `/start` - Welcome message and command list
- `/info` - Learn about Aptos blockchain
- `/wallet` - Pontem wallet information
- `/price` - Check current APT price
- `/ecosystem` - Explore Aptos ecosystem
- `/networks` - Get network details
- `/resources` - Find useful links
- `/help` - Show all commands

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and add your Telegram bot token:
   ```bash
   cp .env.example .env
   ```

4. Start the bot:
   ```bash
   npm start
   ```

   For development with auto-reload:
   ```bash
   npm run dev
   ```

## Dependencies

- `telegraf` - Modern Telegram Bot framework
- `@aptos-labs/ts-sdk` - Aptos blockchain SDK
- `dotenv` - Environment variable management

## License

MIT
