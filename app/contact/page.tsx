import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import Footer from "../footer/footer"
import { SharedHeader } from "@/components/shared-header"
import { Phone, Mail, MapPin, Clock, Building, Users, Newspaper, Send, MessageSquare, HelpCircle } from "lucide-react"

export default function ContactPage() {
  const contactMethods = [
    {
      icon: <Phone className="h-6 w-6 text-pastel-orange" />,
      title: "Call Us",
      description: "Talk to our friendly customer service team",
      info: "1800-123-4567",
      timeInfo: "Mon-Sat: 9 AM - 8 PM"
    },
    {
      icon: <Mail className="h-6 w-6 text-pastel-orange" />,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      info: "support@parchunewala.com",
      timeInfo: "24/7 Email Support"
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-pastel-orange" />,
      title: "Live Chat",
      description: "Get instant help from our support team",
      info: "Available in our app",
      timeInfo: "Mon-Sun: 8 AM - 10 PM"
    }
  ]

  const officeLocations = [
    {
      city: "Mumbai",
      address: "123 Business Park, Andheri East, Mumbai, Maharashtra 400069",
      phone: "+91 22 2345 6789",
      email: "mumbai@parchunewala.com"
    },
    {
      city: "Delhi",
      address: "456 Tech Hub, Connaught Place, New Delhi 110001",
      phone: "+91 11 2345 6789",
      email: "delhi@parchunewala.com"
    },
    {
      city: "Bangalore",
      address: "789 Innovation Center, Koramangala, Bangalore 560034",
      phone: "+91 80 2345 6789",
      email: "bangalore@parchunewala.com"
    }
  ]

  const departmentContacts = [
    {
      icon: <Building className="h-6 w-6 text-pastel-orange" />,
      department: "Business Partnerships",
      email: "partnerships@parchunewala.com",
      description: "For business collaboration and strategic partnerships"
    },
    {
      icon: <Users className="h-6 w-6 text-pastel-orange" />,
      department: "Careers",
      email: "careers@parchunewala.com",
      description: "For job opportunities and recruitment inquiries"
    },
    {
      icon: <Newspaper className="h-6 w-6 text-pastel-orange" />,
      department: "Press & Media",
      email: "media@parchunewala.com",
      description: "For press releases and media inquiries"
    }
  ]

  return (
    <main className="bg-gray-50 min-h-screen">
      <SharedHeader title="Contact Us" showLogo={true} />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              We're Here to Help
            </h1>
            <p className="text-lg text-gray-700 mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Have questions, feedback, or need assistance? Reach out to our friendly team through any of the channels below.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 text-center transition-all duration-300 hover:shadow-md hover:translate-y-[-5px]"
              >
                <div className="mx-auto bg-pastel-orange/10 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{method.title}</h3>
                <p className="text-gray-600 mb-4">{method.description}</p>
                <div className="text-pastel-orange font-semibold mb-1">{method.info}</div>
                <div className="text-sm text-gray-500">{method.timeInfo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Send Us a Message</h2>
              <p className="text-gray-600 mb-8 text-center">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your full name"
                    />
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
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                      placeholder="Your contact number"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      id="subject"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="support">Customer Support</option>
                      <option value="feedback">Product Feedback</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="press">Press Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-orange focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    className="h-4 w-4 text-pastel-orange focus:ring-pastel-orange border-gray-300 rounded"
                  />
                  <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                    I agree to the <Link href="/privacy-policy" className="text-pastel-orange hover:underline">Privacy Policy</Link> and consent to having my data processed
                  </label>
                </div>
                
                <div>
                  <Button type="submit" className="w-full bg-pastel-orange text-white hover:bg-pastel-orange/90 flex items-center justify-center gap-2">
                    <Send className="h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Office Locations */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Offices</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit us at any of our office locations across India
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {officeLocations.map((office, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-lg p-6 transition-all duration-300 hover:shadow-md"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{office.city}</h3>
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="h-5 w-5 text-pastel-orange flex-shrink-0 mt-1" />
                  <p className="text-gray-600">{office.address}</p>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-5 w-5 text-pastel-orange" />
                  <p className="text-gray-600">{office.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-pastel-orange" />
                  <p className="text-gray-600">{office.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Department Contacts */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Department Contacts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Direct your inquiries to the right department for faster responses
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {departmentContacts.map((dept, index) => (
                <div 
                  key={index} 
                  className="p-6 border-b border-gray-100 last:border-b-0 flex gap-4 items-start"
                >
                  <div className="bg-pastel-orange/10 rounded-full p-3">
                    {dept.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{dept.department}</h3>
                    <p className="text-gray-600 text-sm mb-2">{dept.description}</p>
                    <a href={`mailto:${dept.email}`} className="text-pastel-orange hover:underline flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {dept.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Link */}
      <div className="py-10 bg-pastel-orange text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center">
            <HelpCircle className="h-10 w-10 mb-4" />
            <h3 className="text-2xl font-bold mb-4">Have more questions?</h3>
            <p className="max-w-2xl mx-auto mb-6">
              Check out our Frequently Asked Questions section for quick answers to common questions
            </p>
            <Link href="/faqs">
              <Button className="bg-white text-pastel-orange hover:bg-gray-100">
                Visit FAQ Page
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  )
} 