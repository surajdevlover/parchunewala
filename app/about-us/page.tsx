import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"

export default function AboutUsPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="About Us" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-64 w-full">
            <Image 
              src="./black-backgroud-about.jpg" 
              alt="About ParchuneWala" 
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center px-4">
                <h1 className="text-3xl font-bold text-white mb-2">ParchuneWala</h1>
                <p className="text-white text-lg">Connecting Communities with Local Stores</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2023, ParchuneWala started with a simple mission: to bridge the gap between local grocery stores and the digital world. We recognized that while e-commerce giants were transforming retail, local neighborhood stores ("parchune") that form the backbone of Indian communities were being left behind.
            </p>
            
            <p className="text-gray-600 mb-6">
              Our platform empowers small business owners to compete in the digital marketplace while providing customers with the convenience of online shopping and quick delivery from trusted neighborhood stores.
            </p>

            <div className="bg-pastel-orange/10 p-4 rounded-lg mb-6">
              <h3 className="text-xl font-medium text-pastel-orange mb-2">Our Mission</h3>
              <p className="text-gray-700">
                To create a sustainable ecosystem that empowers local businesses and delivers convenience to customers, fostering stronger community connections.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">For Customers</h3>
                <p className="text-gray-600 text-sm">
                  We provide a seamless shopping experience with access to products from multiple local stores, quick delivery, and competitive prices.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">For Store Owners</h3>
                <p className="text-gray-600 text-sm">
                  We offer digital storefronts, inventory management tools, and a ready customer base to help local businesses thrive.
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-lg mb-2">For Delivery Partners</h3>
                <p className="text-gray-600 text-sm">
                  We create flexible earning opportunities with fair compensation and technology that makes deliveries efficient.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">1</div>
                <div>
                  <h3 className="font-medium text-lg">Community First</h3>
                  <p className="text-gray-600">We prioritize strengthening local economies and neighborhoods through our platform.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">2</div>
                <div>
                  <h3 className="font-medium text-lg">Transparency</h3>
                  <p className="text-gray-600">We believe in honest pricing, clear policies, and open communication with all stakeholders.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">3</div>
                <div>
                  <h3 className="font-medium text-lg">Innovation</h3>
                  <p className="text-gray-600">We continuously improve our technology to make local commerce more efficient and accessible.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center mt-1">4</div>
                <div>
                  <h3 className="font-medium text-lg">Inclusivity</h3>
                  <p className="text-gray-600">We create opportunities for all, regardless of technical expertise or business size.</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Join Our Journey</h2>
              <p className="text-gray-600 mb-6">
                Whether you're a customer, store owner, or potential team member, we invite you to be part of our mission to transform local commerce.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/partner-with-us">
                  <Button className="bg-pastel-orange text-white">Partner With Us</Button>
                </Link>
                <Link href="/careers">
                  <Button variant="outline">Join Our Team</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
} 