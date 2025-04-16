import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { Building, TrendingUp, Users, Clock, BarChart3, ShieldCheck, Award, BadgeCheck, DollarSign, Check, Sparkles, ChevronRight } from "lucide-react"

export default function FranchisePage() {
  const benefits = [
    {
      icon: <Building className="h-6 w-6 text-pastel-orange" />,
      title: "Established Brand",
      description: "Join a trusted brand with strong market presence and instant customer recognition."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-pastel-orange" />,
      title: "Proven Business Model",
      description: "Leverage our successful business format with tested operations and strategies."
    },
    {
      icon: <Users className="h-6 w-6 text-pastel-orange" />,
      title: "Comprehensive Training",
      description: "Receive extensive training for you and your team in all aspects of the business."
    },
    {
      icon: <Clock className="h-6 w-6 text-pastel-orange" />,
      title: "Ongoing Support",
      description: "Get continuous assistance in operations, marketing, technology, and business growth."
    }
  ]

  const franchiseOptions = [
    {
      title: "Standard Franchise",
      description: "Our flagship franchise model. Perfect for entrepreneurs looking to establish a full-service ParchuneWala store in high-traffic locations.",
      investment: "₹15-20 Lakhs",
      area: "500-800 sq. ft.",
      returnsTime: "18-24 months",
      icon: <Building className="h-10 w-10 text-pastel-orange" />
    },
    {
      title: "Express Outlet",
      description: "A compact format ideal for busy locations like shopping malls, metro stations, and commercial complexes with high footfall.",
      investment: "₹8-12 Lakhs",
      area: "250-400 sq. ft.",
      returnsTime: "12-18 months",
      icon: <TrendingUp className="h-10 w-10 text-pastel-orange" />
    },
    {
      title: "Kiosk Model",
      description: "Our smallest format designed for unique locations with space constraints but high visibility, such as office buildings and institutions.",
      investment: "₹5-8 Lakhs",
      area: "100-200 sq. ft.",
      returnsTime: "10-15 months",
      icon: <BarChart3 className="h-10 w-10 text-pastel-orange" />
    }
  ]

  const process = [
    {
      title: "Application",
      description: "Submit your franchise application form with basic details about yourself and your business experience."
    },
    {
      title: "Initial Discussion",
      description: "Our franchise team will contact you to discuss your application and answer any questions you might have."
    },
    {
      title: "Business Plan",
      description: "Develop a detailed business plan with our team's guidance, including location analysis and financial projections."
    },
    {
      title: "Agreement Signing",
      description: "Complete the legal formalities and sign the franchise agreement after mutual agreement on terms."
    },
    {
      title: "Setup & Training",
      description: "Set up your franchise location with our assistance and receive comprehensive training for you and your staff."
    },
    {
      title: "Grand Opening",
      description: "Launch your ParchuneWala franchise with our marketing support and start serving customers."
    }
  ]

  const faqs = [
    {
      question: "What is the total investment required?",
      answer: "The total investment varies based on the franchise model you choose, location, and size. Standard franchises typically require ₹15-20 Lakhs, Express outlets need ₹8-12 Lakhs, and Kiosk models start from ₹5-8 Lakhs."
    },
    {
      question: "Do I need prior business experience?",
      answer: "While prior business experience is beneficial, it's not mandatory. We provide comprehensive training and ongoing support to help you succeed, even if you're new to entrepreneurship."
    },
    {
      question: "What support does ParchuneWala provide to franchisees?",
      answer: "We offer extensive support including initial training, operational guidance, marketing assistance, technology solutions, supply chain management, and continuous business development advice."
    },
    {
      question: "How long does it take to break even?",
      answer: "The break-even period varies based on location, model, and your management, but typically ranges from 10-24 months depending on the franchise model you select."
    },
    {
      question: "Can I own multiple franchises?",
      answer: "Yes, we encourage multi-unit ownership for successful franchisees. We offer special incentives and support for entrepreneurs interested in developing multiple locations."
    }
  ]

  const testimonials = [
    {
      quote: "Taking up a ParchuneWala franchise was the best business decision I've made. The brand recognition brought immediate customers, and the support system has been exceptional throughout.",
      name: "Vikram Mehta",
      location: "Pune (Franchise Owner since 2021)",
      image: "/images/franchise-owner-1.jpg"
    },
    {
      quote: "The training and ongoing assistance from the ParchuneWala team made the transition to business ownership smooth. My outlet achieved break-even in just 15 months.",
      name: "Ananya Sharma",
      location: "Bangalore (Franchise Owner since 2020)",
      image: "/images/franchise-owner-2.jpg"
    }
  ]

  const stats = [
    { value: "95%", label: "Franchise Success Rate" },
    { value: "120+", label: "Locations Nationwide" },
    { value: "2M+", label: "Monthly Customers" },
    { value: "24/7", label: "Franchisee Support" }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="Franchise Opportunities" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="max-w-md">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
                  Own a ParchuneWala Franchise
                </h1>
                <p className="text-lg text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Join India's fastest-growing local shopping network with a proven business model and exceptional returns.
                </p>
                <div className="space-y-4">
                  {benefits.slice(0, 2).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2 animate-fade-in" style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                      <Check className="text-pastel-orange h-5 w-5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit.title}: {benefit.description}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                  <Link href="#application">
                    <Button size="lg" className="bg-pastel-orange text-white hover:bg-pastel-orange/90">
                      Apply Now
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative h-80 w-full md:h-96 md:w-96 mx-auto animate-float">
                <Image
                  src="/images/franchise-store.jpg"
                  alt="ParchuneWala Franchise Store"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-md animate-bounce-in" style={{ animationDelay: '0.8s' }}>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="text-pastel-orange h-5 w-5" />
                      <div>
                        <div className="text-xs text-gray-500">ROI Period</div>
                        <div className="text-lg font-bold text-gray-900">18-24 Months</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-pastel-orange mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose a ParchuneWala Franchise?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join a network of successful entrepreneurs who are building profitable businesses with our proven model.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
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

      {/* Franchise Models */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Franchise Models</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose the franchise format that best fits your investment capability and business goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {franchiseOptions.map((option, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-4">
                    {option.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{option.title}</h3>
                  <p className="text-gray-600 mb-4 text-center">{option.description}</p>
                  <div className="space-y-3 mt-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Investment</span>
                      <span className="font-medium text-gray-800">{option.investment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Space Required</span>
                      <span className="font-medium text-gray-800">{option.area}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ROI Period</span>
                      <span className="font-medium text-gray-800">{option.returnsTime}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 bg-pastel-orange text-white py-3 text-center">
                  <Link href="#application" className="inline-flex items-center gap-2">
                    Apply for this model <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Franchise Application Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our streamlined process makes it easy to apply for and launch your ParchuneWala franchise
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {process.map((step, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm flex gap-4 items-start"
                >
                  <div className="bg-pastel-orange text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our successful franchise partners across India
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic">"{testimonial.quote}"</blockquote>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="#application">
              <Button className="bg-pastel-orange text-white hover:bg-pastel-orange/90">
                Join Our Success Story
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions about owning a ParchuneWala franchise
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="border-b border-gray-200 p-6 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-pastel-orange" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div id="application" className="py-16 bg-gradient-to-r from-orange-50 to-orange-100">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Apply for a Franchise</h2>
              <p className="text-gray-600 mb-8 text-center">
                Fill out this form to start your journey as a ParchuneWala franchise owner. Our team will contact you within 48 hours.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
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
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">Preferred City/Area</label>
                    <input
                      type="text"
                      id="city"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Where you want to open a franchise"
                    />
                  </div>
                  <div>
                    <label htmlFor="investment" className="block text-sm font-medium text-gray-700 mb-1">Investment Capacity</label>
                    <select
                      id="investment"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    >
                      <option value="">Select investment range</option>
                      <option value="5-10L">₹5-10 Lakhs</option>
                      <option value="10-15L">₹10-15 Lakhs</option>
                      <option value="15-20L">₹15-20 Lakhs</option>
                      <option value="20L+">Above ₹20 Lakhs</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="franchiseType" className="block text-sm font-medium text-gray-700 mb-1">Preferred Franchise Model</label>
                  <select
                    id="franchiseType"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                  >
                    <option value="">Select franchise model</option>
                    <option value="standard">Standard Franchise</option>
                    <option value="express">Express Outlet</option>
                    <option value="kiosk">Kiosk Model</option>
                    <option value="undecided">Not sure yet</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Business Experience</label>
                  <textarea
                    id="experience"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    placeholder="Tell us about your business experience (if any)"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="h-4 w-4 text-pastel-orange focus:ring-pastel-orange border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <Link href="/terms" className="text-pastel-orange hover:underline">Terms and Conditions</Link>
                  </label>
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

      {/* Invitation */}
      <div className="py-10 bg-pastel-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to be Part of a Successful Brand?</h2>
          <p className="max-w-2xl mx-auto mb-6">
            Join ParchuneWala's growing network of successful franchise partners and build a profitable business with our proven model and ongoing support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#application">
              <Button className="bg-white text-pastel-orange hover:bg-gray-100">
                Apply for Franchise
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule a Call
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 