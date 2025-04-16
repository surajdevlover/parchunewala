import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { ArrowLeft, Clock, User, ChevronRight, Search } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"

export default function BlogPage() {
  const featuredPost = {
    id: "1",
    title: "How Local Stores Are Transforming in the Digital Age",
    excerpt: "Local grocery stores are embracing technology to compete in today's digital marketplace. Learn how neighborhood shops are using platforms like ParchuneWala to reach more customers.",
    coverImage: "/blog-featured.jpg",
    date: "January 15, 2024",
    author: "Rahul Sharma",
    category: "Business",
    readTime: "5 min read"
  }
  
  const blogPosts = [
    {
      id: "2",
      title: "5 Ways to Save Money on Your Grocery Shopping",
      excerpt: "Discover practical tips to reduce your grocery expenses without compromising on quality or nutrition.",
      coverImage: "/blog-2.jpg",
      date: "January 10, 2024",
      author: "Priya Patel",
      category: "Shopping Tips",
      readTime: "4 min read"
    },
    {
      id: "3",
      title: "The Rise of Quick Commerce in Indian Cities",
      excerpt: "Quick commerce is revolutionizing how Indians shop for essentials. We analyze the trends and what it means for consumers.",
      coverImage: "/blog-3.jpg",
      date: "January 5, 2024",
      author: "Amit Kumar",
      category: "Industry Trends",
      readTime: "6 min read"
    },
    {
      id: "4",
      title: "Meet the Store Owners: Stories from Local Entrepreneurs",
      excerpt: "We interview local store owners who have partnered with ParchuneWala to understand how technology has changed their business.",
      coverImage: "/blog-4.jpg",
      date: "December 28, 2023",
      author: "Neha Singh",
      category: "Partner Stories",
      readTime: "7 min read"
    },
    {
      id: "5",
      title: "How to Choose the Freshest Fruits and Vegetables",
      excerpt: "Expert tips on selecting the best produce for your family, even when shopping online.",
      coverImage: "/blog-5.jpg",
      date: "December 22, 2023",
      author: "Dr. Meera Reddy",
      category: "Food & Nutrition",
      readTime: "5 min read"
    },
    {
      id: "6",
      title: "The Environmental Impact of Local Shopping",
      excerpt: "Shopping locally can significantly reduce your carbon footprint. Learn how ParchuneWala is making sustainable shopping easier.",
      coverImage: "/blog-6.jpg",
      date: "December 18, 2023",
      author: "Vikram Desai",
      category: "Sustainability",
      readTime: "4 min read"
    },
  ]
  
  const categories = [
    "All",
    "Business",
    "Shopping Tips",
    "Industry Trends",
    "Partner Stories",
    "Food & Nutrition",
    "Sustainability",
    "Technology"
  ]
  
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="Blog" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Categories */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-md bg-gray-100 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-orange"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2 pb-2">
            <div className="flex space-x-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium ${
                    index === 0 
                      ? 'bg-pastel-orange text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Featured Post */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative aspect-video w-full">
            <Image 
              src={featuredPost.coverImage} 
              alt={featuredPost.title} 
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="p-6">
                <div className="mb-2">
                  <span className="bg-pastel-orange text-white text-xs px-2 py-1 rounded">
                    {featuredPost.category}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {featuredPost.title}
                </h2>
                <p className="text-white/80 mb-4 line-clamp-2">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center text-white/80 text-sm">
                  <User size={14} className="mr-1" />
                  <span className="mr-3">{featuredPost.author}</span>
                  <Clock size={14} className="mr-1" />
                  <span className="mr-3">{featuredPost.date}</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-end">
            <Link href={`/blog/${featuredPost.id}`}>
              <Button className="bg-pastel-orange text-white gap-1">
                Read Article <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Latest Articles */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Latest Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative aspect-video w-full">
                  <Image 
                    src={post.coverImage} 
                    alt={post.title} 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-pastel-orange text-white text-xs px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-gray-500 text-xs mb-3">
                    <User size={12} className="mr-1" />
                    <span className="mr-3">{post.author}</span>
                    <Clock size={12} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <Link href={`/blog/${post.id}`}>
                      <Button variant="ghost" className="text-pastel-orange hover:text-pastel-orange/80 hover:bg-pastel-orange/10 text-sm px-2 py-1 h-8">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="bg-pastel-orange/10 rounded-lg p-6 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest articles, shopping tips, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-orange"
              />
              <Button className="bg-pastel-orange text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 