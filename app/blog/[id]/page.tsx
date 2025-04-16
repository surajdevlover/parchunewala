import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../../footer/footer"
import { ArrowLeft, Clock, User, Calendar, Share2, Bookmark, Facebook, Twitter, Linkedin, Mail } from "lucide-react"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  // In a real application, you would fetch the blog post data based on the ID
  // This is mock data for demonstration purposes
  const post = {
    id: params.id,
    title: "How Local Stores Are Transforming in the Digital Age",
    excerpt: "Local grocery stores are embracing technology to compete in today's digital marketplace. Learn how neighborhood shops are using platforms like ParchuneWala to reach more customers.",
    coverImage: "/blog-featured.jpg",
    date: "January 15, 2024",
    author: "Rahul Sharma",
    authorImage: "/author-1.jpg",
    category: "Business",
    readTime: "5 min read",
    content: `
      <p>The digital revolution has transformed every aspect of our lives, including how we shop for groceries. While large e-commerce giants have dominated headlines, local neighborhood stores are quietly undergoing their own transformation. These small businesses, which have been the backbone of communities for generations, are finding innovative ways to combine the convenience of digital shopping with the personalized service that makes them special.</p>
      
      <h2>The Challenge for Local Stores</h2>
      
      <p>For decades, local grocery stores have competed with larger supermarkets and chain stores by offering personalized service, community connections, and convenience. However, the rise of e-commerce giants and quick commerce has presented new challenges. Consumers increasingly expect the convenience of online ordering, fast delivery, and digital payment options.</p>
      
      <p>According to a recent survey, 76% of consumers now expect local stores to offer some form of digital shopping experience. This shift in consumer expectations has forced local store owners to adapt or risk becoming obsolete.</p>
      
      <h2>The Digital Transformation</h2>
      
      <p>Fortunately, platforms like ParchuneWala are helping bridge this gap. By providing easy-to-use technology solutions specifically designed for local stores, these platforms are enabling small businesses to compete in the digital marketplace without losing their unique identity.</p>
      
      <p>Here's how local stores are embracing digital transformation:</p>
      
      <ul>
        <li><strong>Online Presence:</strong> Local stores are establishing digital storefronts where customers can browse products, check prices, and place orders.</li>
        <li><strong>Inventory Management:</strong> Digital tools help store owners track inventory in real-time, reducing waste and ensuring popular items stay in stock.</li>
        <li><strong>Delivery and Pickup Options:</strong> Many local stores now offer home delivery or convenient pickup options, matching the convenience of larger competitors.</li>
        <li><strong>Digital Payments:</strong> Contactless payment options and digital wallets make transactions quick and secure.</li>
        <li><strong>Customer Insights:</strong> Data analytics help store owners understand customer preferences and shopping patterns.</li>
      </ul>
      
      <h2>Success Stories</h2>
      
      <p>Consider the story of Sharma General Store in South Delhi. For 35 years, Mr. Sharma served his neighborhood with a friendly smile and personalized service. When digital shopping platforms began drawing away customers, he partnered with ParchuneWala to create a digital presence.</p>
      
      <p>"I was hesitant at first," Mr. Sharma admits. "I thought technology was only for the younger generation. But within three months of going digital, we saw a 40% increase in orders. Many of our loyal customers appreciate being able to order quickly when they're busy, and we've reached new customers who discovered us through the platform."</p>
      
      <h2>The Best of Both Worlds</h2>
      
      <p>What's particularly interesting about this transformation is that it doesn't replace the personal touch that makes local stores special—it enhances it. Store owners can now connect with their customers through multiple channels, offer personalized recommendations based on purchase history, and provide the convenience of digital shopping while maintaining the community connection that larger retailers often lack.</p>
      
      <p>For customers, it means getting the best of both worlds: the convenience of digital shopping with the trusted service and quality of their local store.</p>
      
      <h2>Looking Forward</h2>
      
      <p>As technology continues to evolve, we can expect local stores to find even more innovative ways to serve their communities. From AI-powered inventory management to augmented reality shopping experiences, the possibilities are endless.</p>
      
      <p>What remains constant is the importance of these local businesses to their communities. By embracing digital transformation, they're ensuring they'll continue to be vital community hubs for generations to come.</p>
      
      <p>If you're a local store owner considering digital transformation, platforms like ParchuneWala offer user-friendly solutions designed specifically for businesses like yours. And if you're a consumer, consider supporting the digital initiatives of your local stores—you'll get the convenience you desire while helping maintain the unique character of your community.</p>
    `,
    tags: ["Local Business", "Digital Transformation", "E-commerce", "Retail Technology", "Small Business"],
    relatedPosts: [
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
    ]
  }

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
            <h1 className="font-medium text-lg">Article</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Article Header */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="mb-4">
            <span className="bg-pastel-orange text-white text-xs px-2 py-1 rounded">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            {post.excerpt}
          </p>
          
          {/* Author and Meta */}
          <div className="flex items-center justify-between border-b border-gray-200 pb-6 mb-6">
            <div className="flex items-center">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image 
                  src={post.authorImage} 
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-800">{post.author}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  <span className="mr-3">{post.date}</span>
                  <Clock size={14} className="mr-1" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            {/* Share and Save */}
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Share2 size={16} /> Share
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Bookmark size={16} /> Save
              </Button>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="max-w-4xl mx-auto mb-8 rounded-lg overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image 
              src={post.coverImage} 
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Article Content */}
        <div className="max-w-3xl mx-auto mb-12">
          <article className="prose prose-gray max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-pastel-orange">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </article>
          
          {/* Tags */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-gray-700 font-medium mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Link href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`} key={index}>
                  <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200">
                    {tag}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Share Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-gray-700 font-medium mb-3">Share This Article</h3>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Facebook size={16} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Twitter size={16} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Linkedin size={16} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                <Mail size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Related Articles */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Related Articles</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {post.relatedPosts.map(relatedPost => (
              <div key={relatedPost.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row h-full">
                  <div className="md:w-1/3 relative">
                    <div className="relative aspect-square w-full h-full">
                      <Image 
                        src={relatedPost.coverImage} 
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="bg-pastel-orange text-white text-xs px-2 py-1 rounded">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-4 flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-500">{relatedPost.date}</span>
                      <Link href={`/blog/${relatedPost.id}`}>
                        <Button variant="ghost" className="text-pastel-orange hover:text-pastel-orange/80 hover:bg-pastel-orange/10 text-sm px-2 py-1 h-8">
                          Read More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Newsletter Subscription */}
        <div className="max-w-4xl mx-auto bg-pastel-orange/10 rounded-lg p-6 mb-8">
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