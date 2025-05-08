import { useState, useEffect } from 'react'
import { Check, Plus, Star, ExternalLink, ArrowRight, ShoppingBag, ArrowUp } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface MarketplaceData {
  id: string
  name: string
  logo: string
  price: string
  link: string
  delivery: string
  rating?: number
  condition?: string
}

interface MarketplaceComparisonProps {
  productQuery: string
  ownStorePrice: string // Your store's price
  ownStoreId: string
  onUpdatePrice?: (newPrice: string) => void
}

export function MarketplaceComparison({ 
  productQuery, 
  ownStorePrice,
  ownStoreId,
  onUpdatePrice 
}: MarketplaceComparisonProps) {
  const [marketplaceData, setMarketplaceData] = useState<MarketplaceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAllStores, setShowAllStores] = useState(false)
  const [priceUpdated, setPriceUpdated] = useState(false)
  const [imageLoaded, setImageLoaded] = useState<Record<string, boolean>>({})
  const [error, setError] = useState<string | null>(null)
  
  // Calculate the numeric price from string format (₹123)
  const getNumericPrice = (price: string) => {
    return parseFloat(price.replace('₹', '').replace(',', ''))
  }
  
  const ownPrice = getNumericPrice(ownStorePrice)
  
  useEffect(() => {
    // Reset price updated flag when ownStorePrice changes
    setPriceUpdated(false)
    setError(null)
    
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/marketplace?query=${encodeURIComponent(productQuery)}`)
        if (!response.ok) {
          // Set error state instead of throwing an error
          setError('Failed to fetch marketplace data')
          // Use fallback data below instead of stopping execution
        } else {
          const data = await response.json()
          
          // Format the data for display
          const formattedData = data.marketplaces.map((item: { 
            id?: string;
            name: string;
            logo?: string;
            price: number | string;
            link: string;
            delivery?: string;
            rating?: number;
            condition?: string;
          }) => ({
            id: item.id || Math.random().toString(36).substring(2, 9),
            name: item.name,
            logo: item.logo || `/marketplace/${item.name.toLowerCase().replace(/\s+/g, '-')}.svg`,
            price: `₹${item.price}`,
            link: item.link,
            delivery: item.delivery || 'Standard Delivery',
            rating: item.rating,
            condition: item.condition || 'New'
          }))
          
          setMarketplaceData(formattedData)
          
          // Check if our price is competitive and update if needed
          const lowestCompetitorPrice = Math.min(
            ...formattedData.map((item: MarketplaceData) => getNumericPrice(item.price))
          )
          
          // Always ensure our price is at least 5% lower than the lowest competitor
          if (lowestCompetitorPrice <= ownPrice && onUpdatePrice) {
            // Set our price 5% less than the lowest competitor
            const newPrice = Math.round(lowestCompetitorPrice * 0.95)
            onUpdatePrice(`₹${newPrice}`)
            setPriceUpdated(true)
          }
          
          return // Early return if data was fetched successfully
        }
      } catch (error) {
        console.error('Error fetching marketplace data:', error)
        setError(error instanceof Error ? error.message : 'An error occurred')
      }
      
      // Use sample data for fallback (runs if there was an error or response was not ok)
      setMarketplaceData([
        {
          id: 'amazon',
          name: 'Amazon',
          logo: '/marketplace/amazon.svg',
          price: '₹355',
          link: 'https://amazon.in',
          delivery: '2-3 day delivery',
          rating: 4.3,
          condition: 'New'
        },
        {
          id: 'flipkart',
          name: 'Flipkart',
          logo: '/marketplace/flipkart.svg',
          price: '₹370',
          link: 'https://flipkart.com',
          delivery: '3-4 day delivery',
          rating: 4.2,
          condition: 'New'
        },
        {
          id: 'jiomart',
          name: 'JioMart',
          logo: '/marketplace/jiomart.svg',
          price: '₹349',
          link: 'https://jiomart.com',
          delivery: '1-2 day delivery',
          rating: 4.0,
          condition: 'New'
        },
        {
          id: 'bigbasket',
          name: 'BigBasket',
          logo: '/marketplace/bigbasket.svg',
          price: '₹365',
          link: 'https://bigbasket.com',
          delivery: 'Next day delivery',
          rating: 4.1,
          condition: 'New'
        }
      ])
      
      // Even with sample data, ensure our price is the lowest
      const lowestSamplePrice = 349 // JioMart price from sample data
      if (lowestSamplePrice <= ownPrice && onUpdatePrice) {
        // Set our price 5% less than the lowest sample price
        const newPrice = Math.round(lowestSamplePrice * 0.95)
        onUpdatePrice(`₹${newPrice}`)
        setPriceUpdated(true)
      }
      
      setIsLoading(false)
    }
    
    fetchData()
  }, [productQuery, ownStorePrice, onUpdatePrice, ownPrice])
  
  // Sort marketplace data by price
  const sortedMarketplaces = [...marketplaceData].sort((a, b) => {
    return getNumericPrice(a.price) - getNumericPrice(b.price)
  })
  
  // Your store details - use the store name from the selected store ID
  const yourStore: MarketplaceData = {
    id: ownStoreId,
    name: 'Your Selected Store',  // Updated to be more clear
    logo: '/logo.svg',
    price: ownStorePrice,
    link: '#',
    delivery: 'Fast Delivery',
    rating: 4.8,
    condition: 'New'
  }
  
  // Get market position for your store
  const marketPosition = [...sortedMarketplaces, {
    id: ownStoreId,
    name: 'Your Selected Store',  // Updated for consistency
    logo: '/logo.svg',
    price: ownStorePrice,
    link: '#',
    delivery: 'Fast Delivery',
    rating: 4.8,
    condition: 'New'
  }].sort((a, b) => getNumericPrice(a.price) - getNumericPrice(b.price))
  
  const yourPosition = marketPosition.findIndex(item => item.id === ownStoreId) + 1
  const totalStores = marketPosition.length
  const isLowestPrice = yourPosition === 1
  
  // Create all stores list with your store included
  const allStores = [yourStore, ...sortedMarketplaces.filter(store => store.id !== ownStoreId)]
  
  // Limit the number of stores shown initially
  const visibleStores = showAllStores ? allStores : allStores.slice(0, 4)
  
  if (isLoading) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden animate-pulse">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
        
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center p-4 border-b">
            <div className="flex-shrink-0 w-10 h-10 rounded bg-gray-200"></div>
            <div className="ml-3 flex-grow">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="flex flex-col items-end">
              <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  if (marketplaceData.length === 0) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-gray-50 px-4 py-3 border-b">
          <h3 className="font-semibold text-gray-800">Marketplace Price Comparison</h3>
          <p className="text-xs text-gray-500 mt-1">
            {error ? `Error: ${error}` : 'No marketplace data available at the moment'}
          </p>
        </div>
        <div className="p-4 text-center text-gray-500 flex items-center justify-center flex-col">
          <ShoppingBag className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm">We're currently unable to fetch marketplace prices.</p>
          <p className="text-xs mt-1">Please check back later for price comparisons.</p>
        </div>
      </div>
    )
  }
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className={`px-4 py-3 border-b flex justify-between items-center ${
        isLowestPrice ? 'bg-green-50' : 'bg-gray-50'
      }`}>
        <div>
          <h3 className="font-semibold text-gray-800">
            {productQuery} - Price Comparison
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            {error ? 
              <span className="text-yellow-600">Using backup data: {error}</span> : 
              isLowestPrice 
                ? 'Your selected store offers the best price!'
                : `Your selected store's price is ranked #${yourPosition} out of ${totalStores} marketplaces`
            }
          </p>
        </div>
        
        {priceUpdated && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-medium"
          >
            Price updated!
          </motion.div>
        )}
      </div>
      
      <div>
        {visibleStores.map((marketplace, index) => {
          const ourPriceNumeric = getNumericPrice(ownStorePrice)
          const marketplacePrice = getNumericPrice(marketplace.price)
          const priceDifference = marketplacePrice - ourPriceNumeric
          const percentageDiff = Math.abs(Math.round((priceDifference / marketplacePrice) * 100))
          
          const isYourStore = marketplace.id === ownStoreId
          const isCheaper = ourPriceNumeric < marketplacePrice
          const isMoreExpensive = ourPriceNumeric > marketplacePrice
          
          return (
            <motion.div 
              key={marketplace.id} 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={`flex items-center p-4 ${index < visibleStores.length - 1 ? 'border-b' : ''} ${
                isYourStore ? 'bg-green-50/50' : ''
              }`}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded overflow-hidden relative">
                {isYourStore ? (
                  <div className="w-full h-full bg-pastel-orange/10 flex items-center justify-center">
                    <ShoppingBag className="h-5 w-5 text-pastel-orange" />
                  </div>
                ) : (
                  <div className="w-full h-full bg-white rounded-lg overflow-hidden flex items-center justify-center relative">
                    <motion.div
                      initial={{ opacity: 0.6 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      className="relative"
                    >
                      <Image 
                        src={marketplace.logo} 
                        alt={marketplace.name} 
                        width={32} 
                        height={32} 
                        className={`object-contain transition-opacity duration-200 ${
                          imageLoaded[marketplace.id] ? 'opacity-100' : 'opacity-0'
                        }`}
                        priority={index < 2}
                        loading={index < 2 ? "eager" : "lazy"}
                        onLoad={() => setImageLoaded(prev => ({ ...prev, [marketplace.id]: true }))}
                        onError={(e) => {
                          // Fallback if image fails to load
                          const target = e.target as HTMLImageElement
                          target.src = '/marketplace/default.svg'
                          setImageLoaded(prev => ({ ...prev, [marketplace.id]: true }))
                        }}
                      />
                      {!imageLoaded[marketplace.id] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse">
                          <div className="w-5 h-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin" />
                        </div>
                      )}
                    </motion.div>
                  </div>
                )}
              </div>
              
              <div className="ml-3 flex-grow">
                <div className="flex items-center">
                  <h4 className="font-medium text-sm">{marketplace.name}</h4>
                  {isYourStore && (
                    <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full flex items-center">
                      <Star className="h-2 w-2 fill-green-600 mr-0.5" />
                      Best Price
                    </span>
                  )}
                  {index === 0 && !isYourStore && (
                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                      Popular
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <span>{marketplace.condition}</span>
                  <span className="mx-1">•</span>
                  <span>{marketplace.delivery}</span>
                  {isYourStore && (
                    <>
                      <span className="mx-1">•</span>
                      <span className="text-green-600 font-medium">Lowest Price Guaranteed</span>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2">
                <div className="font-semibold text-sm flex items-center">
                  {marketplace.price}
                  {!isYourStore && percentageDiff > 0 && (
                    <span className="ml-1 text-xs text-green-500">
                      <span className="flex items-center">
                        <ArrowUp className="h-3 w-3 mr-0.5" />
                        {percentageDiff}%
                      </span>
                    </span>
                  )}
                </div>
                
                {isYourStore ? (
                  <button 
                    className="text-xs py-1.5 px-3 bg-pastel-orange/10 text-pastel-orange font-medium rounded-md flex items-center"
                    disabled
                  >
                    <Check className="h-3 w-3 mr-1.5" />
                    Your Selected Store
                  </button>
                ) : (
                  <a 
                    href={marketplace.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs py-1.5 px-3 bg-white border border-gray-200 hover:border-gray-300 rounded-md text-gray-600 font-medium flex items-center transition-colors"
                  >
                    <ExternalLink className="h-3 w-3 mr-1.5" />
                    Visit Store
                  </a>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
      
      {sortedMarketplaces.length > 4 && (
        <div className="px-4 py-2 text-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowAllStores(!showAllStores)}
            className="text-xs text-gray-600"
          >
            {showAllStores ? 'Show Less' : `Show ${sortedMarketplaces.length - 4} More Marketplaces`}
            <ArrowRight className={`h-3 w-3 ml-1 transition-transform ${showAllStores ? 'rotate-90' : ''}`} />
          </Button>
        </div>
      )}
      
      {isLowestPrice && (
        <div className="bg-green-50 p-3 text-xs text-green-700 flex items-start gap-2 border-t">
          <Star className="h-4 w-4 flex-shrink-0 mt-0.5 fill-green-500" />
          <p>
            <span className="font-medium">Lowest Price Guarantee!</span> We automatically match or beat competitor prices to ensure you get the best deal on {productQuery}.
          </p>
        </div>
      )}
      
      {priceUpdated && (
        <div className="mt-3 p-3 bg-blue-50 rounded-md text-sm text-blue-700 flex items-start gap-2">
          <div className="flex-shrink-0 mt-0.5">
            <Star className="h-4 w-4 text-blue-500" />
          </div>
          <div>
            <strong>Price adjusted to stay competitive!</strong>
            <p className="text-xs mt-1">
              Your Selected Store's price has been automatically adjusted to ensure it's the most competitive 
              in the marketplace. This helps maximize your conversion rate.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// Arrow down icon component for price comparison
function ArrowDown(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  )
} 