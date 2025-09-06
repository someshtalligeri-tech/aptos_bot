const client = new AptosClient();
const form = document.getElementById('mintForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        // First connect wallet if not connected
        const address = await client.connect();
        if (!address) return;

        const formData = new FormData();
        formData.append('name', document.getElementById('name').value);
        formData.append('description', document.getElementById('description').value);
        formData.append('file', document.getElementById('file').files[0]);

        // Upload to IPFS/Pinata first
        const response = await fetch(`${window.location.origin}/api/upload`, {
            method: 'POST',
            body: formData
        });
        const { ipfsHash } = await response.json();

        // Mint NFT with IPFS metadata
        const metadata = {
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            image: `ipfs://${ipfsHash}`
        };

        const mintResult = await client.mintNFT(metadata);
        
        status.textContent = 'NFT minted successfully!';
        status.className = 'success';
        status.style.display = 'block';
    } catch (error) {
        status.textContent = 'Error minting NFT: ' + error.message;
        status.className = 'error';
        status.style.display = 'block';
    }
});
