const client = new AptosClient();

document.getElementById('connectBtn').addEventListener('click', async () => {
    const address = await client.connect();
    if (address) {
        const balance = await client.getBalance(address);
        document.getElementById('walletAddress').textContent = address;
        document.getElementById('walletBalance').textContent = balance;
        document.getElementById('walletInfo').style.display = 'block';
        
        // Sign nonce for verification
        const nonce = new URLSearchParams(window.location.search).get('nonce');
        if (nonce) {
            const signature = await client.signMessage(nonce);
            if (signature) {
                // Send to backend for verification
                await fetch(`${window.location.origin}/api/verify`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ address, nonce, signature })
                });
            }
        }
    }
});
