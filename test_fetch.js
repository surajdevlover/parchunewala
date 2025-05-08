const fs = require('fs-extra');
const fetch = require('node-fetch');
const path = require('path');

// Create a directory to store the JSON files
const OUTPUT_DIR = path.join(__dirname, 'product_data');
fs.ensureDirSync(OUTPUT_DIR);

// Default location coordinates (can be changed)
const DEFAULT_LOCATION = {
    lat: '27.1590313',
    lon: '77.99060589999999'
};

// Headers for the API request
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

/**
 * Fetch data for a single product
 */
async function testFetch() {
    const productName = "Daawat Basmati Rice";
    const params = new URLSearchParams({
        lat: DEFAULT_LOCATION.lat,
        lon: DEFAULT_LOCATION.lon,
        type: 'groupsearch',
        query: productName,
    });

    const url = `https://qp94doiea4.execute-api.ap-south-1.amazonaws.com/default/qc?${params}`;
    
    try {
        console.log(`Fetching data for: ${productName}`);
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Data received:", JSON.stringify(data, null, 2).substring(0, 500) + "...");
        
        // Save the data to a file
        const filePath = path.join(OUTPUT_DIR, 'test_result.json');
        await fs.writeJson(filePath, data, { spaces: 4 });
        console.log(`Data saved to: ${filePath}`);
        
        return data;
    } catch (error) {
        console.error(`Error fetching data:`, error);
        return null;
    }
}

// Run the test function
testFetch().then(() => {
    console.log("Test completed");
}).catch(err => {
    console.error("Test failed:", err);
}); 