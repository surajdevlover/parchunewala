import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { BarChart, ShoppingBag, Navigation, Users, Shield, Truck, Store, ChevronRight } from "lucide-react"
import { SharedHeader } from "@/components/shared-header"

export default function PartnerWithUsPage() {
  const partnerTypes = [
    {
      id: "store",
      title: "Store Owners",
      description: "List your store on ParchuneWala and reach more customers in your neighborhood.",
      icon: <Store className="h-6 w-6 text-pastel-orange" />,
      benefits: [
        "Expand your customer base without additional marketing costs",
        "Easy-to-use digital inventory management system",
        "Insights and analytics to understand customer preferences",
        "Flexible delivery options (self-delivery or our network)",
        "Dedicated partner support team"
      ],
      cta: "Register Your Store",
      link: "/become-seller"
    },
    {
      id: "delivery",
      title: "Delivery Partners",
      description: "Join our fleet of delivery partners and earn competitive income with flexible hours.",
      icon: <Truck className="h-6 w-6 text-pastel-orange" />,
      benefits: [
        "Flexible working hours - be your own boss",
        "Competitive per-delivery payouts",
        "Weekly payment settlements",
        "Delivery within specific neighborhoods",
        "Incentives for consistent performance"
      ],
      cta: "Become a Delivery Partner",
      link: "/delivery-partner"
    },
    {
      id: "franchise",
      title: "Franchise Partners",
      description: "Bring ParchuneWala to your city with our franchise opportunity.",
      icon: <Users className="h-6 w-6 text-pastel-orange" />,
      benefits: [
        "Exclusive rights to a defined territory",
        "Comprehensive training and operational support",
        "Marketing assistance and brand guidelines",
        "Proven business model with attractive ROI",
        "Ongoing tech and business development support"
      ],
      cta: "Explore Franchise Options",
      link: "/franchise"
    }
  ]
  
  const testimonials = [
    {
      id: "1",
      quote: "Partnering with ParchuneWala has helped me expand my small grocery store's reach. My sales have increased by 40% in just three months.",
      name: "Rajesh Kumar",
      title: "Owner, Sri Balaji Kirana Store",
      image: "/store-owner-1.jpg",
      partnerType: "Store Owner"
    },
    {
      id: "2",
      quote: "The flexibility of being a delivery partner allows me to earn extra income while pursuing my education. The app is easy to use and the support team is always helpful.",
      name: "Ankit Sharma",
      title: "Student & Delivery Partner",
      image: "/delivery-partner-1.jpg",
      partnerType: "Delivery Partner"
    },
    {
      id: "3",
      quote: "Taking the franchise for my city was the best business decision I've made. The ParchuneWala team provided excellent training and continuous support as we scaled operations.",
      name: "Priya Mehta",
      title: "Franchise Owner, Ahmedabad",
      image: "/franchise-1.jpg",
      partnerType: "Franchise Partner"
    }
  ]
  
  const stats = [
    {
      value: "5,000+",
      label: "Store Partners",
      icon: <Store className="h-5 w-5" />
    },
    {
      value: "15,000+",
      label: "Delivery Partners",
      icon: <Truck className="h-5 w-5" />
    },
    {
      value: "25+",
      label: "Cities",
      icon: <Navigation className="h-5 w-5" />
    },
    {
      value: "₹750Cr+",
      label: "Partner Earnings",
      icon: <BarChart className="h-5 w-5" />
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Header */}
      <SharedHeader title="Partner With Us" showBackButton={true} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 md:p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Grow Your Business with ParchuneWala</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of partners across India who are growing their business with ParchuneWala. Whether you're a store owner, delivery professional, or entrepreneur, we have partnership opportunities for you.
            </p>
            <div className="grid md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-4 rounded-lg flex flex-col items-center"
                >
                  <div className="bg-pastel-orange/10 p-2 rounded-full mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Partnership Options */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Choose Your Partnership Path</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {partnerTypes.map(partner => (
              <div 
                key={partner.id} 
                className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <div className="bg-pastel-orange/10 p-3 rounded-lg inline-block mb-4 self-start">
                    {partner.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {partner.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {partner.description}
                  </p>
                  
                  <div className="mb-6 flex-grow">
                    <h4 className="font-medium text-gray-700 mb-2">Benefits:</h4>
                    <ul className="space-y-2">
                      {partner.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="text-pastel-orange mt-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                          </div>
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Link href={partner.link} className="mt-auto">
                    <Button className="w-full bg-pastel-orange text-white gap-1">
                      {partner.cta} <ChevronRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Partner Success Stories</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div 
                key={testimonial.id} 
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <span className="bg-pastel-orange/10 text-pastel-orange text-xs px-2 py-1 rounded-full">
                    {testimonial.partnerType}
                  </span>
                </div>
                <blockquote className="text-gray-600 text-sm italic">
                  "{testimonial.quote}"
                </blockquote>
              </div>
            ))}
          </div>
        </div>
        
        {/* Why Partner with Us */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Why Partner with ParchuneWala?</h2>
            <p className="text-gray-600 mb-6 text-center">
              We're committed to helping our partners grow and succeed with the right tools, support, and opportunities.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <BarChart size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Business Growth</h3>
                  <p className="text-gray-600 text-sm">
                    Our partners see significant growth in business volume, customer reach, and revenue.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <ShoppingBag size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Technology Platform</h3>
                  <p className="text-gray-600 text-sm">
                    Our easy-to-use technology makes managing inventory, orders, and deliveries simple.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Reliable Support</h3>
                  <p className="text-gray-600 text-sm">
                    Dedicated partner support team available to assist with any questions or issues.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-pastel-orange text-white p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0 mt-1">
                  <Users size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">Community</h3>
                  <p className="text-gray-600 text-sm">
                    Join a growing community of partners sharing insights and best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="bg-pastel-orange rounded-lg p-6 text-white text-center">
          <h2 className="text-xl font-semibold mb-2">Ready to Partner with Us?</h2>
          <p className="mb-4 opacity-90">
            Take the first step towards growing your business with ParchuneWala.
          </p>
          <Button className="bg-white text-pastel-orange hover:bg-gray-100">
            Apply Now
          </Button>
        </div>
      </div>

      <Footer />
    </main>
  )
} 