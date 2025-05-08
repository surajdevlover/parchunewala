const fs = require('fs-extra');
const path = require('path');

// Directory where product data is stored
const DATA_DIR = path.join(__dirname, 'product_data');
const ANALYSIS_DIR = path.join(DATA_DIR, 'analysis');

// Ensure the analysis directory exists
fs.ensureDirSync(ANALYSIS_DIR);

/**
 * Process the product data from the API response format
 * @param {Array} apiResponse - Array of objects from the API response
 * @returns {Object} - Processed product data
 */
function processProductData(apiResponse) {
    if (!Array.isArray(apiResponse)) {
        console.warn('API response is not an array');
        return { products: [] };
    }
    
    const products = [];
    
    // Extract each product from the response array
    for (const item of apiResponse) {
        if (!item.data || !Array.isArray(item.data) || item.data.length === 0) {
            continue;
        }
        
        // Each data array contains product info for a specific store
        for (const product of item.data) {
            if (!product) continue;
            
            // Skip if missing essential info
            if (!product.name || (!product.mrp && !product.offer_price)) {
                continue;
            }
            
            // Extract platform/store info
            const storeName = product.platform && product.platform.name 
                ? product.platform.name 
                : 'Unknown Store';
            
            // Get the price (prefer offer_price if available)
            const price = typeof product.offer_price === 'number' 
                ? product.offer_price 
                : (typeof product.mrp === 'number' ? product.mrp : null);
            
            if (price === null) continue;
            
            products.push({
                name: product.name,
                brand: product.brand || '',
                store: storeName,
                price: price,
                mrp: product.mrp || price,
                quantity: product.quantity || '',
                available: !!product.available
            });
        }
    }
    
    return { products };
}

/**
 * Generate price comparison for products across different stores
 */
async function generatePriceComparison() {
    try {
        console.log('Generating price comparison...');
        
        // Check if any product JSON files exist
        const files = await fs.readdir(DATA_DIR);
        const jsonFiles = files.filter(file => file.endsWith('.json') && 
            file !== 'all_products.json' && 
            file !== 'all_products_flat.json');
        
        if (jsonFiles.length === 0) {
            console.error('No product data files found. Run fetch_products.js first.');
            return;
        }
        
        const priceComparison = {};
        const storeProducts = {};
        
        // Process each product file
        for (const file of jsonFiles) {
            const filePath = path.join(DATA_DIR, file);
            const apiResponse = await fs.readJson(filePath);
            
            // Extract product name from filename
            const productName = file.replace(/\.json$/, '').replace(/_/g, ' ');
            
            // Process the API response format
            const processedData = processProductData(apiResponse);
            
            if (!processedData.products || processedData.products.length === 0) {
                continue;
            }
            
            // Create a record for this product
            priceComparison[productName] = {
                name: productName,
                prices: [],
                lowestPrice: Infinity,
                highestPrice: 0,
                averagePrice: 0,
                stores: {}
            };
            
            // Process each store's offering
            for (const product of processedData.products) {
                // Skip if no store or price information
                if (!product.store || !product.price) continue;
                
                const storeName = product.store;
                const price = parseFloat(product.price);
                
                if (isNaN(price)) continue;
                
                // Initialize store record if not exists
                if (!storeProducts[storeName]) {
                    storeProducts[storeName] = {
                        name: storeName,
                        productCount: 0,
                        lowestPriceCount: 0
                    };
                }
                
                // Track this product for the store
                storeProducts[storeName].productCount++;
                
                // Add price info
                priceComparison[productName].prices.push({
                    store: storeName,
                    price: price,
                    productName: product.name,
                    brand: product.brand,
                    quantity: product.quantity,
                    available: product.available
                });
                
                // Update price ranges
                if (price < priceComparison[productName].lowestPrice) {
                    priceComparison[productName].lowestPrice = price;
                }
                
                if (price > priceComparison[productName].highestPrice) {
                    priceComparison[productName].highestPrice = price;
                }
                
                // Store price for this store
                if (!priceComparison[productName].stores[storeName]) {
                    priceComparison[productName].stores[storeName] = [];
                }
                
                // Add this product variant to the store
                priceComparison[productName].stores[storeName].push({
                    price,
                    productName: product.name,
                    brand: product.brand,
                    quantity: product.quantity,
                    available: product.available
                });
            }
            
            // Calculate average price
            if (priceComparison[productName].prices.length > 0) {
                const sum = priceComparison[productName].prices.reduce((total, item) => total + item.price, 0);
                priceComparison[productName].averagePrice = sum / priceComparison[productName].prices.length;
            }
            
            // Find which store has the lowest price
            if (priceComparison[productName].prices.length > 0) {
                const lowestPrice = priceComparison[productName].lowestPrice;
                for (const priceInfo of priceComparison[productName].prices) {
                    if (priceInfo.price === lowestPrice) {
                        if (storeProducts[priceInfo.store]) {
                            storeProducts[priceInfo.store].lowestPriceCount++;
                        }
                    }
                }
            }
        }
        
        // Save price comparison
        await fs.writeJson(
            path.join(ANALYSIS_DIR, 'price_comparison.json'), 
            priceComparison, 
            { spaces: 4 }
        );
        
        // Save store stats
        await fs.writeJson(
            path.join(ANALYSIS_DIR, 'store_stats.json'), 
            storeProducts, 
            { spaces: 4 }
        );
        
        // Generate summary
        const storeSummary = Object.values(storeProducts)
            .filter(store => store.productCount > 0) // Filter stores with at least one product
            .sort((a, b) => b.lowestPriceCount - a.lowestPriceCount)
            .map(store => ({
                name: store.name,
                productCount: store.productCount,
                lowestPriceCount: store.lowestPriceCount,
                lowestPricePercentage: (store.lowestPriceCount / store.productCount * 100).toFixed(2) + '%'
            }));
        
        await fs.writeJson(
            path.join(ANALYSIS_DIR, 'store_summary.json'), 
            storeSummary, 
            { spaces: 4 }
        );
        
        console.log('Price comparison generated successfully.');
        console.log(`Data saved to: ${ANALYSIS_DIR}`);
    } catch (error) {
        console.error('Error generating price comparison:', error);
    }
}

/**
 * Generate a report of the best stores for different products
 */
async function generateBestStoresReport() {
    try {
        console.log('Generating best stores report...');
        
        // Load the price comparison data
        const pricePath = path.join(ANALYSIS_DIR, 'price_comparison.json');
        if (!await fs.pathExists(pricePath)) {
            console.error('Price comparison data not found. Run price comparison first.');
            return;
        }
        
        const priceData = await fs.readJson(pricePath);
        const bestStores = {};
        
        // Find the best store for each product
        for (const productName in priceData) {
            const product = priceData[productName];
            const lowestPrice = product.lowestPrice;
            
            if (!isFinite(lowestPrice)) continue;
            
            // Find all stores that offer the lowest price
            const bestStoresList = product.prices
                .filter(p => p.price === lowestPrice && p.available)
                .map(p => ({
                    store: p.store,
                    price: p.price,
                    productName: p.productName,
                    quantity: p.quantity,
                    savings: product.highestPrice > 0 ? 
                        ((product.highestPrice - lowestPrice) / product.highestPrice * 100).toFixed(2) + '%' : 
                        'N/A'
                }));
            
            if (bestStoresList.length > 0) {
                bestStores[productName] = {
                    product: productName,
                    lowestPrice,
                    highestPrice: product.highestPrice,
                    averagePrice: product.averagePrice,
                    bestStores: bestStoresList,
                    priceDifference: product.highestPrice - lowestPrice,
                    potentialSavings: ((product.highestPrice - lowestPrice) / product.highestPrice * 100).toFixed(2) + '%'
                };
            }
        }
        
        // Save the best stores report
        await fs.writeJson(
            path.join(ANALYSIS_DIR, 'best_stores.json'), 
            bestStores, 
            { spaces: 4 }
        );
        
        console.log('Best stores report generated successfully.');
    } catch (error) {
        console.error('Error generating best stores report:', error);
    }
}

/**
 * Main function to run all analyses
 */
async function main() {
    try {
        console.log('Starting data analysis...');
        
        // Generate price comparison
        await generatePriceComparison();
        
        // Generate best stores report
        await generateBestStoresReport();
        
        console.log('All analyses completed successfully.');
    } catch (error) {
        console.error('An error occurred during analysis:', error);
    }
}

// Run the main function
main(); 