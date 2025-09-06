class AptosClient {
    constructor() {
        // Check if Pontem Wallet is available
        this.checkWallet();
    }

    checkWallet() {
        if (!window.pontem) {
            alert('Please install Pontem Wallet extension');
            return false;
        }
        return true;
    }

    async connect() {
        try {
            if (!this.checkWallet()) return null;
            
            const response = await window.pontem.connect();
            return response.address;
        } catch (error) {
            console.error('Connection error:', error);
            return null;
        }
    }

    async getBalance(address) {
        try {
            const response = await fetch(`${window.location.origin}/api/balance/${address}`);
            const data = await response.json();
            return data.balance;
        } catch (error) {
            console.error('Balance fetch error:', error);
            return '0';
        }
    }

    async signMessage(message) {
        try {
            if (!this.checkWallet()) return null;
            
            const signedMessage = await window.pontem.signMessage({
                message,
                nonce: new Date().getTime().toString()
            });
            return signedMessage;
        } catch (error) {
            console.error('Signing error:', error);
            return null;
        }
    }

    async mintNFT(metadata) {
        try {
            const response = await fetch(`${window.location.origin}/api/mint`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(metadata)
            });
            return await response.json();
        } catch (error) {
            console.error('Minting error:', error);
            throw error;
        }
    }
}
