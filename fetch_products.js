const fs = require('fs-extra');
const fetch = require('node-fetch');
const path = require('path');
const products = require('./product_list');

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

// Get a small subset of products for testing
const productList = [
    "Daawat Basmati Rice",
    "Fortune Everyday Basmati Rice",
    "India Gate Basmati Rice", 
    "Aashirvaad Organic Whole Wheat Atta",
    "Fortune Chakki Fresh Atta"
];

/**
 * Fetch data for a single product
 * @param {string} productName - Name of the product to search
 * @param {Object} location - Location coordinates
 * @returns {Promise<Object>} - Response data
 */
async function fetchProductData(productName, location = DEFAULT_LOCATION) {
    const params = new URLSearchParams({
        lat: location.lat,
        lon: location.lon,
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
        
        return await response.json();
    } catch (error) {
        console.error(`Error fetching data for ${productName}:`, error.message);
        return null;
    }
}

/**
 * Create a sanitized filename from a product name
 * @param {string} productName - Name of the product
 * @returns {string} - Sanitized filename
 */
function createFilename(productName) {
    return productName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '') // Remove leading/trailing underscores
        .substring(0, 100) + '.json'; // Limit length and add extension
}

/**
 * Process a batch of products with delay between requests
 * @param {string[]} products - Array of product names
 * @param {number} batchSize - Number of products to process in one batch
 * @param {number} delayMs - Delay between requests in milliseconds
 */
async function processBatch(productNames, batchSize = 2, delayMs = 3000) {
    for (let i = 0; i < productNames.length; i += batchSize) {
        const batch = productNames.slice(i, i + batchSize);
        
        console.log(`Processing batch ${Math.floor(i/batchSize) + 1} of ${Math.ceil(productNames.length/batchSize)}`);
        
        // Process each product in the batch
        const promises = batch.map(async (productName, index) => {
            // Add delay based on position in batch
            await new Promise(resolve => setTimeout(resolve, index * delayMs));
            
            const data = await fetchProductData(productName);
            
            if (data) {
                const filename = createFilename(productName);
                const filePath = path.join(OUTPUT_DIR, filename);
                
                await fs.writeJson(filePath, data, { spaces: 4 });
                console.log(`Data for "${productName}" written to ${filename}`);
                
                // Find category and save to category directory
                for (const category in products) {
                    if (typeof products[category] === 'function') continue;
                    
                    if (Array.isArray(products[category]) && products[category].includes(productName)) {
                        const categoryDir = path.join(OUTPUT_DIR, category);
                        await fs.ensureDir(categoryDir);
                        
                        const categoryFilePath = path.join(categoryDir, filename);
                        await fs.writeJson(categoryFilePath, data, { spaces: 4 });
                        console.log(`Also saved to category: ${category}`);
                        break; // Assuming each product is in only one category
                    }
                }
            }
        });
        
        // Wait for all products in this batch to complete
        await Promise.all(promises);
        
        // Delay before starting next batch
        if (i + batchSize < productNames.length) {
            console.log(`Waiting ${delayMs}ms before next batch...`);
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }
}

/**
 * Consolidate all product data into a single JSON file
 * @param {string} outputPath - Path to save the consolidated file
 */
async function consolidateResults(outputPath = path.join(OUTPUT_DIR, 'all_products.json')) {
    try {
        console.log('Consolidating all product data into a single file...');
        
        const files = await fs.readdir(OUTPUT_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json') && file !== 'all_products.json' && file !== 'all_products_flat.json');
        
        const allData = {};
        
        for (const file of jsonFiles) {
            const filePath = path.join(OUTPUT_DIR, file);
            const data = await fs.readJson(filePath);
            
            // Extract product name from filename
            const productName = file.replace(/\.json$/, '').replace(/_/g, ' ');
            allData[productName] = data;
        }
        
        await fs.writeJson(outputPath, allData, { spaces: 4 });
        console.log(`Consolidated data saved to: ${outputPath}`);
        
        // Save flat version as well
        const flatOutputPath = path.join(OUTPUT_DIR, 'all_products_flat.json');
        await fs.writeJson(flatOutputPath, allData, { spaces: 4 });
        console.log(`Flat version saved to: ${flatOutputPath}`);
    } catch (error) {
        console.error('Error consolidating results:', error);
    }
}

// Main function to start the process
async function main() {
    try {
        console.log(`Starting to fetch data for ${productList.length} products...`);
        console.log(`Data will be saved to: ${OUTPUT_DIR}`);
        
        // Process in batches to avoid overwhelming the API
        await processBatch(productList, 2, 3000);
        
        // Consolidate all results into a single file
        await consolidateResults();
        
        console.log('All done! Product data has been saved.');
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the main function
main(); 