import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { ShoppingBag, Percent, BarChart2, Clock, Users, HeartHandshake, CheckCircle, Award, TrendingUp } from "lucide-react"

export default function BecomeSellerPage() {
  const benefits = [
    {
      icon: <Users className="h-6 w-6 text-pastel-orange" />,
      title: "Expand Your Customer Base",
      description: "Reach thousands of customers in your neighborhood and beyond through our platform."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-pastel-orange" />,
      title: "Increase Revenue",
      description: "Our sellers report an average of 40% increase in revenue within the first three months."
    },
    {
      icon: <BarChart2 className="h-6 w-6 text-pastel-orange" />,
      title: "Actionable Insights",
      description: "Access detailed analytics and customer preferences to optimize your inventory and sales."
    },
    {
      icon: <Clock className="h-6 w-6 text-pastel-orange" />,
      title: "Quick Onboarding",
      description: "Get your store online in less than 24 hours with our streamlined onboarding process."
    }
  ]

  const sellerTools = [
    {
      title: "Inventory Management",
      description: "Easily manage your product catalog with bulk uploads, pricing updates, and stock management."
    },
    {
      title: "Order Dashboard",
      description: "Real-time order notifications, order tracking, and history all in one place."
    },
    {
      title: "Discount Campaigns",
      description: "Create and manage discount campaigns to attract more customers."
    },
    {
      title: "Performance Analytics",
      description: "Track sales, customer retention, and other key metrics to grow your business."
    },
    {
      title: "Self-delivery Option",
      description: "Choose between self-delivery or our delivery fleet based on your business needs."
    },
    {
      title: "Dedicated Support",
      description: "Get dedicated support from our partner success team to help you grow."
    }
  ]

  const steps = [
    {
      number: "01",
      title: "Sign Up",
      description: "Fill out our simple online registration form with basic details about your store."
    },
    {
      number: "02",
      title: "Verification",
      description: "Our team will verify your documents and approve your store within 24 hours."
    },
    {
      number: "03",
      title: "Catalog Setup",
      description: "Upload your product catalog or let our team help you set it up."
    },
    {
      number: "04",
      title: "Go Live",
      description: "Once everything is set up, your store goes live on our platform."
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="Become a Seller" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
                  Grow Your Business with ParchuneWala
                </h1>
                <p className="text-lg text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Partner with us to reach more customers, increase sales, and streamline your operations with our easy-to-use platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                    <CheckCircle className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">Reach thousands of customers in your area</span>
                  </div>
                  <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <CheckCircle className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">No technical expertise required to get started</span>
                  </div>
                  <div className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                    <CheckCircle className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                    <span className="text-gray-700">Dedicated partner support available 7 days a week</span>
                  </div>
                </div>
                <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Link href="#registration">
                    <Button size="lg" className="bg-pastel-orange text-white hover:bg-pastel-orange/90">
                      Register Your Store
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative animate-float">
              <div className="relative h-80 w-full md:h-96 md:w-96 mx-auto">
                <Image
                  src="/images/store-owner.jpg"
                  alt="Store Owner"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-md animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="text-pastel-orange h-5 w-5" />
                    <div>
                      <div className="text-xs text-gray-500">Average Revenue Increase</div>
                      <div className="text-lg font-bold text-gray-900">+40%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Partner with ParchuneWala?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join thousands of business owners who have transformed their business by partnering with us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
              >
                <div className="bg-pastel-orange/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tools Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Tools for Sellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our seller dashboard is designed to help you manage your business efficiently.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-3">
              {sellerTools.map((tool, index) => (
                <div 
                  key={index} 
                  className="p-6 border-b md:border-r border-gray-100 transition-all duration-300 hover:bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <span className="bg-pastel-orange/10 text-pastel-orange w-6 h-6 rounded-full flex items-center justify-center mr-2 text-sm">
                      {index + 1}
                    </span>
                    {tool.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Get Started</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Simple four-step process to start selling on ParchuneWala
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 relative overflow-hidden"
              >
                <div className="text-6xl font-bold text-pastel-orange/10 absolute -top-2 -left-2">
                  {step.number}
                </div>
                <div className="relative z-10">
                  <div className="w-8 h-8 rounded-full bg-pastel-orange/20 flex items-center justify-center mb-4">
                    <div className="w-4 h-4 rounded-full bg-pastel-orange"></div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Registration Form */}
      <div id="registration" className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Register Your Store</h2>
              <p className="text-gray-600 mb-8 text-center">
                Fill out the form below to get started. Our team will contact you within 24 hours.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-1">Store Name</label>
                    <input
                      type="text"
                      id="storeName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your store name"
                    />
                  </div>
                  <div>
                    <label htmlFor="storeType" className="block text-sm font-medium text-gray-700 mb-1">Store Type</label>
                    <select
                      id="storeType"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    >
                      <option value="">Select store type</option>
                      <option value="grocery">Grocery Store</option>
                      <option value="pharmacy">Pharmacy</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="bakery">Bakery</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 mb-1">Owner's Name</label>
                    <input
                      type="text"
                      id="ownerName"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your contact number"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Store Address</label>
                  <textarea
                    id="address"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    placeholder="Complete store address"
                  ></textarea>
                </div>
                
                <div>
                  <Button type="submit" className="w-full bg-pastel-orange text-white hover:bg-pastel-orange/90">
                    Submit Application
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 