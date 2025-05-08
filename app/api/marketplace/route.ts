import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'

let cachedData: Record<string, any> = {}

// Get marketplace data from the cache or fetch it if not available
async function getMarketplaceData(query: string) {
  // First check if we have cached data for this query
  if (cachedData[query]) {
    return cachedData[query]
  }

  // Check if we already have data on disk
  const dataDir = path.join(process.cwd(), 'data')
  const dataPath = path.join(dataDir, 'marketplace_data.json')
  
  try {
    // If the data directory or file doesn't exist yet, create empty default data
    if (!fs.existsSync(dataPath)) {
      // Use sample data as fallback
      return getSampleData(query)
    }
    
    // Read and parse the data
    const rawData = fs.readFileSync(dataPath, 'utf-8')
    const data = JSON.parse(rawData)
    
    // Cache the data
    cachedData[query] = data
    
    return data
  } catch (error) {
    console.error('Error fetching marketplace data:', error)
    return getSampleData(query)
  }
}

// Sample marketplace data as fallback
function getSampleData(query: string) {
  // Common categories and their marketplace pricing patterns
  const categories: Record<string, any> = {
    "atta": {
      "marketplaces": [
        {
          "id": "amazon",
          "name": "Amazon",
          "price": 355,
          "link": "https://amazon.in",
          "delivery": "2-3 day delivery"
        },
        {
          "id": "flipkart",
          "name": "Flipkart",
          "price": 370,
          "link": "https://flipkart.com",
          "delivery": "3-4 day delivery"
        },
        {
          "id": "jiomart",
          "name": "JioMart",
          "price": 349,
          "link": "https://jiomart.com",
          "delivery": "1-2 day delivery"
        },
        {
          "id": "bigbasket",
          "name": "BigBasket",
          "price": 365,
          "link": "https://bigbasket.com",
          "delivery": "Next day delivery"
        }
      ]
    },
    "oil": {
      "marketplaces": [
        {
          "id": "amazon",
          "name": "Amazon",
          "price": 220,
          "link": "https://amazon.in",
          "delivery": "2-3 day delivery"
        },
        {
          "id": "flipkart",
          "name": "Flipkart",
          "price": 235,
          "link": "https://flipkart.com",
          "delivery": "3-4 day delivery"
        },
        {
          "id": "jiomart",
          "name": "JioMart",
          "price": 215,
          "link": "https://jiomart.com",
          "delivery": "1-2 day delivery"
        },
        {
          "id": "bigbasket",
          "name": "BigBasket",
          "price": 225,
          "link": "https://bigbasket.com",
          "delivery": "Next day delivery"
        }
      ]
    },
    "salt": {
      "marketplaces": [
        {
          "id": "amazon",
          "name": "Amazon",
          "price": 25,
          "link": "https://amazon.in",
          "delivery": "2-3 day delivery"
        },
        {
          "id": "flipkart",
          "name": "Flipkart",
          "price": 28,
          "link": "https://flipkart.com",
          "delivery": "3-4 day delivery"
        },
        {
          "id": "jiomart",
          "name": "JioMart",
          "price": 24,
          "link": "https://jiomart.com",
          "delivery": "1-2 day delivery"
        },
        {
          "id": "bigbasket",
          "name": "BigBasket",
          "price": 26,
          "link": "https://bigbasket.com",
          "delivery": "Next day delivery"
        }
      ]
    },
    "default": {
      "marketplaces": [
        {
          "id": "amazon",
          "name": "Amazon",
          "price": 345,
          "link": "https://amazon.in",
          "delivery": "2-3 day delivery"
        },
        {
          "id": "flipkart",
          "name": "Flipkart",
          "price": 360,
          "link": "https://flipkart.com",
          "delivery": "3-4 day delivery"
        },
        {
          "id": "jiomart",
          "name": "JioMart",
          "price": 335,
          "link": "https://jiomart.com",
          "delivery": "1-2 day delivery"
        },
        {
          "id": "bigbasket",
          "name": "BigBasket",
          "price": 350,
          "link": "https://bigbasket.com",
          "delivery": "Next day delivery"
        }
      ]
    }
  }
  
  // Determine the category from the query
  let category = 'default'
  if (query.toLowerCase().includes('atta')) {
    category = 'atta'
  } else if (query.toLowerCase().includes('oil')) {
    category = 'oil'
  } else if (query.toLowerCase().includes('salt')) {
    category = 'salt'
  }
  
  return categories[category]
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query') || 'default'
  
  try {
    const data = await getMarketplaceData(query)
    
    // Add a small random variation to prices to simulate live data
    const marketplaces = data.marketplaces.map((item: {
      id: string;
      name: string;
      price: number | string;
      link: string;
      delivery?: string;
      image?: string;
      rating?: number;
    }) => {
      const variation = Math.floor(Math.random() * 10) - 5 // -5 to +5
      return {
        ...item,
        price: typeof item.price === 'number' ? item.price + variation : item.price
      }
    })
    
    return NextResponse.json({ marketplaces })
  } catch (error) {
    console.error('Error in marketplace API:', error)
    return NextResponse.json({ error: 'Failed to fetch marketplace data' }, { status: 500 })
  }
} 