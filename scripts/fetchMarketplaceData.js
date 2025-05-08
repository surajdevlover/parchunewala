const fs = require('fs');
const fetch = require('node-fetch'); // Use Node.js v18+ or install this package
const path = require('path');

async function fetchMarketplaceData(productQuery = 'Aashirvaad Atta') {
    const headers = {
        'accept': '*/*',
        'accept-language': 'en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
        'origin': 'https://quickcompare.in',
        'priority': 'u=1, i',
        'referer': 'https://quickcompare.in/',
        'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    };

    const params = new URLSearchParams({
        lat: '27.1590313',
        lon: '77.99060589999999',
        type: 'groupsearch',
        query: productQuery,
    });

    try {
        const response = await fetch(`https://qp94doiea4.execute-api.ap-south-1.amazonaws.com/default/qc?${params}`, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Ensure directory exists
        const dataDir = path.join(__dirname, '..', 'data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }
        
        // Save data to file
        const filePath = path.join(dataDir, 'marketplace_data.json');
        fs.writeFileSync(filePath, JSON.stringify(data, null, 4));
        console.log(`Data for "${productQuery}" written to ${filePath}`);
        
        return data;
    } catch (error) {
        console.error('Error fetching marketplace data:', error);
        return null;
    }
}

// Run the function with a few example product queries
(async () => {
    await fetchMarketplaceData('Aashirvaad Atta');
    await fetchMarketplaceData('Fortune Oil');
    await fetchMarketplaceData('Tata Salt');
})(); 