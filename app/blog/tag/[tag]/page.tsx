import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../../../footer/footer"
import { ArrowLeft, Search } from "lucide-react"

export default function BlogTagPage({ params }: { params: { tag: string } }) {
  // Format the tag for display
  const displayTag = params.tag
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  // In a real application, you would fetch all blog posts with this tag
  // This is mock data for demonstration purposes
  const taggedPosts = [
    {
      id: "1",
      title: "How Local Stores Are Transforming in the Digital Age",
      excerpt: "Local grocery stores are embracing technology to compete in today's digital marketplace. Learn how neighborhood shops are using platforms like ParchuneWala to reach more customers.",
      coverImage: "/blog-featured.jpg",
      date: "January 15, 2024",
      author: "Rahul Sharma",
      authorImage: "/author-1.jpg",
      category: "Business",
      readTime: "5 min read"
    },
    {
      id: "4",
      title: "The Future of Local Retail: Trends to Watch",
      excerpt: "What does the future hold for local retailers? We explore emerging technologies and consumer preferences that will shape neighborhood shopping.",
      coverImage: "/blog-4.jpg",
      date: "December 28, 2023",
      author: "Vikram Singh",
      authorImage: "/author-placeholder.jpg",
      category: "Industry Trends",
      readTime: "7 min read"
    },
    {
      id: "5",
      title: "How to Build a Digital Presence for Your Small Business",
      excerpt: "A step-by-step guide for local store owners looking to establish and grow their online presence without technical expertise.",
      coverImage: "/blog-5.jpg",
      date: "December 15, 2023",
      author: "Neha Gupta",
      authorImage: "/author-placeholder.jpg",
      category: "Business",
      readTime: "8 min read"
    },
    {
      id: "6",
      title: "Case Study: How Kumar Grocery Increased Sales by 60%",
      excerpt: "Learn how a family-owned grocery store in Mumbai leveraged digital tools to dramatically increase their customer base and sales.",
      coverImage: "/blog-6.jpg",
      date: "December 5, 2023",
      author: "Alok Verma",
      authorImage: "/author-placeholder.jpg",
      category: "Case Studies",
      readTime: "10 min read"
    }
  ]

  // Popular tags - would be dynamically generated in a real app
  const popularTags = [
    "Local Business",
    "Digital Transformation",
    "E-commerce",
    "Retail Technology",
    "Small Business",
    "Shopping Tips",
    "Industry Trends",
    "Sustainability"
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <Link href="/blog">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft size={20} />
              </Button>
            </Link>
            <h1 className="font-medium text-lg">Articles tagged: {displayTag}</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {displayTag}
              </h1>
              <p className="text-gray-600">
                Browse all articles related to {displayTag}
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search in this category..."
                  className="w-full px-4 py-3 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-orange"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            {/* Articles Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {taggedPosts.map(post => (
                <Link href={`/blog/${post.id}`} key={post.id}>
                  <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full transition-transform hover:scale-[1.02] hover:shadow-md">
                    <div className="relative aspect-[16/9]">
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
                      <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="relative h-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image 
                              src={post.authorImage} 
                              alt={post.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-600 mr-2">{post.author}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500 ml-2">{post.date}</span>
                        </div>
                        <span className="text-xs text-gray-500">{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mb-12">
              <nav className="flex items-center space-x-1">
                <Button variant="outline" size="sm" className="px-3">Previous</Button>
                <Button variant="outline" size="sm" className="px-3 bg-pastel-orange text-white">1</Button>
                <Button variant="outline" size="sm" className="px-3">2</Button>
                <Button variant="outline" size="sm" className="px-3">3</Button>
                <span className="text-gray-500">...</span>
                <Button variant="outline" size="sm" className="px-3">8</Button>
                <Button variant="outline" size="sm" className="px-3">Next</Button>
              </nav>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4">
            {/* Popular Tags */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <Link href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      tag.toLowerCase().replace(/\s+/g, '-') === params.tag
                        ? 'bg-pastel-orange text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}>
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Newsletter */}
            <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">Subscribe to get notified about new articles and updates.</p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pastel-orange mb-2"
              />
              <Button className="w-full bg-pastel-orange text-white">
                Subscribe
              </Button>
            </div>
            
            {/* Most Read Articles */}
            <div className="bg-white rounded-lg shadow-sm p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Read</h3>
              <div className="space-y-4">
                {taggedPosts.slice(0, 3).map(post => (
                  <Link href={`/blog/${post.id}`} key={`most-read-${post.id}`}>
                    <div className="flex gap-3 group">
                      <div className="relative h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                        <Image 
                          src={post.coverImage} 
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-pastel-orange transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-xs text-gray-500">{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 